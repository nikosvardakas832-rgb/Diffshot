"use client";

import { use, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TweetPreview } from "@/components/tweet-preview";
import { PublishButton } from "@/components/publish-button";
import { ArrowLeft, Save } from "lucide-react";
import { Id } from "../../../../../convex/_generated/dataModel";
import Link from "next/link";
import { toast } from "sonner";
import { stripHookFromBody } from "@/lib/strip-hook-from-body";

export default function DraftEditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const draftId = id as Id<"drafts">;
  const draft = useQuery(api.drafts.getDraftById, { draftId });
  const updateDraft = useMutation(api.drafts.updateDraft);

  const [hook, setHook] = useState<string | null>(null);
  const [body, setBody] = useState<string | null>(null);

  const currentHook = hook ?? draft?.hook ?? "";
  const currentBody = body ?? (draft ? stripHookFromBody(draft.hook, draft.body) : "");
  const hasChanges =
    (hook !== null && hook !== draft?.hook) ||
    (body !== null && body !== draft?.body);

  const handleSave = async () => {
    await updateDraft({
      draftId,
      hook: currentHook,
      body: currentBody,
    });
    setHook(null);
    setBody(null);
    toast.success("Draft saved!");
  };

  if (!draft) {
    return (
      <div className="flex h-96 items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/drafts">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Link>
        </Button>
        <h1 className="font-heading text-[32px] font-semibold tracking-tight">Edit Draft</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Editor */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Hook</label>
            <Input
              value={currentHook}
              onChange={(e) => setHook(e.target.value)}
              placeholder="Punchy opener..."
              maxLength={50}
            />
            <span className="text-xs text-muted-foreground">
              {currentHook.length}/50
            </span>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Body</label>
            <Textarea
              value={currentBody}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Tweet body..."
              rows={6}
            />
            {(() => {
              const total = `${currentHook}\n\n${currentBody}`.length;
              return (
                <span className={`text-xs font-mono ${total >= 250 ? "text-destructive font-medium" : total >= 220 ? "text-primary font-medium" : "text-muted-foreground"}`}>
                  {total}/280
                </span>
              );
            })()}
          </div>

          <div className="flex items-center gap-3">
            {hasChanges && (
              <Button onClick={handleSave} size="sm" className="gap-2">
                <Save className="h-3 w-3" />
                Save Changes
              </Button>
            )}
            {draft.status === "pending" && (
              <PublishButton draftId={draftId} />
            )}
          </div>
        </div>

        {/* Preview */}
        <TweetPreview
          hook={currentHook}
          body={currentBody}
          draftId={draftId}
        />
      </div>
    </div>
  );
}
