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
        className="scroll-row isolate snap-none sm:mx-0 sm:flex-wrap sm:overflow-visible sm:p-0"
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
              className={`relative inline-flex min-h-12 shrink-0 items-center rounded-full border-[1.5px] px-5 text-[0.98rem] font-semibold transition-colors duration-300 ${
                selected ? "border-night text-night" : "border-line-strong text-muted hover:border-ink hover:text-ink"
              }`}
            >
              {selected && (
                <m.span
                  layoutId="platform-pill"
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 rounded-full bg-pop shadow-[0_4px_0_-1px_#12072e]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative">{p.platform}</span>
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-tab-${current.id}`}
        tabIndex={0}
        className="noise relative isolate mt-6 overflow-hidden rounded-[2rem] border border-line bg-surface p-6 sm:p-10 lg:p-12"
      >
        <AnimatePresence mode="wait" initial={false}>
          <m.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
          >
            <div aria-hidden="true" className="heat-bg pointer-events-none absolute -right-24 -top-24 -z-10 size-72 rounded-full opacity-30 blur-3xl" />
            <p className="display heat-text max-w-4xl text-[clamp(2.1rem,4.6vw,4rem)]">{current.headline}</p>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {current.signals.map((s, i) => (
                <m.div
                  key={s.title}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, type: "spring", stiffness: 220, damping: 24 }}
                  className="rounded-2xl border border-line bg-paper/60 p-5"
                >
                  <span aria-hidden="true" className={`block h-1.5 w-10 rounded-full ${["bg-accent", "bg-pop", "bg-lavender"][i % 3]}`} />
                  <h3 className="mt-4 text-lg font-bold tracking-[-0.02em]">{s.title}</h3>
                  <p className="mt-2 text-muted">{s.body}</p>
                </m.div>
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
