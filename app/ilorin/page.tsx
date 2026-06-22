import { Nav } from "@/components/navigation/Nav";
import { FooterExperience } from "@/components/sections/FooterExperience";
import { Reveal } from "@/components/ui/Reveal";
import { MapPin, Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "CAC Salvation Centre, Ilorin — Parent Assembly",
  description:
    "Christ Apostolic Church Salvation Centre, Ilorin — the parent assembly established July 6, 1997 under Pastor Dr. H.O. Ilufoye in Kwara State, Nigeria.",
  alternates: { canonical: "/ilorin" },
};

export default function IlorinPage() {
  return (
    <main>
      <Nav heroDark />

      {/* Hero */}
      <section style={{ background: "var(--ink)", padding: "150px clamp(20px,5vw,64px) 100px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: -120, right: -120, width: 540, height: 540, borderRadius: "50%", background: "radial-gradient(circle,rgba(232,163,61,.22),transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 22 }}>
              <MapPin size={14} strokeWidth={2.5} aria-hidden /> Kwara State · Nigeria
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(44px,7vw,98px)", letterSpacing: "-2.2px", color: "#fff", margin: "0 0 22px", lineHeight: 0.93 }}>
              The parent<br />
              <span style={{ background: "linear-gradient(100deg,#F15F22,#D62828,#E8A33D)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>assembly in Ilorin.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p style={{ fontSize: "clamp(16px,1.8vw,20px)", color: "rgba(255,247,239,.72)", lineHeight: 1.7, maxWidth: 620, margin: "0 auto" }}>
              CAC Salvation Centre, Ilorin — the mother church established on July 6, 1997, from which the Baltimore-Maryland DCC was planted in 2002.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Founding story */}
      <section style={{ background: "var(--cream-2)", padding: "clamp(60px,7vw,100px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 880, margin: "0 auto" }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
              <div style={{ display: "grid", placeItems: "center", width: 52, height: 52, borderRadius: 16, background: "linear-gradient(135deg,var(--flame),var(--red))", boxShadow: "0 12px 26px rgba(214,40,40,.3)" }}>
                <Calendar size={22} strokeWidth={2} color="#fff" aria-hidden />
              </div>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)" }}>Established July 6, 1997</div>
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px,4vw,52px)", letterSpacing: "-1.2px", color: "var(--ink)", margin: "0 0 22px", lineHeight: 1.02 }}>
              From Ilorin, the vision went out.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 18, fontSize: 17, color: "var(--ink-soft)", lineHeight: 1.8 }}>
              <p>
                Christ Apostolic Church Salvation Centre, Ilorin, was raised on July 6, 1997, under the leadership of Pastor Dr. H.O. Ilufoye — with a clear mandate to preach the whole Gospel in a clear and undiluted manner, and to build God&apos;s ambassadors here on earth.
              </p>
              <p>
                From that single assembly in Kwara State, Nigeria, the vision crossed oceans. The Baltimore-Maryland District Coordinating Council in the United States was planted in 2002, and the family has continued to multiply — in worship, in discipleship, and in mission — ever since.
              </p>
              <p>
                We honor the parent assembly that birthed us, and we walk in continuity with the same Gospel, the same prayer-rooted tradition, and the same call: to make Jesus known in every nation.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Lineage */}
      <section style={{ background: "var(--cream)", padding: "clamp(60px,7vw,96px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)" }}>Spiritual Lineage</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,46px)", letterSpacing: "-1px", color: "var(--ink)", margin: "12px 0 0", lineHeight: 1 }}>
              One family, two continents.
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            {[
              { year: "1997", title: "Ilorin, Nigeria", desc: "CAC Salvation Centre established under Pastor Dr. H.O. Ilufoye on July 6." },
              { year: "2002", title: "Baltimore, USA", desc: "The Baltimore-Maryland District Coordinating Council planted from the Ilorin vision." },
              { year: "Today", title: "Sister assemblies", desc: "CAC Kingdom Embassy, CAC Palace of Peace, and Salvation City — multiplying together." },
            ].map((t, i) => (
              <Reveal key={t.year} delay={i * 80}>
                <div style={{ height: "100%", background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 22, padding: "28px 26px", boxShadow: "0 10px 26px rgba(27,19,14,.05)" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 36, color: "var(--red)", letterSpacing: "-1px", marginBottom: 14, lineHeight: 1 }}>{t.year}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 21, letterSpacing: "-.4px", color: "var(--ink)", margin: "0 0 8px" }}>{t.title}</h3>
                  <p style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.7, margin: 0 }}>{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--ink)", padding: "80px clamp(20px,5vw,64px)", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px,4vw,52px)", letterSpacing: "-1.2px", color: "var(--cream)", margin: "0 0 16px", lineHeight: 1 }}>Walk with the family in Maryland.</h2>
          <p style={{ fontSize: 17, color: "rgba(255,247,239,.6)", margin: "0 0 30px", maxWidth: 540, marginInline: "auto" }}>
            If you&apos;re in Nigeria, fellowship at the Ilorin assembly. If you&apos;re in the U.S., come home to the Salvation Center, Randallstown.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <Link href="/visit" className="press" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--red)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "17px 30px", borderRadius: 999, textDecoration: "none", boxShadow: "0 14px 30px rgba(214,40,40,.4)" }}>
              Plan a Visit (USA) <ArrowRight size={17} strokeWidth={2.5} aria-hidden />
            </Link>
            <Link href="/about" style={{ background: "rgba(255,247,239,.1)", color: "var(--cream)", fontWeight: 700, fontSize: 16, padding: "17px 30px", borderRadius: 999, textDecoration: "none", border: "1px solid rgba(255,247,239,.2)" }}>Our Story</Link>
          </div>
        </Reveal>
      </section>

      <FooterExperience />
    </main>
  );
}
