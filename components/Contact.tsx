interface ContactProps {
  headline: string;
  email?: string;
  phone?: string;
}

export function Contact({ headline, email, phone }: ContactProps) {
  return (
    <section id="contact" className="py-16 md:py-24 bg-white dark:bg-slate-900">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-serif text-3xl font-bold text-slate-900 dark:text-white md:text-4xl">
          {headline}
        </h2>
        <p className="mt-4 text-slate-600 dark:text-slate-300">
          Get in touch to discuss how we can support your child’s learning.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          {email && (
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center rounded-lg bg-primary-600 px-6 py-3 text-base font-medium text-white hover:bg-primary-500"
            >
              Email us
            </a>
          )}
          {phone && (
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="inline-flex items-center rounded-lg border-2 border-secondary-500 text-secondary-700 px-6 py-3 text-base font-medium hover:bg-secondary-500 hover:text-secondary-950"
            >
              Call us
            </a>
          )}
          {!email && !phone && (
            <p className="text-slate-500 dark:text-slate-400">
              Add your email and phone in Contentful to show contact buttons.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
