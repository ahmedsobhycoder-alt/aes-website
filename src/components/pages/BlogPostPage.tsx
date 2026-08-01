"use client";
import Link from "next/link";
import ShimmerImage from "@/components/ShimmerImage";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";
import { FadeUp } from "@/components/animations";
import { BLOG_POSTS } from "@/data/blog";

export default function BlogPostPage({ slug }: { slug: string }) {
  const idx = BLOG_POSTS.findIndex((p) => p.slug === slug);
  const post = BLOG_POSTS[idx];
  const related = BLOG_POSTS.filter((_, i) => i !== idx).slice(0, 3);

  return (
    <div className="pt-16">
      {/* HEADER */}
      <section className="border-b border-border px-6 md:px-10 py-20">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="text-[9px] uppercase tracking-[0.2em] text-primary">{post.category}</span>
              <span className="w-px h-3 bg-border" />
              <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground">{post.date}</span>
              <span className="w-px h-3 bg-border" />
              <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground">{post.author}</span>
            </div>
            <h1
              className="font-black uppercase text-foreground leading-[0.9]"
              style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(2.5rem, 6vw, 6rem)", letterSpacing: "-0.02em" }}
            >
              {post.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* HERO IMAGE */}
      <div className="relative aspect-[16/7] overflow-hidden bg-card">
        <motion.div
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="absolute inset-0"
        >
          <ShimmerImage
            src={post.coverImg}
            alt={post.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </div>

      {/* BODY */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-screen-xl mx-auto">
          <div className="max-w-2xl">
            <FadeUp>
              <p className="text-muted-foreground text-sm leading-loose mb-6 text-lg" style={{ fontFamily: "var(--font-barlow), sans-serif" }}>
                {post.excerpt}
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              {post.body.split("\n\n").map((para, i) => (
                <p key={i} className="text-muted-foreground text-sm leading-loose mb-6">
                  {para}
                </p>
              ))}
            </FadeUp>
          </div>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="border-t border-border px-6 md:px-10 py-20">
          <div className="max-w-screen-xl mx-auto">
            <FadeUp className="mb-12">
              <h2
                className="font-black uppercase text-foreground"
                style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.02em" }}
              >
                More From The Studio
              </h2>
            </FadeUp>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`} className="block bg-background group">
                  <div className="relative aspect-[4/3] overflow-hidden bg-card">
                    <ShimmerImage src={p.coverImg} alt={p.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5 border-t border-border">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-primary block mb-2">{p.category}</span>
                    <h3
                      className="font-black uppercase text-foreground group-hover:text-primary transition-colors duration-200"
                      style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(1rem, 2vw, 1.4rem)", letterSpacing: "-0.01em" }}
                    >
                      {p.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BACK */}
      <div className="border-t border-border px-6 md:px-10 py-6">
        <div className="max-w-screen-xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={14} /> Back to Journal
          </Link>
        </div>
      </div>
    </div>
  );
}
