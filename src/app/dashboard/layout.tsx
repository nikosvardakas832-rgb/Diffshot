"use client";

import { Sidebar } from "@/components/sidebar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useEffect, useRef } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, clerkId, isLoading } = useCurrentUser();
  const hasSynced = useRef(false);

  // Create user in Convex + sync GitHub token on first load
  useEffect(() => {
    if (!clerkId || hasSynced.current) return;

    // If user exists and already has a GitHub token, skip
    if (user && user.githubAccessToken) return;

    // Still loading — wait
    if (isLoading) return;

    // user is null (not in Convex yet) or missing token — sync
    hasSynced.current = true;

    async function syncToken() {
      try {
        const response = await fetch("/api/sync-github-token");
        if (!response.ok) {
          const data = await response.json();
          console.error("Failed to sync GitHub token:", data.error);
        }
      } catch (error) {
        console.error("Failed to sync GitHub token:", error);
      }
    }
    syncToken();
  }, [clerkId, user, isLoading]);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="relative flex-1 overflow-y-auto">
        {/* Ambient warm glow — bottom center */}
        <div className="pointer-events-none fixed bottom-0 left-60 right-0 z-0 h-[500px]">
          <div className="absolute bottom-[-200px] left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#B95126]/[0.07] blur-[160px]" />
        </div>
        {/* Top inner shadow for depth against sidebar */}
        <div className="pointer-events-none sticky top-0 z-10 h-px w-full shadow-[0_1px_20px_rgba(0,0,0,0.5)]" />
        {/* Content */}
        <div className="relative z-[1] px-10 py-10">{children}</div>
      </main>
    </div>
  );
}
