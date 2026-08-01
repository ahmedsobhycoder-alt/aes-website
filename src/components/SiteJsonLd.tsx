import { jsonLd, studioSchema, websiteSchema } from "@/data/schema";
import type { Locale } from "@/i18n/locale";

/**
 * Emits the site-wide entity graph (studio + website) in the given language.
 *
 * WHY THIS IS NOT IN THE ROOT LAYOUT:
 * the root layout is shared by both locales and, being a server component in a
 * static export, has no way to know whether it is rendering an English or an
 * Arabic page. Emitting from there would force one language onto all 41 pages.
 * So each locale entry point renders this explicitly instead:
 *
 *   - src/app/ar/layout.tsx  → locale="ar", covering every /ar/* page at once
 *   - each English route     → locale="en"
 *
 * The English side is per-route only because there is no (en) route group to
 * hang a shared layout off. If the route-group restructure ever happens (the
 * same change that fixes <html lang> on /ar), this collapses to two call sites.
 *
 * Both languages share one `@id`, so search engines treat them as a single
 * entity described twice — not as two organisations.
 */
export default function SiteJsonLd({ locale }: { locale: Locale }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: jsonLd(studioSchema(locale), websiteSchema(locale)),
      }}
    />
  );
}
