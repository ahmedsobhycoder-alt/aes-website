"use client";
import { SITE } from "@/data/site";

type A = { className?: string; children: React.ReactNode };

export function CallLink({ className, children }: A) {
  return <a data-cta="call-click" href={`tel:${SITE.contact.phoneHref}`} className={className}>{children}</a>;
}
export function WhatsAppLink({ className, children }: A) {
  return <a data-cta="whatsapp-click" href={`https://wa.me/${SITE.contact.whatsapp}`} target="_blank" rel="noreferrer" className={className}>{children}</a>;
}
export function EmailLink({ className, children }: A) {
  return <a data-cta="email-click" href={`mailto:${SITE.contact.email}`} className={className}>{children}</a>;
}
export function SocialLink({ href, label, className, children }: A & { href: string; label: string }) {
  return <a data-cta="social-click" data-social={label} href={href} target="_blank" rel="noreferrer" className={className}>{children}</a>;
}
