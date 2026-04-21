import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbListJsonLd } from "@/lib/json-ld";
import { getSiteUrl } from "@/lib/site";
import { LOCAL_AREA_META } from "@/lib/site-location";

const LOGO_URL =
  "https://res.cloudinary.com/njh101010/image/upload/v1773761306/brighterfutures/bft-logo-no-text-sun.png";

const ELLIE_PORTRAIT_URL =
  "https://res.cloudinary.com/njh101010/image/upload/v1774265393/brighterfutures/IMG_2448.jpg";

export const metadata: Metadata = {
  title: "About Us | Brighter Futures Tutoring",
  description:
    `Learn about Brighter Futures Tutoring and Ellie Langford, lead tutor and owner—personalised Maths, Reading and SPaG for ages 5–14. ${LOCAL_AREA_META}`,
};

export default function AboutPage() {
  const siteUrl = getSiteUrl();

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-800">
      <JsonLd
        data={breadcrumbListJsonLd(siteUrl, [
          { name: "Home", path: "/" },
          { name: "About us", path: "/about" },
        ])}
      />
      <main>
        {/* Hero — organisation */}
        <section
          className="relative -mt-[var(--site-header-height)] overflow-hidden pt-28 md:pt-32"
          style={{
            background:
              "linear-gradient(135deg, #2980B9 0%, #6DD5FA 55%, #7ec8e3 100%)",
          }}
        >
          <div className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-secondary-400/25 blur-3xl" />
          <div className="pointer-events-none absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl" />

          <div className="relative mx-auto grid max-w-6xl gap-10 px-6 pb-16 pt-6 md:grid-cols-12 md:items-center md:gap-8 md:pb-20">
            <div className="md:col-span-7">
              <p className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/90">
                About us
              </p>
              <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[2.75rem]">
                Brighter Futures Tutoring
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">
                We help children aged 5–14 build confidence and skills through
                fun, engaging tuition in{" "}
                <strong className="font-semibold text-white">Maths</strong>,{" "}
                <strong className="font-semibold text-white">Reading</strong>{" "}
                and{" "}
                <strong className="font-semibold text-white">SPaG</strong>—with
                sessions tailored to how your child learns best.
              </p>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/85">
                Whether you choose one-to-one lessons, small group sessions or
                home education support, our focus is the same: a positive,
                structured experience where every learner feels seen and
                supported. We welcome families from across Greater Manchester
                and nearby communities.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center rounded-2xl bg-primary-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-900/20 transition hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
              >
                Get in touch
              </Link>
            </div>
            <div className="md:col-span-5">
              <div className="relative mx-auto aspect-square max-w-[280px] overflow-hidden rounded-3xl border border-white/30 bg-white/15 p-8 shadow-lg shadow-slate-900/10 backdrop-blur-sm md:max-w-none md:aspect-[4/3]">
                <Image
                  src={LOGO_URL}
                  alt="Brighter Futures Tutoring logo"
                  fill
                  sizes="(max-width: 768px) 280px, 40vw"
                  className="object-contain p-4"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & approach */}
        <section className="relative -mt-6 px-6 pb-16 md:-mt-10 md:pb-24">
          <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-900/[0.06] md:p-12 lg:p-14">
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
                What we believe
              </span>
              <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                Confidence and joy in learning go hand in hand
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                Brighter Futures Tutoring exists to make high-quality,
                personalised teaching accessible and welcoming to families in
                and around Greater Manchester. We plan sessions around your
                child&apos;s pace and goals, celebrate progress along the way,
                and keep communication open with families; so you always know how
                things are going.
              </p>
            </div>
            <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {[
                "Personalised teaching that adapts to each learner",
                "Clear structure with space for curiosity and fun",
                "Regular updates on progress and next steps",
                "Tutoring available across Greater Manchester and nearby areas",
                "One-to-one, group and home-ed options",
                "Support for core literacy and numeracy skills",
                "A calm, encouraging environment to build confidence",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3 text-left text-sm font-medium text-slate-700"
                >
                  <span
                    className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-primary-500"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Lead tutor & owner */}
        <section className="border-y border-slate-200/80 bg-slate-900 px-6 py-20 text-white md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="order-2 lg:order-1">
              <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-2xl border border-white/25 bg-white/5 shadow-xl shadow-black/25 ring-1 ring-white/10 lg:mx-0">
                <Image
                  src={ELLIE_PORTRAIT_URL}
                  alt="Ellie Langford, lead tutor and owner of Brighter Futures Tutoring"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-sm font-semibold uppercase tracking-wider text-secondary-400">
                Lead tutor &amp; owner
              </p>
              <h2 className="mt-2 text-3xl font-bold leading-tight md:text-4xl">
                Ellie Langford
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-slate-300">
                Ellie founded Brighter Futures Tutoring with a simple aim: to
                help children feel confident and excited about learning. As
                lead tutor, she works closely with families to understand each
                child&apos;s strengths, challenges and goals—then designs
                sessions that are structured, supportive and genuinely
                enjoyable.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">
                Her approach combines clear teaching, patience and warmth—so
                learners know they&apos;re in safe hands whether they&apos;re
                catching up, stretching ahead or rebuilding confidence after a
                tricky patch at school.
              </p>
              <div className="mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-secondary-400 to-primary-500" />
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-24">
          <div
            className="mx-auto max-w-4xl overflow-hidden rounded-3xl px-8 py-14 text-center text-white md:px-12"
            style={{
              background: "linear-gradient(to bottom right, #2980B9, #6DD5FA)",
            }}
          >
            <p className="text-balance text-xl font-semibold leading-snug md:text-2xl">
              Ready to find out how we can support your child?
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
