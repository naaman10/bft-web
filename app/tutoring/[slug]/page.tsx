import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { TopicLanding } from "@/components/TopicLanding";
import { breadcrumbListJsonLd, serviceJsonLd } from "@/lib/json-ld";
import { getSiteUrl } from "@/lib/site";
import { isTutoringSlug, TUTORING_PAGES, TUTORING_SLUGS, type TutoringSlug } from "@/lib/tutoring";

type Props = {
  params: { slug: string };
};

export function generateStaticParams(): { slug: TutoringSlug }[] {
  return TUTORING_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  if (!isTutoringSlug(params.slug)) return { title: "Tutoring" };
  const page = TUTORING_PAGES[params.slug];
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/tutoring/${page.slug}` },
  };
}

const relatedBySlug: Record<TutoringSlug, { href: string; label: string }[]> = {
  maths: [
    { href: "/tutoring/11-plus", label: "11+ tutoring" },
    { href: "/services/one-to-one", label: "One-to-one sessions" },
  ],
  english: [
    { href: "/tutoring/reading", label: "Reading tutoring" },
    { href: "/tutoring/spag", label: "SPaG tutoring" },
    { href: "/services/one-to-one", label: "One-to-one sessions" },
  ],
  reading: [
    { href: "/tutoring/english", label: "English tutoring" },
    { href: "/tutoring/spag", label: "SPaG tutoring" },
    { href: "/resources/how-to-improve-your-childs-reading-comprehension", label: "How to improve reading comprehension" },
  ],
  spag: [
    { href: "/tutoring/english", label: "English tutoring" },
    { href: "/tutoring/reading", label: "Reading tutoring" },
    { href: "/resources/what-is-spag-guide-for-parents", label: "What is SPaG?" },
  ],
  "11-plus": [
    { href: "/tutoring/maths", label: "Maths tutoring" },
    { href: "/tutoring/english", label: "English tutoring" },
    { href: "/resources/how-does-the-11-plus-work-in-trafford", label: "How the 11+ works in Trafford" },
    { href: "/location/trafford", label: "Tutoring in Trafford" },
  ],
};

export default function TutoringPage({ params }: Props) {
  if (!isTutoringSlug(params.slug)) notFound();
  const page = TUTORING_PAGES[params.slug];
  const siteUrl = getSiteUrl();
  const path = `/tutoring/${page.slug}`;

  return (
    <>
      <JsonLd
        data={breadcrumbListJsonLd(siteUrl, [
          { name: "Home", path: "/" },
          { name: page.label, path },
        ])}
      />
      <JsonLd
        data={serviceJsonLd(siteUrl, {
          path,
          name: page.metaTitle,
          description: page.metaDescription,
          serviceType: page.metaTitle,
        })}
      />
      <TopicLanding
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: page.label },
        ]}
        eyebrow={page.eyebrow}
        title={page.h1}
        intro={page.intro}
        ctaHref="/contact"
        ctaLabel={page.ctaLabel}
        callout={page.callout}
        sections={page.sections}
        sectionsIntro="Every programme is personalised. These are the areas sessions usually cover."
        linkGroups={[{ title: "Related", links: relatedBySlug[page.slug] }]}
        closingTitle={`Ready to talk about ${page.label} tutoring?`}
      />
      <Footer />
    </>
  );
}
