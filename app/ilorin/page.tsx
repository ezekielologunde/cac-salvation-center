import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { YoutubeIcon, FacebookIcon, InstagramIcon, TikTokIcon } from "@/components/ui/SocialIcons";
import { DailyWord } from "@/components/sections/DailyWord";
import { HeroSlider } from "@/components/ilorin/HeroSlider";
import { IlorinHeader, IlorinFooter } from "@/components/ilorin/IlorinChrome";
import { MapPin, Mail, Navigation, Podcast, ArrowUpRight, Music, Clock, BookOpen, Headphones } from "lucide-react";
import { ILORIN_URL } from "@/lib/site";
import { ILORIN_SERMONS_BY_DATE_DESC } from "@/lib/ilorinSermons";

export const metadata = {
  title: "C.A.C Salvation Centre, Ilorin — District Headquarters",
  description:
    "Christ Apostolic Church Salvation Centre, Ilorin — the District Headquarters in Kwara State, Nigeria. One Fold, One Shepherd. Worship, watch, and connect with us at Fate-Tanke Road, Oko Erin.",
  alternates: { canonical: ILORIN_URL },
};

// Distinct green identity for the Ilorin HQ micro-site (separate from the main red theme).
const c = {
  deep: "#06311F",
  green: "#0E7A43",
  greenBright: "#2BB673",
  gold: "#E8A33D",
  cream: "#EEF5EE",
  cream2: "#E3EFE4",
  paper: "#FFFFFF",
  ink: "#0A2418",
  inkSoft: "#46604F",
  line: "rgba(8,40,24,.10)",
  onDeep: "rgba(238,245,238,.74)",
  onDeepLine: "rgba(238,245,238,.16)",
};

// Hero background: an interactive slider (HeroSlider, dots + arrows +
// autoplay) through real photos — the building shot is from the church's own
// Facebook page, the rest are full-resolution event photography (resized to
// 2560px wide / re-compressed for web here; originals are much larger).
const HERO_PHOTOS = [
  { src: "/images/ilorin-building.jpg", alt: "The C.A.C Salvation Centre building at Fate-Tanke Road, Ilorin" },
  { src: "/images/ilorin-worship-leader.jpg", alt: "A worship leader ministering on the altar" },
  { src: "/images/ilorin-choir-colorful.jpg", alt: "The choir singing during a service" },
  { src: "/images/ilorin-dance-ministration.jpg", alt: "A dance ministration during a service" },
  { src: "/images/ilorin-25th-anniversary.jpg", alt: "The congregation celebrating the church's 25th anniversary" },
  { src: "/images/ilorin-choir-green.jpg", alt: "The choir ministering in green robes" },
  { src: "/images/ilorin-prayer-closeup.jpg", alt: "Members of the congregation in prayer" },
];

const ADDRESS = "Fate-Tanke Road & Abdullahi Mohammed Street, Oko Erin, Ilorin, Kwara State, Nigeria — 240102";
const MAPS_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent("C.A.C Salvation Centre, Fate-Tanke Road, Oko Erin, Ilorin, Kwara, Nigeria")}&z=15&output=embed`;
const MAPS_LINK = `https://maps.google.com/?q=${encodeURIComponent("C.A.C Salvation Centre, Fate-Tanke Road, Oko Erin, Ilorin, Kwara, Nigeria")}`;
const YT = "https://www.youtube.com/@c.a.csalvationvoicefate-ta5068";
const SPOTIFY = "https://open.spotify.com/show/2VBBGHUo6nMITGmGGrEUoM";
const APPLE_PODCASTS = "https://podcasts.apple.com/us/podcast/cac-salvation-centre-ilorin/id1872275390";
const AUDIOMACK = "https://audiomack.com/search?q=RT+Owoseni+CAC+Salvation";
const FB = "https://www.facebook.com/cacsalvationcentre";
const TIKTOK = "https://www.tiktok.com/@cacsalvationdistrict";
const EMAIL = "cacsalvationcentreilorin@gmail.com";

