"use client";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import ShimmerImage from "@/components/ShimmerImage";
import { FadeUp, FadeIn } from "@/components/animations";
import { EmailLink } from "@/components/Cta";
import { FOUNDERS, founderProjects, getFounder } from "@/data/founders";
import { getService } from "@/data/services";
import { useLocale } from "@/i18n/LocaleProvider";
import { FOUNDER_PAGE, PROJECT_COPY, SERVICE_COPY } from "@/i18n/messages";
import { localeHref } from "@/i18n/paths";

/**
 * Founder profile.
 *
 * Built from src/data/founders.ts, which carries only repository-verified
 * facts. Nothing here asserts a title, award, publication or personal social
 * profile that the codebase cannot substantiate.
 */
export default function FounderPage({ slug }: { slug: string }) {
  const locale = useLocale();
  const founder = getFounder(slug);
  if (!founder) return null;

  const projects = founderProjects(founder);
  const other = FOUNDERS.find((f) => f.slug !== founder.slug);

  return (
    <div className="pt-16">
      {/* INTRO */}
      <section className="border-b border-border px-6 md:px-10 py-24">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-5">
            <FadeIn>
              <div className="relative aspect-[4/5] overflow-hidden bg-card">
                <ShimmerImage
                  src={founder.portraitSrc}
                  alt={founder.portraitAlt[locale]}
                  fill
                  priority
                  sizes="(max-width:768px) 100vw, 40vw"
                  className="object-cover saturate-[0.85]"
                />
              </div>
            </FadeIn>
          </div>

          <div className="md:col-span-7">
            <FadeUp>
              <span className="text-[10px] uppercase tracking-[0.3em] text-primary block mb-6">
                {FOUNDER_PAGE.eyebrow[locale]}
              </span>
              {/* The single H1 on this route is the founder's name — the entity
                  the page is about, and the query it should answer. */}
              <h1
                className="font-black uppercase text-foreground leading-[0.9] rtl:leading-[1.3]"
                style={{
                  fontFamily: "var(--font-barlow), sans-serif",
                  fontSize: "clamp(2.75rem, 6vw, 5.5rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                {founder.name[locale]}
              </h1>
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary mt-5">
                {founder.role[locale]}
              </p>
              <p className="text-muted-foreground text-base leading-loose mt-8 max-w-xl">
                {founder.intro[locale]}
              </p>
            </FadeUp>

            <FadeUp delay={0.1}>
              <div className="mt-12 border-t border-border pt-8">
                <h2 className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-5">
                  {FOUNDER_PAGE.disciplinesHeading[locale]}
                </h2>
                <ul className="flex flex-wrap gap-3">
                  {founder.disciplines.map(({ serviceSlug }) => {
                    const service = getService(serviceSlug);
                    if (!service) return null;
                    const label = SERVICE_COPY[serviceSlug]?.title[locale] ?? service.title;
                    return (
                      <li key={serviceSlug}>
                        <Link
                          href={localeHref(`/services/${serviceSlug}`, locale)}
                          className="inline-flex items-center gap-2 border border-border px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-foreground hover:border-primary hover:text-primary transition-colors"
                        >
                          {label}
                          <ArrowUpRight size={12} className="rtl:-scale-x-100" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* AT AES */}
      <section className="border-b border-border px-6 md:px-10 py-20">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <h2
              className="font-black uppercase text-foreground"
              style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.01em" }}
            >
              {FOUNDER_PAGE.aboutStudioHeading[locale]}
            </h2>
          </div>
          <div className="md:col-span-8">
            <p className="text-muted-foreground text-base leading-loose max-w-2xl">
              {FOUNDER_PAGE.aboutStudioBody[locale]}
            </p>
            <Link
              href={localeHref("/about", locale)}
              className="mt-8 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-primary border-b border-primary pb-1 hover:text-foreground hover:border-foreground transition-colors"
            >
              {FOUNDER_PAGE.backToAbout[locale]}
              <ArrowUpRight size={12} className="rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      {projects.length > 0 && (
        <section className="border-b border-border px-6 md:px-10 py-20">
          <div className="max-w-screen-xl mx-auto">
            <h2
              className="font-black uppercase text-foreground mb-3"
              style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(1.75rem, 3vw, 2.5rem)", letterSpacing: "-0.01em" }}
            >
              {FOUNDER_PAGE.projectsHeading[locale]}
            </h2>
            {/* Stated plainly: these are studio projects. The page does not claim
                sole authorship for an individual, which the data cannot support. */}
            <p className="text-muted-foreground text-xs mb-10">{FOUNDER_PAGE.projectsNote[locale]}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {projects.map((p) => {
                const title = PROJECT_COPY[p.slug]?.title[locale] ?? p.title;
                return (
                  <FadeUp key={p.slug}>
                    <Link href={localeHref(`/work/${p.slug}`, locale)} className="group block">
                      <div className="relative aspect-[4/3] overflow-hidden bg-card">
                        <ShimmerImage
                          src={p.cover}
                          alt={locale === "ar" ? title : p.alt}
                          fill
                          sizes="(max-width:768px) 100vw, 33vw"
                          className="object-cover saturate-[0.75] transition-all duration-700 group-hover:saturate-100 group-hover:scale-[1.03]"
                        />
                      </div>
                      <p className="mt-4 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                        {PROJECT_COPY[p.slug]?.category[locale] ?? p.category}
                      </p>
                      <h3
                        className="mt-2 font-black uppercase text-foreground text-xl group-hover:text-primary transition-colors"
                        style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                      >
                        {title}
                      </h3>
                    </Link>
                  </FadeUp>
                );
              })}
            </div>

            <Link
              href={localeHref("/work", locale)}
              className="mt-12 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-foreground border-b border-border pb-1 hover:border-primary hover:text-primary transition-colors"
            >
              {FOUNDER_PAGE.viewAllWork[locale]}
              <ArrowUpRight size={12} className="rtl:-scale-x-100" />
            </Link>
          </div>
        </section>
      )}

      {/* OTHER FOUNDER + CTA */}
      <section className="px-6 md:px-10 py-20">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          {other && (
            <Link href={localeHref(`/founders/${other.slug}`, locale)} className="group">
              <span className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground block mb-3">
                {FOUNDER_PAGE.otherFounder[locale]}
              </span>
              <span
                className="font-black uppercase text-foreground group-hover:text-primary transition-colors inline-flex items-center gap-3"
                style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(1.5rem, 3vw, 2.25rem)" }}
              >
                {other.name[locale]}
                <ArrowUpRight size={20} className="text-primary rtl:-scale-x-100" />
              </span>
            </Link>
          )}
          <EmailLink className="inline-flex items-center gap-2 bg-primary text-background text-xs uppercase tracking-[0.2em] px-8 py-4 font-bold hover:bg-foreground transition-colors w-fit">
            {FOUNDER_PAGE.startProject[locale]}
          </EmailLink>
        </div>
      </section>

      <div className="border-t border-border px-6 md:px-10 py-6">
        <div className="max-w-screen-xl mx-auto">
          <Link
            href={localeHref("/about", locale)}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={14} className="rtl:-scale-x-100" /> {FOUNDER_PAGE.backToAbout[locale]}
          </Link>
        </div>
      </div>
    </div>
  );
}
