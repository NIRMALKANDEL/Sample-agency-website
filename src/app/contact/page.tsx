import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { BookCallLink, ContactLink } from "@/components/Tracked";
import { Calendar, Chat, Mail, Phone } from "@/components/Icons";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact: start a project",
  description: "Tell us about your brand and goals. We reply to every brief within one working day, or book a discovery call directly.",
  path: "/contact",
});

const nextSteps = [
  "We read your brief and look at your channels.",
  "We reply within one working day with questions or call times.",
  "On the call we share first ideas and, if it’s a fit, send a proposal.",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Start a project."
        intro="A few details now saves a call later. Prefer to talk? Book a 30-minute discovery call instead."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <section className="container-x grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div data-reveal className="noise relative isolate overflow-hidden rounded-[2rem] border border-line bg-surface p-5 sm:p-10 lg:col-span-8">
          <h2 className="sr-only">Enquiry form</h2>
          <EnquiryForm variant="full" source="contact_page" />
        </div>

        <aside className="space-y-3 lg:col-span-4">
          <div data-reveal className="on-bright noise relative isolate overflow-hidden rounded-[1.75rem] border-[1.5px] border-night bg-accent p-6 shadow-[8px_10px_0_0_#12072e] sm:p-8">
            <span className="grid size-12 place-items-center rounded-2xl bg-night text-pop">
              <Calendar size={22} />
            </span>
            <h2 className="display mt-6 text-[2.3rem] leading-[0.92]">Rather just talk?</h2>
            <p className="mt-3 font-medium">Pick a time for a free 30-minute video call. No preparation needed.</p>
            <BookCallLink location="contact_aside" className="btn btn-night mt-6 w-full">
              Book a discovery call
            </BookCallLink>
          </div>

          <div data-reveal className="rounded-[1.75rem] border border-line bg-surface p-6 sm:p-8">
            <h2 className="text-lg font-bold tracking-[-0.02em]">Other ways to reach us</h2>
            <ul className="mt-3 space-y-1">
              {site.email && (
                <li>
                  <ContactLink method="email" href={`mailto:${site.email}`} location="contact_aside" className="u-draw flex min-h-11 w-fit items-center gap-3 font-semibold no-underline">
                    <Mail /> {site.email}
                  </ContactLink>
                </li>
              )}
              {site.phone && (
                <li>
                  <ContactLink method="phone" href={`tel:${site.phone.replace(/\s+/g, "")}`} location="contact_aside" className="u-draw flex min-h-11 w-fit items-center gap-3 font-semibold no-underline">
                    <Phone /> {site.phone}
                  </ContactLink>
                </li>
              )}
              {site.whatsapp && (
                <li>
                  <ContactLink method="whatsapp" href={`https://wa.me/${site.whatsapp}`} location="contact_aside" className="u-draw flex min-h-11 w-fit items-center gap-3 font-semibold no-underline">
                    <Chat /> WhatsApp
                  </ContactLink>
                </li>
              )}
            </ul>
            <p className="mt-6 text-sm text-muted">{site.hours}</p>
            <p className="mt-1 text-sm text-muted">{site.location}</p>
          </div>

          <div data-reveal className="rounded-[1.75rem] border-[1.5px] border-dashed border-line-strong p-6 sm:p-8">
            <h2 className="text-lg font-bold tracking-[-0.02em]">What happens next</h2>
            <ol className="mt-5 space-y-4">
              {nextSteps.map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span aria-hidden="true" className="display grid size-8 shrink-0 place-items-center rounded-full bg-pop text-night">
                    {i + 1}
                  </span>
                  <span className="pt-1 text-muted">{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </section>
    </>
  );
}
