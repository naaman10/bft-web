import Link from "next/link";
import { Breadcrumbs, type BreadcrumbItem } from "@/components/Breadcrumbs";

export type TopicSection = {
  title: string;
  intro: string;
  points: readonly string[];
};

export type TopicLink = {
  href: string;
  label: string;
};

type TopicLandingProps = {
  breadcrumbs: readonly BreadcrumbItem[];
  eyebrow: string;
  title: string;
  intro: string;
  ctaHref: string;
  ctaLabel: string;
  callout?: {
    eyebrow: string;
    title: string;
    description: string;
  };
  aside?: string;
  sections: readonly TopicSection[];
  sectionsIntro: string;
  linkGroups?: readonly { title: string; links: readonly TopicLink[] }[];
  closingTitle: string;
};

export function TopicLanding({
  breadcrumbs,
  eyebrow,
  title,
  intro,
  ctaHref,
  ctaLabel,
  callout,
  aside,
  sections,
  sectionsIntro,
  linkGroups,
  closingTitle,
}: TopicLandingProps) {
  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-800">
      <main>
        <section
          className="relative -mt-[var(--site-header-height)] overflow-hidden pt-28 md:pt-32"
          style={{
            background: "linear-gradient(135deg, #2980B9 0%, #6DD5FA 55%, #7ec8e3 100%)",
          }}
        >
          <div className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-secondary-400/25 blur-3xl" />
          <div className="pointer-events-none absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-6 md:pb-20">
            <Breadcrumbs items={breadcrumbs} />
            <p className="mb-3 mt-6 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/90">
              {eyebrow}
            </p>
            <h1 className="max-w-3xl text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
              {title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">{intro}</p>
            <Link
              href={ctaHref}
              className="mt-8 inline-flex items-center rounded-2xl bg-primary-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-900/20 transition hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            >
              {ctaLabel}
            </Link>
          </div>
        </section>

        {callout ? (
          <section className="relative -mt-6 px-6 md:-mt-10">
            <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-900/[0.06] md:p-10">
              <p className="text-xs font-semibold uppercase tracking-widest text-primary-700">
                {callout.eyebrow}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-slate-900 md:text-3xl">{callout.title}</h2>
              <p className="mt-4 max-w-3xl text-lg leading-relaxed text-slate-600">{callout.description}</p>
            </div>
          </section>
        ) : null}

        <section className={`px-6 pb-20 md:pb-24 ${callout ? "pt-10 md:pt-14" : "relative -mt-6 md:-mt-10"}`}>
          <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-900/[0.06] md:p-12">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">What we cover</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">{sectionsIntro}</p>
              {aside ? <p className="mt-4 leading-relaxed text-slate-600">{aside}</p> : null}
            </div>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {sections.map((section) => (
                <article key={section.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                  <h3 className="text-xl font-bold text-slate-900">{section.title}</h3>
                  <p className="mt-3 leading-relaxed text-slate-600">{section.intro}</p>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600">
                    {section.points.map((point) => (
                      <li key={point} className="flex gap-3">
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-secondary-500" aria-hidden />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        {linkGroups && linkGroups.some((group) => group.links.length > 0) ? (
          <section className="px-6 pb-16">
            <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
              {linkGroups
                .filter((group) => group.links.length > 0)
                .map((group) => (
                  <div key={group.title} className="rounded-3xl border border-slate-200 bg-white p-8">
                    <h2 className="text-xl font-bold text-slate-900">{group.title}</h2>
                    <ul className="mt-4 space-y-2">
                      {group.links.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            className="font-medium text-primary-600 underline decoration-primary-600/30 underline-offset-2 hover:text-primary-700"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </section>
        ) : null}

        <section className="px-6 pb-24">
          <div
            className="mx-auto max-w-4xl overflow-hidden rounded-3xl px-8 py-14 text-center text-white md:px-12"
            style={{ background: "linear-gradient(to bottom right, #2980B9, #6DD5FA)" }}
          >
            <p className="text-balance text-xl font-semibold leading-snug md:text-2xl">{closingTitle}</p>
            <Link
              href={ctaHref}
              className="mt-8 inline-flex items-center rounded-2xl bg-white px-8 py-3.5 text-base font-semibold text-[#2980B9] shadow-lg transition hover:bg-white/90"
            >
              {ctaLabel}
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
