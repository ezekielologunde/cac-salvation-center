import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCountdown(ms: number) {
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  return { days, hours, mins };
}

export const CHURCH_DATA = {
  name: "CAC Salvation Center",
  tagline: "Welcome Home",
  address: "10710 Marriottsville Rd, Randallstown, MD 21133",
  phone: ["+1 (443) 272-6794", "+1 (410) 701-8315"],
  email: "info@cacsalvationcenter.org",
  services: [
    { day: "Sunday", name: "Sunday School", time: "9:25 – 10:25 AM ET", mode: ["In-person", "Online"] },
    { day: "Sunday", name: "Main Worship Service", time: "10:30 AM – 12:30 PM ET", mode: ["In-person", "Online"] },
    { day: "Wednesday", name: "Bible Study", time: "7:00 – 8:30 PM ET", mode: ["Online"] },
    { day: "Friday", name: "Wakati Itusile", time: "7:00 – 9:00 PM ET", mode: ["Online", "Yoruba"] },
  ],
  prayerLine: { time: "5:00 AM daily", number: "857-216-6700", code: "531312" },
  events: [
    { month: "Sep", day: 3, weekday: "Wed", title: "Choir Anniversary", desc: "Celebrating our choir's faithful ministry in worship." },
    { month: "Oct", day: 1, weekday: "Wed", title: "Baltimore DCC Anniversary", desc: "Annual District Central Council anniversary service." },
  ],
  social: { facebook: "#", instagram: "#", youtube: "#", tiktok: "#" },
} as const;

export const EASING = {
  spring: [0.16, 1, 0.3, 1] as [number, number, number, number],
  smooth: [0.4, 0, 0.2, 1] as [number, number, number, number],
  snappy: [0.22, 1, 0.36, 1] as [number, number, number, number],
};
