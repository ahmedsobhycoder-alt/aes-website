import type { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";

const description =
  "إدارة فنية وتصميم داخلي وعمارة وتنفيذ وتجربة علامة — خدمات AES من الفكرة لحد التسليم.";

export const metadata: Metadata = {
  title: "خدماتنا",
  description,
  alternates: {
    canonical: "/ar/services/",
    languages: {
      en: "/services/",
      "ar-EG": "/ar/services/",
      "x-default": "/services/",
    },
  },
  openGraph: {
    title: "خدماتنا · AES — استوديو أيمن وإيهاب",
    description,
    type: "website",
    locale: "ar_EG",
    images: ["/projects/rixance/01.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

/** Same component as /services — locale comes from src/app/ar/layout.tsx. */
export default function Page() {
  return <ServicesPage />;
}
