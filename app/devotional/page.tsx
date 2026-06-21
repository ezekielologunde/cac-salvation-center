import { Nav } from "@/components/navigation/Nav";
import { FooterExperience } from "@/components/sections/FooterExperience";
import { VerseOfDay } from "@/components/sections/VerseOfDay";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";

export const metadata = {
  title: "Devotional — CAC Salvation Center",
  description:
    "Daily encouragement from God's Word — a verse of the day, written devotionals, and the Hope for Today podcast from CAC Salvation Center.",
  alternates: { canonical: "/devotional" },
};

const devotionals = [
  {
    title: "More than a greeting",
    ref: "Romans 1:16",
    body: "“Welcome home” isn't just something we say — it's the heart of the Gospel. God runs toward us. Whatever you carried in today, His welcome is bigger. Receive it, and let it become the way you welcome others.",
  },
  {
    title: "Start the day in His presence",
    ref: "Mark 1:35",
    body: "Before the noise, Jesus found a quiet place to pray. Mornings set the tone. Five minutes with God before the world gets loud will steady everything that follows. Join the 5 AM prayer line and begin there.",
  },
  {
    title: "The undiluted Word",
    ref: "2 Timothy 4:2",
    body: "We're called to preach the whole Gospel, clearly and without compromise. The same Word that comforts also corrects — and both are love. Let Scripture read you today, not just the other way around.",
  },
];

export default function DevotionalPage() {
  return (
    <main>
      <Nav heroDark />

      {/* Hero */}
      <section style={{ background: "var(--ink)", padding: "150px clamp(20px,5vw,64px) 90px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 740, height: 460, background: "radial-gradient(circle,rgba(232,163,61,.22),transparent 65%)", pointerEvents: "none", animation: "gradient-drift 16s ease-in-out infinite" }} />
        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <Reveal from="scale">
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--gold)" }}>Devotional</span>
          </Reveal>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(44px,6.5vw,92px)", letterSpacing: "-0.03em", color: "#fff", margin: "16px 0", lineHeight: 0.95, textWrap: "balance" }}>
            <RevealText immediate>Daily bread</RevealText>
            <br />
            <RevealText immediate delay={0.15} style={{ background: "linear-gradient(100deg,#F15F22,#D62828,#E8A33D)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              for the soul.
            </RevealText>
          </h1>
          <Reveal delay={360}>
            <p style={{ fontSize: "clamp(16px,1.8vw,20px)", color: "rgba(255,247,239,.72)", lineHeight: 1.7, maxWidth: 540, margin: "0 auto", textWrap: "pretty" }}>
              A word of encouragement to carry into your day — straight from Scripture and from our family to yours.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Verse of the day */}
      <section style={{ background: "var(--cream-2)", padding: "clamp(56px,7vw,90px) clamp(20px,5vw,64px)" }}>
        <VerseOfDay />
      </section>

      {/* Written devotionals */}
      <section style={{ background: "var(--cream)", padding: "clamp(40px,6vw,80px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,52px)", letterSpacing: "-1px", color: "var(--ink)", margin: 0 }}>Reflections</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
            {devotionals.map((d, i) => (
              <Reveal key={d.title} delay={i * 90}>
                <article className="card-lift" style={{ height: "100%", background: "var(--paper)", borderRadius: 22, padding: "30px 28px", border: "1px solid var(--line)", boxShadow: "0 12px 30px rgba(27,19,14,.07)", display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: "var(--red)", marginBottom: 12 }}>{d.ref}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, letterSpacing: "-.4px", color: "var(--ink)", margin: "0 0 12px" }}>{d.title}</h3>
                  <p style={{ fontSize: 15.5, color: "var(--ink-soft)", lineHeight: 1.75, margin: 0 }}>{d.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Hope for Today podcast */}
      <section style={{ background: "var(--ink)", padding: "clamp(56px,7vw,90px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 36 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--gold)" }}>Listen anywhere</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,52px)", letterSpacing: "-1px", color: "var(--cream)", margin: "12px 0 0" }}>Hope for Today</h2>
            <p style={{ fontSize: 16, color: "rgba(255,247,239,.6)", maxWidth: 480, margin: "14px auto 0", lineHeight: 1.6 }}>Our weekly podcast — inspired messages to strengthen your faith, wherever you are.</p>
          </Reveal>
          <Reveal delay={100}>
            <iframe
              style={{ borderRadius: 14, border: "none", display: "block" }}
              src="https://open.spotify.com/embed/show/0wFUgSZq4CuVuM0M9gRFUw?utm_source=generator"
              width="100%" height="352"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="Hope for Today podcast on Spotify"
            />
          </Reveal>
        </div>
      </section>

      <FooterExperience />
    </main>
  );
}
