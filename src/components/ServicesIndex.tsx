"use client";

import Link from "next/link";
import { AnimatePresence, m, useMotionValue, useSpring } from "framer-motion";
import { useState, type PointerEvent } from "react";
import { services } from "@/content/services";
import { ArrowUpRight } from "./Icons";
import { cssVars } from "@/lib/css";

/** Backgrounds for the floating preview card, one per service. */
const previews = [
  "linear-gradient(135deg,#ff4f2b,#b8a2ff)",
  "linear-gradient(135deg,#d8ff3c,#ff4f2b)",
  "linear-gradient(135deg,#b8a2ff,#3a1f9e)",
  "linear-gradient(135deg,#ffb03b,#ff4f2b)",
  "linear-gradient(135deg,#3a1f9e,#ff4f2b)",
  "linear-gradient(135deg,#d8ff3c,#b8a2ff)",
  "linear-gradient(135deg,#ff4f2b,#12072e)",
  "linear-gradient(135deg,#b8a2ff,#d8ff3c)",
];

/**
 * Services as a big interactive list. On hover, a tomato fill sweeps up the row and a preview card
 * with the service's channels follows the cursor. Touch screens get clean tappable rows.
 */
export function ServicesIndex({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 24, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 220, damping: 24, mass: 0.6 });

  const onMove = (e: PointerEvent<HTMLUListElement>) => {
    if (e.pointerType !== "mouse") return;
    x.set(e.clientX);
    y.set(e.clientY);
  };

  const current = active === null ? null : services[active];

  return (
    <div className="relative">
      <ul className="border-t border-line-strong" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
        {services.map((s, i) => (
          <li
            key={s.slug}
            data-reveal
            style={cssVars({ "--d": `${(i % 4) * 60}ms` })}
            className="svc-row group border-b border-line-strong"
            onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
          >
            <div className="grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-1 px-1 py-5 sm:py-7 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)_auto] md:px-4">
              <H className="display text-[clamp(1.75rem,4.6vw,3.6rem)] leading-[0.95] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:translate-x-4">
                <Link href={`/services/${s.slug}`} className="card-link">
                  {s.name}
                </Link>
              </H>
              <p className="col-start-1 max-w-sm text-[0.95rem] text-muted md:col-start-2 md:row-start-1">{s.line}</p>
              <span
                aria-hidden="true"
                className="col-start-2 row-span-2 row-start-1 grid size-12 place-items-center rounded-full border-[1.5px] border-line-strong transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-45 group-hover:border-night group-hover:bg-night group-hover:text-pop md:col-start-3 sm:size-14"
              >
                <ArrowUpRight size={22} />
              </span>
            </div>
          </li>
        ))}
      </ul>

      {/* Cursor-following preview (mouse only, decorative). */}
      <m.div
        aria-hidden="true"
        style={{ x: sx, y: sy }}
        className="pointer-events-none fixed left-0 top-0 z-40 hidden md:block"
      >
        <AnimatePresence>
          {current && active !== null && (
            <m.div
              key="preview"
              initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: -4 }}
              exit={{ opacity: 0, scale: 0.6, rotate: 6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="-ml-36 -mt-[17rem] w-72 overflow-hidden rounded-[1.4rem] border-[1.5px] border-night shadow-[10px_12px_0_0_#12072e]"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <m.div
                  key={current.slug}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="noise flex h-52 flex-col justify-between p-5 text-night"
                  style={{ background: previews[active % previews.length] }}
                >
                  <span className="display text-[1.9rem] leading-[0.95]">{current.name}</span>
                  <span className="flex flex-wrap gap-1.5">
                    {current.channels.slice(0, 4).map((c) => (
                      <span key={c} className="rounded-full bg-white/80 px-2.5 py-1 text-xs font-bold">
                        {c}
                      </span>
                    ))}
                  </span>
                </m.div>
              </AnimatePresence>
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    </div>
  );
}
