import { ImageResponse } from "next/og";

// Crisp, legible browser-tab favicon: a bold "CAC" monogram on the brand red
// with a gold ring. The full CAC seal is illegible at 16–32px, so it stays as
// the logo everywhere it renders large (nav, pages, ilorin, PWA install).
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        <div
          style={{
            width: 60,
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
            background: "linear-gradient(135deg, #D62828 0%, #9E1B1B 100%)",
            border: "2px solid #E8A33D",
          }}
        >
          <div style={{ display: "flex", fontSize: 25, fontWeight: 800, letterSpacing: -1.5, color: "#FFF7EF" }}>
            CAC
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
