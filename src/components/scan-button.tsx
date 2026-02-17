"use client";

import { useState } from "react";
import { useAction, useMutation, useQuery } from "convex/react";
import { useAuth } from "@clerk/nextjs";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Id } from "../../convex/_generated/dataModel";
import { UpgradeDialog } from "./upgrade-dialog";

const STALE_SCAN_MS = 2 * 60 * 1000; // 2 minutes

export function ScanButton({ repoId }: { repoId?: Id<"repos"> }) {
  const [scanning, setScanning] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const { userId: clerkId } = useAuth();
  const fetchCommits = useAction(api.github.fetchAndProcessCommits);
  const generateDrafts = useAction(api.ai.generateDrafts);
  const updateScanStatus = useMutation(api.scans.updateScanStatus);
  const updateLastScanned = useMutation(api.repos.updateLastScanned);
  const latestScan = useQuery(
    api.scans.getLatestScan,
    repoId ? { repoId } : "skip"
  );

  const handleScan = async () => {
    if (!clerkId || !repoId) return;

    // Reset any stuck or failed scan before starting
    if (
      latestScan &&
      (latestScan.status === "scanning" ||
        latestScan.status === "filtering" ||
        latestScan.status === "generating")
    ) {
      await updateScanStatus({
        scanId: latestScan._id,
        status: "failed",
        error: "Reset: previous scan was stuck",
      });
      // Reset lastScannedAt so we re-fetch commits from before the stuck scan
      await updateLastScanned({ repoId, lastScannedAt: 0 });
    }

    setScanning(true);
    let scanId: Id<"scans"> | null = null;
    try {
      const result = await fetchCommits({ clerkId, repoId });
      scanId = result.scanId;

      if (result.meaningfulCommits === 0) {
        toast.info("No new meaningful commits found.");
        setScanning(false);
        return;
      }

      toast.success(
        `Found ${result.meaningfulCommits} meaningful commits. Generating drafts...`
      );

      const draftIds = await generateDrafts({
        clerkId,
        scanId: result.scanId,
        repoId,
      });

      if (Array.isArray(draftIds) && draftIds.length > 0) {
        toast.success(`${draftIds.length} drafts generated! Check them out below.`);
      } else {
        toast.info("Scan complete but no drafts were generated.");
      }
    } catch (error) {
      // Mark scan as failed so the button doesn't get stuck
      if (scanId) {
        try {
          await updateScanStatus({
            scanId,
            status: "failed",
            error: error instanceof Error ? error.message : "Unknown error",
          });
        } catch {
          // Ignore update failure
        }
      }
      if (
        error instanceof Error &&
        error.message.includes("Generation limit reached")
      ) {
        setShowUpgrade(true);
      } else {
        toast.error(
          error instanceof Error ? error.message : "Scan failed. Please try again."
        );
      }
    } finally {
      setScanning(false);
    }
  };

  // Consider scans older than 2 minutes as stale (no longer running)
  const isScanStale =
    latestScan?.createdAt &&
    Date.now() - latestScan.createdAt > STALE_SCAN_MS;

  const isScanActive =
    !isScanStale &&
    (latestScan?.status === "scanning" ||
      latestScan?.status === "filtering" ||
      latestScan?.status === "generating");

  const isRunning = scanning || isScanActive;

  return (
    <>
      <Button
        onClick={handleScan}
        disabled={isRunning || !repoId}
        className="gap-2"
      >
        {isRunning ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            {latestScan?.status === "generating"
              ? "Generating drafts..."
              : "Scanning commits..."}
          </>
        ) : (
          <>
            <RefreshCw className="h-4 w-4" />
            Scan for New Commits
          </>
        )}
      </Button>
      <UpgradeDialog open={showUpgrade} onOpenChange={setShowUpgrade} />
    </>
  );
}
