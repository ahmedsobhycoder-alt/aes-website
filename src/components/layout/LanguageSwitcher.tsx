"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeFromPathname, switchLocalePath } from "@/i18n/paths";
import { SWITCHER } from "@/i18n/messages";
import { LOCALES, HTML_LANG, type Locale } from "@/i18n/locale";

/**
 * Renders both languages side by side, each in its own script, so a visitor who
 * cannot read the current language can still find the other one. Deliberately
 * visible on mobile too — the Enquire link is `hidden md:inline-flex`, but a
 * language switch has to be reachable on a phone.
 */
export default function LanguageSwitcher({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  const active = localeFromPathname(pathname);

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      role="group"
      aria-label={SWITCHER.ariaLabel[active]}
    >
      {LOCALES.map((locale: Locale, i) => (
        <span key={locale} className="flex items-center gap-2">
          {i > 0 && <span aria-hidden className="w-px h-3 bg-border" />}
          <Link
            href={switchLocalePath(pathname, locale)}
            hrefLang={HTML_LANG[locale]}
            aria-current={locale === active ? "true" : undefined}
            className={`text-xs tracking-[0.15em] transition-colors duration-200 ${
              locale === active
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {SWITCHER[locale][locale]}
          </Link>
        </span>
      ))}
    </div>
  );
}
