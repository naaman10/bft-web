const ORG_NAME = "Brighter Futures Tutoring";

/** Home page: EducationalOrganization + LocalBusiness + WebSite (linked via @graph). */
export function homeOrganizationWebSiteJsonLd(siteUrl: string) {
  const orgId = `${siteUrl}/#organization`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["EducationalOrganization", "LocalBusiness"],
        "@id": orgId,
        name: ORG_NAME,
        url: siteUrl,
        description:
          "Personalised Maths, Reading and SPaG tutoring for children aged 5–14. One-to-one, group and home-ed sessions in Greater Manchester.",
        logo: {
          "@type": "ImageObject",
          url: `${siteUrl}/favicons/android-chrome-512x512.png`,
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: "Greater Manchester",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: ORG_NAME,
        description:
          "Fun, engaging tutoring for ages 5–14 in Maths, Reading and SPaG. One-to-one, group and home-ed options.",
        publisher: { "@id": orgId },
      },
    ],
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
