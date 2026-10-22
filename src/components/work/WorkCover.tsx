import type { CoverPalette } from "@/content/work";

type Colors = { bg: string; fg: string; accent: string; shape: string; soft: string };

// Brand palette: ultraviolet, tomato, chartreuse and lavender. (The palette keys come from the content file.)
const palettes: Record<CoverPalette, Colors> = {
  tomato: { bg: "#ff4f2b", fg: "#12072e", accent: "#d8ff3c", shape: "#12072e", soft: "#ff7a5c" },
  chartreuse: { bg: "#d8ff3c", fg: "#12072e", accent: "#ff4f2b", shape: "#b8a2ff", soft: "#c5ee25" },
  lavender: { bg: "#b8a2ff", fg: "#12072e", accent: "#ff4f2b", shape: "#d8ff3c", soft: "#a48bff" },
  ink: { bg: "#1c0f45", fg: "#f5f0ff", accent: "#ff4f2b", shape: "#b8a2ff", soft: "#2c1a66" },
};

/**
 * Generated cover art for a case study: no stock photos needed.
 * Replace with real project imagery via next/image when you have it.
 */
export function WorkCover({
  palette,
  word,
  variant = 0,
  className = "",
}: {
  palette: CoverPalette;
  word: string;
  variant?: number;
  className?: string;
}) {
  const p = palettes[palette];
  const v = variant % 4;

  return (
    <svg
      viewBox="0 0 800 600"
      className={className}
      role="img"
      aria-label={`Cover art: ${word}`}
      preserveAspectRatio="xMinYMin slice"
    >
      <rect width="800" height="600" fill={p.bg} />
      {/* hairline grid */}
      <g stroke={p.fg} strokeOpacity="0.07" strokeWidth="1">
        {[100, 200, 300, 400, 500, 600, 700].map((x) => (
          <path key={`x${x}`} d={`M${x} 0V600`} />
        ))}
        {[100, 200, 300, 400, 500].map((y) => (
          <path key={`y${y}`} d={`M0 ${y}H800`} />
        ))}
      </g>
      {v === 0 && (
        <>
          <circle cx="620" cy="420" r="170" fill={p.shape} />
          <circle cx="620" cy="420" r="110" fill={p.soft} />
          <rect x="535" y="270" width="170" height="300" rx="30" fill={p.fg} />
          <rect x="550" y="285" width="140" height="270" rx="20" fill={p.accent} />
        </>
      )}
      {v === 1 && (
        <>
          <circle cx="600" cy="420" r="190" fill={p.shape} />
          <rect x="90" y="330" width="320" height="190" rx="26" fill={p.fg} />
          <rect x="118" y="364" width="150" height="14" rx="7" fill={p.accent} />
          <rect x="118" y="398" width="240" height="14" rx="7" fill={p.bg} opacity="0.55" />
          <rect x="118" y="430" width="196" height="14" rx="7" fill={p.bg} opacity="0.55" />
        </>
      )}
      {v === 2 && (
        <>
          <circle cx="170" cy="480" r="230" fill={p.shape} />
          <circle cx="620" cy="400" r="130" fill="none" stroke={p.fg} strokeWidth="2" />
          <circle cx="620" cy="400" r="90" fill={p.fg} />
          <circle cx="620" cy="400" r="40" fill={p.accent} />
        </>
      )}
      {v === 3 && (
        <>
          <path d="M0 600 L800 290 L800 600 Z" fill={p.shape} />
          <circle cx="610" cy="400" r="96" fill={p.accent} />
          <path d="M572 372 l92 36 -92 36 0-26 52-10 -52-10z" fill={p.bg} />
        </>
      )}
      <text
        x="48"
        y="132"
        fill={p.fg}
        style={{
          fontFamily: "var(--font-bricolage), sans-serif",
          fontWeight: 800,
          fontVariationSettings: '"wdth" 80, "opsz" 96',
          fontSize: 92,
          letterSpacing: "-3px",
        }}
      >
        {word}
      </text>
    </svg>
  );
}
