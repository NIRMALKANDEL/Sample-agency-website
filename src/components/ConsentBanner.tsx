"use client";

import Link from "next/link";
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { AnimatePresence, m } from "framer-motion";
import {
  CONSENT_EVENT,
  consentSnapshot,
  openConsentSettings,
  readConsent,
  saveConsent,
  subscribeConsent,
} from "@/lib/consent";

export function ConsentBanner() {
  const raw = useSyncExternalStore(subscribeConsent, consentSnapshot, () => "ssr");
  const [reopened, setReopened] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [customise, setCustomise] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const headingId = useId();

  useEffect(() => {
    const open = () => {
      const current = readConsent();
      setAnalytics(current?.analytics ?? false);
      setMarketing(current?.marketing ?? false);
      setCustomise(true);
      setDismissed(false);
      setReopened(true);
    };
    window.addEventListener(CONSENT_EVENT, open);
    return () => window.removeEventListener(CONSENT_EVENT, open);
  }, []);

  const needsChoice = raw === null || raw === "unavailable";
  const visible = !dismissed && (reopened || needsChoice);

  const decide = (choice: { analytics: boolean; marketing: boolean }) => {
    saveConsent(choice);
    setDismissed(true);
    setReopened(false);
    setCustomise(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <m.section
          role="dialog"
          aria-modal="false"
          aria-labelledby={headingId}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-50 max-h-[80vh] overflow-y-auto rounded-2xl border border-line-strong bg-surface p-5 text-ink shadow-[0_24px_70px_-20px_rgba(0,0,0,0.6)] sm:left-5 sm:right-auto sm:bottom-5 sm:w-[26rem]"
        >
          <h2 id={headingId} className="text-lg font-semibold tracking-tight">
            Cookies, your call
          </h2>
          <p className="mt-2 text-[0.95rem] text-muted">
            We use essential cookies to run this site. With your permission we’d also use analytics to see which pages help
            people, and marketing cookies to measure our ads. <Link href="/cookies" className="link">Cookie policy</Link>
          </p>

          {customise && (
            <fieldset className="mt-4 space-y-3">
              <legend className="sr-only">Cookie preferences</legend>
              <label className="flex items-start gap-3 rounded-xl border border-line p-3">
                <input type="checkbox" checked disabled className="mt-1 size-5 accent-[var(--muted)]" />
                <span>
                  <span className="block font-medium">Essential</span>
                  <span className="block text-sm text-muted">Theme, consent choice and security. Always on.</span>
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line p-3">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(e) => setAnalytics(e.target.checked)}
                  className="mt-1 size-5 accent-[var(--accent)]"
                />
                <span>
                  <span className="block font-medium">Analytics</span>
                  <span className="block text-sm text-muted">Google Analytics, to understand which pages are useful.</span>
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-line p-3">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(e) => setMarketing(e.target.checked)}
                  className="mt-1 size-5 accent-[var(--accent)]"
                />
                <span>
                  <span className="block font-medium">Marketing</span>
                  <span className="block text-sm text-muted">Ad measurement on Google and Meta.</span>
                </span>
              </label>
            </fieldset>
          )}

          <div className="mt-5 grid grid-cols-2 gap-2">
            <button type="button" className="btn btn-secondary min-h-11 px-3 text-[0.95rem]" onClick={() => decide({ analytics: false, marketing: false })}>
              Reject optional
            </button>
            <button type="button" className="btn btn-primary min-h-11 px-3 text-[0.95rem]" onClick={() => decide({ analytics: true, marketing: true })}>
              Accept all
            </button>
            {customise ? (
              <button type="button" className="btn btn-primary col-span-2 min-h-11 text-[0.95rem]" onClick={() => decide({ analytics, marketing })}>
                Save my choices
              </button>
            ) : (
              <button type="button" className="col-span-2 min-h-11 font-medium text-muted underline underline-offset-4 hover:text-ink" onClick={() => setCustomise(true)}>
                Choose which cookies
              </button>
            )}
          </div>
        </m.section>
      )}
    </AnimatePresence>
  );
}

export function CookieSettingsButton() {
  return (
    <button type="button" onClick={openConsentSettings} className="inline-flex min-h-11 items-center text-muted underline decoration-line-strong underline-offset-4 hover:text-ink">
      Cookie settings
    </button>
  );
}
