"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FadeUp } from "@/components/animations";
import { PROJECTS } from "@/data/projects";
import { useLocale } from "@/i18n/LocaleProvider";
import { PROJECT_COPY, WORK, WORK_TAGS } from "@/i18n/messages";

export default function WorkPage() {
  const locale = useLocale();
  // State holds the English tag VALUE, never the translated label, so filtering
  // keeps matching the raw strings in Project.tags.
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.tags.includes(active));

  return (
    <div className="pt-16">
      {/* HEADER */}
      <section className="border-b border-border px-6 md:px-10 py-24">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
          <FadeUp>
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary block mb-6">
              {WORK.heroEyebrow[locale]}
            </span>
            <h1
              className="font-black uppercase text-foreground leading-[0.88]"
              style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(4rem, 10vw, 10rem)", letterSpacing: "-0.02em" }}
            >
              {WORK.heroLine1[locale]}<br />
              <span className="text-primary">{WORK.heroLine2[locale]}</span>
            </h1>
          </FadeUp>
          <FadeUp delay={0.1}>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              {WORK.intro[locale]}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* FILTER */}
      <section className="border-b border-border px-6 md:px-10 py-5">
        <div className="max-w-screen-xl mx-auto flex flex-wrap gap-2">
          {WORK_TAGS.map((tag) => (
            <button
              key={tag.value}
              onClick={() => setActive(tag.value)}
              className={`text-[10px] uppercase tracking-[0.2em] px-4 py-2 border transition-colors duration-200 ${
                active === tag.value
                  ? "border-primary bg-primary text-background"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
              }`}
            >
              {tag.label[locale]}
            </button>
          ))}
        </div>
      </section>

      {/* FEATURE ROWS */}
      <section className="px-6 md:px-10">
        <div className="max-w-screen-xl mx-auto">
          {filtered.map((p, i) => {
            const flip = i % 2 === 1;
            const copy = PROJECT_COPY[p.slug];
            const title = copy?.title[locale] ?? p.title;
            return (
              <FadeUp key={p.slug}>
                <Link
                  href={`/work/${p.slug}`}
                  className="group grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center border-t border-border py-10 md:py-16"
                >
                  <div className={`md:col-span-7 ${flip ? "md:order-2" : ""}`}>
                    <div className="relative aspect-[16/10] overflow-hidden bg-card">
                      <Image
                        src={p.cover}
                        alt={locale === "ar" ? title : p.alt}
                        fill
                        sizes="(max-width:768px) 100vw, 60vw"
                        className="object-cover saturate-[0.7] brightness-90 transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:saturate-100 group-hover:brightness-100 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-70 transition-opacity duration-700 group-hover:opacity-25" />
                    </div>
                  </div>
                  <div className={`md:col-span-5 flex flex-col ${flip ? "md:order-1 md:pe-6" : "md:ps-6"}`}>
                    <div className="flex items-center gap-4 mb-5">
                      <span className="text-xs uppercase tracking-[0.25em] text-primary">{String(i + 1).padStart(2, "0")}</span>
                      <span className="h-px w-12 bg-border" />
                      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {copy?.category[locale] ?? p.category}
                      </span>
                    </div>
                    <h2
                      className="font-black uppercase text-foreground leading-[0.9] rtl:leading-[1.3] transition-colors duration-300 group-hover:text-primary"
                      style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.02em" }}
                    >
                      {title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mt-4 max-w-sm">
                      {copy?.role[locale] ?? p.role}
                    </p>
                    <span className="mt-7 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground">
                      <span className="relative">
                        {WORK.viewProject[locale]}
                        <span className="absolute -bottom-1 start-0 h-px w-0 bg-primary transition-all duration-500 ease-out group-hover:w-full" />
                      </span>
                      <ArrowUpRight size={14} className="text-primary transition-transform duration-300 rtl:-scale-x-100 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </span>
                  </div>
                </Link>
              </FadeUp>
            );
          })}
          {filtered.length === 0 && (
            <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] py-16 text-center">
              {WORK.empty[locale]}
            </p>
          )}
        </div>
      </section>
      <div className="border-t border-border" />
    </div>
  );
}
