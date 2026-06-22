import { Nav } from "@/components/navigation/Nav";
import { FooterExperience } from "@/components/sections/FooterExperience";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import Link from "next/link";
import { MapPin, CalendarDays, Car, Package, Clock, Users, Heart, ArrowLeft } from "lucide-react";
import { specialEvents, googleCalUrl, icsDataUri } from "@/lib/events";
import { CalendarPlus, Download } from "lucide-react";

export const metadata = {
  title: "CACNA 2026 Annual Convention — CAC Salvation Center",
  description:
    "Join CAC Salvation Center at the 2026 CACNA National Convention — July 13–18 at CAC Village, Blue Ridge Summit, PA. Six days of worship, the Word, and the whole CAC family in one place.",
  alternates: { canonical: "/events/cacna-2026" },
};

const ev = specialEvents.find((e) => e.id === "cacna-convention-2026")!;
const CACNA_REG = "https://cacnaconvention.org/2026-cacna-national-convention-registration-credit-debit-card/";

const sessions = [
  { day: "Monday 13", label: "Opening Night", desc: "The convention begins at 6:00 PM with an opening worship service. The whole assembly gathers for the first time." },
  { day: "Tue–Thu", label: "Morning & Evening Sessions", desc: "Two full sessions daily. Morning sessions typically 9:00 AM–1:00 PM; evening sessions 6:00 PM–10:00 PM." },
  { day: "Friday 17", label: "Youth Service", desc: "A dedicated evening service for young people — worship, ministry, and space for the next generation to encounter God." },
  { day: "Saturday 18", label: "Closing Night", desc: "The convention closes with a final worship service and communion. The family departs refreshed and rooted." },
];

const packList = [
  "Bible with writing margins — messages are rich and worth noting",
  "Journal — spiritual highlights from the village stay with you",
  "Layers for all conditions (warm mornings, hot afternoons, cool evenings)",
  "Comfortable walking shoes — the village grounds are spread out",
  "Modest dress for services (the culture of the CAC family applies)",
  "Your registration confirmation and ID for check-in",
];

const logistics = [
  { icon: MapPin, label: "Location", detail: "CAC Village, Blue Ridge Summit, PA 17214" },
  { icon: Car, label: "Driving from Randallstown", detail: "Approx. 2 hours via I-70 W · Carpooling will be coordinated from the church" },
  { icon: CalendarDays, label: "Dates", detail: "Monday July 13 – Saturday July 18, 2026" },
  { icon: Clock, label: "Check-in", detail: "July 13 from 2:00 PM · Opening service at 6:00 PM" },
];

