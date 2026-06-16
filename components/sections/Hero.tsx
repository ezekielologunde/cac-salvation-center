"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Play } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let raf: number;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.5 + 0.1,
    }));

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(212,169,67,${p.o})`;
        ctx!.fill();
      }
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
}

const words = ["Hope.", "Faith.", "Purpose."];

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#030303]"
      aria-label="Welcome to CAC Salvation Center"
    >
      {/* Ambient gradients */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full bg-gold/[0.06] blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[5%] w-[500px] h-[500px] rounded-full bg-gold/[0.04] blur-[100px]" />
        <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full bg-white/[0.02] blur-[80px]" />
      </div>

      <ParticleCanvas />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, #030303 100%)" }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold text-gold text-xs font-semibold tracking-widest uppercase mb-10"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" aria-hidden />
          Randallstown, Maryland · Welcome Home
        </motion.div>

        {/* Main headline */}
        <h1 className="sr-only">Find Hope. Build Faith. Change Lives.</h1>
        <div className="overflow-hidden mb-6" aria-hidden>
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(1rem,2.5vw,1.4rem)] font-medium text-white/40 tracking-widest uppercase"
          >
            Find
          </motion.p>
        </div>

        <div className="overflow-hidden mb-3">
          {words.map((word, i) => (
            <motion.span
              key={word}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block mr-[0.2em] text-[clamp(3.5rem,9vw,7.5rem)] font-black leading-[0.95] tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              {i < words.length - 1 ? (
                <span className="text-white">{word}</span>
              ) : (
                <span className="text-gradient-gold glow-text-gold">{word}</span>
              )}
            </motion.span>
          ))}
        </div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto mt-8 text-[clamp(1rem,2vw,1.2rem)] text-white/50 leading-relaxed"
        >
          A modern church community in Maryland helping people encounter God,
          discover their purpose, and find a place to truly belong.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-4 mt-12"
        >
          <MagneticButton tag="a" href="#visit" variant="primary" className="px-7 py-3.5 text-sm rounded-xl">
            Plan Your Visit
          </MagneticButton>
          <MagneticButton tag="a" href="#sermons" variant="ghost" className="px-7 py-3.5 text-sm rounded-xl gap-2">
            <Play size={14} className="fill-white/60" aria-hidden />
            Watch Online
          </MagneticButton>
        </motion.div>

        {/* Service chips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="flex flex-wrap justify-center gap-2 mt-16"
          aria-label="Service highlights"
        >
          {["Sun 10:30 AM · In-Person", "Wed 7 PM · Bible Study", "Fri 7 PM · Wakati Itusile", "Daily 5 AM · Prayer Line"].map((chip) => (
            <span key={chip} className="px-3 py-1 rounded-full text-[11px] font-medium text-white/35 border border-white/[0.08]">
              {chip}
            </span>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25"
        aria-hidden
      >
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={14} />
        </motion.div>
      </motion.div>
    </section>
  );
}
