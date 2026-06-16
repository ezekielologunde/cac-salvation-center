"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Users, Zap, Heart } from "lucide-react";
import { FadeUp } from "@/components/ui/RevealText";

const cards = [
  {
    icon: Music,
    title: "Worship Experience",
    short: "Spirit-led worship that moves you.",
    detail: "Our Sunday worship blends contemporary sounds with deep reverence — creating a space where you can freely encounter God, whether you're a lifelong believer or just curious.",
    color: "from-gold/10 to-gold/5",
    border: "border-gold/20",
  },
  {
    icon: Users,
    title: "Community Groups",
    short: "Real friendships. Real life.",
    detail: "Life is better together. Our midweek groups meet online and in person — covering Bible study, prayer circles, and Yoruba-language fellowship for our diaspora family.",
    color: "from-blue-500/10 to-blue-500/5",
    border: "border-blue-500/20",
  },
  {
    icon: Zap,
    title: "Youth Ministry",
    short: "Faith that connects with your generation.",
    detail: "Designed for teens and young adults, our youth ministry meets faith where culture is — with relevant teaching, mentorship, and a community that doesn't ask you to check your personality at the door.",
    color: "from-purple-500/10 to-purple-500/5",
    border: "border-purple-500/20",
  },
  {
    icon: Heart,
    title: "Kids Ministry",
    short: "A safe, joyful space for little ones.",
    detail: "From toddlers to preteens, our Kids Ministry creates age-appropriate environments where children discover the love of God through stories, creativity, and play.",
    color: "from-rose-500/10 to-rose-500/5",
    border: "border-rose-500/20",
  },
];

function ExpectCard({ card, index }: { card: typeof cards[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const Icon = card.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-2xl border bg-gradient-to-br ${card.color} ${card.border} p-6 cursor-default overflow-hidden transition-all duration-300`}
      style={{ backdropFilter: "blur(12px)" }}
    >
      {/* Hover glow */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        className="absolute inset-0 bg-white/[0.03] rounded-2xl pointer-events-none"
      />

      <div className="relative z-10">
        <motion.div
          animate={{ scale: hovered ? 1.1 : 1, rotate: hovered ? 5 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="w-11 h-11 rounded-xl bg-white/[0.08] flex items-center justify-center mb-5"
        >
          <Icon size={20} className="text-white/70" aria-hidden />
        </motion.div>

        <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
        <p className="text-sm text-white/50 leading-relaxed mb-4">{card.short}</p>

        <AnimatePresence>
          {hovered && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm text-white/65 leading-relaxed overflow-hidden"
            >
              {card.detail}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.div
          animate={{ opacity: hovered ? 1 : 0.4, x: hovered ? 4 : 0 }}
          className="mt-4 text-xs font-semibold text-white/50 flex items-center gap-1"
        >
          Learn more
          <span aria-hidden>→</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function WhatToExpect() {
  return (
    <section
      id="services"
      className="bg-[#030303] section-pad"
      aria-labelledby="expect-heading"
    >
      <div className="max-w-5xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">What to Expect</p>
          <h2
            id="expect-heading"
            className="text-[clamp(2rem,5vw,3.5rem)] font-black text-white leading-[1.1]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            There&apos;s a place for you here.
          </h2>
          <p className="mt-4 text-white/45 max-w-lg mx-auto text-base leading-relaxed">
            Hover each card to learn more about what life at CAC Salvation Center looks like.
          </p>
        </FadeUp>

        <div className="grid sm:grid-cols-2 gap-4">
          {cards.map((card, i) => (
            <ExpectCard key={card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
