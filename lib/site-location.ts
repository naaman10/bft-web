/**
 * Local SEO / on-page copy — keep references to the service area consistent.
 */
export const LOCAL_AREA = "Hull, East Yorkshire and Greater Manchester";

/** Use in sentences, e.g. "We support families …" */
export const LOCAL_AREA_PHRASE = "in and around Hull, East Yorkshire and Greater Manchester";

/** Short clause for meta descriptions */
export const LOCAL_AREA_META =
  "Tutoring for families in and around Hull, East Yorkshire and Greater Manchester";

/** Places named in on-page copy. Hull is a city; the others are administrative areas. */
export function localAreaServedJsonLd(): { "@type": string; name: string }[] {
  return [
    { "@type": "City", name: "Hull" },
    { "@type": "AdministrativeArea", name: "East Yorkshire" },
    { "@type": "AdministrativeArea", name: "Greater Manchester" },
  ];
}
