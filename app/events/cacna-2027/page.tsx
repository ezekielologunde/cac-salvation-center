import { Nav } from "@/components/navigation/Nav";
import { FooterExperience } from "@/components/sections/FooterExperience";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import Link from "next/link";
import Image from "next/image";
import { MapPin, CalendarDays, Users, Heart, ArrowLeft, Sparkles, Ticket } from "lucide-react";
import { specialEvents, isEventPast } from "@/lib/events";
import { SITE, SITE_URL, CACNA_URL, CACNA_2027_URL, CACNA_2027_REGISTER_URL, breadcrumbJsonLd } from "@/lib/site";

export const revalidate = 3600;

export const metadata = {
  title: "CACNA 2027 Annual Convention — CAC Salvation Center",
  description:
    "The 2027 CACNA National Convention — July 12–17, 2027 at CAC Village, Blue Ridge Summit, PA. Theme: “Lessons from Israel’s History.” Full programme and fees are on cacna.org.",
  alternates: { canonical: "/events/cacna-2027" },
};

const ev = specialEvents.find((e) => e.id === "cacna-convention-2027")!;

const THEME = "Lessons from Israel’s History";

// Only facts confirmed by CACNA (cacna.org/events/cacna-2027). Fees and the
// daily programme are deliberately not repeated here: they live on cacna.org.
const logistics = [
  { icon: MapPin, label: "Location", detail: "CAC Village, 14051 Stahley Rd, Blue Ridge Summit, PA 17214" },
  { icon: CalendarDays, label: "Dates", detail: "July 12–17, 2027" },
  { icon: Ticket, label: "Programme & fees", detail: "Full programme and fees are published on cacna.org." },
];

