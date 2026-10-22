import Link from "next/link";
import { services } from "@/content/services";
import { ArrowUpRight } from "./Icons";
import { Spotlight } from "./ui/Spotlight";

// Column spans on the 4-column desktop grid: 2+1+1 / 1+2+1 / 2+2 for eight services.
const spans = ["lg:col-span-2", "", "", "", "lg:col-span-2", "", "lg:col-span-2", "lg:col-span-2"];

/**
 * Services as a bento grid with cursor-spotlight cards on desktop,
 * and a swipeable scroll-snap row on phones.
 */
export function ServicesIndex({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <ul className="scroll-row md:mx-0 md:grid md:grid-cols-2 md:gap-3 md:overflow-visible md:p-0 lg:grid-cols-4">
      {services.map((s, i) => {
        const wide = spans[i % spans.length] !== "";
        return (
          <li key={s.slug} className={`w-[78%] shrink-0 snap-start xs:w-[62%] md:w-auto ${spans[i % spans.length]}`}>
            <Spotlight className="group flex h-full min-h-[13rem] flex-col justify-between p-5 sm:p-6 lg:min-h-[14.5rem]">
              <span className="grid size-10 place-items-center rounded-full border border-line-strong text-muted transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-night">
                <ArrowUpRight size={18} />
              </span>
              <div className="mt-10">
                <H className={`display tracking-[-0.04em] ${wide ? "text-[1.6rem] lg:text-[2rem]" : "text-[1.4rem]"} leading-[1.05]`}>
                  <Link href={`/services/${s.slug}`} className="card-link">
                    {s.name}
                  </Link>
                </H>
                <p className="mt-2 max-w-sm text-[0.95rem] text-muted">{s.line}</p>
              </div>
            </Spotlight>
          </li>
        );
      })}
    </ul>
  );
}
