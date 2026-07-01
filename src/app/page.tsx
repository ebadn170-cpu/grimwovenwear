export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#0b0a0c",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          userSelect: "none",
        }}
      >
        {/* Top ornament */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "18px" }}>
          <div style={{ width: "60px", height: "1px", backgroundColor: "#b08d57", opacity: 0.5 }} />
          <div style={{ width: "4px", height: "4px", backgroundColor: "#b08d57", transform: "rotate(45deg)", opacity: 0.8 }} />
          <div style={{ width: "60px", height: "1px", backgroundColor: "#b08d57", opacity: 0.5 }} />
        </div>

        {/* Issue label — kicker */}
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#b08d57",
            marginBottom: "8px",
            margin: "0 0 8px 0",
          }}
        >
          Est. MMXXVI
        </p>

        {/* GRIM — hero display word in Ancient Geek */}
        <h1
          style={{
            fontFamily: "'AncientGeek', serif",
            fontSize: "clamp(80px, 14vw, 140px)",
            fontWeight: 400,
            lineHeight: 0.9,
            letterSpacing: "0.08em",
            color: "#f4ede1",
            margin: 0,
          }}
        >
          Grim
        </h1>

        {/* Divider rule with diamond */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "14px 0" }}>
          <div style={{ width: "80px", height: "0.5px", backgroundColor: "#b08d57", opacity: 0.6 }} />
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <rect x="4" y="0" width="5.66" height="5.66" transform="rotate(45 4 0)" fill="#b08d57" opacity="0.9"/>
          </svg>
          <div style={{ width: "80px", height: "0.5px", backgroundColor: "#b08d57", opacity: 0.6 }} />
        </div>

        {/* WOVEN WEAR — spaced sans beneath */}
        <p
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: "clamp(11px, 1.5vw, 14px)",
            fontWeight: 500,
            letterSpacing: "0.45em",
            textTransform: "uppercase",
            color: "#c9bfb0",
            margin: 0,
          }}
        >
          Woven Wear
        </p>

        {/* Bottom ornament */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "18px" }}>
          <div style={{ width: "60px", height: "1px", backgroundColor: "#b08d57", opacity: 0.5 }} />
          <div style={{ width: "4px", height: "4px", backgroundColor: "#b08d57", transform: "rotate(45deg)", opacity: 0.8 }} />
          <div style={{ width: "60px", height: "1px", backgroundColor: "#b08d57", opacity: 0.5 }} />
        </div>
      </div>
    </main>
  );
}