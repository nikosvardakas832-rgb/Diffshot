"use client";

import { useUser, SignOutButton } from "@clerk/nextjs";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GenerationCounter } from "@/components/generation-counter";
import { Check, ExternalLink, Github, LogOut } from "lucide-react";
import { useState } from "react";
import { UpgradeDialog } from "@/components/upgrade-dialog";

function XLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export default function SettingsPage() {
  const { user: clerkUser } = useUser();
  const { user } = useCurrentUser();
  const [showUpgrade, setShowUpgrade] = useState(false);

  if (!user) {
    return (
      <div className="flex h-96 items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Connected Accounts */}
      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold">Connected Accounts</h2>
        <div className="space-y-4">
          {/* GitHub */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Github className="h-5 w-5" />
              <div>
                <div className="font-medium">GitHub</div>
                <div className="text-sm text-muted-foreground">
                  {clerkUser?.username ?? clerkUser?.primaryEmailAddress?.emailAddress}
                </div>
              </div>
            </div>
            <Badge variant="outline" className="gap-1 text-green-500">
              <Check className="h-3 w-3" />
              Connected
            </Badge>
          </div>

          <Separator />

          {/* X / Twitter */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <XLogo className="h-5 w-5" />
              <div>
                <div className="font-medium">X (Twitter)</div>
                <div className="text-sm text-muted-foreground">
                  {user.twitterAccessToken ? "Connected" : "Not connected"}
                </div>
              </div>
            </div>
            {user.twitterAccessToken ? (
              <Badge variant="outline" className="gap-1 text-green-500">
                <Check className="h-3 w-3" />
                Connected
              </Badge>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <a href="/api/auth/twitter">Connect X</a>
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Subscription */}
      <Card className="p-6">
        <h2 className="mb-4 text-lg font-semibold">Subscription</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="font-medium">
              {user.tier === "pro" ? "Pro Plan" : "Free Plan"}
            </div>
            {user.tier === "free" ? (
              <Button size="sm" onClick={() => setShowUpgrade(true)}>
                Upgrade
              </Button>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={async () => {
                  try {
                    const res = await fetch("/api/polar/portal", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ polarCustomerId: user.polarCustomerId }),
                    });
                    const data = await res.json();
                    if (data.url) {
                      window.open(data.url, "_blank");
                    }
                  } catch (err) {
                    console.error("Failed to open customer portal:", err);
                  }
                }}
              >
                Manage Subscription
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            )}
          </div>

          <Separator />

          <GenerationCounter />
        </div>
      </Card>

      {/* Sign out */}
      <Card className="p-6">
        <SignOutButton>
          <Button variant="outline" className="gap-2 text-destructive">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </SignOutButton>
      </Card>
      <UpgradeDialog open={showUpgrade} onOpenChange={setShowUpgrade} />
    </div>
  );
}
