import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

/** Branded social card used by every opengraph-image route: violet-black with one chartreuse accent. */
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
          background: "#0E0B1A",
          padding: 64,
          color: "#F3F0FF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 999,
              background: "#D4FF3A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#0E0B1A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z" />
            </svg>
          </div>
          <div style={{ fontSize: 40, fontWeight: 700, letterSpacing: -1.5 }}>{kicker}</div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: title.length > 60 ? 64 : 88,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: -3,
            maxWidth: 1050,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 160, height: 14, borderRadius: 999, background: "#D4FF3A" }} />
          <div style={{ width: 56, height: 14, borderRadius: 999, background: "#B9A6FF" }} />
        </div>
      </div>
    ),
    ogSize,
  );
}
