import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import type { ReactNode } from "react";
import type { ReviewEntry } from "@/lib/contentful";
import { LOCAL_AREA_PHRASE } from "@/lib/site-location";

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
  reviews?: ReviewEntry[];
}

export function Testimonials({ reviews }: TestimonialsProps) {
  if (!reviews || reviews.length === 0) return null;

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
            {reviews.map((item) => (
              <div
                key={item.id}
                className="pt-8 sm:inline-block sm:w-full sm:px-4 sm:text-base"
              >
                <figure className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-900/5">
                  <blockquote className="text-base leading-7 text-slate-700">
                    {documentToReactComponents(item.reviewText, richTextOptions)}
                  </blockquote>
                  <figcaption className="mt-6 flex items-center gap-x-4 border-t border-slate-100 pt-6">
                    <div
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-100 text-sm font-semibold text-primary-700 ring-2 ring-primary-500/10"
                      aria-hidden
                    >
                      {initialsFromParentName(item.parentName)}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">{item.parentName}</div>
                      {item.location ? (
                        <div className="text-sm text-slate-600">{item.location}</div>
                      ) : null}
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
