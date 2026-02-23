import { Webhooks } from "@polar-sh/nextjs";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";

function getConvex() {
  return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
}

export const POST = Webhooks({
  webhookSecret: process.env.POLAR_WEBHOOK_SECRET!,
  onSubscriptionActive: async (payload) => {
    const subscription = payload.data;
    const clerkId = subscription.customer.externalId;

    if (!clerkId) {
      console.error("No externalId (Clerk ID) found on Polar customer");
      return;
    }

    const convex = getConvex();
    const user = await convex.query(api.users.getUserByClerkId, { clerkId });

    if (!user) {
      console.error("User not found for clerkId:", clerkId);
      return;
    }

    // Derive billing period end: use currentPeriodEnd if available,
    // otherwise calculate from currentPeriodStart + 1 month
    let periodEnd: number | undefined;
    if (subscription.currentPeriodEnd) {
      periodEnd = new Date(subscription.currentPeriodEnd).getTime();
    } else if (subscription.currentPeriodStart) {
      const start = new Date(subscription.currentPeriodStart);
      const end = new Date(start.getFullYear(), start.getMonth() + 1, start.getDate());
      periodEnd = end.getTime();
    }

    await convex.mutation(api.polar.upgradeUser, {
      userId: user._id,
      polarCustomerId: subscription.customerId,
      polarSubscriptionId: subscription.id,
      subscriptionCurrentPeriodEnd: periodEnd,
    });
  },
  onSubscriptionCanceled: async (payload) => {
    const subscription = payload.data;

    await getConvex().mutation(api.polar.downgradeByCustomerId, {
      polarCustomerId: subscription.customerId,
    });
  },
  onSubscriptionRevoked: async (payload) => {
    const subscription = payload.data;

    await getConvex().mutation(api.polar.downgradeByCustomerId, {
      polarCustomerId: subscription.customerId,
    });
  },
});
