/**
 * In-place optimiser for /public/projects.
 *
 * Re-encodes every image over ITSELF, keeping the exact filename and extension,
 * so no path in src/ can break. Deliberately different from optimize-images.mjs,
 * which is an import pipeline: that one reads from a `projectss/` staging folder
 * and `rm -rf`s the destination first, which would destroy anything already in
 * public/projects that did not come from that folder.
 *
 *   node scripts/optimize-public-images.mjs            # dry run, changes nothing
 *   node scripts/optimize-public-images.mjs --apply    # rewrite in place
 */
import sharp from "sharp";
import { readdir, stat, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = "public/projects";
const MAX_EDGE = 2000;
const JPEG_QUALITY = 80;
/** Below this, re-encoding costs quality for negligible gain. */
const SKIP_UNDER_BYTES = 300 * 1024;

const APPLY = process.argv.includes("--apply");
const mb = (n) => (n / 1048576).toFixed(1);

async function listImages(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out.push(...(await listImages(full)));
    else if (/\.(jpe?g|png)$/i.test(e.name)) out.push(full);
  }
  return out;
}

async function optimise(file) {
  const before = (await stat(file)).size;
  const ext = path.extname(file).toLowerCase();

  // sharp cannot stream a file onto itself, so read fully into memory first.
  const input = await readFile(file);
  const meta = await sharp(input).metadata();

  const oversized = (meta.width ?? 0) > MAX_EDGE || (meta.height ?? 0) > MAX_EDGE;
  if (before < SKIP_UNDER_BYTES && !oversized) return { before, after: before, skipped: true };

  let pipeline = sharp(input)
    .rotate() // apply EXIF orientation before stripping metadata
    .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true });

  pipeline =
    ext === ".png"
      ? // Kept as PNG so the extension — and every reference to it — stays valid.
        pipeline.png({ compressionLevel: 9, effort: 10 })
      : pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true });

  const output = await pipeline.toBuffer();

  // Never write a result that is larger than what we started with.
  if (output.length >= before) return { before, after: before, skipped: true };

  if (APPLY) await writeFile(file, output);
  return { before, after: output.length, skipped: false };
}

async function run() {
  const folders = (await readdir(ROOT, { withFileTypes: true }))
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort();

  let totalBefore = 0;
  let totalAfter = 0;
  let processed = 0;
  let skipped = 0;

  for (const folder of folders) {
    const files = await listImages(path.join(ROOT, folder));
    let fb = 0;
    let fa = 0;
    for (const f of files) {
      try {
        const r = await optimise(f);
        fb += r.before;
        fa += r.after;
        r.skipped ? skipped++ : processed++;
      } catch (e) {
        console.error(`  ! ${f}: ${e.message}`);
      }
    }
    totalBefore += fb;
    totalAfter += fa;
    const saved = fb > 0 ? Math.round((1 - fa / fb) * 100) : 0;
    console.log(
      `  ${folder.padEnd(24)} ${String(files.length).padStart(3)} files   ` +
        `${mb(fb).padStart(7)} MB -> ${mb(fa).padStart(7)} MB   -${saved}%`,
    );
  }

  console.log("\n" + "=".repeat(72));
  console.log(`  ${APPLY ? "APPLIED" : "DRY RUN — nothing written"}`);
  console.log(`  re-encoded ${processed} files, skipped ${skipped} (already small)`);
  console.log(
    `  TOTAL  ${mb(totalBefore)} MB -> ${mb(totalAfter)} MB   ` +
      `saved ${mb(totalBefore - totalAfter)} MB ` +
      `(-${totalBefore > 0 ? Math.round((1 - totalAfter / totalBefore) * 100) : 0}%)`,
  );
}

run();
