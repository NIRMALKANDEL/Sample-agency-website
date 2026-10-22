import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { BookCallLink, ContactLink } from "@/components/Tracked";
import { Calendar, Chat, Mail, Phone } from "@/components/Icons";
import { Spotlight } from "@/components/ui/Spotlight";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact: start a project",
  description: "Tell us about your brand and goals. We reply to every brief within one working day, or book a discovery call directly.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Start a project."
        intro="A few details now saves a call later. Prefer to talk? Book a 30-minute discovery call instead."
        crumbs={[{ name: "Contact", path: "/contact" }]}
      />

      <section className="container-x grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="rounded-[1.5rem] border border-line bg-surface p-5 sm:p-10 lg:col-span-8">
          <h2 className="sr-only">Enquiry form</h2>
          <EnquiryForm variant="full" source="contact_page" />
        </div>

        <aside className="space-y-3 lg:col-span-4">
          <Spotlight className="p-6 sm:p-7">
            <Calendar size={24} className="text-muted" />
            <h2 className="display mt-4 text-[1.75rem] leading-none tracking-[-0.045em]">Rather just talk?</h2>
            <p className="mt-3 text-muted">Pick a time for a free 30-minute video call. No preparation needed.</p>
            <BookCallLink location="contact_aside" className="btn btn-primary mt-5 w-full">
              Book a discovery call
            </BookCallLink>
          </Spotlight>

          <div className="rounded-[1.25rem] border border-line bg-surface p-6 sm:p-7">
            <h2 className="text-lg font-semibold tracking-[-0.02em]">Other ways to reach us</h2>
            <ul className="mt-3 space-y-1">
              {site.email && (
                <li>
                  <ContactLink method="email" href={`mailto:${site.email}`} location="contact_aside" className="flex min-h-11 items-center gap-3 font-medium no-underline hover:underline">
                    <Mail /> {site.email}
                  </ContactLink>
                </li>
              )}
              {site.phone && (
                <li>
                  <ContactLink method="phone" href={`tel:${site.phone.replace(/\s+/g, "")}`} location="contact_aside" className="flex min-h-11 items-center gap-3 font-medium no-underline hover:underline">
                    <Phone /> {site.phone}
                  </ContactLink>
                </li>
              )}
              {site.whatsapp && (
                <li>
                  <ContactLink method="whatsapp" href={`https://wa.me/${site.whatsapp}`} location="contact_aside" className="flex min-h-11 items-center gap-3 font-medium no-underline hover:underline">
                    <Chat /> WhatsApp
                  </ContactLink>
                </li>
              )}
            </ul>
            <p className="mt-6 text-sm text-muted">{site.hours}</p>
            <p className="mt-1 text-sm text-muted">{site.location}</p>
          </div>

          <div className="rounded-[1.25rem] border border-dashed border-line-strong p-6 sm:p-7">
            <h2 className="text-lg font-semibold tracking-[-0.02em]">What happens next</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-muted">
              <li>We read your brief and look at your channels.</li>
              <li>We reply within one working day with questions or call times.</li>
              <li>On the call we share first ideas and, if it’s a fit, send a proposal.</li>
            </ol>
          </div>
        </aside>
      </section>
    </>
  );
}
