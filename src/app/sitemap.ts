import type { MetadataRoute } from "next";
import { services } from "@/content/services";
import { work } from "@/content/work";
import { getAllInsights } from "@/lib/insights";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const posts = getAllInsights();

  const staticRoutes: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/work", priority: 0.8, freq: "monthly" },
    { path: "/about", priority: 0.6, freq: "yearly" },
    { path: "/insights", priority: 0.8, freq: "weekly" },
    { path: "/contact", priority: 0.9, freq: "yearly" },
    { path: "/book", priority: 0.9, freq: "yearly" },
    { path: "/privacy", priority: 0.2, freq: "yearly" },
    { path: "/terms", priority: 0.2, freq: "yearly" },
    { path: "/cookies", priority: 0.2, freq: "yearly" },
  ];

  return [
    ...staticRoutes.map((r) => ({
      url: absoluteUrl(r.path),
      lastModified: now,
      changeFrequency: r.freq,
      priority: r.priority,
    })),
    ...services.map((s) => ({
      url: absoluteUrl(`/services/${s.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...work.map((w) => ({
      url: absoluteUrl(`/work/${w.slug}`),
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
    ...posts.map((p) => ({
      url: absoluteUrl(`/insights/${p.slug}`),
      lastModified: new Date(p.updated ?? p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
