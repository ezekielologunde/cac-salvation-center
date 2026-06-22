/**
 * Upload local Gallery/ JPEGs to Cloudinary.
 *
 * Usage:
 *   node scripts/upload-gallery.mjs
 *
 * After a successful run:
 *   node scripts/fetch-gallery.mjs   ← refreshes lib/gallery-ids.json
 */

import { readFileSync, readdirSync } from "fs";
import { resolve, dirname, extname, basename } from "path";
import { fileURLToPath } from "url";
import { createHash } from "crypto";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const GALLERY_DIR = resolve(ROOT, "Gallery");

const CLOUD  = "dkmn2rtbc";
const KEY    = "594978392965526";
const SECRET = "rxa3LLoPk2DGJDndIzTTMoNe5vc";

// Root-level JPEGs only (skip subfolders, which may contain personal photos)
const files = readdirSync(GALLERY_DIR)
  .filter((f) => /\.(jpg|jpeg)$/i.test(f))
  .sort()
  .map((f) => resolve(GALLERY_DIR, f));

console.log(`Found ${files.length} JPEGs in Gallery/`);

let ok = 0, skip = 0, fail = 0;

for (let i = 0; i < files.length; i++) {
  const filePath = files[i];
  const name = basename(filePath, extname(filePath));
  const label = `[${i + 1}/${files.length}]`;

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = createHash("sha1")
    .update(`timestamp=${timestamp}${SECRET}`)
    .digest("hex");

  const form = new FormData();
  const blob = new Blob([readFileSync(filePath)], { type: "image/jpeg" });
  form.append("file", blob, basename(filePath));
  form.append("api_key", KEY);
  form.append("timestamp", String(timestamp));
  form.append("signature", signature);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`,
      { method: "POST", body: form, signal: AbortSignal.timeout(90_000) }
    );
    const data = await res.json();

    if (res.ok && data.public_id) {
      ok++;
      console.log(`✓ ${label} ${name} → ${data.public_id}`);
    } else if (data.error?.message?.includes("already exists")) {
      skip++;
      console.log(`- ${label} ${name} — already uploaded`);
    } else {
      fail++;
      console.error(`✗ ${label} ${name} — ${data.error?.message ?? JSON.stringify(data).slice(0, 120)}`);
    }
  } catch (err) {
    fail++;
    console.error(`✗ ${label} ${name} — ${err.message}`);
  }

  // Small pause to stay within Cloudinary rate limits
  await new Promise((r) => setTimeout(r, 150));
}

console.log(`\nDone — ${ok} uploaded, ${skip} already existed, ${fail} failed.`);
if (ok + skip > 0) {
  console.log("\nNext step: node scripts/fetch-gallery.mjs");
}
