"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { FadeUp } from "@/components/ui/RevealText";
import { CHURCH_DATA, formatCountdown } from "@/lib/utils";

function CountdownTimer({ target }: { target: Date }) {
  const [remaining, setRemaining] = useState({ days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    const tick = () => {
      const ms = target.getTime() - Date.now();
      if (ms > 0) setRemaining(formatCountdown(ms));
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <div className="flex items-center gap-3 mt-3" aria-label={`Countdown: ${remaining.days} days, ${remaining.hours} hours, ${remaining.mins} minutes`}>
      {[
        { v: remaining.days, l: "d" },
        { v: remaining.hours, l: "h" },
        { v: remaining.mins, l: "m" },
      ].map(({ v, l }) => (
        <div key={l} className="text-center">
          <div className="w-10 h-10 glass rounded-lg flex items-center justify-center">
            <span className="text-sm font-bold text-gold tabular-nums">{String(v).padStart(2, "0")}</span>
          </div>
          <span className="text-[10px] text-white/30 mt-1 block">{l}</span>
        </div>
      ))}
    </div>
  );
}

function EventCard({ event, index }: { event: typeof CHURCH_DATA.events[number]; index: number }) {
  const year = new Date().getFullYear();
  const monthMap: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const target = new Date(year, monthMap[event.month] ?? 8, event.day, 10, 0, 0);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className="glass rounded-2xl p-6 hover:border-white/15 transition-all duration-300 group"
    >
      <div className="flex gap-5">
        {/* Date block */}
        <div className="flex flex-col items-center justify-center bg-gold/10 border border-gold/20 rounded-xl px-4 py-3 min-w-[70px] flex-shrink-0">
          <span className="text-[10px] font-bold tracking-widest text-gold uppercase">{event.month}</span>
          <span className="text-3xl font-black text-white leading-none" style={{ fontFamily: "var(--font-playfair)" }}>
            {event.day}
          </span>
          <span className="text-[10px] text-white/35 mt-0.5">{event.weekday}</span>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white group-hover:text-gold transition-colors duration-200">
            {event.title}
          </h3>
          <p className="text-sm text-white/45 mt-1 leading-relaxed">{event.desc}</p>
          <CountdownTimer target={target} />
        </div>
      </div>
    </motion.article>
  );
}

export function Events() {
  return (
    <section
      id="events"
      className="bg-[#030303] section-pad"
      aria-labelledby="events-heading"
    >
      <div className="max-w-5xl mx-auto px-6">
        <FadeUp className="mb-16">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">Mark Your Calendar</p>
              <h2
                id="events-heading"
                className="text-[clamp(2rem,5vw,3.5rem)] font-black text-white leading-[1.1]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Upcoming Events
              </h2>
            </div>
            <a
              href="#visit"
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-gold transition-colors"
            >
              <Calendar size={15} aria-hidden />
              View all
            </a>
          </div>
        </FadeUp>

        <div className="grid sm:grid-cols-2 gap-4 mb-16">
          {CHURCH_DATA.events.map((ev, i) => (
            <EventCard key={ev.title} event={ev} index={i} />
          ))}
        </div>

        {/* Weekly services strip */}
        <FadeUp delay={0.2}>
          <div
            className="glass-gold rounded-2xl p-6"
            aria-label="Weekly service schedule"
          >
            <div className="flex items-center gap-2 mb-5">
              <Clock size={15} className="text-gold" aria-hidden />
              <span className="text-xs font-semibold tracking-widest uppercase text-gold">Weekly Services</span>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {CHURCH_DATA.services.map((s) => (
                <div key={s.name} className="group">
                  <p className="text-[10px] font-bold tracking-widest uppercase text-gold/60 mb-1">{s.day}</p>
                  <p className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">{s.name}</p>
                  <p className="text-xs text-white/40 mt-0.5">{s.time}</p>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {s.mode.map((m) => (
                      <span key={m} className="text-[10px] px-2 py-0.5 rounded-full border border-white/10 text-white/40">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
