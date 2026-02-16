"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useCurrentUser } from "@/hooks/use-current-user";
import { DraftCard, DraftCardSkeleton } from "@/components/draft-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

type StatusFilter = "all" | "pending" | "published" | "discarded";

export default function DraftsPage() {
  const [filter, setFilter] = useState<StatusFilter>("all");
  const { user } = useCurrentUser();
  const activeRepo = useQuery(
    api.repos.getActiveRepo,
    user ? { userId: user._id } : "skip"
  );
  const drafts = useQuery(
    api.drafts.getUserDrafts,
    user && activeRepo
      ? {
          userId: user._id,
          repoId: activeRepo._id,
          status: filter === "all" ? undefined : filter,
        }
      : "skip"
  );

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Drafts</h1>
      </div>

      <Tabs
        value={filter}
        onValueChange={(v) => setFilter(v as StatusFilter)}
      >
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="discarded">Discarded</TabsTrigger>
        </TabsList>
      </Tabs>

      {!drafts ? (
        <div className="space-y-6">
          <DraftCardSkeleton />
          <DraftCardSkeleton />
        </div>
      ) : drafts.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">
          No drafts found{filter !== "all" ? ` with status "${filter}"` : ""}.
        </div>
      ) : (
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
