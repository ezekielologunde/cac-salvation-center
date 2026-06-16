import { Reveal } from "@/components/ui/Reveal";

export function Impact() {
  return (
    <section style={{
      position: "relative", overflow: "hidden",
      background: "linear-gradient(135deg,#D62828 0%,#9E1B1B 50%,#6B1010 100%)",
      padding: "80px clamp(20px,5vw,64px)",
    }}>
      {/* Decorative texture */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 50%,rgba(241,95,34,.3),transparent 60%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: -40, right: -40, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,.04)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
        <Reveal>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,.65)" }}>
            Prayer Line
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(34px,4.5vw,58px)", letterSpacing: "-1.5px", color: "#fff", margin: "14px 0 20px", lineHeight: .96 }}>
            Start Every Day in Prayer
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,.75)", lineHeight: 1.7, maxWidth: 420 }}>
            Join our daily morning prayer line. Five minutes or fifty — come as you are, wherever you are.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <div style={{ background: "rgba(255,255,255,.1)", borderRadius: 24, padding: "36px 32px", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,.15)" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(255,255,255,.6)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 10 }}>Dial in daily at</div>
            <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,3.8vw,46px)", color: "#fff", letterSpacing: "-.5px", marginBottom: 6 }}>
              5:00 AM ET
            </div>
            <a href="tel:+18572166700" style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(22px,3vw,36px)", color: "#FFD9A8", textDecoration: "none", marginBottom: 18 }}>
              (857) 216-6700
            </a>
            <div style={{ fontSize: 14, color: "rgba(255,255,255,.65)", marginBottom: 24 }}>
              Access Code: <strong style={{ color: "#fff" }}>531312</strong>
            </div>
            <a href="tel:+18572166700" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "#fff", color: "var(--red)",
              fontWeight: 800, fontSize: 15,
              padding: "14px 28px", borderRadius: 999,
              textDecoration: "none",
            }}>
              📞 Dial In Now
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
