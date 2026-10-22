"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { calLink, site } from "@/lib/site";
import { ContactLink } from "../Tracked";
import type { CalPrefill } from "./CalInline";

function CalSkeleton() {
  return (
    <div className="grid min-h-[620px] gap-4 p-6 sm:grid-cols-[1fr_2fr]" role="status" aria-label="Loading calendar">
      <div className="space-y-3">
        <div className="skeleton h-6 w-2/3 rounded-lg" />
        <div className="skeleton h-4 w-1/2 rounded-lg" />
        <div className="skeleton h-4 w-3/4 rounded-lg" />
      </div>
      <div className="skeleton min-h-[420px] rounded-2xl" />
    </div>
  );
}

const CalInline = dynamic(() => import("./CalInline"), { ssr: false, loading: CalSkeleton });

/** Booking calendar, or an honest fallback when Cal.com isn't configured. */
export function CalEmbed({ prefill, location }: { prefill?: CalPrefill; location: string }) {
  if (!calLink) {
    return (
      <div className="rounded-[1.5rem] border border-dashed border-line-strong p-8 text-center sm:p-12">
        <h3 className="text-xl font-semibold tracking-[-0.02em]">Online booking isn’t switched on yet</h3>
        <p className="mx-auto mt-3 max-w-md text-muted">
          Send us a short brief and we’ll reply with times that suit you
          {site.email ? (
            <>
              , or email{" "}
              <ContactLink method="email" href={`mailto:${site.email}`} location={`${location}_fallback`} className="link">
                {site.email}
              </ContactLink>
            </>
          ) : null}
          .
        </p>
        <Link href="/contact" className="btn btn-primary mt-6">
          Send a brief
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-line bg-surface">
      <CalInline prefill={prefill} location={location} />
    </div>
  );
}
