import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, eventCard } from "@/lib/ogCard";

export const alt = "CACNA 50th Anniversary Celebration, October 10, 2026";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    await eventCard("cacna-50th-anniversary-2026", { kicker: "Golden Jubilee", place: "CAC Village, Blue Ridge Summit, PA", withTime: true }),
    { ...size },
  );
}
