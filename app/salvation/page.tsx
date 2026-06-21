import { Nav } from "@/components/navigation/Nav";
import { FooterExperience } from "@/components/sections/FooterExperience";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

export const metadata = {
  title: "Salvation — CAC Salvation Center",
  description: "Take the first step toward eternal life. Accept Jesus Christ as your Lord and Saviour today.",
};

const steps = [
  {
    num: "01",
    title: "Acknowledge",
    body: "Recognise that you are a sinner in need of God's grace. \"For all have sinned and fall short of the glory of God.\" — Romans 3:23",
  },
  {
    num: "02",
    title: "Believe",
    body: "Believe that Jesus Christ died for your sins and rose again. \"For God so loved the world that He gave His one and only Son.\" — John 3:16",
  },
  {
    num: "03",
    title: "Confess",
    body: "Confess Jesus as Lord with your mouth and believe in your heart. \"If you declare with your mouth 'Jesus is Lord'... you will be saved.\" — Romans 10:9",
  },
  {
    num: "04",
    title: "Connect",
    body: "Join a community of believers. You were never meant to walk this journey alone. We are here for you.",
  },
];

const scriptures = [
  { ref: "John 3:16", text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life." },
  { ref: "Romans 10:13", text: "For everyone who calls on the name of the Lord will be saved." },
  { ref: "John 14:6", text: "I am the way and the truth and the life. No one comes to the Father except through me." },
];

export default function SalvationPage() {
  return (
    <main>
      <Nav heroDark />

      {/* Hero */}
      <section style={{ background: "var(--ink)", padding: "140px clamp(20px,5vw,64px) 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 440, height: 440, borderRadius: "50%", background: "radial-gradient(circle,rgba(214,40,40,.3),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle,rgba(232,163,61,.2),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <Reveal>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--gold)" }}>Salvation</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(46px,6.5vw,96px)", letterSpacing: "-2px", color: "#fff", margin: "16px 0", lineHeight: .92 }}>
              Your life can<br />
              <span style={{ background: "linear-gradient(100deg,#F15F22,#D62828,#E8A33D)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>change today.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p style={{ fontSize: "clamp(16px,1.8vw,20px)", color: "rgba(255,247,239,.7)", lineHeight: 1.65, maxWidth: 580, margin: "0 auto 36px" }}>
              God loves you exactly as you are — and He has a plan for your life. Salvation is a gift, freely given. All you have to do is receive it.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <Link href="/contact" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--red)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "17px 32px", borderRadius: 999, textDecoration: "none", boxShadow: "0 14px 30px rgba(214,40,40,.4)" }}>
              Connect With Us →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Steps */}
      <section style={{ background: "var(--cream-2)", padding: "100px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(32px,4.5vw,58px)", letterSpacing: "-1.2px", color: "var(--ink)", margin: 0 }}>
              How to receive Christ.
            </h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {steps.map((s, i) => (
              <Reveal key={s.num} delay={i * 80}>
                <div style={{ background: "var(--paper)", borderRadius: 22, padding: "32px 36px", border: "1px solid var(--line)", display: "flex", gap: 28, alignItems: "flex-start", boxShadow: "0 8px 24px rgba(27,19,14,.06)" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 42, color: "var(--red)", lineHeight: 1, flexShrink: 0, minWidth: 54 }}>{s.num}</span>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--ink)", margin: "0 0 10px" }}>{s.title}</h3>
                    <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.7, margin: 0 }}>{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Prayer of salvation */}
      <section style={{ background: "linear-gradient(135deg,var(--red-deep),var(--red))", padding: "80px clamp(20px,5vw,64px)" }}>
        <Reveal style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,52px)", letterSpacing: "-1px", color: "#fff", margin: "0 0 28px" }}>
            Prayer of Salvation
          </h2>
          <div style={{ background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 22, padding: "36px 40px", backdropFilter: "blur(10px)" }}>
            <p style={{ fontSize: "clamp(16px,2vw,20px)", color: "rgba(255,255,255,.92)", lineHeight: 1.8, fontStyle: "italic", margin: 0 }}>
              &ldquo;Lord Jesus, I come to You today. I know I am a sinner and I need Your forgiveness. I believe that You died for my sins and rose again. I confess You as my Lord and Saviour. Come into my life and make me a new creation. Thank You for saving me. Amen.&rdquo;
            </p>
          </div>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,.7)", marginTop: 28, lineHeight: 1.6 }}>
            If you just prayed this prayer sincerely, we would love to celebrate with you and walk with you in your new faith journey.
          </p>
          <Link href="/contact" style={{ display: "inline-block", marginTop: 28, background: "#fff", color: "var(--red)", fontWeight: 800, fontSize: 16, padding: "17px 36px", borderRadius: 999, textDecoration: "none" }}>
            Let Us Know →
          </Link>
        </Reveal>
      </section>

      {/* Scripture cards */}
      <section style={{ background: "var(--cream)", padding: "80px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 44 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,3.5vw,48px)", letterSpacing: "-1px", color: "var(--ink)", margin: 0 }}>God&apos;s Word on Salvation</h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {scriptures.map((s, i) => (
              <Reveal key={s.ref} delay={i * 60}>
                <div style={{ background: "var(--paper)", borderRadius: 18, padding: "28px 32px", border: "1px solid var(--line)", display: "flex", gap: 24, alignItems: "flex-start" }}>
                  <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: "var(--red)", flexShrink: 0, minWidth: 90, paddingTop: 3 }}>{s.ref}</div>
                  <p style={{ fontSize: 17, color: "var(--ink)", lineHeight: 1.7, margin: 0, fontStyle: "italic" }}>&ldquo;{s.text}&rdquo;</p>
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
