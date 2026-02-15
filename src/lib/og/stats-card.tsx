interface StatsData {
  items: Array<{ label: string; value: string }>;
}

export function StatsCard({ data }: { data: StatsData }) {
  const items = data.items.slice(0, 4);
  const cols = items.length <= 2 ? items.length : 2;

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 20,
        justifyContent: "center",
        padding: "0 40px",
      }}
    >
      {items.map((item, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: cols === 1 ? 400 : 480,
            height: items.length <= 2 ? 280 : 200,
            backgroundColor: "#161b22",
            borderRadius: 16,
            border: "1px solid #30363d",
            padding: 24,
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: items.length <= 2 ? 64 : 48,
              fontWeight: 700,
              color: "#58a6ff",
              display: "flex",
              lineHeight: 1,
            }}
          >
            {item.value}
          </div>
          <div
            style={{
              fontSize: items.length <= 2 ? 20 : 16,
              color: "#8b949e",
              textTransform: "uppercase",
              letterSpacing: 1,
              display: "flex",
            }}
          >
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
