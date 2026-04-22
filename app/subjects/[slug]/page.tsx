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
  const subjectCoverageBlurb =
    subject.slug === "11-plus-preparation"
      ? "English, Maths, verbal reasoning and non-verbal reasoning, taught with clear strategies and exam confidence in mind."
      : `${subject.label} content taught in a way that matches your child's current level, targets and school expectations.`;

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
            <div className="max-w-3xl">
              <p className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-700">
                Private tutoring with Brighter Futures
              </p>
              <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
                What your child&apos;s programme includes
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-600">
                Every programme is structured, personalised and designed to build confidence as
                well as progress.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-7 shadow-sm">
                <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-primary-100/70 blur-2xl" aria-hidden />
                <p className="relative text-xs font-semibold uppercase tracking-widest text-primary-600">
                  01 Subject areas
                </p>
                <h3 className="relative mt-2 text-xl font-bold text-slate-900">Focused academic coverage</h3>
                <p className="relative mt-3 leading-relaxed text-slate-600">{subjectCoverageBlurb}</p>
              </article>

              <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-7 shadow-sm">
                <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-secondary-100/70 blur-2xl" aria-hidden />
                <p className="relative text-xs font-semibold uppercase tracking-widest text-primary-600">
                  02 Curated lesson plans
                </p>
                <h3 className="relative mt-2 text-xl font-bold text-slate-900">A plan built around your child</h3>
                <p className="relative mt-3 leading-relaxed text-slate-600">
                  Sessions follow a curated sequence tailored to your child&apos;s strengths, gaps
                  and pace, so each lesson has clear purpose and momentum.
                </p>
              </article>

              <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-7 shadow-sm">
                <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-primary-100/70 blur-2xl" aria-hidden />
                <p className="relative text-xs font-semibold uppercase tracking-widest text-primary-600">
                  03 Mock exams
                </p>
                <h3 className="relative mt-2 text-xl font-bold text-slate-900">Exam practice without overwhelm</h3>
                <p className="relative mt-3 leading-relaxed text-slate-600">
                  Mock-style tasks and timed practice are introduced at the right stage to develop
                  technique, resilience and calm performance under pressure.
                </p>
              </article>

              <article className="relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-7 shadow-sm">
                <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-secondary-100/70 blur-2xl" aria-hidden />
                <p className="relative text-xs font-semibold uppercase tracking-widest text-primary-600">
                  04 Feedback
                </p>
                <h3 className="relative mt-2 text-xl font-bold text-slate-900">Clear updates for families</h3>
                <p className="relative mt-3 leading-relaxed text-slate-600">
                  You receive regular feedback on progress, priorities and next steps, so you always
                  know what&apos;s improving and what we&apos;re focusing on next.
                </p>
              </article>
            </div>
          </div>
        </section>

        {subject.sections && subject.sections.length > 0 ? (
          <section className="px-6 pb-20 md:pb-24">
            <div className="mx-auto max-w-6xl">
              <div className="mb-10 max-w-3xl">
                <p className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-700">
                  {subject.label} breakdown
                </p>
                <h2 className="mt-4 text-3xl font-bold text-slate-900 md:text-4xl">
                  Detailed support across key learning areas
                </h2>
                <p className="mt-4 text-lg text-slate-600">
                  Every section below is taught with explicit strategy, guided practice and
                  confidence-building feedback.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {subject.sections.map((section, idx) => (
                  <article
                    key={section.title}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-lg"
                  >
                    <div
                      className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 opacity-70 blur-2xl transition group-hover:opacity-100"
                      aria-hidden
                    />
                    <p className="relative text-xs font-semibold uppercase tracking-widest text-primary-600">
                      Area {String(idx + 1).padStart(2, "0")}
                    </p>
                    <h3 className="relative mt-2 text-2xl font-bold text-slate-900">{section.title}</h3>
                    <p className="relative mt-4 text-base leading-relaxed text-slate-600">
                      {section.intro}
                    </p>
                    <ul className="relative mt-6 space-y-3 text-sm leading-relaxed text-slate-600">
                      {section.points.map((point) => (
                        <li key={point} className="flex gap-3">
                          <span
                            className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-secondary-500"
                            aria-hidden
                          />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

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
