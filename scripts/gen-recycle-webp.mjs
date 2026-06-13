#!/usr/bin/env node
// Generates small 96x96 WebP copies of every image used by the recycle page into
// public/images/recycle/. Originals in public/images/ are left untouched (they're
// used full-size elsewhere). Re-run after recycling-data.ts is regenerated.
//
// Requires `cwebp` on PATH (Homebrew: `brew install webp`), same as png-to-webp.sh.

import { execFile } from "node:child_process";
import { mkdir, readdir, readFile, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileP = promisify(execFile);
const root = path.resolve(fileURLToPath(import.meta.url), "../..");

const SOURCES = [
  "src/lib/data/recycling-data.ts",
  "src/components/recycling", // *.tsx — picks up the hardcoded recycler icons
];
const IMG_RE = /\/images\/[A-Za-z0-9._-]+\.(?:png|webp|jpe?g)/g;
const OUT_DIR = path.join(root, "public/images/recycle");
const CONCURRENCY = 8;

async function readSourceText(rel) {
  const abs = path.join(root, rel);
  const stat = await readFile(abs).then(() => "file").catch(() => "dir");
  if (stat === "file") return readFile(abs, "utf8");
  // Directory: concat every .tsx file inside it.
  const files = await readdir(abs);
  const texts = await Promise.all(
    files
      .filter((f) => f.endsWith(".tsx"))
      .map((f) => readFile(path.join(abs, f), "utf8")),
  );
  return texts.join("\n");
}

async function collectPaths() {
  const texts = await Promise.all(SOURCES.map(readSourceText));
  const set = new Set();
  for (const text of texts) {
    for (const m of text.matchAll(IMG_RE)) set.add(m[0]);
  }
  return [...set].sort();
}

async function exists(p) {
  return access(p).then(() => true).catch(() => false);
}

async function runPool(items, worker) {
  let i = 0;
  const runners = Array.from({ length: CONCURRENCY }, async () => {
    while (i < items.length) {
      const idx = i++;
      await worker(items[idx]);
    }
  });
  await Promise.all(runners);
}

async function main() {
  const paths = await collectPaths();
  await mkdir(OUT_DIR, { recursive: true });

  const missing = [];
  let converted = 0;

  await runPool(paths, async (webPath) => {
    const src = path.join(root, "public", webPath);
    if (!(await exists(src))) {
      missing.push(webPath);
      return;
    }
    const base = path.basename(webPath).replace(/\.(png|webp|jpe?g)$/i, ".webp");
    const out = path.join(OUT_DIR, base);
    await execFileP("cwebp", ["-q", "100", "-resize", "96", "96", src, "-o", out]);
    converted++;
  });

  console.log(`\nRecycle WebP generation`);
  console.log(`  referenced : ${paths.length}`);
  console.log(`  converted  : ${converted} -> ${path.relative(root, OUT_DIR)}/`);
  console.log(`  missing src: ${missing.length}`);
  if (missing.length) {
    for (const m of missing) console.log(`    - ${m}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
