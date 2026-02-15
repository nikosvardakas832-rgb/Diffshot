"use client";

import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

/**
 * Reliably gets the current user from Convex using Clerk's userId.
 * Does NOT depend on Convex auth/JWT verification — works even if
 * auth.config.ts isn't perfectly configured.
 */
export function useCurrentUser() {
  const { userId: clerkId } = useAuth();

  const user = useQuery(
    api.users.getUserByClerkId,
    clerkId ? { clerkId } : "skip"
  );

  return { user: user ?? null, clerkId, isLoading: user === undefined };
}
