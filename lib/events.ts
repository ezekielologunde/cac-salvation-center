import { SITE } from "@/lib/site";

const LOCATION = `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`;
const TZ = "America/New_York";

export interface ChurchEvent {
  id: string;
  title: string;
  desc: string;
  dateLabel: string;
  timeLabel: string;
  month?: string;
  day?: string;
  /** Local wall-clock start/end in YYYYMMDDTHHMMSS (interpreted in America/New_York). */
  startLocal: string;
  endLocal: string;
  recurDay?: "SU" | "WE" | "FR";
}

export const specialEvents: ChurchEvent[] = [
  {
    id: "choir-anniversary-2026",
    title: "Choir Anniversary",
    desc: "A special Sunday of praise and thanksgiving celebrating our worship ministry.",
    dateLabel: "September 3, 2026", timeLabel: "10:30 AM ET", month: "SEP", day: "03",
    startLocal: "20260903T103000", endLocal: "20260903T123000",
  },
  {
    id: "dcc-anniversary-2026",
    title: "Baltimore DCC Anniversary",
    desc: "Celebrating our District Coordinating Council with the wider CAC family.",
    dateLabel: "October 1, 2026", timeLabel: "10:30 AM ET", month: "OCT", day: "01",
    startLocal: "20261001T103000", endLocal: "20261001T123000",
  },
];

export const weeklyServices: ChurchEvent[] = [
  {
    id: "sunday-service",
    title: "Sunday Worship Service",
    desc: "Our main gathering — Spirit-led worship and biblical teaching, onsite and online.",
    dateLabel: "Every Sunday", timeLabel: "10:30 AM ET",
    startLocal: "20260628T103000", endLocal: "20260628T123000", recurDay: "SU",
  },
  {
    id: "bible-study",
    title: "Wednesday Bible Study",
    desc: "Mid-week scriptural teaching with Pastor Ilufoye. Join online from anywhere.",
    dateLabel: "Every Wednesday", timeLabel: "7:00 PM ET",
    startLocal: "20260624T190000", endLocal: "20260624T203000", recurDay: "WE",
  },
  {
    id: "wakati-itusile",
    title: "Wakati Itusile",
    desc: "High-energy Yoruba worship celebrating our diaspora family. Online.",
    dateLabel: "Every Friday", timeLabel: "7:00 PM ET",
    startLocal: "20260626T190000", endLocal: "20260626T203000", recurDay: "FR",
  },
];

/** One-click Google Calendar template URL (timezone-correct via ctz). */
export function googleCalUrl(ev: ChurchEvent): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: ev.title,
    dates: `${ev.startLocal}/${ev.endLocal}`,
    details: ev.desc,
    location: LOCATION,
    ctz: TZ,
  });
  let url = `https://calendar.google.com/calendar/render?${params.toString()}`;
  if (ev.recurDay) url += `&recur=${encodeURIComponent(`RRULE:FREQ=WEEKLY;BYDAY=${ev.recurDay}`)}`;
  return url;
}

/** Downloadable .ics (Apple Calendar / Outlook) as a data URI — no backend needed. */
export function icsDataUri(ev: ChurchEvent): string {
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CAC Salvation Center//Events//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${ev.id}@cacsalvationcenter.org`,
    "DTSTAMP:20260101T000000Z",
    `DTSTART;TZID=${TZ}:${ev.startLocal}`,
    `DTEND;TZID=${TZ}:${ev.endLocal}`,
    ...(ev.recurDay ? [`RRULE:FREQ=WEEKLY;BYDAY=${ev.recurDay}`] : []),
    `SUMMARY:${ev.title}`,
    `DESCRIPTION:${ev.desc}`,
    `LOCATION:${LOCATION}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}
