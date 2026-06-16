import { Nav } from "@/components/navigation/Nav";
import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

const platforms = [
  { name: "YouTube", icon: "▶", desc: "Live every Sunday & replays", href: "https://www.youtube.com/channel/UCoogH4HuVXSn4okSpRlsDQA" },
  { name: "Facebook", icon: "f", desc: "Stream + community discussion", href: "https://www.facebook.com/CacSalvationCenterBaltimore" },
  { name: "Zoom", icon: "📹", desc: "Join Sunday service live via Zoom", href: "https://us02web.zoom.us/j/84635388414?pwd=UlNHRUU4VWdXNjdEMmhsaHZDUXYzdz09" },
  { name: "Spotify", icon: "♪", desc: "Hope for Today — weekly podcast", href: "https://open.spotify.com/show/0wFUgSZq4CuVuM0M9gRFUw" },
  { name: "Apple Podcasts", icon: "🎧", desc: "Subscribe for auto-downloads", href: "https://podcasts.apple.com/search?term=CAC+Salvation+Center" },
];

const schedule = [
  { day: "Sunday", name: "Main Service", time: "10:30 AM ET", type: "Onsite & Online" },
  { day: "Wednesday", name: "Bible Study", time: "7:00 PM ET", type: "Online Only" },
  { day: "Friday", name: "Wakati Itusile", time: "7:00 PM ET", type: "Online Only" },
  { day: "Daily", name: "Morning Prayer Line", time: "5:00 AM ET", type: "(857) 216-6700 · Code: 531312" },
];

export const metadata = {
  title: "Watch Online — CAC Salvation Center",
  description: "Join CAC Salvation Center live or on demand — every Sunday 10:30 AM ET. Stream on YouTube, Facebook, and podcast.",
};