export default function CACNA2026Page() {
  return (
    <main>
      <Nav heroDark />

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
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 13, color: "#fff", letterSpacing: 1 }}>JUL</span>
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 48, color: "#fff", lineHeight: 1 }}>13–18</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--gold)", letterSpacing: 1 }}>2026</div>
              </div>
            </div>
          </Reveal>

          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(44px,7vw,100px)", letterSpacing: "-0.035em", color: "#fff", margin: "0 0 24px", lineHeight: 0.9, textWrap: "balance" }}>
            <RevealText immediate>CACNA 2026</RevealText>
            <br />
            <RevealText immediate delay={0.12} style={{ background: "linear-gradient(100deg,#F15F22,#D62828,#E8A33D)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              National Convention
            </RevealText>
          </h1>

          <Reveal delay={200}>
            <p style={{ fontSize: "clamp(16px,2vw,20px)", color: "rgba(255,247,239,.72)", lineHeight: 1.7, maxWidth: 620, margin: "0 0 44px", textWrap: "pretty" }}>
              Six days of worship, the Word, and the whole CAC family in one place. CAC Village, Blue Ridge Summit, PA — July 13–18, 2026. This is the gathering you do not want to miss.
            </p>
          </Reveal>

          <Reveal delay={280}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              <a href={CACNA_REG} target="_blank" rel="noopener noreferrer" className="btn-sheen press" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--gold)", color: "var(--ink)", fontWeight: 800, fontSize: 16, padding: "16px 30px", borderRadius: 999, textDecoration: "none", boxShadow: "0 16px 40px rgba(232,163,61,.4)" }}>
                Register Now →
              </a>
              <a href={googleCalUrl(ev)} target="_blank" rel="noopener noreferrer" className="press" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(255,247,239,.09)", color: "var(--cream)", fontWeight: 700, fontSize: 15, padding: "16px 28px", borderRadius: 999, textDecoration: "none", border: "1px solid rgba(255,247,239,.2)" }}>
                <CalendarPlus size={17} strokeWidth={2} aria-hidden /> Add to Calendar
              </a>
              <a href={icsDataUri(ev)} download="cacna-2026.ics" className="press" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "rgba(255,247,239,.06)", color: "rgba(255,247,239,.7)", fontWeight: 700, fontSize: 14, padding: "16px 22px", borderRadius: 999, textDecoration: "none", border: "1px solid rgba(255,247,239,.14)" }}>
                <Download size={16} strokeWidth={2} aria-hidden /> Apple / Outlook
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* What is CACNA */}
      <section style={{ background: "var(--cream)", padding: "clamp(56px,7vw,90px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,440px),1fr))", gap: "clamp(36px,5vw,64px)", alignItems: "center" }}>
          <Reveal>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)", marginBottom: 16 }}>About the convention</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px,4.5vw,54px)", letterSpacing: "-.8px", color: "var(--ink)", margin: "0 0 24px", lineHeight: 1.02 }}>
                The whole family.<br />One place.
              </h2>
              <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.78, margin: "0 0 20px" }}>
                The Christ Apostolic Church North America National Convention brings together the entire CAC family across the United States and Canada for one week at CAC Village — a dedicated conference and retreat center in the mountains of southern Pennsylvania.
              </p>
              <p style={{ fontSize: 16, color: "var(--ink-soft)", lineHeight: 1.78, margin: 0 }}>
                Unlike most conferences, the convention is residential. You eat, sleep, pray, and worship at the village — which means every conversation is a ministry conversation, every meal is fellowship, and every late-night prayer session is available because no one is commuting. It changes people.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: Users, label: "The whole CAC family", desc: "Pastors, deacons, workers, youth, children — everyone from every assembly across North America." },
                { icon: Heart, label: "Six days of Spirit", desc: "Morning and evening sessions of prayer, worship, and the Word. Outdoor prayer walks. Late-night tarrying." },
                { icon: MapPin, label: "CAC Village", desc: "A purpose-built retreat campus in the mountains. Accommodation, dining, and sanctuary — all on site." },
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

      {/* Session overview */}
      <section style={{ background: "var(--ink)", padding: "clamp(56px,7vw,90px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 44 }}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 12 }}>Schedule overview</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,50px)", letterSpacing: "-.8px", color: "var(--cream)", margin: 0 }}>Six days in the village.</h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            {sessions.map((s, i) => (
              <Reveal key={i} delay={i * 70}>
                <div style={{ display: "flex", gap: "clamp(16px,3vw,32px)", alignItems: "flex-start", background: "rgba(255,247,239,.05)", border: "1px solid rgba(255,247,239,.1)", borderRadius: 20, padding: "clamp(20px,3vw,28px)" }}>
                  <div style={{ flexShrink: 0, minWidth: 88, textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15, color: "var(--gold)", lineHeight: 1.2 }}>{s.day}</div>
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 18, color: "var(--cream)", marginBottom: 6 }}>{s.label}</div>
                    <div style={{ fontSize: 14.5, color: "rgba(255,247,239,.62)", lineHeight: 1.68 }}>{s.desc}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <p style={{ fontSize: 14, color: "rgba(255,247,239,.45)", marginTop: 22, lineHeight: 1.6 }}>
              Schedule is subject to change. Full session details will be released by CACNA closer to the date. Follow <strong style={{ color: "rgba(255,247,239,.7)" }}>@cacnaconvention</strong> for live updates.
            </p>
          </Reveal>
        </div>
      </section>

      {/* What to pack + Logistics */}
      <section style={{ background: "var(--cream-2)", padding: "clamp(56px,7vw,90px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,420px),1fr))", gap: "clamp(36px,5vw,60px)" }}>

          {/* Pack list */}
          <Reveal>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)", marginBottom: 16 }}>Before you pack</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(26px,3.5vw,40px)", letterSpacing: "-.6px", color: "var(--ink)", margin: "0 0 24px" }}>
                <Package size={28} strokeWidth={2} style={{ verticalAlign: "middle", marginRight: 10, color: "var(--flame)" }} aria-hidden />
                What to bring
              </h2>
              <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {packList.map((item, i) => (
                  <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.6 }}>
                    <span style={{ flexShrink: 0, marginTop: 4, width: 8, height: 8, borderRadius: "50%", background: "var(--red)", display: "inline-block" }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* Logistics */}
          <Reveal delay={120}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)", marginBottom: 16 }}>Getting there</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(26px,3.5vw,40px)", letterSpacing: "-.6px", color: "var(--ink)", margin: "0 0 24px" }}>Logistics</h2>
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
              <p style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 20, lineHeight: 1.6 }}>
                Carpooling from Randallstown will be organised by the church. Speak to any elder or contact the office to join a car.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Registration CTA */}
      <section style={{ background: "var(--ink)", padding: "clamp(60px,8vw,100px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>Secure your spot</div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(34px,5.5vw,72px)", letterSpacing: "-1.5px", color: "#fff", margin: "0 0 22px", lineHeight: 0.95 }}>
              Register before beds fill.
            </h2>
            <p style={{ fontSize: "clamp(15px,1.8vw,18px)", color: "rgba(255,247,239,.68)", lineHeight: 1.72, marginBottom: 40, textWrap: "pretty" }}>
              Village accommodation is allocated first-come. Online registration is open now. Spots for the Salvation Center family will not last.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "center" }}>
              <a href={CACNA_REG} target="_blank" rel="noopener noreferrer" className="btn-sheen press" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "var(--gold)", color: "var(--ink)", fontWeight: 800, fontSize: 17, padding: "18px 36px", borderRadius: 999, textDecoration: "none", boxShadow: "0 20px 50px rgba(232,163,61,.35)" }}>
                Register on CACNA.org →
              </a>
              <Link href="/giving" className="press" style={{ display: "inline-flex", alignItems: "center", gap: 10, background: "rgba(255,247,239,.08)", color: "var(--cream)", fontWeight: 700, fontSize: 15, padding: "18px 30px", borderRadius: 999, textDecoration: "none", border: "1px solid rgba(255,247,239,.18)" }}>
                Support the trip
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <FooterExperience />
    </main>
  );
}
