"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Edit, Trash2, ExternalLink } from "lucide-react";
import { Id } from "../../convex/_generated/dataModel";
import { PublishButton } from "./publish-button";
import { CategoryPicker } from "./category-picker";
import { CardLightbox } from "./card-lightbox";
import { useCurrentUser } from "@/hooks/use-current-user";
import { stripHookFromBody } from "@/lib/strip-hook-from-body";

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
  isNewest?: boolean;
}

export function DraftCard({ draft, isNewest = false }: DraftCardProps) {
  const [imageVersion, setImageVersion] = useState(0);
  const [isTruncated, setIsTruncated] = useState(false);
  const [showFull, setShowFull] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const { user } = useCurrentUser();
  const discardDraft = useMutation(api.drafts.discardDraft);
  const updateDraft = useMutation(api.drafts.updateDraft);

  const isPro = user?.tier === "pro";
  const imageUrl = `/api/og/${draft._id}?v=${imageVersion}${isPro ? "&watermark=false" : ""}`;

  const statusVariant: Record<string, "pending" | "published" | "discarded"> = {
    pending: "pending",
    published: "published",
    discarded: "discarded",
  };

  // Strip duplicated hook from body
  const displayBody = stripHookFromBody(draft.hook, draft.body);

  // Check if body text is truncated
  useEffect(() => {
    const el = bodyRef.current;
    if (el && !showFull) {
      setIsTruncated(el.scrollHeight > el.clientHeight);
    }
  }, [displayBody, showFull]);

  return (
    <div
      className="group transition-all duration-300"
      style={{
        background: "#1E1E24",
        border: "1px solid #2A2A30",
        borderRadius: 12,
        padding: 20,
        borderLeft: isNewest ? "3px solid #B95126" : "1px solid #2A2A30",
      }}
    >
      <div className="flex gap-5">
        {/* Left — Visual card image (60%) */}
        <div className="w-[60%] shrink-0">
          <div
            className="relative cursor-pointer overflow-hidden rounded-lg bg-[#0d1117]"
            style={{ aspectRatio: "1200/675", minHeight: 200 }}
            onClick={() => setLightboxOpen(true)}
          >
            <Image
              src={imageUrl}
              alt="Visual changelog card"
              fill
              className="object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              unoptimized
            />
          </div>
          <CardLightbox
            imageUrl={imageUrl}
            open={lightboxOpen}
            onClose={() => setLightboxOpen(false)}
          />
        </div>

        {/* Right — Content (50%) */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Hook title */}
          <h3 className="font-heading text-[18px] font-semibold leading-snug tracking-tight text-white">
            {draft.hook}
          </h3>

          {/* Body text */}
          <div className="mt-2 min-w-0">
            <p
              ref={bodyRef}
              className={`whitespace-pre-line text-[14px] leading-relaxed text-[#A0A0A8] ${
                showFull ? "" : "line-clamp-3"
              }`}
            >
              {displayBody}
            </p>
            {isTruncated && !showFull && (
              <button
                onClick={() => setShowFull(true)}
                className="mt-1 text-[13px] font-medium text-[#B95126] transition-colors hover:text-[#d4633a]"
              >
                Show more
              </button>
            )}
            {showFull && isTruncated && (
              <button
                onClick={() => setShowFull(false)}
                className="mt-1 text-[13px] font-medium text-[#B95126] transition-colors hover:text-[#d4633a]"
              >
                Show less
              </button>
            )}
          </div>

          {/* Status + Category row */}
          <div className="mt-3 flex items-center gap-2">
            <Badge variant={statusVariant[draft.status] ?? "outline"}>
              {draft.status}
            </Badge>
            <CategoryPicker
              category={draft.category}
              onCategoryChange={async (newCategory) => {
                await updateDraft({ draftId: draft._id, category: newCategory });
                setImageVersion((v) => v + 1);
              }}
            />
          </div>

          {/* Action buttons */}
          <div className="mt-4 flex items-center gap-2">
            {draft.status === "pending" && (
              <>
                <PublishButton draftId={draft._id} />
                <Link
                  href={`/dashboard/drafts/${draft._id}`}
                  className="inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-[13px] font-medium text-[#A0A0A8] transition-colors"
                  style={{ border: "1px solid #2A2A30" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#3A3A42";
                    e.currentTarget.style.color = "#FAFAFA";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#2A2A30";
                    e.currentTarget.style.color = "#A0A0A8";
                  }}
                >
                  <Edit className="h-3 w-3" />
                  Edit
                </Link>
                <button
                  onClick={() => discardDraft({ draftId: draft._id })}
                  className="inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-[13px] font-medium text-[#A0A0A8] transition-colors"
                  style={{ border: "1px solid #2A2A30" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#E5484D";
                    e.currentTarget.style.color = "#E5484D";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#2A2A30";
                    e.currentTarget.style.color = "#A0A0A8";
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                  Discard
                </button>
              </>
            )}
            {draft.status === "published" && draft.tweetUrl && (
              <a
                href={draft.tweetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md px-4 py-2 text-[13px] font-medium text-[#A0A0A8] transition-colors"
                style={{ border: "1px solid #2A2A30" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#57C5B6";
                  e.currentTarget.style.color = "#57C5B6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#2A2A30";
                  e.currentTarget.style.color = "#A0A0A8";
                }}
              >
                <ExternalLink className="h-3 w-3" />
                View on X
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DraftCardSkeleton() {
  return (
    <div
      style={{
        background: "#1E1E24",
        border: "1px solid #2A2A30",
        borderRadius: 12,
        padding: 20,
      }}
    >
      <div className="flex gap-5">
        <div className="w-[40%] shrink-0">
          <Skeleton className="w-full rounded-lg" style={{ aspectRatio: "1200/675" }} />
        </div>
        <div className="flex flex-1 flex-col gap-3">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="mt-auto flex gap-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}
