import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { TopicLanding } from "@/components/TopicLanding";
import { breadcrumbListJsonLd, serviceJsonLd } from "@/lib/json-ld";
import { isLocationSlug, locationPlace, LOCATION_PAGES, LOCATION_SLUGS, type LocationSlug } from "@/lib/locations";
import { getSiteUrl } from "@/lib/site";
import { tutoringNavLinks } from "@/lib/tutoring";

type Props = {
  params: { slug: string };
};

const coverage = [
  {
    title: "Maths and English",
    intro: "Primary and early secondary skills, taught at your child's level.",
    points: [
      "Gaps filled before the current topic is pushed harder",
      "School work used as the starting point",
      "Feedback on what improved and what comes next",
    ],
  },
  {
    title: "Reading and SPaG",
    intro: "Comprehension, vocabulary, spelling, punctuation and grammar.",
    points: [
      "Understanding a text, not only reading the words",
      "Grammar and punctuation used in writing",
      "A calmer approach for children who have lost confidence",
    ],
  },
  {
    title: "11+ preparation",
    intro: "Available where a family is preparing for an entrance exam.",
    points: [
      "Skills first, then exam-style questions",
      "The paper matched to the schools you are considering",
      "A routine that leaves room for the rest of childhood",
    ],
  },
] as const;

export function generateStaticParams(): { slug: LocationSlug }[] {
  return LOCATION_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  if (!isLocationSlug(params.slug)) return { title: "Location" };
  const page = LOCATION_PAGES[params.slug];
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `/location/${page.slug}` },
  };
}

export default function LocationPage({ params }: Props) {
  if (!isLocationSlug(params.slug)) notFound();
  const page = LOCATION_PAGES[params.slug];
  const siteUrl = getSiteUrl();
  const path = `/location/${page.slug}`;
  const nearby = page.nearby.map((slug) => ({
    href: `/location/${slug}`,
    label: LOCATION_PAGES[slug].name,
  }));
  const place = locationPlace(page);

  return (
    <>
      <JsonLd
        data={breadcrumbListJsonLd(siteUrl, [
          { name: "Home", path: "/" },
          { name: page.name, path },
        ])}
      />
      <JsonLd
        data={serviceJsonLd(siteUrl, {
          path,
          name: page.metaTitle,
          description: page.metaDescription,
          serviceType: "Tutoring",
          areaName: page.name,
          areaType: place.areaType,
          containedIn: place.containedIn,
          audience: { minAge: 5, maxAge: 14 },
        })}
      />
      <TopicLanding
        breadcrumbs={[
          { name: "Home", href: "/" },
          { name: page.name },
        ]}
        eyebrow={page.region}
        title={page.h1}
        intro={page.intro}
        ctaHref="/contact"
        ctaLabel={`Enquire about tutoring in ${page.name}`}
        sections={coverage}
        sectionsIntro="Tutoring for ages 5–14. One-to-one, group and home education sessions are available."
        aside={page.details}
        linkGroups={[
          { title: "Tutoring", links: tutoringNavLinks },
          { title: "Nearby", links: nearby },
        ]}
        closingTitle={`Talk to us about tutoring in ${page.name}`}
      />
      <Footer />
    </>
  );
}
