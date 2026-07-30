import type { Metadata } from "next";
import ContactPage from "@/components/pages/ContactPage";

const description =
  "ابدأ مشروعك مع AES. القاهرة، مصر · +20 100 408 5006. بنشتغل مع اللي بيهتموا فعلاً بجودة شغلهم.";

export const metadata: Metadata = {
  title: "تواصل معانا",
  description,
  alternates: {
    canonical: "/ar/contact/",
    languages: {
      en: "/contact/",
      "ar-EG": "/ar/contact/",
      "x-default": "/contact/",
    },
  },
  openGraph: {
    title: "تواصل معانا · AES — استوديو أيمن وإيهاب",
    description,
    type: "website",
    locale: "ar_EG",
    images: ["/projects/salon-ali-yehia/02.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

/** Same component as /contact — locale comes from src/app/ar/layout.tsx. */
export default function Page() {
  return <ContactPage />;
}
