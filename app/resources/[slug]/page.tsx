import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import {
  formatArticleDate,
  getArticleBySlug,
  getArticles,
  isSameLondonDay,
  type Article,
  type ArticleImage,
} from "@/lib/articles";
import type { SiteLink } from "@/lib/article-model";
import { articleJsonLd, breadcrumbListJsonLd } from "@/lib/json-ld";
import { getSiteUrl } from "@/lib/site";

export const revalidate = 60;

type Props = {
  params: { slug: string };
};

function socialImage(article: Article): ArticleImage | undefined {
  return article.socialImage ?? article.heroImage;
}

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles
    .filter((article) => !article.noIndex)
    .map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    return { title: "Article" };
  }

  const title = article.seoTitle ?? article.title;
  const description = article.seoDescription ?? article.excerpt;
  const image = socialImage(article);
  const canonical = article.canonicalUrl ?? `/resources/${article.slug}`;

  return {
    title,
    description,
    alternates: { canonical },
    robots: article.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type: "article",
      title: `${title} | Brighter Futures Tutoring`,
      description,
      url: `/resources/${article.slug}`,
      publishedTime: article.publishedDate,
      modifiedTime: article.updatedDate ?? article.publishedDate,
      images: image
        ? [
            {
              url: image.url,
              width: image.width,
              height: image.height,
              alt: image.alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: `${title} | Brighter Futures Tutoring`,
      description,
      images: image ? [image.url] : undefined,
    },
  };
}

