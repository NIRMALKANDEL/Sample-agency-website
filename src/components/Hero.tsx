import Link from "next/link";
import { HeroVisual } from "./three/HeroVisual";
import { BookCallLink } from "./Tracked";

/** Compact split hero: headline, one line of support and two CTAs, with the 3D object beside (desktop) or above (mobile). */
export function Hero() {
  return (
    <section className="noise relative isolate overflow-x-clip" aria-labelledby="hero-title">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34rem]" />
      <div aria-hidden="true" className="glow-lavender pointer-events-none absolute inset-0 -z-10" />

      <div className="container-x grid items-center gap-0 pb-14 pt-24 sm:pt-28 lg:min-h-[40rem] lg:grid-cols-12 lg:gap-6 lg:pb-20 lg:pt-32">
        <div className="relative z-10 lg:col-span-7">
          <h1 id="hero-title" className="display h1 shine-text text-balance">
            Make things people send.
          </h1>
          <p className="lede mt-6 max-w-md">
            A growth and creative studio for brands on Instagram, TikTok, YouTube and LinkedIn.
          </p>
          <div className="mt-8 flex flex-col gap-3 xs:flex-row">
            <BookCallLink location="hero" className="btn btn-primary text-base">
              Book a discovery call
            </BookCallLink>
            <Link href="/work" className="btn btn-secondary text-base">
              See the work
            </Link>
          </div>
          <p className="mt-5 text-sm text-muted">Free 30-minute call, no obligation.</p>
        </div>

        <HeroVisual className="order-first -mb-2 h-56 w-full sm:h-72 lg:order-last lg:mb-0 lg:h-auto lg:aspect-square lg:col-span-5" />
      </div>
    </section>
  );
}
