import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { BftLearnConsentForm } from "@/components/BftLearnConsentForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbListJsonLd } from "@/lib/json-ld";
import { getSiteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "BFT Learn Test - Participation Consent",
  description:
    "Review the terms and conditions for participating in the BFT Learn test program.",
};

export default function BftLearnConsentPage() {
  const siteUrl = getSiteUrl();

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-800">
      <JsonLd
        data={breadcrumbListJsonLd(siteUrl, [
          { name: "Home", path: "/" },
          { name: "BFT Learn Consent", path: "/bft-learn-consent" },
        ])}
      />
      <main>
        <section
          className="relative -mt-[var(--site-header-height)] overflow-hidden pt-28 md:pt-32"
          style={{
            background:
              "linear-gradient(135deg, #2980B9 0%, #6DD5FA 55%, #7ec8e3 100%)",
          }}
        >
          <div className="pointer-events-none absolute -right-24 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-secondary-400/25 blur-3xl" />
          <div className="pointer-events-none absolute -left-32 bottom-0 h-64 w-64 rounded-full bg-primary-500/20 blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-6 md:pb-16">
            <p className="mb-3 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/90">
              BFT Learn Test
            </p>
            <h1 className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[2.75rem]">
              Participation Consent
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/90">
              Please review the terms and conditions below before participating
              in the BFT Learn test program.
            </p>
          </div>
        </section>

        <section className="relative -mt-6 px-6 pb-16 md:-mt-10 md:pb-24">
          <div className="mx-auto max-w-3xl rounded-3xl border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-900/[0.06] md:p-12">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">
                Terms and Conditions
              </h2>
              <div className="mt-6 space-y-4 text-slate-700 leading-relaxed">
                <p>
                  [PLACEHOLDER: Introduction paragraph explaining the purpose of
                  the BFT Learn test program and what participation entails.]
                </p>
                
                <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                  Data Collection and Usage
                </h3>
                <p>
                  [PLACEHOLDER: Details about what data will be collected during
                  the test, how it will be used, and how long it will be
                  retained.]
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                  Participant Rights
                </h3>
                <p>
                  [PLACEHOLDER: Information about participant rights including
                  the right to withdraw, data access requests, and privacy
                  protections.]
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                  Test Expectations
                </h3>
                <p>
                  [PLACEHOLDER: Details about what participants can expect
                  during the test, time commitments, and any requirements or
                  prerequisites.]
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                  Contact Information
                </h3>
                <p>
                  [PLACEHOLDER: Contact details for questions about the test
                  program or this consent form.]
                </p>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Consent to Participate
              </h2>
              <BftLearnConsentForm />
            </div>

            <p className="mt-8 border-t border-slate-100 pt-8 text-center text-sm text-slate-500">
              Need more information?{" "}
              <Link
                href="/contact"
                className="font-semibold text-primary-600 hover:text-primary-500"
              >
                Contact us
              </Link>
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