const connect = [
  { label: "YouTube", desc: "C.A.C Salvation Voice — services & messages", href: YT, icon: <YoutubeIcon /> },
  { label: "Spotify", desc: "Pastor Owoseni's messages on the go", href: SPOTIFY, icon: <Podcast size={22} strokeWidth={2} /> },
  { label: "Apple Podcasts", desc: "Subscribe for auto-downloads", href: APPLE_PODCASTS, icon: <Podcast size={22} strokeWidth={2} /> },
  { label: "Audiomack", desc: "Sermons, prayers & Total Restoration", href: AUDIOMACK, icon: <Music size={22} strokeWidth={2} /> },
  { label: "Facebook", desc: "Ministry updates & live events", href: FB, icon: <FacebookIcon /> },
  { label: "Instagram", desc: "Visual excerpts & announcements", href: "https://www.instagram.com/cacsalvationcentreilorin/", icon: <InstagramIcon /> },
  { label: "TikTok", desc: "Short clips & highlights from the District", href: TIKTOK, icon: <TikTokIcon /> },
  { label: "Email", desc: EMAIL, href: `mailto:${EMAIL}`, icon: <Mail size={22} strokeWidth={2} /> },
];

const markers = [
  { k: "1997", t: "Where it began", d: "Established in Ilorin, Kwara State, with a mandate to preach the whole Gospel, undiluted." },
  { k: "HQ", t: "District Headquarters", d: "The seat of the Salvation Centre — worship, teaching, and prayer at Fate-Tanke Road, Oko Erin." },
  { k: "2002", t: "The family went out", d: "From Ilorin, the Baltimore-Maryland DCC was planted in the U.S. — one fold across two continents." },
];

const schedule = [
  { day: "Sunday", services: [
    { name: "First Service", time: "7:00 – 9:00 AM" },
    { name: "Second Service", time: "9:00 AM – 12:00 PM" },
  ] },
  { day: "Monday", services: [{ name: "Morning Dew", time: "6:00 – 7:00 AM" }] },
  { day: "Tuesday", services: [{ name: "Bible Study", time: "5:00 – 7:00 PM" }] },
  { day: "Wednesday", services: [{ name: "Revival Hour", time: "5:00 – 7:00 PM" }] },
  { day: "Friday", services: [{ name: "Youth Connect Fellowship", time: "5:00 – 7:00 PM" }] },
];

// Structured data for the Ilorin HQ — lets Google show service times, address & founding.
const ilorinJsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  "@id": "https://ilorin.cacsalvationcenter.org/#church",
  name: "Christ Apostolic Church Salvation Centre, Ilorin",
  alternateName: "C.A.C Salvation Centre Ilorin",
  url: "https://ilorin.cacsalvationcenter.org",
  email: EMAIL,
  foundingDate: "1997-07-06",
  description:
    "The District Headquarters of the Christ Apostolic Church Salvation Centre — Ilorin, Kwara State, Nigeria. Worship, teaching and prayer at Fate-Tanke Road, Oko Erin.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Fate-Tanke Road & Abdullahi Mohammed Street, Oko Erin",
    addressLocality: "Ilorin",
    addressRegion: "Kwara",
    postalCode: "240102",
    addressCountry: "NG",
  },
  areaServed: ["Ilorin", "Kwara State", "Nigeria"],
  knowsLanguage: ["en", "yo"],
  hasMap: MAPS_LINK,
  employee: { "@type": "Person", name: "Pastor R.T. Owoseni", jobTitle: "District Superintendent" },
  parentOrganization: { "@type": "Church", name: "CAC Salvation Center — Baltimore", url: "https://www.cacsalvationcenter.org" },
  sameAs: [YT, FB, "https://www.instagram.com/cacsalvationcentreilorin/", TIKTOK, SPOTIFY],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "07:00", closes: "09:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "09:00", closes: "12:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "06:00", closes: "07:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "17:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "17:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "17:00", closes: "19:00" },
  ],
};

function PodcastBadge({ hasPodcast }: { hasPodcast: boolean }) {
  if (!hasPodcast) return null;
  return <Headphones size={13} strokeWidth={2.3} color={c.green} aria-label="Listen online" />;
}

