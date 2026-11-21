import { Nav } from "@/components/navigation/Nav";
import { FooterExperience } from "@/components/sections/FooterExperience";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import Link from "next/link";
import { MapPin, Flame, Waves, Landmark, Eye, ArrowLeft, Mail } from "lucide-react";
import { specialEvents } from "@/lib/events";
import { SITE, SITE_URL, CACNA_URL, breadcrumbJsonLd } from "@/lib/site";

export const revalidate = 3600;

export const metadata = {
  title: "Holy Land Pilgrimage — Postponed to May 2027 — CAC Salvation Center",
  description:
    "The CACNA Latunde Region Pilgrimage to Israel & Egypt, originally planned for November 2–12, 2026, has been postponed to sometime in May 2027. Exact dates and the final price are still to be confirmed.",
  alternates: { canonical: "/events/pilgrimage-2026" },
};

const ev = specialEvents.find((e) => e.id === "holy-land-pilgrimage-2026")!;

// Kept from the original plan; CACNA has not republished an itinerary for the
// new dates, so these are labelled as the original plan on the page.
const highlights = [
  { icon: Flame, label: "Burning Bush, Ten Commandments & Mount Horeb", desc: "Walk in Moses's footsteps in Egypt." },
  { icon: MapPin, label: "Bethlehem, Nazareth & Jerusalem", desc: "Follow Jesus's steps through the towns where He was born, raised, and taught." },
  { icon: Waves, label: "The Dead Sea", desc: "Float in the mineral-rich waters of the lowest point on earth." },
  { icon: Landmark, label: "The Garden Tomb", desc: "Celebrate holy communion at the place of the resurrection." },
  { icon: Eye, label: "Jericho & Mount of Temptation", desc: "Stand in ancient Jericho and see the wilderness mountain of Jesus's temptation." },
];

export default function PilgrimagePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "Holy Land Pilgrimage (CACNA Latunde Region)",
    description: ev.desc,
    // schema.org: a postponed event keeps its original dates until new ones are set.
    startDate: "2026-11-02",
    endDate: "2026-11-12",
    eventStatus: "https://schema.org/EventPostponed",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: `${SITE_URL}/images/congregation.jpg`,
    url: `${SITE_URL}/events/pilgrimage-2026`,
    location: { "@type": "Place", name: "Israel & Egypt", address: { "@type": "PostalAddress", addressCountry: "IL" } },
    organizer: { "@type": "Church", name: SITE.name, url: SITE_URL },
    performer: { "@type": "Organization", name: "Christ Apostolic Church North America" },
  };
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Events", path: "/events" }, { name: ev.navLabel ?? ev.title, path: "/events/pilgrimage-2026" }])).replace(/</g, "\\u003c") }} />
      <Nav heroDark />

      <div role="status" style={{ background: "#2c2825", padding: "13px clamp(20px,5vw,64px)", fontSize: 14, fontWeight: 600, color: "rgba(255,247,239,.8)" }}>
        Postponed to May 2027 — exact dates and the final price are still to be confirmed.
      </div>

      {/* Hero */}
      <section style={{ background: "var(--ink)", padding: "150px clamp(20px,5vw,64px) clamp(80px,10vw,120px)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: -100, right: -80, width: 640, height: 520, background: "radial-gradient(circle,rgba(232,163,61,.3),transparent 65%)", pointerEvents: "none", animation: "gradient-drift 20s ease-in-out infinite" }} />
        <div style={{ maxWidth: 960, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal>
            <Link href="/events" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 700, color: "rgba(255,247,239,.6)", textDecoration: "none", marginBottom: 32 }}>
              <ArrowLeft size={14} strokeWidth={2.5} aria-hidden /> All events
            </Link>
          </Reveal>

          <Reveal>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 14 }}>
              <a href={CACNA_URL} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: "3px" }}>Christ Apostolic Church North America</a> · Latunde Region Pilgrimage
            </div>
          </Reveal>

          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(40px,6.5vw,90px)", letterSpacing: "-0.035em", color: "#fff", margin: "0 0 24px", lineHeight: 0.92, textWrap: "balance" }}>
            <RevealText immediate>Holy Land</RevealText>
            <br />
            <RevealText immediate delay={0.12} style={{ background: "linear-gradient(100deg,#E8A33D,#F15F22,#D62828)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Pilgrimage
            </RevealText>
          </h1>

          <Reveal delay={200}>
            <p style={{ fontSize: "clamp(16px,1.9vw,20px)", color: "rgba(255,247,239,.78)", lineHeight: 1.72, maxWidth: 640, margin: "0 0 20px", textWrap: "pretty" }}>
              The CACNA Latunde Region Pilgrimage to Israel &amp; Egypt, originally planned for November 2–12, 2026, has been postponed to sometime in May 2027.
            </p>
            <p style={{ fontSize: "clamp(15px,1.8vw,18px)", color: "rgba(255,247,239,.62)", lineHeight: 1.72, maxWidth: 640, margin: "0 0 36px", textWrap: "pretty" }}>
              Exact dates and the final price are still to be confirmed.
            </p>
          </Reveal>

          <Reveal delay={280}>
            <a href="mailto:cacnapilgrimage@gmail.com?subject=Holy Land Pilgrimage — May 2027" className="btn-sheen press" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--gold)", color: "var(--ink)", fontWeight: 800, fontSize: 16, padding: "16px 30px", borderRadius: 999, textDecoration: "none", boxShadow: "0 16px 40px rgba(232,163,61,.4)" }}>
              <Mail size={17} strokeWidth={2} aria-hidden /> cacnapilgrimage@gmail.com
            </a>
            <p style={{ fontSize: 14, color: "rgba(255,247,239,.55)", margin: "16px 0 0" }}>Contact: cacnapilgrimage@gmail.com | @cacnapilgrimage</p>
          </Reveal>
        </div>
      </section>

      {/* Highlights of the original plan */}
      <section style={{ background: "var(--cream)", padding: "clamp(56px,7vw,90px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)", marginBottom: 12 }}>From the original plan</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(26px,3.6vw,44px)", letterSpacing: "-.8px", color: "var(--ink)", margin: "0 0 12px" }}>
              Sacred sites on the route.
            </h2>
            <p style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.7, maxWidth: 620, margin: 0 }}>
              These highlights come from the original 2026 plan. The itinerary, dates and price for May 2027 are still to be confirmed by CACNA.
            </p>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {highlights.map((h, i) => (
              <Reveal key={i} delay={i * 60}>
                <div style={{ display: "flex", gap: 18, alignItems: "flex-start", background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 18, padding: "18px 22px", boxShadow: "0 8px 20px rgba(27,19,14,.06)" }}>
                  <div style={{ flexShrink: 0, display: "grid", placeItems: "center", width: 46, height: 46, borderRadius: 12, background: "linear-gradient(135deg,#E8A33D,#B8860B)" }}>
                    <h.icon size={21} color="#fff" strokeWidth={1.9} aria-hidden />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 17, color: "var(--ink)", marginBottom: 4 }}>{h.label}</div>
                    <div style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.6 }}>{h.desc}</div>
                  </div>
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
