"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='tab'], label, select, summary, input[type='checkbox']";
const MAGNETIC = ".btn, [data-magnetic]";

/**
 * A trailing ring and dot that follow the mouse, grow over anything clickable,
 * and pull buttons slightly toward the pointer ("magnetic").
 * Fine pointers only; nothing happens on touch screens or under reduced motion.
 * The native cursor stays visible.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const r = ring.current;
    const d = dot.current;
    if (!fine || reduce || !r || !d) return;

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let frame = 0;
    let magnet: HTMLElement | null = null;

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      r.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      d.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);

    const release = () => {
      if (magnet) magnet.style.translate = "";
      magnet = null;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      r.classList.add("is-visible");
      d.classList.add("is-visible");
      const target = e.target instanceof Element ? e.target : null;
      r.classList.toggle("is-hover", Boolean(target?.closest(INTERACTIVE)));

      const m = target?.closest<HTMLElement>(MAGNETIC) ?? null;
      if (m !== magnet) release();
      if (m) {
        magnet = m;
        const b = m.getBoundingClientRect();
        const dx = (x - (b.left + b.width / 2)) * 0.22;
        const dy = (y - (b.top + b.height / 2)) * 0.32;
        m.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
      }
    };
    const onLeave = () => {
      r.classList.remove("is-visible");
      d.classList.remove("is-visible");
      release();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      release();
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={ring} aria-hidden="true" className="cursor-ring" />
      <div ref={dot} aria-hidden="true" className="cursor-dot" />
    </>
  );
}
