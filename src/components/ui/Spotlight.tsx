"use client";

import type { PointerEvent, ReactNode } from "react";

/**
 * Card with a cursor-following glow and edge highlight. With `tilt`, it also leans toward the pointer in 3D.
 * Pointer values are written to CSS variables, so React never re-renders on move. Mouse only.
 */
export function Spotlight({
  children,
  className = "",
  tilt = false,
}: {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
}) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = e.clientX - r.left;
    const py = e.clientY - r.top;
    el.style.setProperty("--mx", `${px}px`);
    el.style.setProperty("--my", `${py}px`);
    if (tilt) {
      el.style.setProperty("--ry", `${((px / r.width - 0.5) * 9).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${((0.5 - py / r.height) * 9).toFixed(2)}deg`);
    }
  };
  const onLeave = (e: PointerEvent<HTMLDivElement>) => {
    if (!tilt) return;
    e.currentTarget.style.setProperty("--rx", "0deg");
    e.currentTarget.style.setProperty("--ry", "0deg");
  };

  return (
    <div className={`spotlight ${className}`} data-tilt={tilt || undefined} onPointerMove={onMove} onPointerLeave={onLeave}>
      {children}
    </div>
  );
}
