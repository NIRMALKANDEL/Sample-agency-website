import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of use",
  description: `Terms for using the ${site.name} website.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <LegalPage title="Terms of use" path="/terms">
      <p>
        These terms apply to your use of this website, operated by {site.legalName}. By using the site you agree to them. Client
        projects are covered by a separate written agreement, which takes priority over these terms.
      </p>

      <h2>Using the site</h2>
      <p>
        You may browse and share pages for personal and business research. Don’t misuse the site, for example by attempting to
        break its security, sending spam through our forms or scraping content at scale.
      </p>

      <h2>Content and intellectual property</h2>
      <p>
        Text, design, graphics and code on this site belong to {site.legalName} or our licensors. Concept projects are
        illustrative and feature fictional brands. You may quote short extracts from our articles with a link back.
      </p>

      <h2>Information, not advice</h2>
      <p>
        Articles and platform insights are general information based on the sources we cite, which can change quickly. They are
        not a guarantee of results for your brand.
      </p>

      <h2>Enquiries and bookings</h2>
      <p>
        Sending an enquiry or booking a call doesn’t create a contract. Any work we do together is agreed in a written proposal
        and contract.
      </p>

      <h2>Third-party links and services</h2>
      <p>We link to other websites and use third-party services such as Cal.com. We aren’t responsible for their content or practices.</p>

      <h2>Liability</h2>
      <p>
        The site is provided “as is”. To the extent the law allows, we are not liable for losses from using it or relying on its
        content.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of India, and the courts of India have jurisdiction.</p>

      <h2>Contact</h2>
      <p>
        Questions about these terms?{" "}
        {site.email ? <a href={`mailto:${site.email}`}>Email {site.email}</a> : <Link href="/contact">Contact us</Link>}.
      </p>

      <p>
        <em>This is a starting template. Have it reviewed by a qualified advisor before relying on it.</em>
      </p>
    </LegalPage>
  );
}
