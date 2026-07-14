import "@/styles/index.css";
import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";
import TransitionProvider from "@/components/layout/TransitionProvider";

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
    default: "AES — Ayman Ehab Studio · We Create Vibes",
    template: "%s · AES — Ayman Ehab Studio",
  },
  description:
    "AES is an art direction and interior design studio. We don't just design spaces, we shape experiences.",
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${barlow.variable} ${manrope.variable}`}>
      <body className="bg-background text-foreground min-h-screen overflow-x-hidden antialiased">
        <Nav />
        <TransitionProvider>{children}</TransitionProvider>
        <Footer />
      </body>
    </html>
  );
}
