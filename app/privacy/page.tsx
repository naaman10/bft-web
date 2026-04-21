import type { Metadata } from "next";
import { readFile } from "fs/promises";
import path from "path";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbListJsonLd } from "@/lib/json-ld";
import { getSiteUrl } from "@/lib/site";
import { LOCAL_AREA_META } from "@/lib/site-location";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How we collect, use and protect personal information. ${LOCAL_AREA_META}`,
};

export default async function PrivacyPage() {
  const html = await readFile(
    path.join(process.cwd(), "content/privacy-policy.html"),
    "utf8"
  );
  const siteUrl = getSiteUrl();

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-800">
      <JsonLd
        data={breadcrumbListJsonLd(siteUrl, [
          { name: "Home", path: "/" },
          { name: "Privacy policy", path: "/privacy" },
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
              Legal
            </p>
            <p className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl lg:text-[2.75rem]">
              Privacy policy
            </p>
          </div>
        </section>

        <section className="relative -mt-6 px-6 pb-16 md:-mt-10 md:pb-24">
          <div className="mx-auto max-w-4xl rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-900/[0.06] md:p-10 lg:p-12">
            <div
              className="privacy-policy-html max-w-none text-slate-800 [&_a]:text-primary-600 [&_a]:underline [&_a:hover]:text-primary-500"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
