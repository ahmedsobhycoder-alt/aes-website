import type { Metadata } from "next";
import WorkPage from "@/components/pages/WorkPage";

const description =
  "مشاريع تصميم داخلي وضيافة وهوية تجارية مختارة من AES — تصميم وإدارة فنية وتنفيذ متكامل.";

export const metadata: Metadata = {
  title: "أعمالنا",
  description,
  alternates: {
    canonical: "/ar/work/",
    languages: {
      en: "/work/",
      "ar-EG": "/ar/work/",
      "x-default": "/work/",
    },
  },
  openGraph: {
    title: "أعمالنا · AES — استوديو أيمن وإيهاب",
    description,
    type: "website",
    locale: "ar_EG",
    images: ["/projects/ozel/12.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

/** Same component as /work — locale comes from src/app/ar/layout.tsx. */
export default function Page() {
  return <WorkPage />;
}
