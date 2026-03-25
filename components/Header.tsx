"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface HeaderProps {
  siteName?: string;
}

export function Header({ siteName = "Brighter Futures Tutoring" }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "border-b border-slate-200 bg-white shadow-sm backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      ].join(" ")}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className={[
            "font-serif text-xl font-bold transition-colors duration-300",
            scrolled ? "text-slate-900" : "text-white",
          ].join(" ")}
        >
          {siteName}
        </Link>
        <nav className="flex gap-6 items-center">
          <div className="relative group">
            <button
              type="button"
              className={[
                "text-sm font-medium transition-colors duration-300 flex items-center gap-1 py-1",
                scrolled
                  ? "text-slate-600 hover:text-primary-600"
                  : "text-white/90 hover:text-white",
              ].join(" ")}
            >
              Services
              <span className="text-xs">▾</span>
            </button>
            {/* Invisible bridge so cursor can reach the panel without leaving hover */}
            <div className="absolute left-0 top-full w-56 pt-2" aria-hidden />
            <div className="absolute left-0 top-full w-56 pt-2 opacity-0 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto">
              <div className="rounded-xl border border-slate-200 bg-white/95 shadow-lg py-2">
                <Link
                  href="/services/one-to-one"
                  className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-t-lg"
                >
                  1:1 Sessions
                </Link>
                <Link
                  href="/services/group"
                  className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Group Sessions
                </Link>
                <Link
                  href="/services/home-ed"
                  className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 rounded-b-lg"
                >
                  Home-ed Sessions
                </Link>
              </div>
            </div>
          </div>
          <Link
            href="/about"
            className={[
              "text-sm font-medium transition-colors duration-300",
              scrolled
                ? "text-slate-600 hover:text-primary-600"
                : "text-white/90 hover:text-white",
            ].join(" ")}
          >
            About
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
    </header>
  );
}
