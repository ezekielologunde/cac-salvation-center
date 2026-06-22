import type { MetadataRoute } from "next";
import { SITE_URL, ROUTES } from "@/lib/site";
import { POSTS } from "@/lib/blog";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const staticRoutes: MetadataRoute.Sitemap = ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: WEEKLY.has(path) ? "weekly" : "monthly",
    priority,
  }));
  const blogRoutes: MetadataRoute.Sitemap = POSTS.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.dateIso),
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }));
  return [...staticRoutes, ...blogRoutes];
}
