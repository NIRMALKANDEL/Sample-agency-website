/**
 * Central business details. Edit this file to make the site yours.
 * Anything left empty is hidden from the site rather than shown as a placeholder.
 */

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  /** Path under /public, e.g. "/team/asha.jpg" (optional). */
  photo?: string;
  linkedin?: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const site = {
  name: "Sendworthy",
  legalName: "Sendworthy Studio",
  tagline: "Growth & creative studio",
  description:
    "Sendworthy is a growth and creative studio. We plan, make and scale content for Instagram, TikTok, YouTube and LinkedIn, then run the ads and websites that turn attention into enquiries.",
  url: resolveSiteUrl(),
  locale: "en_IN",

  // Contact. Leave a value empty ("") to hide it everywhere.
  email: "hello@example.com" as string,
  phone: "" as string, // e.g. "+91 98765 43210"
  whatsapp: "" as string, // digits only with country code, e.g. "919876543210"
  location: "India, working with brands worldwide",
  hours: "Monday to Friday, 10:00 to 19:00 IST",
  responseTime: "We reply to every brief within one working day.",

  socials: {
    instagram: "", // full URLs, e.g. "https://www.instagram.com/yourhandle"
    linkedin: "",
    youtube: "",
    tiktok: "",
    x: "",
  } as Record<string, string>,

  /** Only real, permission-granted testimonials. Section is hidden while empty. */
  testimonials: [] as Testimonial[],

  /** Only real people. The team section is hidden while empty. */
  team: [] as TeamMember[],

  /** Budget ranges offered in the enquiry form. */
  budgets: [
    "Under ₹1 lakh / month",
    "₹1–3 lakh / month",
    "₹3–7 lakh / month",
    "₹7 lakh+ / month",
    "One-off project",
    "Not sure yet",
  ],
} as const;

export const nav = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
] as const;

export const calLink = process.env.NEXT_PUBLIC_CAL_LINK ?? "";
export const calOrigin = process.env.NEXT_PUBLIC_CAL_ORIGIN || "https://app.cal.com";

export function absoluteUrl(path = "/"): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}
