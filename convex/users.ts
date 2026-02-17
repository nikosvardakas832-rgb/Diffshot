// @ts-nocheck
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();
  },
});

export const createUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    avatarUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (existing) return existing._id;

    return await ctx.db.insert("users", {
      ...args,
      tier: "free",
      generationsUsedThisMonth: 0,
      generationResetDate: getNextMonthReset(),
      createdAt: Date.now(),
    });
  },
});

export const updateUser = mutation({
  args: {
    clerkId: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    avatarUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) return;

    const updates: Record<string, string> = {};
    if (args.name) updates.name = args.name;
    if (args.email) updates.email = args.email;
    if (args.avatarUrl) updates.avatarUrl = args.avatarUrl;

    await ctx.db.patch(user._id, updates);
  },
});

export const storeGithubToken = mutation({
  args: {
    clerkId: v.string(),
    githubAccessToken: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .unique();

    if (!user) throw new Error("User not found");

    await ctx.db.patch(user._id, {
      githubAccessToken: args.githubAccessToken,
    });
  },
});

export const storeTwitterTokens = mutation({
  args: {
    userId: v.id("users"),
    twitterAccessToken: v.string(),
    twitterRefreshToken: v.string(),
    twitterTokenExpiresAt: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      twitterAccessToken: args.twitterAccessToken,
      twitterRefreshToken: args.twitterRefreshToken,
      twitterTokenExpiresAt: args.twitterTokenExpiresAt,
    });
  },
});

export const getUserById = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;

    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) =>
        q.eq("clerkId", identity.subject)
      )
      .unique();
  },
});

export const incrementGenerations = mutation({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) throw new Error("User not found");

    // Reset counter if past reset date
    if (Date.now() > user.generationResetDate) {
      await ctx.db.patch(args.userId, {
        generationsUsedThisMonth: 1,
        generationResetDate: getNextMonthReset(),
      });
    } else {
      await ctx.db.patch(args.userId, {
        generationsUsedThisMonth: user.generationsUsedThisMonth + 1,
      });
    }
  },
});

function getNextMonthReset(): number {
  const now = new Date();
  const next = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return next.getTime();
}
