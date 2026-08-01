import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { FOUNDERS, getFounder } from "@/data/founders";
import { detailMetadata } from "@/data/seo";
import { breadcrumbSchema, founderProfileSchema, jsonLd } from "@/data/schema";
import FounderPage from "@/components/pages/FounderPage";

export function generateStaticParams() {
  return FOUNDERS.map((f) => ({ slug: f.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const f = getFounder(params.slug);
  if (!f) return {};
  return detailMetadata({
    canonical: `/founders/${f.slug}/`,
    // Name first: this page exists to answer a name query, so the entity leads.
    title: `${f.name.en} — Co-Founder, AES`,
    description: f.intro.en.slice(0, 300),
    image: f.portraitSrc,
    type: "article",
  });
}

export default function Page({ params }: { params: { slug: string } }) {
  const f = getFounder(params.slug);
  if (!f) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            founderProfileSchema(f, "en"),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "About", path: "/about/" },
              { name: f.name.en, path: `/founders/${f.slug}/` },
            ]),
          ),
        }}
      />
      <FounderPage slug={params.slug} />
    </>
  );
}
