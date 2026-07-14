"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { FadeUp } from "@/components/animations";
import { SITE } from "@/data/site";
import { CallLink, WhatsAppLink, EmailLink, SocialLink } from "@/components/Cta";

const SERVICES_OPTIONS = ["Art Direction", "Execution & Construction", "Food & Beverage Consultancy"];

type ContactForm = { name: string; email: string; service: string; message: string };

async function submitLead(payload: ContactForm) {
  // Wire point for admin panel / lead API. UI-only for now.
  console.info("lead", { ...payload, cta: "contact-form-submit" });
  return true;
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const reduce = useReducedMotion();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await submitLead(form);
    setSubmitted(true);
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
          <Image
            src="/projects/salon-ali-yehia/02.jpg"
            alt="AES interior — Salon Ali Yehia"
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
            <span className="text-[10px] uppercase tracking-[0.3em] text-primary block mb-6">Get In Touch</span>
            <h1
              className="font-black uppercase text-foreground leading-[0.88]"
              style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(4rem, 10vw, 10rem)", letterSpacing: "-0.02em" }}
            >
              Let's Work<br /><span className="text-primary">Together</span>
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
                We work with brands, businesses, and individuals who care deeply about the quality of what they make. If that sounds like you, we'd like to hear from you.
              </p>
            </FadeUp>

            <FadeUp delay={0.1} className="flex flex-col gap-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3">Email</p>
                <EmailLink className="flex items-center gap-2 text-foreground text-sm hover:text-primary transition-colors">
                  <Mail size={14} className="text-muted-foreground" />
                  {SITE.contact.email}
                </EmailLink>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3">Phone</p>
                <CallLink className="flex items-center gap-2 text-foreground text-sm hover:text-primary transition-colors">
                  <Phone size={14} className="text-muted-foreground" />
                  {SITE.contact.phone}
                </CallLink>
                <WhatsAppLink className="flex items-center gap-2 text-foreground text-sm hover:text-primary transition-colors mt-2">
                  <MessageCircle size={14} className="text-muted-foreground" />
                  WhatsApp
                </WhatsAppLink>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-3">Studio</p>
                <p className="flex items-start gap-2 text-foreground text-sm leading-relaxed">
                  <MapPin size={14} className="text-muted-foreground mt-0.5 flex-shrink-0" />
                  {SITE.contact.location}
                </p>
              </div>
            </FadeUp>

            <FadeUp delay={0.2}>
              <p className="text-[10px] uppercase tracking-[0.3em] text-primary mb-4">Follow</p>
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
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="border border-border p-10 flex flex-col items-start gap-4"
              >
                <span className="text-[10px] uppercase tracking-[0.3em] text-primary">Message Received</span>
                <p
                  className="font-black uppercase text-foreground"
                  style={{ fontFamily: "var(--font-barlow), sans-serif", fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.02em" }}
                >
                  Thank You
                </p>
                <p className="text-muted-foreground text-sm leading-loose">
                  We'll be in touch within 2 business days.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} data-cta="contact-form-submit" className="flex flex-col gap-6">
                {[
                  { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                  { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
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
                    Service Interest
                  </label>
                  <select
                    id="service"
                    value={form.service}
                    onChange={(e) => setForm({ ...form, service: e.target.value })}
                    className="bg-transparent border-b border-border text-foreground text-sm py-3 outline-none focus:border-primary transition-colors appearance-none"
                  >
                    <option value="" disabled className="bg-background">Select a service</option>
                    {SERVICES_OPTIONS.map((s) => (
                      <option key={s} value={s} className="bg-background">{s}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us about your project"
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="bg-transparent border-b border-border text-foreground text-sm py-3 outline-none focus:border-primary transition-colors resize-none placeholder:text-muted-foreground/40"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center gap-3 bg-primary text-background text-xs uppercase tracking-[0.2em] px-8 py-4 font-bold hover:bg-foreground hover:text-background transition-colors duration-200 w-fit"
                >
                  Send Enquiry <ArrowUpRight size={14} />
                </button>
              </form>
            )}
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
