import Image from "next/image";
import { InstagramIcon } from "@/components/ui/SocialIcons";

const IG_URL = "https://www.instagram.com/salvationcenterbaltimore/";
const HANDLE = "@salvationcenterbaltimore";

// Recent church moments. (A live IG feed needs an API token or a widget such as
// Behold/EmbedSocial — these link straight to the profile in the meantime.)
const posts = [
  { src: "/images/congregation.jpg", alt: "Congregation worshipping together" },
  { src: "/images/worship.jpg", alt: "Women singing at Sunday service" },
  { src: "/images/choir.jpg", alt: "The choir in red and white robes" },
  { src: "/images/pastor-choir.jpg", alt: "Pastor Dr. H.O. Ilufoye with the choir" },
  { src: "/images/stage.jpg", alt: "Church stage and leadership" },
  { src: "/images/pastor.jpg", alt: "Pastor Dr. H.O. Ilufoye preaching" },
];

export function InstagramFeed() {
  return (
    <section style={{ background: "var(--cream)", padding: "clamp(70px,9vw,120px) clamp(20px,5vw,64px)" }}>
      <div style={{ maxWidth: 1240, margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 40 }}>
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)" }}>
              <InstagramIcon size={16} /> Follow our journey
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(34px,5vw,64px)", letterSpacing: "-1.5px", margin: "12px 0 0", lineHeight: 0.95, color: "var(--ink)" }}>
              On Instagram
            </h2>
          </div>
          <a href={IG_URL} target="_blank" rel="noopener noreferrer" className="btn-sheen press" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "linear-gradient(120deg,#F15F22,#D62828,#9E1B1B)", color: "#fff", fontWeight: 700, fontSize: 15, padding: "13px 24px", borderRadius: 999, textDecoration: "none", boxShadow: "0 12px 28px rgba(214,40,40,.32)" }}>
            <InstagramIcon size={18} /> {HANDLE}
          </a>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 12 }}>
          {posts.map((p) => (
            <a
              key={p.src} href={IG_URL} target="_blank" rel="noopener noreferrer"
              className="press gallery-tile" aria-label={`${p.alt} — view on Instagram`}
              style={{ position: "relative", display: "block", borderRadius: 16, overflow: "hidden", aspectRatio: "1 / 1", background: "var(--cream-2)" }}
            >
              <Image src={p.src} alt={p.alt} fill sizes="(max-width:640px) 50vw, 20vw" className="gallery-img" style={{ objectFit: "cover" }} />
              <span className="gallery-scrim" style={{ position: "absolute", inset: 0, background: "rgba(214,40,40,.42)", display: "grid", placeItems: "center", opacity: 0, transition: "opacity .3s", color: "#fff" }}>
                <InstagramIcon size={30} />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
