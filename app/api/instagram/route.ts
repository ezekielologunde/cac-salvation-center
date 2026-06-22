import { NextResponse } from "next/server";

// Instagram Graph API — fetches latest posts for the connected business/creator account.
//
// Required env vars (set in Vercel dashboard → Settings → Environment Variables):
//   INSTAGRAM_ACCESS_TOKEN  — long-lived token (valid 60 days; see token-refresh below)
//   INSTAGRAM_ACCOUNT_ID    — numeric IG account ID (returned by /me endpoint)
//
// To get a long-lived token:
//   curl "https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_id=APP_ID&client_secret=APP_SECRET&access_token=SHORT_LIVED_TOKEN"
//
// To refresh a long-lived token (do this before it expires):
//   curl "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=LONG_LIVED_TOKEN"

const TOKEN   = process.env.INSTAGRAM_ACCESS_TOKEN ?? "";
const ACCOUNT = process.env.INSTAGRAM_ACCOUNT_ID ?? "me";
const FIELDS  = "id,media_type,media_url,thumbnail_url,permalink,caption,timestamp";
const LIMIT   = 9;

export const revalidate = 3600; // re-fetch from Instagram at most once per hour

export async function GET() {
  if (!TOKEN) {
    return NextResponse.json({ error: "INSTAGRAM_ACCESS_TOKEN not set" }, { status: 503 });
  }

  try {
    const url = `https://graph.instagram.com/v21.0/${ACCOUNT}/media?fields=${FIELDS}&limit=${LIMIT}&access_token=${TOKEN}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      const body = await res.text();
      console.error("Instagram API error:", body);
      return NextResponse.json({ error: "Upstream error", detail: body }, { status: 502 });
    }

    const json = await res.json();

    // Normalise: videos expose thumbnail_url instead of media_url
    const posts = (json.data ?? []).map((p: Record<string, string>) => ({
      id:        p.id,
      type:      p.media_type,
      image:     p.thumbnail_url ?? p.media_url,
      permalink: p.permalink,
      caption:   p.caption ?? "",
      timestamp: p.timestamp,
    }));

    return NextResponse.json({ posts });
  } catch (err) {
    console.error("Instagram fetch failed:", err);
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
