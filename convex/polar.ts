// @ts-nocheck
import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const upgradeUser = mutation({
  args: {
    userId: v.id("users"),
    polarCustomerId: v.string(),
    polarSubscriptionId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      tier: "pro",
      polarCustomerId: args.polarCustomerId,
      polarSubscriptionId: args.polarSubscriptionId,
      generationsUsedThisMonth: 0,
      generationResetDate: Date.now(),
    });
  },
});

export const downgradeByCustomerId = mutation({
  args: { polarCustomerId: v.string() },
  handler: async (ctx, args) => {
    const users = await ctx.db.query("users").collect();
    const user = users.find(
      (u) => u.polarCustomerId === args.polarCustomerId
    );

    if (user) {
      await ctx.db.patch(user._id, {
        tier: "free",
        polarSubscriptionId: undefined,
        generationsUsedThisMonth: 0,
        generationResetDate: Date.now(),
      });
    }
  },
});
