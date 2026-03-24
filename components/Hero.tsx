import type { ReactNode } from "react";
import Image from "next/image";

const LOGO_URL =
  "https://res.cloudinary.com/njh101010/image/upload/v1773761306/brighterfutures/bft-logo-no-text-sun.png";

const HERO_IMAGE_URL =
  "https://res.cloudinary.com/njh101010/image/upload/v1773781651/brighterfutures/pexels-gustavo-fring-4173105.jpg";

interface HeroProps {
  headline: string;
  subtext?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  urgencyText?: string;
  children?: ReactNode;
}

export function Hero({
  headline,
  subtext,
  ctaLabel,
  ctaHref = "/contact",
  secondaryCtaLabel,
  secondaryCtaHref = "#services",
  urgencyText = "Limited availability – secure your space today",
  children,
}: HeroProps) {
  return (
    <section
      className="relative overflow-hidden pb-20 pt-0 md:pb-28"
      style={{
        background: "linear-gradient(to bottom, #2980B9 0%, #6DD5FA 100%)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 pt-28 md:px-6 md:pt-32">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Image
              src={LOGO_URL}
              alt="Brighter Futures Tutoring"
              width={120}
              height={120}
              className="mb-6 h-16 w-16 object-contain sm:h-20 sm:w-20"
              priority
            />
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-white mb-6">
              {headline}
            </h1>
            {subtext && (
              <p className="text-lg mb-6 text-white/90">{subtext}</p>
            )}
            <div className="flex flex-wrap gap-4">
              {ctaLabel && (
                <a
                  href={ctaHref}
                  className="inline-flex items-center rounded-2xl bg-primary-500 px-6 py-3 text-lg font-medium text-white shadow-sm hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  {ctaLabel}
                </a>
              )}
              {secondaryCtaLabel && (
                <a
                  href={secondaryCtaHref}
                  className="inline-flex items-center rounded-2xl border-2 border-white bg-transparent px-6 py-3 text-lg font-medium text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
                >
                  {secondaryCtaLabel}
                </a>
              )}
            </div>
            {urgencyText && (
              <p className="mt-4 text-sm font-medium text-secondary-200">
                {urgencyText}
              </p>
            )}
            {children}
          </div>
          <div className="relative w-full aspect-[4/3] md:aspect-square md:max-w-md md:h-80 rounded-2xl overflow-hidden bg-white/10">
            <Image
              src={HERO_IMAGE_URL}
              alt="Child in a tutoring session"
              fill
              sizes="(max-width: 768px) 100vw,  min(28rem, 50vw)"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
