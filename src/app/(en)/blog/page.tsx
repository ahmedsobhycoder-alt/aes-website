import type { Metadata } from "next";
import { pageMetadata } from "@/data/seo";
import BlogPage from "@/components/pages/BlogPage";

export const metadata: Metadata = pageMetadata("/blog", "en");

export default function Page() {
  return (
    <>
      <BlogPage />
    </>
  );
}
