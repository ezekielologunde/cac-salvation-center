const CHANNEL_ID = "UCoogH4HuVXSn4okSpRlsDQA";
const FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

export interface Sermon {
  id: string;
  title: string;
  published: string; // ISO string, or "" if unknown
}

/** Curated fallback so the page never breaks if the feed is unreachable at build. */
const FALLBACK: Sermon[] = [
  { id: "xIZBd9UYIDw", title: "Sunday Worship Service", published: "" },
  { id: "RX1NjOYtDxo", title: "Praise & Worship Service", published: "" },
  { id: "gBGifbZSDBo", title: "CAC — Vision & Mission", published: "" },
];

function decodeXml(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

/**
 * Fetch the latest uploads from the church's YouTube channel via its public RSS
 * feed. Revalidates daily (ISR). Falls back to a curated list on any failure so
 * the build and page always succeed.
 */
export async function getSermons(limit = 9): Promise<Sermon[]> {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error(`feed ${res.status}`);
    const xml = await res.text();
    const entries = xml.split("<entry>").slice(1);
    const sermons: Sermon[] = [];
    for (const entry of entries) {
      const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
      const title = entry.match(/<title>([^<]*)<\/title>/)?.[1];
      const published = entry.match(/<published>([^<]+)<\/published>/)?.[1];
      if (id && title) sermons.push({ id, title: decodeXml(title), published: published ?? "" });
    }
    return sermons.length ? sermons.slice(0, limit) : FALLBACK;
  } catch {
    return FALLBACK;
  }
}

export function formatSermonDate(iso: string): string {
  if (!iso) return "CAC Salvation Center";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "CAC Salvation Center";
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
