import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { ContactPageForm } from "@/components/ContactPageForm";
import { LOCAL_AREA_META } from "@/lib/site-location";

export const metadata: Metadata = {
  title: "Contact | Brighter Futures Tutoring",
  description:
    `Get in touch about 1:1, group or home-ed tutoring for children aged 5–14 in Maths, Reading and SPaG. ${LOCAL_AREA_META}`,
};

export default function ContactPage() {
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

          <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-6 md:pb-16">
            <p className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/90">
              Get started
            </p>
            <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[2.75rem]">
              Contact us
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">
              Tell us a little about your child and what you&apos;re looking
              for. We support families in and around the Greater Manchester area
              and will get back to you as soon as we can.
            </p>
          </div>
        </section>

        <section className="relative -mt-6 px-6 pb-16 md:-mt-10 md:pb-24">
          <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-900/[0.06] md:p-12">
            <div className="mb-8 text-center">
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Send an enquiry
              </h2>
              <p className="mt-2 text-slate-600">
                Fill in the form below and we&apos;ll reply as soon as we can.
              </p>
            </div>
            <ContactPageForm />
            <p className="mt-8 border-t border-slate-100 pt-8 text-center text-sm text-slate-500">
              Prefer to browse first?{" "}
              <Link
                href="/"
                className="font-semibold text-primary-600 hover:text-primary-500"
              >
                Back to home
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
