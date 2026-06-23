"use client";

import Link from "next/link";

const STAT_CARDS = [
  { key: "posts",              label: "Blog Posts",          color: "#2563eb", bg: "#eff6ff", href: "/admin/blog",        icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
  { key: "events",             label: "Events",              color: "#16a34a", bg: "#f0fdf4", href: "/admin/events",       icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" },
  { key: "pendingTestimonies", label: "Testimonies Pending", color: "#d97706", bg: "#fffbeb", href: "/admin/testimonies", icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" },
  { key: "prayers",            label: "Prayer Requests",     color: "#dc2626", bg: "#fef2f2", href: "/admin/prayer",       icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" },
  { key: "contacts",           label: "Contact Messages",    color: "#7c3aed", bg: "#f5f3ff", href: "/admin/contact",      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
];

const QUICK_ACTIONS = [
  { href: "/admin/blog/new",    label: "Write a Blog Post" },
  { href: "/admin/events/new",  label: "Add an Event" },
  { href: "/admin/testimonies", label: "Review Testimonies" },
];

type Stats = { posts: number; events: number; pendingTestimonies: number; prayers: number; contacts: number };

export default function DashboardCards({ stats }: { stats: Stats }) {
  return (
    <>
      <style>{`
        .stat-card { transition: box-shadow 0.2s, transform 0.2s; }
        .stat-card:hover { box-shadow: 0 8px 28px rgba(0,0,0,0.11) !important; transform: translateY(-2px); }
        .quick-btn { transition: opacity 0.15s, transform 0.15s; }
        .quick-btn:hover { opacity: 0.88; transform: translateY(-1px); }
      `}</style>

      {/* Stat grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(165px, 1fr))", gap: 16, marginBottom: 48 }}>
        {STAT_CARDS.map(({ key, label, color, bg, href, icon }) => {
          const count = stats[key as keyof Stats];
          const hasAlert = (key === "pendingTestimonies" || key === "prayers" || key === "contacts") && count > 0;
          return (
            <Link
              key={key}
              href={href}
              className="stat-card"
              style={{
                background: "white",
                borderRadius: 14,
                padding: "22px 20px",
                textDecoration: "none",
                display: "block",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
                border: `1px solid ${hasAlert ? color + "30" : "rgba(0,0,0,0.06)"}`,
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 3,
                background: color, borderRadius: "14px 14px 0 0",
              }} />
              <div style={{
                width: 38, height: 38, borderRadius: 10, background: bg,
                display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14,
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d={icon} />
                </svg>
              </div>
              <p style={{ fontSize: 34, fontWeight: 700, color: "var(--ink)", margin: "0 0 4px", fontFamily: "Georgia, serif", lineHeight: 1 }}>
                {count}
              </p>
              <p style={{ fontSize: 12, color: "rgba(0,0,0,0.45)", margin: 0, fontWeight: 500 }}>{label}</p>
              {hasAlert && (
                <span style={{
                  position: "absolute", top: 14, right: 14,
                  width: 8, height: 8, borderRadius: "50%", background: color,
                  boxShadow: `0 0 0 3px ${bg}`,
                }} />
              )}
            </Link>
          );
        })}
      </div>

      {/* Quick actions */}
      <div>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 20, color: "var(--ink)", margin: "0 0 16px", letterSpacing: "-0.01em" }}>
          Quick Actions
        </h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {QUICK_ACTIONS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="quick-btn"
              style={{
                background: "var(--red)",
                color: "white",
                padding: "10px 22px",
                borderRadius: 10,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
                boxShadow: "0 2px 8px rgba(185,28,28,0.25)",
                display: "inline-block",
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
