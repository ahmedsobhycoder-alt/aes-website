"use client";
import { useCallback, useEffect, useRef } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocale } from "@/i18n/LocaleProvider";
import { LIGHTBOX } from "@/i18n/messages";

export type LightboxImage = { src: string; alt: string };

type Props = {
  images: LightboxImage[];
  /** Index of the open image, or null when closed. */
  index: number | null;
  onIndexChange: (i: number) => void;
  onClose: () => void;
};

/**
 * Full-viewport image viewer.
 *
 * Rendered through a portal on document.body so it escapes any ancestor with
 * `overflow: hidden` or a transform — several sections on these pages have both,
 * and a fixed-position child of a transformed ancestor is positioned against
 * that ancestor rather than the viewport, which would clip the overlay.
 *
 * Navigation keys map to physical arrows in both directions (ArrowRight always
 * advances) because the arrows are a spatial control, not a reading order —
 * but the on-screen buttons swap sides under RTL so "next" stays on the side
 * the eye travels toward.
 */
export default function Lightbox({ images, index, onIndexChange, onClose }: Props) {
  const locale = useLocale();
  const reduce = useReducedMotion();
  const open = index !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  // The element focused before opening, so focus can be handed back on close.
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const count = images.length;
  const current = open ? images[index] : undefined;

  const next = useCallback(() => {
    if (index === null || count === 0) return;
    onIndexChange((index + 1) % count);
  }, [index, count, onIndexChange]);

  const prev = useCallback(() => {
    if (index === null || count === 0) return;
    onIndexChange((index - 1 + count) % count);
  }, [index, count, onIndexChange]);

  // Remember the trigger, then restore focus to it when the viewer closes.
  useEffect(() => {
    if (open) {
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      // Focus the dialog so the Escape/arrow handler receives keys immediately
      // and screen readers announce the dialog rather than the page behind it.
      requestAnimationFrame(() => dialogRef.current?.focus());
    } else if (returnFocusRef.current) {
      returnFocusRef.current.focus();
      returnFocusRef.current = null;
    }
  }, [open]);

  // Lock background scroll. The scrollbar width is replaced with padding so the
  // page behind does not shift sideways as it disappears.
  useEffect(() => {
    if (!open) return;
    const { body } = document;
    const prevOverflow = body.style.overflow;
    const prevPadding = body.style.paddingRight;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    if (gap > 0) body.style.paddingRight = `${gap}px`;
    return () => {
      body.style.overflow = prevOverflow;
      body.style.paddingRight = prevPadding;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prev();
      } else if (e.key === "Tab") {
        // Minimal focus trap: the dialog holds only its own controls, so keeping
        // focus inside it is enough to stop tabbing into the page behind.
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>("button");
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (e.shiftKey && (active === first || active === dialogRef.current)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, prev, onClose]);

  // Portals need a DOM target, which does not exist during the static export's
  // server render.
  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && current && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={LIGHTBOX.dialogLabel[locale]}
          tabIndex={-1}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0 : 0.25, ease: "easeOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/97 outline-none backdrop-blur-sm"
          // Clicking the backdrop closes; clicks on the image itself do not
          // bubble here, so the picture stays put when clicked.
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label={LIGHTBOX.close[locale]}
            className="text-foreground/70 hover:text-foreground hover:border-foreground/40 focus-visible:ring-primary absolute end-4 top-4 z-10 border border-transparent p-3 transition-colors focus-visible:ring-2 focus-visible:outline-none"
          >
            <X size={22} />
          </button>

          {count > 1 && (
            <>
              <span
                className="text-muted-foreground absolute start-6 top-6 z-10 text-xs tracking-[0.25em] tabular-nums"
                style={{ fontFamily: "var(--font-barlow)" }}
              >
                {index + 1} / {count}
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                aria-label={LIGHTBOX.previous[locale]}
                className="text-foreground/60 hover:text-foreground focus-visible:ring-primary absolute start-2 z-10 p-4 transition-colors focus-visible:ring-2 focus-visible:outline-none md:start-6"
              >
                <ChevronLeft size={34} className="rtl:-scale-x-100" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                aria-label={LIGHTBOX.next[locale]}
                className="text-foreground/60 hover:text-foreground focus-visible:ring-primary absolute end-2 z-10 p-4 transition-colors focus-visible:ring-2 focus-visible:outline-none md:end-6"
              >
                <ChevronRight size={34} className="rtl:-scale-x-100" />
              </button>
            </>
          )}

          <motion.div
            key={current.src}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative h-[88vh] w-[92vw] md:h-[90vh] md:w-[88vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.src}
              alt={current.alt}
              fill
              // object-contain, not cover: the whole frame must be visible here.
              className="object-contain"
              sizes="100vw"
              priority
            />
          </motion.div>

          <p className="text-muted-foreground absolute bottom-5 left-1/2 max-w-[80vw] -translate-x-1/2 truncate text-center text-xs">
            {current.alt}
          </p>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
