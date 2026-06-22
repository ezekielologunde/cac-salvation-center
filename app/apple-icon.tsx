import { ImageResponse } from "next/og";

// Apple touch icon (iOS home screen): full-bleed brand gradient with the bold
// "CAC" monogram and a gold underline echoing the seal's gold banner.
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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #D62828 0%, #F15F22 100%)",
        }}
      >
        <div style={{ display: "flex", fontSize: 72, fontWeight: 800, letterSpacing: -3, color: "#FFF7EF" }}>
          CAC
        </div>
        <div style={{ display: "flex", width: 72, height: 7, marginTop: 10, borderRadius: 4, background: "#E8A33D" }} />
      </div>
    ),
    { ...size }
  );
}
