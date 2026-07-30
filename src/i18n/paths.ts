import type { Locale } from "./locale";

const AR_PREFIX = "/ar";

/**
 * Exact-segment match so a future route like /archive or /artists is NOT
 * mistaken for Arabic. A bare `startsWith("/ar")` would be a live bug.
 */
export function localeFromPathname(pathname: string): Locale {
  return pathname === AR_PREFIX || pathname.startsWith(AR_PREFIX + "/") ? "ar" : "en";
}

/**
 * Strip the locale prefix and any trailing slash.
 *   "/ar/about/" -> "/about"   |   "/ar" -> "/"   |   "/about" -> "/about"
 */
export function toCanonicalPath(pathname: string): string {
  const stripped =
    localeFromPathname(pathname) === "ar" ? pathname.slice(AR_PREFIX.length) : pathname;
  const trimmed = stripped.replace(/\/+$/, "");
  return trimmed === "" ? "/" : trimmed;
}

/**
 * Canonical path + locale -> href. Always trailing-slashed to match
 * `trailingSlash: true`, so the static host serves index.html with no redirect.
 */
export function localizedPath(canonical: string, locale: Locale): string {
  const base = canonical === "/" ? "" : canonical;
  const withPrefix = locale === "ar" ? AR_PREFIX + base : base;
  return withPrefix === "" ? "/" : withPrefix + "/";
}

/**
 * Canonical paths that currently exist under /ar.
 *
 * Every English route exists; Arabic is being built one route at a time, so
 * linking to an unbuilt /ar/<path> would 404 on a static host. Add entries here
 * as each Arabic route ships.
 */
export const AR_AVAILABLE: ReadonlySet<string> = new Set([
  "/",
  "/about",
  "/philosophy",
  "/contact",
  "/work",
  "/blog",
  "/services",
]);

export function hasArabic(canonical: string): boolean {
  return AR_AVAILABLE.has(canonical);
}

/**
 * Internal link that keeps the visitor in their current language.
 *
 * Returns the /ar/* route when one exists, otherwise the English route — an
 * unbuilt /ar/* path would be a hard 404 on a static host. Used by the navbar
 * and by in-page links so the rule lives in exactly one place.
 */
export function localeHref(to: string, locale: Locale): string {
  return locale === "ar" && hasArabic(to) ? localizedPath(to, "ar") : to;
}

/**
 * Current pathname -> the equivalent page in the other locale.
 * Falls back to the Arabic home when the counterpart is not built yet, so the
 * switcher can never point at a 404.
 */
export function switchLocalePath(pathname: string, to: Locale): string {
  const canonical = toCanonicalPath(pathname);
  if (to === "ar" && !hasArabic(canonical)) return localizedPath("/", "ar");
  return localizedPath(canonical, to);
}
