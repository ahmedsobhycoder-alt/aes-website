import type { Metadata } from "next";
import { pageMetadata } from "@/data/seo";
import HomePage from "@/components/pages/HomePage";

export const metadata: Metadata = pageMetadata("/", "en");

export default function Page() {
  return (
    <>
      <HomePage />
    </>
  );
}
