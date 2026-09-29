/**
 * Frontend contract for the Contentful content type `article`.
 * Create this model in Contentful (or set CONTENTFUL_ARTICLE_CONTENT_TYPE).
 * The site reads the Delivery API only; it does not create the content type.
 *
 * Identity
 * - internalName: Short text, required, editor-facing
 * - title: Short text, required
 * - slug: Short text, required, unique. Lowercase letters, numbers and hyphens.
 * - excerpt: Long text, required
 *
 * Content
 * - heroImage: Media, optional
 * - heroImageAlt: Short text. Required in the CMS whenever heroImage is set.
 *   The site hides the image if alt text is missing.
 * - body: Rich text, required
 * - category: Short text, required. One of ARTICLE_CATEGORIES.
 * - tags: Short text, list, optional
 *
 * Audience
 * - ageGroups: Short text, list, optional. Suggested: ARTICLE_AGE_GROUPS.
 * - keyStages: Short text, list, optional. Suggested: ARTICLE_KEY_STAGES.
 *
 * Author
 * - authorName: Short text, required
 * - authorBio: Long text, optional
 * - authorImage: Media, optional
 *
 * SEO
 * - seoTitle: Short text, optional
 * - seoDescription: Long text, optional
 * - canonicalUrl: Short text, optional. Absolute URL or site path.
 * - noIndex: Boolean, default false. Excluded from the sitemap and resources index.
 *
 * Social
 * - socialImage: Media, optional
 *
 * Relationships
 * Subject, location and service landing pages are not Contentful models yet,
 * so those relationships are short-text slug lists (not entry references).
 * - relatedArticles: References, many, Article, optional
 * - relatedSubjectSlugs: Short text, list, optional. See SUBJECT_LINKS.
 * - relatedLocationSlugs: Short text, list, optional. See LOCATION_LINKS.
 *   Stored for later location pages. Rendered as text until that page exists.
 * - relatedServiceSlugs: Short text, list, optional. See SERVICE_LINKS.
 *
 * The site also accepts the same slug lists on relatedSubjects,
 * relatedLocations and relatedServices if those fields are short text.
 * Entry links are used only when the linked entry has a slug field.
 *
 * CTA (all optional; the page still offers a contact link)
 * - ctaHeading, ctaText, ctaLabel, ctaUrl: Short text, long text, short text, short text
 *
 * Dates
 * - publishedDate: Date & time, required
 * - updatedDate: Date & time, optional
 */

export const ARTICLE_CONTENT_TYPE = "article";

export const ARTICLE_CATEGORIES = [
  "Maths",
  "English",
  "Reading",
  "SPaG",
  "11 Plus",
  "Home Education",
  "Parent Guides",
  "Learning Advice",
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export const ARTICLE_AGE_GROUPS = ["Ages 5–7", "Ages 7–11", "Ages 11–14"] as const;

export const ARTICLE_KEY_STAGES = ["EYFS", "KS1", "KS2", "KS3", "11 Plus"] as const;

export type SiteLink = {
  slug: string;
  label: string;
  /** Absent until that landing page exists. */
  href?: string;
};

export const SUBJECT_LINKS: readonly SiteLink[] = [
  { slug: "maths", label: "Maths tutoring", href: "/subjects/maths" },
  { slug: "english", label: "English tutoring", href: "/subjects/english" },
  {
    slug: "11-plus-preparation",
    label: "11+ preparation",
    href: "/subjects/11-plus-preparation",
  },
];

export const SERVICE_LINKS: readonly SiteLink[] = [
  {
    slug: "one-to-one",
    label: "One-to-one tutoring",
    href: "/services/one-to-one",
  },
  { slug: "group", label: "Group tutoring", href: "/services/group" },
  {
    slug: "home-ed",
    label: "Home education support",
    href: "/services/home-ed",
  },
];

/** Confirmed service areas. href is added when the location page is published. */
export const LOCATION_LINKS: readonly SiteLink[] = [
  { slug: "hessle", label: "Hessle" },
  { slug: "hull", label: "Hull" },
  { slug: "brough", label: "Brough" },
  { slug: "market-weighton", label: "Market Weighton" },
  { slug: "howden", label: "Howden" },
  { slug: "sale", label: "Sale" },
  { slug: "trafford", label: "Trafford" },
  { slug: "altrincham", label: "Altrincham" },
];

const LINK_MAPS = {
  subject: new Map(SUBJECT_LINKS.map((item) => [item.slug, item])),
  service: new Map(SERVICE_LINKS.map((item) => [item.slug, item])),
  location: new Map(LOCATION_LINKS.map((item) => [item.slug, item])),
} as const;

export function resolveSiteLinks(
  kind: keyof typeof LINK_MAPS,
  slugs: readonly string[]
): SiteLink[] {
  const map = LINK_MAPS[kind];
  const seen = new Set<string>();
  const out: SiteLink[] = [];
  for (const raw of slugs) {
    const slug = raw.trim().toLowerCase();
    if (!slug || seen.has(slug)) continue;
    const match = map.get(slug);
    if (!match) continue;
    seen.add(slug);
    out.push(match);
  }
  return out;
}
