import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, siteCard } from "@/lib/ogCard";

// Default social image for every page that does not have its own.
export const alt = "Christ Apostolic Church Salvation Center, Randallstown, MD";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(await siteCard(), { ...size });
}
