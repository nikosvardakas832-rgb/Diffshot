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
import { toast } from "sonner";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: [
      "3 generations per month",
      "Unlimited repos",
      "All 3 visual card types",
      "Watermarked cards",
    ],
    notIncluded: ["100 generations per month", "Clean cards"],
  },
  {
    name: "Pro",
    price: "$14",
    period: "/month",
    features: [
      "100 generations per month",
      "Unlimited repos",
      "All 3 visual card types",
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
  const [loading, setLoading] = useState(false);

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-violet-600/10">
            <Zap className="h-6 w-6 text-violet-500" />
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
                  ? "border-violet-600 ring-1 ring-violet-600"
                  : "border-border"
              }`}
            >
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  {plan.name === "Pro" && (
                    <Badge className="bg-violet-600 text-white">Popular</Badge>
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
                  disabled={loading}
                  className="w-full gap-2 bg-gradient-to-r from-violet-600 to-blue-600 hover:from-violet-700 hover:to-blue-700"
                >
                  <Zap className="h-4 w-4" />
                  Upgrade Now
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
