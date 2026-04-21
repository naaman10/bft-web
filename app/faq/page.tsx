import type { Metadata } from "next";
import Link from "next/link";
import { FaqAnswer } from "@/components/FaqAnswer";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { getFaqs, type FaqEntry } from "@/lib/contentful";
import { sortFaqCategories, sortFaqs } from "@/lib/faqs";
import { breadcrumbListJsonLd, faqPageJsonLd } from "@/lib/json-ld";
import { documentToPlainText } from "@/lib/rich-text-plain";
import { getSiteUrl } from "@/lib/site";
import { LOCAL_AREA_META } from "@/lib/site-location";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "FAQs",
  description: `Answers about sessions, learning, progress, home education and booking. ${LOCAL_AREA_META}`,
};

function groupByCategory(faqs: FaqEntry[]): Map<string, FaqEntry[]> {
  const map = new Map<string, FaqEntry[]>();
  for (const f of faqs) {
    const list = map.get(f.category) ?? [];
    list.push(f);
    map.set(f.category, list);
  }
  for (const list of Array.from(map.values())) {
    list.sort((a, b) => a.question.localeCompare(b.question, "en-GB"));
  }
  return map;
}

export default async function FaqPage() {
  const siteUrl = getSiteUrl();
  const raw = await getFaqs();
  const faqs = sortFaqs(raw);
  const byCategory = groupByCategory(faqs);
  const categoryKeys = sortFaqCategories(Array.from(byCategory.keys()));

  const structuredFaqs = faqs.filter((f) => f.enableStructuredData);
  const faqJsonLd =
    structuredFaqs.length > 0
      ? faqPageJsonLd(
          siteUrl,
          structuredFaqs.map((f) => ({
            question: f.question,
            answerPlain: documentToPlainText(f.answer),
          }))
        )
      : null;

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-800">
      <JsonLd
        data={breadcrumbListJsonLd(siteUrl, [
          { name: "Home", path: "/" },
          { name: "FAQs", path: "/faq" },
        ])}
      />
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}

      <main>
        <section
          className="relative -mt-[var(--site-header-height)] overflow-hidden pt-28 md:pt-32"
          style={{
            background:
              "linear-gradient(135deg, #2980B9 0%, #6DD5FA 55%, #7ec8e3 100%)",
          }}
        >
          <div className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-secondary-400/25 blur-3xl" />
          <div className="pointer-events-none absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-6 md:pb-16">
            <p className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/90">
              Help
            </p>
            <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
              Frequently asked questions
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/90">
              Clear answers about how we work, sessions and booking. Can&apos;t
              find what you need?{" "}
              <Link
                href="/contact"
                className="font-semibold text-white underline decoration-white/40 underline-offset-2 hover:decoration-white"
              >
                Contact us
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-12 md:py-16">
          {faqs.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
              <p className="text-slate-600">
                No FAQs are available yet. Please check back soon, or{" "}
                <Link
                  href="/contact"
                  className="font-medium text-primary-600 hover:text-primary-700"
                >
                  get in touch
                </Link>
                .
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-14">
              {categoryKeys.map((category) => {
                const items = byCategory.get(category);
                if (!items?.length) return null;
                return (
                  <div key={category}>
                    <h2 className="mt-0 border-b border-slate-200 pb-3 font-serif text-2xl font-bold text-slate-900">
                      {category}
                    </h2>
                    <div className="mt-6 flex flex-col gap-3">
                      {items.map((item) => (
                        <details
                          key={item.id}
                          className="group rounded-2xl border border-slate-200 bg-white shadow-sm open:shadow-md"
                        >
                          <summary className="cursor-pointer list-none px-5 py-4 font-medium text-slate-900 marker:content-none [&::-webkit-details-marker]:hidden">
                            <span className="flex items-start justify-between gap-3">
                              <span>{item.question}</span>
                              <span
                                className="mt-0.5 shrink-0 text-slate-400 transition group-open:rotate-180"
                                aria-hidden
                              >
                                <svg
                                  className="h-5 w-5"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                >
                                  <path
                                    d="M6 9l6 6 6-6"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </span>
                            </span>
                          </summary>
                          <div className="border-t border-slate-100 px-5 pb-5 pt-2">
                            <FaqAnswer document={item.answer} />
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
