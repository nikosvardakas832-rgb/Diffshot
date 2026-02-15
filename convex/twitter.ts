// @ts-nocheck
"use node";

import { v } from "convex/values";
import { action } from "./_generated/server";
import { api } from "./_generated/api";

const TWITTER_API = "https://api.twitter.com/2";
const TWITTER_UPLOAD_API = "https://upload.twitter.com/1.1";

export const refreshTokenIfNeeded = action({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(api.users.getCurrentUser, {});
    if (!user) throw new Error("User not found");

    // Check if token is expired (with 5-minute buffer)
    if (
      user.twitterTokenExpiresAt &&
      Date.now() < user.twitterTokenExpiresAt - 5 * 60 * 1000
    ) {
      return user.twitterAccessToken!;
    }

    if (!user.twitterRefreshToken) {
      throw new Error("No refresh token available. Please reconnect X.");
    }

    // Refresh the token
    const clientId = process.env.TWITTER_CLIENT_ID!;
    const clientSecret = process.env.TWITTER_CLIENT_SECRET!;

    const response = await fetch("https://api.twitter.com/2/oauth2/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: user.twitterRefreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error(`Token refresh failed: ${await response.text()}`);
    }

    const data = await response.json();

    await ctx.runMutation(api.users.storeTwitterTokens, {
      userId: args.userId,
      twitterAccessToken: data.access_token,
      twitterRefreshToken: data.refresh_token,
      twitterTokenExpiresAt: Date.now() + data.expires_in * 1000,
    });

    return data.access_token as string;
  },
});

export const publishTweet = action({
  args: {
    userId: v.id("users"),
    draftId: v.id("drafts"),
  },
  handler: async (ctx, args) => {
    // Get draft
    const draft = await ctx.runQuery(api.drafts.getDraftById, {
      draftId: args.draftId,
    });
    if (!draft) throw new Error("Draft not found");

    // Refresh token if needed
    const accessToken = await ctx.runAction(api.twitter.refreshTokenIfNeeded, {
      userId: args.userId,
    });

    // Get visual asset URL
    const assetUrl = await ctx.runQuery(api.drafts.getVisualAssetUrl, {
      draftId: args.draftId,
    });

    let mediaId: string | undefined;

    // Upload media if visual asset exists
    if (assetUrl) {
      const imageResponse = await fetch(assetUrl);
      const imageBuffer = await imageResponse.arrayBuffer();

      // Step 1: INIT
      const initResponse = await fetch(
        `${TWITTER_UPLOAD_API}/media/upload.json`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            command: "INIT",
            total_bytes: imageBuffer.byteLength.toString(),
            media_type: "image/png",
            media_category: "tweet_image",
          }),
        }
      );

      if (!initResponse.ok) {
        throw new Error(`Media upload INIT failed: ${await initResponse.text()}`);
      }

      const initData = await initResponse.json();
      mediaId = initData.media_id_string;

      // Step 2: APPEND
      const formData = new FormData();
      formData.append("command", "APPEND");
      formData.append("media_id", mediaId!);
      formData.append("segment_index", "0");
      formData.append(
        "media_data",
        Buffer.from(imageBuffer).toString("base64")
      );

      const appendResponse = await fetch(
        `${TWITTER_UPLOAD_API}/media/upload.json`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formData,
        }
      );

      if (!appendResponse.ok) {
        throw new Error(
          `Media upload APPEND failed: ${await appendResponse.text()}`
        );
      }

      // Step 3: FINALIZE
      const finalizeResponse = await fetch(
        `${TWITTER_UPLOAD_API}/media/upload.json`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            command: "FINALIZE",
            media_id: mediaId!,
          }),
        }
      );

      if (!finalizeResponse.ok) {
        throw new Error(
          `Media upload FINALIZE failed: ${await finalizeResponse.text()}`
        );
      }
    }

    // Create tweet
    const tweetText = `${draft.hook}\n\n${draft.body}`;

    const tweetBody: Record<string, unknown> = { text: tweetText };
    if (mediaId) {
      tweetBody.media = { media_ids: [mediaId] };
    }

    const tweetResponse = await fetch(`${TWITTER_API}/tweets`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tweetBody),
    });

    if (!tweetResponse.ok) {
      throw new Error(
        `Tweet creation failed: ${await tweetResponse.text()}`
      );
    }

    const tweetData = await tweetResponse.json();
    const tweetId = tweetData.data.id;

    // Mark draft as published
    await ctx.runMutation(api.drafts.markPublished, {
      draftId: args.draftId,
      tweetId,
      tweetUrl: `https://x.com/i/status/${tweetId}`,
    });

    return { tweetId, tweetUrl: `https://x.com/i/status/${tweetId}` };
  },
});
