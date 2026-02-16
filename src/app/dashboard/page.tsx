"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useCurrentUser } from "@/hooks/use-current-user";
import { DraftCard, DraftCardSkeleton } from "@/components/draft-card";
import { ScanButton } from "@/components/scan-button";
import Link from "next/link";
import { GitBranch, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const { user } = useCurrentUser();
  const activeRepo = useQuery(
    api.repos.getActiveRepo,
    user ? { userId: user._id } : "skip"
  );
  const drafts = useQuery(
    api.drafts.getUserDrafts,
    user && activeRepo
      ? { userId: user._id, repoId: activeRepo._id, status: "pending" }
      : "skip"
  );

  if (!user) {
    return (
      <div className="space-y-6">
        <DraftCardSkeleton />
        <DraftCardSkeleton />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {activeRepo && (
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <GitBranch className="h-3 w-3" />
              {activeRepo.fullName}
            </p>
          )}
        </div>
        {activeRepo && <ScanButton repoId={activeRepo._id} />}
      </div>

      {/* No repo selected */}
      {!activeRepo && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20">
          <GitBranch className="mb-4 h-12 w-12 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-semibold">Select a Repository</h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Choose a GitHub repo to start generating visual changelogs.
          </p>
          <Button asChild>
            <Link href="/dashboard/connect">Connect a Repo</Link>
          </Button>
        </div>
      )}

      {/* No drafts */}
      {activeRepo && drafts?.length === 0 && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border py-20">
          <Sparkles className="mb-4 h-12 w-12 text-muted-foreground" />
          <h2 className="mb-2 text-xl font-semibold">No Drafts Yet</h2>
          <p className="mb-6 text-center text-sm text-muted-foreground">
            Hit &quot;Scan for New Commits&quot; to generate your first visual
            changelog posts.
          </p>
        </div>
      )}

      {/* Draft feed */}
      {drafts && drafts.length > 0 && (
        <div className="space-y-6">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {drafts.map((draft: any) => (
            <DraftCard key={draft._id} draft={draft} />
          ))}
        </div>
      )}
    </div>
  );
}
