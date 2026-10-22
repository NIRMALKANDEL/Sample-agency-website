import { ogSize, renderOg } from "@/lib/og";

export const alt = "Sendworthy: make things people send";
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderOg("Make things people send.", "Sendworthy: growth & creative studio");
}
