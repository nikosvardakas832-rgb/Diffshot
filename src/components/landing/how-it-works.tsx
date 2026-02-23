import { GitBranch, Sparkles, Send } from "lucide-react";

const steps = [
  {
    icon: GitBranch,
    title: "Connect GitHub",
    description:
      "Sign in with GitHub OAuth. Select a repo. That's it — no config, no setup.",
  },
  {
    icon: Sparkles,
    title: "AI Generates Drafts",
    description:
      "Diffshot scans your commits, filters noise, and generates 3 visual changelog drafts with branded image cards.",
  },
  {
    icon: Send,
    title: "Publish to X",
    description:
      "Review, edit if you want, and publish to X with one click. Your visual changelog is live.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-[#1a1a1f] px-6 py-20 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Ship code → Share progress →{" "}
            <span className="text-primary">Grow audience</span>
          </h2>
          <p className="mt-4 text-lg text-[#71717A]">
            Three steps. Under 60 seconds.
          </p>
        </div>

        <div className="grid gap-10 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="relative text-center">
              {/* Connecting dashed line + arrow to next step */}
              {i < steps.length - 1 && (
                <div className="pointer-events-none absolute top-8 left-[calc(50%+40px)] hidden h-0 w-[calc(100%-80px)] border-t border-dashed border-[#A0A0A8]/30 md:block">
                  <div className="absolute -top-[5px] right-0 text-[#A0A0A8]/30">▸</div>
                </div>
              )}
              <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#2A2A30] bg-[#1E1E24]">
                <step.icon className="h-7 w-7 text-primary" />
                {/* Warm glow behind icon */}
                <div className="absolute inset-0 -z-10 rounded-2xl bg-[#B95126]/[0.06] blur-xl" />
              </div>
              <div className="mb-1.5 font-mono text-xs font-medium uppercase tracking-widest text-primary">
                Step {i + 1}
              </div>
              <h3 className="mb-2 font-heading text-xl font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-[#71717A]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
