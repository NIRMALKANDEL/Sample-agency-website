import type { Metadata } from "next";
import Link from "next/link";
import { BookCallLink } from "@/components/Tracked";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[75vh] flex-col justify-center pb-20 pt-32">
      <p className="serif text-[clamp(6rem,24vw,15rem)] leading-[0.8] text-lavender" aria-hidden="true">
        404
      </p>
      <h1 className="display h2 mt-8 max-w-3xl text-balance">This page didn’t get sent anywhere.</h1>
      <p className="lede mt-5">The link may be old or mistyped. Try one of these instead.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-secondary">
          Go to the homepage
        </Link>
        <Link href="/services" className="btn btn-secondary">
          See services
        </Link>
        <BookCallLink location="404" />
      </div>
    </section>
  );
}
