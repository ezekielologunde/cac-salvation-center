import { Nav } from "@/components/navigation/Nav";
import { FooterExperience } from "@/components/sections/FooterExperience";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import Link from "next/link";
import Image from "next/image";
import { Music, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Salvation Voices — The CAC Salvation Center Choir",
  description:
    "Salvation Voices, the choir of CAC Salvation Center in Randallstown, MD — our mission, who can join, and the standards we keep as we lead the congregation in Spirit-filled praise and worship.",
  alternates: { canonical: "/choir" },
};

const MISSION =
  "The mission of Salvation Voices is to use Christian songs and hymns to praise the name of our Lord Jesus Christ, and to lead the congregation into praise and worship. We exist to motivate and inspire the members of this house to glorify the name of our Lord through song.";

const qualifications = [
  "You believe in the tenets of the Christ Apostolic Church.",
  "You have reasonable skill — or a genuine desire to develop skill — in singing or playing a musical instrument.",
  "You show reverence and respect to God Almighty, and see this assignment as a service unto Him.",
  "You understand that the choir is a team that blends as one — every member is here to support the others.",
  "You will commit to choir practice and rehearsals as deemed necessary by the Choir Leader.",
  "You carry a positive attitude, team spirit, and a joyful expectation of reward from God for your service.",
  "You are ready to be a role model for the congregation to follow.",
];

const rules = [
  "Give the Pastors, Elders, Deacons, Deaconesses, and Choir Leader the greatest respect, loyal support, and love.",
  "Attend practice and rehearsals ready to sing and learn. Except with the Choir Leader's permission, illness, or an approved leave of absence, three successive absences from practice or service shall be deemed a resignation.",
  "Arrive on time for practice and rehearsals.",
  "Never criticize another member's voice.",
  "Encourage other members of the congregation to join the choir.",
  "Notify the Choir Leader if you will miss a scheduled practice or event.",
  "Volunteer to help set up and clean up before and after choir-related events.",
  "Ensure all microphones, hymn books, choir robes, and instruments are properly stored at the end of every practice or event.",
  "Practice songs at home whenever possible.",
  "Keep mobile phones on silent, vibrate, or off during practice and church events.",
  "Hold no private or side conversations during practice or events — idle talk is not acceptable. Give your undivided attention.",
  "Mind personal hygiene, as members share robes, microphones, and equipment. Be mindful that others may be sensitive to cologne or perfume, and avoid them for practice and events where possible.",
  "Comply with the dress code set out by the Choir Leader.",
  "Never let personal ego override the success of the team.",
  "Do not confront another member — it brings hard feelings and tension that are not good for a team.",
  "Report any concern about a choir member only to the Choir Leader.",
  "Share ideas with the Choir Leader in a tactful and loving manner.",
  "Be willing to accept any other assignment as deemed fit by the Pastor or Choir Leader.",
  "Keep a copy of these rules as a reference guide to your membership — they outline the expectations and standard of participation in Salvation Voices.",
  "The church authorities may amend these rules as deemed necessary. You will be notified of any such changes.",
];

const commitment = [
  "I understand the mission of Salvation Voices.",
  "I am qualified to be a member of Salvation Voices.",
  "I will abide by the rules and regulations set forth here. Any violation may attract disciplinary measures, including termination.",
];

