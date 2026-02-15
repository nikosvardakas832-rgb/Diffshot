interface CodeDiffData {
  before: string;
  after: string;
  filename: string;
  language: string;
}

export function CodeDiffCard({ data }: { data: CodeDiffData }) {
  const beforeLines = data.before.split("\n").slice(0, 6);
  const afterLines = data.after.split("\n").slice(0, 6);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Filename */}
      <div
        style={{
          fontSize: 14,
          color: "#8b949e",
          fontFamily: "JetBrains Mono",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ color: "#58a6ff" }}>{data.filename}</span>
        <span style={{ color: "#484f58" }}>({data.language})</span>
      </div>

      {/* Diff panels */}
      <div style={{ display: "flex", gap: 16 }}>
        {/* Before */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#1c1219",
            borderRadius: 12,
            padding: 20,
            border: "1px solid #3d1f1f",
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: "#f85149",
              fontWeight: 700,
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            Before
          </span>
          {beforeLines.map((line, i) => (
            <div
              key={i}
              style={{
                fontFamily: "JetBrains Mono",
                fontSize: 14,
                lineHeight: 1.6,
                color: "#f0883e",
                display: "flex",
              }}
            >
              <span style={{ color: "#484f58", marginRight: 12, minWidth: 20 }}>
                {i + 1}
              </span>
              <span style={{ color: "#e6edf3" }}>{line}</span>
            </div>
          ))}
        </div>

        {/* After */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#0d1f0d",
            borderRadius: 12,
            padding: 20,
            border: "1px solid #1f3d1f",
          }}
        >
          <span
            style={{
              fontSize: 12,
              color: "#3fb950",
              fontWeight: 700,
              marginBottom: 12,
              textTransform: "uppercase",
              letterSpacing: 1,
            }}
          >
            After
          </span>
          {afterLines.map((line, i) => (
            <div
              key={i}
              style={{
                fontFamily: "JetBrains Mono",
                fontSize: 14,
                lineHeight: 1.6,
                display: "flex",
              }}
            >
              <span style={{ color: "#484f58", marginRight: 12, minWidth: 20 }}>
                {i + 1}
              </span>
              <span style={{ color: "#e6edf3" }}>{line}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
