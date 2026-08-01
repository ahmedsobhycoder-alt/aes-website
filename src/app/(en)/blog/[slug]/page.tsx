import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { BLOG_POSTS } from "@/data/blog";
import { detailMetadata } from "@/data/seo";
import { blogPostSchema, breadcrumbSchema, jsonLd } from "@/data/schema";
import BlogPostPage from "@/components/pages/BlogPostPage";

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = BLOG_POSTS.find((x) => x.slug === params.slug);
  if (!post) return {};
  return detailMetadata({
    canonical: `/blog/${post.slug}/`,
    title: post.title,
    description: post.excerpt,
    image: post.coverImg,
    type: "article",
  });
}

export default function Page({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((x) => x.slug === params.slug);
  if (!post) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(
            blogPostSchema(post),
            breadcrumbSchema([
              { name: "Home", path: "/" },
              { name: "Journal", path: "/blog/" },
              { name: post.title, path: `/blog/${post.slug}/` },
            ]),
          ),
        }}
      />
      <BlogPostPage slug={params.slug} />
    </>
  );
}
