import Link from "next/link";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    cta: "Get Started",
    href: "/sign-up",
    highlight: false,
    features: [
      "3 generations per month",
      "1 connected repo",
      "All 3 visual card types",
      "Watermarked cards",
    ],
  },
  {
    name: "Pro",
    price: "$14",
    period: "/month",
    cta: "Start Pro",
    href: "/sign-up",
    highlight: true,
    features: [
      "Unlimited generations",
      "Up to 3 connected repos",
      "All 3 visual card types",
      "Clean cards (no watermark)",
      "Priority support",
    ],
  },
];

export function Pricing() {
  return (
    <section className="border-t border-border px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">Simple pricing</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free. Upgrade when you&apos;re hooked.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-2xl border p-8 ${
                plan.highlight
                  ? "border-violet-600 ring-1 ring-violet-600"
                  : "border-border"
              }`}
            >
              <div className="mb-6">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm"
                  >
                    <Check className="h-4 w-4 shrink-0 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold transition-colors ${
                  plan.highlight
                    ? "bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-700 hover:to-blue-700"
                    : "border border-border bg-card text-foreground hover:bg-accent"
                }`}
              >
                {plan.highlight && <Zap className="h-4 w-4" />}
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
