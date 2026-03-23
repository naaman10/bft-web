import { createClient } from "contentful";

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

export { getClient };
