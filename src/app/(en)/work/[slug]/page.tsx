import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS } from "@/data/projects";
import { detailMetadata } from "@/data/seo";
import { breadcrumbSchema, jsonLd, projectSchema } from "@/data/schema";
import WorkDetailPage from "@/components/pages/WorkDetailPage";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = PROJECTS.find((x) => x.slug === params.slug);
  if (!p) return {};
  return detailMetadata({
    canonical: `/work/${p.slug}/`,
    // Leads with the project name, then the discipline — so the result reads
    // "Ozel — Interior Design & Art Direction" rather than a bare category.
    title: `${p.title} — ${p.role}`,
    description: `${p.challenge} ${p.outcome}`.slice(0, 300),
    image: p.cover,
    type: "article",
  });
}

export default function Page({ params }: { params: { slug: string } }) {
  const p = PROJECTS.find((x) => x.slug === params.slug);
  if (!p) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            projectSchema(p),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Work", path: "/work/" },
              { name: p.title, path: `/work/${p.slug}/` },
            ]),
          ),
        }}
      />
      <WorkDetailPage slug={params.slug} />
    </>
  );
}
