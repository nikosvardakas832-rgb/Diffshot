"use client";

import { useState } from "react";
import Image from "next/image";
import { useCurrentUser } from "@/hooks/use-current-user";
import { stripHookFromBody } from "@/lib/strip-hook-from-body";
import { CardLightbox } from "./card-lightbox";
import { Id } from "../../convex/_generated/dataModel";

interface TweetPreviewProps {
  hook: string;
  body: string;
  draftId: Id<"drafts">;
}

export function TweetPreview({ hook, body, draftId }: TweetPreviewProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { user } = useCurrentUser();
  const isPro = user?.tier === "pro";
  // Always use the live OG route for previews so card design stays current
  const imageUrl = `/api/og/${draftId}${isPro ? "?watermark=false" : ""}`;

  const displayBody = stripHookFromBody(hook, body);
  const tweetText = `${hook}\n\n${displayBody}`;
  const charCount = tweetText.length;
  const isOverLimit = charCount > 280;
  const isWarning = charCount >= 220;

  return (
    <div className="rounded-2xl border border-[#1a1a1f] bg-[#0e0e10] p-5 shadow-[0_2px_20px_rgba(0,0,0,0.3)]">
      <div className="mb-4 font-mono text-[10px] font-medium uppercase tracking-widest text-[#4a4a52]">
        Tweet Preview
      </div>

      <div className="space-y-3">
        {/* Author line */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary shadow-[0_0_12px_rgba(185,81,38,0.2)]" />
          <div>
            <div className="text-sm font-semibold">{user?.name ?? "You"}</div>
            <div className="text-xs text-[#4a4a52]">@you</div>
          </div>
        </div>

        {/* Tweet text */}
        <div className="whitespace-pre-line text-[15px] leading-relaxed text-[#A0A0A8]">
          <span className="font-heading font-semibold text-foreground">{hook}</span>
          {"\n\n"}
          {displayBody}
        </div>

        {/* Visual asset */}
        <div
          className="relative aspect-[1200/675] cursor-pointer overflow-hidden rounded-xl border border-[#1a1a1f]"
          onClick={() => setLightboxOpen(true)}
        >
          <Image
            src={imageUrl}
            alt="Visual changelog"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
        <CardLightbox
          imageUrl={imageUrl}
          open={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
        />

        {/* Character count */}
        <div className="flex items-center justify-between border-t border-[#1a1a1f] pt-3">
          <span
            className={`font-mono text-sm ${isOverLimit ? "font-semibold text-destructive" : isWarning ? "font-medium text-primary" : "text-[#4a4a52]"}`}
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
