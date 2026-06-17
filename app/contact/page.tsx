"use client";
import { Nav } from "@/components/navigation/Nav";
import { FooterExperience } from "@/components/sections/FooterExperience";
import { Reveal } from "@/components/ui/Reveal";
import { useEffect } from "react";

export default function ContactPage() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//embed.typeform.com/next/embed.js";
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  return (
    <main>
      <Nav />

      {/* Hero */}
      <section style={{ background: "var(--cream)", padding: "140px clamp(20px,5vw,64px) 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: -80, right: -60, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,#F15F22,#D62828 70%)", opacity: .1, filter: "blur(6px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <Reveal>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)" }}>Contact Us</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(46px,6.5vw,90px)", letterSpacing: "-2px", color: "var(--ink)", margin: "16px 0", lineHeight: .92 }}>
              We&apos;d love to<br />
              <span style={{ background: "linear-gradient(100deg,#F15F22,#D62828)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>hear from you.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p style={{ fontSize: "clamp(16px,1.8vw,19px)", color: "var(--ink-soft)", lineHeight: 1.65, maxWidth: 520, margin: "0 auto" }}>
              Whether you&apos;re visiting for the first time or looking to connect more deeply — fill in the form below and we&apos;ll be in touch.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Typeform */}
      <section style={{ background: "var(--cream-2)", padding: "60px clamp(20px,5vw,64px) 100px" }}>
        <Reveal>
          <div
            data-tf-live="01JYYBW0RJRTT8FG5HMGVK9D07"
            style={{ maxWidth: 820, margin: "0 auto", minHeight: 600 }}
          />
        </Reveal>
      </section>

      {/* Quick contact info */}
      <section style={{ background: "var(--cream)", padding: "80px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,3.5vw,48px)", letterSpacing: "-1px", color: "var(--ink)", margin: 0 }}>Other ways to reach us</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 18 }}>
            {[
              { icon: "📍", title: "Address", lines: ["10710 Marriottsville Rd", "Randallstown, MD 21133"], href: "https://maps.google.com/?q=10710+Marriottsville+Rd+Randallstown+MD+21133" },
              { icon: "📞", title: "Phone", lines: ["+1 443-272-6794", "+1 410-701-8315"], href: "tel:+14432726794" },
              { icon: "✉️", title: "Email", lines: ["info@cacsalvationcenter.org"], href: "mailto:info@cacsalvationcenter.org" },
              { icon: "⏰", title: "Sunday Service", lines: ["Sunday School 9:25 AM", "Main Service 10:30 AM ET"], href: null },
            ].map((card) => (
              <Reveal key={card.title}>
                <div style={{ background: "var(--paper)", borderRadius: 20, padding: "28px 24px", border: "1px solid var(--line)", boxShadow: "0 8px 22px rgba(27,19,14,.05)" }}>
                  <span style={{ fontSize: 30, display: "block", marginBottom: 14 }}>{card.icon}</span>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--red)", marginBottom: 8 }}>{card.title}</div>
                  {card.href ? (
                    <a href={card.href} style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", textDecoration: "none", lineHeight: 1.65 }}>
                      {card.lines.map((l, i) => <span key={i} style={{ display: "block" }}>{l}</span>)}
                    </a>
                  ) : (
                    <div style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", lineHeight: 1.65 }}>
                      {card.lines.map((l, i) => <span key={i} style={{ display: "block" }}>{l}</span>)}
                    </div>
                  )}
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
