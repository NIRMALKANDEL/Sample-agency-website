import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd } from "./JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

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
    <section className="relative isolate">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[26rem]" />
      <div aria-hidden="true" className="glow-lavender pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] opacity-70" />
      <div className="container-x pb-12 pt-28 sm:pt-32 lg:pb-16 lg:pt-36">
      <nav aria-label="Breadcrumb">
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
        className={`display h1 mt-6 text-[clamp(2.4rem,6.4vw,5.25rem)] ${wide ? "max-w-6xl" : "max-w-4xl"} text-balance`}
      >
        {title}
      </h1>
      {intro && <p className="lede mt-6">{intro}</p>}
      {children}
      <JsonLd data={breadcrumbJsonLd(all)} />
      </div>
    </section>
  );
}
