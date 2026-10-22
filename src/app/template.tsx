"use client";

import { m } from "framer-motion";
import { useEffect, type ReactNode } from "react";

// The first page load renders instantly (good for LCP). Later client-side navigations get a
// tomato curtain that wipes up and off the new page. Under reduced motion it is skipped.
let hydrated = false;

export default function Template({ children }: { children: ReactNode }) {
  const animate = hydrated;
  useEffect(() => {
    hydrated = true;
  }, []);

  return (
    <>
      {animate && (
        <m.div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-[60] origin-top bg-accent"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
        >
          <div className="grid h-full place-items-center">
            <span className="display text-[clamp(3rem,12vw,9rem)] text-night">sendworthy</span>
          </div>
        </m.div>
      )}
      <m.div
        initial={animate ? { opacity: 0, y: 40 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: animate ? 0.25 : 0 }}
      >
        {children}
      </m.div>
    </>
  );
}
