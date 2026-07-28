export const LOCALES = ["en", "ar"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** A string that exists in every supported locale. */
export type I18nText = Record<Locale, string>;

/** html lang attribute per locale. */
export const HTML_LANG: Record<Locale, string> = {
  en: "en",
  ar: "ar-EG",
};

/** Writing direction per locale. */
export const DIR: Record<Locale, "ltr" | "rtl"> = {
  en: "ltr",
  ar: "rtl",
};
