"use client";

import Link from "next/link";
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
import { GenerationCounter } from "./generation-counter";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/drafts", label: "Drafts", icon: FileText },
  { href: "/dashboard/connect", label: "Repos", icon: GitBranch },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const { user } = useCurrentUser();
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-card">
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-border px-6 py-5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 text-sm font-bold text-white">
          D
        </div>
        <span className="text-lg font-semibold">Diffshot</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
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
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-accent text-accent-foreground font-medium"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Generation counter */}
      <div className="border-t border-border p-4">
        <GenerationCounter />
        {user?.tier === "free" && (
          <Link
            href="/dashboard/upgrade"
            className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 px-3 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <Zap className="h-4 w-4" />
            Upgrade to Pro
          </Link>
        )}
      </div>
    </aside>
  );
}
