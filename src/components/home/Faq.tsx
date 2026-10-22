"use client";

import { useId, useState } from "react";
import { Plus } from "../Icons";

/** Accordion with a smooth height animation (CSS grid rows). One answer open at a time. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="divide-y divide-line-strong border-y border-line-strong">
      {items.map((f, i) => {
        const isOpen = open === i;
        const buttonId = `${baseId}-q-${i}`;
        const panelId = `${baseId}-a-${i}`;
        return (
          <div key={f.q}>
            <h3>
              <button
                type="button"
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex min-h-[4.5rem] w-full items-center justify-between gap-6 py-5 text-left text-[1.1rem] font-semibold tracking-[-0.02em] sm:text-xl"
              >
                <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2">{f.q}</span>
                <span className="acc-icon grid size-11 shrink-0 place-items-center rounded-full border-[1.5px] border-line-strong text-ink group-hover:border-accent">
                  <Plus size={16} />
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} data-open={isOpen} className="acc-panel" inert={!isOpen}>
              <div className="acc-inner">
                <p className="max-w-2xl pb-7 text-[1.02rem] text-muted">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
