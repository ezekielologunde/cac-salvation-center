"use client";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { Magnetic } from "@/components/ui/Magnetic";
import { useCountdown } from "@/lib/useCountdown";
import { haptic } from "@/lib/haptics";

const HERO_T = {
  en: { badge: "SUNDAYS", line1: "Welcome", line2: "Home." },
  yo: { badge: "ỌJỌ́ ÀÌKÚ", line1: "Káàbọ̀", line2: "sí Ilé." },
} as const;

export function Hero() {
  const countdown = useCountdown();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Defer the YouTube player until the browser is idle so it never blocks
  // initial load — the poster image shows instantly, then the video fades in.
  // Reduced-motion users keep the still poster (no autoplaying video).
  const [showVideo, setShowVideo] = useState(false);
  useEffect(() => {
    if (reduce) return;
    const start = () => setShowVideo(true);
    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(start, { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 800);
    return () => clearTimeout(t);
  }, [reduce]);

  // Bilingual hero greeting (English / Yorùbá) — a warm welcome for our
  // Yoruba-speaking diaspora family. Scoped to the greeting; persists per visit.
  const [lang, setLang] = useState<"en" | "yo">("en");
  useEffect(() => {
    const saved = localStorage.getItem("cac-hero-lang");
    if (saved === "yo" || saved === "en") setLang(saved);
  }, []);
  function switchLang(next: "en" | "yo") {
    if (next === lang) return;
    haptic("selection");
    setLang(next);
    try { localStorage.setItem("cac-hero-lang", next); } catch {}
  }
  const t = HERO_T[lang];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Cinematic scroll choreography: the video pushes back + scales while the
  // copy drifts up and fades — a single, deliberate hero moment.
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <header
      ref={ref}
      style={{
        position: "relative", minHeight: "100vh",
        display: "flex", alignItems: "center",
        padding: "140px clamp(20px,5vw,64px) 80px",
        overflow: "hidden",
        background: "#0d0a08",
        backgroundImage: "url(https://img.youtube.com/vi/xIZBd9UYIDw/maxresdefault.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* YouTube background video — muted autoplay, scroll-linked parallax */}
      <motion.div
        style={{
          position: "absolute", inset: 0, zIndex: 0, overflow: "hidden",
          scale: reduce ? 1 : videoScale,
          y: reduce ? 0 : videoY,
          willChange: "transform",
        }}
      >
        {showVideo && (
          <iframe
            src="https://www.youtube.com/embed/xIZBd9UYIDw?autoplay=1&mute=1&loop=1&playlist=xIZBd9UYIDw,RX1NjOYtDxo&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1"
            title=""
            allow="autoplay; encrypted-media"
            aria-hidden="true"
            tabIndex={-1}
            className="hero-video-fade"
            style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              width: "177.78vh", height: "56.25vw",
              minWidth: "100%", minHeight: "100%",
              border: "none", pointerEvents: "none",
            }}
          />
        )}
      </motion.div>

      {/* Dark shadow overlay + grain vignette */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "linear-gradient(135deg,rgba(0,0,0,.8) 0%,rgba(0,0,0,.56) 55%,rgba(0,0,0,.4) 100%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 1,
        background: "radial-gradient(120% 80% at 50% 0%,transparent 50%,rgba(0,0,0,.45) 100%)",
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 160, zIndex: 1,
        background: "linear-gradient(to bottom,transparent,rgba(0,0,0,.65))",
      }} />

      {/* Content */}
      <motion.div
        style={{
          position: "relative", zIndex: 2,
          maxWidth: 860, margin: "0 auto", width: "100%",
          textAlign: "center",
          y: reduce ? 0 : contentY,
          opacity: reduce ? 1 : contentOpacity,
        }}
      >
        <Reveal from="scale">
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.2)",
            padding: "8px 16px 8px 10px", borderRadius: 999,
            fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.85)",
            backdropFilter: "blur(8px)",
          }}>
            <span style={{ background: "var(--red)", color: "#fff", fontSize: 11, fontWeight: 800, padding: "3px 9px", borderRadius: 999, letterSpacing: ".5px" }}>{t.badge}</span>
            Onsite &amp; Online · 10:30 AM ET
          </span>
        </Reveal>

        <h1 style={{
          fontFamily: "var(--font-display)", fontWeight: 800,
          fontSize: "clamp(52px,7.4vw,104px)",
          lineHeight: .94, letterSpacing: "-0.03em",
          margin: "22px 0 0", color: "#fff",
          textWrap: "balance",
        }}>
          <RevealText key={`l1-${lang}`} immediate>{t.line1}</RevealText>
          <br />
          <RevealText
            key={`l2-${lang}`}
            immediate
            delay={0.18}
            style={{
              background: "linear-gradient(100deg,#F15F22,#D62828,#9E1B1B,#D62828)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text", backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              animation: "shimmer-text 5s linear infinite",
            }}
          >
            {t.line2}
          </RevealText>
        </h1>

        <Reveal delay={300} style={{ marginTop: 18 }}>
          <div role="group" aria-label="Greeting language" style={{ display: "inline-flex", gap: 4, padding: 4, borderRadius: 999, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", backdropFilter: "blur(8px)" }}>
            {(["en", "yo"] as const).map((l) => (
              <button
                key={l} type="button" onClick={() => switchLang(l)} aria-pressed={lang === l}
                className="press"
                style={{ padding: "7px 16px", borderRadius: 999, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "var(--font-body)", background: lang === l ? "#fff" : "transparent", color: lang === l ? "var(--ink)" : "rgba(255,255,255,.8)", transition: "background .2s, color .2s" }}
              >
                {l === "en" ? "English" : "Yorùbá"}
              </button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={420}>
          <p style={{
            fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.65,
            color: "rgba(255,255,255,.74)", maxWidth: 480, margin: "20px auto 0",
            textWrap: "pretty", minHeight: 84,
          }}>
            <AnimatePresence mode="wait">
              {lang === "en" ? (
                <motion.span key="sub-en" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  Real worship, real community — preaching the whole Gospel in a clear
                  and undiluted manner. It&apos;s more than a greeting.{" "}
                  <strong style={{ color: "#fff" }}>It&apos;s our lifestyle.</strong>
                </motion.span>
              ) : (
                <motion.span key="sub-yo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  Ìjọsìn tòótọ́, ẹbí tòótọ́. Ó ju ìkíni lọ —{" "}
                  <strong style={{ color: "#fff" }}>ìgbé ayé wa ni.</strong>
                </motion.span>
              )}
            </AnimatePresence>
          </p>
        </Reveal>

        <Reveal delay={520}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 34, justifyContent: "center" }}>
            <Magnetic strength={0.4}>
              <Link href="/online" className="btn-sheen" style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                background: "var(--red)", color: "#fff",
                fontWeight: 700, fontSize: 16,
                padding: "17px 30px", borderRadius: 999,
                textDecoration: "none",
                boxShadow: "0 14px 34px rgba(214,40,40,.45)",
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#fff" aria-hidden><path d="M8 5v14l11-7z" /></svg>
                Join Us Online
              </Link>
            </Magnetic>
            <Magnetic strength={0.4}>
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
            </Magnetic>
          </div>
        </Reveal>

        <Reveal delay={600}>
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
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        style={{ position: "absolute", bottom: 26, left: "50%", x: "-50%", zIndex: 2, opacity: reduce ? 1 : undefined }}
      >
        <motion.div
          animate={reduce ? undefined : { y: [0, 9, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 26, height: 42, borderRadius: 999, border: "2px solid rgba(255,255,255,.35)", display: "flex", justifyContent: "center", paddingTop: 7 }}
        >
          <span style={{ width: 4, height: 8, borderRadius: 999, background: "rgba(255,255,255,.8)" }} />
        </motion.div>
      </motion.div>
    </header>
  );
}
