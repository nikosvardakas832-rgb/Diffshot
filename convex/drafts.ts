// @ts-nocheck
import { v } from "convex/values";
import { mutation, query, QueryCtx, MutationCtx } from "./_generated/server";

// Helper: get authenticated user from Clerk identity
async function getAuthenticatedUser(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Not authenticated");
  const user = await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
    .unique();
  if (!user) throw new Error("User not found");
  return user;
}

// Helper: verify the caller owns a draft
async function verifyDraftOwnership(ctx: QueryCtx | MutationCtx, draftId) {
  const user = await getAuthenticatedUser(ctx);
  const draft = await ctx.db.get(draftId);
  if (!draft || draft.userId !== user._id) throw new Error("Not authorized");
  return { user, draft };
}

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

export const getPublishedCountThisMonth = query({
  args: { userId: v.id("users"), repoId: v.optional(v.id("repos")) },
  handler: async (ctx, args) => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();

    let drafts;
    if (args.repoId) {
      drafts = await ctx.db
        .query("drafts")
        .withIndex("by_repo", (q) => q.eq("repoId", args.repoId!))
        .collect();
      drafts = drafts.filter(
        (d) =>
          d.userId === args.userId &&
          d.status === "published" &&
          (d.publishedAt ?? d.createdAt) >= startOfMonth
      );
    } else {
      drafts = await ctx.db
        .query("drafts")
        .withIndex("by_status", (q) =>
          q.eq("userId", args.userId).eq("status", "published")
        )
        .collect();
      drafts = drafts.filter(
        (d) => (d.publishedAt ?? d.createdAt) >= startOfMonth
      );
    }

    return drafts.length;
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
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await verifyDraftOwnership(ctx, args.draftId);

    const updates: Record<string, string> = {};
    if (args.hook !== undefined) updates.hook = args.hook;
    if (args.body !== undefined) updates.body = args.body;
    if (args.category !== undefined) updates.category = args.category;

    await ctx.db.patch(args.draftId, updates);
  },
});

export const discardDraft = mutation({
  args: { draftId: v.id("drafts") },
  handler: async (ctx, args) => {
    await verifyDraftOwnership(ctx, args.draftId);
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

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    // Require authentication to generate upload URLs
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    return await ctx.storage.generateUploadUrl();
  },
});

export const setVisualAsset = mutation({
  args: {
    draftId: v.id("drafts"),
    visualAssetId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    await verifyDraftOwnership(ctx, args.draftId);
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
