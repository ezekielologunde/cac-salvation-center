"use client";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { useCountdown } from "@/lib/useCountdown";

export function Hero() {
  const countdown = useCountdown();

  return (
    <header style={{
      position: "relative", minHeight: "100vh",
      display: "flex", alignItems: "center",
      padding: "140px clamp(20px,5vw,64px) 80px",
      overflow: "hidden", background: "var(--cream)",
    }}>
      {/* Floating blobs */}
      <div style={{
        position: "absolute", top: -80, right: -60,
        width: 460, height: 460, borderRadius: "50%",
        background: "radial-gradient(circle at 30% 30%,#FFD9A8,#F15F22 70%)",
        opacity: .18, filter: "blur(8px)",
        animation: "floaty 11s ease-in-out infinite", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: -120, left: -90,
        width: 380, height: 380, borderRadius: "50%",
        background: "radial-gradient(circle at 40% 40%,#FF8A8A,#D62828 70%)",
        opacity: .14, filter: "blur(6px)",
        animation: "floaty2 13s ease-in-out infinite", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "42%", left: "47%",
        width: 130, height: 130, borderRadius: "30% 70% 70% 30%/30% 30% 70% 70%",
        background: "var(--gold)", opacity: .12,
        animation: "floaty 9s ease-in-out infinite", pointerEvents: "none",
      }} />

      <div className="r-hero" style={{
        position: "relative", zIndex: 2,
        gap: "clamp(32px,4vw,56px)",
        maxWidth: 1320, margin: "0 auto", width: "100%",
      }}>
        {/* Left copy */}
        <div>
          <Reveal style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "var(--paper)", border: "1px solid var(--line)",
            padding: "8px 16px 8px 10px", borderRadius: 999,
            fontSize: 13, fontWeight: 600, color: "var(--ink-soft)",
            boxShadow: "0 6px 14px rgba(27,19,14,.05)",
          }}>
            <span style={{ background: "var(--red)", color: "#fff", fontSize: 11, fontWeight: 800, padding: "3px 9px", borderRadius: 999, letterSpacing: ".5px" }}>SUNDAYS</span>
            Onsite &amp; Online · 10:30 AM ET
          </Reveal>

          <Reveal delay={80}>
            <h1 style={{
              fontFamily: "var(--font-display)", fontWeight: 800,
              fontSize: "clamp(52px,7.4vw,112px)",
              lineHeight: .92, letterSpacing: "-2.5px",
              margin: "22px 0 0", color: "var(--ink)",
            }}>
              Welcome<br />
              <span style={{
                background: "linear-gradient(100deg,#F15F22,#D62828,#9E1B1B,#D62828)",
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text", backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "shimmer-text 5s linear infinite",
              }}>Home.</span>
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <p style={{
              fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.65,
              color: "var(--ink-soft)", maxWidth: 480, margin: "26px 0 0",
            }}>
              Real worship, real community — preaching the whole Gospel in a clear
              and undiluted manner. It&apos;s more than a greeting.{" "}
              <strong style={{ color: "var(--ink)" }}>It&apos;s our lifestyle.</strong>
            </p>
          </Reveal>

          <Reveal delay={240}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 34 }}>
              <Link href="/online" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "var(--red)", color: "#fff",
                fontWeight: 700, fontSize: 16,
                padding: "17px 30px", borderRadius: 999,
                textDecoration: "none",
                boxShadow: "0 14px 30px rgba(214,40,40,.34)",
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" aria-hidden><path d="M8 5v14l11-7z" /></svg>
                Join Us Online
              </Link>
              <Link href="/visit" style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "var(--paper)", color: "var(--ink)",
                fontWeight: 700, fontSize: 16,
                padding: "17px 28px", borderRadius: 999,
                textDecoration: "none", border: "1.5px solid var(--ink)",
              }}>
                Plan a Visit
              </Link>
            </div>
          </Reveal>

          <Reveal delay={300}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 14,
              marginTop: 38, background: "var(--ink)", color: "var(--cream)",
              padding: "14px 22px", borderRadius: 18,
              boxShadow: "0 16px 34px rgba(27,19,14,.22)",
            }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#ff5252", animation: "pulse-red 1.8s infinite", display: "inline-block", flexShrink: 0 }} />
              <span style={{ fontSize: 13, fontWeight: 600, opacity: .8 }}>Next service begins in</span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, letterSpacing: "-.4px", color: "#FFD9A8" }}>{countdown}</span>
            </div>
          </Reveal>
        </div>

        {/* Right image */}
        <Reveal delay={200} style={{ position: "relative" }}>
          {/* Spinning stamp */}
          <div className="hide-sm" style={{ position: "absolute", top: -18, right: -18, width: 120, height: 120, zIndex: 3, animation: "spin-slow 18s linear infinite" }}>
            <svg viewBox="0 0 100 100" width="120" height="120">
              <defs><path id="stamp-circ" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" /></defs>
              <circle cx="50" cy="50" r="40" fill="var(--ink)" />
              <text fontSize="10.5" fontWeight="700" letterSpacing="2.6" fill="var(--cream)" fontFamily="Plus Jakarta Sans, system-ui">
                <textPath href="#stamp-circ">WELCOME HOME · WELCOME HOME · </textPath>
              </text>
            </svg>
            <span style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 28, color: "var(--gold)", lineHeight: 1 }}>✦</span>
          </div>

          {/* Image placeholder */}
          <div style={{
            width: "100%", height: "clamp(360px,42vw,540px)", borderRadius: 28,
            background: "linear-gradient(150deg,var(--cream-2) 0%,#e8c9a8 100%)",
            boxShadow: "0 30px 60px rgba(27,19,14,.18)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ color: "var(--ink-soft)", fontSize: 14, fontWeight: 600 }}>Worship photo</span>
          </div>

          {/* Morning Prayer chip */}
          <div style={{
            position: "absolute", left: -22, bottom: 34,
            background: "var(--paper)", padding: "14px 18px",
            borderRadius: 18, boxShadow: "0 18px 40px rgba(27,19,14,.16)",
            display: "flex", alignItems: "center", gap: 14,
          }}>
            <span style={{ width: 44, height: 44, borderRadius: 12, background: "var(--cream-2)", display: "grid", placeItems: "center", fontSize: 22, flexShrink: 0 }}>🌅</span>
            <div style={{ lineHeight: 1.3 }}>
              <div style={{ fontWeight: 800, fontSize: 15, fontFamily: "var(--font-display)", color: "var(--ink)" }}>Morning Prayer Line</div>
              <div style={{ fontSize: 13, color: "var(--ink-soft)" }}>Daily · 5:00 AM ET</div>
            </div>
          </div>
        </Reveal>
      </div>
    </header>
  );
}
