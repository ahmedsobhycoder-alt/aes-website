"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { FadeUp, FadeIn } from "@/components/animations";
import { EmailLink } from "@/components/Cta";

const ART_DIRECTION_SCOPE = [
  {
    num: "01",
    title: "Creative Concept",
    description:
      "Defining the central idea, narrative, atmosphere, and emotional direction of the project.",
  },
  {
    num: "02",
    title: "Visual Language",
    description:
      "Establishing composition, color, material, graphic, and image principles that create consistency.",
  },
  {
    num: "03",
    title: "Brand Integration",
    description:
      "Connecting brand identity with architecture, interiors, signage, and the complete physical experience.",
  },
  {
    num: "04",
    title: "Creative Supervision",
    description:
      "Protecting the approved direction throughout design development, production, and execution.",
  },
];

const DESCRIPTION = [
  "Art direction establishes the central logic that guides every visual and spatial decision. It begins by identifying the project's character, audience, context, and intended emotional impact.",
  "From material language and composition to branding, lighting, graphics, and interior atmosphere, every element is evaluated as part of one connected experience. This prevents the project from becoming a collection of isolated design decisions.",
  "AES carries this direction throughout the complete process, ensuring that the original concept remains clear from the first presentation to the final built environment.",
];

export default function ArtDirectionPage() {
  return (
    <div className="pt-16">
      {/* HERO */}
      <section className="px-6 md:px-10 pt-24 pb-16">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          <FadeUp className="md:col-span-3">
            <span className="text-xs uppercase tracking-[0.2em] text-primary">
              01
            </span>
          </FadeUp>
          <FadeUp className="md:col-span-12">
            <h1
              className="font-black uppercase text-foreground leading-[0.88]"
              style={{
                fontFamily: "var(--font-barlow), sans-serif",
                fontSize: "clamp(3.5rem, 9vw, 9rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Art Direction
            </h1>
          </FadeUp>
          <FadeUp delay={0.1} className="md:col-span-12">
            <p
              className="text-2xl md:text-3xl font-light leading-snug text-foreground max-w-5xl"
              style={{ fontFamily: "var(--font-barlow), sans-serif" }}
            >
              We define the central creative vision behind every project,
              aligning concept, identity, atmosphere, and spatial language into
              one coherent direction.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* COVER */}
      <FadeIn>
        <div className="relative w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden bg-card">
          <Image
            src="/projects/rixance/01.jpg"
            alt="Art direction by AES — Rixance"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </FadeIn>

      {/* DETAILED DESCRIPTION */}
      <section className="border-t border-border px-6 md:px-10 py-24 mt-24">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          <FadeUp className="md:col-span-3">
            <h2
              className="text-4xl font-black text-primary uppercase"
              style={{ fontFamily: "var(--font-barlow), sans-serif" }}
            >
              The Approach
            </h2>
          </FadeUp>
          <div className="md:col-span-12 flex flex-col gap-10 md:gap-14">
            {DESCRIPTION.map((para, i) => (
              <FadeUp key={i} delay={0.1 + i * 0.08}>
                <p className="text-foreground/80 text-base md:text-lg leading-loose max-w-[62ch]">
                  {para}
                </p>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* SCOPE OF WORK */}
      <section className="border-t border-border px-6 md:px-10 py-24">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          <FadeUp className="md:col-span-3">
            <h2
              className="text-4xl font-black text-primary uppercase"
              style={{ fontFamily: "var(--font-barlow), sans-serif" }}
            >
              Scope of Work
            </h2>
          </FadeUp>
          <div className="md:col-span-12 flex flex-col">
            {ART_DIRECTION_SCOPE.map((item, i) => (
              <FadeUp key={item.num} delay={0.1 + i * 0.06}>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10 border-t border-border py-10 md:py-12 last:border-b">
                  <span className="md:col-span-1 text-xs uppercase tracking-[0.2em] text-primary">
                    {item.num}
                  </span>
                  <h3
                    className="md:col-span-4 font-black uppercase text-foreground leading-tight"
                    style={{
                      fontFamily: "var(--font-barlow), sans-serif",
                      fontSize: "clamp(1.5rem, 2.6vw, 2.25rem)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p className="md:col-span-6 md:col-start-7 text-muted-foreground text-sm leading-loose">
                    {item.description}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ENQUIRY */}
      <section className="border-t border-border px-6 md:px-10 py-12">
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p className="text-muted-foreground text-sm">
            Need art direction on your project?
          </p>
          <EmailLink className="inline-flex items-center gap-2 bg-primary text-background text-xs uppercase tracking-[0.2em] px-6 py-3 font-bold">
            Start a Project <ArrowUpRight size={14} />
          </EmailLink>
        </div>
      </section>

      {/* BACK */}
      <div className="border-t border-border px-6 md:px-10 py-6">
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
