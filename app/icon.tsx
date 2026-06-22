import { ImageResponse } from "next/og";

// Crisp, legible browser-tab favicon. The full CAC seal is illegible at 16–32px,
// so the favicon is a simplified branded badge (cross on the brand red, gold ring)
// that still reads as "this church" at tab size. The seal logo stays everywhere
// it renders large (nav, pages, ilorin, PWA install).
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
            position: "relative",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #D62828 0%, #9E1B1B 100%)",
            border: "3px solid #E8A33D",
          }}
        >
          {/* Latin cross */}
          <div style={{ position: "absolute", left: 25, top: 13, width: 10, height: 34, background: "#FFF7EF", borderRadius: 2 }} />
          <div style={{ position: "absolute", left: 17, top: 20, width: 26, height: 10, background: "#FFF7EF", borderRadius: 2 }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
