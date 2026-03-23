import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { Services } from "@/components/Services";
import { CTA } from "@/components/CTA";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { getHomePage } from "@/lib/contentful";
import type { Service } from "@/lib/contentful";

// Revalidate at most every 60s so Contentful updates appear without redeploying
export const revalidate = 60;

const defaults = {
  heroHeadline: "Helping Your Child Build Confidence & Thrive",
  heroSubtext:
    "Fun, engaging and personalised 1:1 tutoring for ages 5–14 in Maths, Reading and SPaG.",
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

  if (process.env.CONTENTFUL_SPACE_ID && process.env.CONTENTFUL_ACCESS_TOKEN) {
    try {
      const home = await getHomePage();
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

  return (
    <div className="bg-[#f9fafb] text-slate-800 min-h-screen">
      <Header />
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
        <Testimonials />
        <CTA />
        <Contact
          headline={c.contactHeadline}
          email={c.contactEmail}
          phone={c.contactPhone}
        />
      </main>
      <Footer />
    </div>
  );
}
