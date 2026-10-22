import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { SplitWords } from "./ui/SplitWords";
import { cssVars } from "@/lib/css";

type Crumb = { name: string; path: string };

/** Inner-page hero: breadcrumb, a large tight-tracked title and one line of purpose. */
export function PageHero({
  title,
  intro,
  crumbs,
  children,
  wide = false,
}: {
  title: string;
  intro?: string;
  crumbs: Crumb[];
  children?: ReactNode;
  wide?: boolean;
}) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className="noise relative isolate overflow-x-clip">
      <div aria-hidden="true" className="aurora">
        <i />
        <i />
        <i />
      </div>
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem]" />
      <div aria-hidden="true" className="blob heat-bg pointer-events-none absolute -right-24 top-20 -z-10 size-64 opacity-80 sm:-right-16 sm:size-80 lg:right-[6%] lg:top-28 lg:size-[22rem]" />
      <div className="container-x pb-14 pt-28 sm:pt-36 lg:pb-20 lg:pt-44">
      <nav aria-label="Breadcrumb" className="fade-up">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
          {all.map((c, i) => (
            <li key={c.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">/</span>}
              {i === all.length - 1 ? (
                <span aria-current="page" className="block max-w-[14rem] truncate font-medium text-ink sm:max-w-md">
                  {c.name}
                </span>
              ) : (
                <Link href={c.path} className="inline-flex min-h-8 items-center no-underline hover:text-ink">
                  {c.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <h1
        className={`display h1 mt-6 text-[clamp(2.6rem,7.4vw,6.6rem)] ${wide ? "max-w-6xl" : "max-w-5xl"} text-balance`}
      >
        <SplitWords text={title} />
      </h1>
      {intro && (
        <p className="lede fade-up mt-7 text-ink/80" style={cssVars({ "--d": "350ms" })}>
          {intro}
        </p>
      )}
      {children}
      <JsonLd data={breadcrumbJsonLd(all)} />
      </div>
    </section>
  );
}
