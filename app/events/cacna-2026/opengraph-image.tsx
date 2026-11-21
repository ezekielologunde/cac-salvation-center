import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, eventCard } from "@/lib/ogCard";

export const alt = "CACNA 2026 Annual Convention, July 13-18, 2026";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    await eventCard("cacna-convention-2026", { kicker: "Annual Convention", place: "CAC Village, Blue Ridge Summit, PA" }),
    { ...size },
  );
}
