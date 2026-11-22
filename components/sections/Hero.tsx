"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { Magnetic } from "@/components/ui/Magnetic";
import { useCountdown } from "@/lib/useCountdown";
import { haptic } from "@/lib/haptics";
import { canLoadHeroVideo, COARSE_POINTER_QUERY, HERO_VIDEO_WIDTH_QUERY } from "@/lib/heroVideo";

type NetworkInformationLike = { saveData?: boolean; effectiveType?: string };

function subscribeHeroVideoQuery(onChange: () => void) {
  const queries = [HERO_VIDEO_WIDTH_QUERY, COARSE_POINTER_QUERY].map((q) => window.matchMedia(q));
  queries.forEach((mq) => mq.addEventListener("change", onChange));
  return () => queries.forEach((mq) => mq.removeEventListener("change", onChange));
}

const HERO_T = {
  en: { badge: "SUNDAYS", line1: "Welcome", line2: "Home." },
  yo: { badge: "ỌJỌ́ ÀÌKÚ", line1: "Káàbọ̀", line2: "sí Ilé." },
} as const;

const BG_WORDS = [
  { w: "GRACE",     l: 4,  delay: 0,   dur: 22, sz: 48, o: 0.055 },
  { w: "FAITH",     l: 77, delay: 1,   dur: 28, sz: 30, o: 0.045 },
  { w: "HOPE",      l: 21, delay: 2,   dur: 18, sz: 62, o: 0.06  },
  { w: "LOVE",      l: 63, delay: 0.5, dur: 24, sz: 38, o: 0.05  },
  { w: "GLORY",     l: 41, delay: 2.5, dur: 20, sz: 26, o: 0.04  },
  { w: "WORSHIP",   l: 87, delay: 1.5, dur: 30, sz: 22, o: 0.05  },
  { w: "AMEN",      l: 11, delay: 3,   dur: 16, sz: 44, o: 0.055 },
  { w: "SALVATION", l: 53, delay: 1.2, dur: 32, sz: 18, o: 0.04  },
] as const;

