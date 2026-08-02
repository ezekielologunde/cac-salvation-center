import type { MetadataRoute } from "next";
import { SITE_URL, ROUTES } from "@/lib/site";
import { POSTS } from "@/lib/blog";
import { specialEvents } from "@/lib/events";
import { createServiceClient } from "@/lib/supabase/server";

/** startLocal is "YYYYMMDDTHHMMSS" (America/New_York wall clock) — parse the
 *  date part only, which is precise enough for a sitemap lastModified hint. */
function eventDate(startLocal: string): Date {
  return new Date(`${startLocal.slice(0, 4)}-${startLocal.slice(4, 6)}-${startLocal.slice(6, 8)}`);
}

/** Dedicated event landing pages have no separate "last edited" timestamp,
 *  but their content is tied to the event itself — so anchor lastModified to
 *  the event's own date instead of a blanket "now" on every build. */
const EVENT_LAST_MODIFIED = new Map(
  specialEvents.filter((e) => e.href).map((e) => [e.href!, eventDate(e.startLocal)])
);

/** Pages whose content turns over often enough to hint "weekly"; the rest are "monthly". */
const WEEKLY = new Set([
  "/",
  "/online",
  "/events",
  "/events/good-women-anniversary",
  "/events/cacna-2026",
  "/calendar",
  "/devotional",
  "/bible-plan",
  "/blog",
  "/testimonies",
]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const staticRoutes: MetadataRoute.Sitemap = ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified: EVENT_LAST_MODIFIED.get(path) ?? lastModified,
    changeFrequency: WEEKLY.has(path) ? "weekly" : "monthly",
    priority,
  }));

  // Static blog posts (source of truth for the current blog)
  const staticBlogSlugs = new Set(POSTS.map((p) => p.slug));
  const staticBlogRoutes: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.dateIso),
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }));

  // Dynamic blog posts from Supabase (deduped against static set)
  let dynamicBlogRoutes: MetadataRoute.Sitemap = [];
  try {
    const supabase = createServiceClient();
    const { data: posts } = await supabase
      .from("blog_posts")
      .select("slug, updated_at")
      .eq("published", true);

    dynamicBlogRoutes = (posts ?? [])
      .filter((p) => !staticBlogSlugs.has(p.slug))
      .map((p) => ({
        url: `${SITE_URL}/blog/${p.slug}`,
        lastModified: new Date(p.updated_at ?? Date.now()),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));
  } catch {
    // Non-fatal: Supabase unavailable at build time is acceptable
  }

  return [...staticRoutes, ...staticBlogRoutes, ...dynamicBlogRoutes];
}
