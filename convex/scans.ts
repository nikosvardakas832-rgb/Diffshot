// @ts-nocheck
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createScan = mutation({
  args: {
    userId: v.id("users"),
    repoId: v.id("repos"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("scans", {
      userId: args.userId,
      repoId: args.repoId,
      commitCount: 0,
      draftsGenerated: 0,
      status: "scanning",
      createdAt: Date.now(),
    });
  },
});

export const updateScanStatus = mutation({
  args: {
    scanId: v.id("scans"),
    status: v.union(
      v.literal("scanning"),
      v.literal("filtering"),
      v.literal("generating"),
      v.literal("complete"),
      v.literal("failed")
    ),
    commitCount: v.optional(v.number()),
    draftsGenerated: v.optional(v.number()),
    error: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const updates: Record<string, unknown> = { status: args.status };
    if (args.commitCount !== undefined) updates.commitCount = args.commitCount;
    if (args.draftsGenerated !== undefined)
      updates.draftsGenerated = args.draftsGenerated;
    if (args.error !== undefined) updates.error = args.error;

    await ctx.db.patch(args.scanId, updates);
  },
});

export const getLatestScan = query({
  args: { repoId: v.id("repos") },
  handler: async (ctx, args) => {
    const scans = await ctx.db
      .query("scans")
      .withIndex("by_repo", (q) => q.eq("repoId", args.repoId))
      .order("desc")
      .take(1);

    return scans[0] ?? null;
  },
});

export const getUserScans = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("scans")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(20);
  },
});
