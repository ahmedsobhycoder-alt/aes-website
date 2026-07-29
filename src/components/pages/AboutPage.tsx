"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { FadeUp, FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";
import { SITE } from "@/data/site";
import { useLocale } from "@/i18n/LocaleProvider";
import { ABOUT, ABOUT_FOUNDERS, ABOUT_STATS, VALUES } from "@/i18n/messages";

function HeroParallax() {
  const locale = useLocale();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const reduce = useReducedMotion();
  return (
    <div ref={ref} className="relative h-[70vh] overflow-hidden bg-[#0E0E0E]">
      <motion.div
        style={{ y: reduce ? 0 : y }}
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.08, filter: "saturate(0.4) brightness(0.55)" }}
        animate={{ opacity: 1, scale: 1, filter: "saturate(1) brightness(1)" }}
        transition={{ duration: 1.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="absolute inset-0 h-[130%]"
      >
        <Image
          src="/projects/aaly-al-makam/06.jpg"
          alt={ABOUT.heroAlt[locale]}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      <div className="absolute bottom-12 start-6 md:start-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="font-black uppercase text-foreground leading-[0.88]"
          style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(4rem, 10vw, 10rem)", letterSpacing: "-0.02em" }}
        >
          {ABOUT.heroLine1[locale]}<br /><span className="text-primary">{ABOUT.heroLine2[locale]}</span>
        </motion.h1>
      </div>
    </div>
  );
}

export default function AboutPage() {
  const locale = useLocale();
  return (
    <div className="pt-16">
      <HeroParallax />

      {/* MANIFESTO */}
      <section className="border-t border-border px-6 md:px-10 py-24">
        <div className="max-w-screen-xl mx-auto">
          <FadeUp>
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary">{ABOUT.storyEyebrow[locale]}</span>
          </FadeUp>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
            <FadeIn className="md:col-span-5">
              <div className="group relative aspect-[4/5] overflow-hidden bg-card">
                <Image
                  src="/projects/ozel/05.jpg"
                  alt={ABOUT.storyAlt[locale]}
                  fill
                  sizes="(max-width:768px) 100vw, 42vw"
                  className="object-cover saturate-[0.75] transition-all duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:saturate-100 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
            </FadeIn>
            <div className="md:col-span-7 flex flex-col gap-8">
              <FadeUp>
                <p
                  className="font-black uppercase text-foreground leading-[0.98] rtl:leading-[1.45]"
                  style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(1.8rem, 3.2vw, 3rem)", letterSpacing: "-0.01em" }}
                >
                  {ABOUT.manifestoLead[locale]}{" "}
                  <span className="text-primary">{ABOUT.manifestoHighlight[locale]}</span>{" "}
                  {ABOUT.manifestoTail[locale]}
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <p className="text-sm text-muted-foreground leading-loose">
                    {ABOUT.storyBody1[locale]}
                  </p>
                  <p className="text-sm text-muted-foreground leading-loose">
                    {ABOUT.storyBody2[locale]}
                  </p>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-t border-border px-6 md:px-10 py-16">
        <div className="max-w-screen-xl mx-auto">
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border border border-border">
            {ABOUT_STATS.map((s) => (
              <StaggerItem key={s.label.en}>
                <div className="p-8 md:p-10">
                  <p className="font-black text-primary" style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}>
                    {s.value[locale]}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-2">{s.label[locale]}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="border-t border-border px-6 md:px-10 py-24">
        <div className="max-w-screen-xl mx-auto">
          <FadeUp className="mb-14">
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary">{ABOUT.foundersEyebrow[locale]}</span>
          </FadeUp>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {ABOUT_FOUNDERS.map((founder) => (
              <StaggerItem key={founder.name.en}>
                <div className="bg-background h-full p-10 md:p-14 flex flex-col justify-center">
                  <p
                    className="font-black uppercase text-foreground leading-[0.9] rtl:leading-[1.35]"
                    style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", letterSpacing: "-0.02em" }}
                  >
                    {founder.name[locale]}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary mt-4">{founder.role[locale]}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* MISSION, VISION & VALUES */}
      <section className="border-t border-border px-6 md:px-10 py-24 bg-[#0E0E0E]">
        <div className="max-w-screen-xl mx-auto">
          <FadeUp className="mb-14">
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary">{ABOUT.missionVisionEyebrow[locale]}</span>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-20">
            <FadeUp delay={0.1}>
              <h3
                className="font-black uppercase text-foreground mb-5"
                style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "-0.01em" }}
              >
                {ABOUT.missionHeading[locale]}
              </h3>
              <p className="text-sm text-muted-foreground leading-loose">{ABOUT.mission[locale]}</p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <h3
                className="font-black uppercase text-foreground mb-5"
                style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "-0.01em" }}
              >
                {ABOUT.visionHeading[locale]}
              </h3>
              <p className="text-sm text-muted-foreground leading-loose">{ABOUT.vision[locale]}</p>
            </FadeUp>
          </div>

          <FadeUp className="mb-10">
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary">{ABOUT.valuesEyebrow[locale]}</span>
          </FadeUp>
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-border border border-border">
            {SITE.values.map((value, i) => (
              <StaggerItem key={value}>
                <div className="p-6 md:p-8 flex items-center justify-center text-center min-h-[110px]">
                  <p
                    className="font-black uppercase text-foreground"
                    style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(0.95rem, 1.6vw, 1.25rem)", letterSpacing: "-0.01em" }}
                  >
                    {VALUES[i][locale]}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>
    </div>
  );
}
