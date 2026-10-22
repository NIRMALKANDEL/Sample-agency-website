import type { Metadata } from "next";
import Link from "next/link";
import { BookCallLink } from "@/components/Tracked";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="noise relative isolate overflow-hidden">
      <div aria-hidden="true" className="aurora">
        <i />
        <i />
        <i />
      </div>
      <div className="container-x flex min-h-[85vh] flex-col justify-center pb-20 pt-32">
        <p aria-hidden="true" className="display heat-text text-[clamp(7rem,30vw,22rem)] leading-[0.78]">
          404
        </p>
        <h1 className="display h2 mt-8 max-w-3xl text-balance">This page didn’t get sent anywhere.</h1>
        <p className="lede mt-5">The link may be old or mistyped. Try one of these instead.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <BookCallLink location="404" />
          <Link href="/" className="btn btn-secondary">
            Go to the homepage
          </Link>
          <Link href="/services" className="btn btn-secondary">
            See services
          </Link>
        </div>
      </div>
    </section>
  );
}
