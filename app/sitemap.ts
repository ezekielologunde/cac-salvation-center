import type { MetadataRoute } from "next";
import { SITE_URL, ROUTES } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority,
  }));
}
