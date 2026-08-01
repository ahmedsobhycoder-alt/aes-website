import type { MetadataRoute } from "next";

/**
 * Web app manifest. Emitted as a static /manifest.webmanifest by the export.
 *
 * Colours mirror the tokens in src/styles/theme.css (--background #080808,
 * --primary #B8E048) so the install/splash surfaces match the site rather than
 * introducing a second palette.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AES — Ayman Ehab Studio",
    short_name: "AES",
    description:
      "Interior design, architecture and art direction studio in Cairo, Egypt. Restaurants, retail, workplace and private residences, delivered turnkey.",
    start_url: "/",
    display: "standalone",
    background_color: "#080808",
    theme_color: "#080808",
    lang: "en",
    dir: "ltr",
    categories: ["design", "business", "lifestyle"],
    icons: [
      { src: "/icon.png", sizes: "256x256", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
