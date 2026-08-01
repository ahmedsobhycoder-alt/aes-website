import type { Metadata } from "next";
import { AR_AVAILABLE, localizedPath } from "@/i18n/paths";
import type { Locale } from "@/i18n/locale";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aes-designstudio.com";

/**
 * Which deployment this build is for. Anything other than "production" is
 * treated as non-indexable.
 *
 * Default is "production" so a correct production build needs no extra config,
 * and STAGING must opt in by setting NEXT_PUBLIC_SITE_ENV=staging. That is the
 * safer default of the two: the failure mode is a staging site that is
 * accidentally indexable (visible, fixable) rather than a production site that
 * is accidentally noindexed (invisible, catastrophic, and slow to detect).
 *
 * Read at BUILD time — it is baked into the exported HTML.
 */
export const SITE_ENV = process.env.NEXT_PUBLIC_SITE_ENV ?? "production";
export const IS_INDEXABLE = SITE_ENV === "production";

const BRAND = "AES — Ayman Ehab Studio";

/**
 * Robots directives for the whole site.
 *
 * On staging this is the in-HTML layer only. It is NOT sufficient on its own —
 * an X-Robots-Tag response header must also be set at the server, because a
 * crawler that never renders the page still sees the header.
 * See docs/STAGING_DEINDEXING.md.
 */
export function robotsDirectives(): NonNullable<Metadata["robots"]> {
  if (!IS_INDEXABLE) {
    return { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false, noimageindex: true } };
  }
  return {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Full-size image previews and untruncated snippets matter for a portfolio.
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

/**
 * Search-console verification, emitted only when a value is configured.
 * Never hardcoded — an empty env var produces no tag at all.
 */
export function verificationMeta(): Metadata["verification"] {
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bing = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
  if (!google && !bing) return undefined;
  return {
    ...(google ? { google } : {}),
    ...(bing ? { other: { "msvalidate.01": bing } } : {}),
  };
}

export type PageSeo = {
  /** Bare title. The layout's title.template appends the brand. */
  title: string;
  description: string;
  ogImage?: string;
};

/**
 * Per-route SEO copy.
 *
 * Keys are CANONICAL paths (no /ar prefix) — locale is passed separately, so
 * /ar/about resolves the same entry rather than falling through to a generic
 * default, which is what the previous exact-match lookup did.
 *
 * Titles are written bare and keyword-led: the most specific term first, since
 * search results truncate around 60 characters.
 */
export const SEO: Record<string, PageSeo> = {
  "/": {
    title: "Interior Design & Architecture Studio in Cairo",
    description:
      "AES (Ayman & Ehab Studio) is a Cairo interior design and architecture studio. We design and deliver restaurants, retail, offices and private residences turnkey — from concept and art direction through construction.",
    ogImage: "/projects/ozel/01.jpg",
  },
  "/about": {
    title: "About Ayman & Ehab Sobhy",
    description:
      "AES was founded in 2020 by Ayman and Ehab Sobhy. Two art directors and interior designers building spaces across Egypt and the wider MENA region, from first concept to turnkey handover.",
    ogImage: "/projects/aaly-al-makam/06.jpg",
  },
  "/services": {
    title: "Interior Design, Architecture & Execution Services",
    description:
      "Five services under one studio: art direction, interior design, architecture, execution and construction, and brand experience. Food and beverage, commercial and residential projects delivered end to end.",
    ogImage: "/projects/rixance/01.jpg",
  },
  "/work": {
    title: "Interior Design & Architecture Portfolio",
    description:
      "Selected AES projects — restaurants, food courts, salons, clinics, offices and private residences across Cairo, Alexandria and Riyadh. Interior design, art direction and turnkey execution.",
    ogImage: "/projects/ozel/12.jpg",
  },
  "/philosophy": {
    title: "Our Design Philosophy",
    description:
      "Art and design are inseparable. AES designs the atmosphere of a space first, then lets material, light and detail serve it — which is what makes an interior memorable rather than merely finished.",
    ogImage: "/projects/aaly-al-makam/03.jpg",
  },
  "/blog": {
    title: "Journal — Interior Design & F&B Notes",
    description:
      "Notes from the AES studio on interior design, art direction, brand experience and food and beverage spaces.",
    ogImage: "/projects/ozel/01.jpg",
  },
  "/contact": {
    title: "Contact AES — Start a Project",
    description:
      "Start an interior design, architecture or fit-out project with AES. Based in Cairo, Egypt. Call +20 100 408 5006 or email contact@aes-designstudio.com.",
    ogImage: "/projects/salon-ali-yehia/02.jpg",
  },
};

const FALLBACK: PageSeo = {
  title: "Interior Design & Architecture",
  description:
    "AES (Ayman & Ehab Studio) — interior design, architecture and turnkey execution in Cairo, Egypt.",
};

/** Kept for callers that only need the raw copy. */
export function getSeo(canonical: string): PageSeo {
  return SEO[canonical] ?? FALLBACK;
}

/**
 * Builds a complete Metadata object for a canonical route.
 *
 * Replaces the previous pattern where six route files each ran
 * `seo.title.replace(" · AES — Ayman Ehab Studio", "")` to strip a suffix the
 * title template then re-added — a literal that had to match character for
 * character, and which silently no-opped on Arabic titles.
 */
export function pageMetadata(
  canonical: string,
  locale: Locale = "en",
  overrides: Partial<PageSeo> = {},
): Metadata {
  const base = { ...getSeo(canonical), ...overrides };
  const url = localizedPath(canonical, locale);
  const hasAr = AR_AVAILABLE.has(canonical);

  return {
    title: canonical === "/" ? { absolute: `${base.title} | ${BRAND}` } : base.title,
    description: base.description,
    alternates: {
      canonical: url,
      // Only declare a pair when the Arabic route actually exists; pointing
      // hreflang at an unbuilt URL is a validation error in Search Console.
      languages: hasAr
        ? {
            en: localizedPath(canonical, "en"),
            "ar-EG": localizedPath(canonical, "ar"),
            "x-default": localizedPath(canonical, "en"),
          }
        : undefined,
    },
    openGraph: {
      title: `${base.title} | ${BRAND}`,
      description: base.description,
      url,
      siteName: BRAND,
      type: "website",
      locale: locale === "ar" ? "ar_EG" : "en_US",
      images: base.ogImage ? [{ url: base.ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${base.title} | ${BRAND}`,
      description: base.description,
      images: base.ogImage ? [base.ogImage] : undefined,
    },
  };
}

/** Detail-page metadata, so each project/post gets unique copy instead of a shared stub. */
export function detailMetadata(input: {
  canonical: string;
  title: string;
  description: string;
  image?: string;
  type?: "article" | "website";
  publishedTime?: string;
}): Metadata {
  const { canonical, title, description, image, type = "website", publishedTime } = input;
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | ${BRAND}`,
      description,
      url: canonical,
      siteName: BRAND,
      type,
      locale: "en_US",
      images: image ? [{ url: image, width: 1200, height: 630 }] : undefined,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${BRAND}`,
      description,
      images: image ? [image] : undefined,
    },
  };
}
