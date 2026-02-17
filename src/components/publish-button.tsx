"use client";

import { useState } from "react";
import { useAction, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Id } from "../../convex/_generated/dataModel";
import { useCurrentUser } from "@/hooks/use-current-user";

// X logo as inline SVG
function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function PublishButton({ draftId }: { draftId: Id<"drafts"> }) {
  const [publishing, setPublishing] = useState(false);
  const { user } = useCurrentUser();
  const publishTweet = useAction(api.twitter.publishTweet);
  const generateUploadUrl = useMutation(api.drafts.generateUploadUrl);
  const setVisualAsset = useMutation(api.drafts.setVisualAsset);

  const hasTwitter = !!user?.twitterAccessToken;

  const handlePublish = async () => {
    if (!user) return;

    if (!hasTwitter) {
      // Redirect to Twitter OAuth
      window.location.href = "/api/auth/twitter";
      return;
    }

    setPublishing(true);
    try {
      // Generate and upload the visual asset if not already stored
      const ogResponse = await fetch(`/api/og/${draftId}?watermark=false`);
      if (ogResponse.ok) {
        const imageBlob = await ogResponse.blob();
        const uploadUrl = await generateUploadUrl();
        const uploadResponse = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": imageBlob.type },
          body: imageBlob,
        });
        if (uploadResponse.ok) {
          const { storageId } = await uploadResponse.json();
          await setVisualAsset({ draftId, visualAssetId: storageId });
        }
      }

      const result = await publishTweet({
        userId: user._id,
        draftId,
      });

      toast.success(
        <div className="flex flex-col gap-1">
          <span>Published to X!</span>
          <a
            href={result.tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-400 underline"
          >
            View tweet
          </a>
        </div>
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to publish. Please try again."
      );
    } finally {
      setPublishing(false);
    }
  };

  return (
    <Button
      size="sm"
      onClick={handlePublish}
      disabled={publishing}
      className="gap-2 bg-black text-white hover:bg-black/80"
    >
      {publishing ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <XLogo className="h-3 w-3" />
      )}
      {hasTwitter ? "Post to X" : "Connect X & Post"}
    </Button>
  );
}
