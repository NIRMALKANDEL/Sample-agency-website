"use client";

import { AnimatePresence, m } from "framer-motion";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { platformSignals } from "@/content/home";

/** Accessible tabs (WAI-ARIA pattern): arrow keys, Home and End move between platforms. */
export function PlatformSignals() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();
  const current = platformSignals[active];

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = platformSignals.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      tabs.current[next]?.focus();
    }
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Platforms"
        onKeyDown={onKeyDown}
        className="scroll-row snap-none sm:mx-0 sm:flex-wrap sm:overflow-visible sm:p-0"
      >
        {platformSignals.map((p, i) => {
          const selected = i === active;
          return (
            <button
              key={p.id}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`${baseId}-tab-${p.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${baseId}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(i)}
              className={`inline-flex min-h-11 shrink-0 items-center rounded-full border px-5 text-[0.95rem] font-medium transition-colors ${
                selected ? "border-accent bg-accent text-night" : "border-line-strong text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {p.platform}
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${current.id}`}
        tabIndex={0}
        className="mt-6 rounded-[1.5rem] border border-line bg-surface p-6 sm:p-10"
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
          >
            <p className="display text-[clamp(1.75rem,3.6vw,3rem)] tracking-[-0.045em]">{current.headline}</p>
            <div className="mt-8 grid gap-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-line">
              {current.signals.map((s) => (
                <div key={s.title} className="md:px-8 md:first:pl-0 md:last:pr-0">
                  <h3 className="text-lg font-semibold tracking-[-0.02em]">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.body}</p>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-muted">
              Source:{" "}
              <a href={current.source.href} target="_blank" rel="noopener noreferrer" className="link">
                {current.source.label}
              </a>
              . Figures are as reported by the source.
            </p>
          </m.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
