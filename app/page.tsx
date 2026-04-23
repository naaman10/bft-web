import type { Metadata } from "next";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { Services } from "@/components/Services";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { getHomePage, getReviews } from "@/lib/contentful";
import type { Service } from "@/lib/contentful";
import { JsonLd } from "@/components/JsonLd";
import { testimonialReviewsJsonLd, webSiteJsonLd } from "@/lib/json-ld";
import { getSiteUrl } from "@/lib/site";
import { LOCAL_AREA_PHRASE } from "@/lib/site-location";
import { LOCAL_AREA_META } from "@/lib/site-location";

// Revalidate at most every 60s so Contentful updates appear without redeploying
export const revalidate = 60;

export const metadata: Metadata = {
  description: `Fun, engaging tutoring for ages 5–14 in Maths, Reading and SPaG. 1:1, group and home-ed options. ${LOCAL_AREA_META}`,
};

const defaults = {
  heroHeadline: "Helping Your Child Build Confidence & Thrive",
  heroSubtext:
    `Fun, engaging and personalised tutoring for ages 5–14 in Maths, Reading and SPaG—available to families ${LOCAL_AREA_PHRASE}.`,
  ctaLabel: "Book a Session",
  secondaryCtaLabel: "Learn More",
  urgencyText: "Limited availability – secure your space today",
  servicesHeadline: "What We Specialise In",
  contactHeadline: "Contact us",
  contactEmail: undefined as string | undefined,
  contactPhone: undefined as string | undefined,
};

export default async function HomePage() {
  let content: typeof defaults | null = null;
  let services: Service[] = [];
  let reviews: Awaited<ReturnType<typeof getReviews>> = [];

  if (process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN) {
    try {
      const [home, reviewEntries] = await Promise.all([
        getHomePage(),
        getReviews(),
      ]);
      reviews = reviewEntries;
      if (
        process.env.CONTENTFUL_DEBUG === "1" ||
        process.env.NODE_ENV === "development"
      ) {
        console.log(
          "[homepage] Contentful reviews passed to Testimonials:",
          reviews.length
        );
      }
      if (home) {
        content = {
          ...defaults,
          heroHeadline: home.heroHeadline ?? defaults.heroHeadline,
          heroSubtext: home.heroSubtext ?? defaults.heroSubtext,
          ctaLabel: home.ctaLabel ?? defaults.ctaLabel,
          servicesHeadline: home.servicesHeadline ?? defaults.servicesHeadline,
          contactHeadline: home.contactHeadline ?? defaults.contactHeadline,
          contactEmail: home.contactEmail || undefined,
          contactPhone: home.contactPhone || undefined,
        };
      }
      // Optional: fetch services from Contentful content type "service"
      // const servicesEntries = await getEntriesByType<Service>("service");
      // if (servicesEntries.length) services = servicesEntries;
    } catch {
      // Use defaults if Contentful fails
    }
  }

  const c = content ?? defaults;
  const siteUrl = getSiteUrl();
  const testimonialsJsonLd = testimonialReviewsJsonLd(siteUrl, reviews);

  return (
    <div className="min-h-screen bg-[#f9fafb] text-slate-800">
      <JsonLd data={webSiteJsonLd(siteUrl)} />
      {testimonialsJsonLd ? <JsonLd data={testimonialsJsonLd} /> : null}
      <main>
        <Hero
          headline={c.heroHeadline}
          subtext={c.heroSubtext}
          ctaLabel={c.ctaLabel}
          secondaryCtaLabel={c.secondaryCtaLabel}
          urgencyText={c.urgencyText}
        />
        <Services headline={c.servicesHeadline} services={services} />
        <HowItWorks />
        <WhyChooseUs />
        <Testimonials reviews={reviews.length > 0 ? reviews : undefined} />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
