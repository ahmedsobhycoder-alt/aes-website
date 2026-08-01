import type { Metadata } from "next";
import NotFoundContent from "@/components/NotFoundContent";

/**
 * Build-time source for out/404.html.
 *
 * This exists as a real route purely so the static export renders the 404 design
 * through the (en) root layout. scripts/copy-404.mjs then copies the generated
 * HTML to out/404.html and deletes this route from the output, so the URL is
 * never actually reachable on the deployed site.
 *
 * The noindex is belt-and-braces: the route is removed from out/ before deploy,
 * and it is not in the sitemap or linked from anywhere.
 */
export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
  alternates: {},
};

export default function Page() {
  return <NotFoundContent />;
}
