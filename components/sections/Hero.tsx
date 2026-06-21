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
      overflow: "hidden",
      background: "#0d0a08",
      backgroundImage: "url(https://img.youtube.com/vi/xIZBd9UYIDw/maxresdefault.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      {/* YouTube background video — muted autoplay */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <iframe
          src="https://www.youtube.com/embed/xIZBd9UYIDw?autoplay=1&mute=1&loop=1&playlist=xIZBd9UYIDw,RX1NjOYtDxo&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1"
          title=""
          allow="autoplay; encrypted-media"
          aria-hidden="true"
          tabIndex={-1}
          style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%,-50%)",
            width: "177.78vh",
            height: "56.25vw",
            minWidth: "100%",
            minHeight: "100%",
            border: "none",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Dark shadow overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(135deg,rgba(0,0,0,.78) 0%,rgba(0,0,0,.55) 55%,rgba(0,0,0,.38) 100%)",
      }} />
      {/* Bottom fade to next section */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 140, zIndex: 1,
        background: "linear-gradient(to bottom,transparent,rgba(0,0,0,.6))",
      }} />

      {/* Content */}
      <div style={{
        position: "relative", zIndex: 2,
        maxWidth: 840, margin: "0 auto", width: "100%",
        textAlign: "center",
      }}>
        <Reveal style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.2)",
          padding: "8px 16px 8px 10px", borderRadius: 999,
          fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.85)",
          backdropFilter: "blur(8px)",
        }}>
          <span style={{ background: "var(--red)", color: "#fff", fontSize: 11, fontWeight: 800, padding: "3px 9px", borderRadius: 999, letterSpacing: ".5px" }}>SUNDAYS</span>
          Onsite &amp; Online · 10:30 AM ET
        </Reveal>

        <Reveal delay={80}>
          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "clamp(52px,7.4vw,112px)",
            lineHeight: .92, letterSpacing: "-2.5px",
            margin: "22px 0 0", color: "#fff",
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
            color: "rgba(255,255,255,.72)", maxWidth: 480, margin: "26px auto 0",
          }}>
            Real worship, real community — preaching the whole Gospel in a clear
            and undiluted manner. It&apos;s more than a greeting.{" "}
            <strong style={{ color: "#fff" }}>It&apos;s our lifestyle.</strong>
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 34, justifyContent: "center" }}>
            <Link href="/online" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "var(--red)", color: "#fff",
              fontWeight: 700, fontSize: 16,
              padding: "17px 30px", borderRadius: 999,
              textDecoration: "none",
              boxShadow: "0 14px 30px rgba(214,40,40,.4)",
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" aria-hidden><path d="M8 5v14l11-7z" /></svg>
              Join Us Online
            </Link>
            <Link href="/visit" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,.12)", color: "#fff",
              fontWeight: 700, fontSize: 16,
              padding: "17px 28px", borderRadius: 999,
              textDecoration: "none",
              border: "1.5px solid rgba(255,255,255,.35)",
              backdropFilter: "blur(8px)",
            }}>
              Plan a Visit
            </Link>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 14,
            marginTop: 38,
            background: "rgba(255,255,255,.08)",
            border: "1px solid rgba(255,255,255,.14)",
            color: "#fff",
            padding: "14px 22px", borderRadius: 18,
            backdropFilter: "blur(12px)",
          }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#ff5252", animation: "pulse-red 1.8s infinite", display: "inline-block", flexShrink: 0 }} />
            <span style={{ fontSize: 13, fontWeight: 600, opacity: .75 }}>Next service begins in</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, letterSpacing: "-.4px", color: "#FFD9A8" }}>{countdown}</span>
          </div>
        </Reveal>
      </div>
    </header>
  );
}