function LinkList({
  title,
  items,
}: {
  title: string;
  items: readonly SiteLink[];
}) {
  const linked = items.filter((item) => item.href);
  const unlinked = items.filter((item) => !item.href);
  if (linked.length === 0 && unlinked.length === 0) return null;

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      {linked.length > 0 ? (
        <ul className="mt-3 space-y-2">
          {linked.map((item) => (
            <li key={item.slug}>
              <Link
                href={item.href!}
                className="font-medium text-primary-600 underline decoration-primary-600/30 underline-offset-2 hover:text-primary-700"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
      {unlinked.length > 0 ? (
        <p className="mt-3 text-slate-600">{unlinked.map((item) => item.label).join(", ")}</p>
      ) : null}
    </div>
  );
}

export default async function ArticlePage({ params }: Props) {
  const article = await getArticleBySlug(params.slug);
  if (!article) notFound();

  const siteUrl = getSiteUrl();
  const path = `/resources/${article.slug}`;
  const showUpdated =
    Boolean(article.updatedDate) &&
    !isSameLondonDay(article.publishedDate, article.updatedDate!);
  const audience = [...article.ageGroups, ...article.keyStages];
  const image = socialImage(article);
  const hasRelationships =
    article.relatedSubjects.length > 0 ||
    article.relatedServices.length > 0 ||
    article.relatedLocations.length > 0;
  const ctaIsExternal = /^https?:\/\//i.test(article.cta.href);

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-800">
      <JsonLd
        data={breadcrumbListJsonLd(siteUrl, [
          { name: "Home", path: "/" },
          { name: "Resources", path: "/resources" },
          { name: article.title, path },
        ])}
      />
      <JsonLd
        data={articleJsonLd(siteUrl, {
          path,
          headline: article.title,
          description: article.seoDescription ?? article.excerpt,
          datePublished: article.publishedDate,
          dateModified: article.updatedDate,
          authorName: article.authorName,
          image: image?.url,
        })}
      />
      <main>
        <section
          className="relative -mt-[var(--site-header-height)] overflow-hidden pt-28 md:pt-32"
          style={{
            background: "linear-gradient(135deg, #2980B9 0%, #6DD5FA 55%, #7ec8e3 100%)",
          }}
        >
          <div className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-secondary-400/25 blur-3xl" />
          <div className="relative mx-auto max-w-3xl px-6 pb-16 pt-6 md:pb-20">
            <Breadcrumbs
              items={[
                { name: "Home", href: "/" },
                { name: "Resources", href: "/resources" },
                { name: article.title },
              ]}
            />
            <p className="mb-3 mt-6 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/90">
              {article.category}
            </p>
            <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
              {article.title}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/90">{article.excerpt}</p>
            <p className="mt-4 text-sm text-white/80">
              <time dateTime={article.publishedDate}>
                {formatArticleDate(article.publishedDate)}
              </time>
              {showUpdated && article.updatedDate ? (
                <>
                  {" "}
                  · Updated{" "}
                  <time dateTime={article.updatedDate}>
                    {formatArticleDate(article.updatedDate)}
                  </time>
                </>
              ) : null}
              {" "}
              · {article.authorName}
            </p>
            {audience.length > 0 ? (
              <p className="mt-2 text-sm text-white/80">{audience.join(" · ")}</p>
            ) : null}
          </div>
        </section>

        <article className="relative -mt-6 px-6 pb-16 md:-mt-10">
          <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-900/[0.06] md:p-12">
            {article.heroImage ? (
              <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200">
                <Image
                  src={article.heroImage.url}
                  alt={article.heroImage.alt}
                  width={article.heroImage.width ?? 1200}
                  height={article.heroImage.height ?? 675}
                  priority
                  className="h-auto w-full"
                  sizes="(max-width: 768px) 100vw, 720px"
                />
              </div>
            ) : null}
            <ArticleBody document={article.body} />
            {article.authorBio || article.authorImage ? (
              <aside className="mt-10 flex gap-4 border-t border-slate-200 pt-8">
                {article.authorImage ? (
                  <Image
                    src={article.authorImage.url}
                    alt={article.authorImage.alt}
                    width={64}
                    height={64}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                ) : null}
                <div>
                  <p className="font-semibold text-slate-900">{article.authorName}</p>
                  {article.authorBio ? (
                    <p className="mt-2 leading-relaxed text-slate-600">{article.authorBio}</p>
                  ) : null}
                </div>
              </aside>
            ) : null}
          </div>
        </article>

        {hasRelationships ? (
          <section className="px-6 pb-16">
            <div className="mx-auto grid max-w-3xl gap-8 rounded-3xl border border-slate-200 bg-white p-8 md:grid-cols-2">
              <LinkList title="Tutoring" items={[...article.relatedSubjects, ...article.relatedServices]} />
              <LinkList title="Areas" items={article.relatedLocations} />
            </div>
          </section>
        ) : null}

        {article.relatedArticles.length > 0 ? (
          <section className="px-6 pb-16">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-2xl font-bold text-slate-900">Related articles</h2>
              <ul className="mt-6 grid gap-4">
                {article.relatedArticles.map((related) => (
                  <li key={related.id}>
                    <Link
                      href={`/resources/${related.slug}`}
                      className="block rounded-2xl border border-slate-200 bg-white p-6 hover:border-primary-200"
                    >
                      <p className="text-xs font-semibold uppercase tracking-widest text-primary-600">
                        {related.category}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">{related.title}</p>
                      <p className="mt-2 text-slate-600">{related.excerpt}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <section className="px-6 pb-24">
          <div
            className="mx-auto max-w-3xl overflow-hidden rounded-3xl px-8 py-14 text-center text-white md:px-12"
            style={{ background: "linear-gradient(to bottom right, #2980B9, #6DD5FA)" }}
          >
            <h2 className="text-balance text-2xl font-semibold leading-snug">{article.cta.heading}</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/90">{article.cta.text}</p>
            {ctaIsExternal ? (
              <a
                href={article.cta.href}
                className="mt-8 inline-flex items-center rounded-2xl bg-white px-8 py-3.5 text-base font-semibold text-[#2980B9] shadow-lg transition hover:bg-white/90"
              >
                {article.cta.label}
              </a>
            ) : (
              <Link
                href={article.cta.href}
                className="mt-8 inline-flex items-center rounded-2xl bg-white px-8 py-3.5 text-base font-semibold text-[#2980B9] shadow-lg transition hover:bg-white/90"
              >
                {article.cta.label}
              </Link>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
