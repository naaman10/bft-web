interface CTAProps {
  headline?: string;
  subtext?: string;
  buttonLabel?: string;
  buttonHref?: string;
}

export function CTA({
  headline = "Ready to Support Your Child's Learning?",
  subtext = "Enquire today to secure one of our limited tutoring spaces in and around Greater Manchester.",
  buttonLabel = "Get Started",
  buttonHref = "/contact",
}: CTAProps) {
  return (
    <section className="max-w-6xl mx-auto px-6 py-20 text-center">
      <h2 className="text-3xl font-semibold text-slate-900 mb-6">{headline}</h2>
      <p className="text-slate-600 mb-6">{subtext}</p>
      <a
        href={buttonHref}
        className="inline-flex items-center rounded-2xl bg-primary-500 px-8 py-4 text-lg font-medium text-white shadow-sm hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-2"
      >
        {buttonLabel}
      </a>
    </section>
  );
}
