"use client";

import { useCurrentUser } from "@/hooks/use-current-user";

const GENERATION_LIMITS: Record<string, number> = {
  free: 3,
  pro: 50,
};

function formatResetDate(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function GenerationCounter() {
  const { user } = useCurrentUser();

  if (!user) return null;

  const limit = GENERATION_LIMITS[user.tier] ?? 3;
  const used = user.generationsUsedThisMonth;
  const percentage = Math.min((used / limit) * 100, 100);
  const isWarning = percentage >= 80;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Generations</span>
        <span className="font-mono text-xs font-medium">
          {used} / {limit}
        </span>
      </div>
      <div className="h-1.5 rounded-[3px] bg-[#2A2A30]" style={{ height: 6 }}>
        <div
          className="h-full rounded-[3px] transition-all"
          style={{
            width: `${percentage}%`,
            backgroundColor: isWarning ? "#E5484D" : "#B95126",
          }}
        />
      </div>
      <div className="text-xs" style={{ color: "#A0A0A8", fontSize: 12 }}>
        {user.tier === "free"
          ? "Resets on the 1st of each month"
          : user.subscriptionCurrentPeriodEnd
            ? `Resets ${formatResetDate(user.subscriptionCurrentPeriodEnd)}`
            : `Resets ${formatResetDate(user.generationResetDate)}`}
      </div>
    </div>
  );
}
