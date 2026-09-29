import { cache } from "react";
import type { Entry, EntrySkeletonType } from "contentful";
import type { Document } from "@contentful/rich-text-types";
import {
  ARTICLE_CONTENT_TYPE,
  resolveSiteLinks,
  type SiteLink,
} from "@/lib/article-model";
import { getClient } from "@/lib/contentful";

export type ArticleImage = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export type ArticleSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  tags: string[];
  ageGroups: string[];
  keyStages: string[];
  authorName: string;
  publishedDate: string;
  updatedDate?: string;
  noIndex: boolean;
  heroImage?: ArticleImage;
};

export type ArticleCta = {
  heading: string;
  text: string;
  label: string;
  href: string;
};

export type Article = ArticleSummary & {
  body: Document;
  authorBio?: string;
  authorImage?: ArticleImage;
  seoTitle?: string;
  seoDescription?: string;
  canonicalUrl?: string;
  socialImage?: ArticleImage;
  relatedArticles: ArticleSummary[];
  relatedSubjects: SiteLink[];
  relatedLocations: SiteLink[];
  relatedServices: SiteLink[];
  cta: ArticleCta;
};

const DEFAULT_CTA: ArticleCta = {
  heading: "Enquire about tutoring",
  text: "Tell us a little about your child and what you are looking for, and we will come back to you.",
  label: "Contact us",
  href: "/contact",
};

function contentTypeId(): string {
  return process.env.CONTENTFUL_ARTICLE_CONTENT_TYPE?.trim() || ARTICLE_CONTENT_TYPE;
}

function localeParam(): { locale: string } | Record<string, never> {
  const locale = process.env.CONTENTFUL_LOCALE?.trim();
  return locale ? { locale } : {};
}

function contentfulConfigured(): boolean {
  return Boolean(
    process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN
  );
}

function isDocument(value: unknown): value is Document {
  return (
    typeof value === "object" &&
    value !== null &&
    "nodeType" in value &&
    (value as Document).nodeType === "document" &&
    Array.isArray((value as Document).content)
  );
}

function stringField(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed || undefined;
}

function stringList(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => stringField(item))
      .filter((item): item is string => Boolean(item));
  }
  const single = stringField(value);
  return single ? [single] : [];
}

function slugListFromField(fields: Record<string, unknown>, keys: string[]): string[] {
  const slugs: string[] = [];
  for (const key of keys) {
    const value = fields[key];
    if (Array.isArray(value)) {
      for (const item of value) {
        if (typeof item === "string") {
          slugs.push(item);
          continue;
        }
        const linked = entryFields(item);
        const slug = linked ? stringField(linked.slug) : undefined;
        if (slug) slugs.push(slug);
      }
      continue;
    }
    const single = stringField(value);
    if (single) slugs.push(single);
  }
  return slugs;
}

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function normaliseSlug(value: unknown): string | undefined {
  const raw = stringField(value);
  if (!raw) return undefined;
  const slug = raw.toLowerCase();
  return SLUG_PATTERN.test(slug) ? slug : undefined;
}

function isoDate(value: unknown): string | undefined {
  const raw = stringField(value);
  if (!raw) return undefined;
  const time = Date.parse(raw);
  if (Number.isNaN(time)) return undefined;
  return new Date(time).toISOString();
}

function assetUrl(url: string): string {
  if (url.startsWith("//")) return `https:${url}`;
  return url;
}

type ResolvedAsset = {
  fields?: {
    file?: {
      url?: string;
      details?: { image?: { width?: number; height?: number } };
    };
  };
};

function isAsset(value: unknown): value is ResolvedAsset {
  if (typeof value !== "object" || value === null || !("fields" in value)) return false;
  return typeof (value as ResolvedAsset).fields?.file?.url === "string";
}

function imageFromAsset(value: unknown, alt: string | undefined): ArticleImage | undefined {
  if (!isAsset(value)) return undefined;
  const file = value.fields?.file;
  if (!file?.url) return undefined;
  const trimmedAlt = alt?.trim();
  if (!trimmedAlt) return undefined;
  const image = file.details?.image;
  return {
    url: assetUrl(file.url),
    alt: trimmedAlt,
    width: image?.width,
    height: image?.height,
  };
}

function entryFields(value: unknown): Record<string, unknown> | undefined {
  if (typeof value !== "object" || value === null || !("fields" in value)) {
    return undefined;
  }
  const fields = (value as Entry<EntrySkeletonType>).fields;
  if (typeof fields !== "object" || fields === null) return undefined;
  return fields as Record<string, unknown>;
}

function safeHref(value: string | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) return trimmed;
  try {
    const url = new URL(trimmed);
    if (url.protocol === "https:" || url.protocol === "http:") return url.toString();
  } catch {
    return null;
  }
  return null;
}

function mapSummary(
  id: string,
  fields: Record<string, unknown>
): ArticleSummary | null {
  const title = stringField(fields.title);
  const slug = normaliseSlug(fields.slug);
  const excerpt = stringField(fields.excerpt);
  const category = stringField(fields.category);
  const authorName = stringField(fields.authorName);
  const publishedDate = isoDate(fields.publishedDate);
  if (!title || !slug || !excerpt || !category || !authorName || !publishedDate) {
    return null;
  }

  const heroAlt = stringField(fields.heroImageAlt);
  return {
    id,
    title,
    slug,
    excerpt,
    category,
    tags: stringList(fields.tags),
    ageGroups: stringList(fields.ageGroups),
    keyStages: stringList(fields.keyStages),
    authorName,
    publishedDate,
    updatedDate: isoDate(fields.updatedDate),
    noIndex: fields.noIndex === true,
    heroImage: imageFromAsset(fields.heroImage, heroAlt),
  };
}

