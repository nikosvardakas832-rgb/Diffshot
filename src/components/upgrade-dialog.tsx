"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Zap } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
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

interface UpgradeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UpgradeDialog({ open, onOpenChange }: UpgradeDialogProps) {
  const { clerkId } = useCurrentUser();
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

      onOpenChange(false);

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">
            Upgrade to Pro
          </DialogTitle>
          <DialogDescription className="text-center">
            Ship more, share more, grow faster.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 sm:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-lg border p-4 ${
                plan.name === "Pro"
                  ? "border-primary ring-1 ring-primary"
                  : "border-border"
              }`}
            >
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  {plan.name === "Pro" && (
                    <Badge className="bg-primary text-white">Popular</Badge>
                  )}
                </div>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              <ul className="mb-4 flex-1 space-y-2">
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
                  disabled={!clerkId || loading}
                  className="w-full gap-2"
                >
                  <Zap className="h-4 w-4" />
                  {loading ? "Loading..." : "Upgrade Now"}
                </Button>
              ) : (
                <Button variant="outline" className="w-full" disabled>
                  Current Plan
                </Button>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
