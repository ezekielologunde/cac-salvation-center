import { Nav } from "@/components/navigation/Nav";
import { FooterExperience } from "@/components/sections/FooterExperience";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import Link from "next/link";
import { CalendarPlus, Download } from "lucide-react";
import { specialEvents, weeklyServices, monthlyServices, googleCalUrl, icsDataUri, type ChurchEvent } from "@/lib/events";

export const metadata = {
  title: "Events — CAC Salvation Center",
  description:
    "Upcoming events and weekly services at CAC Salvation Center, Randallstown MD. Add any service or event straight to your Google, Apple, or Outlook calendar.",
  alternates: { canonical: "/events" },
};

function AddToCalendar({ ev, dark = false }: { ev: ChurchEvent; dark?: boolean }) {
  const ghost = dark
    ? { color: "var(--cream)", border: "1.5px solid rgba(255,247,239,.28)", background: "rgba(255,247,239,.06)" }
    : { color: "var(--ink)", border: "1.5px solid var(--line)", background: "var(--paper)" };
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
      <a
        href={googleCalUrl(ev)} target="_blank" rel="noopener noreferrer"
        className="btn-sheen press" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "var(--red)", color: "#fff", fontWeight: 700, fontSize: 14, padding: "11px 18px", borderRadius: 999, textDecoration: "none", boxShadow: "0 8px 20px rgba(214,40,40,.3)" }}
      >
        <CalendarPlus size={16} strokeWidth={2} aria-hidden /> Google Calendar
      </a>
      <a
        href={icsDataUri(ev)} download={`${ev.id}.ics`}
        className="press" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 700, fontSize: 14, padding: "11px 18px", borderRadius: 999, textDecoration: "none", ...ghost }}
      >
        <Download size={16} strokeWidth={2} aria-hidden /> Apple / Outlook
      </a>
    </div>
  );
}

