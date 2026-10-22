"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { site } from "@/lib/site";
import { BookCallLink, ContactLink } from "./Tracked";
import { Chat, Mail } from "./Icons";

/** One-tap contact on phones, shown after the first screen. */
export function MobileCtaBar() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);
  const hiddenHere = pathname === "/book" || pathname === "/contact";

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 560);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const secondary = site.whatsapp
    ? { method: "whatsapp" as const, href: `https://wa.me/${site.whatsapp}`, label: "WhatsApp us", Icon: Chat }
    : site.email
      ? { method: "email" as const, href: `mailto:${site.email}`, label: "Email us", Icon: Mail }
      : null;

  return (
    <AnimatePresence>
      {show && !hiddenHere && (
        <m.div
          initial={{ y: 96, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 96, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-30 lg:hidden"
        >
          <div className="mx-auto flex max-w-md gap-1.5 rounded-full border border-line-strong bg-paper/80 p-1.5 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.6)] backdrop-blur-xl">
            <BookCallLink location="mobile_bar" className="btn btn-primary min-h-11 flex-1 text-[0.95rem]">
              Book a call
            </BookCallLink>
            {secondary && (
              <ContactLink method={secondary.method} href={secondary.href} location="mobile_bar" className="btn btn-secondary min-h-11 px-4 text-[0.95rem]">
                <secondary.Icon size={18} />
                <span>{secondary.label}</span>
              </ContactLink>
            )}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
