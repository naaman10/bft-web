interface FooterProps {
  siteName?: string;
}

export function Footer({ siteName = "Brighter Futures Tutoring" }: FooterProps) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500 dark:text-slate-400">
        © {year} {siteName}. All rights reserved.
      </div>
    </footer>
  );
}