export default function EventsPage() {
  return (
    <main>
      <Nav heroDark />

      {/* Hero */}
      <section style={{ background: "var(--ink)", padding: "150px clamp(20px,5vw,64px) 90px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -100, right: -80, width: 620, height: 460, background: "radial-gradient(circle,rgba(232,163,61,.22),transparent 65%)", pointerEvents: "none", animation: "gradient-drift 16s ease-in-out infinite" }} />
        <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <Reveal from="scale">
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--gold)" }}>Events</span>
          </Reveal>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(44px,6.5vw,92px)", letterSpacing: "-0.03em", color: "#fff", margin: "16px 0", lineHeight: 0.95, textWrap: "balance" }}>
            <RevealText immediate>Mark your</RevealText>
            <br />
            <RevealText immediate delay={0.15} style={{ background: "linear-gradient(100deg,#F15F22,#D62828,#E8A33D)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              calendar.
            </RevealText>
          </h1>
          <Reveal delay={360}>
            <p style={{ fontSize: "clamp(16px,1.8vw,20px)", color: "rgba(255,247,239,.72)", lineHeight: 1.7, maxWidth: 540, margin: "0 auto", textWrap: "pretty" }}>
              Save our services and special gatherings straight to your phone — one tap for Google, Apple, or Outlook.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Special events */}
      <section style={{ background: "var(--cream-2)", padding: "clamp(56px,7vw,90px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 40 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,52px)", letterSpacing: "-1px", color: "var(--ink)", margin: 0 }}>Upcoming events</h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {specialEvents.map((ev, i) => (
              <Reveal key={ev.id} delay={i * 90}>
                <div className="card-lift" style={{ display: "flex", flexWrap: "wrap", gap: "clamp(20px,3vw,36px)", alignItems: "center", background: "var(--paper)", borderRadius: 24, padding: "clamp(22px,3vw,32px)", border: "1px solid var(--line)", boxShadow: "0 14px 34px rgba(27,19,14,.08)" }}>
                  <div style={{ flexShrink: 0, width: 104, height: 104, borderRadius: 20, background: "linear-gradient(150deg,var(--flame),var(--red))", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", lineHeight: 1, boxShadow: "0 14px 30px rgba(214,40,40,.3)" }}>
                    <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: "1.5px" }}>{ev.month}</span>
                    <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 44 }}>{ev.day}</span>
                  </div>
                  <div style={{ flex: "1 1 280px", minWidth: 0 }}>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(22px,2.6vw,30px)", letterSpacing: "-.5px", color: "var(--ink)", margin: "0 0 6px" }}>{ev.title}</h3>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "var(--red)", marginBottom: 10 }}>{ev.dateLabel} · {ev.timeLabel}</div>
                    <p style={{ fontSize: 15.5, color: "var(--ink-soft)", lineHeight: 1.65, margin: "0 0 18px" }}>{ev.desc}</p>
                    <AddToCalendar ev={ev} />
                    {ev.href && (
                      <Link href={ev.href} className="press" style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 16, fontSize: 14, fontWeight: 700, color: "var(--red)", textDecoration: "none" }}>
                        See full details &amp; ministers <span aria-hidden style={{ fontSize: 16 }}>→</span>
                      </Link>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly rhythm */}
      <section style={{ background: "var(--ink)", padding: "clamp(56px,7vw,90px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 40 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--gold)" }}>Every week</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,52px)", letterSpacing: "-1px", color: "var(--cream)", margin: "12px 0 0" }}>Our weekly rhythm</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18 }}>
            {weeklyServices.map((ev, i) => (
              <Reveal key={ev.id} delay={i * 80}>
                <div style={{ height: "100%", background: "rgba(255,247,239,.05)", border: "1px solid rgba(255,247,239,.1)", borderRadius: 22, padding: "28px 26px", display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 10 }}>{ev.dateLabel}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--cream)", letterSpacing: "-.4px", margin: "0 0 6px" }}>{ev.title}</h3>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "var(--gold)", marginBottom: 14 }}>{ev.timeLabel}</div>
                  <p style={{ fontSize: 14.5, color: "rgba(255,247,239,.62)", lineHeight: 1.65, margin: "0 0 20px", flex: 1 }}>{ev.desc}</p>
                  <AddToCalendar ev={ev} dark />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly gatherings */}
      <section style={{ background: "var(--cream-2)", padding: "clamp(56px,7vw,90px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 40 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)" }}>Each month</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,52px)", letterSpacing: "-1px", color: "var(--ink)", margin: "12px 0 0" }}>Monthly gatherings</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 18 }}>
            {monthlyServices.map((ev, i) => (
              <Reveal key={ev.id} delay={i * 80}>
                <div className="card-lift" style={{ height: "100%", background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 22, padding: "28px 26px", display: "flex", flexDirection: "column", boxShadow: "0 10px 28px rgba(27,19,14,.07)" }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--red)", marginBottom: 10 }}>{ev.dateLabel}</div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--ink)", letterSpacing: "-.4px", margin: "0 0 6px" }}>{ev.title}</h3>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "var(--flame)", marginBottom: 14 }}>{ev.timeLabel}</div>
                  <p style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.65, margin: "0 0 20px", flex: 1 }}>{ev.desc}</p>
                  <AddToCalendar ev={ev} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Watch online CTA */}
      <section style={{ background: "var(--ink)", padding: "clamp(44px,5vw,70px) clamp(20px,5vw,64px)" }}>
        <Reveal style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24 }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(22px,3vw,38px)", letterSpacing: "-.6px", color: "var(--cream)", margin: "0 0 8px" }}>Can&apos;t be there in person?</h2>
            <p style={{ fontSize: 15, color: "rgba(255,247,239,.6)", margin: 0 }}>Every service streams live — YouTube, Facebook, and Zoom. Never miss a message.</p>
          </div>
          <Link href="/online" className="press btn-sheen" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--red)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "15px 28px", borderRadius: 999, textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0, boxShadow: "0 10px 24px rgba(214,40,40,.35)" }}>
            Watch online →
          </Link>
        </Reveal>
      </section>

      <FooterExperience />
    </main>
  );
}
