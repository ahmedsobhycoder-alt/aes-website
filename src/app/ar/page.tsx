import type { Metadata } from "next";
import HomePage from "@/components/pages/HomePage";

const description =
  "AES استوديو إدارة فنية وتصميم داخلي في القاهرة. بنجمع الفن والتصميم من الفكرة لحد التنفيذ.";

export const metadata: Metadata = {
  title: "AES — استوديو أيمن وإيهاب · بنصنع التجربة",
  description,
  alternates: {
    canonical: "/ar/",
    languages: {
      en: "/",
      "ar-EG": "/ar/",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "AES — استوديو أيمن وإيهاب · بنصنع التجربة",
    description,
    type: "website",
    locale: "ar_EG",
    images: ["/projects/ozel/01.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

/** Same component as the English home — locale comes from ar/layout.tsx. */
export default function Page() {
  return <HomePage />;
}
