"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

const NAV = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    href: "/admin/blog",
    label: "Blog Posts",
    icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z",
  },
  {
    href: "/admin/events",
    label: "Events",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    href: "/admin/testimonies",
    label: "Testimonies",
    icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
  },
  {
    href: "/admin/prayer",
    label: "Prayer Requests",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
  },
  {
    href: "/admin/contact",
    label: "Contact Inbox",
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
];

export default function AdminSidebar({ email }: { email: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <aside style={{
      width: 248,
      minHeight: "100vh",
      background: "linear-gradient(180deg, #1a1a2e 0%, #12121c 100%)",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      borderRight: "1px solid rgba(255,255,255,0.05)",
      position: "relative",
    }}>
      {/* Brand */}
      <div style={{ padding: "28px 20px 22px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 2 }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 8,
            background: "var(--red)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            boxShadow: "0 4px 12px rgba(185,28,28,0.4)",
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <rect x="11" y="3" width="2" height="18" rx="1" />
              <rect x="4" y="9" width="16" height="2" rx="1" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,0.9)", margin: 0, letterSpacing: "-0.01em" }}>
              CAC Salvation
            </p>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", margin: "1px 0 0", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Admin Panel
            </p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: "12px 10px" }}>
        {NAV.map(({ href, label, icon }) => {
          const exact = href === "/admin";
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                borderRadius: 9,
                marginBottom: 2,
                background: active ? "rgba(185,28,28,0.18)" : "transparent",
                color: active ? "white" : "rgba(255,255,255,0.5)",
                textDecoration: "none",
                fontSize: 13.5,
                fontWeight: active ? 600 : 400,
                position: "relative",
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.8)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "rgba(255,255,255,0.5)";
                }
              }}
            >
              {active && (
                <motion.div
                  layoutId="activeNavPill"
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    borderRadius: "0 3px 3px 0",
                    background: "var(--red)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d={icon} />
              </svg>
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: "14px 10px 20px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{
          padding: "10px 12px",
          borderRadius: 9,
          background: "rgba(255,255,255,0.04)",
          marginBottom: 8,
        }}>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", margin: "0 0 2px", letterSpacing: "0.05em", textTransform: "uppercase" }}>Signed in as</p>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{email}</p>
        </div>
        <button
          onClick={handleSignOut}
          style={{
            width: "100%",
            padding: "9px 12px",
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.35)",
            fontSize: 13,
            cursor: "pointer",
            textAlign: "left",
            borderRadius: 9,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "inherit",
            transition: "background 0.15s, color 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(220,38,38,0.1)";
            e.currentTarget.style.color = "#f87171";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "rgba(255,255,255,0.35)";
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
