import type { Metadata } from "next";
import { pageMetadata } from "@/data/seo";
import { jsonLd, workCollectionSchema } from "@/data/schema";
import { PROJECTS } from "@/data/projects";
import WorkPage from "@/components/pages/WorkPage";

export const metadata: Metadata = pageMetadata("/work", "en");

export default function Page() {
  return (
    <>
      {/* The portfolio index as a browsable ItemList — gives Google every project
          URL from the collection page itself, not only from the sitemap. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(workCollectionSchema(PROJECTS)) }}
      />
      <WorkPage />
    </>
  );
}
