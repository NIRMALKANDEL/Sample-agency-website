import Link from "next/link";
import { site } from "@/lib/site";

/** Wordmark: a chartreuse dot with a paper plane, and a tightly tracked lowercase name. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group inline-flex min-h-11 items-center gap-2 rounded-full text-ink no-underline ${className}`}
      aria-label={`${site.name} home`}
    >
      <span
        aria-hidden="true"
        className="grid size-7 place-items-center rounded-full bg-accent text-night transition-transform duration-300 group-hover:-rotate-12"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 3 10 14M21 3l-7 18-4-7-7-4 18-7Z" />
        </svg>
      </span>
      <span className="text-[1.15rem] font-semibold leading-none tracking-[-0.05em]">sendworthy</span>
    </Link>
  );
}
