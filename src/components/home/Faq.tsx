"use client";

import { useId, useState } from "react";
import { Plus } from "../Icons";

/** Accordion with a smooth height animation (CSS grid rows). One answer open at a time. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className="divide-y divide-line border-y border-line">
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
                className="group flex min-h-16 w-full items-center justify-between gap-6 py-4 text-left text-[1.0625rem] font-medium tracking-[-0.015em] sm:text-lg"
              >
                <span>{f.q}</span>
                <span className="acc-icon grid size-9 shrink-0 place-items-center rounded-full border border-line-strong text-muted transition-colors group-hover:border-ink group-hover:text-ink">
                  <Plus size={16} />
                </span>
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={buttonId} data-open={isOpen} className="acc-panel" inert={!isOpen}>
              <div className="acc-inner">
                <p className="max-w-2xl pb-6 text-muted">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
