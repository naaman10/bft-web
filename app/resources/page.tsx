import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ARTICLE_CATEGORIES } from "@/lib/article-model";
import { formatArticleDate, getArticles } from "@/lib/articles";
import { breadcrumbListJsonLd } from "@/lib/json-ld";
import { getSiteUrl } from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Guides for parents on Maths, English, reading, SPaG, the 11+ and home education from Brighter Futures Tutoring.",
  alternates: { canonical: "/resources" },
};

type ResourcesPageProps = {
  searchParams: { category?: string | string[] };
};

export default async function ResourcesPage({ searchParams }: ResourcesPageProps) {
  const siteUrl = getSiteUrl();
  const articles = (await getArticles()).filter((article) => !article.noIndex);
  const requested = Array.isArray(searchParams.category)
    ? searchParams.category[0]
    : searchParams.category;
  const activeCategory = ARTICLE_CATEGORIES.find((category) => category === requested);
  const visible = activeCategory
    ? articles.filter((article) => article.category === activeCategory)
    : articles;
  const categoriesInUse = ARTICLE_CATEGORIES.filter((category) =>
    articles.some((article) => article.category === category)
  );

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-800">
      <JsonLd
        data={breadcrumbListJsonLd(siteUrl, [
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
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
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Resources" },
              ]}
            />
            <h1 className="mt-6 max-w-3xl text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
              Resources for parents
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">
              Guides on the subjects and stages we tutor, including Maths, English,
              reading, SPaG and 11+ preparation.
            </p>
          </div>
        </section>

        <section className="relative -mt-6 px-6 pb-20 md:-mt-10 md:pb-24">
          <div className="mx-auto max-w-6xl">
            {categoriesInUse.length > 0 ? (
              <nav aria-label="Topics" className="mb-8 flex flex-wrap gap-2">
                <Link
                  href="/resources"
                  className={[
                    "rounded-full px-4 py-2 text-sm font-medium",
                    activeCategory
                      ? "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
                      : "bg-primary-500 text-white",
                  ].join(" ")}
                  aria-current={activeCategory ? undefined : "page"}
                >
                  All
                </Link>
                {categoriesInUse.map((category) => {
                  const selected = category === activeCategory;
                  return (
                    <Link
                      key={category}
                      href={`/resources?category=${encodeURIComponent(category)}`}
                      className={[
                        "rounded-full px-4 py-2 text-sm font-medium",
                        selected
                          ? "bg-primary-500 text-white"
                          : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50",
                      ].join(" ")}
                      aria-current={selected ? "page" : undefined}
                    >
                      {category}
                    </Link>
                  );
                })}
              </nav>
            ) : null}

            {visible.length === 0 ? (
              <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm md:p-12">
                <p className="text-lg text-slate-600">
                  {activeCategory
                    ? `There are no ${activeCategory} articles yet.`
                    : "Articles will appear here once they are published."}{" "}
                  <Link
                    href="/contact"
                    className="font-medium text-primary-600 hover:text-primary-700"
                  >
                    Contact us
                  </Link>{" "}
                  if you would like to ask about tutoring in the meantime.
                </p>
              </div>
            ) : (
              <ul className="grid gap-6 md:grid-cols-2">
                {visible.map((article) => (
                  <li key={article.id}>
                    <article className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
                      {article.heroImage ? (
                        <div className="relative aspect-[16/9] bg-slate-100">
                          <Image
                            src={article.heroImage.url}
                            alt={article.heroImage.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover"
                          />
                        </div>
                      ) : null}
                      <div className="flex flex-1 flex-col p-6 md:p-8">
                        <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">
                          {article.category}
                        </p>
                        <h2 className="mt-2 text-2xl font-bold text-slate-900">
                          <Link
                            href={`/resources/${article.slug}`}
                            className="hover:text-primary-600"
                          >
                            {article.title}
                          </Link>
                        </h2>
                        <p className="mt-3 flex-1 leading-relaxed text-slate-600">
                          {article.excerpt}
                        </p>
                        <p className="mt-4 text-sm text-slate-500">
                          <time dateTime={article.publishedDate}>
                            {formatArticleDate(article.publishedDate)}
                          </time>
                        </p>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
