"use client";
import { useState, useEffect } from "react";

function nextSundayAt1030(): Date {
  const now = new Date();
  const target = new Date(now);
  target.setHours(10, 30, 0, 0);
  let diff = (0 - target.getDay() + 7) % 7;
  if (diff === 0 && now >= target) diff = 7;
  target.setDate(target.getDate() + diff);
  return target;
}

export function useCountdown(): string {
  const [text, setText] = useState("—");

  useEffect(() => {
    const update = () => {
      const ms = nextSundayAt1030().getTime() - Date.now();
      if (ms <= 0) { setText("Starting now!"); return; }
      const d = Math.floor(ms / 86400000);
      const h = Math.floor((ms % 86400000) / 3600000);
      const m = Math.floor((ms % 3600000) / 60000);
      const s = Math.floor((ms % 60000) / 1000);
      setText(`${d}d ${h}h ${m}m ${s}s`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return text;
}
