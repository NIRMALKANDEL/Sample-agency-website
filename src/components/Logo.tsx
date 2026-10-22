import Link from "next/link";
import { site } from "@/lib/site";

/** Wordmark: a tomato dot with a paper plane, and a tightly tracked lowercase name. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex min-h-11 items-center gap-2 rounded-full text-ink no-underline ${className}`}
      aria-label={`${site.name} home`}
    >
      <span
        aria-hidden="true"
        className="grid size-8 place-items-center rounded-full bg-accent text-night ring-[1.5px] ring-night transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-rotate-[30deg] group-hover:scale-110 group-hover:bg-pop"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z" />
        </svg>
      </span>
      <span className="display text-[1.35rem] leading-none tracking-[-0.04em]">sendworthy</span>
    </Link>
  );
}
