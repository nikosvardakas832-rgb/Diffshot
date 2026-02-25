// @ts-nocheck
"use node";

import Anthropic from "@anthropic-ai/sdk";
import { v } from "convex/values";
import { ConvexError } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";

const GENERATION_LIMITS: Record<string, number> = {
  free: 3,
  pro: 50,
};

export const generateDrafts = action({
  args: {
    clerkId: v.string(),
    scanId: v.id("scans"),
    repoId: v.id("repos"),
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: async (ctx: any, args: any): Promise<any> => {
    const user = await ctx.runQuery(api.users.getUserByClerkId, {
      clerkId: args.clerkId,
    });

    if (!user) throw new Error("User not found");

    // Check generation limits
    const limit = GENERATION_LIMITS[user.tier];
    if (user.generationsUsedThisMonth >= limit) {
      throw new ConvexError(
        "Generation limit reached. Upgrade to Pro for 50 generations per month."
      );
    }

    // Get meaningful commits for this scan
    const commits = await ctx.runQuery(api.commits.getMeaningfulCommitsByScan, {
      scanId: args.scanId,
    });

    if (commits.length === 0) {
      await ctx.runMutation(api.scans.updateScanStatus, {
        scanId: args.scanId,
        status: "complete",
        draftsGenerated: 0,
      });
      return [];
    }

    // Get repo info
    const repos = await ctx.runQuery(api.repos.getUserRepos, {
      userId: user._id,
    });
    const repo = repos.find((r: any) => r._id === args.repoId);
    if (!repo) throw new Error("Repo not found");

    // Build prompt
    const commitSummary = commits
      .map((c: any) => {
        const filesStr = c.files
          .slice(0, 5)
          .map((f: any) => {
            const patchPreview = f.patch ? `\n${f.patch.slice(0, 500)}` : "";
            return `  - ${f.filename} (${f.status}, +${f.additions}/-${f.deletions})${patchPreview}`;
          })
          .join("\n");

        return `Commit ${c.sha.slice(0, 7)}: ${c.message}\n  Author: ${c.authorName}\n  Date: ${c.authorDate}\n  Files changed: ${c.filesChanged}, +${c.additions}/-${c.deletions}\n${filesStr}`;
      })
      .join("\n\n");

    const anthropic = new Anthropic();

    const response = await anthropic.messages.create({
      model: "claude-sonnet-4-5-20250929",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: `You are a developer marketing expert. Analyze these recent commits from the "${repo.fullName}" repository${repo.description ? ` (${repo.description})` : ""} and generate exactly 3 Visual Changelog tweet drafts.

Each draft should be a different angle on the work done. Make them feel authentic — like a solo founder sharing a real update, not corporate marketing.

COMMITS:
${commitSummary}

Generate exactly 3 drafts. Each draft must have:
1. hook: A punchy opener under 50 characters that grabs attention. No hashtags.
2. body: The tweet body. Total tweet (hook + body) must be under 280 characters. Use line breaks for readability. No hashtags.
3. category: One of "new_feature", "bug_fix", "improvement", "performance", "ui_update" — assign using these strict rules:
   - "new_feature": A capability that did not exist before (new page, new integration, new endpoint, new functionality)
   - "bug_fix": Something was broken or failing and is now fixed
   - "improvement": An existing feature made better, updated, or refined (pricing change, UX tweak, config update, refactor, dependency update)
   - "performance": ONLY when there is a measurable speed, size, or efficiency gain (response time, bundle size, load time, memory usage). Must involve a quantifiable metric.
   - "ui_update": Visual or layout changes with no functional difference (styling, colors, spacing, responsive fixes)
4. visual_type: One of "code_diff", "feature_highlight", "stats" — pick the most compelling for each draft, try to vary them
5. visual_data: Data for rendering the visual card:
   - For "code_diff": { "before": "2-5 lines of old code", "after": "2-5 lines of new code", "filename": "path/to/file.ext", "language": "typescript" }
   - For "feature_highlight": { "title": "Feature Name", "description": "One-line description", "icon": "single emoji" }
   - For "stats": { "items": [{ "label": "short label", "value": "number or short text" }] } (2-4 items)
6. commit_shas: Array of relevant commit SHAs from the input

Respond with ONLY a JSON array of 3 draft objects. No markdown, no explanation.`,
        },
      ],
    });

    const textContent = response.content.find((c: any) => c.type === "text");
    if (!textContent || textContent.type !== "text") {
      throw new Error("No text response from Claude");
    }

    let drafts;
    try {
      drafts = JSON.parse(textContent.text);
    } catch {
      // Try extracting JSON from markdown code block
      const match = textContent.text.match(/\[[\s\S]*\]/);
      if (match) {
        drafts = JSON.parse(match[0]);
      } else {
        throw new Error("Failed to parse Claude response as JSON");
      }
    }

    if (!Array.isArray(drafts) || drafts.length === 0) {
      throw new Error("Invalid draft format from Claude");
    }

    // Store drafts
    const draftRecords = drafts.slice(0, 3).map(
      (d: {
        hook: string;
        body: string;
        category: string;
        visual_type: string;
        visual_data: unknown;
        commit_shas: string[];
      }) => ({
        userId: user._id,
        scanId: args.scanId,
        repoId: args.repoId,
        hook: d.hook,
        body: d.body,
        category: d.category,
        visualType: d.visual_type as "code_diff" | "feature_highlight" | "stats",
        visualData: d.visual_data,
        commitShas: d.commit_shas,
      })
    );

    const draftIds = await ctx.runMutation(api.drafts.storeDrafts, {
      drafts: draftRecords,
    });

    // Increment generation counter
    await ctx.runMutation(api.users.incrementGenerations, {
      userId: user._id,
    });

    // Update scan status
    await ctx.runMutation(api.scans.updateScanStatus, {
      scanId: args.scanId,
      status: "complete",
      draftsGenerated: draftIds.length,
    });

    return draftIds;
  },
});
