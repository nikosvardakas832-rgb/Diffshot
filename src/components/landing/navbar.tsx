"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQs", href: "#faqs" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);

      const sections = navLinks.map((l) => l.href.slice(1));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) current = id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.getElementById(href.slice(1));
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <div className="sticky top-0 z-50">
      <nav
        className={`flex h-[110px] items-center justify-between px-6 transition-all duration-300 lg:px-8 ${
          scrolled || mobileOpen
            ? "border-b border-[#1a1a1f] bg-[#121214]/60 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <Image
          src="/Diffshot_Final_Logo.png"
          alt="Diffshot"
          width={160}
          height={160}
          priority
          className="h-[200px] w-auto"
        />

        {/* Center nav links — desktop */}
        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="group relative py-1 text-sm text-[#A1A1AA] transition-colors hover:text-[#FAFAFA]"
            >
              <span
                className={
                  activeSection === link.href.slice(1) ? "text-[#FAFAFA]" : ""
                }
              >
                {link.label}
              </span>
              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300 ${
                  activeSection === link.href.slice(1)
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/sign-in"
            className="hidden text-sm text-[#71717A] transition-colors hover:text-foreground sm:block"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white shadow-[0_0_16px_rgba(185,81,38,0.2)] transition-all hover:shadow-[0_0_24px_rgba(185,81,38,0.3)] hover:bg-primary/90 sm:px-5"
          >
            Get Started
          </Link>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#2A2A30] text-[#A1A1AA] transition-colors hover:text-[#FAFAFA] md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div
        className={`overflow-hidden border-b border-[#1a1a1f] bg-[#121214]/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          mobileOpen ? "max-h-[300px] opacity-100" : "max-h-0 border-b-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="rounded-lg px-3 py-2.5 text-left text-sm text-[#A1A1AA] transition-colors hover:bg-[#1E1E24] hover:text-[#FAFAFA]"
            >
              {link.label}
            </button>
          ))}
          <Link
            href="/sign-in"
            className="rounded-lg px-3 py-2.5 text-left text-sm text-[#A1A1AA] transition-colors hover:bg-[#1E1E24] hover:text-[#FAFAFA]"
            onClick={() => setMobileOpen(false)}
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
