"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FadeUp, StaggerChildren, StaggerItem } from "@/components/animations";
import { BLOG_POSTS } from "@/data/blog";

const ALL_CATS = ["All", ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))];

export default function BlogPage() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === active);

  return (
    <div className="pt-16">
      {/* HEADER */}
      <section className="border-b border-border px-6 md:px-10 py-24">
        <div className="max-w-screen-xl mx-auto">
          <FadeUp>
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary block mb-6">Journal</span>
            <h1
              className="font-black uppercase text-foreground leading-[0.88]"
              style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(4rem, 10vw, 10rem)", letterSpacing: "-0.02em" }}
            >
              Studio<br /><span className="text-primary">Notes</span>
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* FILTER */}
      <section className="border-b border-border px-6 md:px-10 py-5">
        <div className="max-w-screen-xl mx-auto flex flex-wrap gap-2">
          {ALL_CATS.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`text-[10px] uppercase tracking-[0.2em] px-4 py-2 border transition-colors duration-200 ${
                active === cat
                  ? "border-primary bg-primary text-background"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-screen-xl mx-auto">
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-border">
            {filtered.map((post) => (
              <StaggerItem key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group block bg-background">
                  <div className="relative aspect-[4/3] overflow-hidden bg-card">
                    <Image
                      src={post.coverImg}
                      alt={post.title}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover saturate-[0.7] brightness-90 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:saturate-100 group-hover:brightness-100 group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-90 group-hover:opacity-40 transition-opacity duration-700" />
                  </div>
                  <div className="relative p-6 border-t border-border">
                    <span className="absolute top-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500 ease-out" />
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-primary">{post.category}</span>
                      <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground">{post.date}</span>
                    </div>
                    <h3
                      className="font-black uppercase text-foreground mb-3 transition-colors duration-200 group-hover:text-primary"
                      style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(1.2rem, 2vw, 1.6rem)", letterSpacing: "-0.01em" }}
                    >
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-1 mt-4 text-[10px] uppercase tracking-[0.15em] text-primary">
                      Read <ArrowUpRight size={10} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </div>
  );
}
