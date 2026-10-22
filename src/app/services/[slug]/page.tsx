import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Faq } from "@/components/home/Sections";
import { CtaBand } from "@/components/CtaBand";
import { BookCallLink } from "@/components/Tracked";
import { JsonLd } from "@/components/JsonLd";
import { Check } from "@/components/Icons";
import { WorkCard } from "@/components/work/WorkCard";
import { getService, services } from "@/content/services";
import { work } from "@/content/work";
import { absoluteUrl, site } from "@/lib/site";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: `${service.name} services`,
    description: service.summary,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related = work.filter((w) => w.services.includes(service.name)).slice(0, 2);
  const others = services.filter((s) => s.slug !== service.slug).slice(0, 4);

  return (
    <>
      <PageHero
        title={service.name}
        intro={service.summary}
        crumbs={[
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ]}
      >
        <div className="mt-8 flex flex-col gap-3 xs:flex-row">
          <BookCallLink location={`service_${service.slug}`} />
          <Link href="/contact" className="btn btn-secondary">
            Send a brief
          </Link>
        </div>
      </PageHero>

      <section className="container-x grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <div data-reveal>
            <h2 className="display h3">Who it’s for</h2>
            <p className="mt-5 max-w-2xl text-[1.1rem] lg:text-xl">{service.forWho}</p>
          </div>

          <div data-reveal className="mt-16">
            <h2 className="display h3">What’s included</h2>
            <ul className="mt-7 space-y-3">
              {service.includes.map((item) => (
                <li
                  key={item}
                  className="group flex items-start gap-4 rounded-2xl border border-line bg-surface p-4 text-[1.0625rem] transition-[translate,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:translate-x-2 hover:border-accent sm:p-5"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent text-night transition-transform duration-500 group-hover:rotate-[360deg]">
                    <Check size={15} strokeWidth={3} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <div data-reveal className="on-bright noise relative isolate overflow-hidden rounded-[1.75rem] border-[1.5px] border-night bg-pop p-6 shadow-[8px_10px_0_0_#12072e] sm:p-8">
            <h2 className="display text-[2rem] leading-none">You get</h2>
            <ul className="mt-5 space-y-2.5 font-semibold">
              {service.deliverables.map((d) => (
                <li key={d} className="flex items-center gap-3">
                  <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-night" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal className="rounded-[1.75rem] border border-line bg-surface p-6 sm:p-8">
            <h2 className="text-lg font-bold tracking-[-0.02em]">How we measure it</h2>
            <ul className="mt-3 space-y-1.5 text-muted">
              {service.measures.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <h2 className="mt-6 text-lg font-bold tracking-[-0.02em]">Channels</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {service.channels.map((c) => (
                <li key={c} className="rounded-full border border-line-strong px-3 py-1 text-sm font-semibold text-muted transition-colors hover:border-accent hover:text-ink">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="container-x mt-24 lg:mt-36">
          <h2 id="related-title" className="display h2" data-reveal>
            Related work
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2">
            {related.map((w) => (
              <li key={w.slug} data-reveal>
                <WorkCard item={w} index={work.indexOf(w)} />
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="svc-faq" className="container-x mt-24 grid gap-10 lg:mt-36 lg:grid-cols-12">
        <h2 id="svc-faq" className="display h2 text-balance lg:col-span-4" data-reveal>
          Questions about {service.name.toLowerCase()}
        </h2>
        <div className="lg:col-span-8">
          <Faq items={service.faqs} />
        </div>
      </section>

      <nav aria-labelledby="more-services" className="container-x mt-24 lg:mt-36">
        <h2 id="more-services" className="display h3">
          More services
        </h2>
        <ul className="mt-6 flex flex-wrap gap-2.5">
          {others.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="btn btn-secondary min-h-11 px-5 text-[0.95rem]">
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <CtaBand source={`service_${service.slug}`} title={`Let’s talk about ${service.name.toLowerCase()}.`} />

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.name,
            description: service.summary,
            serviceType: service.name,
            url: absoluteUrl(`/services/${service.slug}`),
            provider: { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name },
            areaServed: "Worldwide",
          },
          faqJsonLd(service.faqs),
        ]}
      />
    </>
  );
}
