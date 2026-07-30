import type { Metadata } from "next";
import BlogPage from "@/components/pages/BlogPage";

const description =
  "ملاحظات من استوديو AES عن التصميم الداخلي والهوية التجارية وأماكن المطاعم والكافيهات.";

export const metadata: Metadata = {
  title: "المدونة",
  description,
  alternates: {
    canonical: "/ar/blog/",
    languages: {
      en: "/blog/",
      "ar-EG": "/ar/blog/",
      "x-default": "/blog/",
    },
  },
  openGraph: {
    title: "المدونة · AES — استوديو أيمن وإيهاب",
    description,
    type: "website",
    locale: "ar_EG",
    images: ["/projects/ozel/01.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

/** Same component as /blog — locale comes from src/app/ar/layout.tsx. */
export default function Page() {
  return <BlogPage />;
}
