import { createClient } from "contentful";
import type { Document } from "@contentful/rich-text-types";

const space = process.env.CONTENTFUL_SPACE_ID!;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN!;

function getClient() {
  if (!space || !accessToken) {
    throw new Error(
      "Missing Contentful env: CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN must be set."
    );
  }
  return createClient({ space, accessToken });
}

// Content types you can define in Contentful and extend here
export interface SiteConfig {
  siteName?: string;
  tagline?: string;
  heroHeadline?: string;
  heroSubtext?: string;
  ctaLabel?: string;
}

export interface Service {
  title: string;
  description: string;
  /** Optional path e.g. /services/one-to-one when using Contentful */
  href?: string;
  /** Optional Cloudinary or other HTTPS image URL */
  imageSrc?: string;
  iconName?: string;
}

export interface HomePage {
  heroHeadline?: string;
  heroSubtext?: string;
  ctaLabel?: string;
  servicesHeadline?: string;
  aboutHeadline?: string;
  aboutBody?: string;
  contactHeadline?: string;
  contactEmail?: string;
  contactPhone?: string;
}

/**
 * Content type **review** (Review) — field API IDs should match your model:
 * `parentName`, `reviewText` (Rich text), `location` (Short text).
 */
export interface ReviewEntry {
  id: string;
  parentName: string;
  reviewText: Document;
  location?: string;
}

/** Content type **faQs** (FAQs) — field API IDs match Contentful model. */
export interface FaqEntry {
  id: string;
  entryName: string;
  question: string;
  answer: Document;
  /** When true, include in FAQPage JSON-LD (default in CMS is true). */
  enableStructuredData: boolean;
  active: boolean;
  category: string;
}

/** Fetch a single entry by ID */
export async function getEntry<T = Record<string, unknown>>(
  entryId: string,
  locale = "en-US"
): Promise<T | null> {
  const client = getClient();
  try {
    const entry = await client.getEntry(entryId, { locale });
    return (entry?.fields as T) ?? null;
  } catch {
    return null;
  }
}

/** Fetch entries by content type */
export async function getEntriesByType<T = Record<string, unknown>>(
  contentType: string,
  locale = "en-US",
  limit = 100
): Promise<T[]> {
  const client = getClient();
  try {
    const res = await client.getEntries({
      content_type: contentType,
      locale,
      limit,
    });
    return (res.items.map((item) => item.fields) as T[]) ?? [];
  } catch {
    return [];
  }
}

/** Fetch the home page content (single entry of content type "homePage" or similar) */
export async function getHomePage(locale = "en-US"): Promise<HomePage | null> {
  const items = await getEntriesByType<HomePage>("homePage", locale, 1);
  return items[0] ?? null;
}

/** Content type API ID in Contentful (often `review`; override if yours differs). */
const REVIEW_CONTENT_TYPE =
  process.env.CONTENTFUL_REVIEW_CONTENT_TYPE?.trim() || "Reviews";

const FAQ_CONTENT_TYPE =
  process.env.CONTENTFUL_FAQ_CONTENT_TYPE?.trim() || "faQs";

/** Optional; if unset, the Delivery API uses your space default locale (avoids empty fields when entries are only in e.g. `en-GB`). */
const REVIEW_LOCALE = process.env.CONTENTFUL_LOCALE?.trim();

const PARENT_NAME_FIELD_KEYS = [
  "parentName",
  "parent_name",
  "entryTitle",
  "entry_title",
  "name",
  "authorName",
  "author",
  "title",
] as const;

const REVIEW_TEXT_FIELD_KEYS = [
  "reviewText",
  "review_text",
  "body",
  "review",
  "content",
  "text",
] as const;

const LOCATION_FIELD_KEYS = ["location", "area", "role", "subtitle"] as const;

function isRichTextDocument(value: unknown): value is Document {
  return (
    typeof value === "object" &&
    value !== null &&
    "nodeType" in value &&
    (value as Document).nodeType === "document"
  );
}

function documentHasContent(doc: Document): boolean {
  return Array.isArray(doc.content) && doc.content.length > 0;
}

function firstNonEmptyStringField(
  fields: Record<string, unknown>,
  keys: readonly string[]
): string | undefined {
  for (const key of keys) {
    const v = fields[key];
    if (typeof v === "string" && v.trim()) {
      return v.trim();
    }
  }
  return undefined;
}

function firstRichTextField(
  fields: Record<string, unknown>,
  keys: readonly string[]
): Document | undefined {
  for (const key of keys) {
    const v = fields[key];
    if (isRichTextDocument(v) && documentHasContent(v)) {
      return v;
    }
  }
  return undefined;
}

function reviewsDebugEnabled(): boolean {
  return (
    process.env.CONTENTFUL_DEBUG === "1" ||
    process.env.NODE_ENV === "development"
  );
}

/** Logs field shapes without dumping secrets or full rich text. */
function summarizeFieldForDebug(key: string, value: unknown): string {
  if (value === undefined || value === null) {
    return `${key}: (missing)`;
  }
  if (typeof value === "string") {
    const t = value.trim();
    return `${key}: string (${t.length} chars)${t ? ` "${t.slice(0, 40)}${t.length > 40 ? "…" : ""}"` : " (empty)"}`;
  }
  if (typeof value === "object" && value !== null && "nodeType" in value) {
    const doc = value as Document;
    const n = Array.isArray(doc.content) ? doc.content.length : 0;
    return `${key}: rich-text document (nodeType=${String(doc.nodeType)}, ${n} top-level blocks)`;
  }
  return `${key}: ${typeof value}`;
}

