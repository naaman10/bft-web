/**
 * Local SEO / on-page copy — keep references to the service area consistent.
 */
export const LOCAL_AREA = "Greater Manchester, Hull and East Yorkshire";

/** Use in sentences, e.g. "We support families …" */
export const LOCAL_AREA_PHRASE = "in and around Greater Manchester, Hull and East Yorkshire";

/** Short clause for meta descriptions */
export const LOCAL_AREA_META =
  "Tutoring for families in and around Greater Manchester, Hull and East Yorkshire";

/** Region names for Schema.org `areaServed` (keep in sync with copy above). */
export const LOCAL_AREA_SCHEMA_REGIONS = [
  "Greater Manchester",
  "Hull",
  "East Yorkshire",
] as const;

export function localAreaServedJsonLd(): { "@type": string; name: string }[] {
  return LOCAL_AREA_SCHEMA_REGIONS.map((name) => ({
    "@type": "AdministrativeArea",
    name,
  }));
}
