import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/home/Marquee";
import { ServicesIndex } from "@/components/ServicesIndex";
import { WorkRail } from "@/components/work/WorkRail";
import { PlatformSignals } from "@/components/home/PlatformSignals";
import { ScrollText } from "@/components/home/ScrollText";
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

      <section aria-labelledby="services-title" className="container-x mt-16 sm:mt-24">
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
        <div className="mt-12">
          <ServicesIndex />
        </div>
      </section>

      {/* Ultraviolet band in both themes: a statement that lights up as you scroll, then the process. */}
      <section aria-labelledby="process-title" className="theme-uv noise relative isolate mt-28 overflow-hidden py-24 sm:mt-40 sm:py-32">
        <div aria-hidden="true" className="aurora">
          <i />
          <i />
          <i />
        </div>
        <div className="container-x">
          <ScrollText
            text="If nobody would send it to a friend, it isn’t finished. We make Reels, carousels, ads and websites people share, save and act on."
            className="display max-w-6xl text-[clamp(2.2rem,6vw,5.6rem)] leading-[0.95]"
          />
          <div className="mt-24 grid gap-12 lg:mt-32 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32" data-reveal>
                <h2 id="process-title" className="display h2 text-balance">
                  Short loops, clear numbers, no six-month decks.
                </h2>
                <p className="lede mt-5">Four steps from first call to weekly results, with a check-in at every stage.</p>
                <BookCallLink location="process" className="btn btn-primary mt-8" />
              </div>
            </div>
            <div className="lg:col-span-7">
              <Process />
            </div>
          </div>
        </div>
      </section>

      <WorkRail
        items={work}
        title="How we’d approach it."
        intro="Concept projects for fictional brands, from brief to measurement. Real client work is shared on calls."
      />

      <section aria-labelledby="signals-title" className="cv-auto container-x mt-28 sm:mt-40">
        <SectionHeading
          id="signals-title"
          title="What platforms reward right now."
          intro="Algorithms change every few months. We keep track so your content doesn’t chase last year’s rules."
        />
        <div className="mt-10" data-reveal>
          <PlatformSignals />
        </div>
      </section>

      <Testimonials />

      <section aria-labelledby="engage-title" className="cv-auto container-x mt-28 sm:mt-40">
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
        <div className="mt-14">
          <Engagements />
        </div>
      </section>

      <section aria-labelledby="faq-title" className="cv-auto container-x mt-28 sm:mt-40">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4" data-reveal>
            <h2 id="faq-title" className="display h2">
              Questions, answered.
            </h2>
            <p className="mt-5 text-muted">
              Something else on your mind?{" "}
              <Link href="/contact" className="link">
                Ask us directly
              </Link>
              .
            </p>
          </div>
          <div className="lg:col-span-8" data-reveal>
            <Faq items={homeFaqs} />
          </div>
        </div>
      </section>

      <CtaBand source="home_cta" />
      <JsonLd data={faqJsonLd(homeFaqs)} />
    </>
  );
}
