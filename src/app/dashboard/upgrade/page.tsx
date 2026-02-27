"use client";

import { useState } from "react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap } from "lucide-react";
import { PolarEmbedCheckout } from "@polar-sh/checkout/embed";
import { toast } from "sonner";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "3 scans per month (3 drafts each)",
      "Unlimited repos",
      "All 3 visual card types",
      "AI picks your best commits",
      "Edit drafts before posting",
      "One-click post to X",
      "Watermarked cards",
    ],
    notIncluded: ["Clean cards (no watermark)", "Priority support"],
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    features: [
      "50 scans per month (3 drafts each)",
      "Unlimited repos",
      "All 3 visual card types",
      "AI picks your best commits",
      "Edit drafts before posting",
      "One-click post to X",
      "Clean cards (no watermark)",
      "Priority support",
    ],
    notIncluded: [],
  },
];

export default function UpgradePage() {
  const { user, clerkId } = useCurrentUser();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    if (!clerkId) return;
    setLoading(true);

    try {
      const response = await fetch("/api/polar/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: process.env.NEXT_PUBLIC_POLAR_PRODUCT_ID!,
          customerExternalId: clerkId,
        }),
      });

      if (!response.ok) throw new Error("Failed to create checkout");

      const { url } = await response.json();

      const checkout = await PolarEmbedCheckout.create(url, {
        theme: "dark",
      });

      checkout.addEventListener("success", () => {
        toast.success("Upgrade successful! Welcome to Pro.");
      });
    } catch {
      toast.error("Failed to start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-10">
      <div className="text-center">
        <h1 className="font-heading text-[32px] font-semibold tracking-tight">Upgrade to Pro</h1>
        <p className="mt-2 text-[#71717A]">
          Ship more, share more, grow faster.
        </p>
      </div>

      {/* Recent unpublished commits teaser */}
      {user?.tier === "free" &&
        user.generationsUsedThisMonth >= 3 && (
          <div className="rounded-xl border border-primary/20 bg-[#B95126]/[0.06] p-4 text-center shadow-[0_0_30px_rgba(185,81,38,0.06)]">
            <p className="text-sm text-primary">
              You&apos;ve used all 3 free scans this month. Upgrade to
              keep shipping visual changelogs.
            </p>
          </div>
        )}

      <div className="grid gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`relative flex flex-col overflow-hidden p-6 ${
              plan.name === "Pro"
                ? "border-primary/50 bg-[#161618] shadow-[0_4px_40px_rgba(0,0,0,0.4),0_0_80px_rgba(185,81,38,0.08)]"
                : "border-[#1a1a1f] bg-[#161618] shadow-[0_2px_20px_rgba(0,0,0,0.3)]"
            }`}
          >
            {/* Warm glow on Pro card */}
            {plan.name === "Pro" && (
              <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#B95126]/[0.12] blur-[80px]" />
            )}

            <div className="relative mb-6">
              <div className="flex items-center gap-2">
                <h2 className="font-heading text-xl font-bold">{plan.name}</h2>
                {plan.name === "Pro" && (
                  <Badge className="bg-primary text-white">Popular</Badge>
                )}
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="font-heading text-4xl font-bold">{plan.price}</span>
                <span className="text-[#71717A]">{plan.period}</span>
              </div>
            </div>

            <ul className="mb-8 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 shrink-0 text-[#57C5B6]" />
                  {feature}
                </li>
              ))}
              {plan.notIncluded.map((feature) => (
                <li
                  key={feature}
                  className="flex items-center gap-2 text-sm text-muted-foreground line-through"
                >
                  <span className="h-4 w-4 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>

            {plan.name === "Pro" ? (
              <Button
                onClick={handleUpgrade}
                disabled={!clerkId || loading || user?.tier === "pro"}
                className="w-full gap-2"
              >
                <Zap className="h-4 w-4" />
                {user?.tier === "pro"
                  ? "Current Plan"
                  : loading
                    ? "Loading..."
                    : "Upgrade Now"}
              </Button>
            ) : (
              <Button variant="outline" className="w-full" disabled>
                {user?.tier === "free" ? "Current Plan" : "Free"}
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}
