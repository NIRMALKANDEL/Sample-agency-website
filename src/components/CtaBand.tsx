import { EnquiryForm } from "./forms/EnquiryForm";
import { BookCallLink } from "./Tracked";

/** Closing conversion block: a quiet raised panel with a short form. Chartreuse appears only on the buttons. */
export function CtaBand({
  title = "Tell us what you’re launching.",
  body = "Three fields, one minute. We’ll reply with honest thoughts on where to start, even if that isn’t us.",
  source = "cta_band",
}: {
  title?: string;
  body?: string;
  source?: string;
}) {
  return (
    <section aria-labelledby={`${source}-title`} className="container-x mt-24 lg:mt-32">
      <div className="noise relative isolate grid gap-10 overflow-hidden rounded-[1.75rem] border border-line-strong bg-surface p-6 sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-14">
        <div aria-hidden="true" className="glow-lavender pointer-events-none absolute inset-0 -z-10 opacity-80" />
        <div className="lg:col-span-5">
          <h2 id={`${source}-title`} className="display h2 text-balance">
            {title}
          </h2>
          <p className="mt-5 max-w-md text-muted">{body}</p>
          <p className="mt-8 font-medium">Prefer to talk first?</p>
          <BookCallLink location={`${source}_book`} className="btn btn-secondary mt-3" />
        </div>
        <div className="rounded-2xl border border-line bg-surface-2/60 p-5 sm:p-7 lg:col-span-7">
          <EnquiryForm variant="compact" source={source} />
        </div>
      </div>
    </section>
  );
}
