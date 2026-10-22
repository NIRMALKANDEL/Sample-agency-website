import { NextResponse } from "next/server";
import { enquirySchema, toFieldErrors, type Enquiry } from "@/lib/enquiry-schema";
import { rateLimit } from "@/lib/rate-limit";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIN_FILL_MS = 2500;

function json(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function clientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  return fwd?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

async function verifyTurnstile(token: string | undefined, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Turnstile not enabled.
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token, remoteip: ip });
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

function summaryRows(e: Enquiry, id: string): [string, string][] {
  return [
    ["Reference", id],
    ["Name", e.name],
    ["Email", e.email],
    ["Company", e.company || "-"],
    ["Website / handle", e.website || "-"],
    ["Interested in", e.services.length ? e.services.join(", ") : "-"],
    ["Budget", e.budget || "-"],
    ["Form", e.source],
  ];
}

async function sendWithResend(e: Enquiry, id: string): Promise<boolean> {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  if (!key || !to || !from) return false;

  const rows = summaryRows(e, id);
  const html = `
    <h2 style="font-family:sans-serif">New enquiry from ${escapeHtml(e.name)}</h2>
    <table style="font-family:sans-serif;border-collapse:collapse">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="padding:4px 12px 4px 0;color:#5B5275">${escapeHtml(k)}</td><td style="padding:4px 0">${escapeHtml(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="font-family:sans-serif;white-space:pre-wrap;margin-top:16px">${escapeHtml(e.message)}</p>`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${e.message}`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: e.email,
      subject: `New enquiry: ${e.name}${e.company ? ` (${e.company})` : ""}`,
      html,
      text,
    }),
  });
  if (!res.ok) {
    console.error("[enquiry] Resend error", res.status, await res.text().catch(() => ""));
  }
  return res.ok;
}

async function sendToWebhook(e: Enquiry, id: string): Promise<boolean> {
  const url = process.env.ENQUIRY_WEBHOOK_URL;
  if (!url) return false;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      receivedAt: new Date().toISOString(),
      site: site.url,
      name: e.name,
      email: e.email,
      company: e.company,
      website: e.website,
      services: e.services,
      budget: e.budget,
      message: e.message,
      source: e.source,
      // Plain-text field for Slack-style incoming webhooks.
      text: `New enquiry from ${e.name} <${e.email}>${e.company ? ` (${e.company})` : ""}: ${e.message.slice(0, 500)}`,
    }),
  });
  if (!res.ok) console.error("[enquiry] Webhook error", res.status);
  return res.ok;
}

export async function POST(req: Request) {
  const ip = clientIp(req);

  if (!rateLimit(`enquiry:${ip}`)) {
    return json(429, {
      error: "rate_limited",
      message: "Too many messages from this connection. Wait a few minutes, or email us directly.",
    });
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return json(400, { error: "bad_request", message: "The form data could not be read. Refresh the page and try again." });
  }

  const parsed = enquirySchema.safeParse(payload);
  if (!parsed.success) {
    return json(422, {
      error: "validation",
      message: "Some fields need attention.",
      fieldErrors: toFieldErrors(parsed.error),
    });
  }
  const data = parsed.data;

  // Bots fill hidden fields or submit instantly. Accept silently and drop.
  const tooFast = typeof data.startedAt === "number" && Date.now() - data.startedAt < MIN_FILL_MS;
  if (data.hp || tooFast) {
    return json(200, { ok: true, id: "ignored" });
  }

  if (!(await verifyTurnstile(data.turnstileToken, ip))) {
    return json(400, {
      error: "captcha",
      message: "The spam check didn’t pass. Complete the check above the button and try again.",
    });
  }

  const hasResend = Boolean(process.env.RESEND_API_KEY && process.env.ENQUIRY_TO_EMAIL && process.env.ENQUIRY_FROM_EMAIL);
  const hasWebhook = Boolean(process.env.ENQUIRY_WEBHOOK_URL);
  if (!hasResend && !hasWebhook) {
    console.error("[enquiry] No delivery method configured. Set RESEND_* or ENQUIRY_WEBHOOK_URL.");
    return json(503, {
      error: "not_configured",
      message: `Our form isn’t connected yet, so your message wasn’t sent. Email us at ${site.email} instead.`,
    });
  }

  const id = `SW-${Date.now().toString(36).toUpperCase()}`;
  const results = await Promise.allSettled([
    hasResend ? sendWithResend(data, id) : Promise.resolve(false),
    hasWebhook ? sendToWebhook(data, id) : Promise.resolve(false),
  ]);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value === true);

  if (!delivered) {
    return json(502, {
      error: "delivery_failed",
      message: `We couldn’t deliver your message just now. Try again in a minute, or email us at ${site.email}.`,
    });
  }

  return json(200, { ok: true, id });
}

export function GET() {
  return json(405, { error: "method_not_allowed" });
}
