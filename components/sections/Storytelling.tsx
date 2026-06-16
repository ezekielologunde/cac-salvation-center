import Link from "next/link";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";

export function Storytelling() {
  return (
    <section style={{ background: "var(--cream-2)", padding: "100px clamp(20px,5vw,64px)" }}>
      <div className="r2c" style={{ maxWidth: 1200, margin: "0 auto", gap: "clamp(40px,5vw,80px)" }}>
        {/* Image placeholder */}
        <Reveal style={{ position: "relative" }}>
          <div style={{ width: "100%", height: "clamp(320px,40vw,500px)", borderRadius: 24, overflow: "hidden", boxShadow: "0 24px 50px rgba(27,19,14,.16)", position: "relative" }}>
            <Image src="/images/pastor.jpg" alt="Pastor Dr. H.O. Ilufoye preaching" fill style={{ objectFit: "cover", objectPosition: "center top" }} />
          </div>
          {/* Quote float */}
          <div style={{
            position: "absolute", bottom: -24, right: -24,
            background: "var(--red)", color: "#fff",
            padding: "20px 24px", borderRadius: 18,
            fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15,
            maxWidth: 200, lineHeight: 1.4,
            boxShadow: "0 18px 36px rgba(214,40,40,.36)",
          }}>
            &ldquo;Preach the whole Gospel.&rdquo;
          </div>
        </Reveal>

        {/* Copy */}
        <div>
          <Reveal>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)" }}>
              Who We Are
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "clamp(34px,4.5vw,60px)", letterSpacing: "-1.5px",
              color: "var(--ink)", margin: "16px 0 0", lineHeight: .96,
            }}>
              A church that feels like home.
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p style={{ fontSize: 17, color: "var(--ink-soft)", lineHeight: 1.7, margin: "24px 0 0", maxWidth: 460 }}>
              Christ Apostolic Church Salvation Center is more than a church — it&apos;s a family. We exist to preach the undiluted Gospel, build God&apos;s ambassadors, and make sure everyone who walks through our doors finds a true home.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginTop: 28 }}>
              {[
                { num: "01", text: "Preach the whole Gospel — in a clear and undiluted manner." },
                { num: "02", text: "Build God's ambassadors here on earth." },
                { num: "03", text: "Everyone who walks through our doors finds a home." },
              ].map(item => (
                <div key={item.num} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--red)", lineHeight: 1, flexShrink: 0, minWidth: 36 }}>{item.num}</span>
                  <p style={{ fontSize: 15, color: "var(--ink)", lineHeight: 1.55, margin: 0 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={260}>
            <Link href="/about" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              marginTop: 36, fontWeight: 700, fontSize: 15,
              color: "var(--ink)", textDecoration: "none",
              padding: "14px 24px", borderRadius: 999,
              border: "1.5px solid var(--ink)",
            }}>
              Learn Our Story →
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
