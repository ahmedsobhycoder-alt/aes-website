import { PROJECTS } from "@/data/projects";
import type { I18nText } from "@/i18n/locale";

/**
 * Founder profile data.
 *
 * EVERY FACT HERE IS SOURCED FROM THE REPOSITORY. Specifically:
 *   - role      → ABOUT_FOUNDERS in src/i18n/messages.ts
 *   - founded   → SITE.established (2020) in src/data/site.ts
 *   - location  → SITE.contact.location
 *   - projects  → real slugs in src/data/projects.ts
 *
 * DELIBERATELY ABSENT, because nothing in the repository verifies them:
 *   - "CEO" or any officer title. The brief suggested "CEO & Co-Founder" for
 *     Ayman, but no approved AES source in this codebase supports it, so the
 *     verified role is used instead.
 *   - Education, birth details, awards, press, exhibitions.
 *   - Personal `sameAs` profiles. SITE.socials are STUDIO accounts, not personal
 *     ones — attaching them to a Person would assert something untrue.
 *
 * See docs/SEO_AUDIT.md § "Content requiring verified AES information" for the
 * list AES must supply before these pages can carry real biographical depth.
 */

export type Founder = {
  slug: string;
  name: I18nText;
  /** Verified role string, matching what the About page already displays. */
  role: I18nText;
  /** Short factual positioning line. No claims beyond studio + discipline. */
  intro: I18nText;
  /** Disciplines this founder practises, drawn from the studio's real services. */
  disciplines: { serviceSlug: string }[];
  portraitSrc: string;
  portraitAlt: I18nText;
  /** Real project slugs shown as studio work. Not attributed to one individual. */
  featuredProjectSlugs: string[];
};

/**
 * Portraits: /public/projects/ayman-ehap/ holds the two founder images already
 * used by the homepage hero. 01 and 02 are the only founder photography in the
 * repository, so one is assigned to each profile.
 */
export const FOUNDERS: Founder[] = [
  {
    slug: "ayman-sobhy",
    name: { en: "Ayman Sobhy", ar: "أيمن صبحي" },
    role: {
      en: "Art Director · Interior Designer · Co-Founder",
      ar: "مدير فني · مصمم داخلي · شريك مؤسس",
    },
    intro: {
      en: "Ayman Sobhy co-founded AES in 2020 with Ehab Sobhy. He works as an art director and interior designer on the studio's projects across Egypt and the wider MENA region, from first concept through to built handover.",
      ar: "أيمن صبحي شارك في تأسيس AES سنة 2020 مع إيهاب صبحي. بيشتغل كمدير فني ومصمم داخلي على مشاريع الاستوديو في مصر والمنطقة، من أول فكرة لحد التسليم.",
    },
    disciplines: [{ serviceSlug: "art-direction" }, { serviceSlug: "interior-design" }],
    portraitSrc: "/projects/ayman-ehap/01.png",
    portraitAlt: {
      en: "Ayman Sobhy, art director, interior designer and co-founder of AES in Cairo",
      ar: "أيمن صبحي، مدير فني ومصمم داخلي وشريك مؤسس في AES بالقاهرة",
    },
    featuredProjectSlugs: ["ozel", "rixance", "aaly-elmaqam"],
  },
  {
    slug: "ehab-sobhy",
    name: { en: "Ehab Sobhy", ar: "إيهاب صبحي" },
    role: {
      en: "Art Director · Interior Designer · Co-Founder",
      ar: "مدير فني · مصمم داخلي · شريك مؤسس",
    },
    intro: {
      en: "Ehab Sobhy co-founded AES in 2020 with Ayman Sobhy. He works as an art director and interior designer across the studio's hospitality, commercial and residential work, carrying design intent through documentation and execution on site.",
      ar: "إيهاب صبحي شارك في تأسيس AES سنة 2020 مع أيمن صبحي. بيشتغل كمدير فني ومصمم داخلي على مشاريع الضيافة والتجاري والسكني، وبيحافظ على فكرة التصميم لحد التنفيذ في الموقع.",
    },
    disciplines: [{ serviceSlug: "interior-design" }, { serviceSlug: "execution-construction" }],
    portraitSrc: "/projects/ayman-ehap/02.png",
    portraitAlt: {
      en: "Ehab Sobhy, art director, interior designer and co-founder of AES in Cairo",
      ar: "إيهاب صبحي، مدير فني ومصمم داخلي وشريك مؤسس في AES بالقاهرة",
    },
    featuredProjectSlugs: ["nuwa", "cassandra-food-court", "hyde-park"],
  },
];

export function getFounder(slug: string): Founder | undefined {
  return FOUNDERS.find((f) => f.slug === slug);
}

/** Resolves featured slugs to real Project records, dropping any that no longer exist. */
export function founderProjects(f: Founder) {
  return f.featuredProjectSlugs
    .map((s) => PROJECTS.find((p) => p.slug === s))
    .filter((p): p is (typeof PROJECTS)[number] => Boolean(p));
}
