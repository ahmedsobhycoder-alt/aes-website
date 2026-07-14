"use client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { FadeUp, StaggerChildren, StaggerItem } from "@/components/animations";
import { SERVICES } from "@/data/services";

export default function ServicesPage() {
  return (
    <div className="pt-16">
      {/* HEADER */}
      <section className="border-b border-border px-6 md:px-10 py-24">
        <div className="max-w-screen-xl mx-auto">
          <FadeUp>
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary block mb-6">What We Do</span>
            <h1
              className="font-black uppercase text-foreground leading-[0.88]"
              style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(4rem, 10vw, 10rem)", letterSpacing: "-0.02em" }}
            >
              Our<br /><span className="text-primary">Services</span>
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* SERVICES LIST */}
      <section className="px-6 md:px-10">
        <div className="max-w-screen-xl mx-auto">
          <StaggerChildren className="flex flex-col divide-y divide-border">
            {SERVICES.map((s) => (
              <StaggerItem key={s.num}>
                <div className="group py-16 md:py-20 grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
                  <div className="md:col-span-1">
                    <span className="text-xs uppercase tracking-[0.2em] text-primary">{s.num}</span>
                  </div>
                  <div className="md:col-span-4">
                    <h2
                      className="font-black uppercase text-foreground mb-4 transition-colors duration-300 group-hover:text-primary"
                      style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.02em" }}
                    >
                      {s.title}
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">{s.desc}</p>
                    <ul className="flex flex-col gap-2">
                      {s.deliverables.map((d) => (
                        <li key={d} className="flex items-center gap-3 text-xs uppercase tracking-[0.1em] text-muted-foreground">
                          <span className="w-1 h-1 bg-primary flex-shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="md:col-span-6 md:col-start-7">
                    <div className="relative aspect-[16/10] overflow-hidden bg-card">
                      <Image
                        src={s.img}
                        alt={s.title}
                        fill
                        sizes="(max-width:768px) 100vw, 50vw"
                        className="object-cover saturate-[0.7] brightness-90 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:saturate-100 group-hover:brightness-100 group-hover:scale-[1.04]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent opacity-60 transition-opacity duration-700 group-hover:opacity-20" />
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-primary px-6 md:px-10 py-20 mt-10">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <FadeUp>
            <h2
              className="font-black uppercase text-background leading-[0.9]"
              style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(2.5rem, 6vw, 6rem)", letterSpacing: "-0.02em" }}
            >
              Ready to Start?
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-3 bg-background text-foreground text-xs uppercase tracking-[0.2em] px-8 py-4 font-bold hover:bg-foreground hover:text-background transition-colors duration-200"
            >
              Enquire Now <ArrowUpRight size={14} />
            </Link>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
