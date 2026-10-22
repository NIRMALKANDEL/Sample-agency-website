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
          <div data-reveal className="on-bright noise relative isolate overflow-hidden rounded-[1.75rem] border-[1.5px] border-night bg-pop p-6 shadow-[8px_10px_0_0_#12072e] sm:p-8">
            <h2 className="display text-[2.2rem] leading-none">On the call</h2>
            <ul className="mt-6 space-y-4 font-medium">
              {agenda.map((a) => (
                <li key={a} className="flex gap-3">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-night text-pop">
                    <Check size={13} strokeWidth={3} />
                  </span>
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-8 text-muted">
            Can’t find a time that works?{" "}
            <Link href="/contact" className="link">
              Send a brief
            </Link>{" "}
            and we’ll work around you.
          </p>
        </aside>
        <div data-reveal className="lg:col-span-8">
          <CalEmbed location="book_page" />
        </div>
      </section>
    </>
  );
}
