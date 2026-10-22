import Link from "next/link";
import { services } from "@/content/services";
import { nav, site } from "@/lib/site";
import { Logo } from "./Logo";
import { ContactLink, BookCallLink } from "./Tracked";
import { CookieSettingsButton } from "./ConsentBanner";

const socialLabels: Record<string, string> = {
  instagram: "Instagram",
  linkedin: "LinkedIn",
  youtube: "YouTube",
  tiktok: "TikTok",
  x: "X",
};

export function Footer() {
  const socials = Object.entries(site.socials).filter(([, url]) => Boolean(url));
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 overflow-hidden border-t border-line pb-28 pt-16 lg:mt-32 lg:pb-8">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Logo />
            <p className="mt-5 max-w-sm text-muted">{site.description}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <BookCallLink location="footer" />
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="text-sm font-medium text-ink">Studio</h2>
              <ul className="mt-3 space-y-1">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="inline-flex min-h-8 items-center text-muted no-underline hover:text-ink">
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/book" className="inline-flex min-h-8 items-center text-muted no-underline hover:text-ink">
                    Book a call
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-medium text-ink">Services</h2>
              <ul className="mt-3 space-y-1">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`} className="inline-flex min-h-8 items-center text-muted no-underline hover:text-ink">
                      {s.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-medium text-ink">Contact</h2>
              <ul className="mt-3 space-y-1 text-muted">
                {site.email && (
                  <li>
                    <ContactLink method="email" href={`mailto:${site.email}`} location="footer" className="inline-flex min-h-8 items-center break-all no-underline hover:text-ink">
                      {site.email}
                    </ContactLink>
                  </li>
                )}
                {site.phone && (
                  <li>
                    <ContactLink method="phone" href={`tel:${site.phone.replace(/\s+/g, "")}`} location="footer" className="no-underline hover:text-ink">
                      {site.phone}
                    </ContactLink>
                  </li>
                )}
                {site.whatsapp && (
                  <li>
                    <ContactLink method="whatsapp" href={`https://wa.me/${site.whatsapp}`} location="footer" className="inline-flex min-h-8 items-center no-underline hover:text-ink">
                      WhatsApp
                    </ContactLink>
                  </li>
                )}
                <li>{site.location}</li>
                {socials.map(([key, url]) => (
                  <li key={key}>
                    <a href={url} target="_blank" rel="noopener noreferrer me" className="inline-flex min-h-8 items-center no-underline hover:text-ink">
                      {socialLabels[key] ?? key}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5">
            <li>
              <Link href="/privacy" className="inline-flex min-h-11 items-center no-underline hover:text-ink">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="inline-flex min-h-11 items-center no-underline hover:text-ink">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="inline-flex min-h-11 items-center no-underline hover:text-ink">
                Cookies
              </Link>
            </li>
            <li>
              <CookieSettingsButton />
            </li>
          </ul>
        </div>
        <p
          aria-hidden="true"
          className="pointer-events-none mt-10 select-none whitespace-nowrap bg-gradient-to-b from-ink/25 to-transparent bg-clip-text text-center text-[clamp(3.5rem,16.5vw,15rem)] font-semibold leading-[0.85] tracking-[-0.06em] text-transparent"
        >
          sendworthy
        </p>
      </div>
    </footer>
  );
}
