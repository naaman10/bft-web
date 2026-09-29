export const LOCATION_SLUGS = [
  "hull",
  "hessle",
  "brough",
  "howden",
  "market-weighton",
  "greater-manchester",
  "trafford",
  "sale",
  "altrincham",
] as const;

export type LocationSlug = (typeof LOCATION_SLUGS)[number];

export type LocationPage = {
  slug: LocationSlug;
  name: string;
  region: "East Yorkshire" | "Greater Manchester";
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  details: string;
  nearby: readonly LocationSlug[];
};

export const LOCATION_PAGES: Record<LocationSlug, LocationPage> = {
  hull: {
    slug: "hull",
    name: "Hull",
    region: "East Yorkshire",
    metaTitle: "Tutoring in Hull",
    metaDescription: `Maths, English, reading, SPaG and 11+ tutoring for families in Hull and nearby East Yorkshire.`,
    h1: "Tutoring for families in Hull",
    intro:
      "Brighter Futures supports children in Hull with Maths, English, reading, SPaG and 11+ preparation. Sessions are matched to the child, whether the aim is to close a gap, rebuild confidence or prepare for an entrance exam.",
    details:
      "Hull families often want support that fits around school without turning every evening into revision. We start from what your child can already do, then focus the time where it changes progress.",
    nearby: ["hessle", "brough", "howden"],
  },
  hessle: {
    slug: "hessle",
    name: "Hessle",
    region: "East Yorkshire",
    metaTitle: "Tutoring in Hessle",
    metaDescription: `Personalised tutoring in Hessle for ages 5–14, including Maths, English, reading and SPaG.`,
    h1: "Tutoring for families in Hessle",
    intro:
      "Hessle families can get the same personalised tutoring we offer across East Yorkshire: Maths, English, reading, SPaG and, where it is relevant, 11+ preparation.",
    details:
      "Hessle sits just west of Hull, and many children here are in Hull or East Riding schools. Tutoring follows your child's school expectations and the specific skill that is holding them up, rather than a generic worksheet pack.",
    nearby: ["hull", "brough", "howden"],
  },
  brough: {
    slug: "brough",
    name: "Brough",
    region: "East Yorkshire",
    metaTitle: "Tutoring in Brough",
    metaDescription: `Tutoring in Brough for Maths, English, reading and SPaG, for children aged 5–14.`,
    h1: "Tutoring for families in Brough",
    intro:
      "We tutor children in Brough in Maths, English, reading and SPaG, with 11+ preparation available when a family is considering a selective school.",
    details:
      "Brough is further west along the Humber from Hull. Support is planned around the individual child: the topic that is shaky, the confidence that has dropped, or the exam that is coming up.",
    nearby: ["hessle", "hull", "howden"],
  },
  howden: {
    slug: "howden",
    name: "Howden",
    region: "East Yorkshire",
    metaTitle: "Tutoring in Howden",
    metaDescription: `Maths, English, reading and SPaG tutoring for families in Howden and the surrounding villages.`,
    h1: "Tutoring for families in Howden",
    intro:
      "Children in Howden can work on Maths, English, reading and SPaG with tutoring that is paced to them. 11+ preparation is available if you are looking at selective schools.",
    details:
      "Howden is a small market town between Hull and York. Lessons concentrate on the next skill your child needs, with enough practice to make it stick and feedback you can actually use.",
    nearby: ["market-weighton", "brough", "hull"],
  },
  "market-weighton": {
    slug: "market-weighton",
    name: "Market Weighton",
    region: "East Yorkshire",
    metaTitle: "Tutoring in Market Weighton",
    metaDescription: `Tutoring in Market Weighton for ages 5–14, covering Maths, English, reading and SPaG.`,
    h1: "Tutoring for families in Market Weighton",
    intro:
      "Brighter Futures tutors children in Market Weighton in Maths, English, reading and SPaG. Sessions are for ages 5–14 and are shaped around school work, confidence and any specific goal you have in mind.",
    details:
      "Market Weighton sits on the Yorkshire Wolds, and families here should not need a one-size-fits-all programme written for a different school. We agree the focus first, then teach that.",
    nearby: ["howden", "hull", "brough"],
  },
  "greater-manchester": {
    slug: "greater-manchester",
    name: "Greater Manchester",
    region: "Greater Manchester",
    metaTitle: "Tutoring in Greater Manchester",
    metaDescription: `Tutoring for families in Greater Manchester, including Trafford, Sale and Altrincham. Maths, English and 11+ preparation.`,
    h1: "Tutoring for families in Greater Manchester",
    intro:
      "In Greater Manchester we support families in Trafford, including Sale and Altrincham. Tutoring covers Maths, English, reading, SPaG and preparation for the Trafford 11+.",
    details:
      "The Trafford grammar schools share an entrance exam, and each school then applies its own admissions rules. Preparation here is about the skills that exam rewards, and about keeping the workload manageable.",
    nearby: ["trafford", "sale", "altrincham"],
  },
  trafford: {
    slug: "trafford",
    name: "Trafford",
    region: "Greater Manchester",
    metaTitle: "Tutoring in Trafford",
    metaDescription: `11+, Maths and English tutoring for families in Trafford, including preparation for the grammar school entrance exam.`,
    h1: "Tutoring for families in Trafford",
    intro:
      "Trafford tutoring covers primary Maths and English, reading, SPaG and the 11+ used by the Trafford Grammar School Consortium. The aim is secure skills and a child who can cope with the paper, not an endless stack of mocks.",
    details:
      "Five schools currently form the consortium: Altrincham Grammar School for Boys, Altrincham Grammar School for Girls, Sale Grammar School, Stretford Grammar School and Urmston Grammar. The exam arrangements can change, so preparation follows the latest information published by the schools.",
    nearby: ["sale", "altrincham", "greater-manchester"],
  },
  sale: {
    slug: "sale",
    name: "Sale",
    region: "Greater Manchester",
    metaTitle: "Tutoring in Sale",
    metaDescription: `Tutoring in Sale for Maths, English and the Trafford 11+, for children aged 5–14.`,
    h1: "Tutoring for families in Sale",
    intro:
      "Families in Sale can get tutoring in Maths, English, reading, SPaG and 11+ preparation for the Trafford entrance exam. Sessions are individual to the child, including the grammar school route if that is the plan.",
    details:
      "Sale Grammar School is part of the Trafford consortium. A qualifying score is not the same thing as a place: each school publishes its own oversubscription criteria. We teach the skills the exam assesses and leave the admissions rules for you to check with the school.",
    nearby: ["trafford", "altrincham", "greater-manchester"],
  },
  altrincham: {
    slug: "altrincham",
    name: "Altrincham",
    region: "Greater Manchester",
    metaTitle: "Tutoring in Altrincham",
    metaDescription: `Tutoring in Altrincham, including Maths, English and preparation for the Trafford 11+.`,
    h1: "Tutoring for families in Altrincham",
    intro:
      "Altrincham families looking for Maths, English, reading, SPaG or 11+ tutoring can start with a clear picture of what the child already knows. Preparation for the local grammar schools is available alongside everyday primary support.",
    details:
      "Altrincham Grammar School for Boys and Altrincham Grammar School for Girls are both in the Trafford consortium. We focus on the examined skills. Whether a qualifying result leads to a place depends on each school's current admissions policy.",
    nearby: ["sale", "trafford", "greater-manchester"],
  },
};

/** Place type for structured data. Towns are cities; Trafford and Greater Manchester are areas. */
export function locationPlace(page: LocationPage): {
  areaType: "City" | "AdministrativeArea";
  containedIn?: string;
} {
  if (page.slug === "greater-manchester") {
    return { areaType: "AdministrativeArea" };
  }
  if (page.slug === "trafford") {
    return { areaType: "AdministrativeArea", containedIn: "Greater Manchester" };
  }
  if (page.region === "Greater Manchester") {
    return { areaType: "City", containedIn: "Trafford" };
  }
  return { areaType: "City", containedIn: "East Yorkshire" };
}

export function isLocationSlug(value: string): value is LocationSlug {
  return (LOCATION_SLUGS as readonly string[]).includes(value);
}

export const locationNavLinks: { href: string; label: string }[] = LOCATION_SLUGS.map((slug) => ({
  href: `/location/${slug}`,
  label: LOCATION_PAGES[slug].name,
}));
