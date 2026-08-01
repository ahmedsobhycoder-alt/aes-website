import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";
import { BLOG_POSTS } from "@/data/blog";
import { SERVICES } from "@/data/services";
import { FOUNDERS } from "@/data/founders";
import { SITE_URL } from "@/data/seo";
import { AR_AVAILABLE, localizedPath } from "@/i18n/paths";

/**
 * Every canonical path on the site.
 *
 * Derived from the data modules rather than hand-listed, which is why the old
 * version silently missed 11 projects and all five service pages as content grew.
 */
const CANONICAL: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/work", priority: 0.9, changeFrequency: "weekly" },
  { path: "/services", priority: 0.9, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.8, changeFrequency: "yearly" },
  { path: "/philosophy", priority: 0.6, changeFrequency: "yearly" },
  { path: "/blog", priority: 0.6, changeFrequency: "weekly" },
  ...SERVICES.map((s) => ({
    path: `/services/${s.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  })),
  // Founder profiles carry the "Ayman Sobhy" / "Ehab Sobhy" entity queries, so
  // they sit above project pages in priority.
  ...FOUNDERS.map((f) => ({
    path: `/founders/${f.slug}`,
    priority: 0.8,
    changeFrequency: "monthly" as const,
  })),
  ...PROJECTS.map((p) => ({
    path: `/work/${p.slug}`,
    priority: 0.7,
    changeFrequency: "monthly" as const,
  })),
  ...BLOG_POSTS.map((p) => ({
    path: `/blog/${p.slug}`,
    priority: 0.5,
    changeFrequency: "yearly" as const,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const { path, priority, changeFrequency } of CANONICAL) {
    const hasAr = AR_AVAILABLE.has(path);
    // localizedPath appends the trailing slash that `trailingSlash: true` makes
    // canonical. Emitting the unslashed form, as before, advertises a URL that
    // redirects — a duplicate signal on every entry.
    const alternates = hasAr
      ? {
          languages: {
            en: `${SITE_URL}${localizedPath(path, "en")}`,
            "ar-EG": `${SITE_URL}${localizedPath(path, "ar")}`,
          },
        }
      : undefined;

    entries.push({
      url: `${SITE_URL}${localizedPath(path, "en")}`,
      lastModified,
      changeFrequency,
      priority,
      ...(alternates ? { alternates } : {}),
    });

    if (hasAr) {
      entries.push({
        url: `${SITE_URL}${localizedPath(path, "ar")}`,
        lastModified,
        changeFrequency,
        // Slightly below the English equivalent: same content, secondary locale.
        priority: Math.max(0.1, priority - 0.1),
        ...(alternates ? { alternates } : {}),
      });
    }
  }

  return entries;
}
