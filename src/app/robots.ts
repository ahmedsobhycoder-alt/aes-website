import type { MetadataRoute } from "next";
import { IS_INDEXABLE, SITE_URL } from "@/data/seo";

/**
 * robots.txt.
 *
 * Staging emits a blanket disallow AND no sitemap reference, so a staging build
 * cannot advertise production URLs or invite crawling of itself. Note that
 * robots.txt only requests that crawlers stay away — it does not remove pages
 * already indexed, and it is not a security control. Deindexing already-indexed
 * staging URLs requires noindex or removal in Search Console; see
 * docs/STAGING_DEINDEXING.md.
 */
export default function robots(): MetadataRoute.Robots {
  if (!IS_INDEXABLE) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // The admin panel is a separate application and is not part of this
        // static export, but these are listed defensively in case it is ever
        // served from the same origin. robots.txt is NOT the security boundary —
        // authentication on the API is.
        disallow: ["/admin", "/admin/", "/api/", "/_next/static/chunks/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
