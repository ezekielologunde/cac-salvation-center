"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FadeUp } from "@/components/ui/RevealText";

const lines = [
  { label: "Our mandate", text: "Preach the whole Gospel — in a clear and undiluted manner.", accent: false },
  { label: "Our purpose", text: "Build God's ambassadors here on earth.", accent: true },
  { label: "Our promise", text: "Everyone who walks through our doors finds a home.", accent: false },
];

function StoryLine({ line, index }: { line: typeof lines[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "start 0.3"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y }}
      className="py-16 md:py-24 border-b border-white/[0.05] last:border-0"
    >
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[200px_1fr] gap-8 items-start">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-white/25 tabular-nums">0{index + 1}</span>
          <span className="text-xs font-semibold text-white/40 uppercase tracking-widest">{line.label}</span>
        </div>
        <p
          className="text-[clamp(1.6rem,4vw,3rem)] font-bold leading-[1.2] tracking-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {line.accent ? (
            <span className="text-gradient-gold">{line.text}</span>
          ) : (
            <span className="text-white">{line.text}</span>
          )}
        </p>
      </div>
    </motion.div>
  );
}

export function Storytelling() {
  return (
    <section
      id="about"
      className="bg-[#030303] relative"
      aria-labelledby="story-heading"
    >
      {/* Top divider glow */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" aria-hidden />

      <div className="max-w-5xl mx-auto px-6 pt-24 pb-4 text-center">
        <FadeUp>
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">Who We Are</p>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2
            id="story-heading"
            className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.1] text-white"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            A church that feels like{" "}
            <em className="not-italic text-gradient-gold">home.</em>
          </h2>
        </FadeUp>
      </div>

      {lines.map((line, i) => (
        <StoryLine key={i} line={line} index={i} />
      ))}

      {/* Values grid */}
      <div className="max-w-5xl mx-auto px-6 py-20">
        <FadeUp>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3" role="list" aria-label="Our values">
            {[
              "Biblical Teaching",
              "Genuine Community",
              "Prayer & Worship",
              "Multilingual Services",
              "Youth Ministry",
              "Online Accessibility",
            ].map((v) => (
              <div
                key={v}
                role="listitem"
                className="glass rounded-xl px-5 py-4 text-sm font-medium text-white/60 hover:text-white/90 hover:border-white/15 transition-all duration-300 cursor-default group"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold mr-2 group-hover:scale-125 transition-transform" aria-hidden />
                {v}
              </div>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
