"use client";
import {
  ArrowUpRight,
  FileText,
  Images,
  Info,
  Instagram,
  Layers,
  Linkedin,
  Facebook,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE } from "@/data/site";
import { notoKufi } from "@/i18n/fonts";
import { localeFromPathname, localeHref } from "@/i18n/paths";
import { DIR, HTML_LANG } from "@/i18n/locale";
import { CONTACT, FOOTER, HOME, NAV, STUDIO_ADDRESS } from "@/i18n/messages";

/** Platform icons resolved from the social label in src/data/site.ts. */
const SOCIAL_ICONS: Record<string, LucideIcon> = {
  Instagram,
  LinkedIn: Linkedin,
  Facebook,
};

const ICON = 13;

export default function Footer() {
  const pathname = usePathname();

  /**
   * Like Nav, the footer is rendered by the root layout — outside src/app/ar/ —
   * so it cannot inherit that subtree's LocaleProvider or its dir. It derives
   * the locale from the pathname and carries its own dir and Arabic font.
   */
  const locale = localeFromPathname(pathname);
  const isAr = locale === "ar";

  const companyLinks: { label: string; to: string; Icon: LucideIcon }[] = [
    { label: FOOTER.aboutUs[locale], to: "/about", Icon: Info },
    { label: FOOTER.ourServices[locale], to: "/services", Icon: Layers },
    { label: FOOTER.work[locale], to: "/work", Icon: Images },
    { label: FOOTER.blog[locale], to: "/blog", Icon: FileText },
    { label: FOOTER.contact[locale], to: "/contact", Icon: MessageSquare },
  ];

  const heading = "text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-5";
  // Shared row: icon keeps its width so labels align in a column.
  const row =
    "group flex items-center gap-2.5 text-xs text-muted-foreground hover:text-foreground transition-colors";
  const iconCls = "flex-shrink-0 text-muted-foreground/60 group-hover:text-primary transition-colors";

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

        {/* COMPANY */}
        <div>
          <p className={heading}>{FOOTER.companyHeading[locale]}</p>
          <ul className="flex flex-col gap-3">
            {companyLinks.map(({ label, to, Icon }) => (
              <li key={to}>
                <Link href={localeHref(to, locale)} className={`${row} uppercase tracking-[0.1em]`}>
                  <Icon size={ICON} className={iconCls} aria-hidden />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <p className={heading}>{FOOTER.contactHeading[locale]}</p>
          <ul className="flex flex-col gap-3">
            <li>
              <a href={`tel:${SITE.contact.phoneHref}`} className={row}>
                <Phone size={ICON} className={iconCls} aria-hidden />
                {/* dir="ltr" keeps the leading + and digit grouping correct in RTL. */}
                <span dir="ltr">{SITE.contact.phone}</span>
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.contact.email}`} className={row}>
                <Mail size={ICON} className={iconCls} aria-hidden />
                <span dir="ltr">{SITE.contact.email}</span>
              </a>
            </li>
            {/* Full street address, matching the PostalAddress in the
                LocalBusiness JSON-LD exactly. Citation consistency is what makes
                a local listing resolve, so these two must never drift apart. */}
            <li>
              <a
                href={SITE.map.placeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${row} items-start`}
              >
                <MapPin size={ICON} className={`${iconCls} mt-1 shrink-0`} aria-hidden />
                <address className="not-italic leading-relaxed">
                  {STUDIO_ADDRESS.street[locale]}
                  <br />
                  {STUDIO_ADDRESS.city[locale]}
                  {isAr ? "، " : ", "}
                  {SITE.contact.address.postalCode}
                </address>
              </a>
            </li>
          </ul>
        </div>

        {/* FOLLOW */}
        <div>
          <p className={heading}>{FOOTER.followHeading[locale]}</p>
          <ul className="flex flex-col gap-3">
            {SITE.socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.label] ?? ArrowUpRight;
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`${row} uppercase tracking-[0.1em] hover:text-primary`}
                  >
                    <Icon size={ICON} className={iconCls} aria-hidden />
                    {s.label}
                    <ArrowUpRight
                      size={10}
                      aria-hidden
                      className="opacity-0 -translate-y-0.5 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 rtl:-scale-x-100"
                    />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* FIND US — embedded map */}
      <div className="max-w-screen-xl mx-auto mt-14">
        <div className="flex items-center justify-between gap-4 mb-4">
          <p className={heading}>{FOOTER.findUsHeading[locale]}</p>
          <a
            href={SITE.map.placeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
          >
            {FOOTER.openInMaps[locale]}
            <ArrowUpRight size={10} aria-hidden className="rtl:-scale-x-100" />
          </a>
        </div>

        {/*
          Fixed aspect-ratio box: the iframe fills it absolutely, so the space is
          reserved before Google responds and the footer cannot shift (CLS).

          loading="lazy" is what keeps this affordable — the footer is on all 44
          pages, and without it every page would make a third-party request on
          load. The frame is only fetched when it approaches the viewport.

          The dark filter maps Google's light tiles onto the site's near-black
          palette. invert + hue-rotate(180deg) is the standard pairing: the invert
          darkens, the rotation puts hues back roughly where they started so
          water still reads blue-ish. Delete both to get Google's default look.
        */}
        <div className="relative w-full aspect-[16/9] md:aspect-[21/6] overflow-hidden border border-border bg-card">
          <iframe
            src={`https://www.google.com/maps/embed?pb=${
              isAr ? SITE.map.embedPb.replaceAll("!1sen!2seg", "!1sar!2seg") : SITE.map.embedPb
            }`}
            title={FOOTER.mapTitle[locale]}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
            style={{ border: 0, filter: "invert(92%) hue-rotate(180deg) saturate(0.75) contrast(0.92)" }}
          />
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
