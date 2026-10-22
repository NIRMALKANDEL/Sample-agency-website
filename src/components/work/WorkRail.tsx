"use client";

import Link from "next/link";
import { m, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { CaseStudy } from "@/content/work";
import { WorkCard } from "./WorkCard";

/**
 * Home-page work section. On large screens it pins and the projects slide sideways as you scroll down
 * (a horizontal rail). On smaller screens, or with reduced motion, it's a normal swipeable row.
 */
export function WorkRail({ items, title, intro }: { items: CaseStudy[]; title: string; intro: string }) {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const travel = useMotionValue(0);
  const [pinned, setPinned] = useState(false);

  // Decide between the pinned rail and the plain row.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const decide = () => setPinned(mq.matches && !reduce);
    const frame = requestAnimationFrame(decide);
    mq.addEventListener("change", decide);
    return () => {
      cancelAnimationFrame(frame);
      mq.removeEventListener("change", decide);
    };
  }, [reduce]);

  // Measure how far the rail has to travel.
  useEffect(() => {
    const el = track.current;
    if (!pinned || !el) return;
    const measure = () => {
      const d = Math.max(0, el.scrollWidth - window.innerWidth);
      travel.set(d);
      setDistance(d);
    };
    const frame = requestAnimationFrame(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned, travel]);

  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] });
  const raw = useTransform([scrollYProgress, travel], ([p, d]: number[]) => -p * d);
  const x = useSpring(raw, { stiffness: 140, damping: 26, restDelta: 0.5 });
  const bar = useSpring(scrollYProgress, { stiffness: 140, damping: 26 });

  const heading = (
    <div className="container-x flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <h2 id="work-title" className="display h2 text-balance">
          {title}
        </h2>
        <p className="lede mt-5">{intro}</p>
      </div>
      <Link href="/work" className="btn btn-secondary shrink-0 self-start md:self-auto">
        All work
      </Link>
    </div>
  );

  if (!pinned) {
    return (
      <section ref={section} aria-labelledby="work-title" className="mt-24 sm:mt-36">
        {heading}
        <div className="container-x mt-10">
          <ul ref={track} className="scroll-row">
            {items.map((w, i) => (
              <li key={w.slug} className="w-[86%] shrink-0 snap-start xs:w-[70%] md:w-[46%]">
                <WorkCard item={w} index={i} coverClass="h-60 md:h-72" />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }

  return (
    <section ref={section} aria-labelledby="work-title" className="relative mt-36" style={{ height: `calc(100vh + ${distance}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pb-6 pt-24">
        {heading}
        <m.ul ref={track} style={{ x }} className="mt-12 flex w-max gap-6 pl-[max(var(--gutter),calc((100vw_-_84rem)/2_+_var(--gutter)))] pr-[var(--gutter)]">
          {items.map((w, i) => (
            <li key={w.slug} className="w-[min(36rem,42vw)] shrink-0">
              <WorkCard item={w} index={i} coverClass="h-[min(22rem,38vh)]" />
            </li>
          ))}
          <li className="grid w-[min(24rem,30vw)] shrink-0 place-items-center">
            <Link
              href="/work"
              className="display group grid aspect-square w-full place-items-center rounded-full border-[1.5px] border-dashed border-line-strong text-center text-[2.4rem] leading-[0.95] no-underline transition-colors duration-500 hover:border-solid hover:border-night hover:bg-accent hover:text-night"
            >
              <span>
                See all
                <br />
                the work
              </span>
            </Link>
          </li>
        </m.ul>
        <div className="container-x mt-10">
          <div className="h-[3px] overflow-hidden rounded-full bg-line">
            <m.div style={{ scaleX: bar }} className="heat-bg h-full origin-left" />
          </div>
        </div>
      </div>
    </section>
  );
}
