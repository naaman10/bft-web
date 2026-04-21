"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * 1) Scroll document to top on route change.
 * 2) Force html/body top margin/padding to 0 with !important so third-party scripts
 *    (e.g. consent banners) cannot leave a strip that shows through a transparent
 *    fixed header. Re-applies on a short schedule after navigation to catch late injection.
 *
 * If your CMP requires body padding for a top banner, prefer a fixed overlay in the
 * product settings rather than body padding.
 */
function applyTopZero() {
  if (typeof document === "undefined") return;
  const zero = (el: HTMLElement) => {
    el.style.setProperty("margin-top", "0", "important");
    el.style.setProperty("padding-top", "0", "important");
  };
  zero(document.documentElement);
  zero(document.body);
}

function scrollDocumentToTop() {
  if (typeof window === "undefined") return;
  if (window.location.hash) return;
  const sc = document.scrollingElement;
  if (sc) sc.scrollTop = 0;
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  window.scrollTo(0, 0);
}

export function LayoutRootFix() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    scrollDocumentToTop();
    applyTopZero();
  }, [pathname]);

  useEffect(() => {
    applyTopZero();
    scrollDocumentToTop();

    const t1 = window.setTimeout(() => {
      applyTopZero();
      scrollDocumentToTop();
    }, 300);
    const t2 = window.setTimeout(() => {
      applyTopZero();
    }, 1200);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [pathname]);

  return null;
}
