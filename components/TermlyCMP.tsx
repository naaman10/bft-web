"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    Termly?: {
      initialize: () => void;
    };
  }
}

/**
 * Re-runs Termly after client-side navigations. The resource-blocker script itself
 * must be loaded once in `layout.tsx` via `next/script` (beforeInteractive) —
 * do not inject a second copy here (causes "already been loaded" + layout issues).
 *
 * `initialize()` is debounced so React Strict Mode’s double mount in dev doesn’t
 * call it twice back-to-back (which re-triggers Termly’s “not the first script” log).
 */
export function TermlyCMP() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const debounceRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      try {
        window.Termly?.initialize();
      } catch {
        /* script may not have loaded yet */
      }
    }, 100);

    return () => {
      window.clearTimeout(debounceRef.current);
    };
  }, [pathname, search]);

  return null;
}
