"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  LayoutDashboard,
  FileText,
  GitBranch,
  Settings,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UpgradeDialog } from "./upgrade-dialog";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/drafts", label: "Drafts", icon: FileText },
  { href: "/dashboard/connect", label: "Repos", icon: GitBranch },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const { user } = useCurrentUser();
  const pathname = usePathname();
  const [showUpgrade, setShowUpgrade] = useState(false);

  return (
    <aside className="relative flex h-full w-60 flex-col bg-[#0e0e10] border-r border-[#1a1a1f]">
      {/* Subtle sidebar glow — very faint warm wash at bottom */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#B95126]/[0.03] to-transparent" />

      {/* Logo */}
      <div className="flex items-center justify-center px-2">
        <Image
          src="/Diffshot_Final_Logo.png"
          alt="Diffshot"
          width={300}
          height={300}
          className="h-[220px] w-auto -my-10"
        />
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] transition-all duration-150",
                isActive
                  ? "bg-[#B95126]/10 font-medium text-foreground shadow-[inset_3px_0_0_#B95126]"
                  : "text-[#71717A] hover:bg-[#1E1E24] hover:text-[#A0A0A8]"
              )}
            >
              <item.icon className={cn("h-4 w-4", isActive && "text-primary")} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade */}
      <div className="relative z-[1] space-y-3 border-t border-[#1a1a1f] p-5">
        {user?.tier === "free" && (
          <button
            onClick={() => setShowUpgrade(true)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-3 py-2.5 text-sm font-medium text-white shadow-[0_0_24px_rgba(185,81,38,0.2)] transition-all hover:shadow-[0_0_32px_rgba(185,81,38,0.3)] hover:bg-primary/90"
          >
            <Zap className="h-4 w-4" />
            Upgrade to Pro
          </button>
        )}
      </div>
      <UpgradeDialog open={showUpgrade} onOpenChange={setShowUpgrade} />
    </aside>
  );
}
