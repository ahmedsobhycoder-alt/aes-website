"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { FadeUp, FadeIn, StaggerChildren, StaggerItem } from "@/components/animations";
import { SERVICES } from "@/data/services";
import { EmailLink, WhatsAppLink } from "@/components/Cta";

const EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function ServiceDetailPage({ slug }: { slug: string }) {
  const idx = SERVICES.findIndex((s) => s.slug === slug);
  const reduce = useReducedMotion();
  if (idx === -1) return null;

  const service = SERVICES[idx];
  const prev = SERVICES[(idx - 1 + SERVICES.length) % SERVICES.length];
  const next = SERVICES[(idx + 1) % SERVICES.length];
  const hero = service.gallery?.[0] ?? service.img;
  const gallery = service.gallery?.slice(1) ?? [];

  return (
    <div className="pt-16">
      {/* HERO */}
      <div className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-[#0E0E0E]">
        <motion.div
          initial={reduce ? { opacity: 0 } : { scale: 1.08, opacity: 0, filter: "saturate(0.4) brightness(0.6)" }}
          animate={{ scale: 1, opacity: 1, filter: "saturate(1) brightness(1)" }}
          transition={{ duration: 1.5, ease: EASE }}
          className="absolute inset-0"
        >
          <Image src={hero} alt={service.title} fill priority sizes="100vw" className="object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
        <div className="absolute bottom-12 left-6 md:left-10 right-6 md:right-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3">Service {service.num}</p>
            <h1
              className="font-black uppercase text-foreground leading-[0.88]"
              style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(3rem, 8vw, 8rem)", letterSpacing: "-0.02em" }}
            >
              {service.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* INTRO */}
      <section className="border-b border-border px-6 md:px-10 py-24">
        <div className="max-w-screen-xl mx-auto">
          <FadeUp>
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary block mb-10">What It Is</span>
          </FadeUp>
          <FadeUp delay={0.05}>
            <p
              className="font-light text-foreground leading-[1.12] max-w-4xl"
              style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(1.75rem, 4vw, 3.25rem)", letterSpacing: "-0.01em" }}
            >
              {service.desc}
            </p>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-12 mt-14 md:mt-20">
            <FadeUp delay={0.1} className="md:col-span-6 md:col-start-7">
              <div className="border-t border-border pt-8">
                <p className="text-muted-foreground text-sm md:text-base leading-loose">
                  {service.longDesc}
                </p>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* DELIVERABLES */}
      <section className="border-b border-border px-6 md:px-10 py-24">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-4">
            <FadeUp>
              <span className="text-[10px] uppercase tracking-[0.3em] text-primary block mb-6">Deliverables</span>
              <p className="text-muted-foreground text-sm leading-loose">
                What you receive when we take on {service.title.toLowerCase()}.
              </p>
            </FadeUp>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <StaggerChildren className="flex flex-col divide-y divide-border border-t border-border">
              {service.deliverables.map((d, i) => (
                <StaggerItem key={d}>
                  <div className="flex items-baseline gap-6 py-6">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-primary flex-shrink-0 w-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="font-black uppercase text-foreground leading-tight"
                      style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(1.25rem, 2.2vw, 1.875rem)", letterSpacing: "-0.01em" }}
                    >
                      {d}
                    </span>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      {service.process && service.process.length > 0 && (
        <section className="border-b border-border px-6 md:px-10 py-24">
          <div className="max-w-screen-xl mx-auto">
            <FadeUp>
              <span className="text-[10px] uppercase tracking-[0.3em] text-primary block mb-6">Scope & Process</span>
              <h2
                className="font-black uppercase text-foreground leading-[0.9] mb-16"
                style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
              >
                How We Work
              </h2>
            </FadeUp>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
              {service.process.map((step, i) => (
                <FadeUp key={step.title} delay={i * 0.08}>
                  <div className="border-t border-border pt-6">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-primary block mb-4">
                      Step {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3
                      className="font-black uppercase text-foreground mb-3 leading-tight"
                      style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(1.25rem, 2vw, 1.5rem)", letterSpacing: "-0.01em" }}
                    >
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-loose">{step.description}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* IMAGERY */}
      {gallery.length > 0 && (
        <section className="border-b border-border px-6 md:px-10 py-24">
          <div className="max-w-screen-xl mx-auto">
            <FadeUp>
              <span className="text-[10px] uppercase tracking-[0.3em] text-primary block mb-10">Selected Work</span>
            </FadeUp>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gallery.map((src, i) => (
                <FadeIn key={src} delay={i * 0.08}>
                  <div className={`group relative aspect-[4/3] overflow-hidden bg-card ${i === 0 ? "md:col-span-2 md:aspect-[21/9]" : ""}`}>
                    <Image
                      src={src}
                      alt={`${service.title} — related work ${i + 1}`}
                      fill
                      sizes="(max-width:768px) 100vw, 50vw"
                      className="object-cover saturate-[0.85] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:saturate-100 group-hover:scale-[1.04]"
                    />
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeUp>
              <Link
                href="/work"
                className="group inline-flex items-center gap-3 mt-10 text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors duration-200"
              >
                See All Projects
                <ArrowUpRight size={14} aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </FadeUp>
          </div>
        </section>
      )}

      {/* ENQUIRY */}
      <section className="border-b border-border px-6 md:px-10 py-12">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-muted-foreground text-sm">Need {service.title.toLowerCase()} on your project?</p>
          <div className="flex flex-wrap gap-4">
            <EmailLink className="inline-flex items-center gap-2 bg-primary text-background text-xs uppercase tracking-[0.2em] px-6 py-3 font-bold">Start a Project</EmailLink>
            <WhatsAppLink className="inline-flex items-center gap-2 border border-border text-foreground text-xs uppercase tracking-[0.2em] px-6 py-3 hover:border-primary transition-colors">WhatsApp</WhatsAppLink>
          </div>
        </div>
      </section>

      {/* PREV / NEXT */}
      <section className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border border-b border-border">
        <Link
          href={`/services/${prev.slug}`}
          className="group px-6 md:px-10 py-16 hover:bg-card transition-colors duration-300 flex items-center gap-6 outline-none focus-visible:bg-card"
        >
          <ArrowLeft size={28} aria-hidden className="text-muted-foreground group-hover:text-primary transition-all duration-200 flex-shrink-0 group-hover:-translate-x-1" />
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3">Previous Service</p>
            <h3
              className="font-black uppercase text-foreground group-hover:text-primary transition-colors duration-200 leading-[0.95]"
              style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(1.75rem, 3.5vw, 3rem)", letterSpacing: "-0.02em" }}
            >
              {prev.title}
            </h3>
          </div>
        </Link>
        <Link
          href={`/services/${next.slug}`}
          className="group px-6 md:px-10 py-16 hover:bg-card transition-colors duration-300 flex items-center justify-between gap-6 outline-none focus-visible:bg-card"
        >
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3">Next Service</p>
            <h3
              className="font-black uppercase text-foreground group-hover:text-primary transition-colors duration-200 leading-[0.95]"
              style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(1.75rem, 3.5vw, 3rem)", letterSpacing: "-0.02em" }}
            >
              {next.title}
            </h3>
          </div>
          <ArrowRight size={28} aria-hidden className="text-muted-foreground group-hover:text-primary transition-all duration-200 flex-shrink-0 group-hover:translate-x-1" />
        </Link>
      </section>

      {/* BACK */}
      <div className="px-6 md:px-10 py-6">
        <div className="max-w-screen-xl mx-auto">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} aria-hidden /> Back to All Services
          </Link>
        </div>
      </div>
    </div>
  );
}
