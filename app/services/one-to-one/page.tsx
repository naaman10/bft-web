import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { ServiceHeroImage } from "@/components/ServiceHeroImage";
import { SERVICE_IMAGE_ONE_TO_ONE } from "@/lib/service-images";
import { LOCAL_AREA_META } from "@/lib/site-location";

export const metadata: Metadata = {
  title: "1:1 Tutoring | Brighter Futures Tutoring",
  description:
    `Fun, engaging and fully personalised one-to-one tutoring in Maths, Reading and SPaG. ${LOCAL_AREA_META}`,
};

function ImagePlaceholderLight({ label }: { label: string }) {
  return (
    <div
      className="relative flex min-h-[220px] w-full items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300/80 bg-gradient-to-br from-slate-100 to-slate-200/80 text-center text-sm font-medium text-slate-500 md:min-h-[280px]"
      role="img"
      aria-label={label}
    >
      <span className="px-4">{label}</span>
    </div>
  );
}

export default function OneToOnePage() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-800">
      {/* Hero — gradient band + asymmetric split */}
      <main>
        <section
          className="relative overflow-hidden pt-28 md:pt-32"
          style={{
            background: "linear-gradient(135deg, #2980B9 0%, #6DD5FA 55%, #7ec8e3 100%)",
          }}
        >
          <div className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-secondary-400/25 blur-3xl" />
          <div className="pointer-events-none absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl" />

          <div className="relative mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-6 md:grid-cols-12 md:items-center md:gap-8 md:pb-20">
            <div className="md:col-span-7">
              <p className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/90">
                One-to-one tutoring
              </p>
              <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[2.75rem]">
                Give your child the confidence to thrive with fun, engaging and
                fully personalised 1:1 tutoring sessions.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">
                Each 60-minute session is tailored to your child&apos;s
                individual needs, helping them build skills, confidence and
                enjoyment in learning at their own pace—available to families in
                and around Greater Manchester.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center rounded-2xl bg-primary-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-900/20 transition hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
              >
                Enquire about availability
              </Link>
            </div>
            <div className="md:col-span-5">
              <ServiceHeroImage
                src={SERVICE_IMAGE_ONE_TO_ONE}
                alt="One-to-one tutoring session illustration"
              />
            </div>
          </div>
        </section>

        {/* Session detail + image */}
        <section className="relative -mt-6 px-6 pb-16 md:-mt-10 md:pb-24">
          <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-900/[0.06] md:p-12 lg:p-14">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div className="order-2 lg:order-1">
                <ImagePlaceholderLight label="Session in action — optional photo or illustration" />
              </div>
              <div className="order-1 lg:order-2">
                <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
                  How it works
                </span>
                <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                  60 minutes, built around them
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-slate-600">
                  Each 60-minute session is tailored to your child&apos;s
                  individual needs, helping them build skills, confidence and
                  enjoyment in learning at their own pace.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What we offer */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 max-w-2xl">
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                What we offer
              </h2>
              <p className="mt-3 text-lg text-slate-600">We specialise in:</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { title: "English", blurb: "Building strong literacy skills and confidence in reading and writing." },
                { title: "Reading", blurb: "Fluency, comprehension and a love of books." },
                {
                  title: "SPaG",
                  subtitle: "Spelling, Punctuation and Grammar",
                  blurb: "Clear, structured support for literacy foundations.",
                },
                { title: "Maths", blurb: "Number sense, reasoning and confidence with concepts." },
                { title: "Mental Arithmetic", blurb: "Developing fast mental maths skills and confidence." },
                { title: "11+ Prep", blurb: "Preparing for 11+ exams with confidence and focus." },

              ].map((item, i) => (
                <div
                  key={item.title}
                  className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-primary-200 hover:shadow-md"
                >
                  <span className="absolute -right-2 -top-2 text-7xl font-bold text-primary-50 transition group-hover:text-primary-100/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="relative text-2xl font-bold text-primary-600">
                    {item.title}
                  </h3>
                  {"subtitle" in item && item.subtitle ? (
                    <p className="relative mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
                      {item.subtitle}
                    </p>
                  ) : null}
                  <p className="relative mt-4 text-sm leading-relaxed text-slate-600">
                    {item.blurb}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why choose + image */}
        <section className="border-y border-slate-200/80 bg-slate-900 px-6 py-20 text-white md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                Why choose 1:1 tutoring?
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-300">
                Every child learns differently. Our one-to-one sessions are
                designed to make learning enjoyable, supportive and effective,
                with activities and teaching approaches adapted to suit each
                learner.
              </p>
              <div className="mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-secondary-400 to-primary-500" />
            </div>
            <div>
              <div
                className="flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-white/30 bg-white/5 text-center text-sm font-medium text-slate-400 backdrop-blur-sm"
                role="img"
                aria-label="Supporting image for why one-to-one"
              >
                <span className="px-4">Image — happy learner / personalised support</span>
              </div>
            </div>
          </div>
        </section>

        {/* Weekly feedback + Limited availability */}
        <section className="px-6 py-20 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
            <article className="rounded-3xl border border-secondary-200/80 bg-gradient-to-br from-secondary-50 to-white p-10 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-400 text-lg font-bold text-secondary-950">
                ✉
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Weekly feedback</h3>
              <p className="mt-4 leading-relaxed text-slate-600">
                You&apos;ll receive weekly feedback so you can stay up to date
                with progress, strengths and next steps.
              </p>
            </article>

            <article className="rounded-3xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white p-10 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500 text-lg font-bold text-white">
                ★
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Limited availability</h3>
              <p className="mt-4 leading-relaxed text-slate-600">
                Spaces are limited to ensure every student receives the time,
                care and attention they deserve.
              </p>
            </article>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="px-6 pb-24">
          <div
            className="mx-auto max-w-4xl overflow-hidden rounded-3xl px-8 py-14 text-center text-white md:px-12"
            style={{
              background: "linear-gradient(to bottom right, #2980B9, #6DD5FA)",
            }}
          >
            <p className="text-balance text-xl font-semibold leading-snug md:text-2xl">
              Get in touch today to enquire about availability.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center rounded-2xl bg-white px-8 py-3.5 text-base font-semibold text-[#2980B9] shadow-lg transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
            >
              Contact us
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
