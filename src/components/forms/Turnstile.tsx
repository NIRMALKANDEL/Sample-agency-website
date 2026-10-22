"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef } from "react";
import { useTheme } from "next-themes";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  remove: (id: string) => void;
  reset: (id: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

/** Cloudflare Turnstile widget. Renders nothing unless a site key is configured. */
export function Turnstile({ onToken, resetSignal = 0 }: { onToken: (token: string) => void; resetSignal?: number }) {
  const box = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const { resolvedTheme } = useTheme();
  const tokenRef = useRef(onToken);

  useEffect(() => {
    tokenRef.current = onToken;
  }, [onToken]);

  const mount = useCallback(() => {
    if (!TURNSTILE_SITE_KEY || !box.current || !window.turnstile || widgetId.current) return;
    widgetId.current = window.turnstile.render(box.current, {
      sitekey: TURNSTILE_SITE_KEY,
      theme: resolvedTheme === "dark" ? "dark" : "light",
      callback: (token: string) => tokenRef.current(token),
      "expired-callback": () => tokenRef.current(""),
      "error-callback": () => tokenRef.current(""),
    });
  }, [resolvedTheme]);

  useEffect(() => {
    mount();
    return () => {
      if (widgetId.current && window.turnstile) window.turnstile.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [mount]);

  useEffect(() => {
    if (resetSignal && widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
  }, [resetSignal]);

  if (!TURNSTILE_SITE_KEY) return null;

  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" onLoad={mount} />
      <div ref={box} className="min-h-[65px]" />
    </>
  );
}
