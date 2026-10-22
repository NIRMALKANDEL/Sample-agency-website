"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "./Icons";

const order = ["light", "dark", "system"] as const;
const labels = { light: "Light theme", dark: "Dark theme", system: "System theme" };

const subscribe = () => () => {};

/** Cycles light → dark → system. Remembered by next-themes in localStorage. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  const current = (mounted ? theme : "system") as (typeof order)[number];
  const next = order[(order.indexOf(current) + 1) % order.length];
  const Icon = current === "light" ? Sun : current === "dark" ? Moon : Monitor;

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className={`inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-ink transition-colors hover:bg-surface-2 ${className}`}
      aria-label={`${labels[current]}. Switch to ${labels[next].toLowerCase()}`}
      title={`${labels[current]} (switch to ${labels[next].toLowerCase()})`}
    >
      <Icon size={18} />
    </button>
  );
}
