import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BLOG_POSTS } from "@/data/blog";
import BlogPostPage from "@/components/pages/BlogPostPage";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = BLOG_POSTS.find((x) => x.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: "article", images: [post.coverImg] },
    twitter: { card: "summary_large_image" },
  };
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((x) => x.slug === params.slug);
  if (!post) notFound();
  return <BlogPostPage slug={params.slug} />;
}
