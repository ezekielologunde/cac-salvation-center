"use client";
import { useState } from "react";
import { Nav } from "@/components/navigation/Nav";
import { FooterExperience } from "@/components/sections/FooterExperience";
import { Reveal } from "@/components/ui/Reveal";
import { IconBadge } from "@/components/ui/IconBadge";
import { Banknote, Phone } from "lucide-react";

const amounts = [25, 50, 100, 250, 500];
const funds = ["Tithes & Offerings", "Missions", "Building Fund"];
const ZELLE = "(443) 675-8889";

export default function GivingPage() {
  const [amount, setAmount] = useState<number | null>(100);
  const [custom, setCustom] = useState("");
  const [fund, setFund] = useState("Tithes & Offerings");
  const displayAmount = custom ? Number(custom) : amount;

  return (
    <main>
      <Nav />

      {/* Hero */}
      <section style={{ background: "var(--cream)", padding: "140px clamp(20px,5vw,64px) 56px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, left: -80, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,#F15F22,#D62828 70%)", opacity: 0.1, filter: "blur(6px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <Reveal>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)" }}>Give</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(46px,6.5vw,90px)", letterSpacing: "-0.03em", color: "var(--ink)", margin: "16px 0", lineHeight: 0.92 }}>
              Honor God<br />
              <span style={{ background: "linear-gradient(100deg,#F15F22,#D62828)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>with your first.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p style={{ fontSize: "clamp(16px,1.8vw,19px)", color: "var(--ink-soft)", lineHeight: 1.65, maxWidth: 540, margin: "0 auto" }}>
              Your generosity fuels ministry, sustains our community, and extends the Gospel to those who need it most.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PRIMARY — Zelle (most used, no fees) */}
      <section style={{ background: "var(--cream-2)", padding: "clamp(40px,5vw,72px) clamp(20px,5vw,64px)" }}>
        <Reveal>
          <div style={{ position: "relative", overflow: "hidden", maxWidth: 720, margin: "0 auto", background: "linear-gradient(135deg,var(--red-deep),var(--red))", borderRadius: 28, padding: "clamp(36px,5vw,56px)", boxShadow: "0 30px 70px rgba(214,40,40,.3)", textAlign: "center" }}>
            <div style={{ position: "absolute", inset: "-15%", background: "radial-gradient(circle at 70% 30%,rgba(241,95,34,.35),transparent 60%)", pointerEvents: "none", animation: "gradient-drift 14s ease-in-out infinite" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <span style={{ display: "inline-block", fontSize: 11, fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--red-deep)", background: "#fff", padding: "5px 14px", borderRadius: 999, marginBottom: 18 }}>Most used · No fees</span>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", letterSpacing: "-1px", color: "#fff", margin: "0 0 8px" }}>Give with Zelle</h2>
              <p style={{ fontSize: 16, color: "rgba(255,255,255,.82)", margin: "0 0 26px" }}>The simplest way to give — 100% reaches the ministry.</p>
              <div style={{ background: "rgba(255,255,255,.12)", border: "1px solid rgba(255,255,255,.2)", borderRadius: 20, padding: "26px 24px", backdropFilter: "blur(8px)" }}>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(255,255,255,.7)", marginBottom: 8 }}>Send to</div>
                <a href={`tel:${ZELLE.replace(/[^0-9]/g, "")}`} style={{ display: "block", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px,5vw,52px)", letterSpacing: "-.5px", color: "#FFD9A8", textDecoration: "none" }}>{ZELLE}</a>
              </div>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,.85)", lineHeight: 1.65, margin: "22px auto 0", maxWidth: 460 }}>
                Open your bank&apos;s Zelle, send to the number above, and add your <strong style={{ color: "#fff" }}>name + fund</strong> (Tithes, Missions, or Building) in the memo.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* SECONDARY — give online by card (Tithe.ly) */}
      <section style={{ background: "var(--cream)", padding: "clamp(40px,5vw,72px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 28 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)" }}>Prefer your card?</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(26px,3.2vw,40px)", letterSpacing: "-1px", color: "var(--ink)", margin: "10px 0 0" }}>Give online securely</h2>
          </Reveal>
          <Reveal delay={80}>
            <div style={{ background: "var(--paper)", borderRadius: 28, padding: "clamp(28px,4vw,40px)", boxShadow: "0 24px 60px rgba(27,19,14,.1)", border: "1px solid var(--line)" }}>
              <div style={{ marginBottom: 26 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-soft)", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: 12 }}>Fund</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                  {funds.map(f => (
                    <button key={f} onClick={() => setFund(f)} className="press" style={{ padding: "10px 18px", borderRadius: 999, fontWeight: 700, fontSize: 14, fontFamily: "var(--font-body)", border: fund === f ? "none" : "1.5px solid var(--line)", background: fund === f ? "var(--red)" : "transparent", color: fund === f ? "#fff" : "var(--ink-soft)", cursor: "pointer" }}>{f}</button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 26 }}>
                <label style={{ fontSize: 13, fontWeight: 700, color: "var(--ink-soft)", letterSpacing: "1px", textTransform: "uppercase", display: "block", marginBottom: 12 }}>Amount</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 14 }}>
                  {amounts.map(a => (
                    <button key={a} onClick={() => { setAmount(a); setCustom(""); }} className="press" style={{ padding: "10px 20px", borderRadius: 999, fontWeight: 700, fontSize: 15, fontFamily: "var(--font-body)", border: (amount === a && !custom) ? "none" : "1.5px solid var(--line)", background: (amount === a && !custom) ? "var(--red)" : "transparent", color: (amount === a && !custom) ? "#fff" : "var(--ink)", cursor: "pointer" }}>${a}</button>
                  ))}
                  <input type="number" min="1" placeholder="Other" value={custom} onChange={e => { setCustom(e.target.value); setAmount(null); }} className="field-input" style={{ width: 110, border: "1.5px solid var(--line)", borderRadius: 999, padding: "10px 18px", fontSize: 15, fontFamily: "inherit", outline: "none", color: "var(--ink)", background: "var(--cream)" }} />
                </div>
              </div>
              <a href="https://give.tithe.ly/?formId=e825a9a7-4c8a-4ca3-9ca0-35fa0928767f" target="_blank" rel="noopener noreferrer" className="btn-sheen press-lg" style={{ display: "block", width: "100%", padding: "18px", borderRadius: 999, background: "var(--ink)", color: "var(--cream)", fontWeight: 800, fontSize: 16, textDecoration: "none", textAlign: "center", boxSizing: "border-box" }}>
                {displayAmount ? `Give $${displayAmount} via Tithe.ly →` : "Give via Tithe.ly →"}
              </a>
              <p style={{ fontSize: 12.5, color: "var(--ink-soft)", textAlign: "center", marginTop: 14 }}>Secure · Tax-deductible · No account required</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* More ways */}
      <section style={{ background: "var(--cream-2)", padding: "clamp(40px,5vw,72px) clamp(20px,5vw,64px) clamp(64px,8vw,100px)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(24px,3vw,40px)", letterSpacing: "-1px", color: "var(--ink)", margin: 0 }}>More ways to give</h2>
          </Reveal>
          <div className="r2" style={{ gap: 18 }}>
            {[
              { icon: Banknote, title: "In person", desc: "Cash or check (payable to CAC Salvation Center) during any Sunday service." },
              { icon: Phone, title: "By phone", desc: "Call the church office at +1 443-272-6794 to set up a one-time or recurring gift." },
            ].map((w, i) => (
              <Reveal key={w.title} delay={i * 80}>
                <div style={{ background: "var(--paper)", borderRadius: 20, padding: "28px 24px", border: "1px solid var(--line)", boxShadow: "0 8px 22px rgba(27,19,14,.05)", height: "100%" }}>
                  <IconBadge icon={w.icon} style={{ marginBottom: 16 }} />
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
