"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, type ReactNode } from "react";

// three.js and React Three Fiber load only in the browser, after the page is interactive.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/**
 * Container for the hero 3D sculpture. It has a fixed size from the first paint (no layout shift)
 * and a CSS glow placeholder, so the headline stays the LCP element. Children (floating chips) sit on top.
 */
export function HeroVisual({ className = "", children }: { className?: string; children?: ReactNode }) {
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const start = () => setMount(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(start, 400);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <div aria-hidden="true" className={`select-none ${className}`}>
      <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle_at_40%_40%,rgba(255,79,43,0.45),transparent_60%),radial-gradient(circle_at_65%_65%,rgba(184,162,255,0.55),transparent_62%)] blur-3xl" />
      <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
        {mount && <HeroScene onReady={() => setReady(true)} />}
      </div>
      {children}
    </div>
  );
}