export default function CACNA2027Page() {
  const isPast = isEventPast(ev);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: ev.title,
    description: ev.desc,
    startDate: "2027-07-12",
    endDate: "2027-07-17",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: `${SITE_URL}/images/congregation.jpg`,
    url: `${SITE_URL}/events/cacna-2027`,
    location: { "@type": "Place", name: "CAC Village", address: { "@type": "PostalAddress", streetAddress: "14051 Stahley Rd", addressLocality: "Blue Ridge Summit", addressRegion: "PA", postalCode: "17214", addressCountry: "US" } },
    organizer: { "@type": "Church", name: SITE.name, url: SITE_URL },
    performer: { "@type": "Organization", name: "Christ Apostolic Church North America" },
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Events", path: "/events" }, { name: ev.navLabel ?? ev.title, path: "/events/cacna-2027" }])).replace(/</g, "\\u003c") }} />
      <Nav heroDark />
      {isPast && (
        <div role="status" style={{ background: '#2c2825', padding: '13px clamp(20px,5vw,64px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px 20px', fontSize: 14, fontWeight: 600, color: 'rgba(255,247,239,.7)' }}>
          <span>This event has passed — page kept as an archive.</span>
          <Link href="/events" style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 13, textDecoration: 'none', whiteSpace: 'nowrap' }}>See upcoming events →</Link>
        </div>
      )}

      {/* Hero */}
      <section style={{ background: "var(--ink)", padding: "150px clamp(20px,5vw,64px) clamp(80px,10vw,120px)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: -140, right: -120, width: 760, height: 600, background: "radial-gradient(circle,rgba(232,163,61,.25),transparent 65%)", pointerEvents: "none", animation: "gradient-drift 18s ease-in-out infinite" }} />
        <div aria-hidden style={{ position: "absolute", bottom: -80, left: -80, width: 500, height: 400, background: "radial-gradient(circle,rgba(214,40,40,.15),transparent 65%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal>
            <Link href="/events" className="tap" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: "rgba(255,247,239,.6)", textDecoration: "none", marginBottom: 12 }}>
              <ArrowLeft size={14} strokeWidth={2.5} aria-hidden /> All events
            </Link>
          </Reveal>

          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 80, height: 80, borderRadius: 20, background: "linear-gradient(150deg,#E8A33D,#F15F22)", boxShadow: "0 20px 44px rgba(232,163,61,.4)" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 13, color: "#fff", letterSpacing: 1 }}>JUL</span>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 48, color: "#fff", lineHeight: 1 }}>12–17</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--gold)", letterSpacing: 1 }}>2027</div>
              </div>
            </div>
          </Reveal>

          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(44px,7vw,100px)", letterSpacing: "-0.035em", color: "#fff", margin: "0 0 24px", lineHeight: 0.9, textWrap: "balance" }}>
            <RevealText immediate>CACNA 2027</RevealText>
            <br />
            <RevealText immediate delay={0.12} style={{ background: "linear-gradient(100deg,#F15F22,#D62828,#E8A33D)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              National Convention
            </RevealText>
          </h1>

          <Reveal delay={160}>
            <div style={{ display: "inline-flex", alignItems: "flex-start", gap: 12, marginBottom: 22, padding: "14px 20px", borderRadius: 16, background: "rgba(232,163,61,.1)", border: "1px solid rgba(232,163,61,.3)", maxWidth: 620 }}>
              <Sparkles size={20} strokeWidth={2} color="var(--gold)" aria-hidden style={{ flexShrink: 0, marginTop: 3 }} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 4 }}>Convention Theme</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(18px,2.6vw,26px)", color: "#fff", lineHeight: 1.15, letterSpacing: "-.3px" }}>&ldquo;{THEME}&rdquo;</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p style={{ fontSize: "clamp(16px,2vw,20px)", color: "rgba(255,247,239,.72)", lineHeight: 1.7, maxWidth: 620, margin: "0 0 44px", textWrap: "pretty" }}>
              Six days of worship, teaching, and family at CAC Village, Blue Ridge Summit, PA — July 12–17, 2027. The full programme and fees are on cacna.org.
            </p>
          </Reveal>

          {!isPast && (
          <Reveal delay={280}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              <a href={CACNA_2027_REGISTER_URL} target="_blank" rel="noopener noreferrer" className="btn-sheen press" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--gold)", color: "var(--ink)", fontWeight: 800, fontSize: 16, padding: "16px 30px", borderRadius: 999, textDecoration: "none", boxShadow: "0 16px 40px rgba(232,163,61,.4)" }}>
                Register on CACNA.org →
              </a>
              <a href={CACNA_2027_URL} target="_blank" rel="noopener noreferrer" className="press" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(255,247,239,.09)", color: "var(--cream)", fontWeight: 700, fontSize: 15, padding: "16px 28px", borderRadius: 999, textDecoration: "none", border: "1px solid rgba(255,247,239,.2)" }}>
                Programme &amp; fees →
              </a>
            </div>
          </Reveal>
          )}
        </div>
      </section>

      {/* Official flyer */}
      <section style={{ width: "100%", background: "var(--paper)", padding: "clamp(48px,6vw,80px) clamp(20px,5vw,64px) 0" }}>
        <Reveal>
          <div style={{ width: "100%", maxWidth: 1040, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,360px),1fr))", gap: "clamp(24px,4vw,40px)", alignItems: "start" }}>
            {[
              {
                src: "/images/cacna-2027-flyer-leadership.jpg",
                alt: "CACNA 2027 Annual Convention flyer with the convention leadership. Theme: Lessons from Israel's History. July 12 to 17, 2027 at CAC Village, 14051 Stahley Road, Blue Ridge Summit, PA 17214.",
                caption: "The 2027 convention and its leadership.",
              },
              {
                src: "/images/cacna-2027-flyer-programme.jpg",
                alt: "CACNA 2027 Annual Convention programme and registration flyer. Adults, young adults and children registration rates, the daily programme from Monday July 12 to Saturday July 17, 2027, and contacts for further information.",
                caption: "Programme, registration rates and contacts.",
              },
            ].map((f, i) => (
              <figure key={f.src} style={{ margin: 0 }}>
                <a href={CACNA_2027_URL} target="_blank" rel="noopener noreferrer" style={{ display: "block", borderRadius: 20, overflow: "hidden", boxShadow: "0 24px 60px rgba(27,19,14,.22)" }}>
                  <Image
                    src={f.src}
                    alt={f.alt}
                    width={1122}
                    height={1402}
                    sizes="(max-width: 780px) 92vw, 500px"
                    style={{ width: "100%", height: "auto", display: "block" }}
                    priority={i === 0}
                  />
                </a>
                <figcaption style={{ marginTop: 14, textAlign: "center", fontSize: 13, color: "var(--ink-soft)" }}>{f.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </section>

      {/* About */}
      <section style={{ background: "var(--cream)", padding: "clamp(56px,7vw,90px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,440px),1fr))", gap: "clamp(36px,5vw,64px)", alignItems: "center" }}>
          <Reveal>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)", marginBottom: 16 }}>About the convention</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px,4.5vw,54px)", letterSpacing: "-.8px", color: "var(--ink)", margin: "0 0 24px", lineHeight: 1.02 }}>
                The whole family.<br />One place.
              </h2>
              <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.78, margin: "0 0 20px" }}>
                The{" "}
                <a href={CACNA_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--red)", fontWeight: 600, textDecoration: "none" }}>Christ Apostolic Church North America</a>{" "}
                Annual Convention gathers the CAC family at CAC Village in Blue Ridge Summit, Pennsylvania. The 2027 theme is &ldquo;{THEME}.&rdquo;
              </p>
              <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.78, margin: 0 }}>
                We will share more here as CACNA confirms it. Until then, the full programme, fees and registration are all on{" "}
                <a href={CACNA_2027_URL} target="_blank" rel="noopener noreferrer" style={{ color: "var(--red)", fontWeight: 600, textDecoration: "none" }}>cacna.org</a>.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: Users, label: "The whole CAC family", desc: "Believers from assemblies across CACNA, together in one place." },
                { icon: Heart, label: "Six days", desc: "July 12–17, 2027 — worship, teaching, and fellowship around the theme." },
                { icon: MapPin, label: "CAC Village", desc: "14051 Stahley Rd, Blue Ridge Summit, PA 17214." },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 18, padding: "20px 22px", boxShadow: "0 8px 20px rgba(27,19,14,.06)" }}>
                  <div style={{ flexShrink: 0, display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,var(--flame),var(--red))", boxShadow: "0 8px 16px rgba(214,40,40,.28)" }}>
                    <item.icon size={20} color="#fff" strokeWidth={2} aria-hidden />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 16, color: "var(--ink)", marginBottom: 4 }}>{item.label}</div>
                    <div style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.6 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Logistics */}
      <section style={{ background: "var(--cream-2)", padding: "clamp(56px,7vw,90px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)", marginBottom: 16 }}>The essentials</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(26px,3.5vw,40px)", letterSpacing: "-.6px", color: "var(--ink)", margin: "0 0 24px" }}>Where &amp; when</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {logistics.map((l, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start", background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 16, padding: "18px 20px", boxShadow: "0 6px 16px rgba(27,19,14,.06)" }}>
                  <div style={{ flexShrink: 0, display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg,var(--flame),var(--red))" }}>
                    <l.icon size={18} color="#fff" strokeWidth={2} aria-hidden />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 14, color: "var(--ink)", marginBottom: 4 }}>{l.label}</div>
                    <div style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.55 }}>{l.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Registration CTA */}
      {!isPast && (
      <section style={{ background: "var(--ink)", padding: "clamp(60px,8vw,100px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>Register</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(34px,5.5vw,72px)", letterSpacing: "-1.5px", color: "#fff", margin: "0 0 22px", lineHeight: 0.95 }}>
              Register with CACNA.
            </h2>
            <p style={{ fontSize: "clamp(15px,1.8vw,18px)", color: "rgba(255,247,239,.68)", lineHeight: 1.72, marginBottom: 40, textWrap: "pretty" }}>
              Registration, the full programme and fees are handled on cacna.org.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
              <a href={CACNA_2027_REGISTER_URL} target="_blank" rel="noopener noreferrer" className="btn-sheen press" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--gold)", color: "var(--ink)", fontWeight: 800, fontSize: 17, padding: "18px 36px", borderRadius: 999, textDecoration: "none", boxShadow: "0 20px 50px rgba(232,163,61,.35)" }}>
                Register on CACNA.org →
              </a>
              <a href={CACNA_2027_URL} target="_blank" rel="noopener noreferrer" className="press" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,247,239,.08)", color: "var(--cream)", fontWeight: 700, fontSize: 15, padding: "18px 30px", borderRadius: 999, textDecoration: "none", border: "1px solid rgba(255,247,239,.18)" }}>
                Programme &amp; fees
              </a>
            </div>
          </Reveal>
        </div>
      </section>
      )}

      <FooterExperience />
    </main>
  );
}
