import { Fragment } from "react";
import { cssVars } from "@/lib/css";

/**
 * Splits a heading into words that rise into place one after another on load (pure CSS).
 * The words stay real text, so search engines and screen readers read the heading normally.
 */
export function SplitWords({ text, offset = 0 }: { text: string; offset?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
          <Fragment key={`${w}-${i}`}>
            <span className="split-word">
              <span style={cssVars({ "--i": i + offset })}>{w}</span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
    </>
  );
}
