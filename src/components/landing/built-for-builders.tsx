import { Zap, Image, Send, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface BenefitCard {
  icon: LucideIcon;
  headline: string;
  description: string;
}

const benefits: BenefitCard[] = [
  {
    icon: Zap,
    headline: "60-second magic moment",
    description:
      "Your commits become visual content before your coffee gets cold. Connect a repo, hit scan, and see 3 ready-to-post drafts with branded image cards — generated from your actual code changes.",
  },
  {
    icon: Image,
    headline: "Visual cards, not AI slop",
    description:
      "Every other tool gives you generic text tweets. Diffshot generates branded code diff cards, feature highlights, and stats cards that look like professional product updates — not ChatGPT output.",
  },
  {
    icon: Send,
    headline: "One click to X",
    description:
      "Review the draft, tweak if you want, hit publish. The tweet goes live with the visual card attached. No copy-pasting, no downloading images, no switching tabs.",
  },
  {
    icon: ShieldCheck,
    headline: "Your code, your proof",
    description:
      "Every card is derived from real commits. Your audience sees actual shipping evidence — file paths, code diffs, metrics — not manufactured content. You can't fake it, and that's the point.",
  },
];

export function BuiltForBuilders() {
  return (
    <section id="features" className="relative px-6 py-20 lg:px-8">
      {/* Subtle ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B95126]/[0.03] blur-[160px]" />
      </div>

      <div className="mx-auto max-w-[960px]">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="font-heading text-[28px] font-semibold leading-tight text-[#FAFAFA] sm:text-[36px]">
            Built for builders who&apos;d rather{" "}
            <span className="text-primary">code than tweet</span>
          </h2>
          <p className="mt-3 text-[16px] text-[#A0A0A8]">
            Everything you need to turn shipping into visibility — nothing you
            don&apos;t.
          </p>
        </div>

        {/* 2x2 Grid */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          {benefits.map((card) => (
            <div
              key={card.headline}
              className="group rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-8 transition-all duration-300 hover:border-[#3a3a44] hover:shadow-[0_4px_40px_rgba(0,0,0,0.4),0_0_60px_rgba(185,81,38,0.06)]"
            >
              {/* Icon container */}
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#2A2A30] transition-colors duration-300 group-hover:bg-[#2A2A30]/80">
                <card.icon className="h-6 w-6 text-[#B95126]" strokeWidth={1.75} />
              </div>

              {/* Headline */}
              <h3 className="mb-3 font-heading text-[20px] font-semibold text-[#FAFAFA]">
                {card.headline}
              </h3>

              {/* Description */}
              <p className="text-[14px] leading-[1.6] text-[#A0A0A8]">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
