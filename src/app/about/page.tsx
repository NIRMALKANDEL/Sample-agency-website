import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/PageHero";
import { Process, SectionHeading } from "@/components/home/Sections";
import { CtaBand } from "@/components/CtaBand";
import { Spotlight } from "@/components/ui/Spotlight";
import { BookCallLink } from "@/components/Tracked";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { cssVars } from "@/lib/css";

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

const valueTones = ["bg-accent", "bg-pop", "bg-lavender", "bg-pop"];

const stickerTones = ["bg-accent", "bg-pop", "bg-lavender", "bg-white"];
const stickerTilts = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "rotate-1", "-rotate-2"];

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
        <div className="space-y-5 text-[1.0625rem] lg:col-span-7 lg:text-xl" data-reveal>
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
        <aside className="lg:col-span-5" data-reveal>
          <div className="noise relative isolate overflow-hidden rounded-[1.75rem] border border-line bg-surface p-6 sm:p-8">
            <h2 className="display text-[2rem] leading-none">The team covers</h2>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {disciplines.map((d, i) => (
                <li key={d} className={`sticker ${stickerTones[i % stickerTones.length]} ${stickerTilts[i % stickerTilts.length]}`}>
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <section aria-labelledby="values-title" className="container-x mt-28 lg:mt-40">
        <SectionHeading id="values-title" title="What we believe." />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {values.map((v, i) => (
            <li key={v.title} data-reveal style={cssVars({ "--d": `${(i % 2) * 90}ms` })} className={i % 2 === 1 ? "sm:translate-y-12" : ""}>
              <Spotlight tilt className="group h-full rounded-[1.75rem] p-7 sm:p-9">
                <span
                  aria-hidden="true"
                  className={`grid size-14 place-items-center rounded-2xl border-[1.5px] border-night text-night shadow-[0_5px_0_-1px_#12072e] transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-12 group-hover:scale-110 ${valueTones[i % valueTones.length]}`}
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" fill="currentColor" />
                  </svg>
                </span>
                <h3 className="display mt-8 text-[2.2rem] leading-[0.95] sm:text-[2.6rem]">{v.title}</h3>
                <p className="mt-4 max-w-lg text-muted">{v.body}</p>
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

      <section aria-labelledby="process-title" className="theme-uv noise relative isolate mt-28 overflow-hidden py-24 lg:mt-40 lg:py-32">
        <div aria-hidden="true" className="aurora">
          <i />
          <i />
          <i />
        </div>
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading id="process-title" title="How we work." />
              <BookCallLink location="about_process" className="btn btn-primary mt-8">
                Book a discovery call
              </BookCallLink>
            </div>
          </div>
          <div className="lg:col-span-7">
            <Process />
          </div>
        </div>
      </section>

      <CtaBand source="about_cta" />
    </>
  );
}
