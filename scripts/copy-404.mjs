/**
 * Generates out/404.html from the /not-found-page/ route.
 *
 * WHY THIS EXISTS
 * The site uses two root layouts (src/app/(en) and src/app/(ar)) so that Arabic
 * pages can ship <html lang="ar-EG" dir="rtl"> in their static markup. The cost
 * is that src/app/ has no root layout, and Next refuses a root-level
 * not-found.tsx without one ("not-found.tsx doesn't have a root layout").
 * A not-found.tsx inside a route group builds fine but has no effect on the
 * static export — out/404.html stays Next's unstyled built-in page.
 *
 * So the 404 is authored as a real route, rendered through the (en) root layout
 * at build time, then relocated here. The source route is deleted from the
 * output afterwards so the URL is never reachable on the deployed site.
 *
 * Runs automatically via the `postbuild` npm script.
 */
import { access, copyFile, rm, stat } from "node:fs/promises";
import { resolve, relative, sep } from "node:path";

const OUT = resolve(process.cwd(), "out");
const SOURCE = resolve(OUT, "not-found-page", "index.html");
const SOURCE_DIR = resolve(OUT, "not-found-page");

/**
 * Both targets get the same page.
 *  - 404.html         is what a static host serves for an unmatched URL
 *  - 404/index.html   is directly reachable at /404/ because trailingSlash:true
 *                     makes Next emit it; left alone it stays the bare default.
 */
const TARGETS = [resolve(OUT, "404.html"), resolve(OUT, "404", "index.html")];

/** Refuse to touch anything outside out/ — this script deletes a directory. */
function assertInsideOut(p) {
  const rel = relative(OUT, p);
  if (rel.startsWith("..") || rel.startsWith(sep) || resolve(OUT, rel) !== p) {
    throw new Error(`refusing to operate outside out/: ${p}`);
  }
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await exists(SOURCE))) {
    console.error(
      "[copy-404] MISSING: out/not-found-page/index.html\n" +
        "           The 404 route did not build. out/404.html will be Next's\n" +
        "           unstyled default. Check src/app/(en)/not-found-page/page.tsx.",
    );
    process.exitCode = 1;
    return;
  }

  assertInsideOut(SOURCE_DIR);
  TARGETS.forEach(assertInsideOut);

  const before = (await stat(SOURCE)).size;

  for (const target of TARGETS) {
    await copyFile(SOURCE, target);
    const after = (await stat(target)).size;
    if (after !== before) {
      console.error(`[copy-404] size mismatch on ${target}: ${before} -> ${after}`);
      process.exitCode = 1;
      return;
    }
  }

  await rm(SOURCE_DIR, { recursive: true, force: true });

  console.log(
    `[copy-404] wrote out/404.html + out/404/index.html (${before} bytes each); ` +
      "removed out/not-found-page/",
  );
}

await main();
