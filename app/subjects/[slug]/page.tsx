import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbListJsonLd } from "@/lib/json-ld";
import { isSubjectsFeatureEnabled } from "@/lib/feature-flags";
import { SUBJECTS, type SubjectSlug, isSubjectSlug } from "@/lib/subjects";
import { getSiteUrl } from "@/lib/site";

type Props = {
  params: { slug: string };
};

export function generateStaticParams(): { slug: SubjectSlug }[] {
  if (!isSubjectsFeatureEnabled()) {
    return [];
  }
  return Object.keys(SUBJECTS).map((slug) => ({ slug: slug as SubjectSlug }));
}

export function generateMetadata({ params }: Props): Metadata {
  if (!isSubjectsFeatureEnabled()) {
    notFound();
  }
  if (!isSubjectSlug(params.slug)) {
    return { title: "Subject" };
  }
  const s = SUBJECTS[params.slug];
  return {
    title: s.metaTitle,
    description: s.metaDescription,
  };
}

export default function SubjectPage({ params }: Props) {
  if (!isSubjectsFeatureEnabled()) {
    notFound();
  }
  if (!isSubjectSlug(params.slug)) {
    notFound();
  }

  const subject = SUBJECTS[params.slug];
  const siteUrl = getSiteUrl();

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-800">
      <JsonLd
        data={breadcrumbListJsonLd(siteUrl, [
          { name: "Home", path: "/" },
          { name: subject.label, path: `/subjects/${subject.slug}` },
        ])}
      />
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
            <p className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/90">
              {subject.heroEyebrow}
            </p>
            <h1 className="max-w-3xl text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[2.75rem]">
              {subject.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">{subject.intro}</p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center rounded-2xl bg-primary-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-900/20 transition hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Enquire about this subject
            </Link>
          </div>
        </section>

        <section className="relative -mt-6 px-6 pb-20 md:-mt-10 md:pb-24">
          <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-900/[0.06] md:p-12 lg:p-14">
            <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">What you can expect</h2>
            <ul className="mt-8 space-y-4 text-lg leading-relaxed text-slate-600">
              {subject.highlights.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary-500" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div
            className="mx-auto max-w-4xl overflow-hidden rounded-3xl px-8 py-14 text-center text-white md:px-12"
            style={{
              background: "linear-gradient(to bottom right, #2980B9, #6DD5FA)",
            }}
          >
            <p className="text-balance text-xl font-semibold leading-snug md:text-2xl">
              Ready to talk about {subject.label.toLowerCase()}?
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center rounded-2xl bg-white px-8 py-3.5 text-base font-semibold text-[#2980B9] shadow-lg transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Contact us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
