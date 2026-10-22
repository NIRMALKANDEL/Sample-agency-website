import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Branded social card used by every opengraph-image route: ultraviolet with a tomato badge and the brand gradient. */
export function renderOg(title: string, kicker = "Sendworthy") {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#12072E",
          backgroundImage: "radial-gradient(circle at 85% 10%, rgba(255,79,43,0.55), transparent 45%), radial-gradient(circle at 10% 100%, rgba(184,162,255,0.45), transparent 50%)",
          padding: 64,
          color: "#F5F0FF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              background: "#FF4F2B",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#12072E" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z" />
            </svg>
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1.5 }}>{kicker}</div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 60 ? 64 : 88,
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: -3,
            maxWidth: 1050,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 360, height: 16, borderRadius: 999, backgroundImage: "linear-gradient(90deg, #B8A2FF, #FF4F2B 50%, #D8FF3C)" }} />
        </div>
      </div>
    ),
    ogSize,
  );
}
