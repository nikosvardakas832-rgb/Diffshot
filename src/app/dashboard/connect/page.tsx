"use client";

import { RepoSelector } from "@/components/repo-selector";

export default function ConnectPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-heading text-[28px] font-semibold tracking-tight">Select Repository</h1>
        <p className="text-sm text-muted-foreground">
          Choose a GitHub repository to scan for commits and generate visual
          changelogs.
        </p>
      </div>
      <RepoSelector />
    </div>
  );
}
