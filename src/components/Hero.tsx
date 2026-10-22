import Link from "next/link";
import { HeroVisual } from "./three/HeroVisual";
import { BookCallLink } from "./Tracked";
import { Bookmark, Calendar, Send } from "./Icons";
import { SplitWords } from "./ui/SplitWords";
import { WordCycler } from "./ui/WordCycler";
import { SpinBadge } from "./ui/SpinBadge";
import { cssVars } from "@/lib/css";

/** Illustrative notifications that float around the 3D sculpture: the journey from a send to a booked call. */
const chips = [
  {
    Icon: Send,
    title: "Your Reel was sent",
    sub: "via DM to close friends",
    tone: "bg-accent",
    pos: "right-[4%] top-[18%] lg:right-[6%] lg:top-[20%]",
    r: "4deg",
    d: 900,
  },
  {
    Icon: Bookmark,
    title: "Saved to Ideas",
    sub: "carousel, 8 slides",
    tone: "bg-pop",
    pos: "left-[4%] top-[48%] lg:left-auto lg:right-[34%] lg:top-[52%]",
    r: "-5deg",
    d: 1150,
  },
  {
    Icon: Calendar,
    title: "Discovery call booked",
    sub: "Tuesday, 11:00",
    tone: "bg-lavender",
    pos: "hidden lg:flex lg:right-[8%] lg:bottom-[24%]",
    r: "3deg",
    d: 1400,
  },
];

/**
 * Full-screen hero: a kinetic headline whose last word cycles (send → save → share → book),
 * a WebGL sculpture of glossy social "reactions", floating notifications and a spinning booking badge.
 */
export function Hero() {
  return (
    <section className="noise relative isolate overflow-x-clip" aria-labelledby="hero-title">
      <div aria-hidden="true" className="aurora">
        <i />
        <i />
        <i />
      </div>
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[44rem]" />

      <HeroVisual className="absolute inset-x-0 top-14 h-[21rem] xs:h-[24rem] sm:h-[30rem] lg:inset-y-0 lg:left-auto lg:top-0 lg:h-full lg:w-[58%]">
        {chips.map(({ Icon, title, sub, tone, pos, r, d }) => (
          <div
            key={title}
            className={`pop-in absolute z-10 flex ${pos}`}
            style={cssVars({ "--d": `${d}ms` })}
          >
            <div
              className="bob glass flex items-center gap-3 rounded-2xl py-2.5 pl-2.5 pr-4 shadow-[0_20px_50px_-20px_rgba(18,7,46,0.7)]"
              style={cssVars({ "--r": r }, { animationDelay: `${d / 3}ms` })}
            >
              <span className={`grid size-9 shrink-0 place-items-center rounded-xl text-night ${tone}`}>
                <Icon size={17} />
              </span>
              <span className="leading-tight">
                <span className="block text-[0.85rem] font-semibold sm:text-sm">{title}</span>
                <span className="block text-xs text-muted">{sub}</span>
              </span>
            </div>
          </div>
        ))}
      </HeroVisual>

      <div className="container-x relative flex min-h-[100svh] flex-col justify-end pb-10 pt-[22rem] xs:pt-[25rem] sm:pb-14 sm:pt-[31rem] lg:pb-16 lg:pt-40">
        <h1 id="hero-title" className="display h1 relative z-10 max-w-[11ch] text-balance">
          <SplitWords text="Make things people" />{" "}
          <span className="split-word">
            <span style={cssVars({ "--i": 3 })}>
              <WordCycler words={["send.", "save.", "share.", "book."]} />
            </span>
          </span>
        </h1>

        <div className="relative z-10 mt-8 grid items-end gap-8 sm:mt-10 lg:grid-cols-12">
          <div className="fade-up lg:col-span-7" style={cssVars({ "--d": "450ms" })}>
            <p className="lede max-w-lg text-ink/80">
              A growth and creative studio for brands on Instagram, TikTok, YouTube and LinkedIn. We make the content,
              the ads and the website that turn scrolling into enquiries.
            </p>
            <div className="mt-7 flex flex-col gap-3 xs:flex-row">
              <BookCallLink location="hero" className="btn btn-primary text-base">
                Book a discovery call
              </BookCallLink>
              <Link href="/work" className="btn btn-secondary text-base">
                See the work
              </Link>
            </div>
          </div>
          <div className="pop-in hidden justify-end sm:flex lg:col-span-5" style={cssVars({ "--d": "700ms" })}>
            <SpinBadge location="hero_badge" id="hero-badge" />
          </div>
        </div>
      </div>
    </section>
  );
}
