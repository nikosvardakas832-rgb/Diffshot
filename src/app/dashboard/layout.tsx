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
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
