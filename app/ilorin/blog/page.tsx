import Link from "next/link";
import { Calendar, BookOpen, Headphones } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { IlorinHeader, IlorinFooter, ilorinColors as c } from "@/components/ilorin/IlorinChrome";
import { ILORIN_SERMONS_BY_DATE_DESC } from "@/lib/ilorinSermons";

export const metadata = {
  title: "Messages — C.A.C Salvation Centre, Ilorin",
  description:
    "Sunday messages from Pastor R.T. Owoseni and guest ministers at C.A.C Salvation Centre, Ilorin — topic, scripture text, and notes from each week.",
  alternates: { canonical: "/ilorin/blog" },
};

function SermonCard({ sermon, delay }: { sermon: (typeof ILORIN_SERMONS_BY_DATE_DESC)[number]; delay: number }) {
  return (
    <Reveal delay={delay}>
      <Link
        href={`/ilorin/blog/${sermon.slug}`}
        className="card-lift"
        style={{
          display: "flex", flexDirection: "column", height: "100%",
          background: c.paper, border: `1px solid ${c.line}`, borderRadius: 22,
          padding: "26px 24px", textDecoration: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 700, color: c.inkSoft }}>
            <Calendar size={12} strokeWidth={2.5} aria-hidden /> {sermon.date}
          </span>
          {sermon.theme && (
            <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", color: c.green, background: c.cream2, borderRadius: 999, padding: "4px 10px" }}>
              {sermon.theme}
            </span>
          )}
        </div>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 21, letterSpacing: "-.4px", color: c.ink, margin: "0 0 8px", lineHeight: 1.18 }}>
          {sermon.topic}
        </h3>
        <div style={{ fontSize: 13, fontWeight: 700, color: c.green, marginBottom: 12 }}>{sermon.texts}</div>
        <p style={{ fontSize: 14.5, color: c.inkSoft, lineHeight: 1.68, margin: "0 0 20px", flex: 1 }}>
          {sermon.excerpt}
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${c.line}`, paddingTop: 14, marginTop: "auto", gap: 10 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 700, color: c.inkSoft }}>
            {sermon.minister}
            {(sermon.podcastUrl || sermon.applePodcastUrl) && <Headphones size={13} strokeWidth={2.3} color={c.green} aria-label="Listen online" />}
          </span>
          <span style={{ fontSize: 13, fontWeight: 700, color: c.green, flexShrink: 0 }}>Read →</span>
        </div>
      </Link>
    </Reveal>
  );
}

export default function IlorinBlogPage() {
  const sermons = ILORIN_SERMONS_BY_DATE_DESC;

  return (
    <main style={{ background: c.paper, color: c.ink, fontFamily: "var(--font-body)" }}>
      <IlorinHeader variant="blog" />

      {/* Hero */}
      <section style={{ background: `linear-gradient(170deg, ${c.deep} 0%, #094a2d 100%)`, color: "#fff", padding: "clamp(56px,8vw,96px) clamp(20px,5vw,64px) clamp(60px,8vw,96px)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: -150, right: -120, width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle, rgba(43,182,115,.26), transparent 62%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 860, margin: "0 auto", position: "relative", zIndex: 2, textAlign: "center" }}>
          <Reveal immediate>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: c.gold, background: "rgba(232,163,61,.1)", border: "1px solid rgba(232,163,61,.3)", padding: "7px 16px", borderRadius: 999 }}>
              <BookOpen size={14} strokeWidth={2.5} aria-hidden /> Sunday Messages
            </span>
          </Reveal>
          <Reveal immediate delay={80}>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(36px,6vw,64px)", letterSpacing: "-.03em", lineHeight: 1.02, margin: "22px 0 0" }}>
              Messages from Ilorin.
            </h1>
          </Reveal>
          <Reveal immediate delay={140}>
            <p style={{ fontSize: "clamp(15px,1.7vw,18px)", color: c.onDeep, lineHeight: 1.7, maxWidth: 620, margin: "20px auto 0" }}>
              The topic, scripture, and notes from each Sunday message at C.A.C Salvation Centre, Ilorin — ministered by Pastor R.T. Owoseni and guest ministers. {sermons.length} messages and counting.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section style={{ background: c.cream, padding: "clamp(48px,6vw,80px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 22 }}>
            {sermons.map((sermon, i) => (
              <SermonCard key={sermon.slug} sermon={sermon} delay={(i % 9) * 55} />
            ))}
          </div>
        </div>
      </section>

      <IlorinFooter variant="blog" />
    </main>
  );
}
