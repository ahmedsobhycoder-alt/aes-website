import "@/styles/index.css";
import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import TransitionProvider from "@/components/layout/TransitionProvider";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import SiteJsonLd from "@/components/SiteJsonLd";
import { robotsDirectives, verificationMeta } from "@/data/seo";
import { DIR, HTML_LANG } from "@/i18n/locale";

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
  title: {
    default: "AES — Ayman Ehab Studio | Interior Design & Architecture, Cairo",
    template: "%s · AES — Ayman Ehab Studio",
  },
  description:
    "AES (Ayman & Ehab Studio) is a Cairo interior design and architecture studio delivering restaurants, retail, offices and residences turnkey — from art direction to construction.",
  applicationName: "AES — Ayman Ehab Studio",
  authors: [{ name: "Ayman Sobhy" }, { name: "Ehab Sobhy" }],
  creator: "AES — Ayman Ehab Studio",
  publisher: "AES — Ayman Ehab Studio",
  category: "Interior Design",
  // Environment-aware: a staging build emits noindex/nofollow instead.
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
 * English root layout. Owns <html> for every route in the (en) group.
 *
 * The group is URL-transparent, so these pages keep their existing paths —
 * /about/, /work/ozel/ and so on. Its Arabic twin is src/app/(ar)/layout.tsx.
 * Crossing between the two forces a full document load, which is exactly right
 * on a language switch: fresh dir, fresh font, no stale RTL styles.
 */
export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang={HTML_LANG.en}
      dir={DIR.en}
      className={`${barlow.variable} ${manrope.variable}`}
    >
      <body className="bg-background text-foreground min-h-screen overflow-x-hidden antialiased">
        {/* One call site for the whole English site — this layout knows its
            locale statically, so the 11 per-route emitters are gone. */}
        <LocaleProvider locale="en">
          <SiteJsonLd locale="en" />
          <Nav />
          <TransitionProvider>{children}</TransitionProvider>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
