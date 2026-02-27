export function ExampleCards() {
  return (
    <section id="features" className="relative px-6 py-20 lg:px-8">
      {/* Subtle section glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B95126]/[0.03] blur-[140px]" />
      </div>

      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Visual changelogs that{" "}
            <span className="text-primary">
              stop the scroll
            </span>
          </h2>
          <p className="mt-4 text-lg text-[#71717A]">
            Three card types, all auto-generated from your commits.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Code Diff Card Example */}
          <div className="group overflow-hidden rounded-2xl border border-[#1a1a1f] bg-[#161618] shadow-[0_2px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-[#2A2A30] hover:shadow-[0_4px_40px_rgba(0,0,0,0.4),0_0_60px_rgba(185,81,38,0.05)]">
            <div className="relative aspect-[1200/675] bg-[#0d1117] p-6">
              <span className="absolute left-4 top-4 rounded-full bg-[#B95126]/15 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-[#E8734A]">
                Bug Fix
              </span>
              <div className="flex h-full flex-col pt-6">
                <div className="mb-3 flex items-center gap-2 text-xs text-[#8b949e]">
                  <span className="text-[#57C5B6]">src/auth.ts</span>
                </div>
                <div className="grid flex-1 grid-cols-2 gap-2">
                  <div className="rounded-lg bg-[#1c1219] p-3 border border-[#3d1f1f]">
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#E5484D]">
                      Before
                    </div>
                    <code className="text-[10px] leading-relaxed text-[#e6edf3]">
                      {"if (token) {\n  return true;\n}"}
                    </code>
                  </div>
                  <div className="rounded-lg bg-[#0d1f0d] p-3 border border-[#1f3d1f]">
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#57C5B6]">
                      After
                    </div>
                    <code className="text-[10px] leading-relaxed text-[#e6edf3]">
                      {"if (isValid(token)) {\n  return session;\n}"}
                    </code>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-[#1a1a1f] p-4">
              <div className="text-sm font-semibold">Code Diff Card</div>
              <div className="text-xs text-[#71717A]">
                Before/after comparison of your changes
              </div>
            </div>
          </div>

          {/* Feature Highlight Card Example */}
          <div className="group overflow-hidden rounded-2xl border border-[#1a1a1f] bg-[#161618] shadow-[0_2px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-[#2A2A30] hover:shadow-[0_4px_40px_rgba(0,0,0,0.4),0_0_60px_rgba(185,81,38,0.05)]">
            <div className="relative flex aspect-[1200/675] flex-col items-center justify-center bg-[#0d1117] p-6">
              <span className="absolute left-4 top-4 rounded-full bg-[#57C5B6]/15 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-[#57C5B6]">
                New Feature
              </span>
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl border border-[#30363d] bg-[#161b22]">
                <svg className="h-7 w-7 text-[#57C5B6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" /></svg>
              </div>
              <div className="text-center text-sm font-bold text-[#e6edf3]">
                OAuth 2.0 with PKCE
              </div>
              <div className="mt-1 text-center text-xs text-[#8b949e]">
                Secure token refresh flow
              </div>
            </div>
            <div className="border-t border-[#1a1a1f] p-4">
              <div className="text-sm font-semibold">Feature Highlight</div>
              <div className="text-xs text-[#71717A]">
                Showcase what you built with impact
              </div>
            </div>
          </div>

          {/* Stats Card Example */}
          <div className="group overflow-hidden rounded-2xl border border-[#1a1a1f] bg-[#161618] shadow-[0_2px_20px_rgba(0,0,0,0.3)] transition-all duration-300 hover:border-[#2A2A30] hover:shadow-[0_4px_40px_rgba(0,0,0,0.4),0_0_60px_rgba(185,81,38,0.05)]">
            <div className="relative flex aspect-[1200/675] flex-col items-center justify-center bg-[#0d1117] p-6 pt-10">
              <span className="absolute left-4 top-4 rounded-full bg-[#8B9FC6]/15 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-[#8B9FC6]">
                Performance
              </span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { value: "12", label: "files" },
                  { value: "+847", label: "lines" },
                  { value: "3", label: "features" },
                  { value: "98%", label: "coverage" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center rounded-lg border border-[#30363d] bg-[#161b22] px-4 py-3"
                  >
                    <span className="text-lg font-bold text-[#57C5B6]">
                      {item.value}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#8b949e]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-[#1a1a1f] p-4">
              <div className="text-sm font-semibold">Stats Card</div>
              <div className="text-xs text-[#71717A]">
                Key metrics from your coding session
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
