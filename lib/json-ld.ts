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
    logo: organizationLogo(base),
    areaServed: localAreaServedJsonLd(),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Tutoring",
      itemListElement: [
        offer(base, "One-to-one tutoring", "/services/one-to-one"),
        offer(base, "Group tutoring", "/services/group"),
        offer(base, "Home education support", "/services/home-ed"),
        offer(base, "Maths tutoring", "/tutoring/maths"),
        offer(base, "English tutoring", "/tutoring/english"),
        offer(base, "Reading tutoring", "/tutoring/reading"),
        offer(base, "SPaG tutoring", "/tutoring/spag"),
        offer(base, "11+ tutoring", "/tutoring/11-plus"),
      ],
    },
  };
}

function organizationLogo(base: string) {
  return {
    "@type": "ImageObject",
    url: `${base}/favicons/android-chrome-512x512.png`,
    width: 512,
    height: 512,
  };
}

function offer(base: string, name: string, path: string) {
  return {
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name,
      url: `${base}${path}`,
    },
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
    inLanguage: "en-GB",
    publisher: { "@id": orgId },
  };
}

/** Organisation and website, once per page, so other markup can reference their @id. */
export function siteGraphJsonLd(siteUrl: string) {
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
        "@type": "EducationalOrganization",
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
  const base = siteUrl.replace(/\/$/, "");
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => {
      const path = item.path.startsWith("/") ? item.path : `/${item.path}`;
      const itemUrl = path === "/" ? `${base}/` : `${base}${path}`;
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
  /** When set, schema areaServed is this place instead of the whole service area. */
  areaName?: string;
  /** Schema.org type for areaName. Defaults to Place. */
  areaType?: "City" | "AdministrativeArea" | "Place";
  /** Administrative area that contains areaName, when the page says so. */
  containedIn?: string;
  /** Only when the page states an age range. */
  audience?: { minAge: number; maxAge: number };
};

/** Service JSON-LD — `provider` references the site-wide organisation (`#organization`). */
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
    areaServed: service.areaName
      ? placeServed(service.areaName, service.areaType, service.containedIn)
      : localAreaServedJsonLd(),
  };

  if (service.audience) {
    node.audience = {
      "@type": "PeopleAudience",
      suggestedMinAge: service.audience.minAge,
      suggestedMaxAge: service.audience.maxAge,
    };
  }

  if (service.image) {
    node.image = service.image;
  }

  return node;
}

function placeServed(name: string, areaType: ServiceForJsonLd["areaType"], containedIn?: string) {
  const place: Record<string, unknown> = {
    "@type": areaType ?? "Place",
    name,
  };
  if (containedIn) {
    place.containedInPlace = { "@type": "AdministrativeArea", name: containedIn };
  }
  return place;
}

export type ArticleForJsonLd = {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  authorName: string;
  /** Visible category, e.g. Maths or 11 Plus. */
  articleSection?: string;
  image?: string;
};

/** Article JSON-LD. Publisher references the site-wide organisation. */
export function articleJsonLd(siteUrl: string, article: ArticleForJsonLd) {
  const base = siteUrl.replace(/\/$/, "");
  const path = article.path.startsWith("/") ? article.path : `/${article.path}`;
  const pageUrl = `${base}${path}`;

  const authorName = article.authorName.trim();
  const author =
    authorName === ORG_NAME
      ? { "@id": organizationId(base) }
      : { "@type": "Person", name: authorName };

  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline: article.headline,
    description: article.description,
    inLanguage: "en-GB",
    datePublished: article.datePublished,
    dateModified: article.dateModified ?? article.datePublished,
    author,
    publisher: {
      "@id": organizationId(base),
      "@type": "Organization",
      name: ORG_NAME,
      logo: organizationLogo(base),
    },
    isPartOf: { "@id": `${base}/#website` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };

  if (article.articleSection) node.articleSection = article.articleSection;
  if (article.image) node.image = [article.image];

  return node;
}

export type ResourceListItem = {
  slug: string;
  title: string;
};

/** Resources index. The list must match the articles actually shown. */
export function resourceListJsonLd(
  siteUrl: string,
  articles: readonly ResourceListItem[],
  options?: { category?: string }
) {
  if (articles.length === 0) return null;
  const base = siteUrl.replace(/\/$/, "");
  const category = options?.category?.trim();
  const pageUrl = category
    ? `${base}/resources?category=${encodeURIComponent(category)}`
    : `${base}/resources`;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    url: pageUrl,
    name: category ? `${category} resources` : "Resources",
    inLanguage: "en-GB",
    isPartOf: { "@id": `${base}/#website` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: articles.map((article, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: article.title,
        url: `${pageUrl}/${article.slug}`,
      })),
    },
  };
}

export function aboutPageJsonLd(
  siteUrl: string,
  options: { description: string; founderImage: string }
) {
  const base = siteUrl.replace(/\/$/, "");
  const pageUrl = `${base}/about`;
  const orgId = organizationId(base);
  const founderId = `${pageUrl}#ellie-langford`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "AboutPage",
        "@id": `${pageUrl}#about`,
        url: pageUrl,
        name: "About Brighter Futures Tutoring",
        description: options.description,
        inLanguage: "en-GB",
        isPartOf: { "@id": `${base}/#website` },
        about: { "@id": orgId },
        mainEntity: { "@id": orgId },
      },
      {
        "@type": "Person",
        "@id": founderId,
        name: "Ellie Langford",
        jobTitle: "Lead tutor and owner",
        image: options.founderImage,
        worksFor: { "@id": orgId },
      },
      {
        "@type": "EducationalOrganization",
        "@id": orgId,
        founder: { "@id": founderId },
      },
    ],
  };
}
