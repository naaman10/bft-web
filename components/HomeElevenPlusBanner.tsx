"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ELEVEN_PLUS_EXAM_UPDATE } from "@/lib/eleven-plus";
import { isSubjectsFeatureEnabled } from "@/lib/feature-flags";

export function HomeElevenPlusBanner() {
  const pathname = usePathname();
  if (pathname !== "/") return null;

  const subjectsEnabled = isSubjectsFeatureEnabled();
  const href = subjectsEnabled
    ? ELEVEN_PLUS_EXAM_UPDATE.subjectHref
    : "/contact";

  return (
    <div
      className="relative z-[55] border-b border-secondary-500/25 bg-secondary-400 px-4 py-2.5 text-center text-sm text-slate-900 sm:py-3 sm:text-base"
      role="region"
      aria-label="11+ exam update"
    >
      <p className="mx-auto max-w-4xl font-semibold leading-snug">
        <span className="mr-1.5 inline-block align-middle" aria-hidden>
          ✦
        </span>
        {ELEVEN_PLUS_EXAM_UPDATE.homeBannerMessage}
        <span className="mx-2 hidden text-slate-700/60 sm:inline" aria-hidden>
          ·
        </span>
        <Link
          href={href}
          className="mt-1 inline-block font-bold underline decoration-slate-900/30 underline-offset-2 transition hover:text-primary-800 hover:decoration-primary-600 sm:mt-0 sm:ml-0"
        >
          {ELEVEN_PLUS_EXAM_UPDATE.homeBannerCta}
        </Link>
      </p>
    </div>
  );
}
