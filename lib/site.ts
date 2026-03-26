/**
 * Canonical site origin for absolute URLs (JSON-LD, sitemap, metadata).
 * Set NEXT_PUBLIC_SITE_URL in production (e.g. https://www.example.com).
 */
export function getSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  return raw.replace(/\/$/, "");
}
