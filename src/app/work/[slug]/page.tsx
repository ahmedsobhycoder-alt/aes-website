import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PROJECTS } from "@/data/projects";
import WorkDetailPage from "@/components/pages/WorkDetailPage";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = PROJECTS.find((x) => x.slug === params.slug);
  if (!p) return {};
  const title = `${p.title} — ${p.category}`;
  return {
    title,
    description: p.challenge,
    alternates: { canonical: `/work/${p.slug}` },
    openGraph: { title, description: p.challenge, type: "article", images: [p.cover] },
    twitter: { card: "summary_large_image" },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const p = PROJECTS.find((x) => x.slug === params.slug);
  if (!p) notFound();
  return <WorkDetailPage slug={params.slug} />;
}
