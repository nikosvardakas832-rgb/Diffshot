import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.string(),
    avatarUrl: v.string(),
    githubAccessToken: v.optional(v.string()),
    twitterAccessToken: v.optional(v.string()),
    twitterRefreshToken: v.optional(v.string()),
    twitterTokenExpiresAt: v.optional(v.number()),
    twitterUsername: v.optional(v.string()),
    tier: v.union(v.literal("free"), v.literal("pro")),
    generationsUsedThisMonth: v.number(),
    generationResetDate: v.number(),
    polarCustomerId: v.optional(v.string()),
    polarSubscriptionId: v.optional(v.string()),
    subscriptionCurrentPeriodEnd: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  repos: defineTable({
    userId: v.id("users"),
    githubId: v.number(),
    name: v.string(),
    fullName: v.string(),
    description: v.optional(v.string()),
    language: v.optional(v.string()),
    pushedAt: v.string(),
    isPrivate: v.optional(v.boolean()),
    lastScannedAt: v.optional(v.number()),
    isActive: v.boolean(),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),

  scans: defineTable({
    userId: v.id("users"),
    repoId: v.id("repos"),
    commitCount: v.number(),
    draftsGenerated: v.number(),
    status: v.union(
      v.literal("scanning"),
      v.literal("filtering"),
      v.literal("generating"),
      v.literal("complete"),
      v.literal("failed")
    ),
    error: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_repo", ["repoId"]),

  commits: defineTable({
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
    createdAt: v.number(),
  })
    .index("by_scan", ["scanId"])
    .index("by_repo", ["repoId"]),

  drafts: defineTable({
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
    visualAssetId: v.optional(v.id("_storage")),
    commitShas: v.array(v.string()),
    status: v.union(
      v.literal("pending"),
      v.literal("published"),
      v.literal("discarded")
    ),
    tweetId: v.optional(v.string()),
    tweetUrl: v.optional(v.string()),
    publishedAt: v.optional(v.number()),
    createdAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_scan", ["scanId"])
    .index("by_repo", ["repoId"])
    .index("by_status", ["userId", "status"]),
});
