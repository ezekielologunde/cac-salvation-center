import { Nav } from "@/components/navigation/Nav";
import { FooterExperience } from "@/components/sections/FooterExperience";
import { Reveal } from "@/components/ui/Reveal";
import { Video, Clock, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const ZOOM_URL = "https://us02web.zoom.us/j/84635388414?pwd=UlNHRUU4VWdXNjdEMmhsaHZDUXYzdz09";

export const metadata = {
  title: "Salvation City — CAC Salvation Center",
  description:
    "Salvation City — the online assembly of the Salvation Center family. Join us live on Zoom for worship, the Word, and prayer.",
  alternates: { canonical: "/salvationcity" },
};

export default function SalvationCityPage() {
  return (
    <main>
      <Nav heroDark />

      {/* Hero */}
      <section style={{ background: "var(--ink)", padding: "150px clamp(20px,5vw,64px) 100px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: -120, right: -120, width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle,rgba(232,163,61,.24),transparent 65%)", pointerEvents: "none" }} />
        <div aria-hidden style={{ position: "absolute", bottom: -150, left: -100, width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(214,40,40,.2),transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <Reveal>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--gold)" }}>An Online Assembly</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(46px,7.2vw,104px)", letterSpacing: "-2.4px", color: "#fff", margin: "16px 0 22px", lineHeight: 0.92 }}>
              Salvation<br />
              <span style={{ background: "linear-gradient(100deg,#F15F22,#D62828,#E8A33D)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>City.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p style={{ fontSize: "clamp(17px,1.9vw,20px)", color: "rgba(255,247,239,.78)", lineHeight: 1.7, maxWidth: 620, margin: "0 auto 36px" }}>
              The online assembly of the Salvation Center family. Wherever you are in the world, gather with us live — worship, the Word, prayer.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <a href={ZOOM_URL} target="_blank" rel="noopener noreferrer" className="press-lg" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--red)", color: "#fff", fontWeight: 800, fontSize: 16, padding: "18px 32px", borderRadius: 999, textDecoration: "none", boxShadow: "0 18px 38px rgba(214,40,40,.5)" }}>
              <Video size={18} strokeWidth={2.5} aria-hidden /> Join on Zoom <ArrowRight size={17} strokeWidth={2.5} aria-hidden />
            </a>
          </Reveal>
        </div>
      </section>

      {/* What to expect */}
      <section style={{ background: "var(--cream)", padding: "clamp(60px,7vw,96px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 44 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)" }}>What to expect</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px,4.5vw,56px)", letterSpacing: "-1.2px", color: "var(--ink)", margin: "12px 0 0", lineHeight: 1 }}>
              Real church, online.
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {[
              { icon: Video, title: "Live on Zoom", desc: "Faces and voices — not just a stream. Worship the same way you would in the room." },
              { icon: Clock, title: "Spirit-led rhythm", desc: "Praise, the Word, prayer ministry, and time for personal testimonies — week after week." },
              { icon: Users, title: "Family across borders", desc: "Saints from Maryland, Lagos, London, Toronto, and beyond — gathered as one." },
            ].map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div style={{ height: "100%", background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 22, padding: "30px 28px", boxShadow: "0 10px 26px rgba(27,19,14,.06)" }}>
                  <div style={{ display: "grid", placeItems: "center", width: 52, height: 52, borderRadius: 16, background: "linear-gradient(135deg,var(--flame),var(--red))", marginBottom: 18, boxShadow: "0 10px 22px rgba(214,40,40,.32)" }}>
                    <f.icon size={24} strokeWidth={2} color="#fff" aria-hidden />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, letterSpacing: "-.4px", color: "var(--ink)", margin: "0 0 8px" }}>{f.title}</h3>
                  <p style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.7, margin: 0 }}>{f.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Zoom details card */}
      <section style={{ background: "var(--cream-2)", padding: "clamp(50px,6vw,90px) clamp(20px,5vw,64px)" }}>
        <Reveal>
          <div style={{ maxWidth: 820, margin: "0 auto", background: "var(--ink)", color: "var(--cream)", borderRadius: 28, padding: "clamp(36px,5vw,52px)", boxShadow: "0 30px 60px rgba(27,19,14,.22)", position: "relative", overflow: "hidden" }}>
            <div aria-hidden style={{ position: "absolute", top: -100, right: -100, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,rgba(232,163,61,.25),transparent 65%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16 }}>
                <Video size={14} strokeWidth={2.5} aria-hidden /> Join the room
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,3.8vw,42px)", letterSpacing: "-.8px", margin: "0 0 16px", lineHeight: 1.05 }}>
                Salvation City · Live Zoom
              </h3>
              <p style={{ fontSize: 15, color: "rgba(255,247,239,.7)", lineHeight: 1.7, margin: "0 0 28px" }}>
                Tap below and the Zoom app will take you straight into the room. Bring your Bible, bring a friend.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                <a href={ZOOM_URL} target="_blank" rel="noopener noreferrer" className="btn-sheen press" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--red)", color: "#fff", fontWeight: 800, fontSize: 15, padding: "15px 26px", borderRadius: 999, textDecoration: "none", boxShadow: "0 14px 30px rgba(214,40,40,.42)" }}>
                  <Video size={17} strokeWidth={2.5} aria-hidden /> Open in Zoom
                </a>
                <Link href="/online" className="press" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(255,247,239,.08)", color: "var(--cream)", fontWeight: 700, fontSize: 15, padding: "15px 26px", borderRadius: 999, textDecoration: "none", border: "1px solid rgba(255,247,239,.18)" }}>
                  Watch on YouTube instead
                </Link>
              </div>
              <p style={{ fontSize: 12, color: "rgba(255,247,239,.45)", marginTop: 22, wordBreak: "break-all" }}>
                Meeting ID: 846 3538 8414
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--cream)", padding: "80px clamp(20px,5vw,64px)", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px,4vw,52px)", letterSpacing: "-1.2px", color: "var(--ink)", margin: "0 0 16px", lineHeight: 1 }}>Closer than you think.</h2>
          <p style={{ fontSize: 17, color: "var(--ink-soft)", margin: "0 0 30px", maxWidth: 540, marginInline: "auto" }}>
            Already a part of Salvation City? Plan a visit and meet the family onsite in Randallstown, MD.
          </p>
          <Link href="/visit" className="press" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--ink)", color: "#fff", fontWeight: 800, fontSize: 16, padding: "17px 30px", borderRadius: 999, textDecoration: "none" }}>
            Plan a Visit <ArrowRight size={17} strokeWidth={2.5} aria-hidden />
          </Link>
        </Reveal>
      </section>

      <FooterExperience />
    </main>
  );
}
