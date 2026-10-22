import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { BookCallLink } from "@/components/Tracked";
import { WorkCover } from "@/components/work/WorkCover";
import { getCaseStudy, work } from "@/content/work";
import { services } from "@/content/services";
import { absoluteUrl, site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

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
          <p className="mt-6 inline-flex rounded-2xl border border-line-strong bg-surface-2 px-4 py-2 text-sm font-medium">
            Concept project: {cs.client} is a fictional brand used to show our approach.
          </p>
        )}
      </PageHero>

      <div className="container-x">
        <div className="overflow-hidden rounded-[1.5rem] border border-line">
          <WorkCover palette={cs.palette} word={cs.coverWord} variant={index} className="block aspect-[4/3] h-auto w-full sm:aspect-[16/9]" />
        </div>

        <dl className="mt-10 grid gap-6 border-y border-line py-8 sm:grid-cols-3">
          <div>
            <dt className="text-sm text-muted">Client</dt>
            <dd className="mt-1 font-medium">{cs.client}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Sector</dt>
            <dd className="mt-1 font-medium">{cs.sector}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted">Services</dt>
            <dd className="mt-1 flex flex-wrap gap-x-3 gap-y-1 font-medium">
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

      <article className="container-x mt-16 grid gap-12 lg:grid-cols-12">
        <div className="space-y-14 lg:col-span-8">
          <section>
            <h2 className="display h3">Context</h2>
            <p className="mt-4 max-w-2xl text-[1.0625rem]">{cs.context}</p>
          </section>
          <section>
            <h2 className="display h3">The challenge</h2>
            <p className="mt-4 max-w-2xl text-[1.0625rem]">{cs.challenge}</p>
          </section>
          <section>
            <h2 className="display h3">Approach</h2>
            <ol className="mt-6 space-y-8">
              {cs.approach.map((step, i) => (
                <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-4">
                  <span className="grid size-9 place-items-center rounded-full border border-line-strong text-sm font-medium tabular-nums" aria-hidden="true">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.03em]">{step.title}</h3>
                    <p className="mt-2 max-w-2xl text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
          {cs.results && cs.results.length > 0 && (
            <section>
              <h2 className="display h3">Results</h2>
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
          <div className="rounded-[1.25rem] border border-line bg-surface p-6 sm:p-7 lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold tracking-[-0.02em]">Deliverables</h2>
            <ul className="mt-3 space-y-1.5 text-muted">
              {cs.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
            <h2 className="mt-6 text-lg font-semibold tracking-[-0.02em]">How success is measured</h2>
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

      <nav aria-label="Next project" className="container-x mt-20 lg:mt-28">
        <Link href={`/work/${next.slug}`} className="group flex flex-col gap-2 border-y border-line-strong py-8 no-underline sm:flex-row sm:items-end sm:justify-between">
          <span className="text-muted">Next project</span>
          <span className="display text-[clamp(2rem,5vw,4rem)] leading-none text-ink transition-colors duration-300 group-hover:text-muted">
            {next.client}
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
