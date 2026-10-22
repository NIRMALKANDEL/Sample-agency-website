/**
 * Analytics helpers. Every event goes to window.dataLayer (Google Tag Manager).
 * When GA4 is loaded directly (no GTM), gtag() picks the same events up.
 *
 * Event names follow GA4 recommended events where one exists:
 *  - generate_lead       enquiry form submitted successfully
 *  - book_call_click     a "Book a call" CTA was clicked
 *  - booking_completed   a Cal.com booking was confirmed
 *  - contact_click       email / phone / WhatsApp link clicked
 */

export type AnalyticsEvent =
  | "generate_lead"
  | "book_call_click"
  | "booking_completed"
  | "contact_click";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const sent = new Set<string>();

/**
 * Minimal gtag(): Google's tags only process the real `arguments` object
 * (not a plain array), so this intentionally pushes `arguments`.
 */
export const gtag = function () {
  window.dataLayer = window.dataLayer || [];
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
} as unknown as (...args: unknown[]) => void;

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? "";
export const GA_ID = GTM_ID ? "" : (process.env.NEXT_PUBLIC_GA_ID ?? "");

/**
 * Push an event. Pass `dedupeKey` for events that must only fire once
 * (e.g. one lead per submission, one booking per booking id).
 */
export function track(event: AnalyticsEvent, params: Params = {}, dedupeKey?: string): void {
  if (typeof window === "undefined") return;
  if (dedupeKey) {
    const key = `${event}:${dedupeKey}`;
    if (sent.has(key)) return;
    sent.add(key);
  }
  window.dataLayer = window.dataLayer || [];
  if (GA_ID && typeof window.gtag === "function") {
    window.gtag("event", event, params);
  } else {
    window.dataLayer.push({ event, ...params });
  }
  if (process.env.NODE_ENV !== "production") {
    console.info("[analytics]", event, params);
  }
}
