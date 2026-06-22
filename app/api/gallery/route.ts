import { NextResponse } from "next/server";
import GALLERY_IDS from "@/lib/gallery-ids.json";

// Gallery images are pre-fetched from Cloudinary and stored in lib/gallery-ids.json.
// Run `node scripts/fetch-gallery.mjs` locally to refresh after new uploads.
const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "dkmn2rtbc";

export const revalidate = 86400; // static — 24h cache

const SAMPLE_IDS = new Set([
  "main-sample", "cld-sample", "cld-sample-2",
  "cld-sample-3", "cld-sample-4", "cld-sample-5", "sample",
]);

export async function GET() {
  const ids = (GALLERY_IDS as string[]).filter((id) => !SAMPLE_IDS.has(id));

  const photos = ids.map((id) => {
    const slug = id.split("/").pop() ?? id;
    const alt = slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return {
      src:   `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1400/${id}`,
      thumb: `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_500/${id}`,
      alt,
      id,
    };
  });

  return NextResponse.json({ photos, total: photos.length });
}
