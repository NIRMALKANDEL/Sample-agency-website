import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { CalEmbed } from "@/components/booking/CalEmbed";
import { Check } from "@/components/Icons";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Book a discovery call",
  description:
    "Pick a time for a free 30-minute video call about your brand, channels and goals. Times are shown in your own timezone.",
  path: "/book",
});

const agenda = [
  "Your goals, audience and what’s working now",
  "A quick look at your channels, with first ideas",
  "Whether we’re a fit, and what working together would look like",
];

export default function BookPage() {
  return (
    <>
      <PageHero
        title="Book a discovery call."
        intro="30 minutes on video, free and no obligation. Times are shown in your timezone, and you’ll get a calendar invite straight away."
        crumbs={[{ name: "Book a call", path: "/book" }]}
      />

      <section className="container-x grid gap-10 lg:grid-cols-12 lg:gap-14">
        <aside className="lg:col-span-4">
          <h2 className="text-lg font-semibold tracking-[-0.02em]">On the call</h2>
          <ul className="mt-4 space-y-3">
            {agenda.map((a) => (
              <li key={a} className="flex gap-3">
                <Check size={18} className="mt-1 shrink-0 text-muted" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-muted">
            Can’t find a time that works?{" "}
            <Link href="/contact" className="link">
              Send a brief
            </Link>{" "}
            and we’ll work around you.
          </p>
        </aside>
        <div className="lg:col-span-8">
          <CalEmbed location="book_page" />
        </div>
      </section>
    </>
  );
}
