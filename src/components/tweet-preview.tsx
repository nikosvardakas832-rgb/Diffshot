"use client";

import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Id } from "../../convex/_generated/dataModel";

interface TweetPreviewProps {
  hook: string;
  body: string;
  draftId: Id<"drafts">;
}

export function TweetPreview({ hook, body, draftId }: TweetPreviewProps) {
  const { user } = useCurrentUser();
  const storedAssetUrl = useQuery(api.drafts.getVisualAssetUrl, { draftId });
  const imageUrl = storedAssetUrl || `/api/og/${draftId}`;

  const tweetText = `${hook}\n\n${body}`;
  const charCount = tweetText.length;
  const isOverLimit = charCount > 280;

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
        Tweet Preview
      </div>

      <div className="space-y-3">
        {/* Author line */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-600 to-blue-600" />
          <div>
            <div className="text-sm font-semibold">{user?.name ?? "You"}</div>
            <div className="text-xs text-muted-foreground">@you</div>
          </div>
        </div>

        {/* Tweet text */}
        <div className="whitespace-pre-line text-[15px] leading-relaxed">
          <span className="font-semibold">{hook}</span>
          {"\n\n"}
          {body}
        </div>

        {/* Visual asset */}
        <div className="relative aspect-[1200/675] overflow-hidden rounded-xl border border-border">
          <Image
            src={imageUrl}
            alt="Visual changelog"
            fill
            className="object-cover"
            unoptimized
          />
        </div>

        {/* Character count */}
        <div className="flex items-center justify-between border-t border-border pt-3">
          <span
            className={`text-sm ${isOverLimit ? "font-semibold text-destructive" : "text-muted-foreground"}`}
          >
            {charCount}/280
          </span>
          {isOverLimit && (
            <span className="text-xs text-destructive">
              {charCount - 280} characters over limit
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
