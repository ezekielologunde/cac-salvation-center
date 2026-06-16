import { Nav } from "@/components/navigation/Nav";
import { FooterExperience } from "@/components/sections/FooterExperience";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

const values = [
  { icon: "✝️", title: "Sound doctrine", desc: "Preaching the whole counsel of God, faithfully and without compromise." },
  { icon: "🤝", title: "Real community", desc: "A family that worships, prays and grows together — onsite and online." },
  { icon: "🌍", title: "Ambassadors", desc: "Equipping every believer to carry the Kingdom into everyday life." },
];

export const metadata = {
  title: "About — CAC Salvation Center",
  description: "Learn about our mission, values, and the people who make CAC Salvation Center a home for real faith.",
};

export default function AboutPage() {
  return (
    <main>
      <Nav />

      {/* Hero */}
      <section style={{
        background: "var(--cream)", padding: "140px clamp(20px,5vw,64px) 80px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,#F15F22,#D62828 70%)", opacity: .12, filter: "blur(6px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <Reveal>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)" }}>Who We Are</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(48px,7vw,96px)", letterSpacing: "-2px", color: "var(--ink)", margin: "18px 0", lineHeight: .92 }}>
              More than a greeting.<br />
              <span style={{ background: "linear-gradient(100deg,#F15F22,#D62828,#9E1B1B)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>A lifestyle.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p style={{ fontSize: "clamp(16px,1.8vw,20px)", color: "var(--ink-soft)", lineHeight: 1.65, maxWidth: 640, margin: "0 auto 36px" }}>
              Christ Apostolic Church Salvation Center exists to preach the whole Gospel — in a clear and undiluted manner — and to build God&apos;s ambassadors here on earth.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <Link href="/visit" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--red)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "17px 30px", borderRadius: 999, textDecoration: "none", boxShadow: "0 14px 30px rgba(214,40,40,.34)" }}>
              Plan a Visit →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Mission split */}
      <section style={{ background: "var(--cream-2)", padding: "100px clamp(20px,5vw,64px)" }}>
        <div className="r2" style={{ maxWidth: 1100, margin: "0 auto", gap: 60, alignItems: "start" }}>
          <Reveal>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px,4vw,54px)", letterSpacing: "-1.2px", color: "var(--ink)", margin: "0 0 24px", lineHeight: .96 }}>
              Our Mandate
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { label: "Our Mandate", text: "Preach the whole Gospel — in a clear and undiluted manner." },
                { label: "Our Purpose", text: "Build God's ambassadors here on earth." },
                { label: "Our Promise", text: "Everyone who walks through our doors finds a home." },
              ].map((m, i) => (
                <div key={i} style={{ padding: "22px 24px", background: "var(--paper)", borderRadius: 18, border: "1px solid var(--line)" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--red)", marginBottom: 8 }}>{m.label}</div>
                  <p style={{ fontSize: 17, color: "var(--ink)", fontWeight: 600, margin: 0, lineHeight: 1.5 }}>{m.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={140}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px,4vw,54px)", letterSpacing: "-1.2px", color: "var(--ink)", margin: "0 0 24px", lineHeight: .96 }}>
              Our Story
            </h2>
            <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.75, marginBottom: 20 }}>
              Founded in Baltimore in 2002, CAC Salvation Center grew from the vision of its parent assembly — C.A.C Salvation Centre, Ilorin, Nigeria — established on July 6, 1997, under Pastor Dr. H.O. Ilufoye.
            </p>
            <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.75 }}>
              Part of the Christ Apostolic Church — one of Africa&apos;s largest Pentecostal denominations — our mission is raising generations of believers liberated through the light of God&apos;s Word and prayer, in Maryland and beyond.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section style={{ background: "var(--cream)", padding: "100px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)" }}>What We Value</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(36px,5vw,64px)", letterSpacing: "-1.5px", color: "var(--ink)", margin: "14px 0 0", lineHeight: .95 }}>
              Core Values
            </h2>
          </Reveal>
          <div className="r3" style={{ gap: 18 }}>
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div style={{ background: "var(--paper)", borderRadius: 20, padding: "28px 24px", border: "1px solid var(--line)", boxShadow: "0 8px 22px rgba(27,19,14,.05)" }}>
                  <span style={{ fontSize: 32, marginBottom: 16, display: "block" }}>{v.icon}</span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--ink)", margin: "0 0 10px" }}>{v.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.65, margin: 0 }}>{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section style={{ background: "var(--cream-2)", padding: "100px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)" }}>Leadership</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(36px,5vw,64px)", letterSpacing: "-1.5px", color: "var(--ink)", margin: "14px 0 0", lineHeight: .95 }}>
              Meet Our Pastor
            </h2>
          </Reveal>
          <div className="r3" style={{ gap: 22 }}>
            <Reveal style={{ background: "var(--ink)", color: "var(--cream)", borderRadius: 26, overflow: "hidden" }}>
              <div style={{ height: 340, background: "linear-gradient(150deg,#2a1810,#1a0f08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "rgba(255,247,239,.2)", fontSize: 13 }}>Senior Pastor photo</span>
              </div>
              <div style={{ padding: 26 }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 26 }}>Pastor Dr. H.O. Ilufoye</div>
                <div style={{ color: "var(--gold)", fontWeight: 700, fontSize: 14, marginTop: 4 }}>Senior Pastor</div>
                <p style={{ fontSize: 14.5, lineHeight: 1.6, opacity: .8, margin: "14px 0 0" }}>Leading the Salvation Center with a heart to build God&apos;s ambassadors and welcome every soul home.</p>
              </div>
            </Reveal>
            <Reveal delay={100} style={{ background: "var(--paper)", borderRadius: 26, overflow: "hidden", boxShadow: "0 10px 26px rgba(27,19,14,.06)" }}>
              <div style={{ height: 280, background: "linear-gradient(150deg,#e8d5c0,#d4b896)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "rgba(27,19,14,.3)", fontSize: 13 }}>Photo</span>
              </div>
              <div style={{ padding: 24 }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 21 }}>Pastor (Mrs.) Ilufoye</div>
                <div style={{ color: "var(--red)", fontWeight: 700, fontSize: 13, marginTop: 4 }}>Pastor</div>
              </div>
            </Reveal>
            <Reveal delay={200} style={{ background: "var(--paper)", borderRadius: 26, overflow: "hidden", boxShadow: "0 10px 26px rgba(27,19,14,.06)" }}>
              <div style={{ height: 280, background: "linear-gradient(150deg,#e8d5c0,#d4b896)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "rgba(27,19,14,.3)", fontSize: 13 }}>Photo</span>
              </div>
              <div style={{ padding: 24 }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 21 }}>Ministry Lead</div>
                <div style={{ color: "var(--red)", fontWeight: 700, fontSize: 13, marginTop: 4 }}>Associate</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--ink)", padding: "80px clamp(20px,5vw,64px)", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(36px,5vw,64px)", letterSpacing: "-1.5px", color: "var(--cream)", margin: "0 0 16px", lineHeight: .95 }}>Ready to visit?</h2>
          <p style={{ fontSize: 17, color: "rgba(255,247,239,.6)", margin: "0 0 36px" }}>Join us this Sunday at 10:30 AM — onsite or online.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link href="/visit" style={{ background: "var(--red)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "17px 30px", borderRadius: 999, textDecoration: "none", boxShadow: "0 14px 30px rgba(214,40,40,.4)" }}>Plan a Visit →</Link>
            <Link href="/online" style={{ background: "rgba(255,247,239,.1)", color: "var(--cream)", fontWeight: 700, fontSize: 16, padding: "17px 30px", borderRadius: 999, textDecoration: "none", border: "1px solid rgba(255,247,239,.2)" }}>Watch Online</Link>
          </div>
        </Reveal>
      </section>

      <FooterExperience />
    </main>
  );
}
