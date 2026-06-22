import { Nav } from "@/components/navigation/Nav";
import { FooterExperience } from "@/components/sections/FooterExperience";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { StoreShelf } from "@/components/sections/StoreShelf";
import { ShoppingBag, Shirt, BookOpen, Music2, Printer, Shield, Heart, Package } from "lucide-react";

export const metadata = {
  title: "Store — CAC Salvation Center",
  description:
    "Salvation Center apparel, Bibles, original worship music, and custom prints. Every purchase supports the church's building project and ministries.",
  alternates: { canonical: "/store" },
};

const pillars = [
  {
    icon: Shirt,
    title: "Apparel",
    desc: "Hoodies, tees, caps, and totes — wear the family wherever you go.",
    accent: "linear-gradient(135deg,#1B130E,#3A2518)",
    count: "5 items",
  },
  {
    icon: BookOpen,
    title: "Books & Bibles",
    desc: "Study Bibles, devotionals, and children's Bibles for every stage of faith.",
    accent: "linear-gradient(135deg,#9E1B1B,#D62828)",
    count: "4 items",
  },
  {
    icon: Music2,
    title: "Music",
    desc: "Original CAC worship recordings — albums and instrumental sets.",
    accent: "linear-gradient(135deg,#E8A33D,#C87E20)",
    count: "3 items",
  },
  {
    icon: Printer,
    title: "Custom Prints",
    desc: "Scripture art, commemorative prints, and custom event materials.",
    accent: "linear-gradient(135deg,#D62828,#9E1B1B)",
    count: "4 items",
  },
];

const trust = [
  { icon: Heart,   label: "Proceeds support ministries", desc: "Every sale funds the building project and outreach." },
  { icon: Package, label: "Ships within 5 business days", desc: "Maryland local pickup available on request." },
  { icon: Shield,  label: "Secure ordering via WhatsApp", desc: "No cart checkout needed — we walk you through it." },
];

export default function StorePage() {
  return (
    <main>
      <Nav heroDark />

      {/* Hero */}
      <section style={{
        background: "var(--ink)",
        padding: "150px clamp(20px,5vw,64px) clamp(70px,9vw,110px)",
        position: "relative", overflow: "hidden",
      }}>
        {/* Background glow */}
        <div aria-hidden style={{ position: "absolute", top: -140, right: -100, width: 640, height: 520, background: "radial-gradient(circle,rgba(232,163,61,.2),transparent 65%)", pointerEvents: "none", animation: "gradient-drift 18s ease-in-out infinite" }} />
        <div aria-hidden style={{ position: "absolute", bottom: -60, left: -80, width: 400, height: 340, background: "radial-gradient(circle,rgba(214,40,40,.14),transparent 65%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>
              <ShoppingBag size={14} strokeWidth={2.5} aria-hidden /> Salvation Center Store
            </div>
          </Reveal>

          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "clamp(48px,7.5vw,104px)", letterSpacing: "-0.035em",
            color: "#fff", margin: "0 0 28px", lineHeight: 0.9, textWrap: "balance",
          }}>
            <RevealText immediate>Carry the</RevealText>{" "}
            <RevealText immediate delay={0.12}
              style={{ background: "linear-gradient(100deg,#F15F22,#D62828,#E8A33D)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              message.
            </RevealText>
          </h1>

          <Reveal delay={200}>
            <p style={{ fontSize: "clamp(16px,2vw,20px)", color: "rgba(255,247,239,.72)", lineHeight: 1.7, maxWidth: 560, margin: "0 0 40px" }}>
              Apparel, Bibles, worship music, and custom prints — resources for the family, inside the church and beyond it. Every purchase supports the ministries of CAC Salvation Center.
            </p>
          </Reveal>

          {/* Category pills */}
          <Reveal delay={280}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {pillars.map((p) => (
                <div key={p.title} style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "10px 18px", borderRadius: 999,
                  background: "rgba(255,247,239,.08)",
                  border: "1px solid rgba(255,247,239,.14)",
                  fontSize: 13.5, fontWeight: 700, color: "rgba(255,247,239,.9)",
                }}>
                  <p.icon size={15} strokeWidth={2} aria-hidden />
                  {p.title}
                  <span style={{ color: "var(--gold)", fontSize: 12 }}>{p.count}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* What's in the store */}
      <section style={{ background: "var(--cream-2)", padding: "clamp(56px,7vw,88px) clamp(20px,5vw,64px)", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 36 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(26px,3.8vw,44px)", letterSpacing: "-1px", color: "var(--ink)", margin: 0 }}>Four shelves.</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: 18 }}>
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <div style={{
                  height: "100%", background: "var(--paper)",
                  border: "1px solid var(--line)", borderRadius: 20,
                  padding: "26px 24px", display: "flex", flexDirection: "column",
                  boxShadow: "0 10px 24px rgba(27,19,14,.06)",
                }}>
                  <div style={{
                    display: "grid", placeItems: "center",
                    width: 50, height: 50, borderRadius: 14,
                    background: p.accent, marginBottom: 16,
                    boxShadow: "0 8px 18px rgba(0,0,0,.18)",
                  }}>
                    <p.icon size={22} color="#fff" strokeWidth={2} aria-hidden />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--ink)", margin: "0 0 8px" }}>{p.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.7, margin: 0, flex: 1 }}>{p.desc}</p>
                  <div style={{ marginTop: 14, fontSize: 12, fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--red)" }}>{p.count}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Store shelf */}
      <section style={{ background: "var(--cream)", padding: "clamp(56px,7vw,90px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", letterSpacing: "-1px", color: "var(--ink)", margin: 0 }}>Browse &amp; order.</h2>
          </Reveal>
          <StoreShelf />
        </div>
      </section>

      {/* Trust bar */}
      <section style={{ background: "var(--ink)", padding: "clamp(50px,6vw,80px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 36 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(24px,3.5vw,38px)", letterSpacing: "-.8px", color: "var(--cream)", margin: 0 }}>Simple, personal, purposeful.</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 18 }}>
            {trust.map((t, i) => (
              <Reveal key={t.label} delay={i * 80}>
                <div style={{ background: "rgba(255,247,239,.05)", border: "1px solid rgba(255,247,239,.1)", borderRadius: 18, padding: "24px 22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <t.icon size={18} strokeWidth={2} color="var(--gold)" aria-hidden />
                    <span style={{ fontWeight: 700, fontSize: 15, color: "var(--cream)" }}>{t.label}</span>
                  </div>
                  <p style={{ fontSize: 14, color: "rgba(255,247,239,.58)", lineHeight: 1.65, margin: 0 }}>{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FooterExperience />
    </main>
  );
}
