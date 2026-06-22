import type { MetadataRoute } from "next";
import { SITE_URL, ROUTES } from "@/lib/site";

/** Pages whose content turns over often enough to hint "weekly"; the rest are "monthly". */
const WEEKLY = new Set([
  "/",
  "/online",
  "/events",
  "/events/good-women-anniversary",
  "/calendar",
  "/devotional",
  "/bible-plan",
  "/blog",
  "/testimonies",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency: WEEKLY.has(path) ? "weekly" : "monthly",
    priority,
  }));
}
