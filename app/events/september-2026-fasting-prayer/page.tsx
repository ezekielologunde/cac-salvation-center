import { Nav } from "@/components/navigation/Nav";
import { FooterExperience } from "@/components/sections/FooterExperience";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import Link from "next/link";
import { Users, Heart, Video, Phone, Clock, ArrowLeft, Sparkles } from "lucide-react";
import { CalendarPlus, Download } from "lucide-react";
import { specialEvents, googleCalUrl, icsDataUri, isEventPast } from "@/lib/events";
import { SITE, SITE_URL, breadcrumbJsonLd } from "@/lib/site";

export const revalidate = 3600;

export const metadata = {
  title: "September 2026 Prayer & Fasting — CAC Salvation Center",
  description:
    "CACNA Men Association, Latunde Region's biannual fasting and prayer program — “Breaking Every Limitations” (Isaiah 45:2–3). Friday & Saturday, September 4–5, 2026, on Zoom.",
  alternates: { canonical: "/events/september-2026-fasting-prayer" },
};

const ev = specialEvents.find((e) => e.id === "september-2026-fasting-prayer")!;
const ZOOM_URL = "https://zoom.us/j/84308624690";
const ZOOM_ID = "843 0862 4690";
const ZOOM_PASSCODE = "866356";

const schedule = [
  { day: "Friday, September 4", time: "7:00 – 10:00 PM ET", label: "1st Session" },
  { day: "Saturday, September 5", time: "7:00 – 10:00 AM ET", label: "2nd Session" },
  { day: "Saturday, September 5", time: "7:00 – 10:00 PM ET", label: "3rd Session" },
];

const speakers = [
  { name: "Pastor S.O. Oladele", role: "President, CAC Nigeria and Overseas" },
  { name: "Pastor (Dr.) Tunde Asokeji", role: "Chaplain, CAC All Saints Chapel, Ibadan · Guest Speaker" },
  { name: "Pastor (Dr.) T.A.O. Agbeja", role: "Regional Superintendent, CACNA Latunde Region" },
  { name: "Pastor (Dr.) A. Dada", role: "Suprt. CAC Bethel Canada Zone · CACMA Latunde Region Chairman" },
  { name: "Evang. (Mrs.) Bolanle Mustapha", role: "CACNA Goodwomen Association Latunde Region Women Leader · Guest Speaker" },
  { name: "Pastor Z.O. Oloba", role: "Suprt. CAC VOC Atlanta Zone · CACNA Latunde Region Revivalist · Guest Speaker" },
];

