import { ImageResponse } from "next/og";

// Apple touch icon (home-screen on iOS). Full-bleed brand gradient so iOS's
// rounded-square mask looks intentional, with the same cross/gold-ring badge
// as the favicon for a consistent identity.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #D62828 0%, #F15F22 100%)",
        }}
      >
        <div
          style={{
            width: 120,
            height: 120,
            display: "flex",
            position: "relative",
            borderRadius: "50%",
            border: "5px solid #E8A33D",
            background: "rgba(0,0,0,0.10)",
          }}
        >
          <div style={{ position: "absolute", left: 50, top: 24, width: 20, height: 72, background: "#FFF7EF", borderRadius: 4 }} />
          <div style={{ position: "absolute", left: 32, top: 42, width: 56, height: 20, background: "#FFF7EF", borderRadius: 4 }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
