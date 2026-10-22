"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, m } from "framer-motion";
import { enquirySchema, serviceOptions, toFieldErrors, type FieldErrors } from "@/lib/enquiry-schema";
import { track } from "@/lib/analytics";
import { calLink, site } from "@/lib/site";
import { CalEmbed } from "../booking/CalEmbed";
import { Check } from "../Icons";
import { Turnstile, TURNSTILE_SITE_KEY } from "./Turnstile";

type Variant = "full" | "compact";
type Status = "idle" | "submitting" | "success" | "error";

type Values = {
  name: string;
  email: string;
  company: string;
  website: string;
  services: string[];
  budget: string;
  message: string;
  consent: boolean;
  hp: string;
};

const empty: Values = {
  name: "",
  email: "",
  company: "",
  website: "",
  services: [],
  budget: "",
  message: "",
  consent: false,
  hp: "",
};

const fieldOrder: (keyof Values)[] = ["name", "email", "company", "website", "services", "budget", "message", "consent"];

export function EnquiryForm({ variant = "full", source = "contact" }: { variant?: Variant; source?: string }) {
  const id = useId();
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const [reference, setReference] = useState("");
  const [token, setToken] = useState("");
  const [resetSignal, setResetSignal] = useState(0);
  const startedAt = useRef<number>(0);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const compact = variant === "compact";

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  const set = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors[key as keyof FieldErrors]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const toggleService = (service: string) => {
    set(
      "services",
      values.services.includes(service) ? values.services.filter((s) => s !== service) : [...values.services, service],
    );
  };

  const focusFirstError = (errs: FieldErrors) => {
    const first = fieldOrder.find((k) => errs[k as keyof FieldErrors]);
    if (!first) return;
    const el = formRef.current?.querySelector<HTMLElement>(`[data-field="${first}"]`);
    el?.focus();
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const payload = {
      ...values,
      source,
      startedAt: startedAt.current || undefined,
      turnstileToken: token || undefined,
    };

    const parsed = enquirySchema.safeParse(payload);
    if (!parsed.success) {
      const errs = toFieldErrors(parsed.error);
      setErrors(errs);
      setStatus("idle");
      focusFirstError(errs);
      return;
    }
    if (TURNSTILE_SITE_KEY && !token) {
      setStatus("error");
      setServerMessage("Complete the spam check above the button, then send again.");
      return;
    }

    setStatus("submitting");
    setServerMessage("");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        id?: string;
        message?: string;
        fieldErrors?: FieldErrors;
      };

      if (res.ok && data.ok) {
        const ref = data.id ?? "";
        setReference(ref);
        setStatus("success");
        track(
          "generate_lead",
          { form_variant: variant, form_source: source, services: values.services.join(", ") || undefined, budget: values.budget || undefined },
          ref || `${Date.now()}`,
        );
        return;
      }

      if (data.fieldErrors) {
        setErrors(data.fieldErrors);
        focusFirstError(data.fieldErrors);
      }
      setStatus("error");
      setServerMessage(data.message ?? "Something went wrong on our side. Try again in a minute.");
      setResetSignal((n) => n + 1);
      setToken("");
    } catch {
      setStatus("error");
      setServerMessage(
        `We couldn’t reach our server. Check your connection and try again${site.email ? `, or email ${site.email}` : ""}.`,
      );
    }
  }

  if (status === "success") {
    return (
      <m.div
        ref={successRef}
        tabIndex={-1}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="outline-none"
        role="status"
      >
        <div className="flex items-start gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent text-night">
            <Check size={24} />
          </span>
          <div>
            <h3 className="display text-[1.9rem] leading-none tracking-[-0.045em]">Brief sent. Thank you, {values.name.split(" ")[0]}.</h3>
            <p className="mt-3">
              {site.responseTime}
              {reference && reference !== "ignored" ? ` Your reference is ${reference}.` : ""}
            </p>
          </div>
        </div>
        {calLink && !compact && (
          <div className="mt-10">
            <h3 className="text-xl font-semibold tracking-[-0.02em]">Skip the back-and-forth: pick a time now</h3>
            <p className="mt-1 text-muted">Your details are already filled in. Booking is optional.</p>
            <div className="mt-5">
              <CalEmbed
                location="post_enquiry"
                prefill={{ name: values.name, email: values.email, notes: values.message.slice(0, 500) }}
              />
            </div>
          </div>
        )}
        {(compact || !calLink) && (
          <div className="mt-6 flex flex-wrap gap-3">
            {calLink && (
              <Link href="/book" className="btn btn-primary" onClick={() => track("book_call_click", { cta_location: "post_enquiry" })}>
                Pick a call time now
              </Link>
            )}
            <Link href="/work" className="btn btn-secondary">
              Browse our work
            </Link>
          </div>
        )}
      </m.div>
    );
  }

  const describedBy = (field: keyof FieldErrors) => (errors[field] ? `${id}-${field}-error` : undefined);
  const errorText = (field: keyof FieldErrors) =>
    errors[field] ? (
      <p id={`${id}-${field}-error`} className="field-error">
        {errors[field]}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={`${id}-note`} className="space-y-5">
      <div className={`grid gap-5 ${compact ? "" : "sm:grid-cols-2"}`}>
        <div>
          <label htmlFor={`${id}-name`} className="field-label">
            Your name
          </label>
          <input
            id={`${id}-name`}
            data-field="name"
            className="field"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            required
          />
          {errorText("name")}
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="field-label">
            Work email
          </label>
          <input
            id={`${id}-email`}
            data-field="email"
            className="field"
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            required
          />
          {errorText("email")}
        </div>

        {!compact && (
          <>
            <div>
              <label htmlFor={`${id}-company`} className="field-label">
                Brand or company <span className="font-normal text-muted">(optional)</span>
              </label>
              <input
                id={`${id}-company`}
                data-field="company"
                className="field"
                name="company"
                autoComplete="organization"
                value={values.company}
                onChange={(e) => set("company", e.target.value)}
                aria-invalid={Boolean(errors.company)}
                aria-describedby={describedBy("company")}
              />
              {errorText("company")}
            </div>
            <div>
              <label htmlFor={`${id}-website`} className="field-label">
                Website or Instagram <span className="font-normal text-muted">(optional)</span>
              </label>
              <input
                id={`${id}-website`}
                data-field="website"
                className="field"
                name="website"
                inputMode="url"
                placeholder="@yourbrand or yourbrand.com"
                value={values.website}
                onChange={(e) => set("website", e.target.value)}
                aria-invalid={Boolean(errors.website)}
                aria-describedby={describedBy("website")}
              />
              {errorText("website")}
            </div>
          </>
        )}
      </div>

      {!compact && (
        <fieldset>
          <legend className="field-label">
            What do you need help with? <span className="font-normal text-muted">(pick any)</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {serviceOptions.map((s, i) => {
              const checked = values.services.includes(s);
              return (
                <label
                  key={s}
                  className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-[0.95rem] font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[color:var(--focus)] ${
                    checked ? "border-accent bg-accent text-night" : "border-line-strong text-muted hover:border-ink hover:text-ink"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="sr-only"
                    data-field={i === 0 ? "services" : undefined}
                    checked={checked}
                    onChange={() => toggleService(s)}
                  />
                  {checked && <Check size={16} />}
                  {s}
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      {!compact && (
        <div>
          <label htmlFor={`${id}-budget`} className="field-label">
            Monthly budget <span className="font-normal text-muted">(optional)</span>
          </label>
          <select
            id={`${id}-budget`}
            data-field="budget"
            className="field select-chevron"
            name="budget"
            value={values.budget}
            onChange={(e) => set("budget", e.target.value)}
          >
            <option value="">Choose a range</option>
            {site.budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor={`${id}-message`} className="field-label">
          {compact ? "What are you working on?" : "Tell us about your goals"}
        </label>
        <textarea
          id={`${id}-message`}
          data-field="message"
          className="field min-h-36 resize-y"
          name="message"
          rows={compact ? 4 : 5}
          placeholder="What you’re launching or growing, where you are now, and what success looks like."
          value={values.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message")}
          required
        />
        {errorText("message")}
      </div>

      {/* Honeypot: hidden from people, tempting for bots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${id}-hp`}>Leave this field empty</label>
        <input id={`${id}-hp`} tabIndex={-1} autoComplete="off" name="company_url" value={values.hp} onChange={(e) => set("hp", e.target.value)} />
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            data-field="consent"
            className="mt-0.5 size-5 shrink-0 accent-[var(--accent)]"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={describedBy("consent")}
          />
          <span className="text-[0.95rem]">
            I agree that {site.name} can use these details to reply to my enquiry, as described in the{" "}
            <Link href="/privacy" className="link">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {errorText("consent")}
      </div>

      <Turnstile onToken={setToken} resetSignal={resetSignal} />

      <AnimatePresence>
        {status === "error" && serverMessage && (
          <m.p
            role="alert"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-tomato bg-tomato/10 px-4 py-3 font-medium"
          >
            {serverMessage}
          </m.p>
        )}
      </AnimatePresence>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button type="submit" className="btn btn-primary min-w-44" disabled={status === "submitting"} aria-disabled={status === "submitting"}>
          {status === "submitting" ? (
            <>
              <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" aria-hidden="true" />
              Sending brief…
            </>
          ) : (
            "Send brief"
          )}
        </button>
        <p id={`${id}-note`} className="text-sm text-muted">
          {site.responseTime}
        </p>
      </div>
      <p className="sr-only" aria-live="polite">
        {status === "submitting" ? "Sending your brief" : ""}
      </p>
    </form>
  );
}
