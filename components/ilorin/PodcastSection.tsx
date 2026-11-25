import { Podcast, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

// Pastor R.T. Owoseni's show on Spotify. The embedded player lists the newest
// episodes by itself, so "Latest" never needs editing. "Start here" is a hand-
// picked list of series; each card opens its first episode (Part 1 where there is one).
const SHOW_ID = "2VBBGHUo6nMITGmGGrEUoM";
const SHOW_URL = `https://open.spotify.com/show/${SHOW_ID}`;

const START_HERE = [
  { title: "God Our Defender", note: "Two parts on trusting God as your protector.", id: "1K5D8RJFB8EMI28FqTUqBE" },
  { title: "Gates of Favour by Faith", note: "How faith opens the door to God's favour.", id: "0gkrE1ClrsvUrruZVM1GiM" },
  { title: "Works of Divine Favour", note: "What God's favour does in a believer's life.", id: "1AX1vxna64Dicy6mDUhBFt" },
  { title: "The Role of Faith in Accessing Divine Favour", note: "Why faith is the key that favour answers to.", id: "1cGnwNQi8aNFTm3fEO6LNh" },
  { title: "Attracting Great Mercy", note: "Understanding and receiving God's mercy.", id: "2f4VsESf85PQbCz0fkNwY1" },
  { title: "Jesus Our Burden Bearer", note: "Handing your load to the One who carries it.", id: "3Km5PczTsRQH3WCYSwF9Om" },
];

const c = {
  green: "#0E7A43",
  cream: "#EEF5EE",
  paper: "#FFFFFF",
  ink: "#0A2418",
  inkSoft: "#46604F",
  line: "rgba(8,40,24,.10)",
};

export function PodcastSection() {
  return (
    <section id="podcast" style={{ background: c.cream, padding: "clamp(56px,7vw,100px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <Reveal style={{ marginBottom: 36, maxWidth: 660 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: c.green }}>
            <Podcast size={14} strokeWidth={2.5} aria-hidden /> Listen Anywhere
          </span>
          <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,3.6vw,46px)", letterSpacing: "-1px", color: c.ink, margin: "12px 0 14px", lineHeight: 1 }}>
            Sermons and Bible teaching.
          </h2>
          <p style={{ fontSize: 16.5, color: c.inkSoft, lineHeight: 1.75, margin: 0 }}>
            Pastor R.T. Owoseni&apos;s messages, free on Spotify. Press play below, or pick a series to start from the beginning.
          </p>
        </Reveal>

        <Reveal>
          <iframe
            title="Pastor R.T. Owoseni's sermons on Spotify"
            src={`https://open.spotify.com/embed/show/${SHOW_ID}`}
            width="100%"
            height="352"
            loading="lazy"
            allow="encrypted-media; clipboard-write; fullscreen; picture-in-picture"
            style={{ border: 0, borderRadius: 16, display: "block", background: c.paper }}
          />
        </Reveal>

        <Reveal style={{ margin: "48px 0 20px" }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, letterSpacing: "-.5px", color: c.ink, margin: 0 }}>Start here</h3>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
          {START_HERE.map((s, i) => (
            <Reveal key={s.id} delay={i * 60}>
              <a
                href={`https://open.spotify.com/episode/${s.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="card-lift"
                style={{ display: "block", height: "100%", background: c.paper, border: `1px solid ${c.line}`, borderRadius: 20, padding: "22px 22px", textDecoration: "none" }}
              >
                <h4 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: c.ink, letterSpacing: "-.3px", margin: "0 0 8px", lineHeight: 1.2 }}>{s.title}</h4>
                <p style={{ fontSize: 14, color: c.inkSoft, lineHeight: 1.6, margin: "0 0 14px" }}>{s.note}</p>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: c.green }}>
                  Listen on Spotify <ArrowUpRight size={14} strokeWidth={2.4} aria-hidden />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal style={{ marginTop: 28 }}>
          <a href={SHOW_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 7, minHeight: 48, fontSize: 14, fontWeight: 700, color: c.green, textDecoration: "none" }}>
            See all episodes on Spotify <ArrowUpRight size={15} strokeWidth={2.4} aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
