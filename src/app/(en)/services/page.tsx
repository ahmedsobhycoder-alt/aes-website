import type { Metadata } from "next";
import { pageMetadata } from "@/data/seo";
import ServicesPage from "@/components/pages/ServicesPage";

export const metadata: Metadata = pageMetadata("/services", "en");

export default function Page() {
  return (
    <>
      <ServicesPage />
    </>
  );
}
