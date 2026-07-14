"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { FadeUp, FadeIn } from "@/components/animations";
import { PROJECTS } from "@/data/projects";
import { EmailLink, WhatsAppLink } from "@/components/Cta";

export default function WorkDetailPage({ slug }: { slug: string }) {
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const project = PROJECTS[idx];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];
  const reduce = useReducedMotion();

  return (
    <div className="pt-16">
      {/* HERO */}
      <div className="relative h-[80vh] overflow-hidden bg-[#0E0E0E]">
        <motion.div
          initial={reduce ? { opacity: 0 } : { scale: 1.08, opacity: 0, filter: "saturate(0.4) brightness(0.6)" }}
          animate={{ scale: 1, opacity: 1, filter: "saturate(1) brightness(1)" }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="absolute inset-0"
        >
          <Image
            src={project.gallery[0]?.src ?? project.cover}
            alt={project.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background" />
        <div className="absolute bottom-12 left-6 md:left-10 right-6 md:right-10">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3">{project.category}</p>
            <h1
              className="font-black uppercase text-foreground leading-[0.88]"
              style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(3rem, 8vw, 8rem)", letterSpacing: "-0.02em" }}
            >
              {project.title}
            </h1>
          </motion.div>
        </div>
      </div>

      {/* METADATA */}
      <section className="border-b border-border px-6 md:px-10 py-10">
        <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {[
            { label: "Client", value: project.client },
            { label: "Category", value: project.category },
            { label: "Role", value: project.role },
            { label: "Year", value: project.year },
          ].map((item) => (
            <div key={item.label} className="px-6 first:pl-0">
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-1">{item.label}</p>
              <p className="text-sm text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-6 md:px-10 py-24">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-6 flex flex-col gap-14">
            <FadeUp>
              <span className="text-[10px] uppercase tracking-[0.3em] text-primary block mb-4">The Challenge</span>
              <p className="text-foreground text-lg leading-relaxed" style={{ fontFamily: "var(--font-barlow), sans-serif" }}>
                {project.challenge}
              </p>
            </FadeUp>
            <FadeUp delay={0.1}>
              <span className="text-[10px] uppercase tracking-[0.3em] text-primary block mb-4">Our Approach</span>
              <p className="text-muted-foreground text-sm leading-loose">{project.approach}</p>
            </FadeUp>
            <FadeUp delay={0.2}>
              <span className="text-[10px] uppercase tracking-[0.3em] text-primary block mb-4">The Outcome</span>
              <p className="text-muted-foreground text-sm leading-loose">{project.outcome}</p>
            </FadeUp>
            {project.caseStudy && (
              <FadeUp delay={0.3}>
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary block mb-4">Concept</span>
                <p className="text-muted-foreground text-sm leading-loose mb-8">{project.caseStudy.intro}</p>
                {project.caseStudy.points && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {project.caseStudy.points.map((pt) => (
                      <div key={pt.title} className="border-t border-border pt-4">
                        <h4 className="font-black uppercase text-foreground text-lg" style={{ fontFamily: "var(--font-barlow), sans-serif" }}>{pt.title}</h4>
                        <p className="text-muted-foreground text-sm leading-relaxed mt-2">{pt.body}</p>
                      </div>
                    ))}
                  </div>
                )}
              </FadeUp>
            )}
          </div>
          {project.gallery[1] && (
            <div className="md:col-span-5 md:col-start-8">
              <FadeIn>
                <div className="relative md:sticky md:top-24 aspect-[3/4] overflow-hidden bg-card">
                  <Image
                    src={project.gallery[1].src}
                    alt={project.gallery[1].alt}
                    fill
                    sizes="(max-width:768px) 100vw, 40vw"
                    className="object-cover saturate-[0.85] transition-all duration-700 hover:saturate-100"
                  />
                </div>
              </FadeIn>
            </div>
          )}
        </div>
      </section>

      {/* GALLERY */}
      <section className="pb-24">
        {project.gallery[2] && (
          <FadeIn>
            <div className="relative w-full aspect-[21/9] overflow-hidden bg-card">
              <Image src={project.gallery[2].src} alt={project.gallery[2].alt} fill sizes="100vw" className="object-cover" />
            </div>
          </FadeIn>
        )}
        <div className="px-6 md:px-10 mt-6 md:mt-8">
          <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.gallery.slice(3).map((img, i) => (
              <FadeUp key={i} delay={(i % 2) * 0.08}>
                <div className="group relative aspect-[4/3] overflow-hidden bg-card">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width:768px) 100vw, 50vw"
                    className="object-cover saturate-[0.85] transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:saturate-100 group-hover:scale-[1.04]"
                  />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECT INQUIRY CTA */}
      <section className="border-t border-border px-6 md:px-10 py-12">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-muted-foreground text-sm">Interested in a project like {project.title}?</p>
          <div className="flex gap-4">
            <EmailLink className="inline-flex items-center gap-2 bg-primary text-background text-xs uppercase tracking-[0.2em] px-6 py-3 font-bold">Start a Project</EmailLink>
            <WhatsAppLink className="inline-flex items-center gap-2 border border-border text-foreground text-xs uppercase tracking-[0.2em] px-6 py-3 hover:border-primary transition-colors">WhatsApp</WhatsAppLink>
          </div>
        </div>
      </section>

      {/* NEXT PROJECT */}
      <section className="border-t border-border">
        <Link
          href={`/work/${next.slug}`}
          className="group block px-6 md:px-10 py-16 hover:bg-card transition-colors duration-300"
        >
          <div className="max-w-screen-xl mx-auto flex items-center justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3">Next Project</p>
              <h3
                className="font-black uppercase text-foreground group-hover:text-primary transition-colors duration-200"
                style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.02em" }}
              >
                {next.title}
              </h3>
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-2">{next.category} · {next.year}</p>
            </div>
            <ArrowRight size={32} className="text-muted-foreground group-hover:text-primary transition-colors duration-200 flex-shrink-0" />
          </div>
        </Link>
      </section>

      {/* BACK */}
      <div className="border-t border-border px-6 md:px-10 py-6">
        <div className="max-w-screen-xl mx-auto">
          <Link href="/work" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={14} /> Back to Work
          </Link>
        </div>
      </div>
    </div>
  );
}
