// @ts-nocheck
"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";

const GITHUB_API = "https://api.github.com";

const LOCKFILES = [
  "package-lock.json",
  "yarn.lock",
  "pnpm-lock.yaml",
  "Gemfile.lock",
  "poetry.lock",
  "go.sum",
  "Cargo.lock",
  "composer.lock",
];

const CI_PATHS = [
  ".github/workflows/",
  ".circleci/",
  ".travis.yml",
  "Jenkinsfile",
  ".gitlab-ci.yml",
];

async function githubFetch(path: string, token: string) {
  const res = await fetch(`${GITHUB_API}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github.v3+json",
    },
  });

  if (res.status === 401) {
    throw new Error("GITHUB_TOKEN_EXPIRED");
  }

  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${await res.text()}`);
  }

  return res.json();
}

export const listRepos = action({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(api.users.getUserByClerkId, {
      clerkId: args.clerkId,
    });

    if (!user?.githubAccessToken) {
      throw new Error("GitHub token not found. Please reconnect GitHub.");
    }

    const repos = await githubFetch(
      "/user/repos?sort=pushed&per_page=30&type=owner",
      user.githubAccessToken
    );

    // Upsert repos into Convex
    for (const repo of repos) {
      await ctx.runMutation(api.repos.upsertRepo, {
        userId: user._id,
        githubId: repo.id,
        name: repo.name,
        fullName: repo.full_name,
        description: repo.description ?? undefined,
        language: repo.language ?? undefined,
        pushedAt: repo.pushed_at,
        isPrivate: repo.private ?? false,
      });
    }

    return repos.map((r: Record<string, unknown>) => ({
      id: r.id,
      name: r.name,
      fullName: r.full_name,
      description: r.description,
      language: r.language,
      pushedAt: r.pushed_at,
    }));
  },
});

export const fetchAndProcessCommits = action({
  args: {
    clerkId: v.string(),
    repoId: v.id("repos"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(api.users.getUserByClerkId, {
      clerkId: args.clerkId,
    });

    if (!user?.githubAccessToken) {
      throw new Error("GitHub token not found.");
    }

    const repo = await ctx.runQuery(api.repos.getUserRepos, {
      userId: user._id,
    });
    const targetRepo = repo.find((r) => r._id === args.repoId);
    if (!targetRepo) throw new Error("Repo not found.");

    // Create scan record
    const scanId = await ctx.runMutation(api.scans.createScan, {
      userId: user._id,
      repoId: args.repoId,
    });

    try {
      // Fetch commits
      let path = `/repos/${targetRepo.fullName}/commits?per_page=10`;
      if (targetRepo.lastScannedAt) {
        const since = new Date(targetRepo.lastScannedAt).toISOString();
        path += `&since=${since}`;
      }

      const commitList = await githubFetch(path, user.githubAccessToken);

      if (commitList.length === 0) {
        await ctx.runMutation(api.scans.updateScanStatus, {
          scanId,
          status: "complete",
          commitCount: 0,
          draftsGenerated: 0,
        });
        return { scanId, commitCount: 0, meaningfulCommits: 0 };
      }

      // Fetch detailed commit info (with files/patches)
      const detailedCommits = await Promise.all(
        commitList.map((c: Record<string, unknown>) =>
          githubFetch(
            `/repos/${targetRepo.fullName}/commits/${c.sha}`,
            user.githubAccessToken!
          )
        )
      );

      await ctx.runMutation(api.scans.updateScanStatus, {
        scanId,
        status: "filtering",
        commitCount: detailedCommits.length,
      });

      // Filter and classify commits
      const processedCommits = detailedCommits.map(
        (commit: Record<string, unknown>) => {
          const { filtered, reason } = classifyCommit(commit);
          return {
            scanId,
            repoId: args.repoId,
            sha: commit.sha as string,
            message: (commit.commit as Record<string, unknown>).message as string,
            authorName:
              ((commit.commit as Record<string, unknown>).author as Record<string, unknown>)
                .name as string,
            authorDate:
              ((commit.commit as Record<string, unknown>).author as Record<string, unknown>)
                .date as string,
            filesChanged: (commit.files as unknown[])?.length ?? 0,
            additions: (commit.stats as Record<string, number>)?.additions ?? 0,
            deletions: (commit.stats as Record<string, number>)?.deletions ?? 0,
            files: ((commit.files as Record<string, unknown>[]) ?? []).map(
              (f) => ({
                filename: f.filename as string,
                status: f.status as string,
                additions: f.additions as number,
                deletions: f.deletions as number,
                patch: (f.patch as string)?.slice(0, 2000), // Truncate large patches
              })
            ),
            isFiltered: filtered,
            filterReason: reason,
            featureGroup: filtered
              ? undefined
              : guessFeatureGroup(commit),
          };
        }
      );

      // Store commits
      await ctx.runMutation(api.commits.storeCommits, {
        commits: processedCommits,
      });

      // Update repo last scanned
      await ctx.runMutation(api.repos.updateLastScanned, {
        repoId: args.repoId,
        lastScannedAt: Date.now(),
      });

      const meaningfulCommits = processedCommits.filter((c) => !c.isFiltered);

      await ctx.runMutation(api.scans.updateScanStatus, {
        scanId,
        status: meaningfulCommits.length > 0 ? "generating" : "complete",
        commitCount: processedCommits.length,
      });

      return {
        scanId,
        commitCount: processedCommits.length,
        meaningfulCommits: meaningfulCommits.length,
      };
    } catch (error) {
      await ctx.runMutation(api.scans.updateScanStatus, {
        scanId,
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
      throw error;
    }
  },
});

function classifyCommit(commit: Record<string, unknown>): {
  filtered: boolean;
  reason?: string;
} {
  const commitData = commit.commit as Record<string, unknown>;
  const message = (commitData.message as string) ?? "";
  const parents = (commit.parents as unknown[]) ?? [];
  const files = (commit.files as Record<string, unknown>[]) ?? [];

  // Merge commit
  if (parents.length >= 2) {
    return { filtered: true, reason: "merge_commit" };
  }

  // Merge message
  if (/^Merge (branch|pull request)/i.test(message)) {
    return { filtered: true, reason: "merge_message" };
  }

  // Only lockfile changes
  if (
    files.length > 0 &&
    files.every((f) =>
      LOCKFILES.some((lf) => (f.filename as string).endsWith(lf))
    )
  ) {
    return { filtered: true, reason: "lockfile_only" };
  }

  // Only CI config changes
  if (
    files.length > 0 &&
    files.every((f) =>
      CI_PATHS.some((cp) => (f.filename as string).startsWith(cp))
    )
  ) {
    return { filtered: true, reason: "ci_config_only" };
  }

  // Version bump pattern
  if (/^(bump|chore\(deps\)|update.*dependencies)/i.test(message)) {
    return { filtered: true, reason: "dependency_bump" };
  }

  return { filtered: false };
}

function guessFeatureGroup(commit: Record<string, unknown>): string {
  const files = (commit.files as Record<string, unknown>[]) ?? [];
  if (files.length === 0) return "general";

  // Find common directory prefix
  const paths = files.map((f) => (f.filename as string).split("/"));
  if (paths.length === 0) return "general";

  // Use first two directory levels as group
  const firstFile = paths[0];
  if (firstFile.length >= 2) {
    return `${firstFile[0]}/${firstFile[1]}`;
  }

  return firstFile[0] ?? "general";
}
