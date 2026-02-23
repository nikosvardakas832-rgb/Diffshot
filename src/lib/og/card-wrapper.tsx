import { ReactNode } from "react";

interface CardWrapperProps {
  repoName: string;
  date: string;
  watermark: boolean;
  faviconSrc?: string;
  category?: string;
  children: ReactNode;
}

const categoryPills: Record<string, { label: string; color: string; bg: string }> = {
  new_feature: { label: "New Feature", color: "#57C5B6", bg: "rgba(87, 197, 182, 0.15)" },
  bug_fix: { label: "Bug Fix", color: "#E5484D", bg: "rgba(229, 72, 77, 0.15)" },
  improvement: { label: "Improvement", color: "#B95126", bg: "rgba(185, 81, 38, 0.15)" },
  performance: { label: "Performance", color: "#3B82F6", bg: "rgba(59, 130, 246, 0.15)" },
  ui_update: { label: "UI Update", color: "#A0A0A8", bg: "rgba(160, 160, 168, 0.15)" },
};

// Map old AI category values to the new pill keys
const legacyCategoryMap: Record<string, string> = {
  feature: "new_feature",
  fix: "bug_fix",
  refactor: "improvement",
  docs: "improvement",
};

export function CardWrapper({
  repoName,
  date,
  watermark,
  faviconSrc,
  category,
  children,
}: CardWrapperProps) {
  const resolvedCategory = category
    ? categoryPills[category] ? category : (legacyCategoryMap[category] ?? "improvement")
    : "improvement";
  const pill = categoryPills[resolvedCategory];
  return (
    <div
      style={{
        width: 1200,
        height: 675,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#0d1117",
        color: "#e6edf3",
        fontFamily: "Inter",
        padding: "48px 48px 24px 48px",
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={faviconSrc ?? ""}
            alt=""
            width={40}
            height={40}
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
            }}
          />
          <span
            style={{
              fontSize: 18,
              color: "#8b949e",
              fontWeight: 400,
            }}
          >
            {repoName}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          {pill && (
            <span
              style={{
                fontFamily: "JetBrains Mono",
                fontSize: 14,
                fontWeight: 500,
                textTransform: "uppercase",
                color: pill.color,
                backgroundColor: pill.bg,
                borderRadius: 8,
                padding: "6px 14px",
              }}
            >
              {pill.label}
            </span>
          )}
          <span style={{ fontSize: 18, color: "#8b949e", fontWeight: 500 }}>{date}</span>
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {children}
      </div>

      {/* Watermark */}
      {watermark && (
        <div
          style={{
            position: "absolute",
            bottom: 20,
            right: 28,
            fontSize: 18,
            color: "#b1bac4",
            fontWeight: 500,
          }}
        >
          Made with Diffshot
        </div>
      )}
    </div>
  );
}