export default function ChoirPage() {
  return (
    <main>
      <Nav heroDark />

      {/* Hero */}
      <section style={{ background: "var(--ink)", padding: "150px clamp(20px,5vw,64px) 96px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: -110, right: "-6%", width: 640, height: 440, background: "radial-gradient(circle,rgba(214,40,40,.32),transparent 64%)", pointerEvents: "none", animation: "gradient-drift 16s ease-in-out infinite" }} />
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <Reveal from="scale">
            <span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--gold)", background: "rgba(232,163,61,.1)", border: "1px solid rgba(232,163,61,.28)", padding: "7px 16px", borderRadius: 999 }}>
              <Music size={14} strokeWidth={2.4} aria-hidden /> CAC Salvation Center Choir
            </span>
          </Reveal>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(48px,8vw,104px)", letterSpacing: "-0.03em", color: "#fff", margin: "20px 0 0", lineHeight: 0.92 }}>
            <RevealText immediate style={{ background: "linear-gradient(100deg,#F15F22,#D62828,#E8A33D)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Salvation Voices.
            </RevealText>
          </h1>
          <Reveal delay={320}>
            <p style={{ fontSize: "clamp(16px,1.9vw,20px)", color: "rgba(255,247,239,.72)", lineHeight: 1.7, maxWidth: 600, margin: "22px auto 0", textWrap: "pretty" }}>
              The voice of the house — leading God&apos;s people into Spirit-filled praise, one song at a time.
            </p>
          </Reveal>
          <Reveal delay={420}>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontStyle: "italic", fontSize: "clamp(15px,1.8vw,19px)", color: "rgba(255,247,239,.5)", margin: "26px auto 0", maxWidth: 560, lineHeight: 1.5 }}>
              &ldquo;Make a joyful noise unto the Lord&hellip; come before His presence with singing.&rdquo; — Psalm 100:1&ndash;2
            </p>
          </Reveal>
          <Reveal delay={500}>
            <div style={{ marginTop: 36 }}>
              <Link href="/contact" className="btn-sheen press-lg" style={{ display: "inline-block", background: "var(--red)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "16px 32px", borderRadius: 999, textDecoration: "none", boxShadow: "0 16px 34px rgba(214,40,40,.4)" }}>
                Join the choir →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission */}
      <section style={{ background: "var(--cream)", padding: "clamp(56px,7vw,100px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 48, alignItems: "center" }}>
          <Reveal>
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)" }}>Our mission</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,3.8vw,48px)", letterSpacing: "-1px", color: "var(--ink)", margin: "12px 0 20px", lineHeight: 1.02 }}>
              We sing so the house can worship.
            </h2>
            <p style={{ fontSize: 17, color: "var(--ink-soft)", lineHeight: 1.8, margin: 0 }}>{MISSION}</p>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ position: "relative", height: "clamp(280px,34vw,420px)", borderRadius: 24, overflow: "hidden", border: "1px solid var(--line)", boxShadow: "0 20px 44px rgba(27,19,14,.12)" }}>
              <Image src="/images/choir.jpg" alt="CAC Salvation Center choir — Salvation Voices — in worship" fill style={{ objectFit: "cover", objectPosition: "center 30%" }} sizes="(max-width:900px) 100vw, 540px" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Qualifications */}
      <section style={{ background: "var(--paper)", padding: "clamp(56px,7vw,100px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 44, textAlign: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)" }}>Who can join</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,3.8vw,48px)", letterSpacing: "-1px", color: "var(--ink)", margin: "12px 0 0", lineHeight: 1 }}>Qualifications</h2>
          </Reveal>
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
            {qualifications.map((q, i) => (
              <Reveal key={i} delay={(i % 4) * 70}>
                <li style={{ display: "flex", alignItems: "flex-start", gap: 14, background: "var(--cream-2)", border: "1px solid var(--line)", borderRadius: 16, padding: "18px 22px" }}>
                  <CheckCircle2 size={22} strokeWidth={2} color="var(--red)" aria-hidden style={{ flexShrink: 0, marginTop: 1 }} />
                  <span style={{ fontSize: 16, color: "var(--ink)", lineHeight: 1.65 }}>{q}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Rules & Regulations */}
      <section style={{ background: "var(--cream-2)", padding: "clamp(56px,7vw,100px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 12, textAlign: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)" }}>How we serve together</span>
          </Reveal>
          <Reveal delay={80} style={{ marginBottom: 48, textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,52px)", letterSpacing: "-1.2px", color: "var(--ink)", margin: 0, lineHeight: 0.98 }}>Rules &amp; Regulations</h2>
            <p style={{ fontSize: "clamp(15px,1.7vw,18px)", color: "var(--ink-soft)", lineHeight: 1.7, margin: "16px auto 0", maxWidth: 620 }}>
              These standards keep Salvation Voices one team — reverent before God and united with one another.
            </p>
          </Reveal>
          <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,380px),1fr))", gap: 14 }}>
            {rules.map((r, i) => (
              <Reveal key={i} delay={(i % 2) * 60}>
                <li style={{ display: "flex", alignItems: "flex-start", gap: 15, height: "100%", background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 16, padding: "18px 20px" }}>
                  <span aria-hidden style={{ flexShrink: 0, display: "grid", placeItems: "center", width: 30, height: 30, borderRadius: 9, background: "linear-gradient(140deg,var(--flame),var(--red))", color: "#fff", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14 }}>{i + 1}</span>
                  <span style={{ fontSize: 15, color: "var(--ink)", lineHeight: 1.6 }}>{r}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Membership commitment */}
      <section style={{ background: "var(--paper)", padding: "clamp(56px,7vw,100px) clamp(20px,5vw,64px)" }}>
        <Reveal style={{ maxWidth: 760, margin: "0 auto" }}>
          <div style={{ background: "linear-gradient(140deg,#1B130E,#3a2418)", borderRadius: 28, padding: "clamp(32px,5vw,52px)", position: "relative", overflow: "hidden" }}>
            <div aria-hidden style={{ position: "absolute", top: -40, right: -40, width: 200, height: 200, background: "radial-gradient(circle,rgba(232,163,61,.22),transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--gold)" }}>The commitment</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(24px,3vw,36px)", letterSpacing: "-.6px", color: "#fff", margin: "12px 0 20px", lineHeight: 1.1 }}>
                Every member of Salvation Voices affirms:
              </h2>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 16 }}>
                {commitment.map((c, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 13 }}>
                    <CheckCircle2 size={20} strokeWidth={2.2} color="var(--gold)" aria-hidden style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 16, color: "rgba(255,247,239,.86)", lineHeight: 1.7 }}>{c}</span>
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: 14, color: "rgba(255,247,239,.5)", lineHeight: 1.7, margin: "26px 0 0" }}>
                New members sign this commitment with the Choir Leader upon joining.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--ink)", padding: "clamp(56px,7vw,90px) clamp(20px,5vw,64px)", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px,4.5vw,58px)", letterSpacing: "-1.2px", color: "var(--cream)", margin: "0 0 16px", lineHeight: 0.96 }}>Come and lift your voice.</h2>
          <p style={{ fontSize: 17, color: "rgba(255,247,239,.6)", margin: "0 0 36px" }}>Whether you are seasoned or just beginning, there is a place for you in Salvation Voices.</p>
          <Link href="/contact" className="btn-sheen press-lg" style={{ display: "inline-block", background: "var(--red)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "17px 34px", borderRadius: 999, textDecoration: "none", boxShadow: "0 16px 34px rgba(214,40,40,.4)" }}>
            Join the choir →
          </Link>
        </Reveal>
      </section>

      <FooterExperience />
    </main>
  );
}
