import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Faq } from "@/components/home/Sections";
import { CtaBand } from "@/components/CtaBand";
import { BookCallLink } from "@/components/Tracked";
import { JsonLd } from "@/components/JsonLd";
import { Check } from "@/components/Icons";
import { WorkCover } from "@/components/work/WorkCover";
import { Spotlight } from "@/components/ui/Spotlight";
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
          <h2 className="display h3">Who it’s for</h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem]">{service.forWho}</p>

          <h2 className="display h3 mt-14">What’s included</h2>
          <ul className="mt-6 space-y-3">
            {service.includes.map((item) => (
              <li key={item} className="flex gap-3 text-[1.0625rem]">
                <Check size={18} className="mt-1.5 shrink-0 text-muted" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="space-y-3 lg:col-span-5">
          <div className="rounded-[1.25rem] border border-line-strong bg-surface-2 p-6 sm:p-7">
            <h2 className="text-lg font-semibold tracking-[-0.02em]">You get</h2>
            <ul className="mt-3 space-y-1.5">
              {service.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-[1.25rem] border border-line bg-surface p-6 sm:p-7">
            <h2 className="text-lg font-semibold tracking-[-0.02em]">How we measure it</h2>
            <ul className="mt-3 space-y-1.5 text-muted">
              {service.measures.map((m) => (
                <li key={m}>{m}</li>
              ))}
            </ul>
            <h2 className="mt-6 text-lg font-semibold tracking-[-0.02em]">Channels</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {service.channels.map((c) => (
                <li key={c} className="rounded-full border border-line-strong px-3 py-1 text-sm font-medium text-muted">
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="container-x mt-20 lg:mt-28">
          <h2 id="related-title" className="display h3">
            Related work
          </h2>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {related.map((w, i) => (
              <li key={w.slug}>
                <Spotlight className="group h-full">
                  <WorkCover palette={w.palette} word={w.coverWord} variant={i + 1} className="block h-56 w-full transition-transform duration-700 group-hover:scale-[1.03]" />
                  <div className="p-5 sm:p-6">
                    <p className="display text-[1.4rem] leading-tight tracking-[-0.04em]">
                      <Link href={`/work/${w.slug}`} className="card-link">
                        {w.client}
                      </Link>
                    </p>
                    <p className="mt-1 text-[0.95rem] text-muted">{w.title}</p>
                  </div>
                </Spotlight>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="svc-faq" className="container-x mt-20 grid gap-10 lg:mt-28 lg:grid-cols-12">
        <h2 id="svc-faq" className="display h3 lg:col-span-4">
          Questions about {service.name.toLowerCase()}
        </h2>
        <div className="lg:col-span-8">
          <Faq items={service.faqs} />
        </div>
      </section>

      <nav aria-labelledby="more-services" className="container-x mt-20 lg:mt-28">
        <h2 id="more-services" className="text-lg font-semibold tracking-[-0.02em]">
          More services
        </h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {others.map((s) => (
            <li key={s.slug}>
              <Link href={`/services/${s.slug}`} className="inline-flex min-h-11 items-center rounded-full border border-line-strong px-4 text-[0.95rem] font-medium text-muted no-underline hover:border-ink hover:text-ink">
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
