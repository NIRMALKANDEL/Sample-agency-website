import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { CtaBand } from "@/components/CtaBand";
import { Spotlight } from "@/components/ui/Spotlight";
import { formatDate, getAllInsights } from "@/lib/insights";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Insights: social media and growth marketing guides",
  description:
    "Practical guides on Instagram Reels, organic social, paid social and conversion, written by the Sendworthy team with sources.",
  path: "/insights",
});

export default function InsightsPage() {
  const posts = getAllInsights();
  const [lead, ...rest] = posts;

  return (
    <>
      <PageHero
        title="Insights for brands that grow on social."
        intro="What’s changing on each platform and what to do about it. Short, sourced and practical."
        crumbs={[{ name: "Insights", path: "/insights" }]}
      />

      <section aria-label="Articles" className="container-x">
        {posts.length === 0 ? (
          <div className="rounded-[1.5rem] border border-dashed border-line-strong p-10 text-center">
            <h2 className="text-xl font-semibold tracking-[-0.02em]">No articles yet</h2>
            <p className="mt-2 text-muted">Add a Markdown file to src/content/insights to publish the first one.</p>
          </div>
        ) : (
          <>
            <Spotlight className="p-6 sm:p-10 lg:p-12">
              <article>
                <p className="text-sm text-muted">
                  <time dateTime={lead.date}>{formatDate(lead.date)}</time>, {lead.readingMinutes} min read
                </p>
                <h2 className="display mt-4 max-w-4xl text-[clamp(1.9rem,4.4vw,3.5rem)] leading-[1] tracking-[-0.045em] text-balance">
                  <Link href={`/insights/${lead.slug}`} className="card-link">
                    {lead.title}
                  </Link>
                </h2>
                <p className="mt-5 max-w-2xl text-muted">{lead.description}</p>
              </article>
            </Spotlight>

            {rest.length > 0 && (
              <ul className="mt-3 grid gap-3 md:grid-cols-2">
                {rest.map((p) => (
                  <li key={p.slug}>
                    <Spotlight className="h-full p-6 sm:p-8">
                      <article>
                        <p className="text-sm text-muted">
                          <time dateTime={p.date}>{formatDate(p.date)}</time>, {p.readingMinutes} min read
                        </p>
                        <h2 className="display mt-3 text-[1.6rem] leading-[1.05] tracking-[-0.045em]">
                          <Link href={`/insights/${p.slug}`} className="card-link">
                            {p.title}
                          </Link>
                        </h2>
                        <p className="mt-3 text-[0.95rem] text-muted">{p.description}</p>
                        <ul className="mt-5 flex flex-wrap gap-2">
                          {p.tags.map((t) => (
                            <li key={t} className="rounded-full border border-line-strong px-3 py-1 text-xs font-medium text-muted">
                              {t}
                            </li>
                          ))}
                        </ul>
                      </article>
                    </Spotlight>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>

      <CtaBand source="insights_cta" title="Want this applied to your brand?" />
    </>
  );
}
