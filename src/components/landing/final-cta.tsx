import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="relative border-t border-[#1a1a1f] px-6 py-20 lg:px-8">
      {/* Warm radial glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(185, 81, 38, 0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-[640px] text-center">
        <h2 className="font-heading text-4xl font-semibold leading-[1.2] tracking-tight text-[#FAFAFA]">
          Your code is already the content. Let people see it.
        </h2>

        <p className="mx-auto mt-5 max-w-[520px] text-base leading-[1.6] text-[#A0A0A8]">
          Connect your GitHub, generate your first visual changelog, and post it
          to X — in under 60 seconds. Free. No credit card. No setup.
        </p>

        <Link
          href="/sign-up"
          className="mt-8 inline-flex items-center rounded-lg bg-[#B95126] px-8 py-3.5 text-[15px] font-medium text-white transition-all duration-200 hover:bg-[#c75e33] hover:shadow-[0_0_30px_rgba(185,81,38,0.3)]"
        >
          Connect GitHub — Free
        </Link>

        <p className="mt-3.5 text-[13px] text-[#A0A0A8]/70">
          3 scans/month free · No credit card required · Cancel anytime
        </p>
      </div>
    </section>
  );
}
