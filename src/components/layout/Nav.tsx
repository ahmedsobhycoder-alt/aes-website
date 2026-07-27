"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { SITE } from "@/data/site";

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "border-b border-border bg-background/95 backdrop-blur-sm" : ""
      }`}
    >
      <nav className="flex items-center justify-between px-6 md:px-10 h-16">
        <Link href="/" className="flex items-center gap-1" aria-label="AES — Ayman Ehab Studio, home">
          <Image
            src="/aes-logo.png"
            alt="AES — Ayman Ehab Studio"
            width={360}
            height={206}
            priority
            className="h-6 w-auto"
          />

        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {SITE.nav.map((link) => (
            <li key={link.label}>
              <Link
                href={link.to}
                className={`text-xs uppercase tracking-[0.15em] transition-colors duration-200 ${
                  pathname === link.to ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] border border-primary text-primary px-4 py-2 hover:bg-primary hover:text-background transition-all duration-200"
          >
            Enquire
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-foreground p-1"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden bg-background border-t border-border px-6 py-8">
          <ul className="flex flex-col gap-6">
            {SITE.nav.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.to}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl uppercase font-black tracking-tight text-foreground hover:text-primary transition-colors"
                  style={{ fontFamily: "var(--font-barlow), sans-serif" }}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
