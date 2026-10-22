import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/home/Marquee";
import { ServicesIndex } from "@/components/ServicesIndex";
import { WorkGrid } from "@/components/work/WorkGrid";
import { PlatformSignals } from "@/components/home/PlatformSignals";
import { Engagements, Faq, Process, SectionHeading, Testimonials } from "@/components/home/Sections";
import { CtaBand } from "@/components/CtaBand";
import { BookCallLink } from "@/components/Tracked";
import { JsonLd } from "@/components/JsonLd";
import { homeFaqs } from "@/content/home";
import { work } from "@/content/work";
import { faqJsonLd } from "@/lib/seo";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />

      <section aria-labelledby="services-title" className="container-x mt-20 sm:mt-28">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="services-title"
            title="Everything between the idea and the enquiry."
            intro="Pick one service or the whole stack. Every engagement starts with what you want to sell."
          />
          <Link href="/services" className="btn btn-secondary shrink-0 self-start md:self-auto">
            All services
          </Link>
        </div>
        <div className="mt-10">
          <ServicesIndex />
        </div>
      </section>

      <section aria-labelledby="work-title" className="container-x mt-24 sm:mt-32">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="work-title"
            title="How we’d approach it."
            intro="Concept projects for fictional brands, from brief to measurement. Real client work is shared on calls."
          />
          <Link href="/work" className="btn btn-secondary shrink-0 self-start md:self-auto">
            All work
          </Link>
        </div>
        <div className="mt-10">
          <WorkGrid items={work} />
        </div>
      </section>

      <section aria-labelledby="signals-title" className="cv-auto container-x mt-24 sm:mt-32">
        <SectionHeading
          id="signals-title"
          title="What platforms reward right now."
          intro="Algorithms change every few months. We keep track so your content doesn’t chase last year’s rules."
        />
        <div className="mt-8">
          <PlatformSignals />
        </div>
      </section>

      <Testimonials />

      {/* The one full-bleed chartreuse moment on the page. Dark ink, a single serif statement. */}
      <section
        aria-labelledby="process-title"
        className="on-bright noise relative isolate mt-24 overflow-hidden bg-accent py-20 sm:mt-32 sm:py-28"
      >
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />
        <div className="container-x">
          <p className="text-sm font-medium">How we work</p>
          <h2 id="process-title" className="serif mt-4 max-w-5xl text-balance text-[clamp(2.5rem,7vw,6rem)]">
            Short loops, clear numbers, no six-month strategy decks.
          </h2>
          <div className="mt-12">
            <Process bright />
          </div>
          <BookCallLink location="process" className="btn btn-night mt-10" />
        </div>
      </section>

      <section aria-labelledby="engage-title" className="cv-auto container-x mt-24 sm:mt-32">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="engage-title"
            title="Ways to work together."
            intro="Every proposal is scoped to your goals. These are the three shapes most projects take."
          />
          <BookCallLink location="engagements" className="btn btn-secondary shrink-0 self-start md:self-auto">
            Talk through your project
          </BookCallLink>
        </div>
        <div className="mt-10">
          <Engagements />
        </div>
      </section>

      <section aria-labelledby="faq-title" className="cv-auto container-x mt-24 sm:mt-32">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="faq-title" className="display h2">
              Questions, answered.
            </h2>
            <p className="mt-4 text-muted">
              Something else on your mind?{" "}
              <Link href="/contact" className="link">
                Ask us directly
              </Link>
              .
            </p>
          </div>
          <div className="lg:col-span-8">
            <Faq items={homeFaqs} />
          </div>
        </div>
      </section>

      <CtaBand source="home_cta" />
      <JsonLd data={faqJsonLd(homeFaqs)} />
    </>
  );
}
