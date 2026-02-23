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
  };

  return (
    <nav
      className={`sticky top-0 z-50 flex h-[110px] items-center justify-between px-6 transition-all duration-300 lg:px-8 ${
        scrolled
          ? "border-b border-[#1a1a1f] bg-[#121214]/60 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <Image
        src="/Diffshot_Final_Logo.png"
        alt="Diffshot"
        width={300}
        height={300}
        className="h-[200px] w-auto"
      />

      {/* Center nav links */}
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

      <div className="flex items-center gap-4">
        <Link
          href="/sign-in"
          className="text-sm text-[#71717A] transition-colors hover:text-foreground"
        >
          Sign In
        </Link>
        <Link
          href="/sign-up"
          className="rounded-lg bg-primary px-5 py-2 text-sm font-medium text-white shadow-[0_0_16px_rgba(185,81,38,0.2)] transition-all hover:shadow-[0_0_24px_rgba(185,81,38,0.3)] hover:bg-primary/90"
        >
          Get Started
        </Link>
      </div>
    </nav>
  );
}
