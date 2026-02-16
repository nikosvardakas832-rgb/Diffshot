// @ts-nocheck
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const storeDrafts = mutation({
  args: {
    drafts: v.array(
      v.object({
        userId: v.id("users"),
        scanId: v.id("scans"),
        repoId: v.id("repos"),
        hook: v.string(),
        body: v.string(),
        category: v.string(),
        visualType: v.union(
          v.literal("code_diff"),
          v.literal("feature_highlight"),
          v.literal("stats")
        ),
        visualData: v.any(),
        commitShas: v.array(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const ids = [];
    for (const draft of args.drafts) {
      const id = await ctx.db.insert("drafts", {
        ...draft,
        status: "pending",
        createdAt: Date.now(),
      });
      ids.push(id);
    }
    return ids;
  },
});

export const getDraftById = query({
  args: { draftId: v.id("drafts") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.draftId);
  },
});

export const getUserDrafts = query({
  args: {
    userId: v.id("users"),
    repoId: v.optional(v.id("repos")),
    status: v.optional(
      v.union(
        v.literal("pending"),
        v.literal("published"),
        v.literal("discarded")
      )
    ),
  },
  handler: async (ctx, args) => {
    let drafts;
    if (args.repoId) {
      drafts = await ctx.db
        .query("drafts")
        .withIndex("by_repo", (q) => q.eq("repoId", args.repoId!))
        .order("desc")
        .collect();
      // Filter by userId and optionally status
      drafts = drafts.filter((d) => d.userId === args.userId);
    } else if (args.status) {
      return await ctx.db
        .query("drafts")
        .withIndex("by_status", (q) =>
          q.eq("userId", args.userId).eq("status", args.status!)
        )
        .order("desc")
        .collect();
    } else {
      return await ctx.db
        .query("drafts")
        .withIndex("by_user", (q) => q.eq("userId", args.userId))
        .order("desc")
        .collect();
    }

    if (args.status) {
      drafts = drafts.filter((d) => d.status === args.status);
    }
    return drafts;
  },
});

export const getDraftsByScan = query({
  args: { scanId: v.id("scans") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("drafts")
      .withIndex("by_scan", (q) => q.eq("scanId", args.scanId))
      .collect();
  },
});

export const updateDraft = mutation({
  args: {
    draftId: v.id("drafts"),
    hook: v.optional(v.string()),
    body: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const updates: Record<string, string> = {};
    if (args.hook !== undefined) updates.hook = args.hook;
    if (args.body !== undefined) updates.body = args.body;

    await ctx.db.patch(args.draftId, updates);
  },
});

export const discardDraft = mutation({
  args: { draftId: v.id("drafts") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.draftId, { status: "discarded" });
  },
});

export const markPublished = mutation({
  args: {
    draftId: v.id("drafts"),
    tweetId: v.string(),
    tweetUrl: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.draftId, {
      status: "published",
      tweetId: args.tweetId,
      tweetUrl: args.tweetUrl,
      publishedAt: Date.now(),
    });
  },
});

export const setVisualAsset = mutation({
  args: {
    draftId: v.id("drafts"),
    visualAssetId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.draftId, {
      visualAssetId: args.visualAssetId,
    });
  },
});

export const getVisualAssetUrl = query({
  args: { draftId: v.id("drafts") },
  handler: async (ctx, args) => {
    const draft = await ctx.db.get(args.draftId);
    if (!draft?.visualAssetId) return null;

    return await ctx.storage.getUrl(draft.visualAssetId);
  },
});
