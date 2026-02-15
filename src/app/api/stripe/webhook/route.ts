import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../../convex/_generated/api";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Id } from "../../../../../convex/_generated/dataModel";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: "2026-01-28.clover",
  });
}

function getConvex() {
  return new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const convexUserId = session.metadata?.convexUserId as Id<"users">;

      if (convexUserId) {
        await getConvex().mutation(api.stripe.upgradeUser, {
          userId: convexUserId,
          stripeCustomerId: session.customer as string,
          stripeSubscriptionId: session.subscription as string,
        });
      }
      break;
    }

    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      await getConvex().mutation(api.stripe.downgradeByCustomerId, {
        stripeCustomerId: customerId,
      });
      break;
    }
  }

  return NextResponse.json({ received: true });
}
