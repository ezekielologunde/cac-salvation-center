export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.cacsalvationcenter.org";

export const SITE = {
  name: "Christ Apostolic Church Salvation Center",
  shortName: "CAC Salvation Center",
  url: SITE_URL,
  description:
    "Real worship, real community — preaching the whole Gospel in a clear and undiluted manner. Join us Sundays at 10:30 AM ET in Randallstown, MD, and online.",
  telephone: "+1-443-272-6794",
  email: "info@cacsalvationcenter.org",
  address: {
    street: "10710 Marriottsville Rd",
    city: "Randallstown",
    region: "MD",
    postalCode: "21133",
    country: "US",
  },
  sameAs: [
    "https://www.facebook.com/CacSalvationCenterBaltimore",
    "https://www.instagram.com/salvationcenterbaltimoreusa/",
    "https://www.youtube.com/channel/UCoogH4HuVXSn4okSpRlsDQA",
    "https://www.tiktok.com/@salvationcenterus",
  ],
} as const;

/** Public routes for the sitemap (path, priority). */
export const ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/about", priority: 0.8 },
  { path: "/leadership", priority: 0.7 },
  { path: "/ministries", priority: 0.7 },
  { path: "/online", priority: 0.9 },
  { path: "/giving", priority: 0.8 },
  { path: "/prayer", priority: 0.8 },
  { path: "/devotional", priority: 0.7 },
  { path: "/salvation", priority: 0.8 },
  { path: "/events", priority: 0.7 },
  { path: "/gallery", priority: 0.6 },
  { path: "/visit", priority: 0.9 },
  { path: "/contact", priority: 0.7 },
];

/** schema.org Church structured data for rich results + local SEO. */
export function churchJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Church",
    "@id": `${SITE_URL}/#church`,
    name: SITE.name,
    alternateName: SITE.shortName,
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo.png`,
    image: `${SITE_URL}/images/congregation.jpg`,
    description: SITE.description,
    telephone: SITE.telephone,
    email: SITE.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    sameAs: SITE.sameAs,
    founder: { "@type": "Person", name: "Pastor Dr. H.O. Ilufoye" },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "09:25", closes: "12:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "19:00", closes: "20:30" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "19:00", closes: "20:30" },
    ],
    event: {
      "@type": "Event",
      name: "Sunday Worship Service",
      eventSchedule: {
        "@type": "Schedule",
        byDay: "Sunday",
        startTime: "10:30",
        repeatFrequency: "P1W",
      },
      eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
      location: {
        "@type": "Place",
        name: SITE.name,
        address: `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`,
      },
    },
  };
}
