import { Nav } from "@/components/navigation/Nav";
import { FooterExperience } from "@/components/sections/FooterExperience";
import { Reveal } from "@/components/ui/Reveal";
import { Newspaper, ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Blog & News — CAC Salvation Center",
  description:
    "News, teaching, and stories from the Salvation Center family — devotionals, ministry updates, and reflections on Scripture.",
  alternates: { canonical: "/blog" },
};

const posts = [
  {
    cat: "Devotional",
    title: "The God who builds the house.",
    excerpt: "On Psalm 127, the Building Project, and why we labor in step with the Lord of the harvest.",
    date: "Coming Soon",
    accent: "linear-gradient(135deg,#F15F22,#D62828)",
  },
  {
    cat: "Ministry Update",
    title: "CACNA 2026 — what to expect.",
    excerpt: "Six days of worship and the Word at CAC Village, Blue Ridge Summit. Here’s how to prepare.",
    date: "Coming Soon",
    accent: "linear-gradient(135deg,#E8A33D,#F15F22)",
  },
  {
    cat: "Reflection",
    title: "What it means to be ambassadors.",
    excerpt: "2 Corinthians 5 and the daily call on every believer at the Salvation Center.",
    date: "Coming Soon",
    accent: "linear-gradient(135deg,#9E1B1B,#D62828)",
  },
];

export default function BlogPage() {
  return (
    <main>
      <Nav heroDark />

      {/* Hero */}
      <section style={{ background: "var(--ink)", padding: "150px clamp(20px,5vw,64px) 96px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: -100, right: -80, width: 580, height: 460, background: "radial-gradient(circle,rgba(232,163,61,.22),transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 18 }}>
              <Newspaper size={14} strokeWidth={2.5} aria-hidden /> Blog &amp; News
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(46px,7vw,98px)", letterSpacing: "-2.2px", color: "#fff", margin: "0 0 22px", lineHeight: 0.93 }}>
              The voice of<br />
              <span style={{ background: "linear-gradient(100deg,#F15F22,#D62828,#E8A33D)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>the family.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p style={{ fontSize: "clamp(16px,1.8vw,20px)", color: "rgba(255,247,239,.72)", lineHeight: 1.7, maxWidth: 580, margin: "0 auto" }}>
              Devotionals, ministry updates, and reflections from the Salvation Center — written by pastors and members of the body.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Coming soon notice */}
      <section style={{ background: "var(--cream)", padding: "clamp(50px,6vw,90px) clamp(20px,5vw,64px)" }}>
        <Reveal>
          <div style={{ maxWidth: 760, margin: "0 auto", background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 24, padding: "clamp(28px,4vw,40px)", textAlign: "center", boxShadow: "0 18px 40px rgba(27,19,14,.08)" }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)", marginBottom: 14 }}>Publishing Soon</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(26px,3.6vw,38px)", letterSpacing: "-.8px", color: "var(--ink)", margin: "0 0 14px", lineHeight: 1.1 }}>
              The first stories drop later this year.
            </h2>
            <p style={{ fontSize: 15.5, color: "var(--ink-soft)", lineHeight: 1.7, margin: 0 }}>
              In the meantime, take a look at the devotional library and join the newsletter at the bottom of this page to be notified.
            </p>
            <Link href="/devotional" className="press" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--ink)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 26px", borderRadius: 999, textDecoration: "none", marginTop: 24 }}>
              Open the Devotional <ArrowRight size={16} strokeWidth={2.5} aria-hidden />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* CACNA 2026 registration */}
      <section style={{ background: "var(--cream)", padding: "0 clamp(20px,5vw,64px) clamp(40px,5vw,72px)" }}>
        <Reveal>
          <div style={{ maxWidth: 880, margin: "0 auto", background: "linear-gradient(135deg,#9E1B1B,#D62828)", borderRadius: 28, padding: "clamp(30px,4vw,46px)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24, boxShadow: "0 24px 60px rgba(214,40,40,.28)", position: "relative", overflow: "hidden" }}>
            <div aria-hidden style={{ position: "absolute", top: -80, right: -60, width: 320, height: 280, background: "radial-gradient(circle,rgba(232,163,61,.3),transparent 65%)", pointerEvents: "none" }} />
            <div style={{ flex: "1 1 320px", position: "relative", zIndex: 2 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,247,239,.85)", marginBottom: 10 }}>By popular demand</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(24px,3.2vw,38px)", letterSpacing: "-.6px", color: "#fff", margin: "0 0 8px", lineHeight: 1.05 }}>Register for CACNA 2026</h2>
              <p style={{ fontSize: 15.5, color: "rgba(255,247,239,.82)", margin: 0, lineHeight: 1.6 }}>The 2026 CAC North America National Convention — July 13–18 at CAC Village, Blue Ridge Summit, PA. Secure your spot online.</p>
            </div>
            <a href="https://cacnaconvention.org/2025-cacna-national-convention-registration-credit-debit-card/" target="_blank" rel="noopener noreferrer" className="btn-sheen press" style={{ position: "relative", zIndex: 2, flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 9, background: "#fff", color: "var(--red-deep)", fontWeight: 800, fontSize: 16, padding: "16px 30px", borderRadius: 999, textDecoration: "none" }}>
              Register Now →
            </a>
          </div>
        </Reveal>
      </section>

      {/* Sneak peek */}
      <section style={{ background: "var(--cream-2)", padding: "clamp(40px,5vw,72px) clamp(20px,5vw,64px) clamp(70px,9vw,110px)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 36 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)" }}>Sneak Peek</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,46px)", letterSpacing: "-1px", color: "var(--ink)", margin: "12px 0 0", lineHeight: 1 }}>
              What we&apos;re writing.
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 22 }}>
            {posts.map((p, i) => (
              <Reveal key={i} delay={i * 90}>
                <article style={{ height: "100%", background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 24, padding: 0, display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 12px 30px rgba(27,19,14,.07)" }}>
                  <div style={{ height: 140, background: p.accent, position: "relative" }}>
                    <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 30%,rgba(255,255,255,.18),transparent 60%)" }} />
                    <div style={{ position: "absolute", left: 22, bottom: 18, color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase" }}>{p.cat}</div>
                  </div>
                  <div style={{ padding: "26px 26px 28px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, letterSpacing: "-.5px", color: "var(--ink)", margin: "0 0 12px", lineHeight: 1.15 }}>{p.title}</h3>
                    <p style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.7, margin: "0 0 22px", flex: 1 }}>{p.excerpt}</p>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 700, color: "var(--red)", letterSpacing: ".5px", textTransform: "uppercase" }}>
                      <Calendar size={13} strokeWidth={2.5} aria-hidden /> {p.date}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FooterExperience />
    </main>
  );
}
