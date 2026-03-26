import { LOCAL_AREA } from "@/lib/site-location";

interface FooterProps {
  siteName?: string;
}

export function Footer({ siteName = "Brighter Futures Tutoring" }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500 dark:text-slate-400">
        <p className="mb-2 font-medium text-slate-600 dark:text-slate-300">
          Tutoring in {LOCAL_AREA} and the surrounding area
        </p>
        <p className="mb-3">
          <a
            href="#"
            className="termly-display-preferences font-medium text-slate-600 underline underline-offset-2 transition hover:text-primary-600 dark:text-slate-300 dark:hover:text-primary-400"
          >
            Consent Preferences
          </a>
        </p>
        <p>© {year} {siteName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
