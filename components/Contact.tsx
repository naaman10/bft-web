import Link from "next/link";

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
          Get in touch to discuss how we can support your child&apos;s
          learning—we work with families in and around the Greater Manchester
          area.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:flex-wrap sm:justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg bg-primary-600 px-6 py-3 text-base font-medium text-white hover:bg-primary-500"
          >
            Contact form
          </Link>
          {email && (
            <a
              href={`mailto:${email}`}
              className="inline-flex items-center rounded-lg border-2 border-primary-600 bg-white px-6 py-3 text-base font-medium text-primary-700 hover:bg-primary-50"
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
        </div>
        {!email && !phone && (
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Add your email and phone in Contentful to show quick contact
            buttons alongside the form link.
          </p>
        )}
      </div>
    </section>
  );
}
