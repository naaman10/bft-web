"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { isSubjectsFeatureEnabled } from "@/lib/feature-flags";
import { subjectNavLinks } from "@/lib/subjects";

interface HeaderProps {
  siteName?: string;
}

const serviceLinks = [
  { href: "/services/one-to-one", label: "1:1 Sessions" },
  { href: "/services/group", label: "Group Sessions" },
  { href: "/services/home-ed", label: "Home-ed Sessions" },
] as const;

export function Header({ siteName = "Brighter Futures Tutoring" }: HeaderProps) {
  const subjectsEnabled = isSubjectsFeatureEnabled();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileSubjectsOpen, setMobileSubjectsOpen] = useState(false);
  const mobileNavId = useId();
  const mobileServicesPanelId = useId();
  const mobileServicesLabelId = useId();
  const mobileSubjectsPanelId = useId();
  const mobileSubjectsLabelId = useId();

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileSubjectsOpen(false);
  };

  useEffect(() => {
    const getScrollY = () => {
      if (typeof window === "undefined") return 0;
      return Math.max(
        window.scrollY,
        window.pageYOffset,
        document.documentElement?.scrollTop ?? 0,
        document.body?.scrollTop ?? 0,
        document.scrollingElement?.scrollTop ?? 0
      );
    };

    const onScroll = () => {
      setScrolled(getScrollY() > 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("scroll", onScroll, { capture: true });
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMobileMenu();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  const headerLinkClass = (isScrolled: boolean) =>
    [
      "text-sm font-medium transition-colors duration-300",
      isScrolled
        ? "text-slate-600 hover:text-primary-600"
        : "text-white/90 hover:text-white",
    ].join(" ");

  const iconButtonClass = (isScrolled: boolean) =>
    [
      "inline-flex items-center justify-center rounded-lg p-2 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 md:hidden",
      isScrolled
        ? "text-slate-800 hover:bg-slate-100 focus:ring-primary-500 focus:ring-offset-white"
        : "text-white hover:bg-white/10 focus:ring-white/90 focus:ring-offset-transparent",
    ].join(" ");

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-slate-200 bg-white shadow-sm backdrop-blur-md"
          : "bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className={[
            "font-serif text-xl font-bold transition-colors duration-300",
            scrolled ? "text-slate-900" : "text-white",
          ].join(" ")}
          onClick={closeMobileMenu}
        >
          {siteName}
        </Link>

        {!mobileMenuOpen && (
          <button
            type="button"
            className={iconButtonClass(scrolled)}
            aria-expanded={false}
            aria-controls={mobileNavId}
            aria-label="Open menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
        )}

        <nav className="hidden gap-6 md:flex md:items-center" aria-label="Main">
          <div className="relative group">
            <button
              type="button"
              className={[
                "flex items-center gap-1 py-1 text-sm font-medium transition-colors duration-300",
                scrolled
                  ? "text-slate-600 hover:text-primary-600"
                  : "text-white/90 hover:text-white",
              ].join(" ")}
            >
              Services
              <span className="text-xs">▾</span>
            </button>
            <div className="absolute left-0 top-full w-56 pt-2" aria-hidden />
            <div className="pointer-events-none absolute left-0 top-full w-56 pt-2 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
              <div className="rounded-xl bg-white/95 py-2 shadow-lg">
                {serviceLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm text-slate-700 first:rounded-t-lg last:rounded-b-lg hover:bg-slate-50"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          {subjectsEnabled ? (
            <div className="relative group">
              <button
                type="button"
                className={[
                  "flex items-center gap-1 py-1 text-sm font-medium transition-colors duration-300",
                  scrolled
                    ? "text-slate-600 hover:text-primary-600"
                    : "text-white/90 hover:text-white",
                ].join(" ")}
              >
                Subjects
                <span className="text-xs">▾</span>
              </button>
              <div className="absolute left-0 top-full w-56 pt-2" aria-hidden />
              <div className="pointer-events-none absolute left-0 top-full w-56 pt-2 opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                <div className="rounded-xl border border-slate-200 bg-white/95 py-2 shadow-lg">
                  {subjectNavLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-slate-700 first:rounded-t-lg last:rounded-b-lg hover:bg-slate-50"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
          <Link href="/about" className={headerLinkClass(scrolled)}>
            About
          </Link>
          <Link href="/faq" className={headerLinkClass(scrolled)}>
            FAQs
          </Link>
          <Link
            href="/contact"
            className={[
              "rounded-xl bg-primary-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-white/90 focus:ring-offset-2",
              scrolled ? "focus:ring-offset-white" : "focus:ring-offset-transparent",
            ].join(" ")}
          >
            Get Started
          </Link>
        </nav>
      </div>

      {/* Mobile: full-screen menu */}
      <div
        id={mobileNavId}
        role="dialog"
        aria-modal="true"
        aria-label="Main menu"
        className={[
          "fixed inset-0 z-[100] bg-white md:hidden",
          // When closed, `hidden` removes the overlay from hit-testing so the hamburger works.
          mobileMenuOpen ? "flex flex-col" : "hidden",
        ].join(" ")}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="flex shrink-0 items-center justify-between px-4 py-4 sm:px-6">
          <Link
            href="/"
            className="font-serif text-xl font-bold text-slate-900"
            onClick={closeMobileMenu}
          >
            {siteName}
          </Link>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg p-2 text-slate-800 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white"
            aria-label="Close menu"
            onClick={closeMobileMenu}
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <nav
          className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6 py-10"
          aria-label="Main"
        >
          <div className="pb-2">
            <button
              type="button"
              id={mobileServicesLabelId}
              className="flex w-full items-center justify-between gap-3 rounded-xl px-4 py-4 text-left text-lg font-medium text-slate-800 transition-colors hover:bg-slate-50 active:bg-slate-100"
              aria-expanded={mobileServicesOpen}
              aria-controls={mobileServicesPanelId}
              onClick={() => setMobileServicesOpen((o) => !o)}
            >
              <span>Services</span>
              <svg
                className={[
                  "h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200",
                  mobileServicesOpen ? "rotate-180" : "",
                ].join(" ")}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div
              id={mobileServicesPanelId}
              role="region"
              aria-labelledby={mobileServicesLabelId}
              hidden={!mobileServicesOpen}
              className="mt-2 pl-1"
            >
              <ul className="flex flex-col gap-1">
                {serviceLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-xl py-3 pl-4 pr-4 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50 active:bg-slate-100"
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {subjectsEnabled ? (
            <div className="pb-2">
              <button
                type="button"
                id={mobileSubjectsLabelId}
                className="flex w-full items-center justify-between gap-3 rounded-xl px-4 py-4 text-left text-lg font-medium text-slate-800 transition-colors hover:bg-slate-50 active:bg-slate-100"
                aria-expanded={mobileSubjectsOpen}
                aria-controls={mobileSubjectsPanelId}
                onClick={() => setMobileSubjectsOpen((o) => !o)}
              >
                <span>Subjects</span>
                <svg
                  className={[
                    "h-5 w-5 shrink-0 text-slate-500 transition-transform duration-200",
                    mobileSubjectsOpen ? "rotate-180" : "",
                  ].join(" ")}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <div
                id={mobileSubjectsPanelId}
                role="region"
                aria-labelledby={mobileSubjectsLabelId}
                hidden={!mobileSubjectsOpen}
                className="mt-2 pl-1"
              >
                <ul className="flex flex-col gap-1">
                  {subjectNavLinks.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="block rounded-xl py-3 pl-4 pr-4 text-base font-medium text-slate-700 transition-colors hover:bg-slate-50 active:bg-slate-100"
                        onClick={closeMobileMenu}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}

          <Link
            href="/about"
            className="block rounded-xl px-4 py-4 text-lg font-medium text-slate-800 transition-colors hover:bg-slate-50 active:bg-slate-100"
            onClick={closeMobileMenu}
          >
            About
          </Link>

          <Link
            href="/faq"
            className="block rounded-xl px-4 py-4 text-lg font-medium text-slate-800 transition-colors hover:bg-slate-50 active:bg-slate-100"
            onClick={closeMobileMenu}
          >
            FAQs
          </Link>

          <div className="mt-6 flex-1" />

          <Link
            href="/contact"
            className="mb-4 block rounded-xl bg-primary-500 px-4 py-4 text-center text-lg font-semibold text-white shadow-sm transition-colors hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white"
            onClick={closeMobileMenu}
          >
            Get Started
          </Link>
        </nav>
      </div>
    </header>
  );
}
