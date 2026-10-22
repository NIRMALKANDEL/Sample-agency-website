import { engagements } from "@/content/home";
import { site } from "@/lib/site";
import { Check } from "../Icons";
import { Spotlight } from "../ui/Spotlight";
import { cssVars } from "@/lib/css";

export { Faq } from "./Faq";
export { ProcessTimeline as Process } from "./ProcessTimeline";

export function SectionHeading({
  title,
  intro,
  id,
  className = "",
}: {
  title: string;
  intro?: string;
  id?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-3xl ${className}`} data-reveal>
      <h2 id={id} className="display h2 text-balance">
        {title}
      </h2>
      {intro && <p className="lede mt-5">{intro}</p>}
    </div>
  );
}

const engagementTones = [
  { chip: "bg-lavender", dot: "text-lavender" },
  { chip: "bg-accent", dot: "text-accent" },
  { chip: "bg-pop", dot: "text-pop" },
];

/** Three engagement shapes as tilting cards; the middle one wears a rotating gradient border. */
export function Engagements() {
  return (
    <ul className="grid gap-4 md:grid-cols-3 md:items-stretch">
      {engagements.map((e, i) => {
        const tone = engagementTones[i % engagementTones.length];
        const featured = i === 1;
        return (
          <li key={e.name} data-reveal="scale" style={cssVars({ "--d": `${i * 90}ms` })} className={featured ? "ring-anim rounded-[1.75rem] md:-translate-y-4" : ""}>
            <Spotlight tilt className={`h-full rounded-[1.75rem] p-6 sm:p-8 ${featured ? "bg-surface-2" : ""}`}>
              <section aria-labelledby={`eng-${i}`} className="flex h-full flex-col">
                <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold text-night ${tone.chip}`}>{e.term}</span>
                <h3 id={`eng-${i}`} className="display mt-6 text-[2.4rem] leading-[0.92] sm:text-[2.8rem]">
                  {e.name}
                </h3>
                <p className="mt-4 text-muted">{e.bestFor}</p>
                <ul className="mt-7 space-y-3 border-t border-line pt-6">
                  {e.includes.map((inc) => (
                    <li key={inc} className="flex gap-3 text-[0.97rem]">
                      <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-current ${tone.dot}`}>
                        <Check size={12} className="text-night" strokeWidth={3} />
                      </span>
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </Spotlight>
          </li>
        );
      })}
    </ul>
  );
}

export function Testimonials() {
  if (site.testimonials.length === 0) return null;
  return (
    <section aria-labelledby="testimonials-title" className="container-x mt-24 lg:mt-36">
      <h2 id="testimonials-title" className="display h2" data-reveal>
        In our clients’ words
      </h2>
      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {site.testimonials.map((t) => (
          <li key={t.name} data-reveal>
            <Spotlight tilt className="h-full p-7 sm:p-9">
              <figure>
                <blockquote className="display text-[1.7rem] leading-[1.05]">“{t.quote}”</blockquote>
                <figcaption className="mt-6">
                  <span className="block font-semibold">{t.name}</span>
                  <span className="block text-sm text-muted">
                    {t.role}, {t.company}
                  </span>
                </figcaption>
              </figure>
            </Spotlight>
          </li>
        ))}
      </ul>
    </section>
  );
}
