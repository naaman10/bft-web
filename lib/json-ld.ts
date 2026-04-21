import { LOCAL_AREA_PHRASE, localAreaServedJsonLd } from "@/lib/site-location";

const ORG_NAME = "Brighter Futures Tutoring";

const ORG_DESCRIPTION = `Personalised Maths, Reading and SPaG tutoring for children aged 5–14. One-to-one, group and home-ed sessions ${LOCAL_AREA_PHRASE}.`;

const WEBSITE_DESCRIPTION = `Fun, engaging tutoring for ages 5–14 in Maths, Reading and SPaG. One-to-one, group and home-ed options. ${LOCAL_AREA_PHRASE}.`;

/** Stable @id for Organization — referenced by WebSite `publisher` and elsewhere. */
export function organizationId(siteUrl: string): string {
  return `${siteUrl.replace(/\/$/, "")}/#organization`;
}

function organizationEntity(siteUrl: string) {
  const base = siteUrl.replace(/\/$/, "");
  const id = organizationId(base);

  return {
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": id,
    name: ORG_NAME,
    url: base,
    description: ORG_DESCRIPTION,
    logo: {
      "@type": "ImageObject",
      url: `${base}/favicons/android-chrome-512x512.png`,
    },
    areaServed: localAreaServedJsonLd(),
  };
}

function webSiteEntity(siteUrl: string) {
  const base = siteUrl.replace(/\/$/, "");
  const orgId = organizationId(base);

  return {
    "@type": "WebSite",
    "@id": `${base}/#website`,
    url: base,
    name: ORG_NAME,
    description: WEBSITE_DESCRIPTION,
    publisher: { "@id": orgId },
  };
}

/**
 * EducationalOrganization + LocalBusiness — use site-wide (e.g. root layout) so every
 * page exposes the same organisation entity.
 */
export function organizationJsonLd(siteUrl: string) {
  const base = siteUrl.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    ...organizationEntity(base),
  };
}

/** WebSite linked to `#organization` — home page only, alongside layout `organizationJsonLd`. */
export function webSiteJsonLd(siteUrl: string) {
  const base = siteUrl.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    ...webSiteEntity(base),
  };
}

/** Combined @graph — same as layout org + home WebSite in one script (legacy). */
export function homeOrganizationWebSiteJsonLd(siteUrl: string) {
  const base = siteUrl.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@graph": [organizationEntity(base), webSiteEntity(base)],
  };
}

export type BreadcrumbItem = { name: string; path: string };

export type FaqForJsonLd = {
  question: string;
  /** Plain-text answer for schema.org (from rich text). */
  answerPlain: string;
};

/** FAQPage JSON-LD — omit entries with empty `answerPlain`. */
export function faqPageJsonLd(siteUrl: string, faqs: FaqForJsonLd[]) {
  const pageUrl = `${siteUrl.replace(/\/$/, "")}/faq`;
  const mainEntity = faqs
    .filter((f) => f.question.trim() && f.answerPlain.trim())
    .map((f) => ({
      "@type": "Question",
      name: f.question.trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answerPlain.trim(),
      },
    }));

  if (mainEntity.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: pageUrl,
    mainEntity,
  };
}

/**
 * Contact page: extends the site-wide organisation (`#organization`) with
 * LocalBusiness-oriented fields (address, contact point) and a ContactPage node.
 * Optional `NEXT_PUBLIC_CONTACT_PHONE` / `NEXT_PUBLIC_CONTACT_EMAIL` add telephone/email.
 */
export function contactPageLocalBusinessJsonLd(siteUrl: string) {
  const base = siteUrl.replace(/\/$/, "");
  const orgId = organizationId(base);
  const contactUrl = `${base}/contact`;
  const websiteId = `${base}/#website`;

  const phone = process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim();
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

  const contactPoint: Record<string, unknown> = {
    "@type": "ContactPoint",
    contactType: "customer service",
    url: contactUrl,
    availableLanguage: ["en-GB", "English"],
  };
  if (phone) contactPoint.telephone = phone;
  if (email) contactPoint.email = email;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@id": orgId,
        address: {
          "@type": "PostalAddress",
          addressRegion: "England",
          addressCountry: "GB",
        },
        contactPoint,
      },
      {
        "@type": "ContactPage",
        "@id": `${contactUrl}#contactpage`,
        url: contactUrl,
        name: `Contact ${ORG_NAME}`,
        description:
          "Get in touch about one-to-one, group or home-ed tutoring for children aged 5–14.",
        isPartOf: { "@id": websiteId },
        about: { "@id": orgId },
      },
    ],
  };
}

/** Inner pages: BreadcrumbList — paths must start with `/`. */
export function breadcrumbListJsonLd(siteUrl: string, items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const path = item.path.startsWith("/") ? item.path : `/${item.path}`;
      const itemUrl = path === "/" ? `${siteUrl}/` : `${siteUrl}${path}`;
      return {
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: itemUrl,
      };
    }),
  };
}

export type ServiceForJsonLd = {
  /** URL path e.g. `/services/one-to-one` */
  path: string;
  name: string;
  description: string;
  /** Short label for the kind of service (schema.org `serviceType`). */
  serviceType: string;
  /** Hero or listing image URL */
  image?: string;
};

/** Service JSON-LD — `provider` references layout `organizationJsonLd` (`#organization`). */
export function serviceJsonLd(siteUrl: string, service: ServiceForJsonLd) {
  const base = siteUrl.replace(/\/$/, "");
  const orgId = organizationId(base);
  const path = service.path.startsWith("/") ? service.path : `/${service.path}`;
  const pageUrl = `${base}${path}`;

  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: service.name,
    description: service.description,
    url: pageUrl,
    serviceType: service.serviceType,
    provider: { "@id": orgId },
    areaServed: localAreaServedJsonLd(),
  };

  if (service.image) {
    node.image = service.image;
  }

  return node;
}
