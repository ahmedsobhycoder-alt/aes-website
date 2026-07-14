import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/projects";
import { BLOG_POSTS } from "@/data/blog";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aes-designstudio.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/services", "/work", "/philosophy", "/blog", "/contact"];
  const staticUrls = routes.map((r) => ({ url: `${BASE}${r}`, lastModified: new Date() }));
  const work = PROJECTS.map((p) => ({ url: `${BASE}/work/${p.slug}`, lastModified: new Date() }));
  const blog = BLOG_POSTS.map((p) => ({ url: `${BASE}/blog/${p.slug}`, lastModified: new Date() }));
  return [...staticUrls, ...work, ...blog];
}
