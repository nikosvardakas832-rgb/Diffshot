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
    <section className="border-t border-border px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Ship code → Share progress → Grow audience
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three steps. Under 60 seconds.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-card">
                <step.icon className="h-7 w-7 text-violet-400" />
              </div>
              <div className="mb-1 text-sm font-medium text-violet-400">
                Step {i + 1}
              </div>
              <h3 className="mb-2 text-xl font-semibold">{step.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
