"use client";

import type { PointerEvent, ReactNode } from "react";

/**
 * Card with a cursor-following glow (fill plus a hairline edge highlight).
 * The pointer position is written to CSS variables, so React never re-renders on move.
 * The effect itself lives in the `.spotlight` class in globals.css and only shows on hover devices.
 */
export function Spotlight({ children, className = "" }: { children: ReactNode; className?: string }) {
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div className={`spotlight ${className}`} onPointerMove={onMove}>
      {children}
    </div>
  );
}
