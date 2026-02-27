import Link from "next/link";
import { Check, Info, Zap } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    cta: "Get Started",
    href: "/sign-up",
    highlight: false,
    features: [
      { text: "3 scans per month (3 drafts each)" },
      { text: "Unlimited repos" },
      { text: "All 3 visual card types" },
      { text: "AI picks your best commits" },
      { text: "Edit drafts before posting" },
      { text: "One-click post to X" },
      { text: "Watermarked cards", neutral: true },
    ],
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    cta: "Start Pro",
    href: "/sign-up",
    highlight: true,
    features: [
      { text: "50 scans per month (3 drafts each)" },
      { text: "Unlimited repos" },
      { text: "All 3 visual card types" },
      { text: "AI picks your best commits" },
      { text: "Edit drafts before posting" },
      { text: "One-click post to X" },
      { text: "Clean cards (no watermark)" },
      { text: "Priority support" },
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative border-t border-[#1a1a1f] px-6 py-20 lg:px-8">
      {/* Subtle warm glow behind pricing */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B95126]/[0.04] blur-[140px]" />
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">Simple pricing</h2>
          <p className="mt-4 text-lg text-[#71717A]">
            Start free. Upgrade when you&apos;re hooked.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col overflow-hidden rounded-2xl border p-8 transition-all duration-300 ${
                plan.highlight
                  ? "border-primary/50 bg-[#161618] shadow-[0_4px_40px_rgba(0,0,0,0.4),0_0_80px_rgba(185,81,38,0.08)]"
                  : "border-[#1a1a1f] bg-[#161618] shadow-[0_2px_20px_rgba(0,0,0,0.3)] hover:border-[#2A2A30]"
              }`}
            >
              {/* Warm glow on Pro card */}
              {plan.highlight && (
                <>
                  <div className="pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#B95126]/[0.12] blur-[80px]" />
                  <span className="absolute right-4 top-4 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                    Most Popular
                  </span>
                </>
              )}

              <div className="relative mb-6">
                <h3 className="font-heading text-xl font-bold">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-bold">{plan.price}</span>
                  <span className="text-[#71717A]">{plan.period}</span>
                </div>
              </div>

              <ul className="relative mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature.text}
                    className="flex items-center gap-2.5 text-sm text-[#A0A0A8]"
                  >
                    {feature.neutral ? (
                      <Info className="h-4 w-4 shrink-0 text-[#A0A0A8]" />
                    ) : (
                      <Check className="h-4 w-4 shrink-0 text-[#57C5B6]" />
                    )}
                    {feature.text}
                  </li>
                ))}
              </ul>

              <Link
                href={plan.href}
                className={`relative flex items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold transition-all duration-200 ${
                  plan.highlight
                    ? "bg-primary text-white shadow-[0_0_24px_rgba(185,81,38,0.2)] hover:shadow-[0_0_36px_rgba(185,81,38,0.3)] hover:bg-primary/90"
                    : "border border-[#2A2A30] bg-[#1E1E24] text-foreground hover:bg-[#2A2A30]"
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
