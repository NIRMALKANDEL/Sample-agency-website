import { getAllInsights, getInsight } from "@/lib/insights";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Sendworthy insights article";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllInsights().map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getInsight(slug);
  return renderOg(post?.title ?? "Insights", "Sendworthy Insights");
}
