"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FadeUp } from "@/components/ui/RevealText";

const metrics = [
  { value: 500, suffix: "+", label: "Lives Impacted", description: "People who found hope and community" },
  { value: 12, suffix: "+", label: "Years Serving", description: "Faithfully rooted in Maryland" },
  { value: 4, suffix: "×", label: "Weekly Services", description: "Online and in-person each week" },
  { value: 100, suffix: "%", label: "Gospel Undiluted", description: "Our commitment, every sermon" },
];

function Counter({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const update = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }, [inView, value, duration]);

  return (
    <span ref={ref} aria-label={`${value}${suffix}`}>
      {count}{suffix}
    </span>
  );
}

export function Impact() {
  return (
    <section
      className="relative bg-[#030303] section-pad overflow-hidden"
      aria-labelledby="impact-heading"
    >
      {/* Background element */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gold/[0.03] blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <FadeUp className="text-center mb-20">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">The Numbers</p>
          <h2
            id="impact-heading"
            className="text-[clamp(2rem,5vw,3.5rem)] font-black text-white leading-[1.1]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Impact you can feel.
          </h2>
          <p className="mt-4 text-white/40 max-w-md mx-auto text-base">
            Every number here represents a story — a life changed, a prayer answered, a family found.
          </p>
        </FadeUp>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.05] rounded-2xl overflow-hidden">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#030303] px-8 py-10 text-center group hover:bg-[#0a0a0a] transition-colors duration-300"
            >
              <div
                className="text-[clamp(2.5rem,6vw,4rem)] font-black leading-none text-gradient-gold glow-text-gold mb-3"
                style={{ fontFamily: "var(--font-playfair)" }}
                aria-hidden
              >
                <Counter value={m.value} suffix={m.suffix} />
              </div>
              <p className="text-sm font-bold text-white/80 mb-1">{m.label}</p>
              <p className="text-xs text-white/35 leading-relaxed">{m.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
