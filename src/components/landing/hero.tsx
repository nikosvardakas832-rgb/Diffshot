import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
      {/* Background glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-violet-600/20 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-flex items-center rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm text-muted-foreground backdrop-blur-sm">
          For solo founders who ship daily
        </div>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Turn your code into{" "}
          <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
            customers
          </span>{" "}
          without writing a single word of marketing
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
          Diffshot scans your GitHub commits and auto-generates visual changelog
          tweets — branded image cards + punchy copy — ready to publish to X
          with one click.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/sign-up"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-violet-600/25 transition-all hover:shadow-xl hover:shadow-violet-600/30"
          >
            Connect GitHub — See Your First Post in 60 Seconds
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          Free to start. No credit card required.
        </p>
      </div>
    </section>
  );
}
