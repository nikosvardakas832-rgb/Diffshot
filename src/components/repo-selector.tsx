"use client";

import { useState } from "react";
import { useAction, useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, GitBranch, Globe, Loader2, Lock, Search } from "lucide-react";
import { toast } from "sonner";
import { Id } from "../../convex/_generated/dataModel";

function formatRelativeDate(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diffMs = now - then;
  const diffMins = Math.floor(diffMs / 60_000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths}mo ago`;
  return `${Math.floor(diffMonths / 12)}y ago`;
}

export function RepoSelector() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, clerkId } = useCurrentUser();
  const repos = useQuery(
    api.repos.getUserRepos,
    user ? { userId: user._id } : "skip"
  );
  const listRepos = useAction(api.github.listRepos);
  const selectRepo = useMutation(api.repos.selectRepo);

  const handleRefresh = async (retryAfterRefresh = false) => {
    if (!clerkId) return;
    setLoading(true);
    try {
      await listRepos({ clerkId });
      toast.success("Repos refreshed!");
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes("GITHUB_TOKEN_EXPIRED") &&
        !retryAfterRefresh
      ) {
        try {
          const res = await fetch("/api/sync-github-token");
          if (res.ok) {
            toast.info("GitHub token refreshed. Retrying...");
            setLoading(false);
            return handleRefresh(true);
          }
        } catch {
          // Fall through
        }
        toast.error("GitHub token expired. Please sign out and sign back in.");
      } else {
        toast.error("Failed to fetch repos. Check your GitHub connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = async (repoId: Id<"repos">) => {
    if (!user) return;
    await selectRepo({ userId: user._id, repoId });
    toast.success("Repo selected!");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filteredRepos = repos?.filter(
    (r: any) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search repos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={handleRefresh} disabled={loading}>
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Refresh"
          )}
        </Button>
      </div>

      {!repos ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      ) : filteredRepos?.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          {repos.length === 0 ? (
            <div className="space-y-3">
              <p>No repos found.</p>
              <Button onClick={handleRefresh} disabled={loading}>
                Fetch repos from GitHub
              </Button>
            </div>
          ) : (
            <p>No repos match &quot;{search}&quot;</p>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {filteredRepos?.map((repo: any) => (
            <Card
              key={repo._id}
              className={`flex cursor-pointer items-center justify-between p-4 transition-all duration-200 ${
                repo.isActive
                  ? "border-primary/50 bg-[#B95126]/[0.06] shadow-[0_0_20px_rgba(185,81,38,0.06)]"
                  : "border-[#1a1a1f] bg-[#161618] shadow-[0_1px_10px_rgba(0,0,0,0.2)] hover:border-[#2A2A30] hover:bg-[#1E1E24]"
              }`}
              onClick={() => handleSelect(repo._id)}
            >
              <div className="flex items-center gap-3">
                <GitBranch className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-medium">{repo.name}</span>
                    {repo.isPrivate ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#2A2A30] bg-[#1a1a1f] px-2 py-0.5 text-[11px] text-muted-foreground">
                        <Lock className="h-3 w-3" />
                        Private
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full border border-[#2A2A30] bg-[#1a1a1f] px-2 py-0.5 text-[11px] text-muted-foreground">
                        <Globe className="h-3 w-3" />
                        Public
                      </span>
                    )}
                  </div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                    {repo.description && (
                      <span className="truncate max-w-[280px]">{repo.description}</span>
                    )}
                    {repo.description && repo.pushedAt && (
                      <span className="text-[#2A2A30]">·</span>
                    )}
                    {repo.pushedAt && (
                      <span className="whitespace-nowrap shrink-0">
                        Pushed {formatRelativeDate(repo.pushedAt)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {repo.language && (
                  <Badge variant="outline" className="text-xs">
                    {repo.language}
                  </Badge>
                )}
                {repo.isActive && (
                  <Check className="h-5 w-5 text-primary" />
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
