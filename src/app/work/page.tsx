import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { WorkGrid } from "@/components/work/WorkGrid";
import { CtaBand } from "@/components/CtaBand";
import { work } from "@/content/work";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Work: how we approach growth briefs",
  description:
    "Concept projects showing how Sendworthy approaches Reels launches, founder-led LinkedIn, brand and website builds, and YouTube growth.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHero
        title="Work that gets sent, saved and booked."
        intro="These concept projects for fictional brands show our process from brief to measurement. We share real client case studies, with their permission, on discovery calls."
        crumbs={[{ name: "Work", path: "/work" }]}
      />
      <section aria-label="Projects" className="container-x">
        <WorkGrid items={work} headingLevel="h2" />
      </section>
      <CtaBand source="work_cta" title="Want this for your brand?" />
    </>
  );
}
