import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ServicesIndex } from "@/components/ServicesIndex";
import { Engagements, Process, SectionHeading } from "@/components/home/Sections";
import { CtaBand } from "@/components/CtaBand";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services: social media, Reels, paid social, branding and websites",
  description:
    "Growth strategy, Instagram & Reels, social media management, content production, paid social, creator partnerships, brand identity and websites.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Services built around one question: what makes people act?"
        intro="Choose a single service or combine them. Every engagement is measured by enquiries and sales, not likes."
        crumbs={[{ name: "Services", path: "/services" }]}
      />
      <section aria-label="All services" className="container-x">
        <ServicesIndex headingLevel="h2" />
      </section>

      <section aria-labelledby="engage-title" className="container-x mt-28 lg:mt-40">
        <SectionHeading id="engage-title" title="Ways to work together." />
        <div className="mt-14">
          <Engagements />
        </div>
      </section>

      <section aria-labelledby="process-title" className="theme-uv noise relative isolate mt-28 overflow-hidden py-24 lg:mt-40 lg:py-32">
        <div aria-hidden="true" className="aurora">
          <i />
          <i />
          <i />
        </div>
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading id="process-title" title="How a project runs." intro="The same four steps whichever services you choose." />
            </div>
          </div>
          <div className="lg:col-span-7">
            <Process />
          </div>
        </div>
      </section>

      <CtaBand source="services_cta" title="Not sure which service you need?" body="Describe the goal. We’ll recommend the smallest thing that could work." />
    </>
  );
}
