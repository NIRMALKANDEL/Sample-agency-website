"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { track } from "@/lib/analytics";

/** "Book a call" link that records which CTA was used. */
export function BookCallLink({
  location,
  className = "btn btn-primary",
  children = "Book a discovery call",
  onClick,
}: {
  location: string;
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/book"
      className={className}
      onClick={() => {
        track("book_call_click", { cta_location: location });
        onClick?.();
      }}
    >
      {children}
    </Link>
  );
}

/** mailto:, tel: and WhatsApp links with click tracking. */
export function ContactLink({
  method,
  href,
  className,
  children,
  location,
}: {
  method: "email" | "phone" | "whatsapp";
  href: string;
  className?: string;
  children: ReactNode;
  location: string;
}) {
  const external = method === "whatsapp";
  return (
    <a
      href={href}
      className={className}
      onClick={() => track("contact_click", { method, cta_location: location })}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}
