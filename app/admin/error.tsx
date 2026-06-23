"use client";

import { useEffect } from "react";

export default function AdminError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", minHeight: "60vh", textAlign: "center", padding: "40px 24px",
    }}>
      <div style={{
        width: 56, height: 56, borderRadius: "50%",
        background: "#fee2e2", display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: 24, marginBottom: 20, color: "#dc2626",
      }}>
        ✕
      </div>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: 22, color: "#1b130e", margin: "0 0 8px", fontWeight: 700 }}>
        Something went wrong
      </h1>
      <p style={{ fontSize: 14, color: "rgba(0,0,0,0.5)", maxWidth: 380, margin: "0 auto 28px", lineHeight: 1.6 }}>
        An unexpected error occurred. Try refreshing or head back to the dashboard.
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
        <button
          onClick={reset}
          style={{
            padding: "9px 20px", borderRadius: 8,
            background: "#dc2626", color: "#fff",
            fontWeight: 600, fontSize: 13, border: "none",
            cursor: "pointer", fontFamily: "inherit",
          }}
        >
          Try again
        </button>
        <a
          href="/admin"
          style={{
            padding: "9px 20px", borderRadius: 8,
            background: "transparent", color: "rgba(0,0,0,0.5)",
            fontWeight: 600, fontSize: 13,
            border: "1px solid rgba(0,0,0,0.15)",
            textDecoration: "none", fontFamily: "inherit",
          }}
        >
          Back to dashboard
        </a>
      </div>
    </div>
  );
}
