"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Flame, Zap, Globe, Music } from "lucide-react";
import { FadeUp } from "@/components/ui/RevealText";

const highlights = [
  { icon: Flame, label: "Friday Nights", desc: "Wakati Itusile — high-energy Yoruba worship every Friday at 7 PM." },
  { icon: Zap, label: "Young Adults", desc: "Relevant teaching for 18–35s navigating life, faith, and calling." },
  { icon: Globe, label: "Online First", desc: "All mid-week services streamed live — join from anywhere on earth." },
  { icon: Music, label: "Worship Culture", desc: "Spirit-led, contemporary worship rooted in deep biblical truth." },
];

const words = ["Young.", "Bold.", "Rooted."];

export function Youth() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={ref}
      className="relative bg-[#030303] section-pad overflow-hidden"
      aria-labelledby="youth-heading"
    >
      {/* Bold background gradient */}
      <motion.div
        style={{ opacity }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0014] via-[#030303] to-[#030303]" />
        <motion.div style={{ y: y1 }} className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-600/[0.06] blur-[100px]" />
        <motion.div style={{ y: y2 }} className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-gold/[0.05] blur-[80px]" />
      </motion.div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Large word stack */}
        <div className="mb-20">
          <FadeUp>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-8">
              Youth &amp; Young Adults
            </p>
          </FadeUp>

          <div aria-label="Young. Bold. Rooted." className="space-y-1">
            {words.map((word, i) => (
              <motion.div
                key={word}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-5%" }}
                transition={{ duration: 0.8, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden"
              >
                <span
                  className="block text-[clamp(3rem,10vw,8rem)] font-black leading-[0.92] tracking-tighter"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {i === 1 ? (
                    <span className="text-gradient-gold">{word}</span>
                  ) : (
                    <span className="text-white/90">{word}</span>
                  )}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-8 text-white/40 max-w-md text-base leading-relaxed"
          >
            Faith that doesn&apos;t ask you to leave your generation at the door.
            We meet you where you are — and walk with you toward who you&apos;re called to be.
          </motion.p>
        </div>

        {/* Highlights grid */}
        <div
          className="grid sm:grid-cols-2 md:grid-cols-4 gap-3"
          role="list"
          aria-label="Youth ministry highlights"
        >
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={h.label}
                role="listitem"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, transition: { type: "spring" as const, stiffness: 300, damping: 25 } }}
                className="group glass rounded-2xl p-5 hover:border-white/15 cursor-default"
              >
                <div className="w-9 h-9 rounded-lg bg-white/[0.06] flex items-center justify-center mb-4 group-hover:bg-gold/10 transition-colors duration-300">
                  <Icon size={16} className="text-white/50 group-hover:text-gold transition-colors duration-300" aria-hidden />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5">{h.label}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{h.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Social-style banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 glass-gold rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-gold mb-1">Prayer Line · Every Day</p>
            <p className="text-white/70 text-sm">
              5:00 AM · Dial <strong className="text-white">(857) 216-6700</strong> · Code <strong className="text-white">531312</strong>
            </p>
          </div>
          <a
            href="tel:+18572166700"
            className="flex-shrink-0 px-5 py-2.5 rounded-xl bg-gold text-black text-sm font-bold hover:bg-gold-light transition-colors"
          >
            Dial In
          </a>
        </motion.div>
      </div>
    </section>
  );
}
