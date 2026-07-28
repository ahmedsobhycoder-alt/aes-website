"use client";
import { createContext, useContext } from "react";
import { DEFAULT_LOCALE, type Locale } from "./locale";

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

/** Read the active locale inside a client component. */
export function useLocale(): Locale {
  return useContext(LocaleContext);
}

/**
 * Mounted once per root layout with a literal locale — the folder the layout
 * lives in already determines it, so nothing is parsed at runtime.
 */
export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}
