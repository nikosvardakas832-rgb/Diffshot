import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-[#1a1a1f] px-6 py-8 lg:px-8">
      <div className="mx-auto flex max-w-4xl items-center justify-between">
        <Image
          src="/Diffshot_Final_Logo.png"
          alt="Diffshot"
          width={300}
          height={300}
          className="h-[180px] w-auto -my-[2.75rem]"
        />
        <div className="flex flex-col items-end gap-3">
          <p className="text-sm text-[#4a4a52]">
            Ship code. Share progress. Grow your audience.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="text-xs text-[#4a4a52] transition-colors hover:text-[#A0A0A8]"
            >
              Privacy Policy
            </Link>
            <span className="text-[#2A2A30]">·</span>
            <Link
              href="/terms"
              className="text-xs text-[#4a4a52] transition-colors hover:text-[#A0A0A8]"
            >
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
