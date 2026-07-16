/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: emits a self-contained ./out folder for upload to a web root
  // (e.g. CloudPanel htdocs). The whole site is SSG, so no Node runtime is needed.
  output: "export",
  // Trailing slash -> /about/index.html etc., so a plain static server resolves
  // /about, /work/ozel, ... without custom rewrite rules.
  trailingSlash: true,
  images: {
    // No Node image optimizer on a static host; serve the files in /public as-is.
    unoptimized: true,
  },
};
export default nextConfig;
