"use client";

import { useCurrentUser } from "@/hooks/use-current-user";

const FREE_LIMIT = 3;

export function GenerationCounter() {
  const { user } = useCurrentUser();

  if (!user) return null;

  if (user.tier === "pro") {
    return (
      <div className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Pro</span> — Unlimited
        generations
      </div>
    );
  }

  const used = user.generationsUsedThisMonth;
  const percentage = Math.min((used / FREE_LIMIT) * 100, 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Generations</span>
        <span className="font-medium">
          {used} / {FREE_LIMIT}
        </span>
      </div>
      <div className="h-2 rounded-full bg-secondary">
        <div
          className="h-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-600 transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
