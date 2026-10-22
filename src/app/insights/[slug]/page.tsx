import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { formatDate, getAllInsights, getInsight } from "@/lib/insights";
import { absoluteUrl, site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllInsights().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/insights/${post.slug}`,
    type: "article",
    publishedTime: post.date,
  });
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params;
  const post = getInsight(slug);
  if (!post) notFound();

  const more = getAllInsights()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <>
      <PageHero
        title={post.title}
        crumbs={[
          { name: "Insights", path: "/insights" },
          { name: post.title, path: `/insights/${post.slug}` },
        ]}
        wide
      >
        <p className="mt-6 text-muted">
          By {post.author}. <time dateTime={post.date}>{formatDate(post.date)}</time>, {post.readingMinutes} min read
        </p>
      </PageHero>

      <article className="container-x">
        <div data-reveal className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
        {post.tags.length > 0 && (
          <ul className="mt-12 flex flex-wrap gap-2" aria-label="Topics">
            {post.tags.map((t) => (
              <li key={t} className="rounded-full border border-line-strong px-3 py-1 text-sm font-medium text-muted">
                {t}
              </li>
            ))}
          </ul>
        )}
      </article>

      {more.length > 0 && (
        <nav aria-labelledby="more-title" className="container-x mt-20 lg:mt-24">
          <h2 id="more-title" className="display h2" data-reveal>
            Keep reading
          </h2>
          <ul className="mt-8 divide-y divide-line-strong border-y border-line-strong">
            {more.map((p) => (
              <li key={p.slug}>
                <Link href={`/insights/${p.slug}`} className="svc-row group block px-2 py-7 no-underline sm:px-4">
                  <span className="display block text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[0.95] text-ink transition-transform duration-500 group-hover:translate-x-3">{p.title}</span>
                  <span className="mt-1 block text-muted">{p.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}

      <CtaBand source={`insight_${post.slug}`} title="Want a second pair of eyes on your social?" />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          url: absoluteUrl(`/insights/${post.slug}`),
          mainEntityOfPage: absoluteUrl(`/insights/${post.slug}`),
          author: { "@type": "Organization", name: post.author, url: site.url },
          publisher: { "@type": "Organization", "@id": `${site.url}/#organization`, name: site.name },
          image: absoluteUrl(`/insights/${post.slug}/opengraph-image`),
          keywords: post.tags.join(", "),
        }}
      />
    </>
  );
}
