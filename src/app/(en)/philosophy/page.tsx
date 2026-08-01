import type { Metadata } from "next";
import { pageMetadata } from "@/data/seo";
import PhilosophyPage from "@/components/pages/PhilosophyPage";

export const metadata: Metadata = pageMetadata("/philosophy", "en");

export default function Page() {
  return (
    <>
      <PhilosophyPage />
    </>
  );
}
