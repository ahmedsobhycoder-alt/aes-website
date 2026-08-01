import { SITE } from "@/data/site";
import { SERVICES } from "@/data/services";
import { SITE_URL } from "@/data/seo";
import type { Project } from "@/data/projects";
import type { BlogPost } from "@/data/blog";
import type { Founder } from "@/data/founders";
import type { Locale } from "@/i18n/locale";
import { HTML_LANG } from "@/i18n/locale";
import {
  SERVICE_COPY,
  STUDIO_ADDRESS,
  STUDIO_ALT_NAMES,
  STUDIO_AREAS,
  STUDIO_EXPERTISE,
  STUDIO_FOUNDERS,
  STUDIO_SCHEMA,
} from "@/i18n/messages";

/**
 * JSON-LD builders.
 *
 * Everything hangs off one stable @id (`${SITE_URL}/#studio`) so Google treats
 * the studio as a single entity across pages rather than inferring a new
 * organisation per page.
 */

const STUDIO_ID = `${SITE_URL}/#studio`;
const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * The studio itself. ProfessionalService is a LocalBusiness subtype, so it
 * carries both.
 *
 * Locale-aware: the payload is emitted in the language of the page rendering it.
 * The `@id` stays constant across both, which is the point — one entity,
 * described in two languages, not two organisations.
 *
 * Note that `@id` and `url` deliberately keep the canonical English origin even
 * on /ar pages. They are identifiers, not display text.
 */
export function studioSchema(locale: Locale = "en") {
  const t = <T,>(m: Record<Locale, T>): T => m[locale];

  return {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": STUDIO_ID,
    name: t(STUDIO_SCHEMA.name),
    // The searches people actually type. Without these, "Ayman and Ehab" is not
    // associated with this entity at all.
    alternateName: STUDIO_ALT_NAMES[locale],
    description: t(STUDIO_SCHEMA.description),
    url: SITE_URL,
    inLanguage: HTML_LANG[locale],
    logo: `${SITE_URL}/aes-logo.png`,
    image: `${SITE_URL}/projects/ozel/01.jpg`,
    email: SITE.contact.email,
    // phoneHref, not phone — the display string carries spaces; E.164 is what
    // machine consumers expect.
    telephone: SITE.contact.phoneHref,
    priceRange: SITE.priceRange,
    foundingDate: SITE.established,
    founders: STUDIO_FOUNDERS[locale].map((name) => ({
      "@type": "Person",
      name,
      jobTitle: t(STUDIO_SCHEMA.founderTitle),
    })),
    address: {
      "@type": "PostalAddress",
      streetAddress: t(STUDIO_ADDRESS.street),
      addressLocality: t(STUDIO_ADDRESS.city),
      addressRegion: t(STUDIO_ADDRESS.region),
      postalCode: SITE.contact.address.postalCode,
      addressCountry: SITE.contact.address.country,
    },
    // Verified from the studio's own Google Business Profile embed, not derived
    // from the street address, so this is safe to publish.
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.map.lat,
      longitude: SITE.map.lng,
    },
    hasMap: SITE.map.placeUrl,
    areaServed: [
      { "@type": "Country", name: t(STUDIO_AREAS.egypt) },
      { "@type": "Country", name: t(STUDIO_AREAS.saudi) },
      { "@type": "Place", name: t(STUDIO_AREAS.mena) },
    ],
    knowsAbout: STUDIO_EXPERTISE[locale],
    // Built from the real services data, so the catalogue cannot drift from the
    // site. Names and descriptions come from SERVICE_COPY, keyed by the same
    // slug — falling back to the English record if a translation is missing.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: t(STUDIO_SCHEMA.catalogName),
      itemListElement: SERVICES.map((s) => {
        const copy = SERVICE_COPY[s.slug];
        const name = copy ? copy.title[locale] : s.title;
        return {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name,
            description: copy ? copy.desc[locale] : s.desc,
            serviceType: name,
            provider: { "@id": STUDIO_ID },
            url: `${SITE_URL}/services/${s.slug}/`,
          },
        };
      }),
    },
    sameAs: SITE.socials.map((s) => s.href.trim()),
  };
}