export default function OnlinePage() {
  return (
    <main style={{ background: "#0C0E13", minHeight: "100vh" }}>
      <Nav dark />

      {/* Hero */}
      <section style={{ padding: "140px clamp(20px,5vw,64px) 80px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(214,40,40,.25),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <Reveal>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--gold)", background: "rgba(232,163,61,.12)", border: "1px solid rgba(232,163,61,.25)", padding: "6px 16px", borderRadius: 999 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--red)", animation: "pulse-red 1.8s infinite", display: "inline-block" }} />
              Live Sundays · 10:30 AM ET
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(48px,7vw,100px)", letterSpacing: "-2px", color: "#fff", margin: "20px 0", lineHeight: .92 }}>
              Worship from<br />
              <span style={{ background: "linear-gradient(100deg,var(--flame),var(--red),var(--gold))", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>Anywhere.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p style={{ fontSize: "clamp(16px,1.8vw,20px)", color: "rgba(255,255,255,.55)", lineHeight: 1.65, maxWidth: 560, margin: "0 auto" }}>
              Every service streamed live. Every sermon available on demand. The full experience — wherever you are.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Player */}
      <section style={{ padding: "0 clamp(20px,5vw,64px) 80px" }}>
        <Reveal>
          <div style={{ maxWidth: 900, margin: "0 auto", borderRadius: 28, overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,.5)" }}>
            <div style={{ height: "clamp(260px,40vw,480px)", background: "linear-gradient(150deg,#1a0f08,#2d1510,#0C0E13)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 40% 50%,rgba(214,40,40,.18),transparent 60%)" }} />
              <div style={{ position: "absolute", top: 20, left: 20, display: "flex", alignItems: "center", gap: 8, background: "var(--red)", color: "#fff", fontWeight: 800, fontSize: 12, padding: "6px 14px", borderRadius: 999, zIndex: 2 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff", animation: "pulse-red 1.8s infinite", display: "inline-block" }} />
                LIVE EVERY SUNDAY
              </div>
              <a href="https://www.youtube.com/channel/UCoogH4HuVXSn4okSpRlsDQA" target="_blank" rel="noopener noreferrer" style={{ width: 88, height: 88, borderRadius: "50%", background: "rgba(255,255,255,.15)", border: "2px solid rgba(255,255,255,.3)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(8px)", position: "relative", zIndex: 2 }} aria-label="Watch latest service on YouTube">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#fff" aria-hidden><path d="M8 5v14l11-7z" /></svg>
              </a>
              <div style={{ position: "absolute", bottom: 20, left: 20, color: "rgba(255,255,255,.45)", fontSize: 14, fontWeight: 600, zIndex: 2 }}>
                Latest Service · Pastor Dr. H.O. Ilufoye
              </div>
            </div>
            <div style={{ background: "#161B22", padding: "20px 28px", display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,.4)", fontWeight: 600 }}>Watch on:</span>
              {platforms.map(p => (
                <a key={p.name} href={p.href} style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,.7)", textDecoration: "none", padding: "6px 14px", borderRadius: 999, border: "1px solid rgba(255,255,255,.12)" }}>
                  {p.name}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Platforms */}
      <section style={{ padding: "60px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,52px)", letterSpacing: "-1px", color: "#fff", margin: 0 }}>All the platforms.</h2>
          </Reveal>
          <div className="r2" style={{ gap: 16 }}>
            {platforms.map((p, i) => (
              <Reveal key={p.name} delay={i * 60}>
                <a href={p.href} style={{ display: "block", background: "rgba(255,255,255,.05)", borderRadius: 18, padding: "24px 22px", border: "1px solid rgba(255,255,255,.08)", textDecoration: "none" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "#fff", marginBottom: 6 }}>{p.name}</div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,.45)" }}>{p.desc}</div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section style={{ padding: "60px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,52px)", letterSpacing: "-1px", color: "#fff", margin: 0 }}>Service schedule.</h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {schedule.map((s, i) => (
              <Reveal key={s.name} delay={i * 60}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", background: "rgba(255,255,255,.05)", borderRadius: 16, border: "1px solid rgba(255,255,255,.08)", flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 4 }}>{s.day}</div>
                    <div style={{ fontWeight: 700, fontSize: 17, color: "#fff" }}>{s.name}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "#fff" }}>{s.time}</div>
                    <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)", marginTop: 2 }}>{s.type}</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Salvation CTA */}
      <section style={{ padding: "80px clamp(20px,5vw,64px)", background: "linear-gradient(135deg,#D62828,#9E1B1B)" }}>
        <Reveal style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px,4.5vw,60px)", letterSpacing: "-1.2px", color: "#fff", margin: "0 0 16px", lineHeight: .96 }}>
            Ready to give your life to Christ?
          </h2>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,.75)", margin: "0 0 36px" }}>
            We&apos;d love to walk that journey with you. Reach out — no pressure, just genuine welcome.
          </p>
          <Link href="/visit" style={{ display: "inline-block", background: "#fff", color: "var(--red)", fontWeight: 800, fontSize: 16, padding: "17px 36px", borderRadius: 999, textDecoration: "none" }}>
            Connect With Us →
          </Link>
        </Reveal>
      </section>

      {/* Dark footer */}
      <footer style={{ background: "#0C0E13", borderTop: "1px solid rgba(255,255,255,.07)", padding: "40px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: 20 }}>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,.3)" }}>
            © 2026 Christ Apostolic Church Salvation Center · Baltimore DCC
          </div>
          <div style={{ display: "flex", gap: 18, fontSize: 13 }}>
            {[["YouTube", "https://www.youtube.com/channel/UCoogH4HuVXSn4okSpRlsDQA"], ["Facebook", "https://www.facebook.com/CacSalvationCenterBaltimore"], ["Instagram", "https://www.instagram.com/salvationcenterbaltimoreusa/"]].map(([label, href]) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,.4)", textDecoration: "none", fontWeight: 600 }}>{label}</a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
