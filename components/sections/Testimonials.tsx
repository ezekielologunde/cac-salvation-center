"use client";

import { useState } from "react";
import { Pause, Play, Star } from "lucide-react";

const phrases = [
  "Welcome Home",
  "Come As You Are",
  "Real Worship",
  "Onsite & Online",
  "Every Sunday 10:30 AM",
  "Undiluted Gospel",
  "Real Community",
  "Prayer Changes Things",
];

export function Testimonials() {
  const doubled = [...phrases, ...phrases];
  // Moving text that runs longer than 5 seconds needs a way to stop it (WCAG 2.2.2).
  const [paused, setPaused] = useState(false);

  return (
    <div style={{ position: "relative", background: "var(--ink)", color: "var(--cream)", padding: "20px 0", overflow: "hidden", whiteSpace: "nowrap" }}>
      {/* The scrolling words repeat what the page already says, so screen readers skip them. */}
      <div aria-hidden>
        <div style={{
          display: "inline-block",
          animation: "marquee-run 28s linear infinite",
          animationPlayState: paused ? "paused" : "running",
          fontFamily: "var(--font-display)", fontWeight: 800,
          fontSize: "clamp(22px,3.2vw,32px)", letterSpacing: "-.4px",
        }}>
          {doubled.map((phrase, i) => (
            <span key={i}>
              <span style={{ margin: "0 24px" }}>{phrase}</span>
              <Star size={16} fill="var(--gold)" color="var(--gold)" style={{ display: "inline-block", verticalAlign: "middle", marginRight: 24 }} aria-hidden />
            </span>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        aria-label={paused ? "Play scrolling banner" : "Pause scrolling banner"}
        className="tap press"
        style={{
          position: "absolute", top: "50%", right: "clamp(8px,2vw,24px)", transform: "translateY(-50%)",
          width: 48, height: 48, borderRadius: "50%", display: "grid", placeItems: "center",
          border: "1px solid rgba(255,247,239,.3)", background: "rgba(27,19,14,.85)", color: "var(--cream)",
          cursor: "pointer", backdropFilter: "blur(4px)",
        }}
      >
        {paused ? <Play size={18} fill="currentColor" aria-hidden /> : <Pause size={18} fill="currentColor" aria-hidden />}
      </button>
    </div>
  );
}
