"use client";

import { useUser, SignOutButton, useClerk } from "@clerk/nextjs";
import { useCurrentUser } from "@/hooks/use-current-user";
import { useMutation, useAction } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { GenerationCounter } from "@/components/generation-counter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Check, ExternalLink, Github, LogOut } from "lucide-react";
import { useState, useEffect, useRef } from "react";
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
  const { signOut } = useClerk();
  const { user } = useCurrentUser();
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [disconnectTarget, setDisconnectTarget] = useState<
    "github" | "twitter" | null
  >(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const disconnectGithub = useMutation(api.users.disconnectGithub);
  const disconnectTwitter = useMutation(api.users.disconnectTwitter);
  const deleteAccount = useMutation(api.users.deleteAccount);
  const fetchTwitterUsername = useAction(api.twitter.fetchTwitterUsername);
  const hasFetchedUsername = useRef(false);

  // Backfill Twitter username for already-connected accounts
  useEffect(() => {
    if (
      user &&
      user.twitterAccessToken &&
      !user.twitterUsername &&
      !hasFetchedUsername.current
    ) {
      hasFetchedUsername.current = true;
      fetchTwitterUsername({ userId: user._id }).catch(() => {
        // Non-critical — ignore errors
      });
    }
  }, [user, fetchTwitterUsername]);

  if (!user) {
    return (
      <div className="flex h-96 items-center justify-center text-muted-foreground">
        Loading...
      </div>
    );
  }

  const handleDisconnect = async () => {
    if (!disconnectTarget) return;
    if (disconnectTarget === "github") {
      await disconnectGithub({ userId: user._id });
    } else {
      await disconnectTwitter({ userId: user._id });
    }
    setDisconnectTarget(null);
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmText !== "DELETE") return;
    setIsDeleting(true);
    try {
      await deleteAccount({ userId: user._id });
      await signOut({ redirectUrl: "/" });
    } catch (err) {
      console.error("Failed to delete account:", err);
      setIsDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <h1 className="font-heading text-[28px] font-semibold tracking-tight">Settings</h1>

      {/* Connected Accounts */}
      <Card className="p-6">
        <h2 className="mb-4 font-heading text-lg font-semibold">Connected Accounts</h2>
        <div className="space-y-4">
          {/* GitHub */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Github className="h-5 w-5" />
              <div>
                <div className="font-medium">GitHub</div>
                <div className="text-sm text-muted-foreground">
                  {user.githubAccessToken
                    ? (clerkUser?.username ?? clerkUser?.primaryEmailAddress?.emailAddress)
                    : "Not connected"}
                </div>
              </div>
            </div>
            {user.githubAccessToken ? (
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="gap-1 text-[#57C5B6]">
                  <Check className="h-3 w-3" />
                  Connected
                </Badge>
                <button
                  onClick={() => setDisconnectTarget("github")}
                  className="text-[13px] font-medium cursor-pointer"
                  style={{
                    color: "#E5484D",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.textDecoration = "underline")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.textDecoration = "none")
                  }
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                style={{ borderColor: "#B95126", color: "#B95126" }}
              >
                Connect
              </Button>
            )}
          </div>

          <Separator />

          {/* X / Twitter */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <XLogo className="h-5 w-5" />
              <div>
                <div className="font-medium">X (Twitter)</div>
                <div className="text-sm text-muted-foreground">
                  {user.twitterAccessToken
                    ? user.twitterUsername
                      ? `@${user.twitterUsername}`
                      : "Connected"
                    : "Not connected"}
                </div>
              </div>
            </div>
            {user.twitterAccessToken ? (
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="gap-1 text-[#57C5B6]">
                  <Check className="h-3 w-3" />
                  Connected
                </Badge>
                <button
                  onClick={() => setDisconnectTarget("twitter")}
                  className="text-[13px] font-medium cursor-pointer"
                  style={{
                    color: "#E5484D",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.textDecoration = "underline")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.textDecoration = "none")
                  }
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <a
                  href="/api/auth/twitter"
                  style={{ borderColor: "#B95126", color: "#B95126" }}
                >
                  Connect X
                </a>
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Subscription */}
      <Card className="p-6">
        <h2 className="mb-4 font-heading text-lg font-semibold">Subscription</h2>
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

      {/* Danger Zone */}
      <Card
        className="p-6"
        style={{ borderColor: "rgba(229, 72, 77, 0.3)" }}
      >
        <h2
          className="mb-2 font-heading text-lg font-semibold"
          style={{ color: "#E5484D", fontSize: 18 }}
        >
          Danger Zone
        </h2>
        <p
          className="mb-4 text-sm"
          style={{ color: "#A0A0A8", fontSize: 14 }}
        >
          Permanently delete your account and all associated data. This action
          cannot be undone.
        </p>
        <button
          onClick={() => setShowDeleteDialog(true)}
          className="cursor-pointer rounded-lg text-sm font-medium transition-colors"
          style={{
            border: "1px solid #E5484D",
            color: "#E5484D",
            backgroundColor: "transparent",
            padding: "10px 20px",
            borderRadius: 8,
            fontSize: 14,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "rgba(229, 72, 77, 0.1)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "transparent")
          }
        >
          Delete Account
        </button>
      </Card>

      {/* Disconnect Confirmation Dialog */}
      <Dialog
        open={disconnectTarget !== null}
        onOpenChange={(open) => {
          if (!open) setDisconnectTarget(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Disconnect {disconnectTarget === "github" ? "GitHub" : "X"}?
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to disconnect{" "}
              {disconnectTarget === "github" ? "GitHub" : "X"}? You&apos;ll need
              to reconnect to use this integration.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDisconnectTarget(null)}>
              Cancel
            </Button>
            <Button
              onClick={handleDisconnect}
              style={{ backgroundColor: "#E5484D", color: "#fff" }}
            >
              Disconnect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Confirmation Dialog */}
      <Dialog
        open={showDeleteDialog}
        onOpenChange={(open) => {
          if (!open) {
            setShowDeleteDialog(false);
            setDeleteConfirmText("");
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              This will permanently delete your account, all your drafts,
              published history, and connected integrations. Type{" "}
              <span className="font-mono font-semibold text-foreground">
                DELETE
              </span>{" "}
              to confirm.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value)}
            placeholder="Type DELETE to confirm"
            className="mt-2"
          />
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => {
                setShowDeleteDialog(false);
                setDeleteConfirmText("");
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={deleteConfirmText !== "DELETE" || isDeleting}
              onClick={handleDeleteAccount}
              style={{ backgroundColor: "#E5484D", color: "#fff" }}
            >
              {isDeleting ? "Deleting..." : "Delete Account"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <UpgradeDialog open={showUpgrade} onOpenChange={setShowUpgrade} />
    </div>
  );
}
