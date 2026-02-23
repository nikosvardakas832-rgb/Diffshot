"use client";

import { useEffect, useRef, useState } from "react";

/* ─── Before / After transformation cards data ───────────────────── */

const transformations = [
  {
    before: "You ship in silence",
    after: "Every push becomes visible proof",
  },
  {
    before: "You stare at a blank tweet",
    after: "AI writes it from your actual code",
  },
  {
    before: "Text tweets nobody notices",
    after: "Visual cards that stop the scroll",
  },
];

/* ─── Intersection Observer hook for scroll-triggered animations ── */

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ─── Transformation Card ─────────────────────────────────────────── */

function TransformationCard({
  before,
  after,
  index,
  inView,
}: {
  before: string;
  after: string;
  index: number;
  inView: boolean;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-xl border border-[#2A2A30] bg-[#1E1E24] p-6 transition-all duration-500 hover:border-[#3a3a44] hover:shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${index * 0.15}s, transform 0.6s ease ${index * 0.15}s`,
      }}
    >
      {/* Subtle hover glow */}
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-[#57C5B6]/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Before */}
      <span
        className="mb-2 block font-sans text-[12px] font-medium uppercase tracking-wider text-[#E5484D]"
      >
        Before
      </span>
      <p className="mb-4 font-sans text-[14px] text-[#A0A0A8]">{before}</p>

      {/* Arrow */}
      <div className="mb-4 flex justify-center text-[#A0A0A8]/50">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="transition-transform duration-300 group-hover:translate-y-0.5"
        >
          <path
            d="M10 4v10m0 0l-4-4m4 4l4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* After */}
      <span
        className="mb-2 block font-sans text-[12px] font-medium uppercase tracking-wider text-[#57C5B6]"
      >
        After
      </span>
      <p className="font-sans text-[14px] text-[#FAFAFA]">{after}</p>
    </div>
  );
}

/* ─── Problem / Solution Section ──────────────────────────────────── */

export function ProblemSolution() {
  const { ref: sectionRef, inView: sectionInView } = useInView(0.1);
  const { ref: cardsRef, inView: cardsInView } = useInView(0.15);

  return (
    <section
      ref={sectionRef}
      className="relative px-6 lg:px-8"
      style={{ paddingTop: "120px", paddingBottom: "120px" }}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[15%] top-[30%] h-[500px] w-[500px] rounded-full bg-[#E5484D]/[0.03] blur-[160px]" />
        <div className="absolute right-[15%] top-[30%] h-[500px] w-[500px] rounded-full bg-[#57C5B6]/[0.04] blur-[160px]" />
      </div>

      <div className="mx-auto max-w-[1200px]">
        {/* Two-column: Problem & Solution */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:gap-24">
          {/* Left — The Problem */}
          <div
            style={{
              opacity: sectionInView ? 1 : 0,
              transform: sectionInView ? "translateX(0)" : "translateX(-32px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <span className="mb-4 block font-mono text-[11px] uppercase tracking-[2px] text-[#A0A0A8]">
              The Problem
            </span>
            <h2 className="mb-6 font-heading text-[28px] font-semibold leading-[1.2] text-[#FAFAFA] sm:text-[32px] lg:text-[36px]">
              You ship daily.
              <br />
              Your audience has no idea.
            </h2>
            <p className="max-w-[480px] font-sans text-[15px] leading-[1.7] text-[#A0A0A8]">
              You pushed 47 commits this month. You fixed auth bugs, shipped a
              new dashboard, optimized your API. But your X profile is silent.
              Your landing page has no social proof. Potential users scroll right
              past you because they don&apos;t know you exist. You know you should be
              building in public — but every time you finish coding, the last
              thing you want to do is write a tweet about it.
            </p>
          </div>

          {/* Right — The Solution */}
          <div
            style={{
              opacity: sectionInView ? 1 : 0,
              transform: sectionInView ? "translateX(0)" : "translateX(32px)",
              transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
            }}
          >
            <span className="mb-4 block font-mono text-[11px] uppercase tracking-[2px] text-[#57C5B6]">
              The Solution
            </span>
            <h2 className="mb-6 font-heading text-[28px] font-semibold leading-[1.2] text-[#FAFAFA] sm:text-[32px] lg:text-[36px]">
              What if every push
              <br />
              was already a post?
            </h2>
            <p className="max-w-[480px] font-sans text-[15px] leading-[1.7] text-[#A0A0A8]">
              Diffshot connects to your GitHub, reads your commits, and generates
              a ready-to-post visual changelog — branded code diff cards, feature
              highlights, and stats — in under 60 seconds. You review it, hit
              publish, and your audience sees proof that you&apos;re shipping. No
              copywriting. No Canva. No context switch. Just code → content →
              credibility.
            </p>
          </div>
        </div>

        {/* Before / After transformation cards */}
        <div
          ref={cardsRef}
          className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6"
          style={{ marginTop: "64px" }}
        >
          {transformations.map((t, i) => (
            <TransformationCard
              key={i}
              before={t.before}
              after={t.after}
              index={i}
              inView={cardsInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
