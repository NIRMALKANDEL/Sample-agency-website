import type { CaseStudy } from "@/content/work";
import { WorkCard } from "./WorkCard";
import { cssVars } from "@/lib/css";

/** Staggered two-column project grid (the right column sits lower); a swipeable row on phones. */
export function WorkGrid({ items, headingLevel = "h3" }: { items: CaseStudy[]; headingLevel?: "h2" | "h3" }) {
  return (
    <ul className="scroll-row md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:p-0 md:pb-20">
      {items.map((w, i) => (
        <li
          key={w.slug}
          data-reveal
          style={cssVars({ "--d": `${(i % 2) * 100}ms` })}
          className={`w-[86%] shrink-0 snap-start xs:w-[72%] md:w-auto ${i % 2 === 1 ? "md:translate-y-20" : ""}`}
        >
          <WorkCard item={w} index={i} headingLevel={headingLevel} coverClass="h-60 md:h-[22rem]" />
        </li>
      ))}
    </ul>
  );
}
