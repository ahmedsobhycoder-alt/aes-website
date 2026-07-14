/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    // Local optimized project images live in /public; allow default loader.
    formats: ["image/avif", "image/webp"],
  },
};
export default nextConfig;
