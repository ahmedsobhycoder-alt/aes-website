"use client";
import { useState } from "react";
import ShimmerImage from "@/components/ShimmerImage";
import { ArrowUpRight, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { FadeUp } from "@/components/animations";
import { SITE } from "@/data/site";
import { CallLink, WhatsAppLink, EmailLink, SocialLink } from "@/components/Cta";
import { useLocale } from "@/i18n/LocaleProvider";
import { CONTACT, CONTACT_SERVICE_OPTIONS } from "@/i18n/messages";
import { buildMailtoHref, sendEnquiry } from "@/lib/enquiry";

type ContactForm = { name: string; email: string; service: string; message: string };
type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState<ContactForm>({ name: "", email: "", service: "", message: "" });
  // Honeypot. Kept out of `form` so it can never be sent as real content.
  const [botcheck, setBotcheck] = useState("");
  const reduce = useReducedMotion();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    const result = await sendEnquiry({ ...form, botcheck });

    if (result.ok) {
      setStatus("sent");
      setForm({ name: "", email: "", service: "", message: "" });
      return;
    }

    // The form values are deliberately left intact so a retry costs nothing.
    // `unconfigured` means NEXT_PUBLIC_WEB3FORMS_KEY is missing from the build —
    // logged loudly because it is a deployment fault, not a visitor's.
    if (result.reason === "unconfigured") {
      console.error(
        "[contact] NEXT_PUBLIC_WEB3FORMS_KEY is not set — enquiries cannot be delivered.",
      );
    }
    setStatus("error");
  }

  return (
    <div className="pt-16">
      {/* HEADER */}
      <section className="relative overflow-hidden border-b border-border">
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.08, filter: "saturate(0.4) brightness(0.5)" }}
          animate={{ opacity: 1, scale: 1, filter: "saturate(1) brightness(1)" }}
          transition={{ duration: 1.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="absolute inset-0"
        >
          <ShimmerImage
            src="/projects/salon-ali-yehia/02.jpg"
            alt={CONTACT.heroAlt[locale]}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/40" />
        <div className="relative max-w-screen-xl mx-auto px-6 md:px-10 py-32 md:py-44">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary block mb-6">
              {CONTACT.heroEyebrow[locale]}
            </span>
            <h1
              className="font-black uppercase text-foreground leading-[0.88]"
              style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(4rem, 10vw, 10rem)", letterSpacing: "-0.02em" }}
            >
              {CONTACT.heroLine1[locale]}<br />
              <span className="text-primary">{CONTACT.heroLine2[locale]}</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* SPLIT LAYOUT */}
      <section className="px-6 md:px-10 py-24">
        <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* LEFT: INFO */}
          <div className="flex flex-col gap-12">
            <FadeUp>
              <p className="text-muted-foreground text-sm leading-loose max-w-sm">
                {CONTACT.intro[locale]}
              </p>
            </FadeUp>

            <FadeUp delay={0.1} className="flex flex-col gap-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3">{CONTACT.emailLabel[locale]}</p>
                <EmailLink className="flex items-center gap-2 text-foreground text-sm hover:text-primary transition-colors">
                  <Mail size={14} className="text-muted-foreground" />
                  {SITE.contact.email}
                </EmailLink>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3">{CONTACT.phoneLabel[locale]}</p>
                <CallLink className="flex items-center gap-2 text-foreground text-sm hover:text-primary transition-colors">
                  <Phone size={14} className="text-muted-foreground" />
                  {SITE.contact.phone}
                </CallLink>
                <WhatsAppLink className="flex items-center gap-2 text-foreground text-sm hover:text-primary transition-colors mt-2">
                  <MessageCircle size={14} className="text-muted-foreground" />
                  {CONTACT.whatsapp[locale]}
                </WhatsAppLink>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3">{CONTACT.studioLabel[locale]}</p>
                <p className="flex items-start gap-2 text-foreground text-sm leading-relaxed">
                  <MapPin size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                  {CONTACT.location[locale]}
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-4">{CONTACT.followLabel[locale]}</p>
              <div className="flex flex-col gap-3">
                {SITE.socials.map((s) => (
                  <SocialLink key={s.label} href={s.href} label={s.label} className="flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-primary transition-colors">
                    {s.label} <ArrowUpRight size={10} />
                  </SocialLink>
                ))}
              </div>
            </FadeUp>
          </div>

          {/* RIGHT: FORM */}
          <FadeUp delay={0.15}>
            {status === "sent" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="border border-border p-10 flex flex-col items-start gap-4"
                role="status"
                aria-live="polite"
              >
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary">
                  {CONTACT.sentEyebrow[locale]}
                </span>
                <p
                  className="font-black uppercase text-foreground"
                  style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
                >
                  {CONTACT.sentHeading[locale]}
                </p>
                <p className="text-muted-foreground text-sm leading-loose">
                  {CONTACT.sentBody[locale]}
                </p>

                <div className="border-t border-border pt-4 mt-2 w-full">
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {CONTACT.another[locale]}
                  </button>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} data-cta="contact-form-submit" className="flex flex-col gap-6" noValidate={false}>
                {/* Honeypot. Hidden from sight and from assistive tech, and skipped
                    by keyboard tabbing — anything in it came from a bot. */}
                <div className="absolute left-[-9999px] w-px h-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="botcheck">Do not fill this in</label>
                  <input
                    id="botcheck"
                    name="botcheck"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={botcheck}
                    onChange={(e) => setBotcheck(e.target.value)}
                  />
                </div>

                {[
                  {
                    id: "name",
                    label: CONTACT.nameLabel[locale],
                    type: "text",
                    placeholder: CONTACT.namePlaceholder[locale],
                  },
                  {
                    id: "email",
                    label: CONTACT.emailLabel[locale],
                    type: "email",
                    placeholder: CONTACT.emailPlaceholder[locale],
                  },
                ].map((field) => (
                  <div key={field.id} className="flex flex-col gap-2">
                    <label htmlFor={field.id} className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      required
                      value={form[field.id as keyof typeof form]}
                      onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                      className="bg-transparent border-b border-border text-foreground text-sm py-3 outline-none focus:border-primary transition-colors placeholder:text-muted-foreground/40"
                    />
                  </div>
                ))}

                <div className="flex flex-col gap-2">
                  <label htmlFor="service" className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {CONTACT.serviceLabel[locale]}
                  </label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="bg-transparent border-b border-border text-foreground text-sm py-3 outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option value="" disabled className="bg-background">
                      {CONTACT.servicePlaceholder[locale]}
                    </option>
                    {CONTACT_SERVICE_OPTIONS.map((s) => (
                      // Value stays English so the enquiry email reads consistently
                      // for the studio regardless of the visitor's language.
                      <option key={s.en} value={s.en} className="bg-background">
                        {s[locale]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {CONTACT.messageLabel[locale]}
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder={CONTACT.messagePlaceholder[locale]}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="bg-transparent border-b border-border text-foreground text-sm py-3 outline-none focus:border-primary transition-colors resize-none placeholder:text-muted-foreground/40"
                  />
                </div>

                {/* Delivery failed. The form keeps its values, so retrying is one
                    click, and a mailto: escape hatch is offered as a last resort. */}
                {status === "error" && (
                  <div
                    className="border border-destructive/40 bg-destructive/5 p-6 flex flex-col items-start gap-3"
                    role="alert"
                    aria-live="assertive"
                  >
                    <span className="text-[10px] uppercase tracking-[0.3em] text-destructive">
                      {CONTACT.errorEyebrow[locale]}
                    </span>
                    <p
                      className="font-black uppercase text-foreground text-xl"
                      style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                    >
                      {CONTACT.errorHeading[locale]}
                    </p>
                    <p className="text-muted-foreground text-xs leading-loose">
                      {CONTACT.errorBody[locale]}
                    </p>
                    <p className="text-muted-foreground text-xs leading-loose">
                      {CONTACT.orEmailDirect[locale]}{" "}
                      <EmailLink className="text-primary hover:text-foreground transition-colors">
                        {SITE.contact.email}
                      </EmailLink>
                      .
                    </p>
                    <a
                      href={buildMailtoHref(form)}
                      className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-primary border-b border-primary pb-1 hover:text-foreground hover:border-foreground transition-colors"
                    >
                      {CONTACT.openMailApp[locale]} <ArrowUpRight size={12} className="rtl:-scale-x-100" />
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  aria-busy={status === "sending"}
                  className="mt-2 inline-flex items-center gap-3 bg-primary text-background text-xs uppercase tracking-[0.2em] px-8 py-4 font-bold hover:bg-foreground hover:text-background transition-colors duration-200 w-fit disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary disabled:hover:text-background"
                >
                  {status === "sending"
                    ? CONTACT.sending[locale]
                    : status === "error"
                      ? CONTACT.retry[locale]
                      : CONTACT.submit[locale]}
                  <ArrowUpRight size={14} className="rtl:-scale-x-100" />
                </button>
              </form>
            )}
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
