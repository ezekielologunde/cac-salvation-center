"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { FadeUp } from "@/components/ui/RevealText";

const testimonials = [
  {
    quote: "Walking into CAC Salvation Center felt like finally coming home. The warmth, the teaching, the community — I found myself here.",
    name: "Adaeze O.",
    role: "Member since 2022",
    initials: "AO",
    color: "from-gold/20 to-gold/5",
  },
  {
    quote: "The Bible Study on Wednesdays transformed how I understand Scripture. Pastor Ilufoye teaches with such clarity and depth.",
    name: "Marcus T.",
    role: "Member since 2023",
    initials: "MT",
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    quote: "As a young professional far from Nigeria, the Wakati Itusile service keeps me grounded in faith and culture at the same time.",
    name: "Funmilayo A.",
    role: "Member since 2021",
    initials: "FA",
    color: "from-purple-500/20 to-purple-500/5",
  },
  {
    quote: "I came for one Sunday and stayed forever. This church preaches the Gospel without compromise — exactly what I needed.",
    name: "David K.",
    role: "Member since 2020",
    initials: "DK",
    color: "from-emerald-500/20 to-emerald-500/5",
  },
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
};

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (d: 1 | -1) => {
    setDir(d);
    setIndex((p) => (p + d + testimonials.length) % testimonials.length);
  };

  const t = testimonials[index];

  return (
    <section
      className="bg-[#030303] section-pad"
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-4xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">Stories</p>
          <h2
            id="testimonials-heading"
            className="text-[clamp(2rem,5vw,3.5rem)] font-black text-white leading-[1.1]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Voices from our family.
          </h2>
        </FadeUp>

        <div className="relative">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={index}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={`glass rounded-3xl p-8 md:p-12 bg-gradient-to-br ${t.color}`}
            >
              <Quote size={32} className="text-gold/30 mb-6" aria-hidden />

              <blockquote>
                <p
                  className="text-[clamp(1.1rem,3vw,1.6rem)] font-medium text-white/90 leading-relaxed mb-8"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </p>
                <footer className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${t.color} border border-white/10 flex items-center justify-center text-xs font-bold text-white`}>
                    {t.initials}
                  </div>
                  <div>
                    <cite className="not-italic font-semibold text-white text-sm">{t.name}</cite>
                    <p className="text-xs text-white/40">{t.role}</p>
                  </div>
                </footer>
              </blockquote>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-8">
            {/* Dots */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
                  className="transition-all duration-300"
                >
                  <motion.span
                    animate={{ width: i === index ? 24 : 6, backgroundColor: i === index ? "#D4A943" : "rgba(255,255,255,0.2)" }}
                    className="block h-1.5 rounded-full"
                    style={{ width: 6 }}
                  />
                </button>
              ))}
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => go(-1)}
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/50 hover:text-white transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => go(1)}
                className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/50 hover:text-white transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
