"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

// Use a placeholder during build when env var is not set.
// The real URL is required at runtime.
const convexUrl =
  process.env.NEXT_PUBLIC_CONVEX_URL || "https://placeholder.convex.cloud";

const convex = new ConvexReactClient(convexUrl);

export function ConvexClerkProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider
      appearance={{ baseTheme: dark }}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard/connect"
      afterSignOutUrl="/"
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
