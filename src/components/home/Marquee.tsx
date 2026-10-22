import { platforms } from "@/content/home";

const formats = ["Reels", "Carousels", "Shorts", "Stories", "Paid social", "Creator collabs", "Brand identity", "Websites"];

function Star() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" className="mx-6 shrink-0 sm:mx-8">
      <path d="M12 0c.6 6.4 5.6 11.4 12 12-6.4.6-11.4 5.6-12 12-.6-6.4-5.6-11.4-12-12C6.4 11.4 11.4 6.4 12 0Z" fill="currentColor" />
    </svg>
  );
}

/**
 * Two crossed "tapes" running in opposite directions: the platforms we grow brands on and the formats we make.
 * Pause on hover; static under reduced motion.
 */
export function Marquee() {
  const a = [...platforms, ...platforms, ...platforms, ...platforms];
  const b = [...formats, ...formats, ...formats, ...formats];
  return (
    <section aria-label="Platforms and formats" className="relative z-10 overflow-hidden py-10 sm:py-14">
      <p className="sr-only">
        We grow brands on {platforms.join(", ")}, and make {formats.join(", ").toLowerCase()}.
      </p>
      <div aria-hidden="true" className="tape relative z-10 -rotate-[3deg] bg-accent py-3 text-night sm:py-4">
        <div className="marquee-track flex w-max items-center hover:[animation-play-state:paused]">
          {a.map((p, i) => (
            <span key={i} className="display flex items-center whitespace-nowrap text-[1.9rem] sm:text-[2.6rem]">
              {p}
              <Star />
            </span>
          ))}
        </div>
      </div>
      <div aria-hidden="true" className="tape -mt-6 rotate-[2deg] bg-pop py-3 text-night sm:-mt-8 sm:py-4">
        <div className="marquee-track-rev flex w-max items-center hover:[animation-play-state:paused]">
          {b.map((p, i) => (
            <span key={i} className="display flex items-center whitespace-nowrap text-[1.9rem] sm:text-[2.6rem]">
              {p}
              <Star />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
