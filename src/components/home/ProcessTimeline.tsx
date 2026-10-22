"use client";

import { m, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { processSteps } from "@/content/home";
import { cssVars } from "@/lib/css";

/**
 * The real four-step sequence as a vertical timeline. A gradient line fills as you scroll through it
 * and each step's number lights up once you reach it.
 */
export function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.55"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24, restDelta: 0.001 });

  return (
    <ol ref={ref} className="relative space-y-4">
      <span aria-hidden="true" className="absolute bottom-8 left-[1.6rem] top-8 w-[3px] rounded-full bg-line sm:left-[2.1rem]" />
      <m.span
        aria-hidden="true"
        style={{ scaleY: fill }}
        className="absolute bottom-8 left-[1.6rem] top-8 w-[3px] origin-top rounded-full bg-[linear-gradient(to_bottom,#b8a2ff,#ff4f2b,#d8ff3c)] sm:left-[2.1rem]"
      />
      {processSteps.map((step, i) => (
        <li key={step.title} data-reveal style={cssVars({ "--d": `${i * 80}ms` })} className="relative grid grid-cols-[3.25rem_1fr] gap-4 sm:grid-cols-[4.25rem_1fr] sm:gap-6">
          <span
            aria-hidden="true"
            className="display relative z-10 grid size-[3.25rem] place-items-center rounded-full border-[1.5px] border-night bg-accent text-xl text-night shadow-[0_5px_0_-1px_#12072e] sm:size-[4.25rem] sm:text-2xl"
          >
            {i + 1}
          </span>
          <div className="spotlight p-5 sm:p-7">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h3 className="display text-[1.9rem] sm:text-[2.4rem]">
                <span className="sr-only">Step {i + 1}: </span>
                {step.title}
              </h3>
              <span className="rounded-full bg-pop px-3 py-1 text-xs font-bold text-night">{step.duration}</span>
            </div>
            <p className="mt-3 max-w-xl text-muted">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
