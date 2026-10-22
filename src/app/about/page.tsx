import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Process, SectionHeading } from "@/components/home/Sections";
import { CtaBand } from "@/components/CtaBand";
import { Spotlight } from "@/components/ui/Spotlight";
import { BookCallLink } from "@/components/Tracked";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About the studio",
  description:
    "Sendworthy is a growth and creative studio. Strategists, editors, designers and media buyers in one team, measured on enquiries and sales.",
  path: "/about",
});

const values = [
  {
    title: "Make it worth sending",
    body: "If nobody would share it with a friend, it isn’t finished. That one test improves almost every brief.",
  },
  {
    title: "Show the numbers",
    body: "We agree what success looks like before we start and report on it plainly, including what didn’t work.",
  },
  {
    title: "Original or nothing",
    body: "Platforms now reward originality and penalise reposts. We make things that are yours, from your voice to your audio.",
  },
  {
    title: "Small loops, fast learning",
    body: "Test small, keep the winners, cut the rest. Weekly beats quarterly.",
  },
];

const disciplines = [
  "Growth strategists",
  "Short-form video editors",
  "Designers and art directors",
  "Copywriters and scriptwriters",
  "Paid media buyers",
  "Web designers and developers",
  "Community managers",
  "Analytics specialists",
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="A studio for brands that grow in the feed."
        intro="We started Sendworthy because good brands kept getting stuck between agencies that made beautiful content nobody measured and performance teams that measured content nobody wanted to watch."
        crumbs={[{ name: "About", path: "/about" }]}
      />

      <section className="container-x grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="space-y-5 text-[1.0625rem] lg:col-span-7 lg:text-lg">
          <p>
            Sendworthy puts strategy, content production, paid social and web under one roof, so the Reel, the ad it becomes
            and the page it lands on are all built for the same goal.
          </p>
          <p>
            We work with consumer and B2B brands that sell through social, from first launch to scaling what already works.
            Our rule is simple: if it doesn’t help someone decide to enquire, book or buy, we don’t make it.
          </p>
          <p className="text-muted">{site.location}.</p>
        </div>
        <aside className="lg:col-span-5">
          <div className="rounded-[1.25rem] border border-line bg-surface p-6 sm:p-7">
            <h2 className="text-lg font-semibold tracking-[-0.02em]">The team covers</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
              {disciplines.map((d) => (
                <li key={d} className="flex items-center gap-2.5">
                  <span className="size-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section aria-labelledby="values-title" className="container-x mt-24 lg:mt-32">
        <SectionHeading id="values-title" title="What we believe." />
        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {values.map((v) => (
            <li key={v.title}>
              <Spotlight className="h-full p-6 sm:p-8">
                <h3 className="display text-[1.6rem] leading-[1.05] tracking-[-0.045em]">{v.title}</h3>
                <p className="mt-3 max-w-lg text-muted">{v.body}</p>
              </Spotlight>
            </li>
          ))}
        </ul>
      </section>

      {site.team.length > 0 && (
        <section aria-labelledby="team-title" className="container-x mt-24 lg:mt-32">
          <SectionHeading id="team-title" title="The people you’ll work with." />
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {site.team.map((p) => (
              <li key={p.name}>
                {p.photo && (
                  <Image
                    src={p.photo}
                    alt={`Portrait of ${p.name}`}
                    width={600}
                    height={720}
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                    className="aspect-[5/6] w-full rounded-[1.25rem] object-cover"
                  />
                )}
                <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em]">{p.name}</h3>
                <p className="font-medium">{p.role}</p>
                <p className="mt-2 text-muted">{p.bio}</p>
                {p.linkedin && (
                  <a href={p.linkedin} target="_blank" rel="noopener noreferrer" className="link mt-2 inline-block">
                    LinkedIn
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section aria-labelledby="process-title" className="container-x mt-24 lg:mt-32">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading id="process-title" title="How we work." />
          <BookCallLink location="about_process" className="btn btn-primary shrink-0 self-start md:self-auto">
            Book a discovery call
          </BookCallLink>
        </div>
        <div className="mt-10">
          <Process />
        </div>
      </section>

      <CtaBand source="about_cta" />
    </>
  );
}
