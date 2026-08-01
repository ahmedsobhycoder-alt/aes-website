import "@/styles/index.css";
import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import TransitionProvider from "@/components/layout/TransitionProvider";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import SiteJsonLd from "@/components/SiteJsonLd";
import { robotsDirectives, verificationMeta } from "@/data/seo";
import { notoKufi } from "@/i18n/fonts";
import { DIR, HTML_LANG } from "@/i18n/locale";

// The Latin faces are still loaded: the brand mark, "AES", phone numbers and
// social labels stay Latin even on Arabic pages. The [dir="rtl"] block in
// theme.css re-points --font-barlow/--font-manrope at --font-kufi, so Arabic
// copy renders in Kufi without touching a single component.
const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow",
  display: "swap",
});
const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://aes-designstudio.com"),
  applicationName: "AES — استوديو أيمن وإيهاب",
  authors: [{ name: "Ayman Sobhy" }, { name: "Ehab Sobhy" }],
  creator: "AES — استوديو أيمن وإيهاب",
  publisher: "AES — استوديو أيمن وإيهاب",
  category: "Interior Design",
  robots: robotsDirectives(),
  verification: verificationMeta(),
  manifest: "/manifest.webmanifest",
  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  themeColor: "#080808",
  colorScheme: "dark",
};

/**
 * Arabic root layout — the whole point of the (ar) group.
 *
 * Because this is a ROOT layout it may render <html>, so `lang="ar-EG"` and
 * `dir="rtl"` are in the static HTML, so non-JS crawlers and social scrapers
 * finally read the correct language. This replaced a client-side component that
 * patched document.documentElement on mount — which fixed the DOM for assistive
 * tech but never the served markup.
 *
 * `dir="rtl"` here also drives Tailwind's `rtl:` variant, which compiles to
 * `:where([dir="rtl"], [dir="rtl"] *)` and so matches every descendant.
 */
export default function ArabicRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={HTML_LANG.ar}
      dir={DIR.ar}
      className={`${barlow.variable} ${manrope.variable} ${notoKufi.variable}`}
    >
      <body className="bg-background text-foreground min-h-screen overflow-x-hidden antialiased">
        <LocaleProvider locale="ar">
          <SiteJsonLd locale="ar" />
          <Nav />
          <TransitionProvider>{children}</TransitionProvider>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
