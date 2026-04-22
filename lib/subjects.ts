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
  sections?: readonly {
    title: string;
    intro: string;
    points: readonly string[];
  }[];
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
    sections: [
      {
        title: "Reading and comprehension",
        intro:
          "We build fluent, thoughtful readers who can understand texts deeply and answer with confidence.",
        points: [
          "Inference, retrieval and explanation skills using age-appropriate fiction and non-fiction",
          "Vocabulary building strategies to improve understanding and expression",
          "Structured methods for approaching comprehension questions clearly",
          "Targeted practice to improve confidence under classroom and assessment conditions",
        ],
      },
      {
        title: "Writing and composition",
        intro:
          "Writing sessions focus on helping pupils communicate ideas clearly, creatively and accurately.",
        points: [
          "Sentence control, paragraph structure and cohesive writing flow",
          "Creative and transactional writing tailored to school expectations",
          "Planning frameworks that reduce overwhelm and improve quality",
          "Editing and redrafting habits that strengthen clarity and impact",
        ],
      },
      {
        title: "SPaG foundations",
        intro:
          "Strong spelling, punctuation and grammar are taught in context so pupils can apply them naturally in their own work.",
        points: [
          "Grammar essentials taught through practical examples and drills",
          "Punctuation confidence to improve accuracy and meaning",
          "Spelling patterns and memory techniques for long-term retention",
          "Application tasks that bridge isolated practice to real writing",
        ],
      },
      {
        title: "Progress, confidence and feedback",
        intro:
          "Every step is tracked so families can see exactly how literacy skills are improving over time.",
        points: [
          "Clear lesson goals and measurable progress points",
          "Regular feedback on strengths, next priorities and home support ideas",
          "Adaptive lesson pacing based on confidence and performance",
          "A calm, encouraging approach that helps children enjoy English again",
        ],
      },
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
    sections: [
      {
        title: "Number confidence and fluency",
        intro:
          "We strengthen core number understanding so children can solve questions accurately and with less hesitation.",
        points: [
          "Place value, operations and arithmetic fluency at the right level",
          "Mental maths strategies that improve speed and confidence",
          "Times tables and number facts built through consistent, engaging practice",
          "Method clarity so children understand the why, not just the steps",
        ],
      },
      {
        title: "Reasoning and problem-solving",
        intro:
          "Children learn how to think mathematically, not just complete calculations.",
        points: [
          "Multi-step reasoning questions broken into manageable thinking steps",
          "Word-problem strategy for choosing the right method with confidence",
          "Use of diagrams, models and worked examples to support understanding",
          "Error analysis that turns mistakes into reliable learning wins",
        ],
      },
      {
        title: "Key curriculum topics",
        intro:
          "Lessons cover the topics children need for school success while filling any foundational gaps.",
        points: [
          "Fractions, decimals and percentages taught with clear visual methods",
          "Measure, shape, geometry and data handling in practical contexts",
          "Arithmetic and algebraic thinking introduced in age-appropriate ways",
          "Review cycles to secure learning before moving to new content",
        ],
      },
      {
        title: "Assessment practice and feedback",
        intro:
          "We prepare pupils for classroom tests and exams with a confident, low-pressure approach.",
        points: [
          "Timed and mixed-question practice introduced at the right moment",
          "Exam technique support: checking, pacing and method presentation",
          "Regular family feedback with practical next steps",
          "Curated lesson plans that adapt as progress and confidence grow",
        ],
      },
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
      "We help families navigate 11+ preparation with a clear plan across English, Maths, verbal reasoning and non-verbal reasoning. Sessions build skills, exam technique and resilience—without losing the joy of learning along the way.",
    highlights: [
      "English coverage includes comprehension, vocabulary, spelling, punctuation and grammar, and structured writing tasks",
      "Maths coverage includes arithmetic fluency, word problems, multi-step reasoning and exam-style methods",
      "Verbal reasoning practice covers code, sequence and logic question types with clear strategies",
      "Non-verbal reasoning practice covers shape, pattern and spatial questions to build speed and accuracy",
      "Timed practice and mock-style tasks are introduced thoughtfully as confidence grows",
      "Honest guidance on school formats, realistic next steps and where to focus revision time",
    ],
    sections: [
      {
        title: "English",
        intro:
          "English work develops both core accuracy and confident expression, so pupils can tackle a wide range of 11+ question styles.",
        points: [
          "Comprehension strategies for fiction and non-fiction texts",
          "Vocabulary development with high-value words and context clues",
          "Spelling, punctuation and grammar foundations for precision",
          "Structured writing practice for clarity, organisation and style",
        ],
      },
      {
        title: "Maths",
        intro:
          "Maths sessions focus on secure understanding first, then exam-style application under realistic time pressure.",
        points: [
          "Arithmetic fluency and number confidence without over-reliance on rote methods",
          "Word problems and multi-step reasoning with clear workings",
          "Fractions, percentages, ratio and measure in mixed question formats",
          "Exam-style practice to build both method and speed",
        ],
      },
      {
        title: "Verbal Reasoning",
        intro:
          "Verbal reasoning is taught through repeatable methods so pupils can recognise patterns quickly and reduce avoidable mistakes.",
        points: [
          "Code, sequence, analogy and relationship question types",
          "Language-based logic and deduction skills",
          "Technique drills that improve pace and consistency",
          "Error analysis to target weak question families",
        ],
      },
      {
        title: "Non-Verbal Reasoning",
        intro:
          "Non-verbal reasoning sessions build visual processing and spatial confidence using progressive, timed challenge.",
        points: [
          "Shape transformations, symmetry and rotation patterns",
          "Matrix and sequence puzzles with step-by-step strategy",
          "Spatial reasoning tasks to improve visual logic",
          "Timed sets to strengthen speed, focus and accuracy",
        ],
      },
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
