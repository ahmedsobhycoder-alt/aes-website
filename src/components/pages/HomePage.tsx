"use client";
import { useRef, useState, useEffect } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { FadeUp } from "@/components/animations";
import { PROJECTS } from "@/data/projects";
import { SERVICES } from "@/data/services";
import { SITE } from "@/data/site";
import { CLIENTS, CLIENTS_SECTION, type Client } from "@/data/clients";
import { EmailLink } from "@/components/Cta";

const TICKER_ITEMS = [
  "Art Direction",
  "Architecture",
  "Interior Design",
  "Execution",
  "Brand Experience",
];

const heroStagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 44 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const HERO_SLIDES = [
  { src: "projects/ayman-ehap/ayman-ehap-1.png", label: "founders" },

  { src: "/projects/aaly-al-makam/01.jpg", label: "Aaly Al Makam" },
  { src: "/projects/ozel/12.jpg", label: "Ozel" },
  { src: "/projects/nuwa/01.jpg", label: "Nuwa" },
  { src: "/projects/hyde-park/hydepark1.jpg", label: "hyde park" },
];

function HeroSlideshow() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const t = setInterval(
      () => setI((p) => (p + 1) % HERO_SLIDES.length),
      5400,
    );
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden bg-background">
      <motion.div style={{ y: reduce ? 0 : y }} className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={i}
            initial={
              reduce
                ? { opacity: 0 }
                : {
                    opacity: 0,
                    scale: 1.09,
                    filter: "saturate(0.4) brightness(0.7)",
                  }
            }
            animate={{
              opacity: 1,
              scale: reduce ? 1 : 1.01,
              filter: "saturate(1) brightness(1)",
            }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.5, ease: "easeInOut" },
              scale: { duration: 6.5, ease: "linear" },
              filter: {
                duration: 1.9,
                ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
              },
            }}
            className="absolute inset-0 h-[118%]"
          >
            <Image
              src={HERO_SLIDES[i].src}
              alt={`AES interior — ${HERO_SLIDES[i].label}`}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* legibility scrims: heavier at bottom for the headline, soft left, thin top for nav */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/75 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background/65 to-transparent" />

      {/* slide label + indicators */}
      <div className="absolute bottom-16 right-6 md:right-10 z-10 hidden sm:flex items-center gap-4">
        <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          {String(i + 1).padStart(2, "0")} — {HERO_SLIDES[i].label}
        </span>
        <div className="flex items-center gap-1.5">
          {HERO_SLIDES.map((s, d) => (
            <button
              key={s.label}
              onClick={() => setI(d)}
              aria-label={`Show ${s.label}`}
              className={`h-1.5 transition-all duration-300 ${d === i ? "w-6 bg-primary" : "w-1.5 bg-muted-foreground/40 hover:bg-muted-foreground"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ClientCell({ client, index }: { client: Client; index: number }) {
  return (
    <div className="group relative flex h-full min-h-[152px] md:min-h-[212px] flex-col items-center justify-center gap-5 px-5 py-10 md:px-8 md:py-14">
      <span
        aria-hidden
        className="absolute top-3 left-3 md:top-4 md:left-4 text-[9px] uppercase tracking-[0.3em] text-muted-foreground/50 transition-colors duration-700 group-hover:text-primary"
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="relative h-14 w-full md:h-20">
        <Image
          src={client.image}
          alt={client.alt}
          fill
          sizes="(max-width:768px) 45vw, 30vw"
          className="object-contain opacity-70 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:scale-[1.03]"
        />
      </div>
      <span className="text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground transition-colors duration-700 group-hover:text-primary">
        {client.name}
      </span>
    </div>
  );
}

export default function HomePage() {
  const reduce = useReducedMotion();
  const [activeService, setActiveService] = useState(0);
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-screen flex flex-col justify-end pb-14 pt-28 px-6 md:px-10 overflow-hidden">
        <HeroSlideshow />

        {/* left rail: est. + scroll cue */}
        <div className="absolute left-6 md:left-10 bottom-32 z-10 hidden lg:flex flex-col items-start gap-4">
          <span className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground [writing-mode:vertical-rl] rotate-180">
            Est. 2020 — Cairo
          </span>
          <div className="w-px h-20 bg-gradient-to-b from-primary/70 to-transparent" />
        </div>

        <motion.div
          variants={heroStagger}
          initial={reduce ? "show" : "hidden"}
          animate="show"
          className="relative z-10 max-w-screen-xl mx-auto w-full"
        >
          <motion.p
            variants={heroItem}
            className="text-[10px] uppercase tracking-[0.35em] text-primary mb-6"
          >
            Art Direction | Architecture | Interior Design | Execution
          </motion.p>
          <h1
            className="font-black uppercase text-foreground leading-[0.82] mb-8"
            style={{
              fontFamily: "var(--font-barlow), sans-serif",
              fontSize: "clamp(4.5rem, 10vw,11rem)",
              letterSpacing: "-0.02em",
            }}
          >
            <motion.span variants={heroItem} className="block">
              We Create
            </motion.span>
            <motion.span
              variants={heroItem}
              className="relative inline-block text-primary"
            >
              Experience
              <motion.span
                initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  delay: 1.15,
                }}
                className="absolute -bottom-1 left-0 h-[6px] w-full bg-primary origin-left"
              />
            </motion.span>
          </h1>
          <motion.div
            variants={heroItem}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <Link
              href="/work"
              className="group inline-flex items-center gap-3 bg-primary text-background text-xs uppercase tracking-[0.2em] px-7 py-4 font-bold hover:bg-foreground transition-colors duration-200"
            >
              View Our Work{" "}
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <p className="text-muted-foreground  leading-relaxed">
              {SITE.tagline}
            </p>
          </motion.div>
        </motion.div>

        {/* marquee */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-background/60 backdrop-blur-sm py-3 overflow-hidden">
          <div className="flex gap-12 animate-marquee whitespace-nowrap">
            {Array(4)
              .fill(TICKER_ITEMS)
              .flat()
              .map((item, i) => (
                <span
                  key={i}
                  className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground flex-shrink-0"
                >
                  {item} <span className="text-primary mx-4">·</span>
                </span>
              ))}
          </div>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section
        id="about"
        className="border-t border-border px-6 md:px-10 py-24"
      >
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          <FadeUp className="md:col-span-3">
            <div
              className="text-4xl font-black text-primary uppercase  "
              style={{
                fontFamily: "var(--font-barlow), sans-serif",
              }}
            >
              About AES
            </div>
          </FadeUp>
          <FadeUp delay={0.1} className="md:col-span-12">
            <p
              className="text-2xl md:text-3xl font-light leading-snug text-foreground md:mb-12"
              style={{ fontFamily: "var(--font-barlow), sans-serif" }}
            >
              AES is an art direction and interior design studio founded in 2020
              by Ayman & Ehab Sobhy. We bring art and design together — from
              concept and branding to execution and F&B consultancy — to shape
              spaces with their own vibe.
            </p>
          </FadeUp>
          <FadeUp delay={0.2} className="md:col-span-12">
            <div className="md:col-span-12 flex w-full flex-col md:flex-row mdmd:items-center md:justify-center md:gap-20 ">
              <div className="md:flex-col md:items-center md:justify-center ">
                <p
                  className="text-[100px] font-black text-primary"
                  style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                >
                  Est. 2020
                </p>
                <p className="text-xs text-center uppercase tracking-[0.2em] text-muted-foreground mt-1">
                  Since 2013
                </p>
              </div>
              <div>
                <p
                  className="text-[100px]  font-black text-center text-primary"
                  style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                >
                  80+
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground text-center mt-1">
                  Projects Executed
                </p>
              </div>
              <div>
                <p
                  className="text-[100px] font-black text-primary text-center"
                  style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                >
                  10+
                </p>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground text-center mt-1">
                  industries Executed
                </p>
              </div>
            </div>
          </FadeUp>
          <FadeUp
            delay={0.3}
            className="md:col-span-12 md:flex md:gap-10 md:justify-center border-t border-border pt-8 mt-2 "
          >
            {SITE.values.map((v) => (
              <span
                key={v}
                className="flex items-center gap-2.5 text-[15px] uppercase tracking-[0.2em] text-muted-foreground"
              >
                <span className="w-1 h-1 bg-primary flex-shrink-0" />
                {v}
              </span>
            ))}
          </FadeUp>
        </div>
      </section>

      {/* OUR CLIENTS */}
      <section className="border-t border-border px-6 md:px-10 py-24">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">
          <FadeUp className="md:col-span-3">
            <h2
              className="text-4xl font-black text-primary uppercase"
              style={{
                fontFamily: "var(--font-barlow), sans-serif",
              }}
            >
              {CLIENTS_SECTION.heading}
            </h2>
          </FadeUp>
          <FadeUp delay={0.1} className="md:col-span-12">
            <p
              className="text-2xl md:text-3xl font-light leading-snug text-foreground md:mb-12"
              style={{ fontFamily: "var(--font-barlow), sans-serif" }}
            >
              {CLIENTS_SECTION.body}
            </p>
          </FadeUp>
          <FadeUp delay={0.2} className="md:col-span-12">
            <ul className="grid grid-cols-2 md:grid-cols-3 border-t border-l border-border">
              {CLIENTS.map((c, i) => (
                <li
                  key={c.id}
                  className="border-b border-r border-border bg-muted"
                >
                  <ClientCell client={c} index={i} />
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className="border-t border-border px-6 md:px-10 py-24">
        <div className="max-w-screen-xl mx-auto">
          <FadeUp className="mb-14 flex items-start justify-between gap-10">
  <div className="flex flex-col gap-10">
    <FadeUp>
      <span
        className="text-4xl font-black uppercase text-primary"
        style={{
          fontFamily: "var(--font-barlow), sans-serif",
        }}
      >
        What We Do
      </span>
    </FadeUp>

    <FadeUp delay={0.1}>
      <p
        className="max-w-7xl text-2xl font-light leading-snug text-foreground md:text-3xl"
        style={{
          fontFamily: "var(--font-barlow), sans-serif",
        }}
      >
        AES shapes bold concepts into complete spatial experiences, aligning
        brand, architecture, and interior direction from the first idea. We
        manage execution with precision, protecting every detail throughout the
        process. The result is a coherent environment built to perform, endure,
        and leave a lasting impression.
      </p>
    </FadeUp>
  </div>

  <Link
    href="/services"
    className="hidden shrink-0 items-center gap-2 pt-2 text-xs uppercase tracking-[0.15em] text-primary transition-colors hover:text-foreground sm:flex"
  >
    All Services
    <ArrowUpRight size={13} />
  </Link>
</FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            <div className="flex flex-col">
              {SERVICES.map((s, i) => (
                <Link
                  href={`/services/${s.slug}`}
                  key={s.num}
                  onMouseEnter={() => setActiveService(i)}
                  onFocus={() => setActiveService(i)}
                  className="group flex items-center gap-5 border-t border-border py-6 last:border-b outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background"
                >
                  <span
                    className={`text-xs uppercase tracking-[0.2em] w-8 flex-shrink-0 transition-colors duration-300 ${activeService === i ? "text-primary" : "text-muted-foreground"}`}
                  >
                    {s.num}
                  </span>
                  <div className="flex-1">
                    <h3
                      className={`font-black uppercase transition-colors duration-300 ${activeService === i ? "text-primary" : "text-foreground"}`}
                      style={{
                        fontFamily: "var(--font-barlow), sans-serif",
                        fontSize: "clamp(1.6rem, 3vw, 2.6rem)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {s.title}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed mt-1 max-w-sm hidden md:block">
                      {s.desc}
                    </p>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className={`flex-shrink-0 transition-all duration-300 ${activeService === i ? "text-primary translate-x-1 -translate-y-1" : "text-muted-foreground"}`}
                  />
                </Link>
              ))}
            </div>
            <div className="relative hidden md:block aspect-[4/3] overflow-hidden bg-card">
              <AnimatePresence>
                <motion.div
                  key={activeService}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={SERVICES[activeService].img}
                    alt={SERVICES[activeService].title}
                    fill
                    sizes="(max-width:768px) 100vw, 45vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
              <span className="absolute bottom-5 left-5 text-[10px] uppercase tracking-[0.2em] text-primary bg-background/70 backdrop-blur-sm px-3 py-1.5">
                {SERVICES[activeService].title}
              </span>
            </div>
          </div>
          <FadeUp delay={0.2} className="mt-10 md:hidden">
            <Link
              href="/services"
              className="text-xs uppercase tracking-[0.2em] text-primary border-b border-primary pb-1 hover:text-foreground hover:border-foreground transition-colors inline-flex items-center gap-2"
            >
              View All Services <ArrowRight size={12} />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* SELECTED WORK */}
      <section className="border-t border-border px-6 md:px-10 py-24">
        <div className="max-w-screen-xl mx-auto">
          <FadeUp className="flex items-center justify-between mb-14">
            <h2
              className="font-black uppercase text-foreground"
              style={{
                fontFamily: "var(--font-barlow), sans-serif",
                fontSize: "clamp(2.5rem, 6vw, 5rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Selected Work
            </h2>
            <Link
              href="/work"
              className="hidden sm:flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-primary hover:text-foreground transition-colors"
            >
              All Projects <ArrowUpRight size={13} />
            </Link>
          </FadeUp>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border">
            {PROJECTS.slice(0, 4).map((p, i) => (
              <FadeUp key={p.slug} delay={i * 0.08}>
                <Link
                  href={`/work/${p.slug}`}
                  className="group relative block bg-background cursor-pointer"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-card">
                    <Image
                      src={p.cover}
                      alt={p.alt}
                      fill
                      sizes="(max-width:768px) 100vw, 33vw"
                      className="object-cover saturate-[0.7] brightness-90 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:saturate-100 group-hover:brightness-100 group-hover:scale-[1.06]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-90 group-hover:opacity-40 transition-opacity duration-700" />
                    <span className="absolute top-4 left-4 text-[9px] uppercase tracking-[0.2em] text-primary bg-background/70 backdrop-blur-sm px-2 py-1 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      {p.category}
                    </span>
                  </div>
                  <div className="relative p-6 flex items-end justify-between">
                    <span className="absolute top-0 left-0 h-px w-0 bg-primary group-hover:w-full transition-all duration-500 ease-out" />
                    <div>
                      <h3
                        className="font-black uppercase text-foreground text-xl transition-transform duration-300 group-hover:translate-x-1"
                        style={{
                          fontFamily: "var(--font-barlow), sans-serif",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {p.title}
                      </h3>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">
                        {p.category} · {p.year}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={20}
                      className="flex-shrink-0 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY TEASER */}
      <section className="border-t border-border">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-80 md:h-auto min-h-[500px] bg-card overflow-hidden">
            <Image
              src="/projects/nuwa/03.jpg"
              alt="Design philosophy"
              fill
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
          </div>
          <div className="px-8 md:px-14 py-20 flex flex-col justify-center bg-[#0E0E0E]">
            <FadeUp>
              <span className="text-[10px] uppercase tracking-[0.3em] text-primary block mb-8">
                Our Philosophy
              </span>
              <h2
                className="font-black uppercase text-foreground leading-[0.9] mb-8"
                style={{
                  fontFamily: "var(--font-barlow), sans-serif",
                  fontSize: "clamp(2.8rem, 5vw, 5rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                We Create
                <br />
                Vibes
              </h2>
              <p className="text-muted-foreground text-sm leading-loose mb-10 max-w-sm">
                Art and design are inextricably linked. The careful integration
                of art into our work is what sets us apart — every line,
                texture, and palette choice carries deliberate meaning.
              </p>
              <Link
                href="/philosophy"
                className="inline-flex items-center gap-3 text-primary text-xs uppercase tracking-[0.2em] border-b border-primary pb-1 w-fit hover:text-foreground hover:border-foreground transition-colors duration-200"
              >
                More About Our Philosophy <ArrowRight size={12} />
              </Link>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="bg-primary px-6 md:px-10 py-20">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <FadeUp>
            <h2
              className="font-black uppercase text-background leading-[0.9]"
              style={{
                fontFamily: "var(--font-barlow), sans-serif",
                fontSize: "clamp(3rem, 7vw, 7rem)",
                letterSpacing: "-0.02em",
              }}
            >
              Let's Build
              <br />
              Something Real
            </h2>
          </FadeUp>
          <FadeUp delay={0.15} className="flex flex-col gap-4 md:items-end">
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-background text-foreground text-xs uppercase tracking-[0.2em] px-8 py-4 font-bold hover:bg-foreground hover:text-background transition-colors duration-200"
            >
              Start a Project <ArrowUpRight size={14} />
            </Link>
            <EmailLink className="text-background/60 text-xs uppercase tracking-[0.15em] hover:text-background transition-colors">
              {SITE.contact.email}
            </EmailLink>
          </FadeUp>
        </div>
      </section>

      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 28s linear infinite; }
        ::-webkit-scrollbar { display: none; }
        * { scrollbar-width: none; }
      `}</style>
    </div>
  );
}
