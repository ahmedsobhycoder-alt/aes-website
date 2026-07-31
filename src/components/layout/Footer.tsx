"use client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE } from "@/data/site";
import { notoKufi } from "@/i18n/fonts";
import { localeFromPathname, localeHref } from "@/i18n/paths";
import { DIR, HTML_LANG } from "@/i18n/locale";
import { CONTACT, FOOTER, HOME, NAV } from "@/i18n/messages";

export default function Footer() {
  const pathname = usePathname();

  /**
   * Like Nav, the footer is rendered by the root layout — outside src/app/ar/ —
   * so it cannot inherit that subtree's LocaleProvider or its dir. It derives
   * the locale from the pathname and carries its own dir and Arabic font.
   */
  const locale = localeFromPathname(pathname);
  const isAr = locale === "ar";

  const companyLinks = [
    { label: FOOTER.aboutUs[locale], to: "/about" },
    { label: FOOTER.ourServices[locale], to: "/services" },
    { label: FOOTER.work[locale], to: "/work" },
    { label: FOOTER.blog[locale], to: "/blog" },
    { label: FOOTER.contact[locale], to: "/contact" },
  ];

  return (
    <footer
      dir={DIR[locale]}
      lang={isAr ? HTML_LANG.ar : undefined}
      className={`border-t border-border px-6 md:px-10 py-12 ${isAr ? notoKufi.variable : ""}`}
    >
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <Link
            href={isAr ? "/ar/" : "/"}
            className="inline-block mb-3"
            aria-label={NAV.homeAria[locale]}
          >
            <Image
              src="/aes-logo.png"
              alt="AES — Ayman Ehab Studio"
              width={360}
              height={206}
              className="h-8 w-auto"
            />
          </Link>
          <p className="text-muted-foreground text-xs leading-relaxed max-w-[180px]">
            {HOME.tagline[locale]}
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-5">
            {FOOTER.companyHeading[locale]}
          </p>
          <ul className="flex flex-col gap-3">
            {companyLinks.map((l) => (
              <li key={l.to}>
                <Link
                  href={localeHref(l.to, locale)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-[0.1em]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-5">
            {FOOTER.contactHeading[locale]}
          </p>
          <ul className="flex flex-col gap-3">
            <li>
              {/* dir="ltr" keeps the leading + and digit grouping correct when the
                  surrounding footer is RTL. */}
              <a
                href={`tel:${SITE.contact.phoneHref}`}
                dir="ltr"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-block"
              >
                {SITE.contact.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.contact.email}`}
                dir="ltr"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors inline-block"
              >
                {SITE.contact.email}
              </a>
            </li>
            <li className="text-xs text-muted-foreground leading-relaxed">
              {CONTACT.location[locale]}
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-5">
            {FOOTER.followHeading[locale]}
          </p>
          <ul className="flex flex-col gap-3">
            {SITE.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-[0.1em] flex items-center gap-2"
                >
                  {s.label} <ArrowUpRight size={10} className="rtl:-scale-x-100" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {FOOTER.copyright[locale]}
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          {FOOTER.legal[locale]}
        </p>
      </div>
    </footer>
  );
}
