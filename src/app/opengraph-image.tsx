import { ImageResponse } from "next/og";

export const alt = "Yudha — aptitude practice, PvP duels, and AI mock interviews";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", background: "#f6f7ef", color: "#090909", padding: "54px 64px", border: "12px solid #090909" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ fontSize: 38, fontWeight: 800, letterSpacing: "-2px" }}>yudha</div>
        <div style={{ display: "flex", fontSize: 22, background: "#e2ef44", border: "2px solid #090909", borderRadius: 30, padding: "12px 22px" }}>Available on Google Play</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 76, lineHeight: 1.08, fontWeight: 800, letterSpacing: "-3px" }}>Make career prep</div>
        <div style={{ fontSize: 76, lineHeight: 1.08, fontWeight: 800, letterSpacing: "-3px", color: "#0560fd" }}>a daily habit.</div>
        <div style={{ fontSize: 28, marginTop: 28, color: "#57534e" }}>Built for learners in Indonesia.</div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "2px solid #090909", paddingTop: 24 }}>
        <div style={{ fontSize: 23 }}>Aptitude practice · PvP duels · AI interviews</div>
        <div style={{ fontSize: 23, fontWeight: 700 }}>yudha.fun</div>
      </div>
    </div>,
    size,
  );
}