function logReviewsDebug(message: string, ...args: unknown[]) {
  if (reviewsDebugEnabled()) {
    console.log(`[contentful:reviews] ${message}`, ...args);
  }
}

/** Published reviews from Contentful, oldest first. Returns [] if unset or on error. */
export async function getReviews(limit = 50): Promise<ReviewEntry[]> {
  if (!space || !accessToken) {
    logReviewsDebug(
      "Skipping fetch: CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN is not set."
    );
    return [];
  }

  const localeLabel = REVIEW_LOCALE ?? "(space default locale)";

  try {
    logReviewsDebug("Fetching entries", {
      contentType: REVIEW_CONTENT_TYPE,
      locale: localeLabel,
      limit,
    });

    const client = getClient();
    const res = await client.getEntries({
      content_type: REVIEW_CONTENT_TYPE,
      limit,
      order: ["sys.createdAt"],
      ...(REVIEW_LOCALE ? { locale: REVIEW_LOCALE } : {}),
    });

    logReviewsDebug("API response", {
      total: res.total,
      itemsReturned: res.items.length,
      skip: res.skip,
    });

    const out: ReviewEntry[] = [];
    for (let i = 0; i < res.items.length; i++) {
      const item = res.items[i];
      const f = item.fields as Record<string, unknown>;
      const keys = Object.keys(f);

      const parentName = firstNonEmptyStringField(f, PARENT_NAME_FIELD_KEYS);
      const reviewText = firstRichTextField(f, REVIEW_TEXT_FIELD_KEYS);
      const location = firstNonEmptyStringField(f, LOCATION_FIELD_KEYS);

      if (!parentName || !reviewText) {
        logReviewsDebug(`Entry ${i + 1} skipped (id=${item.sys.id})`, {
          fieldKeys: keys,
          resolvedParentName: parentName ?? "(none)",
          resolvedReviewText: reviewText ? "yes" : "no",
          fieldSummary: keys.map((k) => summarizeFieldForDebug(k, f[k])),
        });
        if (!reviewText) {
          for (const rk of REVIEW_TEXT_FIELD_KEYS) {
            if (rk in f) {
              const raw = f[rk];
              logReviewsDebug(`  candidate "${rk}":`, {
                isDocument: isRichTextDocument(raw),
                hasBlocks:
                  isRichTextDocument(raw) && documentHasContent(raw),
              });
            }
          }
        }
        continue;
      }

      out.push({
        id: item.sys.id,
        parentName,
        reviewText,
        location,
      });
    }

    logReviewsDebug(`Mapped ${out.length} review(s) for the testimonials section.`);

    if (out.length === 0 && res.items.length === 0) {
      logReviewsDebug(
        "No entries returned. Check: content type API id matches CONTENTFUL_REVIEW_CONTENT_TYPE / default, entries are published, and locale matches CONTENTFUL_LOCALE or space default."
      );
    }

    return out;
  } catch (err) {
    console.error("[contentful:reviews] getEntries failed:", err);
    return [];
  }
}

function faqDebugEnabled(): boolean {
  return (
    process.env.CONTENTFUL_DEBUG === "1" ||
    process.env.NODE_ENV === "development"
  );
}

/** Published FAQ entries (active only). Empty if Contentful is unset or on error. */
export async function getFaqs(limit = 200): Promise<FaqEntry[]> {
  if (!space || !accessToken) {
    if (faqDebugEnabled()) {
      console.log(
        "[contentful:faqs] Skipping fetch: CONTENTFUL_SPACE_ID or CONTENTFUL_ACCESS_TOKEN is not set."
      );
    }
    return [];
  }

  try {
    const client = getClient();
    const res = await client.getEntries({
      content_type: FAQ_CONTENT_TYPE,
      limit,
      include: 2,
      ...(REVIEW_LOCALE ? { locale: REVIEW_LOCALE } : {}),
    });

    const out: FaqEntry[] = [];
    for (const item of res.items) {
      const f = item.fields as Record<string, unknown>;
      const question =
        typeof f.question === "string" ? f.question.trim() : "";
      const entryName =
        typeof f.entryName === "string" ? f.entryName.trim() : "";
      const category =
        typeof f.category === "string" ? f.category.trim() : "";
      const answer = firstRichTextField(f, ["answer"]);
      const active = f.active === false ? false : true;
      const enableStructuredData =
        f.enableStructuredData === false ? false : true;

      if (!question || !answer || !category) {
        continue;
      }
      if (!active) continue;

      out.push({
        id: item.sys.id,
        entryName: entryName || question,
        question,
        answer,
        enableStructuredData,
        active,
        category,
      });
    }

    if (faqDebugEnabled()) {
      console.log(`[contentful:faqs] Mapped ${out.length} FAQ(s).`);
    }

    return out;
  } catch (err) {
    console.error("[contentful:faqs] getEntries failed:", err);
    return [];
  }
}

export { getClient };
