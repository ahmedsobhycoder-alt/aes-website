import type { Metadata } from "next";
import { pageMetadata } from "@/data/seo";
import ContactPage from "@/components/pages/ContactPage";

export const metadata: Metadata = pageMetadata("/contact", "en");

export default function Page() {
  return (
    <>
      <ContactPage />
    </>
  );
}
