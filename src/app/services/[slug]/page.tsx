import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICES, getService } from "@/data/services";
import ServiceDetailPage from "@/components/pages/ServiceDetailPage";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getService(params.slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.desc,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: {
      title: `${s.title} · AES — Ayman Ehab Studio`,
      description: s.desc,
      type: "article",
      images: [s.gallery?.[0] ?? s.img],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const s = getService(params.slug);
  if (!s) notFound();
  return <ServiceDetailPage slug={params.slug} />;
}
