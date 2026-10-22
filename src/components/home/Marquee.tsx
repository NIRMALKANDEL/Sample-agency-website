import { platforms } from "@/content/home";

/** Platform names drifting past, with faded edges. Pauses on hover; static under reduced motion. */
export function Marquee() {
  const items = [...platforms, ...platforms];
  return (
    <section aria-label="Platforms we grow brands on" className="border-y border-line py-5">
      <p className="sr-only">We grow brands on {platforms.join(", ")}.</p>
      <div className="fade-x overflow-hidden">
        <div aria-hidden="true" className="marquee-track flex w-max hover:[animation-play-state:paused]">
          {items.map((p, i) => (
            <span key={i} className="flex items-center whitespace-nowrap pr-10 text-xl font-medium tracking-[-0.03em] text-muted sm:text-2xl">
              {p}
              <span className="ml-10 size-1.5 rounded-full bg-line-strong" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
