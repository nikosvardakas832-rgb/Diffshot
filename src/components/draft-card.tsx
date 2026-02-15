"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronDown,
  ChevronRight,
  Edit,
  RefreshCw,
  Trash2,
  ExternalLink,
} from "lucide-react";
import { Id } from "../../convex/_generated/dataModel";
import { PublishButton } from "./publish-button";

interface DraftCardProps {
  draft: {
    _id: Id<"drafts">;
    hook: string;
    body: string;
    category: string;
    visualType: string;
    commitShas: string[];
    status: string;
    tweetUrl?: string;
    createdAt: number;
  };
}

export function DraftCard({ draft }: DraftCardProps) {
  const [showCommits, setShowCommits] = useState(false);
  const storedAssetUrl = useQuery(api.drafts.getVisualAssetUrl, {
    draftId: draft._id,
  });
  const discardDraft = useMutation(api.drafts.discardDraft);

  // Use Convex storage URL if available, otherwise generate on-the-fly via OG route
  const imageUrl = storedAssetUrl || `/api/og/${draft._id}`;

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    published: "bg-green-500/10 text-green-500 border-green-500/20",
    discarded: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <Card className="overflow-hidden border-border bg-card">
      {/* Visual Asset (Hero) */}
      <div className="relative aspect-[1200/675] w-full bg-[#0d1117]">
        <Image
          src={imageUrl}
          alt="Visual changelog card"
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Content */}
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="text-lg font-semibold leading-tight">{draft.hook}</p>
            <p className="whitespace-pre-line text-sm text-muted-foreground">
              {draft.body}
            </p>
          </div>
          <div className="flex shrink-0 gap-2">
            <Badge variant="outline" className={statusColors[draft.status]}>
              {draft.status}
            </Badge>
            <Badge variant="outline">{draft.category}</Badge>
          </div>
        </div>

        {/* Source commits (collapsible) */}
        <button
          onClick={() => setShowCommits(!showCommits)}
          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
        >
          {showCommits ? (
            <ChevronDown className="h-3 w-3" />
          ) : (
            <ChevronRight className="h-3 w-3" />
          )}
          Source commits ({draft.commitShas.length})
        </button>
        {showCommits && (
          <div className="space-y-1 rounded-md bg-secondary/50 p-3">
            {draft.commitShas.map((sha) => (
              <code key={sha} className="block text-xs text-muted-foreground">
                {sha.slice(0, 7)}
              </code>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-1">
          {draft.status === "pending" && (
            <>
              <PublishButton draftId={draft._id} />
              <Button variant="outline" size="sm" asChild>
                <Link href={`/dashboard/drafts/${draft._id}`}>
                  <Edit className="mr-1 h-3 w-3" />
                  Edit
                </Link>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => discardDraft({ draftId: draft._id })}
                className="text-destructive hover:text-destructive"
              >
                <Trash2 className="mr-1 h-3 w-3" />
                Discard
              </Button>
            </>
          )}
          {draft.status === "published" && draft.tweetUrl && (
            <Button variant="outline" size="sm" asChild>
              <a href={draft.tweetUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1 h-3 w-3" />
                View on X
              </a>
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}

export function DraftCardSkeleton() {
  return (
    <Card className="overflow-hidden border-border bg-card">
      <Skeleton className="aspect-[1200/675] w-full" />
      <div className="space-y-3 p-5">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2 pt-1">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    </Card>
  );
}
