import type { Metadata } from "next";
import ArtDirectionPage from "@/components/pages/ArtDirectionPage";

const description =
  "We define the central creative vision behind every project, aligning concept, identity, atmosphere, and spatial language into one coherent direction.";

export const metadata: Metadata = {
  title: "Art Direction",
  description,
  alternates: { canonical: "/services/art-direction" },
  openGraph: {
    title: "Art Direction · AES — Ayman Ehab Studio",
    description,
    type: "article",
    images: ["/projects/rixance/01.jpg"],
  },
  twitter: { card: "summary_large_image" },
};

export default function Page() {
  return <ArtDirectionPage />;
}
