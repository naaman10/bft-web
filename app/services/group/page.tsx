import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { ServiceHeroImage } from "@/components/ServiceHeroImage";
import { SERVICE_IMAGE_GROUP } from "@/lib/service-images";
import { LOCAL_AREA_META } from "@/lib/site-location";

export const metadata: Metadata = {
  title: "Group Tutoring Sessions | Brighter Futures Tutoring",
  description:
    `Support your child's learning in a fun, structured group environment with expert teaching and peer interaction. ${LOCAL_AREA_META}`,
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

const differentiators = [
  {
    title: "Expert support",
    blurb:
      "Each session is carefully planned and led by an experienced tutor, ensuring your child receives high-quality guidance and structured learning.",
  },
  {
    title: "Peer support",
    blurb:
      "Children learn best when they feel supported. Our small group setting encourages collaboration, builds confidence and creates a positive learning environment where every child feels comfortable to participate.",
  },
  {
    title: "Fun, engaging sessions",
    blurb:
      "We incorporate group games, challenges and interactive activities to keep learning exciting while reinforcing key skills in Maths, SPaG and Reading.",
  },
];

const whyChoose = [
  "Builds confidence through shared learning",
  "Encourages teamwork and communication",
  "Keeps children motivated and engaged",
  "Combines learning with fun and interaction",
];

export default function GroupSessionsPage() {
  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-800">
      <main>
        <section
          className="relative overflow-hidden pt-28 md:pt-32"
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
                Group tutoring
              </p>
              <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[2.75rem]">
                Group Tutoring Sessions
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">
                Support your child&apos;s learning in a fun, structured and
                encouraging group environment. Sessions run for families across
                Greater Manchester and nearby areas.
              </p>
              <Link
                href="/contact?service=group"
                className="mt-8 inline-flex items-center rounded-2xl bg-primary-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary-900/20 transition hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent"
              >
                Enquire about availability
              </Link>
            </div>
            <div className="md:col-span-5">
              <ServiceHeroImage
                src={SERVICE_IMAGE_GROUP}
                alt="Group tutoring session illustration"
              />
            </div>
          </div>
        </section>

        <section className="relative -mt-6 px-6 pb-16 md:-mt-10 md:pb-24">
          <div className="mx-auto max-w-6xl rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-900/[0.06] md:p-12 lg:p-14">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
              <div className="order-2 lg:order-1">
                <img
                  src="https://res.cloudinary.com/njh101010/image/upload/v1774446241/brighterfutures/Images/bft-group.jpg"
                  alt="Group tutoring session — students learning together"
                  className="w-full max-h-96 object-cover rounded-2xl shadow-md"
                  loading="lazy"
                />
              </div>
              <div className="order-1 lg:order-2">
                <span className="text-sm font-semibold uppercase tracking-wider text-primary-600">
                  How it works
                </span>
                <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
                  Expert teaching meets peer interaction
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-slate-600">
                  Our group sessions combine expert teaching with peer
                  interaction, helping children stay motivated, engaged and
                  confident as they learn alongside others.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 pb-20">
          <div className="mx-auto max-w-6xl">
            <div className="mb-12 max-w-2xl">
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">
                What makes our group sessions different?
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-3">
              {differentiators.map((item, i) => (
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
                  <p className="relative mt-4 text-sm leading-relaxed text-slate-600">
                    {item.blurb}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-slate-200/80 bg-slate-900 px-6 py-20 text-white md:py-24">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold leading-tight md:text-4xl">
                Why parents choose group tutoring
              </h2>
              <ul className="mt-8 space-y-4 text-lg leading-relaxed text-slate-300">
                {whyChoose.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-secondary-400"
                      aria-hidden
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-secondary-400 to-primary-500" />
            </div>
            <div>
              <div
                className="flex min-h-[280px] items-center justify-center overflow-hidden rounded-2xl border-2 border-white/30 bg-white/5 text-center text-sm font-medium text-slate-400 backdrop-blur-sm"
                role="img"
                aria-label="Supporting image for group tutoring benefits"
              >
                <img
                  src="https://res.cloudinary.com/njh101010/image/upload/v1774524122/bft-group-2_aszfbh.avif"
                  alt="Children collaborating and learning in a group"
                  className="w-full h-full object-cover"
                  style={{ minHeight: 280, borderRadius: "1rem" }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 md:py-24">
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2">
            <article className="rounded-3xl border border-secondary-200/80 bg-gradient-to-br from-secondary-50 to-white p-10 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary-400 text-lg font-bold text-secondary-950">
                ◎
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Small groups, big impact
              </h3>
              <p className="mt-4 leading-relaxed text-slate-600">
                We keep numbers low so tutors can give every child meaningful
                support while still unlocking the energy and motivation that
                comes from learning with peers.
              </p>
            </article>

            <article className="rounded-3xl border border-primary-200 bg-gradient-to-br from-primary-50 to-white p-10 shadow-sm">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-500 text-lg font-bold text-white">
                ★
              </div>
              <h3 className="text-2xl font-bold text-slate-900">
                Limited availability
              </h3>
              <p className="mt-4 leading-relaxed text-slate-600">
                Spaces are limited to keep groups small and effective. Enquire
                today to secure your child&apos;s place.
              </p>
            </article>
          </div>
        </section>

        <section className="px-6 pb-24">
          <div
            className="mx-auto max-w-4xl overflow-hidden rounded-3xl px-8 py-14 text-center text-white md:px-12"
            style={{
              background: "linear-gradient(to bottom right, #2980B9, #6DD5FA)",
            }}
          >
            <p className="text-balance text-xl font-semibold leading-snug md:text-2xl">
              Get in touch today to enquire about group session availability.
            </p>
            <Link
              href="/contact?service=group"
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
