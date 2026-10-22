"use client";

import { m } from "framer-motion";
import { useEffect, type ReactNode } from "react";

// The first page load renders instantly (good for LCP); later client-side
// navigations get a subtle transition. Disabled under reduced motion.
let hydrated = false;

export default function Template({ children }: { children: ReactNode }) {
  useEffect(() => {
    hydrated = true;
  }, []);

  return (
    <m.div
      initial={hydrated ? { opacity: 0, y: 12 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
