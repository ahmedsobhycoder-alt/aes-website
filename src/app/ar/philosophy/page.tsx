import type { Metadata } from "next";
import PhilosophyPage from "@/components/pages/PhilosophyPage";

const description =
  "الفن والتصميم مايتفصلوش عن بعض. دمج الفن في التصميم بعناية هو اللي بيفرّق شغل AES.";

export const metadata: Metadata = {
  title: "فلسفتنا",
  description,
  alternates: {
    canonical: "/ar/philosophy/",
    languages: {
      en: "/philosophy/",
      "ar-EG": "/ar/philosophy/",
      "x-default": "/philosophy/",
    },
  },
  openGraph: {
    title: "فلسفتنا · AES — استوديو أيمن وإيهاب",
    description,
    type: "website",
    locale: "ar_EG",
    images: ["/projects/aaly-al-makam/03.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

/** Same component as /philosophy — locale comes from src/app/ar/layout.tsx. */
export default function Page() {
  return <PhilosophyPage />;
}
