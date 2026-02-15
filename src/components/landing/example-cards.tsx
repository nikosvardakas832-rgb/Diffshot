export function ExampleCards() {
  return (
    <section className="px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Visual changelogs that{" "}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              stop the scroll
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Three card types, all auto-generated from your commits.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Code Diff Card Example */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="aspect-[1200/675] bg-[#0d1117] p-6">
              <div className="flex h-full flex-col">
                <div className="mb-3 flex items-center gap-2 text-xs text-[#8b949e]">
                  <span className="text-[#58a6ff]">src/auth.ts</span>
                </div>
                <div className="grid flex-1 grid-cols-2 gap-2">
                  <div className="rounded-lg bg-[#1c1219] p-3 border border-[#3d1f1f]">
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#f85149]">
                      Before
                    </div>
                    <code className="text-[10px] leading-relaxed text-[#e6edf3]">
                      {"if (token) {\n  return true;\n}"}
                    </code>
                  </div>
                  <div className="rounded-lg bg-[#0d1f0d] p-3 border border-[#1f3d1f]">
                    <div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#3fb950]">
                      After
                    </div>
                    <code className="text-[10px] leading-relaxed text-[#e6edf3]">
                      {"if (isValid(token)) {\n  return session;\n}"}
                    </code>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="text-sm font-semibold">Code Diff Card</div>
              <div className="text-xs text-muted-foreground">
                Before/after comparison of your changes
              </div>
            </div>
          </div>

          {/* Feature Highlight Card Example */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex aspect-[1200/675] flex-col items-center justify-center bg-[#0d1117] p-6">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-xl border border-[#30363d] bg-[#161b22] text-2xl">
                🔐
              </div>
              <div className="text-center text-sm font-bold text-[#e6edf3]">
                OAuth 2.0 with PKCE
              </div>
              <div className="mt-1 text-center text-xs text-[#8b949e]">
                Secure token refresh flow
              </div>
            </div>
            <div className="p-4">
              <div className="text-sm font-semibold">Feature Highlight</div>
              <div className="text-xs text-muted-foreground">
                Showcase what you built with impact
              </div>
            </div>
          </div>

          {/* Stats Card Example */}
          <div className="overflow-hidden rounded-2xl border border-border bg-card">
            <div className="flex aspect-[1200/675] flex-col items-center justify-center bg-[#0d1117] p-6">
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
                    <span className="text-lg font-bold text-[#58a6ff]">
                      {item.value}
                    </span>
                    <span className="text-[10px] uppercase tracking-wider text-[#8b949e]">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4">
              <div className="text-sm font-semibold">Stats Card</div>
              <div className="text-xs text-muted-foreground">
                Key metrics from your coding session
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
