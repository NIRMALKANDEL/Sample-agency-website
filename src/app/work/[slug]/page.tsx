import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { BookCallLink } from "@/components/Tracked";
import { WorkCover } from "@/components/work/WorkCover";
import { ArrowUpRight } from "@/components/Icons";
import { getCaseStudy, work } from "@/content/work";
import { services } from "@/content/services";
import { absoluteUrl, site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { cssVars } from "@/lib/css";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};
  return pageMetadata({
    title: `${cs.client}: ${cs.title}`,
    description: cs.summary,
    path: `/work/${cs.slug}`,
    type: "article",
  });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  const index = work.findIndex((w) => w.slug === cs.slug);
  const next = work[(index + 1) % work.length];

  return (
    <>
      <PageHero
        title={cs.title}
        intro={cs.summary}
        crumbs={[
          { name: "Work", path: "/work" },
          { name: cs.client, path: `/work/${cs.slug}` },
        ]}
        wide
      >
        {cs.concept && (
          <p className="sticker fade-up mt-7 -rotate-1 rounded-2xl bg-pop text-sm" style={cssVars({ "--d": "500ms" })}>
            Concept project: {cs.client} is a fictional brand used to show our approach.
          </p>
        )}
      </PageHero>

      <div className="container-x">
        <div data-reveal="scale" className="overflow-hidden rounded-[2rem] border-[1.5px] border-night shadow-[12px_14px_0_0_#12072e]">
          <WorkCover palette={cs.palette} word={cs.coverWord} variant={index} className="block aspect-[4/3] h-auto w-full sm:aspect-[16/9]" />
        </div>

        <dl data-reveal className="mt-14 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-line bg-surface p-5">
            <dt className="text-sm text-muted">Client</dt>
            <dd className="display mt-2 text-[1.6rem] leading-none">{cs.client}</dd>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-5">
            <dt className="text-sm text-muted">Sector</dt>
            <dd className="display mt-2 text-[1.6rem] leading-none">{cs.sector}</dd>
          </div>
          <div className="rounded-2xl border border-line bg-surface p-5">
            <dt className="text-sm text-muted">Services</dt>
            <dd className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-semibold">
              {cs.services.map((name) => {
                const s = services.find((x) => x.name === name);
                return s ? (
                  <Link key={name} href={`/services/${s.slug}`} className="link">
                    {name}
                  </Link>
                ) : (
                  <span key={name}>{name}</span>
                );
              })}
            </dd>
          </div>
        </dl>
      </div>

      <article className="container-x mt-20 grid gap-12 lg:grid-cols-12">
        <div className="space-y-14 lg:col-span-8">
          <section data-reveal>
            <h2 className="display h2">Context</h2>
            <p className="mt-5 max-w-2xl text-[1.1rem] lg:text-xl">{cs.context}</p>
          </section>
          <section data-reveal>
            <h2 className="display h2">The challenge</h2>
            <p className="mt-5 max-w-2xl text-[1.1rem] lg:text-xl">{cs.challenge}</p>
          </section>
          <section data-reveal>
            <h2 className="display h2">Approach</h2>
            <ol className="mt-8 space-y-9">
              {cs.approach.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[3rem_1fr] gap-4 sm:gap-5">
                  <span
                    className="display grid size-12 place-items-center rounded-full border-[1.5px] border-night bg-accent text-xl text-night shadow-[0_4px_0_-1px_#12072e]"
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <div className="pt-1">
                    <h3 className="display text-[1.8rem] leading-none">{step.title}</h3>
                    <p className="mt-2 max-w-2xl text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
          {cs.results && cs.results.length > 0 && (
            <section data-reveal>
              <h2 className="display h2">Results</h2>
              <dl className="mt-6 grid gap-6 sm:grid-cols-3">
                {cs.results.map((r) => (
                  <div key={r.label} className="rounded-[1.25rem] bg-accent p-6 text-night">
                    <dt className="text-sm font-medium">{r.label}</dt>
                    <dd className="display mt-2 text-[2.5rem] leading-none tracking-[-0.05em]">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
        </div>
        <aside className="space-y-6 lg:col-span-4">
          <div className="glass rounded-[1.75rem] p-6 sm:p-8 lg:sticky lg:top-28">
            <h2 className="text-lg font-bold tracking-[-0.02em]">Deliverables</h2>
            <ul className="mt-3 space-y-1.5 text-muted">
              {cs.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <h2 className="mt-6 text-lg font-bold tracking-[-0.02em]">How success is measured</h2>
            <ul className="mt-3 space-y-1.5 text-muted">
              {cs.measures.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <BookCallLink location={`case_${cs.slug}`} className="btn btn-primary mt-7 w-full">
              Plan something like this
            </BookCallLink>
          </div>
        </aside>
      </article>

      <nav aria-label="Next project" className="container-x mt-28 lg:mt-40">
        <Link
          href={`/work/${next.slug}`}
          className="svc-row group flex flex-col gap-3 overflow-hidden rounded-[2rem] border-[1.5px] border-line-strong px-6 py-10 no-underline sm:flex-row sm:items-end sm:justify-between sm:px-10 sm:py-14"
        >
          <span className="font-semibold text-muted">Next project</span>
          <span className="display flex items-center gap-4 text-[clamp(2.6rem,8vw,7rem)] leading-[0.9] text-ink transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-3">
            {next.client}
            <span aria-hidden="true" className="grid size-14 shrink-0 place-items-center rounded-full bg-night text-pop transition-transform duration-500 group-hover:rotate-45 sm:size-20">
              <ArrowUpRight size={30} />
            </span>
          </span>
        </Link>
      </nav>

      <CtaBand source={`case_${cs.slug}_cta`} title="Have a brief like this?" />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: cs.title,
          description: cs.summary,
          url: absoluteUrl(`/work/${cs.slug}`),
          creator: { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name },
          dateCreated: cs.year,
          keywords: cs.services.join(", "),
        }}
      />
    </>
  );
}
