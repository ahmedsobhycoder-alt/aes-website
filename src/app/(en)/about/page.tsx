import type { Metadata } from "next";
import { pageMetadata } from "@/data/seo";
import AboutPage from "@/components/pages/AboutPage";

export const metadata: Metadata = pageMetadata("/about", "en");

export default function Page() {
  return (
    <>
      <AboutPage />
    </>
  );
}
