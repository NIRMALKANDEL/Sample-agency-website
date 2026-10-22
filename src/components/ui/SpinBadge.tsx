import { BookCallLink } from "../Tracked";

/** A round sticker with text running around its edge that slowly spins. Links to booking. */
export function SpinBadge({
  location,
  id = "badge",
  text = "Book a free call • Book a free call • ",
  className = "",
}: {
  location: string;
  id?: string;
  text?: string;
  className?: string;
}) {
  return (
    <BookCallLink
      location={location}
      className={`group relative grid size-32 shrink-0 place-items-center rounded-full bg-pop text-night no-underline shadow-[0_8px_0_-1px_rgba(18,7,46,0.95)] ring-[1.5px] ring-night transition-transform duration-500 hover:scale-105 sm:size-36 ${className}`}
    >
      <svg viewBox="0 0 120 120" className="spin-slow absolute inset-0 size-full" aria-hidden="true">
        <defs>
          <path id={`${id}-circle`} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
        </defs>
        <text style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", fill: "currentColor" }}>
          <textPath href={`#${id}-circle`}>{text}</textPath>
        </text>
      </svg>
      <span className="grid size-12 place-items-center rounded-full bg-night text-pop transition-transform duration-500 group-hover:rotate-45">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 17 17 7M8 7h9v9" />
        </svg>
      </span>
      <span className="sr-only">Book a free discovery call</span>
    </BookCallLink>
  );
}
