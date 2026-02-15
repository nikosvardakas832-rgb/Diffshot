"use client";

import { useCurrentUser } from "@/hooks/use-current-user";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "3 generations per month",
      "1 connected repo",
      "All 3 visual card types",
      "Watermarked cards",
    ],
    notIncluded: ["Unlimited generations", "Up to 3 repos", "Clean cards"],
  },
  {
    name: "Pro",
    price: "$14",
    period: "/month",
    features: [
      "Unlimited generations",
      "Up to 3 connected repos",
      "All 3 visual card types",
      "Clean cards (no watermark)",
      "Priority support",
    ],
    notIncluded: [],
  },
];

export default function UpgradePage() {
  const [loading, setLoading] = useState(false);
  const { user } = useCurrentUser();

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
      });

      if (!response.ok) throw new Error("Failed to create checkout session");

      const { url } = await response.json();
      window.location.href = url;
    } catch {
      toast.error("Failed to start checkout. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Upgrade to Pro</h1>
        <p className="mt-2 text-muted-foreground">
          Ship more, share more, grow faster.
        </p>
      </div>

      {/* Recent unpublished commits teaser */}
      {user?.tier === "free" &&
        user.generationsUsedThisMonth >= 3 && (
          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4 text-center">
            <p className="text-sm text-yellow-400">
              You&apos;ve used all 3 free generations this month. Upgrade to
              keep shipping visual changelogs.
            </p>
          </div>
        )}

      <div className="grid gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col p-6 ${
              plan.name === "Pro"
                ? "border-violet-600 ring-1 ring-violet-600"
                : ""
            }`}
          >
            <div className="mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{plan.name}</h2>
                {plan.name === "Pro" && (
                  <Badge className="bg-violet-600 text-white">Popular</Badge>
                )}
              </div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
            </div>

            <ul className="mb-8 flex-1 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 shrink-0 text-green-500" />
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
                disabled={loading || user?.tier === "pro"}
                className="w-full gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
              >
                <Zap className="h-4 w-4" />
                {user?.tier === "pro" ? "Current Plan" : "Upgrade Now"}
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
