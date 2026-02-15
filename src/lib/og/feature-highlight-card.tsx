interface FeatureHighlightData {
  title: string;
  description: string;
  icon: string;
}

export function FeatureHighlightCard({
  data,
}: {
  data: FeatureHighlightData;
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        textAlign: "center",
        padding: "0 60px",
      }}
    >
      {/* Icon */}
      <div
        style={{
          fontSize: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 120,
          height: 120,
          borderRadius: 24,
          background: "linear-gradient(135deg, #161b22, #21262d)",
          border: "1px solid #30363d",
        }}
      >
        {data.icon}
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 42,
          fontWeight: 700,
          color: "#e6edf3",
          lineHeight: 1.2,
          display: "flex",
        }}
      >
        {data.title}
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: 22,
          color: "#8b949e",
          lineHeight: 1.5,
          maxWidth: 700,
          display: "flex",
        }}
      >
        {data.description}
      </div>
    </div>
  );
}
