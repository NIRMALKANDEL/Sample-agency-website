import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { CookieSettingsButton } from "@/components/ConsentBanner";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Cookie policy",
  description: `Which cookies and similar technologies ${site.name} uses, and how to change your choices.`,
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie policy" path="/cookies">
      <p>
        Cookies and similar storage help this site work and, with your permission, help us understand how it’s used. Optional
        cookies are off until you allow them.
      </p>

      <h2>Essential (always on)</h2>
      <ul>
        <li>
          <strong>Theme preference</strong> (local storage: <code>theme</code>): remembers light or dark mode.
        </li>
        <li>
          <strong>Consent choice</strong> (local storage: <code>sw-consent-v1</code>): remembers your cookie decision.
        </li>
        <li>
          <strong>Spam protection</strong> (Cloudflare Turnstile, if enabled): checks that form submissions come from people.
        </li>
      </ul>

      <h2>Analytics (optional)</h2>
      <p>
        Google Analytics 4 (<code>_ga</code>, <code>_ga_*</code>), loaded through Google Tag Manager, measures visits and which
        pages lead to enquiries. It only sets cookies after you allow analytics. Until then, Google Consent Mode keeps analytics
        storage denied.
      </p>

      <h2>Marketing (optional)</h2>
      <p>
        If we run ads, platforms such as Google Ads or Meta may set cookies to measure them. These only load if you allow
        marketing cookies.
      </p>

      <h2>Booking calendar</h2>
      <p>
        The booking calendar is provided by Cal.com and runs in an embedded frame. Cal.com may use cookies needed to make the
        booking work. See Cal.com’s own privacy policy for details.
      </p>

      <h2>Change your choice</h2>
      <p>
        You can change or withdraw consent at any time: <CookieSettingsButton />.
      </p>
    </LegalPage>
  );
}
