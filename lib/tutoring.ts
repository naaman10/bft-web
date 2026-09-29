import { LOCAL_AREA_PHRASE } from "@/lib/site-location";

export const TUTORING_SLUGS = ["maths", "english", "reading", "spag", "11-plus"] as const;

export type TutoringSlug = (typeof TUTORING_SLUGS)[number];

export type TutoringSection = {
  title: string;
  intro: string;
  points: readonly string[];
};

export type TutoringPage = {
  slug: TutoringSlug;
  label: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  ctaLabel: string;
  sections: readonly TutoringSection[];
  callout?: {
    eyebrow: string;
    title: string;
    description: string;
  };
};

export const TUTORING_PAGES: Record<TutoringSlug, TutoringPage> = {
  maths: {
    slug: "maths",
    label: "Maths",
    navLabel: "Maths",
    metaTitle: "Maths Tutoring",
    metaDescription: `Friendly, structured Maths tutoring for ages 5–14—number sense, reasoning and exam confidence ${LOCAL_AREA_PHRASE}.`,
    eyebrow: "Maths tutoring",
    h1: "Make sense of Maths with patient, structured support",
    intro:
      "We strengthen core understanding first, so children can tackle new topics with confidence. Sessions blend explanation, practice and problem-solving in a calm, encouraging environment.",
    ctaLabel: "Enquire about Maths tutoring",
    sections: [
      {
        title: "Number confidence and fluency",
        intro: "Core number understanding comes first, so later topics have something secure to build on.",
        points: [
          "Place value, operations and arithmetic at the right level",
          "Mental methods that improve accuracy as well as speed",
          "Times tables and number facts through short, regular practice",
          "Clear methods so children understand why a step works",
        ],
      },
      {
        title: "Reasoning and problem-solving",
        intro: "Children learn how to read a problem and choose a method, not only how to complete a calculation.",
        points: [
          "Multi-step questions broken into manageable stages",
          "Word problems that ask what the question is really requesting",
          "Diagrams and worked examples used where they help",
          "Mistakes reviewed so the same slip is less likely next time",
        ],
      },
      {
        title: "School topics and gaps",
        intro: "Lessons follow what school is asking for, and go back when an earlier skill is getting in the way.",
        points: [
          "Fractions, decimals and percentages with clear connections between them",
          "Measure, shape and data in practical questions",
          "Age-appropriate algebra and written methods",
          "Review before new content, so gaps do not keep stacking up",
        ],
      },
    ],
  },
  english: {
    slug: "english",
    label: "English",
    navLabel: "English",
    metaTitle: "English Tutoring",
    metaDescription: `Reading, writing and SPaG tutoring for ages 5–14, matched to your child's level ${LOCAL_AREA_PHRASE}.`,
    eyebrow: "English tutoring",
    h1: "Build literacy confidence with tailored English support",
    intro:
      "From early reading to composition and grammar, English tutoring is matched to your child's level and school expectations. The aim is steady progress and a child who is willing to have a go.",
    ctaLabel: "Enquire about English tutoring",
    sections: [
      {
        title: "Reading and comprehension",
        intro: "Sessions build fluent reading and the habit of explaining what a text is doing.",
        points: [
          "Retrieval, inference and explanation with fiction and non-fiction",
          "Vocabulary taken from the text, not from a disconnected list",
          "A clear way to approach comprehension questions",
          "Practice that builds confidence for classwork and assessments",
        ],
      },
      {
        title: "Writing",
        intro: "Children plan, draft and improve writing for real purposes, not only for a checklist.",
        points: [
          "Sentence control, paragraphs and writing that holds together",
          "Creative and factual writing matched to school tasks",
          "Planning frames that make a blank page less daunting",
          "Editing for clarity, grammar and effect",
        ],
      },
      {
        title: "Spelling, punctuation and grammar",
        intro: "SPaG is taught so children can use it in their own writing, not only name the terms.",
        points: [
          "Grammar through examples and short practice",
          "Punctuation that changes meaning, not only marks on a page",
          "Spelling patterns and the words that do not follow them",
          "Chances to apply the skill in a piece of writing",
        ],
      },
    ],
  },
  reading: {
    slug: "reading",
    label: "Reading",
    navLabel: "Reading",
    metaTitle: "Reading Tutoring",
    metaDescription: `Reading tutoring for fluency, vocabulary and comprehension, for ages 5–14 ${LOCAL_AREA_PHRASE}.`,
    eyebrow: "Reading tutoring",
    h1: "Help your child read with understanding, not only accuracy",
    intro:
      "Some children can read every word and still struggle to say what a page means. Reading tutoring works on fluency, vocabulary and comprehension, and on making reading feel worth doing.",
    ctaLabel: "Enquire about reading tutoring",
    sections: [
      {
        title: "Fluency",
        intro: "A child who is still working hard to decode has little attention left for meaning.",
        points: [
          "Reading aloud at a pace that stays accurate",
          "Phrase and sentence reading, not only single words",
          "Texts chosen so the challenge is real but manageable",
          "Short sessions that protect confidence",
        ],
      },
      {
        title: "Comprehension",
        intro: "We practise retrieving facts, reading between the lines and pointing to the evidence.",
        points: [
          "What the text says, and what it suggests",
          "Predictions and summaries that keep the main idea",
          "Questions that ask why, not only what",
          "Strategies children can use with school reading too",
        ],
      },
      {
        title: "Books they will actually finish",
        intro: "Reluctant readers need material they care about, not only the next book on a scheme.",
        points: [
          "Fiction, non-fiction, comics and shorter texts",
          "Permission to stop a book that is not working",
          "Talk about stories, so reading is a conversation",
          "A path back into longer books when they are ready",
        ],
      },
    ],
  },
  spag: {
    slug: "spag",
    label: "SPaG",
    navLabel: "SPaG",
    metaTitle: "SPaG Tutoring",
    metaDescription: `Spelling, punctuation and grammar tutoring that helps children write more clearly ${LOCAL_AREA_PHRASE}.`,
    eyebrow: "SPaG tutoring",
    h1: "Spelling, punctuation and grammar that show up in real writing",
    intro:
      "SPaG tutoring covers the terminology schools expect, and the more useful part: children who can spot an error and choose a clearer sentence. It suits primary age children who need the rules to make sense.",
    ctaLabel: "Enquire about SPaG tutoring",
    sections: [
      {
        title: "Spelling",
        intro: "Patterns, prefixes and the awkward words that do not follow the rule.",
        points: [
          "Building on phonics into longer words",
          "Prefixes, suffixes and word families",
          "Homophones and the spellings children mix up",
          "A short list of personal errors, revisited often",
        ],
      },
      {
        title: "Punctuation",
        intro: "From capital letters and full stops through to punctuation that keeps a sentence clear.",
        points: [
          "Sentence boundaries and question marks",
          "Apostrophes, commas and speech punctuation when they are ready",
          "Parenthesis, colons and semicolons in upper Key Stage 2",
          "Practice inside sentences, not only on a worksheet",
        ],
      },
      {
        title: "Grammar in use",
        intro: "Naming a word class is useful. Using it to improve a sentence is the point.",
        points: [
          "Nouns, verbs, adjectives and conjunctions taught with examples",
          "Clauses and sentence variety in Years 5 and 6",
          "Editing a child's own writing",
          "Links to reading, so grammar is seen in print first",
        ],
      },
    ],
  },
  "11-plus": {
    slug: "11-plus",
    label: "11+",
    navLabel: "11+",
    metaTitle: "11+ Tutoring",
    metaDescription: `11+ preparation in English, Maths and reasoning, paced for the child ${LOCAL_AREA_PHRASE}.`,
    eyebrow: "11+ tutoring",
    h1: "11+ preparation with enough time to build skill and confidence",
    intro:
      "Preparation is planned around the exam your child will sit, their current strengths and the gaps that will matter later. Sessions cover English, Maths and, where the paper requires them, verbal and non-verbal reasoning.",
    ctaLabel: "Enquire about 11+ tutoring",
    callout: {
      eyebrow: "Exam formats",
      title: "The paper is not the same in every area",
      description:
        "Grammar schools do not all use the same exam. Some still assess reasoning. Others have moved towards different English and Maths formats. We check the current admissions information for the schools you are considering and practise the skills those papers actually reward.",
    },
    sections: [
      {
        title: "English and comprehension",
        intro: "Vocabulary, inference and careful reading matter on most 11+ papers.",
        points: [
          "Comprehension that asks for evidence, not a guess",
          "Vocabulary in context",
          "Spelling, punctuation and grammar where the exam includes them",
          "Writing tasks when the format requires them",
        ],
      },
      {
        title: "Maths",
        intro: "Secure primary Maths, then the problem-solving the paper wraps around it.",
        points: [
          "Arithmetic that does not use up all of the thinking time",
          "Fractions, measure and multi-step problems",
          "Questions that look unfamiliar but use familiar skills",
          "Timing added once accuracy is reliable",
        ],
      },
      {
        title: "Reasoning and exam technique",
        intro: "Used when the entrance exam includes them, and introduced after the underlying skills are in place.",
        points: [
          "Verbal reasoning question types and why an answer is right",
          "Non-verbal patterns, sequences and spatial questions",
          "When to move on, and how to use the answer sheet",
          "Practice papers as a check, not as the whole programme",
        ],
      },
    ],
  },
};

export function isTutoringSlug(value: string): value is TutoringSlug {
  return (TUTORING_SLUGS as readonly string[]).includes(value);
}

export const tutoringNavLinks: { href: string; label: string }[] = TUTORING_SLUGS.map((slug) => ({
  href: `/tutoring/${slug}`,
  label: TUTORING_PAGES[slug].navLabel,
}));
