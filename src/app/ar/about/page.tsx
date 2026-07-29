import type { Metadata } from "next";
import AboutPage from "@/components/pages/AboutPage";

const description =
  "AES استوديو إدارة فنية وتصميم داخلي، اتأسس سنة 2020 على إيد أيمن وإيهاب صبحي. بنجمع الفن والتصميم عشان نطلّع أماكن ليها إحساسها الخاص.";

export const metadata: Metadata = {
  title: "عن الاستوديو",
  description,
  alternates: {
    canonical: "/ar/about/",
    languages: {
      en: "/about/",
      "ar-EG": "/ar/about/",
      "x-default": "/about/",
    },
  },
  openGraph: {
    title: "عن الاستوديو · AES — استوديو أيمن وإيهاب",
    description,
    type: "website",
    locale: "ar_EG",
    images: ["/projects/aaly-al-makam/06.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

/** Same component as /about — locale comes from src/app/ar/layout.tsx. */
export default function Page() {
  return <AboutPage />;
}
