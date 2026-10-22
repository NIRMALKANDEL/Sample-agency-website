"use client";

import { m, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const spring = { type: "spring", stiffness: 260, damping: 22 } as const;

/**
 * Cycles a word inside a tilted sticker ("send." → "save." → "share." → "book.").
 * Only the current word (and, while it leaves, the previous one) is in the DOM, so the heading reads
 * naturally for search and screen readers and words can never pile up if the tab is throttled.
 */
export function WordCycler({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);
  const [started, setStarted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => {
      setStarted(true);
      setI((v) => (v + 1) % words.length);
    }, interval);
    return () => window.clearInterval(t);
  }, [reduce, words.length, interval]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");
  const prev = (i - 1 + words.length) % words.length;

  return (
    <span className="relative inline-grid -rotate-3 align-baseline">
      {/* Sizer: the sticker is as wide as the longest word (pseudo-element, so it isn't page text). */}
      <span
        aria-hidden="true"
        data-text={longest}
        className="col-start-1 row-start-1 rounded-[0.18em] bg-accent px-[0.14em] py-[0.04em] text-transparent shadow-[0.06em_0.08em_0_0_var(--night)] ring-2 ring-night before:content-[attr(data-text)]"
      />
      <span className="col-start-1 row-start-1 grid overflow-hidden px-[0.14em] py-[0.04em] text-center text-night">
        {started && (
          <m.span
            key={words[prev]}
            aria-hidden="true"
            className="col-start-1 row-start-1 block"
            initial={{ y: "0%", rotate: 0 }}
            animate={{ y: "-115%", rotate: -8 }}
            transition={spring}
          >
            {words[prev]}
          </m.span>
        )}
        <m.span
          key={words[i]}
          className="col-start-1 row-start-1 block"
          initial={started ? { y: "115%", rotate: 8 } : false}
          animate={{ y: "0%", rotate: 0 }}
          transition={spring}
        >
          {words[i]}
        </m.span>
      </span>
    </span>
  );
}