export default function September2026FastingPrayerPage() {
  const isPast = isEventPast(ev);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: ev.title,
    description: ev.desc,
    startDate: "2026-09-04T19:00:00-04:00",
    endDate: "2026-09-05T22:00:00-04:00",
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode",
    image: `${SITE_URL}/images/september-2026-fasting-prayer.jpg`,
    url: `${SITE_URL}/events/september-2026-fasting-prayer`,
    location: { "@type": "VirtualLocation", url: ZOOM_URL },
    organizer: { "@type": "Church", name: SITE.name, url: SITE_URL },
    performer: { "@type": "Organization", name: "CACNA Men Association, Latunde Region" },
    offers: { "@type": "Offer", url: ZOOM_URL, price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock", validFrom: "2026-01-01T00:00:00-05:00" },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Events", path: "/events" }, { name: ev.navLabel ?? ev.title, path: "/events/september-2026-fasting-prayer" }])).replace(/</g, "\\u003c") }} />
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
            <Link href="/events" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: "rgba(255,247,239,.6)", textDecoration: "none", marginBottom: 32 }}>
              <ArrowLeft size={14} strokeWidth={2.5} aria-hidden /> All events
            </Link>
          </Reveal>

          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 80, height: 80, borderRadius: 20, background: "linear-gradient(150deg,#E8A33D,#F15F22)", boxShadow: "0 20px 44px rgba(232,163,61,.4)" }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 13, color: "#fff", letterSpacing: 1 }}>SEP</span>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 48, color: "#fff", lineHeight: 1 }}>04–05</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--gold)", letterSpacing: 1 }}>2026</div>
              </div>
            </div>
          </Reveal>

          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(44px,7vw,100px)", letterSpacing: "-0.035em", color: "#fff", margin: "0 0 24px", lineHeight: 0.9, textWrap: "balance" }}>
            <RevealText immediate>September 2026</RevealText>
            <br />
            <RevealText immediate delay={0.12} style={{ background: "linear-gradient(100deg,#F15F22,#D62828,#E8A33D)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Prayer &amp; Fasting
            </RevealText>
          </h1>

          <Reveal delay={160}>
            <div style={{ display: "inline-flex", alignItems: "flex-start", gap: 12, marginBottom: 22, padding: "14px 20px", borderRadius: 16, background: "rgba(232,163,61,.1)", border: "1px solid rgba(232,163,61,.3)", maxWidth: 620 }}>
              <Sparkles size={20} strokeWidth={2} color="var(--gold)" aria-hidden style={{ flexShrink: 0, marginTop: 3 }} />
              <div>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 4 }}>Theme · Isaiah 45:2–3</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(18px,2.6vw,26px)", color: "#fff", lineHeight: 1.15, letterSpacing: "-.3px" }}>Breaking Every Limitations</div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <p style={{ fontSize: "clamp(16px,2vw,20px)", color: "rgba(255,247,239,.72)", lineHeight: 1.7, maxWidth: 620, margin: "0 0 44px", textWrap: "pretty" }}>
              A biannual fasting and prayer program of CACNA Men Association, Latunde Region — two days of prayer, worship, and the Word, live on Zoom from wherever you are.
            </p>
          </Reveal>

          {!isPast && (
          <Reveal delay={280}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              <a href={ZOOM_URL} target="_blank" rel="noopener noreferrer" className="btn-sheen press" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--gold)", color: "var(--ink)", fontWeight: 800, fontSize: 16, padding: "16px 30px", borderRadius: 999, textDecoration: "none", boxShadow: "0 16px 40px rgba(232,163,61,.4)" }}>
                Join on Zoom →
              </a>
              <a href={googleCalUrl(ev)} target="_blank" rel="noopener noreferrer" className="press" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(255,247,239,.09)", color: "var(--cream)", fontWeight: 700, fontSize: 15, padding: "16px 28px", borderRadius: 999, textDecoration: "none", border: "1px solid rgba(255,247,239,.2)" }}>
                <CalendarPlus size={17} strokeWidth={2} aria-hidden /> Add to Calendar
              </a>
              <a href={icsDataUri(ev)} download="september-2026-fasting-prayer.ics" className="press" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(255,247,239,.06)", color: "rgba(255,247,239,.7)", fontWeight: 700, fontSize: 14, padding: "16px 22px", borderRadius: 999, textDecoration: "none", border: "1px solid rgba(255,247,239,.14)" }}>
                <Download size={16} strokeWidth={2} aria-hidden /> Apple / Outlook
              </a>
            </div>
          </Reveal>
          )}
        </div>
      </section>

      {/* About */}
      <section style={{ background: "var(--cream)", padding: "clamp(56px,7vw,90px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,440px),1fr))", gap: "clamp(36px,5vw,64px)", alignItems: "center" }}>
          <Reveal>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)", marginBottom: 16 }}>Twice a year, the whole region</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px,4.5vw,54px)", letterSpacing: "-.8px", color: "var(--ink)", margin: "0 0 24px", lineHeight: 1.02 }}>
                Fasting, prayer,<br />and the Word.
              </h2>
              <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.78, margin: "0 0 20px" }}>
                CACNA Men Association, Latunde Region presents its biannual fasting and prayer program — a gathering of the whole men&apos;s fellowship across the region, seeking God together under the theme &ldquo;Breaking Every Limitations&rdquo; (Isaiah 45:2–3).
              </p>
              <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.78, margin: 0 }}>
                CAC Salvation Center&apos;s Baltimore DCC family is invited to join in from home — the entire program runs live on Zoom across three sessions, Friday evening through Saturday night.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: Users, label: "The whole CACNA Latunde family", desc: "Men, women, and guests from across the region joining in prayer together." },
                { icon: Clock, label: "Three sessions, two days", desc: "Friday night, plus Saturday morning and night — see the full schedule below." },
                { icon: Heart, label: "Anointed ministers of God", desc: "Guest speakers and the CACNA Latunde Region leadership bring the Word." },
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

      {/* Schedule */}
      <section style={{ background: "var(--ink)", padding: "clamp(56px,7vw,90px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 16, textAlign: "center" }}>
              <Clock size={16} strokeWidth={2.5} style={{ verticalAlign: "middle", marginRight: 8 }} aria-hidden />
              Schedule (USA Eastern Time)
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,50px)", letterSpacing: "-.8px", color: "var(--cream)", margin: "0 0 36px", textAlign: "center" }}>
              Three sessions, two days.
            </h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {schedule.map((s, i) => (
              <Reveal key={i} delay={i * 90}>
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 12, background: "rgba(255,247,239,.06)", border: "1px solid rgba(255,247,239,.14)", borderRadius: 16, padding: "18px 24px" }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 4 }}>{s.label}</div>
                    <div style={{ fontWeight: 700, fontSize: 17, color: "var(--cream)" }}>{s.day}</div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "rgba(255,247,239,.75)" }}>{s.time}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Speakers */}
      <section style={{ background: "var(--cream-2)", padding: "clamp(56px,7vw,90px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)", marginBottom: 16, textAlign: "center" }}>Ministers</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,50px)", letterSpacing: "-.8px", color: "var(--ink)", margin: "0 0 36px", textAlign: "center" }}>
              Featuring anointed ministers of God.
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))", gap: 16 }}>
            {speakers.map((sp, i) => (
              <Reveal key={sp.name} delay={i * 60}>
                <div style={{ background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 18, padding: "20px 22px", boxShadow: "0 8px 20px rgba(27,19,14,.06)", height: "100%" }}>
                  <div style={{ fontWeight: 800, fontSize: 16, color: "var(--ink)", marginBottom: 6 }}>{sp.name}</div>
                  <div style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.55 }}>{sp.role}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Flyer & promo video */}
      <section style={{ background: "var(--cream)", padding: "clamp(56px,7vw,90px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Reveal>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)", marginBottom: 16, textAlign: "center" }}>
              <Video size={16} strokeWidth={2.5} style={{ verticalAlign: "middle", marginRight: 8 }} aria-hidden />
              Watch &amp; share
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,50px)", letterSpacing: "-.8px", color: "var(--ink)", margin: "0 0 36px", textAlign: "center" }}>
              The official announcement.
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,340px),1fr))", gap: "clamp(20px,3vw,32px)" }}>
            <Reveal>
              <video
                controls
                preload="none"
                poster="/images/september-2026-fasting-prayer.jpg"
                style={{ width: "100%", borderRadius: 20, boxShadow: "0 14px 34px rgba(27,19,14,.14)", display: "block", background: "#000" }}
              >
                <source src="/videos/september-2026-fasting-prayer.mp4" type="video/mp4" />
              </video>
            </Reveal>
            <Reveal delay={100}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/september-2026-fasting-prayer.jpg"
                alt="September 2026 Prayer &amp; Fasting flyer — CACNA Men Association, Latunde Region"
                style={{ width: "100%", borderRadius: 20, boxShadow: "0 14px 34px rgba(27,19,14,.14)", display: "block" }}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Join & contact */}
      <section style={{ background: "var(--cream-2)", padding: "clamp(56px,7vw,90px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)", marginBottom: 16 }}>
              How to join
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(26px,3.5vw,40px)", letterSpacing: "-.6px", color: "var(--ink)", margin: "0 0 28px" }}>
              Join us on Zoom.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div style={{ display: "inline-flex", flexDirection: "column", gap: 8, background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 18, padding: "22px 32px", marginBottom: 36, boxShadow: "0 8px 20px rgba(27,19,14,.06)" }}>
              <div style={{ fontSize: 15, color: "var(--ink-soft)" }}>Meeting ID: <strong style={{ color: "var(--ink)" }}>{ZOOM_ID}</strong></div>
              <div style={{ fontSize: 15, color: "var(--ink-soft)" }}>Passcode: <strong style={{ color: "var(--ink)" }}>{ZOOM_PASSCODE}</strong></div>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--flame)", marginBottom: 16 }}>
              <Phone size={16} strokeWidth={2.5} style={{ verticalAlign: "middle", marginRight: 8 }} aria-hidden />
              For more information
            </div>
            <p style={{ fontSize: 15.5, color: "var(--ink-soft)", lineHeight: 1.8, margin: 0 }}>
              Engr. Ajibola Osinubi (Secretary) · 617-922-3033<br />
              Pastor Femi Ogunleye (PRO) · 410-707-5471
            </p>
          </Reveal>
        </div>
      </section>

      <FooterExperience />
    </main>
  );
}
