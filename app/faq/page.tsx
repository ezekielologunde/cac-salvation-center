import "./faq.css";
import { Nav } from "@/components/navigation/Nav";
import { FooterExperience } from "@/components/sections/FooterExperience";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";
import type { Metadata } from "next";
import { SITE, breadcrumbJsonLd } from "@/lib/site";
import { FAQ_ITEMS, faqJsonLd } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ — CAC Salvation Center | Randallstown, MD",
  description:
    "Answers to common questions about CAC Salvation Center near Baltimore: service times and location, watching online, Yoruba worship, giving, our pastors and ministries, and how to contact us.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])).replace(/</g, "\\u003c") }} />
      <Nav />

      {/* Hero */}
      <section style={{ background: "var(--cream)", padding: "140px clamp(20px,5vw,64px) 56px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: -80, right: -60, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,#F15F22,#D62828 70%)", opacity: 0.1, filter: "blur(6px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <Reveal>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)" }}>FAQ</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(46px,6.5vw,90px)", letterSpacing: "-0.03em", color: "var(--ink)", margin: "16px 0", lineHeight: 0.92 }}>
              Questions,{" "}
              <span style={{ background: "linear-gradient(100deg,#F15F22,#D62828)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>answered.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p style={{ fontSize: "clamp(16px,1.8vw,19px)", color: "var(--ink-soft)", lineHeight: 1.65, maxWidth: 560, margin: "0 auto" }}>
              Service times, watching online, giving, and who we are. Can&apos;t find what you need? Just ask.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Questions. Native details/summary, so every answer is readable without JS. */}
      <section style={{ background: "var(--cream-2)", padding: "clamp(40px,5vw,72px) clamp(20px,5vw,64px) clamp(64px,8vw,100px)" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          {FAQ_ITEMS.map((item, i) => (
            <details key={item.id} id={item.id} className="faq-item" open={i === 0}>
              <summary>
                <span>{item.question}</span>
                <span className="faq-plus" aria-hidden>+</span>
              </summary>
              <div className="faq-answer">
                <p>{item.answer}</p>
                {item.links && (
                  <p className="faq-links">
                    {item.links.map((l) => (
                      <Link key={l.href} href={l.href}>{l.label} →</Link>
                    ))}
                  </p>
                )}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--ink)", padding: "clamp(60px,8vw,100px) clamp(20px,5vw,64px)", textAlign: "center" }}>
        <Reveal>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px,4vw,52px)", letterSpacing: "-1px", color: "var(--cream)", margin: "0 0 14px", lineHeight: 0.98 }}>
            Still have a question?
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,247,239,.6)", margin: "0 0 32px" }}>
            Call {SITE.telephone.replace("+1-", "(").replace("-", ") ")} or send us a message and we will get back to you.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
            <Link href="/contact" className="press" style={{ display: "inline-flex", alignItems: "center", background: "var(--red)", color: "#fff", fontWeight: 700, fontSize: 16, padding: "17px 30px", borderRadius: 999, textDecoration: "none", boxShadow: "0 14px 30px rgba(214,40,40,.34)" }}>
              Contact us →
            </Link>
            <Link href="/visit" className="press" style={{ display: "inline-flex", alignItems: "center", background: "rgba(255,247,239,.1)", color: "var(--cream)", fontWeight: 700, fontSize: 16, padding: "17px 30px", borderRadius: 999, textDecoration: "none", border: "1px solid rgba(255,247,239,.2)" }}>
              Plan a visit
            </Link>
          </div>
        </Reveal>
      </section>

      <FooterExperience />
    </main>
  );
}
