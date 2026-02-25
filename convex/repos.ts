// @ts-nocheck
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getUserRepos = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("repos")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

export const getActiveRepo = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const repos = await ctx.db
      .query("repos")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    return repos.find((r) => r.isActive) ?? null;
  },
});

export const upsertRepo = mutation({
  args: {
    userId: v.id("users"),
    githubId: v.number(),
    name: v.string(),
    fullName: v.string(),
    description: v.optional(v.string()),
    language: v.optional(v.string()),
    pushedAt: v.string(),
    isPrivate: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const owner = await ctx.db.get(args.userId);
    if (!owner || owner.clerkId !== identity.subject) throw new Error("Not authorized");

    const existing = await ctx.db
      .query("repos")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const match = existing.find((r) => r.githubId === args.githubId);

    if (match) {
      await ctx.db.patch(match._id, {
        name: args.name,
        fullName: args.fullName,
        description: args.description,
        language: args.language,
        pushedAt: args.pushedAt,
        isPrivate: args.isPrivate,
      });
      return match._id;
    }

    return await ctx.db.insert("repos", {
      ...args,
      isActive: false,
      lastScannedAt: undefined,
      createdAt: Date.now(),
    });
  },
});

export const selectRepo = mutation({
  args: {
    userId: v.id("users"),
    repoId: v.id("repos"),
  },
  handler: async (ctx, args) => {
    // Verify the caller owns this user account
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const user = await ctx.db.get(args.userId);
    if (!user || user.clerkId !== identity.subject) throw new Error("Not authorized");

    // Deactivate all repos for this user
    const userRepos = await ctx.db
      .query("repos")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    for (const repo of userRepos) {
      if (repo.isActive) {
        await ctx.db.patch(repo._id, { isActive: false });
      }
    }

    // Verify the repo belongs to this user
    const repo = await ctx.db.get(args.repoId);
    if (!repo || repo.userId !== args.userId) {
      throw new Error("Repo not found or not owned by user");
    }

    // Activate selected repo
    await ctx.db.patch(args.repoId, { isActive: true });
  },
});

export const updateLastScanned = mutation({
  args: {
    repoId: v.id("repos"),
    lastScannedAt: v.number(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.repoId, {
      lastScannedAt: args.lastScannedAt,
    });
  },
});

export const resetLastScanned = mutation({
  args: { repoId: v.id("repos") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.repoId, { lastScannedAt: undefined });
  },
});
