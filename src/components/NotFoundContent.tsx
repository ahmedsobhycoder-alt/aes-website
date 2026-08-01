import Link from "next/link";

/**
 * Shared 404 markup, rendered from two places:
 *
 *  - src/app/(en)/not-found.tsx        — the App Router boundary
 *  - src/app/(en)/not-found-page/page.tsx — a real route, which is the only way
 *    to get this design into the static out/404.html (see scripts/copy-404.mjs)
 *
 * Both go through the (en) root layout, so the page arrives with Nav, Footer,
 * the site CSS and a correct <html lang="en" dir="ltr">.
 */
export default function NotFoundContent() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-32 text-center">
      <p
        className="text-primary mb-6 text-xs tracking-[0.4em] uppercase"
        style={{ fontFamily: "var(--font-barlow)" }}
      >
        Error 404
      </p>
      <h1
        className="mb-8 text-6xl leading-[0.9] font-black tracking-tight md:text-8xl"
        style={{ fontFamily: "var(--font-barlow)" }}
      >
        Page Not Found
      </h1>
      <p className="mb-12 max-w-md text-base leading-relaxed opacity-70">
        The page you&apos;re looking for doesn&apos;t exist, or it has moved.
      </p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/"
          className="border-foreground bg-foreground text-background border px-10 py-4 text-xs tracking-[0.25em] uppercase transition-opacity hover:opacity-80"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          Back to Home
        </Link>
        <Link
          href="/work/"
          className="border-foreground/30 hover:border-foreground border px-10 py-4 text-xs tracking-[0.25em] uppercase transition-colors"
          style={{ fontFamily: "var(--font-barlow)" }}
        >
          View Our Work
        </Link>
      </div>
    </main>
  );
}
