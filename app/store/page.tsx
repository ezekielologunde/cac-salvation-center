import { Nav } from "@/components/navigation/Nav";
import { FooterExperience } from "@/components/sections/FooterExperience";
import { Reveal } from "@/components/ui/Reveal";
import { ShoppingBag, Download, Headphones, BookOpen, Shirt, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Store — CAC Salvation Center",
  description:
    "Resources from the Salvation Center — sermons, devotionals, study guides, music, and church merchandise. Coming soon.",
  alternates: { canonical: "/store" },
};

const categories = [
  { icon: Headphones, title: "Sermon Library", desc: "Audio messages from Pastor Ilufoye and the pastoral team.", accent: "linear-gradient(135deg,#F15F22,#D62828)" },
  { icon: BookOpen, title: "Study Guides", desc: "Bible Study notes, devotionals, and discipleship workbooks.", accent: "linear-gradient(135deg,#E8A33D,#F15F22)" },
  { icon: Shirt, title: "Merchandise", desc: "Salvation Center apparel — wear the family.", accent: "linear-gradient(135deg,#9E1B1B,#D62828)" },
  { icon: Download, title: "Music & Liturgy", desc: "Wakati Itusile worship sets and printable liturgies.", accent: "linear-gradient(135deg,#1B130E,#9E1B1B)" },
];

export default function StorePage() {
  return (
    <main>
      <Nav heroDark />

      {/* Hero */}
      <section style={{ background: "var(--ink)", padding: "150px clamp(20px,5vw,64px) 96px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: -120, right: -100, width: 560, height: 460, background: "radial-gradient(circle,rgba(232,163,61,.22),transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 18 }}>
              <ShoppingBag size={14} strokeWidth={2.5} aria-hidden /> Store
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(46px,7vw,98px)", letterSpacing: "-2.2px", color: "#fff", margin: "0 0 22px", lineHeight: 0.93 }}>
              Resources from<br />
              <span style={{ background: "linear-gradient(100deg,#F15F22,#D62828,#E8A33D)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>the family.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p style={{ fontSize: "clamp(16px,1.8vw,20px)", color: "rgba(255,247,239,.72)", lineHeight: 1.7, maxWidth: 580, margin: "0 auto" }}>
              Sermons, study guides, worship sets, and Salvation Center merch — equipping the body and carrying the message further.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Coming soon */}
      <section style={{ background: "var(--cream)", padding: "clamp(50px,6vw,90px) clamp(20px,5vw,64px)" }}>
        <Reveal>
          <div style={{ maxWidth: 760, margin: "0 auto", background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 24, padding: "clamp(28px,4vw,40px)", textAlign: "center", boxShadow: "0 18px 40px rgba(27,19,14,.08)" }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)", marginBottom: 14 }}>Opening Soon</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(26px,3.6vw,38px)", letterSpacing: "-.8px", color: "var(--ink)", margin: "0 0 14px", lineHeight: 1.1 }}>
              The Salvation Center store is being built.
            </h2>
            <p style={{ fontSize: 15.5, color: "var(--ink-soft)", lineHeight: 1.7, margin: 0 }}>
              We&apos;re curating sermons, study materials, worship music, and apparel. To be notified at launch, subscribe to the newsletter at the bottom of this page.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Categories */}
      <section style={{ background: "var(--cream-2)", padding: "clamp(40px,5vw,72px) clamp(20px,5vw,64px) clamp(70px,9vw,110px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 36 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)" }}>What&apos;s Coming</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,46px)", letterSpacing: "-1px", color: "var(--ink)", margin: "12px 0 0", lineHeight: 1 }}>
              Four shelves to start.
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {categories.map((c, i) => (
              <Reveal key={c.title} delay={i * 80}>
                <div style={{ height: "100%", background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 22, padding: "30px 28px", display: "flex", flexDirection: "column", boxShadow: "0 12px 28px rgba(27,19,14,.06)" }}>
                  <div style={{ display: "grid", placeItems: "center", width: 52, height: 52, borderRadius: 16, background: c.accent, marginBottom: 18, boxShadow: "0 10px 22px rgba(214,40,40,.22)" }}>
                    <c.icon size={24} strokeWidth={2} color="#fff" aria-hidden />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, letterSpacing: "-.4px", color: "var(--ink)", margin: "0 0 10px" }}>{c.title}</h3>
                  <p style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.7, margin: 0, flex: 1 }}>{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal style={{ marginTop: 40, textAlign: "center" }}>
            <Link href="/devotional" className="press" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--ink)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "15px 28px", borderRadius: 999, textDecoration: "none" }}>
              Browse free devotionals <ArrowRight size={16} strokeWidth={2.5} aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      <FooterExperience />
    </main>
  );
}
