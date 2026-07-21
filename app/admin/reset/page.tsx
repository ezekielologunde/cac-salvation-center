"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminReset() {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  // Establish the recovery session from the link (PKCE ?code=, token_hash, or
  // an implicit-flow session already detected from the URL by the client).
  useEffect(() => {
    const supabase = createClient();
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const tokenHash = url.searchParams.get("token_hash");
    const type = url.searchParams.get("type");

    (async () => {
      try {
        if (code) {
          const { error } = await supabase.auth.exchangeCodeForSession(code);
          if (error) throw error;
        } else if (tokenHash) {
          const { error } = await supabase.auth.verifyOtp({ type: (type as "recovery") || "recovery", token_hash: tokenHash });
          if (error) throw error;
        }
        const { data } = await supabase.auth.getSession();
        if (data.session) setReady(true);
        else setError("Open this page from the password-reset link in your email — the link may have expired.");
      } catch {
        setError("This reset link is invalid or has expired. Request a new one from the login page.");
      }
    })();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const password = String(new FormData(e.currentTarget).get("password") ?? "");
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setPending(true); setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });
    setPending(false);
    if (error) { setError(error.message); return; }
    setDone(true);
    setTimeout(() => router.push("/admin"), 1400);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "11px 14px", border: "1.5px solid rgba(0,0,0,0.13)",
    borderRadius: 10, fontSize: 15, outline: "none", fontFamily: "inherit",
    boxSizing: "border-box", background: "white", color: "var(--ink)",
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--ink)", padding: 20 }}>
      <div style={{ background: "var(--cream)", borderRadius: 20, padding: "48px 40px", width: "100%", maxWidth: 420, boxShadow: "0 32px 80px rgba(0,0,0,0.5)" }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: "var(--ink)", margin: "0 0 6px" }}>Set a new password</h1>
        <p style={{ color: "var(--ink)", opacity: 0.5, fontSize: 13, margin: "0 0 26px" }}>CAC Salvation Center admin</p>

        {done ? (
          <p style={{ color: "#16794a", fontSize: 15, fontWeight: 600 }}>Password updated. Signing you in…</p>
        ) : error && !ready ? (
          <>
            <p style={{ color: "#dc2626", fontSize: 14, lineHeight: 1.6, marginBottom: 18 }}>{error}</p>
            <a href="/admin/login" style={{ color: "var(--red)", fontWeight: 700, fontSize: 14, textDecoration: "none" }}>← Back to login</a>
          </>
        ) : ready ? (
          <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label htmlFor="password" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--ink)", marginBottom: 7 }}>New password</label>
              <input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" placeholder="At least 8 characters" style={inputStyle} />
            </div>
            {error && <p style={{ color: "#dc2626", fontSize: 14, margin: 0 }}>{error}</p>}
            <button type="submit" disabled={pending} style={{ width: "100%", background: pending ? "#999" : "var(--red)", color: "white", border: "none", borderRadius: 10, padding: "13px 24px", fontSize: 15, fontWeight: 600, cursor: pending ? "not-allowed" : "pointer", fontFamily: "inherit" }}>
              {pending ? "Updating…" : "Update password"}
            </button>
          </form>
        ) : (
          <p style={{ color: "var(--ink)", opacity: 0.6, fontSize: 14 }}>Verifying your reset link…</p>
        )}
      </div>
    </div>
  );
}
