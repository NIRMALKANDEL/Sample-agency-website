import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist } from "next/font/google";
import "./globals.css";
import { site } from "@/lib/site";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { Providers } from "@/components/Providers";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ConsentBanner } from "@/components/ConsentBanner";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { AnalyticsScripts, ConsentDefaults, GtmNoScript } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { Cursor } from "@/components/ui/Cursor";
import { RevealObserver } from "@/components/ui/RevealObserver";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

// Display face: a variable grotesque with width and optical-size axes, used condensed and heavy.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["opsz", "wdth"],
});

const defaultTitle = `${site.name}: growth & creative studio for social-first brands`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: defaultTitle, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: site.locale,
    url: "/",
    title: defaultTitle,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: site.description },
  robots: { index: true, follow: true, "max-image-preview": "large" },
  formatDetection: { telephone: false },
  ...(process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { verification: { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } }
    : {}),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3eeff" },
    { media: "(prefers-color-scheme: dark)", color: "#12072e" },
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.variable} ${bricolage.variable}`}>
      <head>
        {/* Marks that JavaScript runs, so scroll-reveal styles only apply when they can be undone. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <ConsentDefaults />
      </head>
      <body>
        <GtmNoScript />
        <Providers>
          <Header />
          <main id="main" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <MobileCtaBar />
          <ConsentBanner />
          <Cursor />
          <RevealObserver />
        </Providers>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <AnalyticsScripts />
      </body>
    </html>
  );
}