export default function IlorinPage() {
  return (
    <main style={{ background: c.paper, color: c.ink, fontFamily: "var(--font-body)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ilorinJsonLd).replace(/</g, "\\u003c") }}
      />
      <IlorinHeader variant="home" />

      {/* Hero */}
      <section id="top" style={{ color: "#fff", padding: "clamp(64px,9vw,118px) clamp(20px,5vw,64px) clamp(72px,10vw,128px)", position: "relative", overflow: "hidden" }}>
        <HeroSlider photos={HERO_PHOTOS} />
        <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 1, background: `linear-gradient(170deg, rgba(6,49,31,.92) 0%, rgba(6,49,31,.72) 45%, rgba(9,74,45,.6) 100%)`, pointerEvents: "none" }} />
        <div style={{ maxWidth: 940, margin: "0 auto", position: "relative", zIndex: 2, textAlign: "center" }}>
          <Reveal>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 9, fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: c.gold, background: "rgba(232,163,61,.1)", border: "1px solid rgba(232,163,61,.3)", padding: "7px 16px", borderRadius: 999 }}>
              <MapPin size={14} strokeWidth={2.5} aria-hidden /> Ilorin · Kwara State · Nigeria
            </span>
          </Reveal>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(46px,8vw,104px)", letterSpacing: "-0.03em", lineHeight: 0.92, margin: "24px 0 0", textWrap: "balance" }}>
            <RevealText immediate>Salvation Centre,</RevealText>
            <br />
            <RevealText immediate delay={0.15} style={{ color: c.greenBright }}>Ilorin.</RevealText>
          </h1>
          <Reveal delay={320}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginTop: 22, fontSize: 12.5, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: c.gold, flexWrap: "wrap", justifyContent: "center" }}>
              <span style={{ width: 30, height: 1, background: "rgba(232,163,61,.5)" }} aria-hidden /> One Fold, One Shepherd · John 10:16 <span style={{ width: 30, height: 1, background: "rgba(232,163,61,.5)" }} aria-hidden />
            </div>
          </Reveal>
          <Reveal delay={380}>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontStyle: "italic", fontSize: "clamp(16px,1.9vw,21px)", color: c.onDeep, lineHeight: 1.6, maxWidth: 660, margin: "24px auto 0", textWrap: "pretty" }}>
              &ldquo;We stand as part of the vast body of Christ across the globe — fulfilling the Great Commission, building every believer to be God&apos;s ambassadors here on earth.&rdquo;
            </p>
          </Reveal>
          <Reveal delay={460}>
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 13, marginTop: 36 }}>
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: c.greenBright, color: c.deep, fontWeight: 800, fontSize: 16, padding: "16px 28px", borderRadius: 999, textDecoration: "none", boxShadow: "0 16px 36px rgba(43,182,115,.3)" }}>
                <Navigation size={18} strokeWidth={2.3} aria-hidden /> Get Directions
              </a>
              <a href={YT} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 9, color: "#fff", border: `1.5px solid ${c.onDeepLine}`, background: "rgba(255,255,255,.06)", fontWeight: 700, fontSize: 16, padding: "16px 26px", borderRadius: 999, textDecoration: "none" }}>
                Watch on YouTube
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Heritage */}
      <section id="heritage" style={{ background: c.cream, padding: "clamp(56px,7vw,100px) clamp(20px,5vw,64px)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: -160, left: "50%", transform: "translateX(-50%)", width: 640, height: 480, background: "radial-gradient(circle, rgba(43,182,115,.14), transparent 62%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1080, margin: "0 auto", position: "relative" }}>
          <Reveal style={{ marginBottom: 52, maxWidth: 660 }}>
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: c.green }}>Since July 6, 1997</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px,4.4vw,56px)", letterSpacing: "-1.4px", color: c.ink, margin: "12px 0 16px", lineHeight: 0.98 }}>The District Headquarters.</h2>
            <p style={{ fontSize: 17, color: c.inkSoft, lineHeight: 1.8, margin: 0 }}>
              Raised in Ilorin under <a href="https://www.cacsalvationcenter.org/leadership" style={{ color: c.green, fontWeight: 700, textDecoration: "underline", textUnderlineOffset: 3, textDecorationColor: "rgba(14,122,67,.45)" }}>Pastor Dr. H.O. Ilufoye</a>, the Salvation Centre is the headquarters from which the family has multiplied — including the Baltimore-Maryland District Coordinating Council in the United States, planted in 2002, and sister assemblies across two continents.
            </p>
          </Reveal>

          <style>{`
            .ilorin-timeline { display: flex; flex-direction: row; gap: 20px; position: relative; }
            .ilorin-timeline .ilorin-timeline-line { position: absolute; top: 27px; left: 27px; right: 27px; height: 2px; background: linear-gradient(90deg, ${c.greenBright}, ${c.green}); }
            .ilorin-timeline-item { flex: 1; position: relative; z-index: 1; }
            .ilorin-timeline-item .ilorin-timeline-card { margin-top: 18px; }
            @media (max-width: 760px) {
              .ilorin-timeline { flex-direction: column; gap: 0; }
              .ilorin-timeline .ilorin-timeline-line { top: 0; bottom: 0; left: 27px; right: auto; width: 2px; height: auto; background: linear-gradient(180deg, ${c.greenBright}, ${c.green}); }
              .ilorin-timeline-item { display: flex; align-items: flex-start; gap: 20px; padding-bottom: 34px; }
              .ilorin-timeline-item:last-child { padding-bottom: 0; }
              .ilorin-timeline-item .ilorin-timeline-card { margin-top: 0; flex: 1; }
            }
          `}</style>
          <div className="ilorin-timeline">
            <div className="ilorin-timeline-line" aria-hidden />
            {markers.map((x, i) => (
              <Reveal key={x.t} delay={i * 90} className="ilorin-timeline-item">
                <div style={{ width: 54, height: 54, borderRadius: "50%", background: c.paper, border: `2.5px solid ${c.greenBright}`, display: "grid", placeItems: "center", flexShrink: 0, boxShadow: "0 6px 16px rgba(8,40,24,.14)" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: x.k.length > 2 ? 13 : 15, color: c.green, letterSpacing: "-.3px" }}>{x.k}</span>
                </div>
                <div className="ilorin-timeline-card" style={{ background: c.paper, border: `1px solid ${c.line}`, borderRadius: 20, padding: "22px 22px" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 19, color: c.ink, margin: "0 0 8px", letterSpacing: "-.3px" }}>{x.t}</h3>
                  <p style={{ fontSize: 14.5, color: c.inkSoft, lineHeight: 1.7, margin: 0 }}>{x.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Pastoral Leadership */}
      <section id="leadership" style={{ background: c.cream2, padding: "clamp(56px,7vw,100px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 44 }}>
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: c.green }}>District Superintendent</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,3.6vw,46px)", letterSpacing: "-1px", color: c.ink, margin: "12px 0 0", lineHeight: 1 }}>Pastoral Leadership.</h2>
          </Reveal>
          <Reveal delay={80}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 48, alignItems: "center", background: c.paper, borderRadius: 28, overflow: "hidden", border: `1px solid ${c.line}`, boxShadow: "0 18px 44px rgba(8,40,24,.09)" }}>
              <div style={{ position: "relative", minHeight: "clamp(300px,40vw,460px)" }}>
                <Image
                  src="/images/pastor-owoseni.jpg"
                  alt="Pastor R.T. Owoseni — District Superintendent, C.A.C Salvation Centre Ilorin"
                  fill
                  style={{ objectFit: "cover", objectPosition: "center top" }}
                  sizes="(max-width: 700px) 100vw, 500px"
                />
              </div>
              <div style={{ padding: "clamp(32px,4vw,52px)" }}>
                <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: c.green, marginBottom: 14 }}>District Superintendent</div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(26px,3vw,38px)", letterSpacing: "-0.8px", color: c.ink, margin: "0 0 18px", lineHeight: 1.08 }}>Pastor R.T. Owoseni</h3>
                <p style={{ fontSize: 16, color: c.inkSoft, lineHeight: 1.8, margin: 0, maxWidth: 480 }}>
                  A minister and the lead pastor at C.A.C Salvation Centre, Ilorin. Well known for his deep spiritual teaching, leadership in workers&apos; retreats, and outreach across digital platforms — his messages carry clarity, conviction, and a pastor&apos;s heart.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Teaching — Today's Word + latest Sunday messages, one continuous block */}
      <div id="teaching">
        <DailyWord />

        <section style={{ background: c.paper, padding: "clamp(56px,7vw,100px) clamp(20px,5vw,64px)" }}>
          <div style={{ maxWidth: 1080, margin: "0 auto" }}>
            <Reveal style={{ marginBottom: 36, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
              <div>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: c.green }}>
                  <BookOpen size={14} strokeWidth={2.5} aria-hidden /> Sunday Messages
                </span>
                <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,3.6vw,46px)", letterSpacing: "-1px", color: c.ink, margin: "12px 0 0", lineHeight: 1 }}>Latest messages.</h2>
              </div>
              <Link href="/ilorin/blog" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 14, fontWeight: 700, color: c.green, textDecoration: "none" }}>
                View all messages <ArrowUpRight size={15} strokeWidth={2.4} aria-hidden />
              </Link>
            </Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 18 }}>
              {ILORIN_SERMONS_BY_DATE_DESC.slice(0, 3).map((sermon, i) => (
                <Reveal key={sermon.slug} delay={i * 80}>
                  <Link
                    href={`/ilorin/blog/${sermon.slug}`}
                    className="card-lift"
                    style={{ display: "block", height: "100%", background: c.cream, border: `1px solid ${c.line}`, borderRadius: 22, padding: "26px 24px", textDecoration: "none" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, gap: 8 }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: c.inkSoft }}>{sermon.date}</span>
                      <PodcastBadge hasPodcast={Boolean(sermon.podcastUrl || sermon.applePodcastUrl)} />
                    </div>
                    <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 19, color: c.ink, letterSpacing: "-.3px", margin: "0 0 8px", lineHeight: 1.2 }}>{sermon.topic}</h3>
                    <p style={{ fontSize: 13.5, color: c.inkSoft, lineHeight: 1.6, margin: "0 0 16px" }}>{sermon.texts}</p>
                    <span style={{ fontSize: 13, fontWeight: 700, color: c.green }}>Read →</span>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Life at the Centre */}
      <section style={{ background: c.cream2, padding: "clamp(56px,7vw,100px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 36 }}>
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: c.green }}>Sunday at the Centre</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,3.6vw,46px)", letterSpacing: "-1px", color: c.ink, margin: "12px 0 0", lineHeight: 1 }}>Life at the Centre.</h2>
          </Reveal>
          <style>{`
            .ilorin-gallery { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
            .ilorin-gallery .ilorin-gallery-big { grid-column: span 2; }
            .ilorin-gallery .ilorin-gallery-small { grid-column: span 1; }
            @media (max-width: 700px) {
              .ilorin-gallery { grid-template-columns: repeat(2,1fr); }
            }
          `}</style>
          <div className="ilorin-gallery">
            {[
              { src: "/images/ilorin-pastor-preaching.jpg", alt: "Pastor R.T. Owoseni ministering during a Sunday service at C.A.C Salvation Centre, Ilorin" },
              { src: "/images/ilorin-choir.jpg", alt: "The choir singing during a service at C.A.C Salvation Centre, Ilorin" },
              { src: "/images/ilorin-worship-1.jpg", alt: "A member of the congregation worshipping with raised hands at C.A.C Salvation Centre, Ilorin" },
              { src: "/images/ilorin-congregation-worship.jpg", alt: "A member of the congregation worshipping during a service at C.A.C Salvation Centre, Ilorin" },
              { src: "/images/ilorin-worship-2.jpg", alt: "A member of the congregation singing during worship at C.A.C Salvation Centre, Ilorin" },
              { src: "/images/ilorin-service.jpg", alt: "Ministers on the altar during a service at C.A.C Salvation Centre, Ilorin" },
            ].map((img, i) => (
              <Reveal key={img.src} delay={(i % 6) * 70} className={i < 2 ? "ilorin-gallery-big" : "ilorin-gallery-small"}>
                <div style={{ position: "relative", height: i < 2 ? "clamp(240px,26vw,340px)" : "clamp(140px,16vw,190px)", borderRadius: 20, overflow: "hidden", border: `1px solid ${c.line}`, boxShadow: "0 14px 32px rgba(8,40,24,.12)" }}>
                  <Image src={img.src} alt={img.alt} fill style={{ objectFit: "cover" }} sizes="(max-width: 700px) 50vw, 25vw" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us — service times + visit details, one section */}
      <section id="visit" style={{ background: c.cream, padding: "clamp(56px,7vw,100px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 44 }}>
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: c.green }}>Come and worship</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,3.6vw,46px)", letterSpacing: "-1px", color: c.ink, margin: "12px 0 0", lineHeight: 1 }}>Join us.</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 48, alignItems: "start" }}>
            <Reveal>
              <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 20 }}>
                <MapPin size={20} strokeWidth={2.2} color={c.green} style={{ flexShrink: 0, marginTop: 3 }} aria-hidden />
                <p style={{ fontSize: 16.5, color: c.ink, fontWeight: 600, lineHeight: 1.6, margin: 0 }}>{ADDRESS}</p>
              </div>
              <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: c.green, color: "#fff", fontWeight: 700, fontSize: 15.5, padding: "14px 26px", borderRadius: 999, textDecoration: "none", boxShadow: "0 14px 30px rgba(14,122,67,.28)", marginBottom: 34 }}>
                <Navigation size={17} strokeWidth={2.3} aria-hidden /> Get Directions
              </a>

              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: "1.5px", textTransform: "uppercase", color: c.green, marginBottom: 16 }}>
                <Clock size={13} strokeWidth={2.4} aria-hidden style={{ verticalAlign: -2, marginRight: 6 }} /> Weekly Schedule
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {schedule.map((d) => (
                  <div key={d.day} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, paddingBottom: 12, borderBottom: `1px solid ${c.line}` }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 14.5, color: c.ink, minWidth: 76 }}>{d.day}</div>
                    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4, alignItems: "flex-end", textAlign: "right" }}>
                      {d.services.map((s) => (
                        <div key={s.name} style={{ fontSize: 13, color: c.inkSoft }}>
                          <span style={{ fontWeight: 700, color: c.ink }}>{s.name}</span> · {s.time}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 13.5, color: c.inkSoft, margin: "16px 0 0" }}>All times West Africa Time (WAT) · Everyone is welcome.</p>
            </Reveal>
            <Reveal delay={120}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={{ position: "relative", height: "clamp(160px,20vw,220px)", borderRadius: 24, overflow: "hidden", border: `1px solid ${c.line}`, boxShadow: "0 18px 40px rgba(8,40,24,.12)" }}>
                  <Image src="/images/ilorin-building.jpg" alt="C.A.C Salvation Centre, Ilorin — the church building at Fate-Tanke Road" fill style={{ objectFit: "cover" }} sizes="(max-width: 700px) 100vw, 500px" />
                </div>
                <div style={{ height: "clamp(220px,26vw,300px)", borderRadius: 24, overflow: "hidden", border: `1px solid ${c.line}`, boxShadow: "0 18px 40px rgba(8,40,24,.12)" }}>
                  <iframe title="Map to C.A.C Salvation Centre, Ilorin" src={MAPS_EMBED} loading="lazy" referrerPolicy="no-referrer-when-downgrade" style={{ width: "100%", height: "100%", border: 0, display: "block" }} />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Connect — the one place every platform link lives */}
      <section id="connect" style={{ background: "linear-gradient(165deg, #0E7A43 0%, #0A5230 100%)", color: "#fff", padding: "clamp(56px,7vw,100px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 44 }}>
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: c.gold }}>Watch · Listen · Connect</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,52px)", letterSpacing: "-1.2px", color: "#fff", margin: "12px 0 0", lineHeight: 1 }}>Stay with the family.</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
            {connect.map((x, i) => (
              <Reveal key={x.label} delay={i * 70}>
                <a
                  href={x.href}
                  {...(x.href.startsWith("mailto") ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                  className="card-lift"
                  style={{ display: "flex", flexDirection: "column", gap: 14, height: "100%", background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.16)", borderRadius: 20, padding: "24px 22px", textDecoration: "none" }}
                >
                  <span style={{ display: "grid", placeItems: "center", width: 46, height: 46, borderRadius: 13, background: "rgba(43,182,115,.22)", color: c.greenBright, flexShrink: 0 }}>{x.icon}</span>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 19, color: "#fff", marginBottom: 4 }}>{x.label}</div>
                    <div style={{ fontSize: 13.5, color: c.onDeep, lineHeight: 1.5, wordBreak: "break-word" }}>{x.desc}</div>
                  </div>
                  <span style={{ marginTop: "auto", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: c.gold }}>Open <ArrowUpRight size={14} strokeWidth={2.4} aria-hidden /></span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <IlorinFooter variant="home" />
    </main>
  );
}
