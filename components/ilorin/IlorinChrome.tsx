"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Navigation, Menu, X } from "lucide-react";

// Shared green identity for the Ilorin micro-site — kept in sync with the
// palette defined inline in app/ilorin/page.tsx (that page predates this file
// and isn't worth touching just to import a constant).
export const ilorinColors = {
  deep: "#06311F",
  green: "#0E7A43",
  greenBright: "#2BB673",
  gold: "#E8A33D",
  cream: "#EEF5EE",
  cream2: "#E3EFE4",
  paper: "#FFFFFF",
  ink: "#0A2418",
  inkSoft: "#46604F",
  line: "rgba(8,40,24,.10)",
  onDeep: "rgba(238,245,238,.74)",
  onDeepLine: "rgba(238,245,238,.16)",
};

const c = ilorinColors;

const HOME_LINKS = [
  { href: "/ilorin#heritage", label: "Heritage" },
  { href: "/ilorin#leadership", label: "Leadership" },
  { href: "/ilorin#teaching", label: "Teaching" },
  { href: "/ilorin#connect", label: "Connect" },
];

const BLOG_LINKS = [
  { href: "/ilorin/blog", label: "All Messages" },
  { href: "/ilorin", label: "Home" },
];

export function IlorinHeader({ variant = "home" }: { variant?: "home" | "blog" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = variant === "home" ? HOME_LINKS : BLOG_LINKS;

  return (
    <header
      style={{
        position: "sticky", top: "var(--bar-h, 0px)", zIndex: 50,
        background: "rgba(6,49,31,.94)", backdropFilter: "blur(10px)",
        boxShadow: "0 1px 0 rgba(0,0,0,0), 0 12px 24px -18px rgba(0,0,0,.6)",
        borderBottom: `1px solid ${c.onDeepLine}`,
      }}
    >
      <style>{`
        .ilorin-nav-links { display: flex; }
        .ilorin-nav-toggle { display: none; }
        .ilorin-nav-panel { display: none; }
        @media (max-width: 760px) {
          .ilorin-nav-links { display: none !important; }
          .ilorin-nav-toggle { display: inline-flex !important; }
          .ilorin-nav-panel[data-open="true"] { display: flex !important; }
        }
      `}</style>
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "16px clamp(18px,4vw,40px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 }}>
        <Link href="/ilorin" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <Image src="/images/logo.png" alt="C.A.C Salvation Centre" width={40} height={40} style={{ borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.08 }}>
            <span style={{ fontSize: 10, letterSpacing: "2.5px", textTransform: "uppercase", color: c.gold, fontWeight: 800 }}>Christ Apostolic Church</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "#fff", letterSpacing: "-.2px" }}>Salvation Centre · Ilorin</span>
          </div>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          <nav className="ilorin-nav-links" style={{ alignItems: "center", gap: 22 }}>
            {links.map((l) => (
              <Link key={l.href} href={l.href} style={{ fontSize: 13.5, fontWeight: 700, color: c.onDeep, textDecoration: "none", whiteSpace: "nowrap" }}>
                {l.label}
              </Link>
            ))}
          </nav>
          <Link href="/ilorin#visit" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 700, color: c.deep, background: c.greenBright, padding: "10px 18px", borderRadius: 999, textDecoration: "none", whiteSpace: "nowrap" }}>
            <Navigation size={14} strokeWidth={2.6} aria-hidden /> Visit
          </Link>
          <button
            type="button"
            className="ilorin-nav-toggle"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            style={{ alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: 10, border: `1px solid ${c.onDeepLine}`, background: "rgba(255,255,255,.06)", color: "#fff", cursor: "pointer" }}
          >
            {menuOpen ? <X size={18} strokeWidth={2.3} /> : <Menu size={18} strokeWidth={2.3} />}
          </button>
        </div>
      </div>
      <nav
        className="ilorin-nav-panel"
        data-open={menuOpen}
        style={{ flexDirection: "column", padding: "6px clamp(18px,4vw,40px) 18px", gap: 4, borderTop: `1px solid ${c.onDeepLine}` }}
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setMenuOpen(false)}
            style={{ padding: "11px 4px", fontSize: 15, fontWeight: 700, color: "#fff", textDecoration: "none", borderBottom: `1px solid ${c.onDeepLine}` }}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function IlorinFooter({ variant = "home" }: { variant?: "home" | "blog" }) {
  return (
    <footer style={{ background: c.deep, color: "#fff", padding: "clamp(40px,5vw,56px) clamp(20px,5vw,64px) 30px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 18, paddingBottom: 24, borderBottom: `1px solid ${c.onDeepLine}` }}>
        <Link href="/ilorin" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/images/logo.png" alt="C.A.C Salvation Centre" width={32} height={32} style={{ borderRadius: 8, objectFit: "cover" }} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, color: "#fff" }}>Salvation Centre · Ilorin</span>
        </Link>
        {variant === "home" ? (
          <a href="#top" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 700, color: c.greenBright, textDecoration: "none" }}>
            Back to top <ArrowUpRight size={14} strokeWidth={2.4} aria-hidden style={{ transform: "rotate(-90deg)" }} />
          </a>
        ) : (
          <Link href="/ilorin" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 700, color: c.greenBright, textDecoration: "none" }}>
            Back to the Ilorin site <ArrowUpRight size={14} strokeWidth={2.4} aria-hidden />
          </Link>
        )}
      </div>
      <div style={{ fontSize: 13, color: c.onDeep, marginTop: 20, textAlign: "center" }}>© 2026 Christ Apostolic Church Salvation Centre, Ilorin · Kwara State, Nigeria</div>
    </footer>
  );
}
