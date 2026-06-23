"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });

    if (authError) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  const urlParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
  const unauthorized = urlParams?.get("error") === "unauthorized";

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--ink)",
    }}>
      <div style={{
        background: "var(--cream)",
        borderRadius: 12,
        padding: "48px 40px",
        width: "100%",
        maxWidth: 400,
        boxShadow: "0 24px 64px rgba(0,0,0,0.4)",
      }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "var(--red)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: 24, color: "var(--ink)", margin: 0 }}>Admin Login</h1>
          <p style={{ color: "var(--ink)", opacity: 0.5, fontSize: 14, marginTop: 8 }}>CAC Salvation Center</p>
        </div>

        {unauthorized && (
          <div style={{
            background: "#fef2f2",
            border: "1px solid #fca5a5",
            borderRadius: 8,
            padding: "12px 16px",
            marginBottom: 24,
            color: "#dc2626",
            fontSize: 14,
          }}>
            Access denied. You are not an authorized admin.
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--ink)", marginBottom: 6 }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "1.5px solid rgba(0,0,0,0.15)",
                borderRadius: 8,
                fontSize: 15,
                outline: "none",
                fontFamily: "inherit",
                boxSizing: "border-box",
                background: "white",
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--ink)", marginBottom: 6 }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={{
                width: "100%",
                padding: "10px 14px",
                border: "1.5px solid rgba(0,0,0,0.15)",
                borderRadius: 8,
                fontSize: 15,
                outline: "none",
                fontFamily: "inherit",
                boxSizing: "border-box",
                background: "white",
              }}
            />
          </div>

          {error && (
            <p style={{ color: "#dc2626", fontSize: 14, margin: 0 }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? "#999" : "var(--red)",
              color: "white",
              border: "none",
              borderRadius: 8,
              padding: "12px 24px",
              fontSize: 15,
              fontWeight: 600,
              cursor: loading ? "not-allowed" : "pointer",
              fontFamily: "inherit",
              marginTop: 4,
            }}
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