function mapArticle(id: string, fields: Record<string, unknown>): Article | null {
  const summary = mapSummary(id, fields);
  if (!summary || !isDocument(fields.body)) return null;

  const authorImageAlt = stringField(fields.authorName);
  const socialAlt = stringField(fields.seoTitle) ?? summary.title;
  const ctaHeading = stringField(fields.ctaHeading);
  const ctaText = stringField(fields.ctaText);
  const ctaLabel = stringField(fields.ctaLabel);
  const ctaHref = safeHref(stringField(fields.ctaUrl));
  const hasCustomCta = Boolean(ctaHeading || ctaText || ctaLabel || ctaHref);

  const relatedArticles: ArticleSummary[] = [];
  const seenRelated = new Set<string>([summary.slug]);
  const relatedRaw = fields.relatedArticles;
  if (Array.isArray(relatedRaw)) {
    for (const item of relatedRaw) {
      const linkedFields = entryFields(item);
      const linkedId =
        typeof item === "object" &&
        item !== null &&
        "sys" in item &&
        typeof (item as { sys?: { id?: string } }).sys?.id === "string"
          ? (item as { sys: { id: string } }).sys.id
          : "";
      if (!linkedFields || !linkedId) continue;
      const related = mapSummary(linkedId, linkedFields);
      if (!related || related.noIndex || seenRelated.has(related.slug)) continue;
      seenRelated.add(related.slug);
      relatedArticles.push(related);
    }
  }

  return {
    ...summary,
    body: fields.body,
    authorBio: stringField(fields.authorBio),
    authorImage: imageFromAsset(fields.authorImage, authorImageAlt),
    seoTitle: stringField(fields.seoTitle),
    seoDescription: stringField(fields.seoDescription),
    canonicalUrl: safeHref(stringField(fields.canonicalUrl)) ?? undefined,
    socialImage: imageFromAsset(fields.socialImage, socialAlt),
    relatedArticles,
    relatedSubjects: resolveSiteLinks(
      "subject",
      slugListFromField(fields, ["relatedSubjectSlugs", "relatedSubjects"])
    ),
    relatedLocations: resolveSiteLinks(
      "location",
      slugListFromField(fields, ["relatedLocationSlugs", "relatedLocations"])
    ),
    relatedServices: resolveSiteLinks(
      "service",
      slugListFromField(fields, ["relatedServiceSlugs", "relatedServices"])
    ),
    cta: hasCustomCta
      ? {
          heading: ctaHeading ?? DEFAULT_CTA.heading,
          text: ctaText ?? DEFAULT_CTA.text,
          label: ctaLabel ?? DEFAULT_CTA.label,
          href: ctaHref ?? DEFAULT_CTA.href,
        }
      : DEFAULT_CTA,
  };
}

function entryId(item: { sys?: { id?: string } }): string {
  return item.sys?.id ?? "";
}

async function fetchArticles(): Promise<Article[]> {
  if (!contentfulConfigured()) return [];

  try {
    const client = getClient();
    const res = await client.getEntries({
      content_type: contentTypeId(),
      include: 2,
      limit: 200,
      ...localeParam(),
    });

    const articles: Article[] = [];
    for (const item of res.items) {
      const fields = item.fields as Record<string, unknown>;
      const article = mapArticle(entryId(item), fields);
      if (article) articles.push(article);
    }

    articles.sort(
      (a, b) => Date.parse(b.publishedDate) - Date.parse(a.publishedDate)
    );

    const bySlug = new Map<string, Article>();
    for (const article of articles) {
      const existing = bySlug.get(article.slug);
      if (!existing || Date.parse(article.publishedDate) > Date.parse(existing.publishedDate)) {
        bySlug.set(article.slug, article);
      }
    }

    return Array.from(bySlug.values()).sort(
      (a, b) => Date.parse(b.publishedDate) - Date.parse(a.publishedDate)
    );
  } catch (err) {
    const contentTypeError = err as {
      details?: { errors?: { name?: string }[] };
      message?: string;
    };
    const errorName = contentTypeError.details?.errors?.[0]?.name;
    if (errorName === "unknownContentType") {
      console.warn(
        `[contentful:articles] Content type "${contentTypeId()}" is not in Contentful yet.`
      );
      return [];
    }
    console.error(
      "[contentful:articles] getEntries failed:",
      contentTypeError.message ?? "unknown error"
    );
    return [];
  }
}

export const getArticles = cache(fetchArticles);

export const getArticleBySlug = cache(async (slug: string): Promise<Article | null> => {
  const normalised = normaliseSlug(slug);
  if (!normalised) return null;
  const articles = await getArticles();
  return articles.find((article) => article.slug === normalised) ?? null;
});

export function formatArticleDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/London",
  }).format(new Date(iso));
}

export function isSameLondonDay(a: string, b: string): boolean {
  const format = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return format.format(new Date(a)) === format.format(new Date(b));
}
