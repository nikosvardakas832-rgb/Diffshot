// @ts-nocheck
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const upgradeUser = mutation({
  args: {
    userId: v.id("users"),
    stripeCustomerId: v.string(),
    stripeSubscriptionId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      tier: "pro",
      stripeCustomerId: args.stripeCustomerId,
      stripeSubscriptionId: args.stripeSubscriptionId,
    });
  },
});

export const downgradeByCustomerId = mutation({
  args: { stripeCustomerId: v.string() },
  handler: async (ctx, args) => {
    // Find user by stripe customer ID
    const users = await ctx.db.query("users").collect();
    const user = users.find(
      (u) => u.stripeCustomerId === args.stripeCustomerId
    );

    if (user) {
      await ctx.db.patch(user._id, {
        tier: "free",
        stripeSubscriptionId: undefined,
      });
    }
  },
});
