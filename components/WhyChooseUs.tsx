import Link from "next/link";
import { LOCAL_AREA_PHRASE } from "@/lib/site-location";

function IconAcademicCap({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.905 59.905 0 0 1 12 3.493a59.902 59.902 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm6 0a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm6.75 2.25v-8.19a.75.75 0 0 0-.52-.72l-11.25-3.75a.75.75 0 0 0-.48 0L3.27 8.34a.75.75 0 0 0-.52.72v8.19a.75.75 0 0 0 1.09.67l5.22-3.26a.75.75 0 0 1 .78 0l5.22 3.26a.75.75 0 0 0 1.09-.67Z"
      />
    </svg>
  );
}

function IconSparkles({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
      />
    </svg>
  );
}

function IconChatBubble({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
      />
    </svg>
  );
}

const pillars = [
  {
    title: "Truly personalised learning",
    description:
      "Sessions are built around your child’s strengths, gaps and goals—not a one-size-fits-all worksheet pack. We adapt pace, examples and explanations so they feel capable, not overwhelmed.",
    Icon: IconAcademicCap,
  },
  {
    title: "Confidence through enjoyment",
    description:
      "When children enjoy learning, they engage more deeply. We use games, challenges and encouragement so tuition feels supportive and energising—not another chore on the list.",
    Icon: IconSparkles,
  },
  {
    title: "You stay in the loop",
    description:
      "Regular, plain-English updates on progress and next steps—so you always know how things are going and how you can help at home between sessions.",
    Icon: IconChatBubble,
  },
] as const;

export function WhyChooseUs() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      {/* Brand gradient + depth (aligned with service / about heroes) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(145deg, #1a4a6e 0%, #2980B9 42%, #6DD5FA 100%)",
        }}
      />
      <div className="pointer-events-none absolute -right-20 top-1/4 h-72 w-72 rounded-full bg-primary-400/25 blur-3xl" />
      <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-primary-500/25 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.04%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-90" />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Intro column */}
          <div className="lg:col-span-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary-200">
              Why choose us
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-[2.35rem]">
              Tutoring that fits your child—and your family
            </h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-white/85">
              We work with families {LOCAL_AREA_PHRASE}, combining structure,
              warmth and clear communication so you see real progress without
              the guesswork.
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-4 sm:max-w-md">
              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
                <dt className="text-xs font-semibold uppercase tracking-wide text-primary-200">
                  Ages
                </dt>
                <dd className="mt-1 text-xl font-bold text-white">5–14</dd>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm">
                <dt className="text-xs font-semibold uppercase tracking-wide text-primary-200">
                  Focus
                </dt>
                <dd className="mt-1 text-sm font-semibold leading-snug text-white">
                  Core skills &amp; confidence
                </dd>
              </div>
            </dl>

            <Link
              href="/contact"
              className="mt-10 inline-flex min-h-[3.25rem] items-center justify-center rounded-2xl bg-primary-500 px-10 py-4 text-base font-semibold text-white shadow-lg shadow-slate-900/25 transition hover:bg-primary-400 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-transparent md:min-h-[3.5rem] md:px-12 md:py-4 md:text-lg"
            >
              Get started
            </Link>
          </div>

          {/* Pillars */}
          <div className="flex flex-col gap-4 lg:col-span-7">
            {pillars.map((item) => {
              const Icon = item.Icon;
              return (
                <div
                  key={item.title}
                  className="group flex gap-5 rounded-2xl border border-white/15 bg-white/[0.08] p-5 shadow-lg shadow-slate-900/10 backdrop-blur-md transition hover:border-white/25 hover:bg-white/[0.12] md:gap-6 md:p-6"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary-500 text-white shadow-md ring-2 ring-white/25 transition group-hover:scale-[1.02] group-hover:bg-primary-400">
                    <Icon className="h-7 w-7" aria-hidden />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-lg font-semibold text-white md:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/75 md:text-base md:leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
