import sharp from "sharp";
import { readdir, mkdir, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const SRC = "projectss";
const OUT = "public/projects";

// slug -> source dir (relative to SRC). Files are sorted, then sequentially renamed.
const MAP = {
  "aaly-al-makam": "3ali el maqam",
  "nuwa": "Nuwa",
  "ozel": "Ozel",
  "rixance": "Rixance",
  "magaz-clinic": "magaz CLinic",
  "salon-ali-yehia": "Salon ALi Yehia", // nested subfolders
};

async function listImages(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await listImages(full)));
    else if (/\.(jpe?g|png)$/i.test(entry.name)) out.push(full);
  }
  return out.sort();
}

async function run() {
  for (const [slug, rel] of Object.entries(MAP)) {
    const srcDir = path.join(SRC, rel);
    if (!existsSync(srcDir)) { console.warn("MISSING", srcDir); continue; }
    const outDir = path.join(OUT, slug);
    await rm(outDir, { recursive: true, force: true });
    await mkdir(outDir, { recursive: true });
    const files = await listImages(srcDir);
    let n = 1;
    for (const f of files) {
      const name = String(n).padStart(2, "0") + ".jpg";
      await sharp(f)
        .rotate()
        .resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(path.join(outDir, name));
      n++;
    }
    console.log(slug, "->", n - 1, "images");
  }
}
run();
