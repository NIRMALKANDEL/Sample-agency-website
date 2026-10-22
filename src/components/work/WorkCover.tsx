import type { CoverPalette } from "@/content/work";

type Colors = { bg: string; fg: string; accent: string; shape: string; soft: string };

// Three colours only: violet-black family, lavender and chartreuse. (The palette keys come from the content file.)
const palettes: Record<CoverPalette, Colors> = {
  tomato: { bg: "#1b1540", fg: "#f3f0ff", accent: "#d4ff3a", shape: "#b9a6ff", soft: "#2b2260" },
  chartreuse: { bg: "#d4ff3a", fg: "#0e0b1a", accent: "#0e0b1a", shape: "#b9a6ff", soft: "#c3ee2b" },
  lavender: { bg: "#b9a6ff", fg: "#0e0b1a", accent: "#d4ff3a", shape: "#f3f0ff", soft: "#a893f5" },
  ink: { bg: "#0e0b1a", fg: "#f3f0ff", accent: "#d4ff3a", shape: "#b9a6ff", soft: "#211a45" },
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
          fontFamily: "var(--font-geist), sans-serif",
          fontWeight: 600,
          fontSize: 76,
          letterSpacing: "-3.5px",
        }}
      >
        {word}
      </text>
    </svg>
  );
}
