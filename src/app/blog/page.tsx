import type { Metadata } from "next";
import { getSeo } from "@/data/seo";
import BlogPage from "@/components/pages/BlogPage";

const seo = getSeo("/blog");
export const metadata: Metadata = {
  title: seo.title.replace(" · AES — Ayman Ehab Studio", ""),
  description: seo.description,
  alternates: { canonical: seo.canonicalPath },
  openGraph: {
    title: seo.title,
    description: seo.description,
    type: "website",
    images: seo.ogImage ? [seo.ogImage] : undefined,
  },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <BlogPage />;
}
