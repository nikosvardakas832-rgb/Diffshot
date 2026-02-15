// @ts-nocheck
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const storeCommits = mutation({
  args: {
    commits: v.array(
      v.object({
        scanId: v.id("scans"),
        repoId: v.id("repos"),
        sha: v.string(),
        message: v.string(),
        authorName: v.string(),
        authorDate: v.string(),
        filesChanged: v.number(),
        additions: v.number(),
        deletions: v.number(),
        files: v.array(
          v.object({
            filename: v.string(),
            status: v.string(),
            additions: v.number(),
            deletions: v.number(),
            patch: v.optional(v.string()),
          })
        ),
        isFiltered: v.boolean(),
        filterReason: v.optional(v.string()),
        featureGroup: v.optional(v.string()),
      })
    ),
  },
  handler: async (ctx, args) => {
    const ids = [];
    for (const commit of args.commits) {
      const id = await ctx.db.insert("commits", {
        ...commit,
        createdAt: Date.now(),
      });
      ids.push(id);
    }
    return ids;
  },
});

export const getCommitsByScan = query({
  args: { scanId: v.id("scans") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("commits")
      .withIndex("by_scan", (q) => q.eq("scanId", args.scanId))
      .collect();
  },
});

export const getMeaningfulCommitsByScan = query({
  args: { scanId: v.id("scans") },
  handler: async (ctx, args) => {
    const commits = await ctx.db
      .query("commits")
      .withIndex("by_scan", (q) => q.eq("scanId", args.scanId))
      .collect();

    return commits.filter((c) => !c.isFiltered);
  },
});
