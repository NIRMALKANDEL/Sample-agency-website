import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Markdown-based blog. Add a new article by dropping a .md file with the same
 * front matter into src/content/insights. The filename becomes the URL slug.
 */

const DIR = path.join(process.cwd(), "src", "content", "insights");

export type InsightMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  author: string;
  tags: string[];
  readingMinutes: number;
};

export type Insight = InsightMeta & { html: string };

function readFiles(): string[] {
  if (!fs.existsSync(DIR)) return [];
  return fs.readdirSync(DIR).filter((f) => f.endsWith(".md"));
}

function toIsoDate(value: unknown, fallback: string): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  if (typeof value === "string" && value) return value;
  return fallback;
}

function parse(file: string): Insight {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.md$/, "");
  const words = content.trim().split(/\s+/).length;
  const rendered = marked.parse(content, { async: false, gfm: true }) as string;
  const html = rendered.replace(
    /<a href="(https?:\/\/)/g,
    '<a target="_blank" rel="noopener noreferrer" href="$1',
  );

  return {
    slug,
    title: String(data.title ?? slug),
    description: String(data.description ?? ""),
    date: toIsoDate(data.date, "1970-01-01"),
    updated: data.updated ? toIsoDate(data.updated, "") || undefined : undefined,
    author: String(data.author ?? "Sendworthy"),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingMinutes: Math.max(1, Math.round(words / 220)),
    html,
  };
}

export function getAllInsights(): InsightMeta[] {
  return readFiles()
    .map((f): InsightMeta => {
      const meta: InsightMeta & { html?: string } = { ...parse(f) };
      delete meta.html;
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getInsight(slug: string): Insight | undefined {
  const file = `${slug}.md`;
  if (!readFiles().includes(file)) return undefined;
  return parse(file);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
