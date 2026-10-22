import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

/**
 * Production allows crawling. Vercel preview deployments (VERCEL_ENV=preview)
 * are blocked so they never compete with the real domain in search.
 */
export default function robots(): MetadataRoute.Robots {
  const isPreview = process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== "production";
  if (isPreview) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
