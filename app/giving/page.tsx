"use client";
import { useState } from "react";
import { Nav } from "@/components/navigation/Nav";
import { FooterExperience } from "@/components/sections/FooterExperience";
import { Reveal } from "@/components/ui/Reveal";

const amounts = [25, 50, 100, 250, 500];
const funds = ["Tithes & Offerings", "Missions", "Building Fund"];

export default function GivingPage() {
  const [amount, setAmount] = useState<number | null>(100);
  const [custom, setCustom] = useState("");
  const [fund, setFund] = useState("Tithes & Offerings");

  const displayAmount = custom ? Number(custom) : amount;

  return (
    <main>
      <Nav />

      {/* Hero */}
      <section style={{ background: "var(--cream)", padding: "140px clamp(20px,5vw,64px) 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, left: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,#F15F22,#D62828 70%)", opacity: .1, filter: "blur(6px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <Reveal>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)" }}>Give</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(46px,6.5vw,90px)", letterSpacing: "-2px", color: "var(--ink)", margin: "16px 0", lineHeight: .92 }}>
              Honor God<br />
              <span style={{ background: "linear-gradient(100deg,#F15F22,#D62828)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>with Your First.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p style={{ fontSize: "clamp(16px,1.8vw,19px)", color: "var(--ink-soft)", lineHeight: 1.65, maxWidth: 540, margin: "0 auto" }}>
              Your generosity fuels ministry, sustains our community, and extends the Gospel to those who need it most.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Give form */}
      <section style={{ background: "var(--cream-2)", padding: "80px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <Reveal>
            <div style={{ background: "var(--paper)", borderRadius: 28, padding: "44px 40px", boxShadow: "0 24px 60px rgba(27,19,14,.1)", border: "1px solid var(--line)" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, color: "var(--ink)", margin: "0 0 30px" }}>Make a Gift</h2>

              {/* Fund selection */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-soft)", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: 12 }}>Fund</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {funds.map(f => (
                    <button key={f} onClick={() => setFund(f)} style={{
                      padding: "10px 18px", borderRadius: 999, fontWeight: 700, fontSize: 14,
                      border: fund === f ? "none" : "1.5px solid var(--line)",
                      background: fund === f ? "var(--red)" : "transparent",
                      color: fund === f ? "#fff" : "var(--ink-soft)",
                      cursor: "pointer",
                    }}>
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount selection */}
              <div style={{ marginBottom: 28 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-soft)", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: 12 }}>Amount</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
                  {amounts.map(a => (
                    <button key={a} onClick={() => { setAmount(a); setCustom(""); }} style={{
                      padding: "10px 20px", borderRadius: 999, fontWeight: 700, fontSize: 15,
                      border: (amount === a && !custom) ? "none" : "1.5px solid var(--line)",
                      background: (amount === a && !custom) ? "var(--red)" : "transparent",
                      color: (amount === a && !custom) ? "#fff" : "var(--ink)",
                      cursor: "pointer",
                    }}>
                      ${a}
                    </button>
                  ))}
                  <button onClick={() => { setAmount(null); }} style={{
                    padding: "10px 20px", borderRadius: 999, fontWeight: 700, fontSize: 15,
                    border: (!amount || custom) ? "none" : "1.5px solid var(--line)",
                    background: (!amount || custom) ? "var(--red)" : "transparent",
                    color: (!amount || custom) ? "#fff" : "var(--ink)",
                    cursor: "pointer",
                  }}>
                    Other
                  </button>
                </div>
                {(!amount || custom !== undefined) && (
                  <input
                    type="number" min="1" placeholder="Enter amount"
                    value={custom} onChange={e => { setCustom(e.target.value); setAmount(null); }}
                    style={{ width: "100%", border: "1.5px solid var(--line)", borderRadius: 14, padding: "14px 18px", fontSize: 16, fontFamily: "inherit", outline: "none", color: "var(--ink)" }}
                  />
                )}
              </div>

              {/* CTA */}
              <button style={{
                width: "100%", padding: "18px", borderRadius: 999,
                background: "var(--red)", color: "#fff",
                fontWeight: 800, fontSize: 17, border: "none", cursor: "pointer",
                boxShadow: "0 14px 30px rgba(214,40,40,.34)",
              }}>
                {displayAmount ? `Give $${displayAmount} securely →` : "Give Securely →"}
              </button>
              <p style={{ fontSize: 13, color: "var(--ink-soft)", textAlign: "center", marginTop: 16 }}>
                Secure payment · Tax-deductible · No account required
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Ways to give */}
      <section style={{ background: "var(--cream)", padding: "80px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 52 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px,4vw,54px)", letterSpacing: "-1.2px", color: "var(--ink)", margin: 0 }}>Other Ways to Give</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }}>
            {[
              { icon: "🙏", title: "In person", desc: "During any Sunday service at the Salvation Center, Randallstown." },
              { icon: "🌍", title: "Missions & outreach", desc: "Carrying the Great Commission to our community and the nations." },
              { icon: "📞", title: "By phone", desc: "Call the church office at +1 443-272-6794 to give or set up recurring." },
            ].map((w, i) => (
              <Reveal key={w.title} delay={i * 80}>
                <div style={{ background: "var(--paper)", borderRadius: 20, padding: "28px 24px", border: "1px solid var(--line)", boxShadow: "0 8px 22px rgba(27,19,14,.05)" }}>
                  <span style={{ fontSize: 32, display: "block", marginBottom: 16 }}>{w.icon}</span>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--ink)", margin: "0 0 10px" }}>{w.title}</h3>
                  <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.65, margin: 0 }}>{w.desc}</p>
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
