import { getCaseStudy, work } from "@/content/work";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Sendworthy project";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return work.map((w) => ({ slug: w.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  return renderOg(cs ? `${cs.client}: ${cs.title}` : "Work", "Sendworthy Work");
}
