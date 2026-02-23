import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { CardWrapper } from "@/lib/og/card-wrapper";
import { CodeDiffCard } from "@/lib/og/code-diff-card";
import { FeatureHighlightCard } from "@/lib/og/feature-highlight-card";
import { StatsCard } from "@/lib/og/stats-card";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";

function getConvex() {
  return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ draftId: string }> }
) {
  try {
    const { draftId } = await params;
    const watermark =
      request.nextUrl.searchParams.get("watermark") !== "false";

    const convex = getConvex();

    const draft = await convex.query(api.drafts.getDraftById, {
      draftId: draftId as Id<"drafts">,
    });

    if (!draft) {
      return new Response("Draft not found", { status: 404 });
    }

    // Get repo name for card header
    const repos = await convex.query(api.repos.getUserRepos, {
      userId: draft.userId,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const repo = (repos as any[]).find((r: any) => r._id === draft.repoId);
    const repoName = repo?.fullName ?? "unknown/repo";

    const date = new Date(draft.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const faviconPath = join(process.cwd(), "public", "favicon_final.png");
    const faviconBuffer = await readFile(faviconPath);
    const faviconSrc = `data:image/png;base64,${faviconBuffer.toString("base64")}`;

    let cardContent;
    switch (draft.visualType) {
      case "code_diff":
        cardContent = <CodeDiffCard data={draft.visualData} />;
        break;
      case "feature_highlight":
        cardContent = <FeatureHighlightCard data={draft.visualData} />;
        break;
      case "stats":
        cardContent = <StatsCard data={draft.visualData} />;
        break;
      default:
        cardContent = (
          <div style={{ display: "flex", fontSize: 32, color: "#8b949e" }}>
            {draft.hook}
          </div>
        );
    }

    return new ImageResponse(
      (
        <CardWrapper repoName={repoName} date={date} watermark={watermark} faviconSrc={faviconSrc} category={draft.category}>
          {cardContent}
        </CardWrapper>
      ),
      { width: 1200, height: 675 }
    );
  } catch (error) {
    console.error("OG image generation failed:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
