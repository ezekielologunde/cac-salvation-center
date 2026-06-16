"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { FadeUp } from "@/components/ui/RevealText";

const sermons = [
  { title: "Walking in God's Purpose", speaker: "Pastor Dr. H.O. Ilufoye", series: "Purpose & Calling", duration: "52 min", thumb: "from-indigo-900 to-indigo-700", date: "Jun 1, 2026" },
  { title: "The Power of Undiluted Faith", speaker: "Pastor Dr. H.O. Ilufoye", series: "Faith Foundations", duration: "48 min", thumb: "from-stone-900 to-stone-700", date: "May 25, 2026" },
  { title: "Finding Your Place in Community", speaker: "Pastor Dr. H.O. Ilufoye", series: "Belonging", duration: "44 min", thumb: "from-emerald-900 to-emerald-800", date: "May 18, 2026" },
  { title: "When God Transforms Lives", speaker: "Pastor Dr. H.O. Ilufoye", series: "Transformation", duration: "56 min", thumb: "from-rose-900 to-rose-800", date: "May 11, 2026" },
  { title: "Hope That Anchors the Soul", speaker: "Pastor Dr. H.O. Ilufoye", series: "Hope Series", duration: "50 min", thumb: "from-amber-900 to-amber-800", date: "May 4, 2026" },
];

function SermonCard({ sermon, index }: { sermon: typeof sermons[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.article
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex-shrink-0 w-[280px] cursor-pointer group"
    >
      {/* Thumbnail */}
      <div className={`relative w-full h-40 rounded-xl bg-gradient-to-br ${sermon.thumb} overflow-hidden mb-3`}>
        <div className="absolute inset-0 bg-black/30" />
        {/* Play button */}
        <motion.div
          animate={{ scale: hovered ? 1 : 0.85, opacity: hovered ? 1 : 0.6 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
            <Play size={18} className="fill-white text-white ml-0.5" aria-hidden />
          </div>
        </motion.div>
        {/* Duration */}
        <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-black/60 text-[10px] text-white/70 font-medium">
          {sermon.duration}
        </div>
        {/* Series badge */}
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-gold/20 border border-gold/30 text-[10px] text-gold font-semibold">
          {sermon.series}
        </div>
      </div>

      <h3 className="text-sm font-semibold text-white/90 group-hover:text-white leading-snug transition-colors mb-1">
        {sermon.title}
      </h3>
      <p className="text-xs text-white/40">{sermon.speaker} · {sermon.date}</p>
    </motion.article>
  );
}

export function Sermons() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(dir: "left" | "right") {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  }

  return (
    <section id="sermons" className="bg-[#030303] section-pad overflow-hidden" aria-labelledby="sermons-heading">
      <div className="max-w-5xl mx-auto px-6">
        <FadeUp className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">Latest Messages</p>
            <h2
              id="sermons-heading"
              className="text-[clamp(2rem,5vw,3.5rem)] font-black text-white leading-[1.1]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Watch & Be Moved.
            </h2>
          </div>
          <div className="flex items-center gap-2" aria-label="Scroll sermons">
            <button
              onClick={() => scroll("left")}
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/50 hover:text-white transition-colors"
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-9 h-9 rounded-full glass flex items-center justify-center text-white/50 hover:text-white transition-colors"
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </FadeUp>

        {/* Featured sermon */}
        <FadeUp delay={0.1} className="mb-10">
          <div className="relative rounded-2xl overflow-hidden h-[320px] md:h-[380px] bg-gradient-to-br from-navy-900 via-[#0f1a2e] to-[#1a0a2e] group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent z-10" />
            {/* Decorative gradient orbs */}
            <div className="absolute top-8 right-16 w-64 h-64 rounded-full bg-gold/10 blur-3xl" aria-hidden />
            <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl" aria-hidden />

            <div className="absolute inset-0 z-20 p-8 md:p-12 flex flex-col justify-end">
              <span className="text-xs font-bold tracking-widest uppercase text-gold mb-3">Featured Sermon</span>
              <h3
                className="text-[clamp(1.5rem,4vw,2.8rem)] font-black text-white leading-tight max-w-xl mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {sermons[0].title}
              </h3>
              <p className="text-sm text-white/50 mb-6">{sermons[0].speaker} · {sermons[0].date} · {sermons[0].duration}</p>
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold text-black text-sm font-semibold hover:bg-gold-light transition-colors">
                  <Play size={14} className="fill-black" aria-hidden /> Watch Now
                </button>
                <button className="text-sm text-white/50 hover:text-white transition-colors">Share →</button>
              </div>
            </div>
          </div>
        </FadeUp>

        {/* Horizontal scroll row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          role="list"
          aria-label="Recent sermons"
        >
          {sermons.slice(1).map((s, i) => (
            <div key={s.title} role="listitem">
              <SermonCard sermon={s} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
