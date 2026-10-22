"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
import { useTheme } from "next-themes";
import { track } from "@/lib/analytics";
import { calLink, calOrigin } from "@/lib/site";

const NAMESPACE = "discovery";
const embedJsUrl = `${calOrigin}/embed/embed.js`;

export type CalPrefill = { name?: string; email?: string; notes?: string };

type BookingEventDetail = {
  data?: {
    uid?: string;
    booking?: { uid?: string };
    eventType?: { title?: string; slug?: string };
  };
};

/** Cal.com inline scheduler. Handles timezones, confirmations and reminders. */
export default function CalInline({ prefill, location }: { prefill?: CalPrefill; location: string }) {
  const { resolvedTheme } = useTheme();
  const theme = resolvedTheme === "dark" ? "dark" : "light";

  useEffect(() => {
    let active = true;
    (async () => {
      const cal = await getCalApi({ namespace: NAMESPACE, embedJsUrl });
      if (!active) return;
      cal("on", {
        action: "bookingSuccessful",
        callback: (e) => {
          const detail = (e as unknown as { detail?: BookingEventDetail }).detail;
          const uid = detail?.data?.booking?.uid ?? detail?.data?.uid ?? `${Date.now()}`;
          track("booking_completed", { method: "cal.com", cta_location: location }, uid);
        },
      });
    })();
    return () => {
      active = false;
    };
  }, [location]);

  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: NAMESPACE, embedJsUrl });
      cal("ui", {
        theme,
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: {
          light: { "cal-brand": "#FF4F2B" },
          dark: { "cal-brand": "#FF4F2B" },
        },
      });
    })();
  }, [theme]);

  const config: Record<string, string> = { layout: "month_view", theme };
  if (prefill?.name) config.name = prefill.name;
  if (prefill?.email) config.email = prefill.email;
  if (prefill?.notes) config.notes = prefill.notes;

  return (
    <Cal
      namespace={NAMESPACE}
      calLink={calLink}
      calOrigin={calOrigin}
      embedJsUrl={embedJsUrl}
      style={{ width: "100%", height: "100%", minHeight: 620, overflow: "auto" }}
      config={config}
    />
  );
}
