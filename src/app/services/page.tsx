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

      <section aria-labelledby="engage-title" className="container-x mt-24 lg:mt-32">
        <SectionHeading id="engage-title" title="Ways to work together." />
        <div className="mt-12">
          <Engagements />
        </div>
      </section>

      <section aria-labelledby="process-title" className="container-x mt-24 lg:mt-32">
        <SectionHeading id="process-title" title="How a project runs." />
        <div className="mt-10">
          <Process />
        </div>
      </section>

      <CtaBand source="services_cta" title="Not sure which service you need?" body="Describe the goal. We’ll recommend the smallest thing that could work." />
    </>
  );
}
