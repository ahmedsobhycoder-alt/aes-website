"use client";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { FadeUp, FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";
import { useLocale } from "@/i18n/LocaleProvider";
import { localeHref } from "@/i18n/paths";
import { PHILOSOPHY, PHILOSOPHY_PRINCIPLES } from "@/i18n/messages";

function HeroParallax() {
  const locale = useLocale();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const reduce = useReducedMotion();
  return (
    <div ref={ref} className="relative h-[80vh] overflow-hidden bg-[#0E0E0E]">
      <motion.div
        style={{ y: reduce ? 0 : y }}
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.08, filter: "saturate(0.4) brightness(0.5)" }}
        animate={{ opacity: 1, scale: 1, filter: "saturate(1) brightness(1)" }}
        transition={{ duration: 1.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="absolute inset-0 h-[130%]"
      >
        <Image
          src="/projects/aaly-al-makam/03.jpg"
          alt={PHILOSOPHY.heroAlt[locale]}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/20" />
      <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-primary block mb-6">
            {PHILOSOPHY.heroEyebrow[locale]}
          </span>
          <h1
            className="font-black uppercase text-foreground leading-[0.88]"
            style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(4rem, 11vw, 12rem)", letterSpacing: "-0.02em" }}
          >
            {PHILOSOPHY.heroLine1[locale]}<br />{PHILOSOPHY.heroLine2[locale]}<br />
            <span className="text-primary">{PHILOSOPHY.heroLine3[locale]}</span>
          </h1>
        </motion.div>
      </div>
    </div>
  );
}

export default function PhilosophyPage() {
  const locale = useLocale();
  return (
    <div className="pt-16">
      <HeroParallax />

      {/* PULL QUOTE 1 */}
      <section className="border-t border-border px-6 md:px-10 py-24 bg-[#0E0E0E]">
        <div className="max-w-screen-xl mx-auto">
          <FadeUp>
            <p
              className="font-black uppercase text-foreground leading-[0.9] rtl:leading-[1.4]"
              style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(2.5rem, 6vw, 6rem)", letterSpacing: "-0.02em" }}
            >
              {PHILOSOPHY.quote1[locale]}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* IMAGE + TEXT BLOCK */}
      <section className="border-t border-border">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2">
          <FadeIn className="relative min-h-[500px] bg-card overflow-hidden">
            <Image
              src="/projects/ozel/02.jpg"
              alt={PHILOSOPHY.processAlt[locale]}
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover opacity-80"
            />
          </FadeIn>
          <div className="px-8 md:px-14 py-20 flex flex-col justify-center">
            <FadeUp>
              <span className="text-[10px] uppercase tracking-[0.3em] text-primary block mb-8">
                {PHILOSOPHY.processEyebrow[locale]}
              </span>
              <p className="text-muted-foreground text-sm leading-loose mb-6 max-w-sm">
                {PHILOSOPHY.processBody1[locale]}
              </p>
              <p className="text-muted-foreground text-sm leading-loose max-w-sm">
                {PHILOSOPHY.processBody2[locale]}
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section className="border-t border-border px-6 md:px-10 py-24">
        <div className="max-w-screen-xl mx-auto">
          <FadeUp className="mb-14">
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary block mb-4">
              {PHILOSOPHY.principlesEyebrow[locale]}
            </span>
            <h2
              className="font-black uppercase text-foreground leading-[0.9]"
              style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.02em" }}
            >
              {PHILOSOPHY.principlesHeading[locale]}
            </h2>
          </FadeUp>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
            {PHILOSOPHY_PRINCIPLES.map((p) => (
              <StaggerItem key={p.num}>
                <div className="group relative h-full overflow-hidden bg-background p-8 md:p-10 transition-colors duration-300 hover:bg-card">
                  <span
                    className="pointer-events-none absolute -top-4 end-2 select-none font-black text-foreground/[0.05] transition-colors duration-300 group-hover:text-primary/10"
                    style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(6rem, 10vw, 9rem)", lineHeight: 1 }}
                  >
                    {p.num}
                  </span>
                  <div className="relative">
                    <span className="text-xs uppercase tracking-[0.2em] text-primary">{p.num}</span>
                    <div className="my-5 h-px w-8 bg-primary transition-all duration-500 group-hover:w-16" />
                    <h3
                      className="font-black uppercase text-foreground mb-4"
                      style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)", letterSpacing: "-0.01em" }}
                    >
                      {p.title[locale]}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-loose">{p.body[locale]}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* PULL QUOTE 2 */}
      <section className="border-t border-border px-6 md:px-10 py-24 bg-[#0E0E0E]">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <FadeUp>
            <p
              className="font-black uppercase text-primary leading-[0.9] rtl:leading-[1.4]"
              style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(2.5rem, 5vw, 5rem)", letterSpacing: "-0.02em" }}
            >
              {PHILOSOPHY.quote2[locale]}
            </p>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-muted-foreground text-sm leading-loose">
              {PHILOSOPHY.quote2Support[locale]}
            </p>
          </FadeUp>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border px-6 md:px-10 py-20">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <FadeUp>
            <h2
              className="font-black uppercase text-foreground leading-[0.9]"
              style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.02em" }}
            >
              {PHILOSOPHY.ctaHeading[locale]}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <Link
              href={localeHref("/contact", locale)}
              className="inline-flex items-center gap-3 bg-primary text-background text-xs uppercase tracking-[0.2em] px-8 py-4 font-bold hover:bg-foreground hover:text-background transition-colors duration-200"
            >
              {PHILOSOPHY.ctaButton[locale]}{" "}
              <ArrowUpRight size={14} className="rtl:-scale-x-100" />
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
