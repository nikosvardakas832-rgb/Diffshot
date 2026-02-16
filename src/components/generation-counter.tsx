"use client";

import { useCurrentUser } from "@/hooks/use-current-user";

const GENERATION_LIMITS: Record<string, number> = {
  free: 3,
  pro: 100,
};

export function GenerationCounter() {
  const { user } = useCurrentUser();

  if (!user) return null;

  const limit = GENERATION_LIMITS[user.tier] ?? 3;
  const used = user.generationsUsedThisMonth;
  const percentage = Math.min((used / limit) * 100, 100);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Generations</span>
        <span className="font-medium">
          {used} / {limit}
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
