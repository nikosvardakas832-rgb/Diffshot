import Link from "next/link";

/* ─── Tweet Mockup (right side of hero) ─────────────────────────── */

function TweetMockup() {
  return (
    <div
      className="w-full max-w-[480px] rounded-2xl border border-[#2A2A30] bg-[#15202B] p-4 text-left transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:border-[#3a3a44] hover:shadow-[0_16px_48px_rgba(0,0,0,0.5),0_0_100px_rgba(185,81,38,0.18)] sm:p-5"
      style={{
        transform: "rotate(2deg)",
        borderRadius: "16px",
        boxShadow:
          "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 80px rgba(185, 81, 38, 0.12)",
      }}
    >
      {/* Tweet header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#2A2A30] to-[#3a3a44] text-[14px] font-bold text-[#e6edf3]">
            AC
          </div>
          <div className="flex flex-col">
            <span className="text-[14px] font-bold leading-tight text-[#e6edf3]">
              ALEX CHEN
            </span>
            <span className="text-[13px] leading-tight text-[#8b949e]">
              @alexbuilds
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[#8b949e]">
          {/* Verified-style icon */}
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
            <path d="M8 12.5l2.5 2.5L16 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {/* Three dots */}
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
            <circle cx="5" cy="12" r="1.5" />
            <circle cx="12" cy="12" r="1.5" />
            <circle cx="19" cy="12" r="1.5" />
          </svg>
        </div>
      </div>

      {/* Tweet body */}
      <div className="mt-3 text-[14px] leading-[1.55] text-[#e6edf3] sm:text-[15px]">
        <p>18k lines later...</p>
        <br />
        <p>Diffshot can now:</p>
        <p>• Connect to any GitHub repo</p>
        <p>• Pull commit history</p>
        <p>• Generate tweet drafts with AI</p>
        <p>• Store everything in Convex</p>
        <br />
        <p>Still rough around the edges, but it works.</p>
        <br />
        <p>Now the real work begins: making it useful.</p>
      </div>

      {/* Embedded Diffshot card */}
      <div className="hero-diff-card mt-4 cursor-pointer overflow-hidden rounded-xl border border-[#2A2A30] bg-[#0d1117]">
        <div className="p-3 sm:p-4">
          {/* Card header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/favicon_final.png"
                alt=""
                className="h-6 w-6 rounded-md"
              />
              <span className="text-[11px] text-[#8b949e] sm:text-[12px]">
                alexchen/my-saas-app
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-[rgba(87,197,182,0.15)] px-2 py-0.5 font-mono text-[9px] font-medium uppercase text-[#57C5B6] sm:text-[10px]">
                New Feature
              </span>
              <span className="text-[10px] text-[#8b949e] sm:text-[11px]">
                Feb 15, 2026
              </span>
            </div>
          </div>

          {/* Filename */}
          <div className="mt-3">
            <span className="font-mono text-[10px] text-[#58a6ff] sm:text-[11px]">
              diffshot/initial-commit
            </span>
          </div>

          {/* Diff panels */}
          <div className="mt-2 flex gap-2">
            {/* Before */}
            <div className="flex-1 overflow-hidden rounded-lg border border-[#3d1f1f] bg-[#1c1219] p-2 sm:p-2.5">
              <span className="mb-1 block text-[8px] font-bold uppercase tracking-wider text-[#f85149] sm:text-[9px]">
                Before
              </span>
              <div className="whitespace-nowrap font-mono text-[7px] leading-[1.7] sm:text-[9px]">
                <div className="flex">
                  <span className="mr-2 min-w-[12px] text-[#484f58]">1</span>
                  <span className="text-[#e6edf3]">{"// Empty repository"}</span>
                </div>
                <div className="flex">
                  <span className="mr-2 min-w-[12px] text-[#484f58]">2</span>
                  <span className="text-[#e6edf3]">&nbsp;</span>
                </div>
              </div>
            </div>

            {/* After */}
            <div className="flex-1 overflow-hidden rounded-lg border border-[rgba(87,197,182,0.20)] border-l-[3px] border-l-[#57C5B6] bg-[rgba(87,197,182,0.10)] p-2 sm:p-2.5">
              <span className="mb-1 block text-[8px] font-bold uppercase tracking-wider text-[#57C5B6] sm:text-[9px]">
                After
              </span>
              <div className="whitespace-nowrap font-mono text-[7px] leading-[1.7] sm:text-[9px]">
                <div className="flex">
                  <span className="mr-2 min-w-[12px] text-[#484f58]">1</span>
                  <span className="text-[#57C5B6]">{"// Full auth pipeline"}</span>
                </div>
                <div className="flex">
                  <span className="mr-2 min-w-[12px] text-[#484f58]">2</span>
                  <span className="text-[#57C5B6]">{"// GitHub integration"}</span>
                </div>
                <div className="flex">
                  <span className="mr-2 min-w-[12px] text-[#484f58]">3</span>
                  <span className="text-[#57C5B6]">{"// AI changelog generator"}</span>
                </div>
                <div className="flex">
                  <span className="mr-2 min-w-[12px] text-[#484f58]">4</span>
                  <span className="text-[#57C5B6]">{"// 83 files, 18,610 lines"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Hero Section ────────────────────────────────────────────────── */

export function Hero() {
  return (
    <section className="relative px-6 pb-24 pt-10 sm:pb-32 sm:pt-14 lg:px-8">
      {/* Layered ambient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[15%] h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B95126]/[0.12] blur-[180px]" />
        <div className="absolute left-[20%] top-[60%] h-[500px] w-[500px] rounded-full bg-[#B95126]/[0.05] blur-[120px]" />
        <div className="absolute bottom-[-100px] right-[10%] h-[400px] w-[600px] rounded-full bg-[#B95126]/[0.04] blur-[140px]" />
      </div>

      <div className="mx-auto max-w-[1200px]">
        {/* Desktop: side-by-side | Mobile: stacked */}
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-center md:gap-8 lg:gap-12">
          {/* Left side — 55% */}
          <div className="flex w-full flex-col items-center text-center md:w-[55%] md:items-start md:text-left">
            {/* Badge */}
            <div className="inline-flex items-center rounded-[20px] border border-[#2A2A30] bg-[#1E1E24] px-4 py-1.5 font-mono text-[12px] text-[#A0A0A8]">
              From git push to X post in 60 seconds
            </div>

            {/* Headline */}
            <h1 className="mt-6 max-w-[720px] font-heading text-[32px] font-semibold leading-[1.15] text-[#FAFAFA] md:text-[44px] lg:text-[48px]">
              Turn your commits into content that stops the scroll.
            </h1>

            {/* Subheadline */}
            <p className="mt-5 max-w-[520px] text-[15px] leading-[1.6] text-[#A0A0A8] md:text-[17px]">
              You ship code every day but nobody sees it. Diffshot scans your
              GitHub, generates visual changelog cards, and posts them to X — in
              one click. No writing. No design. Just shipping proof.
            </p>

            {/* CTA */}
            <Link
              href="/sign-up"
              className="mt-8 inline-flex items-center rounded-lg bg-[#B95126] px-8 py-3.5 text-[15px] font-medium text-white transition-all duration-200 hover:bg-[#c75e33] hover:shadow-[0_0_30px_rgba(185,81,38,0.3)]"
            >
              Connect GitHub — Free
            </Link>

            {/* Social proof */}
            <p className="mt-4 text-[13px] text-[#A0A0A8]/70">
              3 generations/month free · No credit card required · Setup in 60
              seconds
            </p>
          </div>

          {/* Right side — 45% */}
          <div className="flex w-full justify-center md:w-[45%]">
            <TweetMockup />
          </div>
        </div>
      </div>
    </section>
  );
}
