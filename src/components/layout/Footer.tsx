import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-border px-6 md:px-10 py-12">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="md:col-span-1">
          <Link href="/" className="inline-block mb-3" aria-label="AES — Ayman Ehab Studio, home">
            <Image
              src="/aes-logo.png"
              alt="AES — Ayman Ehab Studio"
              width={360}
              height={206}
              className="h-8 w-auto"
            />
          </Link>
          <p className="text-muted-foreground text-xs leading-relaxed max-w-[180px]">
            {SITE.tagline}
          </p>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-5">Company</p>
          <ul className="flex flex-col gap-3">
            {[
              { label: "About Us", to: "/about" },
              { label: "Our Services", to: "/services" },
              { label: "Work", to: "/work" },
              { label: "Blog", to: "/blog" },
              { label: "Contact", to: "/contact" },
            ].map((l) => (
              <li key={l.label}>
                <Link
                  href={l.to}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors uppercase tracking-[0.1em]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-5">Contact</p>
          <ul className="flex flex-col gap-3">
            <li>
              <a href={`tel:${SITE.contact.phoneHref}`} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {SITE.contact.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.contact.email}`} className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                {SITE.contact.email}
              </a>
            </li>
            <li className="text-xs text-muted-foreground leading-relaxed">
              {SITE.contact.location}
            </li>
          </ul>
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-5">Follow</p>
          <ul className="flex flex-col gap-3">
            {SITE.socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-[0.1em] flex items-center gap-2"
                >
                  {s.label} <ArrowUpRight size={10} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          © 2026 AES — Ayman Ehab Studio. All rights reserved.
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Privacy Policy · Terms of Use
        </p>
      </div>
    </footer>
  );
}
