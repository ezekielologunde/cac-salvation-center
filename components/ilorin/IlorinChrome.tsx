import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Navigation } from "lucide-react";

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

export function IlorinHeader() {
  return (
    <header
      style={{
        position: "sticky", top: "var(--bar-h, 0px)", zIndex: 50,
        background: "rgba(6,49,31,.92)", backdropFilter: "blur(10px)",
        borderBottom: `1px solid ${c.onDeepLine}`,
      }}
    >
      <div style={{ maxWidth: 1180, margin: "0 auto", padding: "13px clamp(18px,4vw,40px)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <Link href="/ilorin" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/images/logo.png" alt="C.A.C Salvation Centre" width={36} height={36} style={{ borderRadius: 9, objectFit: "cover", flexShrink: 0 }} />
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
            <span style={{ fontSize: 9.5, letterSpacing: "2.5px", textTransform: "uppercase", color: c.gold, fontWeight: 800 }}>Christ Apostolic Church</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 17, color: "#fff", letterSpacing: "-.2px" }}>Salvation Centre · Ilorin</span>
          </div>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Link href="/ilorin/blog" style={{ fontSize: 13.5, fontWeight: 700, color: c.onDeep, textDecoration: "none" }}>
            Messages
          </Link>
          <Link href="/ilorin#visit" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13.5, fontWeight: 700, color: "#fff", background: c.green, padding: "9px 16px", borderRadius: 999, textDecoration: "none" }}>
            <Navigation size={14} strokeWidth={2.4} aria-hidden /> Visit
          </Link>
        </div>
      </div>
    </header>
  );
}

export function IlorinFooter() {
  return (
    <footer style={{ background: c.deep, color: "#fff", padding: "clamp(40px,5vw,56px) clamp(20px,5vw,64px) 30px" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 18, paddingBottom: 24, borderBottom: `1px solid ${c.onDeepLine}` }}>
        <Link href="/ilorin" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <Image src="/images/logo.png" alt="C.A.C Salvation Centre" width={32} height={32} style={{ borderRadius: 8, objectFit: "cover" }} />
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16, color: "#fff" }}>Salvation Centre · Ilorin</span>
        </Link>
        <Link href="/ilorin" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 700, color: c.greenBright, textDecoration: "none" }}>
          Back to the Ilorin site <ArrowUpRight size={14} strokeWidth={2.4} aria-hidden />
        </Link>
      </div>
      <div style={{ fontSize: 13, color: c.onDeep, marginTop: 20, textAlign: "center" }}>© 2026 Christ Apostolic Church Salvation Centre, Ilorin · Kwara State, Nigeria</div>
    </footer>
  );
}
