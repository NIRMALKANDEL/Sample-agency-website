import { z } from "zod";

export const serviceOptions = [
  "Growth strategy",
  "Instagram & Reels",
  "Social media management",
  "Content production",
  "Paid social",
  "Creator partnerships",
  "Brand identity",
  "Website",
] as const;

/** Shared by the browser form and the API route, so both validate identically. */
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100, "Name is too long."),
  email: z.string().trim().email("Enter a valid email address, like name@company.com.").max(200),
  company: z.string().trim().max(150, "Keep this under 150 characters.").optional().default(""),
  website: z.string().trim().max(200, "Keep this under 200 characters.").optional().default(""),
  services: z.array(z.enum(serviceOptions)).max(serviceOptions.length).optional().default([]),
  budget: z.string().trim().max(60).optional().default(""),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more: at least 20 characters.")
    .max(4000, "Keep your message under 4,000 characters."),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Tick the box so we can reply to you." }),
  }),
  source: z.string().max(60).optional().default("contact"),
  // Spam checks (not shown to people).
  hp: z.string().max(500).optional().default(""),
  startedAt: z.number().optional(),
  turnstileToken: z.string().optional(),
});

export type EnquiryInput = z.input<typeof enquirySchema>;
export type Enquiry = z.output<typeof enquirySchema>;
export type FieldErrors = Partial<Record<keyof EnquiryInput, string>>;

export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as keyof EnquiryInput | undefined;
    if (key && !out[key]) out[key] = issue.message;
  }
  return out;
}
