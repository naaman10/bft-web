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
                <p className="text-sm text-slate-500">Last updated: 25/09/2026</p>
                
                <p>
                  These terms explain how the BFT Learn trial works, what information we collect and use, and what you are agreeing to when you allow your child to participate.
                </p>
                <p>
                  BFT Learn is operated by Brighter Futures Tutoring ("we", "us" or "our").
                </p>
                <p>
                  By consenting to your child participating in the trial, you confirm that you are the child's parent or legal guardian and that you have authority to provide this consent.
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                  1. What is BFT Learn?
                </h3>
                <p>
                  BFT Learn is a new online learning platform being developed by Brighter Futures Tutoring.
                </p>
                <p>
                  The platform is designed to support children's learning through features such as online learning activities, courses, assessments, educational games, points and rewards, and progress feedback.
                </p>
                <p>
                  BFT Learn is currently being trialled with a limited number of children and parents. The purpose of the trial is to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>provide participating children with additional learning activities;</li>
                  <li>understand how children and parents use the platform;</li>
                  <li>identify problems and areas that could be improved;</li>
                  <li>evaluate which features are useful and engaging; and</li>
                  <li>help us develop and improve BFT Learn before a wider release.</li>
                </ul>
                <p>
                  Because this is a trial, some features may change, be added or removed, or occasionally not work as expected.
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                  2. Your consent
                </h3>
                <p>
                  By agreeing to these terms, you give permission for your child to access and use BFT Learn for the purposes of learning and helping Brighter Futures Tutoring evaluate and improve the platform.
                </p>
                <p>
                  Participation is entirely voluntary.
                </p>
                <p>
                  Your decision about whether to participate in the BFT Learn trial will not affect your child's existing tutoring arrangements or their relationship with Brighter Futures Tutoring.
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                  3. Information we may collect
                </h3>
                <p>
                  To operate the trial, we may process information relating to you and your child.
                </p>
                <p>
                  Information about your child may include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>their name and account information;</li>
                  <li>age or information relevant to their learning level;</li>
                  <li>courses, lessons and activities assigned to them;</li>
                  <li>answers submitted during learning activities and assessments;</li>
                  <li>assessment results, scores and progress;</li>
                  <li>points, rewards or achievements;</li>
                  <li>activity and interactions with the platform; and</li>
                  <li>technical information necessary to operate, secure and improve the service.</li>
                </ul>
                <p>
                  We may also process information about you as the parent or guardian, such as your name, email address, relationship to the child, consent status and communications relating to the trial.
                </p>
                <p>
                  We will only collect information that is reasonably necessary to provide, administer, evaluate and improve BFT Learn.
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                  4. How we use your child's information
                </h3>
                <p>
                  Your child's information may be used to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>create and manage their BFT Learn account;</li>
                  <li>provide appropriate learning content and activities;</li>
                  <li>record answers, assessments and learning progress;</li>
                  <li>provide feedback about their learning;</li>
                  <li>operate features such as points, rewards and achievements;</li>
                  <li>understand how the platform is being used;</li>
                  <li>identify technical problems;</li>
                  <li>evaluate the effectiveness and usability of features; and</li>
                  <li>improve the design, content and functionality of BFT Learn.</li>
                </ul>
                <p>
                  Information collected through the trial will not be used for advertising to your child.
                </p>
                <p>
                  Where practical, we may use aggregated or anonymised information when analysing how the platform is performing and identifying improvements.
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                  5. Parent information and progress
                </h3>
                <p>
                  BFT Learn may provide you with information about your child's activity and progress, including completed activities, assessments, results or other learning information.
                </p>
                <p>
                  We may also contact you regarding the trial, including important service information, requests for feedback or information about changes to the trial.
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                  6. Trial access and charges
                </h3>
                <p>
                  Participation in the BFT Learn trial is free of charge.
                </p>
                <p>
                  You will not be charged a subscription fee or other platform fee for your child's participation during the trial, and participation does not create an obligation to purchase BFT Learn in the future.
                </p>
                <p>
                  If BFT Learn becomes a paid service following the trial, we will explain the applicable pricing and terms separately. You will not automatically become a paying customer and we will not charge you without your agreement.
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                  7. Withdrawing from the trial
                </h3>
                <p>
                  You can withdraw your child from the BFT Learn trial at any time and for any reason.
                </p>
                <p>
                  To withdraw, contact us at:{" "}
                  <a 
                    href="mailto:ellie@brighterfuturestutoring.com"
                    className="font-semibold text-primary-600 hover:text-primary-500"
                  >
                    ellie@brighterfuturestutoring.com
                  </a>
                </p>
                <p>
                  Once we receive your request, we will remove your child's access to the trial and deal with their personal information in accordance with our privacy obligations and applicable retention requirements.
                </p>
                <p>
                  Withdrawing from the trial will not affect your child's normal tutoring services with Brighter Futures Tutoring.
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                  8. Your child's use of BFT Learn
                </h3>
                <p>
                  BFT Learn is provided solely for educational purposes.
                </p>
                <p>
                  You agree that your child will use the platform for its intended learning purposes and that account access will not knowingly be shared with other people.
                </p>
                <p>
                  We may suspend or remove access where reasonably necessary to protect children, other users, the platform or its data.
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                  9. Trial service
                </h3>
                <p>
                  BFT Learn is under active development and is being provided as a trial service.
                </p>
                <p>
                  Although we will take reasonable steps to make the platform available and operate it safely, we cannot guarantee that the trial will always be available or completely free from errors.
                </p>
                <p>
                  We may change, temporarily suspend or discontinue features during the trial where necessary for development, testing, maintenance or security.
                </p>
                <p>
                  BFT Learn is intended to support your child's education and tutoring. It should not be considered a replacement for professional teaching, tutoring or the education provided by your child's school.
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                  10. Keeping information safe
                </h3>
                <p>
                  We will take appropriate technical and organisational measures to protect personal information processed through BFT Learn.
                </p>
                <p>
                  Access to personal information will be limited to people and service providers who require it to operate, support, secure or improve the platform.
                </p>
                <p>
                  Where we use third-party technology providers to operate BFT Learn, they will only be permitted to process personal information in accordance with our instructions and applicable data protection requirements.
                </p>
                <p>
                  Further information about how Brighter Futures Tutoring handles personal information can be found in our Privacy Notice: [LINK].
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                  11. Your data protection rights
                </h3>
                <p>
                  Depending on the circumstances, you and your child may have rights relating to personal information held about you, including rights to request access to information, request correction of inaccurate information, request deletion in certain circumstances, restrict certain processing, or object to certain uses.
                </p>
                <p>
                  You can contact us about your information or your child's information at: [PRIVACY EMAIL ADDRESS]
                </p>
                <p>
                  Withdrawing consent to participate in the trial does not affect the lawfulness of processing that took place before consent was withdrawn.
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                  12. Changes to the trial
                </h3>
                <p>
                  Because BFT Learn is being actively developed, we may make changes to the platform during the trial.
                </p>
                <p>
                  If we make a significant change that affects how your child's personal information is used or materially changes what you originally agreed to, we will provide you with appropriate information and, where necessary, request your consent again.
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                  13. Ending the trial
                </h3>
                <p>
                  Brighter Futures Tutoring may end the trial at any time.
                </p>
                <p>
                  When the trial ends, we will tell participating parents what happens next. Participation in the trial does not automatically enrol you or your child into any future paid version of BFT Learn.
                </p>

                <h3 className="text-xl font-semibold text-slate-900 mt-6 mb-3">
                  14. Contact us
                </h3>
                <p>
                  If you have questions about BFT Learn, the trial, your consent, or how information is being used, please contact:
                </p>
                <p className="font-semibold">
                  Brighter Futures Tutoring
                </p>
                <p>
                  Email:{" "}
                  <a 
                    href="mailto:ellie@brighterfuturestutoring.com"
                    className="font-semibold text-primary-600 hover:text-primary-500"
                  >
                    ellie@brighterfuturestutoring.com
                  </a>
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
