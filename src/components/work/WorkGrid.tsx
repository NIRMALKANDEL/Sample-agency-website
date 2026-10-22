import Link from "next/link";
import type { CaseStudy } from "@/content/work";
import { Spotlight } from "../ui/Spotlight";
import { WorkCover } from "./WorkCover";

// Desktop bento: wide, narrow / narrow, wide.
const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];

/** Project bento on desktop; a swipeable scroll-snap row on phones. */
export function WorkGrid({ items, headingLevel = "h3" }: { items: CaseStudy[]; headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;

  return (
    <ul className="scroll-row md:mx-0 md:grid md:grid-cols-12 md:gap-3 md:overflow-visible md:p-0">
      {items.map((w, i) => (
        <li key={w.slug} className={`w-[84%] shrink-0 snap-start xs:w-[70%] md:w-auto ${spans[i % spans.length]}`}>
          <Spotlight className="group flex h-full flex-col">
            <div className="relative overflow-hidden">
              <WorkCover
                palette={w.palette}
                word={w.coverWord}
                variant={i}
                className="block h-56 w-full transition-transform duration-700 ease-out group-hover:scale-[1.03] md:h-72"
              />
              {w.concept && (
                <span className="absolute right-3 top-3 rounded-full border border-line-strong bg-paper/85 px-3 py-1 text-xs font-medium text-ink backdrop-blur-sm">
                  Concept
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-5 sm:p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <H className="display text-[1.5rem] leading-tight tracking-[-0.04em] text-ink">
                  <Link href={`/work/${w.slug}`} className="card-link">
                    {w.client}
                  </Link>
                </H>
                <span className="text-sm text-muted">{w.sector}</span>
              </div>
              <p className="mt-2 max-w-xl text-[0.95rem] text-muted">{w.title}</p>
            </div>
          </Spotlight>
        </li>
      ))}
    </ul>
  );
}
