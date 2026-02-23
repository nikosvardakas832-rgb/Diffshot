// @ts-nocheck
import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const upgradeUser = mutation({
  args: {
    userId: v.id("users"),
    polarCustomerId: v.string(),
    polarSubscriptionId: v.string(),
    subscriptionCurrentPeriodEnd: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    const isNewUpgrade = user?.tier !== "pro";
    const isNewBillingPeriod =
      args.subscriptionCurrentPeriodEnd &&
      user?.subscriptionCurrentPeriodEnd &&
      args.subscriptionCurrentPeriodEnd !== user.subscriptionCurrentPeriodEnd;

    // Reset counter on fresh upgrade or new billing period (renewal)
    const shouldResetCounter = isNewUpgrade || isNewBillingPeriod;

    await ctx.db.patch(args.userId, {
      tier: "pro",
      polarCustomerId: args.polarCustomerId,
      polarSubscriptionId: args.polarSubscriptionId,
      ...(shouldResetCounter && {
        generationsUsedThisMonth: 0,
        generationResetDate: Date.now(),
      }),
      ...(args.subscriptionCurrentPeriodEnd && {
        subscriptionCurrentPeriodEnd: args.subscriptionCurrentPeriodEnd,
      }),
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
