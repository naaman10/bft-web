import { LOCAL_AREA_PHRASE } from "@/lib/site-location";

export const SUBJECT_SLUGS = ["english", "maths", "11-plus-preparation"] as const;

export type SubjectSlug = (typeof SUBJECT_SLUGS)[number];

export type SubjectDefinition = {
  slug: SubjectSlug;
  /** Nav / breadcrumb label */
  label: string;
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  h1: string;
  intro: string;
  highlights: readonly string[];
};

export const SUBJECTS: Record<SubjectSlug, SubjectDefinition> = {
  english: {
    slug: "english",
    label: "English",
    metaTitle: "English Tutoring",
    metaDescription: `Confident reading, writing and SPaG support with engaging English tutoring for ages 5–14 ${LOCAL_AREA_PHRASE}.`,
    heroEyebrow: "English tutoring",
    h1: "Build literacy confidence with tailored English support",
    intro:
      "From phonics and fluency to comprehension and creative writing, we help children enjoy English and make steady progress—always matched to their level and goals.",
    highlights: [
      "Reading, writing and SPaG aligned to school expectations",
      "Activities designed to build confidence as well as skills",
      "Clear next steps so you always know how your child is progressing",
    ],
  },
  maths: {
    slug: "maths",
    label: "Maths",
    metaTitle: "Maths Tutoring",
    metaDescription: `Friendly, structured Maths tutoring for ages 5–14—number sense, reasoning and exam confidence ${LOCAL_AREA_PHRASE}.`,
    heroEyebrow: "Maths tutoring",
    h1: "Make sense of Maths with patient, structured support",
    intro:
      "We strengthen core understanding first—so children can tackle new topics with confidence. Sessions blend explanation, practice and problem-solving in a calm, encouraging environment.",
    highlights: [
      "Number, calculation, fractions, measure and more—pitched to your child",
      "Reasoning and problem-solving without the stress",
      "Pace and resources adapted to how your child learns best",
    ],
  },
  "11-plus-preparation": {
    slug: "11-plus-preparation",
    label: "11+ Preparation",
    metaTitle: "11+ Preparation Tutoring",
    metaDescription: `Focused 11+ preparation in English, Maths, verbal and non-verbal reasoning—supportive tuition for families ${LOCAL_AREA_PHRASE}.`,
    heroEyebrow: "11+ preparation",
    h1: "11+ preparation that balances rigour with reassurance",
    intro:
      "We help families navigate 11+ preparation with a clear plan: building skills, exam technique and resilience—without losing the joy of learning along the way.",
    highlights: [
      "English, Maths and reasoning skills taught in context—not just drills",
      "Timed practice introduced thoughtfully as confidence grows",
      "Honest guidance on next steps and realistic expectations",
    ],
  },
};

export function isSubjectSlug(value: string): value is SubjectSlug {
  return (SUBJECT_SLUGS as readonly string[]).includes(value);
}

/** Header / mobile nav links */
export const subjectNavLinks: { href: string; label: string }[] =
  SUBJECT_SLUGS.map((slug) => ({
    href: `/subjects/${slug}`,
    label: SUBJECTS[slug].label,
  }));
