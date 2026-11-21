import { ImageResponse } from "next/og";
import { OG_CONTENT_TYPE, OG_SIZE, eventCard } from "@/lib/ogCard";

export const alt = "CACNA 2027 Annual Convention, July 12-17, 2027";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default async function Image() {
  return new ImageResponse(
    await eventCard("cacna-convention-2027", { kicker: "Annual Convention", place: "CAC Village, Blue Ridge Summit, PA" }),
    { ...size },
  );
}
