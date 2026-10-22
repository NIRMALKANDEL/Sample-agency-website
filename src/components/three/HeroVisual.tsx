"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

// three.js and React Three Fiber load only in the browser, after the page is interactive.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

/**
 * Container for the hero 3D object. It has a fixed size from the first paint (no layout shift)
 * and a CSS glow placeholder, so the headline stays the LCP element.
 */
export function HeroVisual({ className = "" }: { className?: string }) {
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
    <div aria-hidden="true" className={`relative select-none ${className}`}>
      <div className="hero-orb absolute inset-[10%]" />
      <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
        {mount && <HeroScene onReady={() => setReady(true)} />}
      </div>
    </div>
  );
}
