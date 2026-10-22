import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy policy",
  description: `How ${site.name} collects, uses and protects personal data from this website.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy policy" path="/privacy">
      <p>
        This policy explains how {site.legalName} (“{site.name}”, “we”) handles personal data collected through this website. We
        aim to comply with India’s Digital Personal Data Protection Act, 2023 and, for visitors in the EU and UK, the GDPR.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>
          <strong>Enquiries:</strong> your name, email, and optionally your company, website or social handle, services of
          interest, budget range and message, when you send the enquiry form.
        </li>
        <li>
          <strong>Bookings:</strong> details you give when booking a call through our scheduling provider, Cal.com.
        </li>
        <li>
          <strong>Analytics (only with your consent):</strong> pages visited, device and approximate location, collected by
          Google Analytics through Google Tag Manager.
        </li>
        <li>
          <strong>Technical data:</strong> IP address and browser information, processed briefly to protect the site from spam and
          abuse.
        </li>
      </ul>

      <h2>Why we use it</h2>
      <ul>
        <li>To reply to your enquiry and arrange calls (on the basis of your consent and steps before a contract).</li>
        <li>To understand which pages are useful and improve the site (on the basis of your consent).</li>
        <li>To keep the site secure and prevent spam (our legitimate interest).</li>
      </ul>
      <p>We do not sell your personal data, and we don’t add enquiry details to marketing lists without asking.</p>

      <h2>Who we share it with</h2>
      <p>We use trusted service providers that process data on our behalf:</p>
      <ul>
        <li>Website hosting (for example Vercel)</li>
        <li>Email delivery for enquiries (for example Resend)</li>
        <li>Scheduling (Cal.com)</li>
        <li>Analytics (Google Analytics and Google Tag Manager), only with consent</li>
        <li>Spam protection (Cloudflare Turnstile), if enabled</li>
      </ul>
      <p>Some providers may process data outside your country. Where they do, we rely on their standard contractual protections.</p>

      <h2>How long we keep it</h2>
      <p>
        We keep enquiries for up to 24 months unless you become a client, in which case we keep records for as long as needed
        for the contract and legal obligations. Analytics data is kept according to the retention period set in Google
        Analytics.
      </p>

      <h2>Your rights</h2>
      <p>
        You can ask to access, correct or delete your personal data, withdraw consent at any time, or raise a concern. Email{" "}
        {site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : "us"} and we’ll respond within 30 days. You can
        change cookie choices at any time from “Cookie settings” in the footer. See our <Link href="/cookies">cookie policy</Link>.
      </p>

      <h2>Changes</h2>
      <p>We’ll update this page when our practices change. The date at the top shows the latest version.</p>

      <p>
        <em>
          This policy is a starting template. Have it reviewed by a qualified advisor for your business and the countries you
          serve.
        </em>
      </p>
    </LegalPage>
  );
}
