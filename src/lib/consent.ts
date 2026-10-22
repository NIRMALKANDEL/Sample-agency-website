/**
 * Consent storage and Google Consent Mode v2 updates.
 * Defaults (all denied) are set by an inline script in <head> before GTM loads;
 * see src/components/Analytics.tsx.
 */

import { gtag } from "./analytics";

export const CONSENT_KEY = "sw-consent-v1";
export const CONSENT_EVENT = "sw:open-consent";
export const CONSENT_CHANGE_EVENT = "sw:consent-change";

/** useSyncExternalStore helpers: the raw stored value, or null when unset. */
export function subscribeConsent(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  window.addEventListener(CONSENT_CHANGE_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(CONSENT_CHANGE_EVENT, callback);
  };
}

export function consentSnapshot(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return "unavailable";
  }
}

export type ConsentChoice = {
  analytics: boolean;
  marketing: boolean;
  /** ISO timestamp of when the choice was made. */
  at: string;
};

export function readConsent(): ConsentChoice | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<ConsentChoice>;
    if (typeof parsed.analytics !== "boolean" || typeof parsed.marketing !== "boolean") return null;
    return { analytics: parsed.analytics, marketing: parsed.marketing, at: String(parsed.at ?? "") };
  } catch {
    return null;
  }
}

export function saveConsent(choice: Omit<ConsentChoice, "at">): ConsentChoice {
  const full: ConsentChoice = { ...choice, at: new Date().toISOString() };
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(full));
  } catch {
    /* storage unavailable: choice applies to this page view only */
  }
  applyConsent(full);
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
  return full;
}

export function applyConsent(choice: Pick<ConsentChoice, "analytics" | "marketing">): void {
  window.dataLayer = window.dataLayer || [];
  const ads = choice.marketing ? "granted" : "denied";
  gtag("consent", "update", {
    analytics_storage: choice.analytics ? "granted" : "denied",
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
  });
  window.dataLayer.push({ event: "consent_update", consent_analytics: choice.analytics, consent_marketing: choice.marketing });
}

export function openConsentSettings(): void {
  window.dispatchEvent(new Event(CONSENT_EVENT));
}
