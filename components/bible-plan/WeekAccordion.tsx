"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import type { BibleReadingWeek } from "@/lib/biblePlan";

const DAYS: { key: "sun" | "mon" | "tue" | "wed" | "thu"; label: string; full: string }[] = [
  { key: "sun", label: "SUN", full: "Sunday" },
  { key: "mon", label: "MON", full: "Monday" },
  { key: "tue", label: "TUE", full: "Tuesday" },
  { key: "wed", label: "WED", full: "Wednesday" },
  { key: "thu", label: "THU", full: "Thursday" },
];

function pad(n: number) {
  return n < 10 ? `0${n}` : `${n}`;
}

interface WeekAccordionProps {
  weeks: BibleReadingWeek[];
  fridayReflection: string;
}

/** Mobile-first accordion — one week open at a time so the reading you want
 *  is a single tap away instead of a long scroll through every card. */
export function WeekAccordion({ weeks, fridayReflection }: WeekAccordionProps) {
  const [openWeek, setOpenWeek] = useState<number | null>(weeks[0]?.week ?? null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {weeks.map((w) => {
        const isOpen = openWeek === w.week;
        return (
          <article
            key={w.week}
            style={{
              background: "var(--paper)",
              borderRadius: 16,
              border: `1px solid ${isOpen ? "var(--gold)" : "var(--line)"}`,
              boxShadow: isOpen ? "0 14px 34px rgba(27,19,14,.1)" : "0 3px 12px rgba(27,19,14,.05)",
              overflow: "hidden",
              transition: "border-color .25s, box-shadow .25s",
            }}
          >
            <button
              onClick={() => setOpenWeek(isOpen ? null : w.week)}
              aria-expanded={isOpen}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "15px 16px",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                font: "inherit",
                color: "inherit",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <span
                style={{
                  flexShrink: 0,
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "1.2px",
                  color: "var(--red)",
                  background: "rgba(214,40,40,.08)",
                  padding: "6px 10px",
                  borderRadius: 999,
                }}
              >
                WK {pad(w.week)}
              </span>
              <span
                className="bp-theme-clamp"
                style={{
                  flex: 1,
                  minWidth: 0,
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "var(--ink)",
                  lineHeight: 1.3,
                }}
              >
                {w.theme}
              </span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                style={{ flexShrink: 0, color: "var(--ink-soft)", display: "flex" }}
              >
                <ChevronDown size={18} />
              </motion.span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  style={{ overflow: "hidden" }}
                >
                  <div style={{ borderTop: "1px solid var(--line)" }}>
                    <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {DAYS.map(({ key, label, full }) => (
                        <li
                          key={key}
                          style={{
                            display: "grid",
                            gridTemplateColumns: "50px 1fr",
                            gap: 12,
                            padding: "12px 16px",
                            borderBottom: "1px solid rgba(27,19,14,.05)",
                          }}
                        >
                          <span aria-hidden style={{ fontSize: 11, fontWeight: 800, letterSpacing: "1px", color: "var(--flame)", paddingTop: 3 }}>
                            {label}
                          </span>
                          <span className="sr-only">{full}</span>
                          <span style={{ fontSize: 15, color: "var(--ink)", lineHeight: 1.6 }}>{w[key]}</span>
                        </li>
                      ))}
                    </ol>
                    <div style={{ display: "grid", gridTemplateColumns: "50px 1fr", gap: 12, padding: "14px 16px 16px", background: "var(--cream-2)" }}>
                      <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "1px", color: "var(--red-deep)", paddingTop: 3 }}>FRI</span>
                      <span style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.6, fontStyle: "italic" }}>{fridayReflection}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}
