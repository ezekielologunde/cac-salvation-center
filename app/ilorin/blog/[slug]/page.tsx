import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Calendar, BookOpen, Share2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { IlorinHeader, IlorinFooter, ilorinColors as c } from "@/components/ilorin/IlorinChrome";
import { ILORIN_SERMONS, ILORIN_SERMONS_BY_DATE_DESC, getIlorinSermon } from "@/lib/ilorinSermons";
import { SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  return ILORIN_SERMONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const sermon = getIlorinSermon(slug);
  if (!sermon) return { title: "Not Found" };
  return {
    title: `${sermon.topic} — Ilorin Messages`,
    description: sermon.excerpt,
    alternates: { canonical: `/ilorin/blog/${sermon.slug}` },
    openGraph: {
      title: sermon.topic,
      description: sermon.excerpt,
      url: `${SITE_URL}/ilorin/blog/${sermon.slug}`,
      type: "article",
      publishedTime: sermon.dateIso,
    },
  };
}

// A short, mostly-uppercase line in the original notes reads as a subheading
// ("BENEFITS OF BEING A SHEEP") rather than a sentence — render it as one.
function isHeading(text: string) {
  const letters = text.replace(/[^A-Za-z]/g, "");
  if (letters.length < 3 || text.length > 70) return false;
  return letters === letters.toUpperCase();
}

function titleCaseHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
}

export default async function IlorinSermonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const sermon = getIlorinSermon(slug);
  if (!sermon) notFound();

  const others = ILORIN_SERMONS_BY_DATE_DESC.filter((s) => s.slug !== slug).slice(0, 3);
  const shareUrl = `${SITE_URL}/ilorin/blog/${sermon.slug}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`${sermon.topic} — ${shareUrl}`)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: sermon.topic,
    description: sermon.excerpt,
    datePublished: sermon.dateIso,
    dateModified: sermon.dateIso,
    url: shareUrl,
    mainEntityOfPage: { "@type": "WebPage", "@id": shareUrl },
    author: { "@type": "Person", name: sermon.minister },
    publisher: {
      "@type": "Organization",
      name: "Christ Apostolic Church Salvation Centre, Ilorin",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.png` },
    },
  };

  return (
    <main style={{ background: c.paper, color: c.ink, fontFamily: "var(--font-body)" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <IlorinHeader />

      {/* Hero */}
      <section style={{ background: `linear-gradient(170deg, ${c.deep} 0%, #094a2d 100%)`, color: "#fff", padding: "clamp(48px,7vw,84px) clamp(20px,5vw,64px) clamp(56px,7vw,88px)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: -150, right: -120, width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle, rgba(43,182,115,.26), transparent 62%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 780, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal>
            <Link href="/ilorin/blog" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: c.onDeep, textDecoration: "none", marginBottom: 26 }}>
              <ArrowLeft size={14} strokeWidth={2.5} aria-hidden /> All messages
            </Link>
          </Reveal>
          {sermon.theme && (
            <Reveal delay={40}>
              <span style={{ display: "inline-block", fontSize: 11, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: c.gold, background: "rgba(232,163,61,.1)", border: "1px solid rgba(232,163,61,.3)", borderRadius: 999, padding: "6px 14px", marginBottom: 18 }}>
                {sermon.theme}
              </span>
            </Reveal>
          )}
          <Reveal delay={90}>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px,5vw,54px)", letterSpacing: "-.03em", lineHeight: 1.04, margin: "0 0 18px" }}>
              {sermon.topic}
            </h1>
          </Reveal>
          <Reveal delay={140}>
            <p style={{ fontSize: 16, fontWeight: 700, color: c.greenBright, margin: "0 0 22px" }}>{sermon.texts}</p>
          </Reveal>
          <Reveal delay={180}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20 }}>
              <span style={{ fontSize: 13.5, fontWeight: 700, color: "#fff" }}>{sermon.minister}</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, color: c.onDeep, fontWeight: 600 }}>
                <Calendar size={13} strokeWidth={2.5} aria-hidden /> {sermon.date}
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section style={{ background: c.cream, padding: "clamp(44px,6vw,76px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <Reveal>
            <article style={{ background: c.paper, border: `1px solid ${c.line}`, borderRadius: 24, padding: "clamp(28px,4vw,48px)" }}>
              {sermon.body.map((para, i) =>
                isHeading(para) ? (
                  <h3
                    key={i}
                    style={{
                      fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18,
                      letterSpacing: "-.2px", color: c.green,
                      margin: i === 0 ? "0 0 16px" : "30px 0 14px",
                    }}
                  >
                    {titleCaseHeading(para)}
                  </h3>
                ) : (
                  <p key={i} style={{ fontSize: 16.5, lineHeight: 1.8, color: c.ink, margin: "0 0 20px" }}>
                    {para}
                  </p>
                )
              )}

              <div style={{ marginTop: 8, paddingTop: 24, borderTop: `1px solid ${c.line}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                <span style={{ fontSize: 13, color: c.inkSoft }}>
                  Ministered by <strong style={{ color: c.ink }}>{sermon.minister}</strong> · {sermon.date}
                </span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "#25D366", color: "#fff", fontWeight: 700, fontSize: 13, padding: "9px 16px", borderRadius: 999, textDecoration: "none" }}
                >
                  <Share2 size={13} strokeWidth={2.5} aria-hidden /> Share
                </a>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      {/* More messages */}
      {others.length > 0 && (
        <section style={{ background: c.paper, padding: "clamp(40px,5vw,64px) clamp(20px,5vw,64px) clamp(56px,7vw,88px)" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <Reveal style={{ marginBottom: 28 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: c.green }}>
                <BookOpen size={13} strokeWidth={2.5} aria-hidden /> More messages
              </span>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,260px),1fr))", gap: 18 }}>
              {others.map((s, i) => (
                <Reveal key={s.slug} delay={i * 70}>
                  <Link href={`/ilorin/blog/${s.slug}`} className="card-lift" style={{ display: "block", height: "100%", background: c.cream, border: `1px solid ${c.line}`, borderRadius: 18, padding: "20px 22px", textDecoration: "none" }}>
                    <div style={{ fontSize: 11.5, fontWeight: 700, color: c.inkSoft, marginBottom: 8 }}>{s.date}</div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 16.5, color: c.ink, lineHeight: 1.25, marginBottom: 10 }}>{s.topic}</div>
                    <span style={{ fontSize: 12.5, fontWeight: 700, color: c.green }}>Read →</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <IlorinFooter />
    </main>
  );
}
