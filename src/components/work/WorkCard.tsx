import Link from "next/link";
import type { CaseStudy } from "@/content/work";
import { ArrowUpRight } from "../Icons";
import { Spotlight } from "../ui/Spotlight";
import { WorkCover } from "./WorkCover";

/** A project card: the cover zooms and tilts toward the pointer; the arrow spins on hover. */
export function WorkCard({
  item,
  index,
  headingLevel = "h3",
  coverClass = "h-64 md:h-80",
}: {
  item: CaseStudy;
  index: number;
  headingLevel?: "h2" | "h3";
  coverClass?: string;
}) {
  const H = headingLevel;
  return (
    <Spotlight tilt className="group flex h-full flex-col rounded-[1.75rem]">
      <div className="relative overflow-hidden">
        <WorkCover
          palette={item.palette}
          word={item.coverWord}
          variant={index}
          className={`block w-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06] group-hover:-rotate-1 ${coverClass}`}
        />
        {item.concept && (
          <span className="sticker absolute left-4 top-4 rotate-[-4deg] bg-pop">Concept</span>
        )}
        <span
          aria-hidden="true"
          className="absolute bottom-4 right-4 grid size-12 translate-y-3 place-items-center rounded-full bg-night text-pop opacity-0 transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-y-0 group-hover:rotate-45 group-hover:opacity-100"
        >
          <ArrowUpRight size={22} />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <H className="display text-[2rem] leading-[0.95] text-ink">
            <Link href={`/work/${item.slug}`} className="card-link">
              {item.client}
            </Link>
          </H>
          <span className="rounded-full border border-line-strong px-3 py-0.5 text-sm font-medium text-muted">{item.sector}</span>
        </div>
        <p className="mt-3 max-w-xl text-[0.97rem] text-muted">{item.title}</p>
      </div>
    </Spotlight>
  );
}
