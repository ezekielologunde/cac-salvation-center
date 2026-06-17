import { Nav } from "@/components/navigation/Nav";
import { FooterExperience } from "@/components/sections/FooterExperience";
import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Leadership — CAC Salvation Center",
  description: "Meet the pastoral team leading CAC Salvation Center in Randallstown, MD.",
};

const pastors = [
  {
    name: "Pastor Dr. H.O. Ilufoye",
    title: "Senior Pastor",
    bio: "Pastor Dr. H.O. Ilufoye founded CAC Salvation Center in Baltimore in 2002, carrying the vision of C.A.C Salvation Centre, Ilorin, Nigeria — established July 6, 1997. Under his leadership, the church has grown into a vibrant, Spirit-filled community committed to preaching the whole Gospel and raising God's ambassadors in Maryland and beyond.",
    image: "/images/pastor.jpg",
    featured: true,
  },
  {
    name: "Pastor (Mrs.) Ilufoye",
    title: "Pastor",
    bio: "A pillar of the Salvation Center family, Pastor Mrs. Ilufoye ministers with warmth and grace, supporting the pastoral work and nurturing the spiritual growth of the congregation.",
    image: "/images/worship.jpg",
    featured: false,
  },
];

export default function LeadershipPage() {
  return (
    <main>
      <Nav />

      {/* Hero */}
      <section style={{ background: "var(--cream)", padding: "140px clamp(20px,5vw,64px) 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,#F15F22,#D62828 70%)", opacity: .1, filter: "blur(6px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <Reveal>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)" }}>Leadership</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(46px,6.5vw,90px)", letterSpacing: "-2px", color: "var(--ink)", margin: "16px 0", lineHeight: .92 }}>
              Meet Our<br />
              <span style={{ background: "linear-gradient(100deg,#F15F22,#D62828)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>Pastors.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p style={{ fontSize: "clamp(16px,1.8vw,19px)", color: "var(--ink-soft)", lineHeight: 1.65, maxWidth: 540, margin: "0 auto" }}>
              Servant leaders committed to preaching the whole Gospel and shepherding every soul home.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Pastor cards */}
      <section style={{ background: "var(--cream-2)", padding: "80px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", display: "flex", flexDirection: "column", gap: 48 }}>
          {pastors.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <div style={{
                display: "grid",
                gridTemplateColumns: p.featured ? "340px 1fr" : "260px 1fr",
                gap: 48,
                alignItems: "start",
                background: p.featured ? "var(--ink)" : "var(--paper)",
                borderRadius: 28, overflow: "hidden",
                boxShadow: p.featured ? "0 30px 60px rgba(27,19,14,.22)" : "0 10px 30px rgba(27,19,14,.08)",
              }}>
                <div style={{ position: "relative", height: p.featured ? 460 : 320 }}>
                  <Image src={p.image} alt={p.name} fill style={{ objectFit: "cover", objectPosition: "center top" }} />
                </div>
                <div style={{ padding: "40px 40px 40px 0", color: p.featured ? "var(--cream)" : "var(--ink)" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: p.featured ? "var(--gold)" : "var(--red)", marginBottom: 12 }}>{p.title}</div>
                  <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(26px,3vw,40px)", letterSpacing: "-1px", margin: "0 0 20px", lineHeight: 1.05 }}>{p.name}</h2>
                  <p style={{ fontSize: 16, lineHeight: 1.75, opacity: p.featured ? .82 : 1, margin: 0, color: p.featured ? "var(--cream)" : "var(--ink-soft)" }}>{p.bio}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Choir / Worship Team */}
      <section style={{ background: "var(--cream)", padding: "80px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)" }}>Worship Team</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px,4vw,52px)", letterSpacing: "-1px", color: "var(--ink)", margin: "14px 0 0", lineHeight: .95 }}>The Choir</h2>
          </Reveal>
          <Reveal delay={80}>
            <div style={{ borderRadius: 24, overflow: "hidden", position: "relative", height: "clamp(280px,36vw,440px)", boxShadow: "0 24px 50px rgba(27,19,14,.16)" }}>
              <Image src="/images/choir.jpg" alt="CAC Salvation Center choir" fill style={{ objectFit: "cover", objectPosition: "center 30%" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,.6),transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: 32, left: 36, color: "#fff" }}>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28 }}>Salvation Center Choir</div>
                <div style={{ fontSize: 14, opacity: .75, marginTop: 4 }}>Leading the congregation in Spirit-filled worship every Sunday</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--ink)", padding: "80px clamp(20px,5vw,64px)", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px,4.5vw,60px)", letterSpacing: "-1.2px", color: "var(--cream)", margin: "0 0 16px", lineHeight: .96 }}>Come worship with us.</h2>
          <p style={{ fontSize: 17, color: "rgba(255,247,239,.6)", margin: "0 0 36px" }}>Sundays at 10:30 AM — 10710 Marriottsville Rd, Randallstown MD.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link href="/visit" style={{ background: "var(--red)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "17px 30px", borderRadius: 999, textDecoration: "none", boxShadow: "0 14px 30px rgba(214,40,40,.4)" }}>Plan a Visit →</Link>
            <Link href="/about" style={{ background: "rgba(255,247,239,.1)", color: "var(--cream)", fontWeight: 700, fontSize: 16, padding: "17px 30px", borderRadius: 999, textDecoration: "none", border: "1px solid rgba(255,247,239,.2)" }}>Our Story</Link>
          </div>
        </Reveal>
      </section>

      <FooterExperience />
    </main>
  );
}
