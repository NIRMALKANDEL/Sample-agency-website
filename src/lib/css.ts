import type { CSSProperties } from "react";

/** Inline style with CSS custom properties (e.g. animation delays), typed for React. */
export function cssVars(vars: Record<`--${string}`, string | number>, style?: CSSProperties): CSSProperties {
  return { ...style, ...vars } as CSSProperties;
}
