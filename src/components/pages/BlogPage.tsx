"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ShimmerImage from "@/components/ShimmerImage";
import { FadeUp, StaggerChildren, StaggerItem } from "@/components/animations";
import { BLOG_POSTS } from "@/data/blog";
import { useLocale } from "@/i18n/LocaleProvider";
import { BLOG, BLOG_CATEGORY_LABELS, BLOG_COPY } from "@/i18n/messages";

/** Raw English categories — these are the filter identities, never translated. */
const ALL_CATS = ["All", ...Array.from(new Set(BLOG_POSTS.map((p) => p.category)))];

export default function BlogPage() {
  const locale = useLocale();
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? BLOG_POSTS : BLOG_POSTS.filter((p) => p.category === active);

  /** Display label for a raw category value. Falls back to the raw string. */
  const catLabel = (cat: string) =>
    cat === "All" ? BLOG.all[locale] : (BLOG_CATEGORY_LABELS[cat]?.[locale] ?? cat);

  return (
    <div className="pt-16">
      {/* HEADER */}
      <section className="border-b border-border px-6 md:px-10 py-24">
        <div className="max-w-screen-xl mx-auto">
          <FadeUp>
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary block mb-6">
              {BLOG.heroEyebrow[locale]}
            </span>
            <h1
              className="font-black uppercase text-foreground leading-[0.88]"
              style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(4rem, 10vw, 10rem)", letterSpacing: "-0.02em" }}
            >
              {BLOG.heroLine1[locale]}<br />
              <span className="text-primary">{BLOG.heroLine2[locale]}</span>
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
              {catLabel(cat)}
            </button>
          ))}
        </div>
      </section>

      {/* GRID */}
      <section className="px-6 md:px-10 py-16">
        <div className="max-w-screen-xl mx-auto">
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-border">
            {filtered.map((post) => {
              const copy = BLOG_COPY[post.slug];
              const title = copy?.title[locale] ?? post.title;
              return (
                <StaggerItem key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="group block bg-background">
                    <div className="relative aspect-[4/3] overflow-hidden bg-card">
                      <ShimmerImage
                        src={post.coverImg}
                        alt={title}
                        fill
                        sizes="(max-width:768px) 100vw, 33vw"
                        className="object-cover saturate-[0.7] brightness-90 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:saturate-100 group-hover:brightness-100 group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-90 group-hover:opacity-40 transition-opacity duration-700" />
                    </div>
                    <div className="relative p-6 border-t border-border">
                      <span className="absolute top-0 start-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500 ease-out" />
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-primary">
                          {catLabel(post.category)}
                        </span>
                        <span className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
                          {copy?.date[locale] ?? post.date}
                        </span>
                      </div>
                      <h3
                        className="font-black uppercase text-foreground mb-3 rtl:leading-[1.4] transition-colors duration-200 group-hover:text-primary"
                        style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(1.2rem, 2vw, 1.6rem)", letterSpacing: "-0.01em" }}
                      >
                        {title}
                      </h3>
                      <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
                        {copy?.excerpt[locale] ?? post.excerpt}
                      </p>
                      <div className="flex items-center gap-1 mt-4 text-[10px] uppercase tracking-[0.15em] text-primary">
                        {BLOG.read[locale]}{" "}
                        <ArrowUpRight size={10} className="transition-transform duration-300 rtl:-scale-x-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerChildren>
        </div>
      </section>
    </div>
  );
}