function AnimLetters({ children, delay = 0 }: { children: string; delay?: number }) {
  const reduce = useReducedMotion();
  const chars = Array.from(children);
  return (
    <motion.span
      role="img"
      aria-label={children}
      style={{ display: "inline-block" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : 0.045, delayChildren: delay } },
      }}
      initial="hidden"
      animate="show"
    >
      {chars.map((char, i) => (
        <span key={i} aria-hidden style={{ display: "inline-flex", overflow: "hidden", verticalAlign: "top" }}>
          <motion.span
            variants={
              reduce
                ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.3 } } }
                : { hidden: { y: "110%" }, show: { y: "0%", transition: { type: "spring" as const, stiffness: 220, damping: 24, mass: 0.6 } } }
            }
            style={{ display: "inline-block" }}
          >
            {char}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function Hero() {
  const { label: nextLabel, countdown } = useCountdown();
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // The self-hosted poster is the LCP element and is all most visitors get.
  // The YouTube player (~1 MB of third-party JS and media) only loads on a
  // wide screen without a touch-first pointer, with no reduced motion, no data saver and no
  // slow connection, and only after window load plus idle, so it never
  // competes with first paint. It then fades in over the poster.
  const videoEligible = useSyncExternalStore(
    subscribeHeroVideoQuery,
    () => {
      const conn = (navigator as Navigator & { connection?: NetworkInformationLike }).connection;
      return canLoadHeroVideo({
        wideViewport: window.matchMedia(HERO_VIDEO_WIDTH_QUERY).matches,
        coarsePointer: window.matchMedia(COARSE_POINTER_QUERY).matches,
        reducedMotion: !!reduce,
        saveData: conn?.saveData,
        effectiveType: conn?.effectiveType,
      });
    },
    () => false, // server render: poster only
  );
  const [videoReady, setVideoReady] = useState(false);
  const [videoPaused, setVideoPaused] = useState(false);
  useEffect(() => {
    if (!videoEligible) return;

    let idleId: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => setVideoReady(true);
    const afterLoad = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(start, { timeout: 2000 });
      } else {
        timer = setTimeout(start, 800);
      }
    };
    if (document.readyState === "complete") afterLoad();
    else window.addEventListener("load", afterLoad, { once: true });
    return () => {
      window.removeEventListener("load", afterLoad);
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timer !== undefined) clearTimeout(timer);
    };
  }, [videoEligible]);
  const showVideo = videoEligible && videoReady && !videoPaused;

  // Bilingual hero greeting (English / Yorùbá). Scoped to the greeting;
  // persists per visit.
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
      }}
    >
      {/* Self-hosted poster: the LCP element, preloaded on the homepage only
       *  (Hero renders only there). The video, when allowed, covers it. */}
      <Image
        src="/images/congregation.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        style={{ objectFit: "cover", objectPosition: "center", zIndex: 0 }}
      />

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
            src="https://www.youtube.com/embed/RX1NjOYtDxo?autoplay=1&mute=1&loop=1&playlist=RX1NjOYtDxo&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&disablekb=1&fs=0"
            title="CAC Salvation Center worship service background video"
            allow="autoplay; encrypted-media"
            aria-hidden="true"
            tabIndex={-1}
            className="hero-video-fade"
            style={{
              position: "absolute", top: "50%", left: "50%",
              transform: "translate(-50%,-50%)",
              width: "calc(177.78vh + 200px)", height: "calc(56.25vw + 200px)",
              minWidth: "calc(100% + 200px)", minHeight: "calc(100% + 200px)",
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

      {/* Floating ambient words */}
      {!reduce && (
        <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 1, overflow: "hidden", pointerEvents: "none" }}>
          {BG_WORDS.map(({ w, l, delay, dur, sz, o }) => (
            <motion.span
              key={w}
              initial={{ y: "110vh" }}
              animate={{ y: "-110vh" }}
              transition={{ duration: dur, delay, repeat: Infinity, ease: "linear" }}
              style={{
                position: "absolute",
                left: `${l}%`,
                top: 0,
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: sz,
                color: `rgba(255,255,255,${o})`,
                letterSpacing: "-0.02em",
                userSelect: "none",
                whiteSpace: "nowrap",
              }}
            >
              {w}
            </motion.span>
          ))}
        </div>
      )}

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
          <a href="#anniversary-25" className="press" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            marginBottom: 14, padding: "8px 18px", minHeight: 48, borderRadius: 999,
            background: "linear-gradient(100deg,rgba(255,226,166,.22),rgba(232,163,61,.22))",
            border: "1px solid rgba(232,163,61,.7)",
            boxShadow: "0 0 28px rgba(232,163,61,.25)",
            color: "#FFE2A6", fontSize: 13, fontWeight: 800, letterSpacing: ".6px",
            textDecoration: "none", backdropFilter: "blur(8px)",
          }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 18, letterSpacing: "-.5px", color: "var(--gold)" }}>25</span>
            Celebrating 25 years · July 2027
            <span aria-hidden>→</span>
          </a>
        </Reveal>

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

        <motion.h1
          animate={reduce ? {} : { y: [0, -10, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
          style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "clamp(52px,7.4vw,104px)",
            lineHeight: .94, letterSpacing: "-0.03em",
            margin: "22px 0 0", color: "#fff",
            textWrap: "balance",
          }}
        >
          <span className="sr-only">Christ Apostolic Church Salvation Center — a Nigerian church in Randallstown, Maryland, serving the greater Baltimore area. </span>
          <AnimLetters key={`l1-${lang}`}>{t.line1}</AnimLetters>
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
        </motion.h1>

        <Reveal delay={300} style={{ marginTop: 18 }}>
          <div role="group" aria-label="Greeting language" style={{ display: "inline-flex", gap: 4, padding: 4, borderRadius: 999, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", backdropFilter: "blur(8px)" }}>
            {(["en", "yo"] as const).map((l) => (
              <button
                key={l} type="button" onClick={() => switchLang(l)} aria-pressed={lang === l}
                className="press"
                style={{ padding: "0 18px", minHeight: 48, borderRadius: 999, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, fontFamily: "var(--font-body)", background: lang === l ? "#fff" : "transparent", color: lang === l ? "var(--ink)" : "rgba(255,255,255,.8)", transition: "background .2s, color .2s" }}
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
            <span style={{ fontSize: 13, fontWeight: 600, opacity: .75 }}>Next: {nextLabel} in</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, letterSpacing: "-.4px", color: "#FFD9A8" }}>{countdown}</span>
          </div>
        </Reveal>
      </motion.div>

      {/* Pause/Play for the looping background video (WCAG 2.2.2). Pausing
       *  removes the player and leaves the still poster. */}
      {videoEligible && (
        <button
          type="button"
          onClick={() => setVideoPaused((p) => !p)}
          aria-pressed={videoPaused}
          className="press"
          style={{
            position: "absolute", bottom: 26, right: "clamp(20px,5vw,64px)", zIndex: 3,
            minWidth: 48, minHeight: 48, padding: "0 16px",
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
            borderRadius: 999, cursor: "pointer",
            background: videoPaused ? "rgba(255,255,255,.9)" : "rgba(0,0,0,.45)",
            color: videoPaused ? "var(--ink)" : "#fff",
            border: "1.5px solid rgba(255,255,255,.5)",
            fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 700,
            backdropFilter: "blur(8px)",
          }}
        >
          {videoPaused ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
          )}
          Pause video
        </button>
      )}

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
