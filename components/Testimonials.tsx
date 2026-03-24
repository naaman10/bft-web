import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import type { ReactNode } from "react";
import type { ReviewEntry } from "@/lib/contentful";
import { LOCAL_AREA_PHRASE } from "@/lib/site-location";

const fallbackTestimonials = [
  {
    quote:
      "Our daughter was really anxious about maths. After a few weeks her tutor had her actually looking forward to sessions — we can’t thank you enough.",
    name: "Sarah M.",
    role: "Parent of a Year 5 learner",
    initials: "SM",
  },
  {
    quote:
      "The weekly feedback is gold. We always know what she’s working on and what to practise at home. It feels like a real partnership.",
    name: "James T.",
    role: "Parent of a Year 7 learner",
    initials: "JT",
  },
  {
    quote:
      "Small group sessions were the perfect middle ground — social enough to stay motivated, but still structured and calm. Highly recommend.",
    name: "Priya K.",
    role: "Parent of a Year 6 learner",
    initials: "PK",
  },
  {
    quote:
      "Reading and SPaG were our worry areas. The sessions are fun and the progress reports show exactly how far he’s come.",
    name: "Emma L.",
    role: "Parent of a Year 4 learner",
    initials: "EL",
  },
  {
    quote:
      "Home-ed can feel isolating; having consistent, friendly support for core subjects has made such a difference to our routine.",
    name: "Daniel R.",
    role: "Home-educating parent",
    initials: "DR",
  },
  {
    quote:
      "Professional, warm, and genuinely tuned in to how our son learns. He’s more confident walking into school every day.",
    name: "Rachel H.",
    role: "Parent of a Year 8 learner",
    initials: "RH",
  },
  {
    quote:
      "We tried a few tutors before — this is the first time our child has asked when the next session is. The balance of structure and fun is spot on.",
    name: "Michael B.",
    role: "Parent of a Year 3 learner",
    initials: "MB",
  },
  {
    quote:
      "SPaG used to be a battle at homework time. Now she explains the rules to us. Small steps, but they’ve made a huge difference.",
    name: "Aisha N.",
    role: "Parent of a Year 6 learner",
    initials: "AN",
  },
  {
    quote:
      "Clear communication from day one, flexible around our shifts, and real honesty about what he needs next. Exactly what we were looking for.",
    name: "Chris W.",
    role: "Parent of a Year 9 learner",
    initials: "CW",
  },
] as const;

function initialsFromParentName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) {
    const w = parts[0];
    if (w.length === 1) return `${w}${w}`.toUpperCase();
    return w.slice(0, 2).toUpperCase();
  }
  const a = parts[0][0] ?? "";
  const b = parts[parts.length - 1][0] ?? "";
  return `${a}${b}`.toUpperCase();
}

const richTextOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node: unknown, children: ReactNode) => (
      <p className="mb-3 last:mb-0">{children}</p>
    ),
  },
};

export interface TestimonialsProps {
  /** When provided and non-empty, replaces built-in dummy testimonials. */
  reviews?: ReviewEntry[];
}

export function Testimonials({ reviews }: TestimonialsProps) {
  const fromCms = reviews && reviews.length > 0;

  return (
    <section className="bg-gradient-to-b from-secondary-50/80 via-white to-[#f9fafb] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-600">
            Testimonials
          </p>
          <h2 className="mt-2 font-serif text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            What parents say
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Feedback from families we&apos;ve supported {LOCAL_AREA_PHRASE}.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
          <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
            {fromCms
              ? reviews.map((item) => (
                  <div
                    key={item.id}
                    className="pt-8 sm:inline-block sm:w-full sm:px-4 sm:text-base"
                  >
                    <figure className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-900/5">
                      <blockquote className="text-base leading-7 text-slate-700">
                        {documentToReactComponents(
                          item.reviewText,
                          richTextOptions
                        )}
                      </blockquote>
                      <figcaption className="mt-6 flex items-center gap-x-4 border-t border-slate-100 pt-6">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700 ring-2 ring-primary-500/10"
                          aria-hidden
                        >
                          {initialsFromParentName(item.parentName)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">
                            {item.parentName}
                          </div>
                          {item.location ? (
                            <div className="text-sm text-slate-600">
                              {item.location}
                            </div>
                          ) : null}
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                ))
              : fallbackTestimonials.map((item) => (
                  <div
                    key={item.name}
                    className="pt-8 sm:inline-block sm:w-full sm:px-4 sm:text-base"
                  >
                    <figure className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-900/5">
                      <blockquote className="text-base leading-7 text-slate-700">
                        <p>&ldquo;{item.quote}&rdquo;</p>
                      </blockquote>
                      <figcaption className="mt-6 flex items-center gap-x-4 border-t border-slate-100 pt-6">
                        <div
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700 ring-2 ring-primary-500/10"
                          aria-hidden
                        >
                          {item.initials}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">
                            {item.name}
                          </div>
                          <div className="text-sm text-slate-600">{item.role}</div>
                        </div>
                      </figcaption>
                    </figure>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </section>
  );
}
