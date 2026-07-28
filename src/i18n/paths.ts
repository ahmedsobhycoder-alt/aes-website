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
export const AR_AVAILABLE: ReadonlySet<string> = new Set(["/"]);

export function hasArabic(canonical: string): boolean {
  return AR_AVAILABLE.has(canonical);
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
