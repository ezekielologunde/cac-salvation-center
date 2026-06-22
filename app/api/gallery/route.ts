import { NextResponse } from "next/server";

// Cloudinary Admin API — fetches all images from the cloud.
//
// Required Vercel env vars:
//   CLOUDINARY_API_KEY          — found in Cloudinary dashboard → API Keys
//   CLOUDINARY_API_SECRET       — same location (keep secret, server-only)
//   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME — your cloud name (dkmn2rtbc)
//
// When credentials are absent the route returns 503 and the gallery
// component falls back to the six static /images/ photos.

const CLOUD  = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? "dkmn2rtbc";
const KEY    = process.env.CLOUDINARY_API_KEY ?? "";
const SECRET = process.env.CLOUDINARY_API_SECRET ?? "";

export const revalidate = 3600;

export async function GET() {
  if (!KEY || !SECRET) {
    return NextResponse.json({ error: "Cloudinary credentials not configured" }, { status: 503 });
  }

  try {
    const auth = Buffer.from(`${KEY}:${SECRET}`).toString("base64");

    // Use the Search API — supports new asset_folder uploads and sorts by date
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD}/resources/search`,
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          expression: "resource_type:image",
          sort_by: [{ uploaded_at: "desc" }],
          max_results: 200,
        }),
        next: { revalidate: 3600 },
      },
    );

    if (!res.ok) {
      const body = await res.text();
      console.error("Cloudinary Search API error:", body);
      return NextResponse.json({ error: "Cloudinary upstream error" }, { status: 502 });
    }

    const json = await res.json();

    const photos = (json.resources ?? []).map((r: Record<string, string | number>) => {
      const slug = String(r.public_id).split("/").pop() ?? String(r.public_id);
      const alt  = slug.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
      return {
        src:   `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_1400/${r.public_id}`,
        thumb: `https://res.cloudinary.com/${CLOUD}/image/upload/f_auto,q_auto,w_500/${r.public_id}`,
        alt,
        id: String(r.public_id),
      };
    });

    return NextResponse.json({ photos, total: photos.length });
  } catch (err) {
    console.error("Gallery route failed:", err);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
