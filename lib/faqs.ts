/** Matches Contentful category validations — order used for display. */
export const FAQ_CATEGORY_ORDER = [
  "General",
  "Sessions & Learning",
  "Progress & Feedback",
  "Home Education",
  "Booking & Availability",
] as const;

export type FaqCategory = (typeof FAQ_CATEGORY_ORDER)[number];

export function sortFaqCategories(categories: string[]): string[] {
  const unique = Array.from(new Set(categories));
  return unique.sort((a, b) => {
    const ia = FAQ_CATEGORY_ORDER.indexOf(a as FaqCategory);
    const ib = FAQ_CATEGORY_ORDER.indexOf(b as FaqCategory);
    if (ia === -1 && ib === -1) return a.localeCompare(b);
    if (ia === -1) return 1;
    if (ib === -1) return -1;
    return ia - ib;
  });
}

/** Stable sort: category order, then question (en-GB). */
export function sortFaqs<
  T extends { category: string; question: string },
>(entries: T[]): T[] {
  return [...entries].sort((a, b) => {
    const ai = FAQ_CATEGORY_ORDER.indexOf(a.category as FaqCategory);
    const bi = FAQ_CATEGORY_ORDER.indexOf(b.category as FaqCategory);
    const ac = ai === -1 ? 999 : ai;
    const bc = bi === -1 ? 999 : bi;
    if (ac !== bc) return ac - bc;
    return a.question.localeCompare(b.question, "en-GB");
  });
}
