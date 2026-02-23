"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useCurrentUser } from "@/hooks/use-current-user";
import { DraftCard, DraftCardSkeleton } from "@/components/draft-card";
import { ScanButton } from "@/components/scan-button";
import Link from "next/link";
import { GitBranch, Clock, Check, Zap, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";

const GENERATION_LIMITS: Record<string, number> = {
  free: 3,
  pro: 50,
};

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
  const publishedCount = useQuery(
    api.drafts.getPublishedCountThisMonth,
    user && activeRepo
      ? { userId: user._id, repoId: activeRepo._id }
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

  const limit = GENERATION_LIMITS[user.tier] ?? 3;
  const used = user.generationsUsedThisMonth;
  const remaining = Math.max(0, limit - used);
  const pendingCount = drafts?.length ?? 0;

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-[32px] font-semibold tracking-tight">Dashboard</h1>
          {activeRepo && (
            <p className="mt-1 flex items-center gap-2 text-sm text-[#71717A]">
              <GitBranch className="h-3.5 w-3.5" />
              <span className="font-mono text-xs">{activeRepo.fullName}</span>
            </p>
          )}
        </div>
        {activeRepo && <ScanButton repoId={activeRepo._id} />}
      </div>

      {/* Stats Row */}
      {activeRepo && (
        <div className="grid grid-cols-3 gap-4">
          {/* Pending */}
          <div
            style={{
              background: "#1E1E24",
              border: "1px solid #2A2A30",
              borderRadius: 10,
              padding: "16px 20px",
            }}
          >
            <div className="flex items-center gap-2.5">
              <Clock className="h-4 w-4 text-[#B95126]" />
              <span className="text-[12px] font-normal uppercase tracking-wider text-[#A0A0A8]">
                Pending
              </span>
            </div>
            <p className="mt-2 font-heading text-[28px] font-semibold text-white">
              {pendingCount}
            </p>
          </div>

          {/* Published */}
          <div
            style={{
              background: "#1E1E24",
              border: "1px solid #2A2A30",
              borderRadius: 10,
              padding: "16px 20px",
            }}
          >
            <div className="flex items-center gap-2.5">
              <Check className="h-4 w-4 text-[#57C5B6]" />
              <span className="text-[12px] font-normal uppercase tracking-wider text-[#A0A0A8]">
                Published
              </span>
            </div>
            <p className="mt-2 font-heading text-[28px] font-semibold text-white">
              {publishedCount ?? 0}
            </p>
          </div>

          {/* Generations Left */}
          <div
            style={{
              background: "#1E1E24",
              border: "1px solid #2A2A30",
              borderRadius: 10,
              padding: "16px 20px",
            }}
          >
            <div className="flex items-center gap-2.5">
              <Zap className="h-4 w-4 text-[#B95126]" />
              <span className="text-[12px] font-normal uppercase tracking-wider text-[#A0A0A8]">
                Generations Left
              </span>
            </div>
            <p className="mt-2 font-heading text-[28px] font-semibold text-white">
              {remaining}{" "}
              <span className="text-[16px] font-normal text-[#71717A]">/ {limit}</span>
            </p>
          </div>
        </div>
      )}

      {/* No repo selected */}
      {!activeRepo && (
        <div className="relative overflow-hidden rounded-2xl border border-[#1a1a1f] bg-[#161618] py-24 shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
          <div className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B95126]/[0.08] blur-[80px]" />
          <div className="relative flex flex-col items-center">
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#2A2A30] bg-[#1E1E24]">
              <GitBranch className="h-7 w-7 text-[#71717A]" />
            </div>
            <h2 className="mb-2 font-heading text-xl font-semibold">Select a Repository</h2>
            <p className="mb-8 text-sm text-[#71717A]">
              Choose a GitHub repo to start generating visual changelogs.
            </p>
            <Button asChild>
              <Link href="/dashboard/connect">Connect a Repo</Link>
            </Button>
          </div>
        </div>
      )}

      {/* Empty state — no pending drafts */}
      {activeRepo && drafts?.length === 0 && (
        <div className="relative overflow-hidden rounded-2xl border border-[#1a1a1f] bg-[#161618] py-24 shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
          <div className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B95126]/[0.08] blur-[80px]" />
          <div className="relative flex flex-col items-center">
            <Inbox className="mb-6 h-12 w-12 text-[#A0A0A8]/40" />
            <h2 className="mb-2 font-heading text-[20px] font-semibold text-white">
              No pending drafts
            </h2>
            <p className="mb-5 text-[14px] text-[#A0A0A8]">
              Scan your repo to generate visual changelog drafts.
            </p>
            <ScanButton repoId={activeRepo._id} />
          </div>
        </div>
      )}

      {/* Draft feed */}
      {drafts && drafts.length > 0 && (
        <div className="space-y-4">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {drafts.map((draft: any, index: number) => (
            <DraftCard key={draft._id} draft={draft} isNewest={index === 0} />
          ))}
        </div>
      )}
    </div>
  );
}
