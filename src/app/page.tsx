import type { Metadata } from "next";
import { getSeo } from "@/data/seo";
import { SITE } from "@/data/site";
import HomePage from "@/components/pages/HomePage";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aes-designstudio.com";
const seo = getSeo("/");

const orgLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  name: SITE.fullName,
  url: SITE_URL,
  email: SITE.contact.email,
  telephone: `+${SITE.contact.phoneHref.replace(/^\+/, "")}`,
  address: { "@type": "PostalAddress", addressLocality: SITE.contact.location },
  sameAs: SITE.socials.map((s) => s.href),
};
export const metadata: Metadata = {
  title: { absolute: seo.title },
  description: seo.description,
  alternates: { canonical: seo.canonicalPath },
  openGraph: {
    title: seo.title,
    description: seo.description,
    type: "website",
    images: seo.ogImage ? [seo.ogImage] : undefined,
  },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }}
      />
      <HomePage />
    </>
  );
}
