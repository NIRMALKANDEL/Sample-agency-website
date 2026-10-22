import { engagements, processSteps } from "@/content/home";
import { site } from "@/lib/site";
import { Check } from "../Icons";
import { Spotlight } from "../ui/Spotlight";

export { Faq } from "./Faq";

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
    <div className={`max-w-3xl ${className}`}>
      <h2 id={id} className="display h2 text-balance">
        {title}
      </h2>
      {intro && <p className="lede mt-4">{intro}</p>}
    </div>
  );
}

/**
 * The real four-step sequence. `bright` is for use inside a chartreuse (`on-bright`) section:
 * it drops the surface fills and relies on hairlines in dark ink.
 */
export function Process({ bright = false }: { bright?: boolean }) {
  return (
    <ol
      className={`grid overflow-hidden rounded-[1.5rem] border sm:grid-cols-2 lg:grid-cols-4 ${
        bright ? "border-line-strong" : "border-line bg-surface"
      }`}
    >
      {processSteps.map((step, i) => (
        <li
          key={step.title}
          className={`flex flex-col border-line p-6 sm:p-7 ${
            i === 1 ? "border-t sm:border-t-0 lg:border-l" : ""
          } ${i >= 2 ? "border-t lg:border-t-0 lg:border-l" : ""} ${i % 2 === 1 ? "sm:border-l" : ""}`}
        >
          <span
            className="grid size-8 place-items-center rounded-full border border-line-strong text-sm font-medium tabular-nums"
            aria-hidden="true"
          >
            {i + 1}
          </span>
          <h3 className="mt-10 text-xl font-semibold tracking-[-0.03em]">
            <span className="sr-only">Step {i + 1}: </span>
            {step.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-muted">{step.duration}</p>
          <p className="mt-3 text-muted">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function Engagements() {
  return (
    <div className="grid gap-3 md:grid-cols-3">
      {engagements.map((e, i) => (
        <Spotlight key={e.name} className="p-6 sm:p-7">
          <section aria-labelledby={`eng-${i}`} className="flex h-full flex-col">
            <h3 id={`eng-${i}`} className="display text-[1.75rem] tracking-[-0.045em]">
              {e.name}
            </h3>
            <p className="mt-2 text-sm font-medium">{e.term}</p>
            <p className="mt-3 text-muted">{e.bestFor}</p>
            <ul className="mt-6 space-y-2.5 border-t border-line pt-6">
              {e.includes.map((inc) => (
                <li key={inc} className="flex gap-2.5 text-[0.95rem]">
                  <Check size={16} className="mt-1 shrink-0 text-muted" />
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </section>
        </Spotlight>
      ))}
    </div>
  );
}

export function Testimonials() {
  if (site.testimonials.length === 0) return null;
  return (
    <section aria-labelledby="testimonials-title" className="container-x mt-24 lg:mt-32">
      <h2 id="testimonials-title" className="display h2">
        In our clients’ words
      </h2>
      <ul className="mt-10 grid gap-3 md:grid-cols-2">
        {site.testimonials.map((t) => (
          <li key={t.name}>
            <Spotlight className="h-full p-7 sm:p-9">
              <figure>
                <blockquote className="text-xl font-medium leading-snug tracking-[-0.02em]">“{t.quote}”</blockquote>
                <figcaption className="mt-6">
                  <span className="block font-medium">{t.name}</span>
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