/** Enables the sitelinks search box and names the site distinctly from the org. */
export function websiteSchema(locale: Locale = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: STUDIO_SCHEMA.name[locale],
    alternateName: "AES",
    publisher: { "@id": STUDIO_ID },
    // The site as a whole is bilingual regardless of which page emits this.
    inLanguage: [HTML_LANG.en, HTML_LANG.ar],
  };
}

/** Breadcrumbs give Google the path shown under the result title. */
export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path}`,
    })),
  };
}

/** A single portfolio project. */
export function projectSchema(p: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${SITE_URL}/work/${p.slug}/#project`,
    name: p.title,
    headline: `${p.title} — ${p.role}`,
    description: p.challenge,
    url: `${SITE_URL}/work/${p.slug}/`,
    image: p.gallery.slice(0, 6).map((g) => `${SITE_URL}${g.src}`),
    creator: { "@id": STUDIO_ID },
    about: p.category,
    keywords: [p.category, p.role, "interior design", "architecture", "AES"].join(", "),
  };
}

/** The work index as a browsable collection. */
export function workCollectionSchema(projects: Project[]) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "AES Interior Design & Architecture Portfolio",
    url: `${SITE_URL}/work/`,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: projects.length,
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.title,
        url: `${SITE_URL}/work/${p.slug}/`,
      })),
    },
  };
}

export function blogPostSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${SITE_URL}/blog/${post.slug}/#post`,
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}/`,
    image: `${SITE_URL}${post.coverImg}`,
    articleSection: post.category,
    author: { "@type": "Organization", name: SITE.fullName, "@id": STUDIO_ID },
    publisher: { "@id": STUDIO_ID },
    inLanguage: "en",
  };
}

/**
 * A single service page.
 *
 * `Service` with the studio as provider and areaServed inherited from the
 * organisation. No price, rating or review properties — none are verifiable.
 */
export function serviceSchema(s: (typeof SERVICES)[number]) {
  const url = `${SITE_URL}/services/${s.slug}/`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: s.title,
    serviceType: s.title,
    description: s.desc,
    url,
    provider: { "@id": STUDIO_ID },
    areaServed: [
      { "@type": "Country", name: "Egypt" },
      { "@type": "Place", name: "Middle East and North Africa" },
    ],
    // Deliverables are real, listed on the page itself, so the markup matches
    // what a visitor actually sees.
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${s.title} deliverables`,
      itemListElement: s.deliverables.map((d) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: d },
      })),
    },
  };
}

/**
 * Founder profile — ProfilePage wrapping a Person as mainEntity.
 *
 * `sameAs` is deliberately omitted. SITE.socials are the STUDIO's accounts;
 * attaching them to a Person would assert that these are the individual's own
 * profiles, which is not true. Add per-founder `sameAs` only once AES confirms
 * verified personal profile URLs.
 *
 * No jobTitle beyond the role the About page already publishes, and no award,
 * alumniOf or knowsAbout claims that the repository cannot substantiate.
 */
export function founderProfileSchema(f: Founder, locale: Locale = "en") {
  const url = `${SITE_URL}/founders/${f.slug}/`;
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${url}#profile`,
    url,
    inLanguage: HTML_LANG[locale],
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      "@type": "Person",
      "@id": `${url}#person`,
      name: f.name.en,
      alternateName: f.name.ar,
      jobTitle: f.role.en,
      description: f.intro.en,
      image: `${SITE_URL}${f.portraitSrc}`,
      url,
      worksFor: { "@id": STUDIO_ID },
      // The studio is co-founded by both, which the Organization schema also states.
      affiliation: { "@id": STUDIO_ID },
    },
  };
}

/** Serialises one or more schema objects for a <script type="application/ld+json">. */
export function jsonLd(...blocks: unknown[]): string {
  return JSON.stringify(blocks.length === 1 ? blocks[0] : blocks);
}
