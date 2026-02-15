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
import { Check, GitBranch, Loader2, Search } from "lucide-react";
import { toast } from "sonner";
import { Id } from "../../convex/_generated/dataModel";

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

  const handleRefresh = async () => {
    if (!clerkId) return;
    setLoading(true);
    try {
      await listRepos({ clerkId });
      toast.success("Repos refreshed!");
    } catch (error) {
      toast.error("Failed to fetch repos. Check your GitHub connection.");
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
              className={`flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-accent ${
                repo.isActive ? "border-violet-600 bg-accent" : ""
              }`}
              onClick={() => handleSelect(repo._id)}
            >
              <div className="flex items-center gap-3">
                <GitBranch className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">{repo.name}</div>
                  {repo.description && (
                    <div className="text-sm text-muted-foreground">
                      {repo.description}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {repo.language && (
                  <Badge variant="outline" className="text-xs">
                    {repo.language}
                  </Badge>
                )}
                {repo.isActive && (
                  <Check className="h-5 w-5 text-violet-500" />
                )}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
