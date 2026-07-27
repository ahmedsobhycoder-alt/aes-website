"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { FadeUp, FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";
import { SITE } from "@/data/site";

const STATS = [
  { value: "2020", label: "Established" },
  { value: "20+", label: "Projects Delivered" },
  { value: "03", label: "Core Disciplines" },
  { value: "MENA", label: "Region Served" },
];

const FOUNDERS = [
  { name: "Ayman Sobhy", role: "Art Director · Interior Designer · Co-Founder" },
  { name: "Ehab Sobhy", role: "Art Director · Interior Designer · Co-Founder" },
];

const MISSION =
  "We exist to design spaces that inspire, energize, and captivate. Through innovation, artistic vision, and a commitment to constant evolution, we set new standards in commercial design, creating environments that leave a lasting impact.";

const VISION =
  "To redefine commercial design standards and become the leading innovator in the Middle East by delivering holistic solutions with expertise in branding and design, execution, furnishing, operations, food and beverage consultancy, and more.";

function HeroParallax() {
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
          alt="AES interior — Aaly Al Makam"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background" />
      <div className="absolute bottom-12 left-6 md:left-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="font-black uppercase text-foreground leading-[0.88]"
          style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(4rem, 10vw, 10rem)", letterSpacing: "-0.02em" }}
        >
          About<br /><span className="text-primary">AES</span>
        </motion.h1>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="pt-16">
      <HeroParallax />

      {/* MANIFESTO */}
      <section className="border-t border-border px-6 md:px-10 py-24">
        <div className="max-w-screen-xl mx-auto">
          <FadeUp>
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary">Our Story</span>
          </FadeUp>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
            <FadeIn className="md:col-span-5">
              <div className="group relative aspect-[4/5] overflow-hidden bg-card">
                <Image
                  src="/projects/ozel/05.jpg"
                  alt="AES interior — Ozel"
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
                  className="font-black uppercase text-foreground leading-[0.98]"
                  style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(1.8rem, 3.2vw, 3rem)", letterSpacing: "-0.01em" }}
                >
                  Founded in 2020 by Ayman &amp; Ehab Sobhy on one belief: <span className="text-primary">a space without its own vibe loses its potential</span> — no matter how polished the design.
                </p>
              </FadeUp>
              <FadeUp delay={0.1}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <p className="text-sm text-muted-foreground leading-loose">
                    We are a one-stop studio that transforms spaces of all types — residential, commercial, and hospitality — handling everything from concept and design to execution, decoration, and branding. Our approach is holistic and turnkey: we see a project through from inception to completion and beyond.
                  </p>
                  <p className="text-sm text-muted-foreground leading-loose">
                    Our secret is a deep-rooted belief in the power of art, a rich understanding of diverse cultures, and unparalleled expertise. These let us craft tailored atmospheres that resonate — leaving lasting impressions and breathing life into every project.
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
            {STATS.map((s) => (
              <StaggerItem key={s.label}>
                <div className="p-8 md:p-10">
                  <p className="font-black text-primary" style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(2.5rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}>
                    {s.value}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-2">{s.label}</p>
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
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary">The Founders</span>
          </FadeUp>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border">
            {FOUNDERS.map((founder) => (
              <StaggerItem key={founder.name}>
                <div className="bg-background h-full p-10 md:p-14 flex flex-col justify-center">
                  <p
                    className="font-black uppercase text-foreground leading-[0.9]"
                    style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(2.2rem, 4vw, 3.5rem)", letterSpacing: "-0.02em" }}
                  >
                    {founder.name}
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-primary mt-4">{founder.role}</p>
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
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary">Mission &amp; Vision</span>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-20">
            <FadeUp delay={0.1}>
              <h3
                className="font-black uppercase text-foreground mb-5"
                style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "-0.01em" }}
              >
                Mission
              </h3>
              <p className="text-sm text-muted-foreground leading-loose">{MISSION}</p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <h3
                className="font-black uppercase text-foreground mb-5"
                style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(1.8rem, 3vw, 2.6rem)", letterSpacing: "-0.01em" }}
              >
                Vision
              </h3>
              <p className="text-sm text-muted-foreground leading-loose">{VISION}</p>
            </FadeUp>
          </div>

          <FadeUp className="mb-10">
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary">Our Values</span>
          </FadeUp>
          <StaggerChildren className="grid grid-cols-2 md:grid-cols-5 divide-x divide-y md:divide-y-0 divide-border border border-border">
            {SITE.values.map((value) => (
              <StaggerItem key={value}>
                <div className="p-6 md:p-8 flex items-center justify-center text-center min-h-[110px]">
                  <p
                    className="font-black uppercase text-foreground"
                    style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(0.95rem, 1.6vw, 1.25rem)", letterSpacing: "-0.01em" }}
                  >
                    {value}
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
