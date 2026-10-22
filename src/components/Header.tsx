"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "framer-motion";
import { nav, site } from "@/lib/site";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { BookCallLink, ContactLink } from "./Tracked";
import { Close, Menu } from "./Icons";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the menu after navigation.
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    const frame = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Lock scroll, close on Escape and keep focus inside the open menu.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const firstLink = panel.current?.querySelector<HTMLElement>("a, button");
    firstLink?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
      if (e.key === "Tab" && panel.current) {
        const items = panel.current.querySelectorAll<HTMLElement>("a, button");
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      {/* Floating pill. The mobile menu below is a sibling, NOT a child: backdrop-filter on the pill would otherwise
          become the containing block for the fixed-position panel. */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4">
        <a
          href="#main"
          className="pointer-events-auto sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-night"
        >
          Skip to content
        </a>
        <div
          className={`pointer-events-auto mx-auto flex h-14 max-w-5xl items-center justify-between gap-2 rounded-full border pl-4 pr-1.5 backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 ${
            scrolled || open
              ? "border-line-strong bg-paper/80 shadow-[0_10px_40px_-18px_rgba(0,0,0,0.6)]"
              : "border-line bg-paper/45"
          }`}
        >
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`inline-flex min-h-10 items-center rounded-full px-3.5 text-sm font-medium no-underline transition-colors hover:text-ink ${
                      isActive(item.href) ? "bg-surface-2 text-ink" : "text-muted hover:bg-surface-2/60"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5">
            <ThemeToggle className="hidden sm:inline-flex" />
            <BookCallLink location="header" className="btn btn-primary hidden min-h-11 px-5 text-sm sm:inline-flex">
              Book a call
            </BookCallLink>
            <button
              ref={menuButton}
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-ink lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <Close /> : <Menu />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            ref={panel}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 overflow-y-auto bg-paper lg:hidden"
          >
            <nav aria-label="Mobile" className="container-x flex min-h-full flex-col justify-between gap-10 pb-8 pt-28">
              <ul className="flex flex-col">
                {nav.map((item, i) => (
                  <m.li
                    key={item.href}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.03 * i, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className="display flex min-h-16 items-center border-b border-line text-[2.25rem] no-underline aria-[current=page]:text-muted"
                    >
                      {item.label}
                    </Link>
                  </m.li>
                ))}
              </ul>
              <div className="flex flex-col gap-4">
                <BookCallLink location="mobile_menu" className="btn btn-primary w-full text-base">
                  Book a discovery call
                </BookCallLink>
                <div className="flex items-center justify-between gap-3">
                  {site.email ? (
                    <ContactLink method="email" href={`mailto:${site.email}`} location="mobile_menu" className="link inline-flex min-h-11 items-center font-medium">
                      {site.email}
                    </ContactLink>
                  ) : (
                    <span />
                  )}
                  <ThemeToggle />
                </div>
              </div>
            </nav>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
