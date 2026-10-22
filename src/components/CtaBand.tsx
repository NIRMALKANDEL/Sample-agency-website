import { EnquiryForm } from "./forms/EnquiryForm";
import { BookCallLink } from "./Tracked";
import { SpinBadge } from "./ui/SpinBadge";

/** Closing conversion block: a loud tomato panel with a spinning booking badge and the short form on an ultraviolet card. */
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
    <section aria-labelledby={`${source}-title`} className="container-x mt-28 lg:mt-40">
      <div
        data-reveal="scale"
        className="on-bright noise relative isolate grid gap-10 overflow-hidden rounded-[2.25rem] border-[1.5px] border-night bg-accent p-6 shadow-[12px_14px_0_0_#12072e] sm:p-10 lg:grid-cols-12 lg:gap-14 lg:p-14"
      >
        <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-40 -z-10 size-[28rem] rounded-full bg-[radial-gradient(circle,#d8ff3c,transparent_65%)] opacity-60 blur-2xl"
        />
        <div className="flex flex-col lg:col-span-5">
          <h2 id={`${source}-title`} className="display h2 text-balance">
            {title}
          </h2>
          <p className="mt-5 max-w-md text-[1.05rem] font-medium">{body}</p>
          <div className="mt-8 flex flex-wrap items-center gap-6 lg:mt-auto lg:pt-10">
            <SpinBadge location={`${source}_badge`} id={`${source}-badge`} text="Rather talk? • Book a call • " />
            <BookCallLink location={`${source}_book`} className="btn btn-night">
              Book a discovery call
            </BookCallLink>
          </div>
        </div>
        <div className="theme-uv rounded-[1.75rem] border-[1.5px] border-night p-5 sm:p-8 lg:col-span-7">
          <EnquiryForm variant="compact" source={source} />
        </div>
      </div>
    </section>
  );
}
