import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SERVICES, getService } from "@/data/services";
import { detailMetadata } from "@/data/seo";
import { breadcrumbSchema, jsonLd, serviceSchema } from "@/data/schema";
import ServiceDetailPage from "@/components/pages/ServiceDetailPage";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

/**
 * Search-intent-led titles, one per service, so the five pages do not compete
 * for the same query. Keyed by slug rather than derived from `s.title`, because
 * a bare service name ("Architecture") is too generic to rank and says nothing
 * about market or discipline.
 */
const SERVICE_TITLES: Record<string, string> = {
  "art-direction": "Art Direction for Interiors & Brand Spaces",
  "interior-design": "Luxury Interior Design in Egypt",
  architecture: "Architecture Studio in Egypt",
  "execution-construction": "Design & Build Execution in Egypt",
  "brand-experience": "Brand Experience & Environmental Design",
};

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getService(params.slug);
  if (!s) return {};
  return detailMetadata({
    // Trailing slash: `trailingSlash: true` makes the slashed form canonical, and
    // the previous unslashed value advertised a URL that redirects.
    canonical: `/services/${s.slug}/`,
    title: SERVICE_TITLES[s.slug] ?? s.title,
    // longDesc is unique per service and already written for humans, so every
    // page gets a distinct description instead of the shared one-liner.
    description: s.longDesc.slice(0, 300),
    image: s.gallery?.[0] ?? s.img,
    type: "website",
  });
}

export default function Page({ params }: { params: { slug: string } }) {
  const s = getService(params.slug);
  if (!s) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            serviceSchema(s),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services/" },
              { name: s.title, path: `/services/${s.slug}/` },
            ]),
          ),
        }}
      />
      <ServiceDetailPage slug={params.slug} />
    </>
  );
}
