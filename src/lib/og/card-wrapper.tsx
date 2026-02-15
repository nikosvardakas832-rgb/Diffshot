import { ReactNode } from "react";

interface CardWrapperProps {
  repoName: string;
  date: string;
  watermark: boolean;
  children: ReactNode;
}

export function CardWrapper({
  repoName,
  date,
  watermark,
  children,
}: CardWrapperProps) {
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
        padding: 48,
        position: "relative",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 32,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              background: "linear-gradient(135deg, #7c3aed, #2563eb)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 700,
              color: "white",
            }}
          >
            D
          </div>
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
        <span style={{ fontSize: 16, color: "#484f58" }}>{date}</span>
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
            fontSize: 14,
            color: "#30363d",
            fontWeight: 400,
          }}
        >
          Made with Diffshot
        </div>
      )}
    </div>
  );
}
