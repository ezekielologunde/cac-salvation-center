"use client";

import { useState } from "react";
import { ShoppingBag, Music, BookOpen, Printer, Shirt, Phone, Mail, ExternalLink, Star, Zap } from "lucide-react";

const PHONE = "+14432726794";
const EMAIL = "info@cacsalvationcenter.org";

function waLink(product: string) {
  const msg = encodeURIComponent(`Hello! I'd like to order: ${product}. Please let me know the details and how to proceed.`);
  return `https://wa.me/${PHONE.replace(/\D/g, "")}?text=${msg}`;
}

function mailLink(product: string) {
  const sub = encodeURIComponent(`Store Order: ${product}`);
  return `mailto:${EMAIL}?subject=${sub}&body=${encodeURIComponent(`Hello,\n\nI would like to order "${product}" from the Salvation Center Store.\n\nPlease send me details on pricing, sizing, and how to proceed.\n\nThank you.`)}`;
}

type Category = "all" | "apparel" | "bibles" | "music" | "prints";

interface Product {
  id: string;
  name: string;
  category: Exclude<Category, "all">;
  desc: string;
  price: string;
  badge?: string;
  link?: string;
  linkLabel?: string;
  orderVia: "whatsapp" | "email" | "external";
  accent: string;
  icon: typeof ShoppingBag;
}

const products: Product[] = [
  // APPAREL
  {
    id: "hoodie-black",
    name: "Salvation Center Hoodie",
    category: "apparel",
    desc: "Premium heavyweight hoodie. Embroidered church logo on chest. Sizes S–3XL. Available in Black and Navy.",
    price: "$48",
    badge: "Best seller",
    orderVia: "whatsapp",
    accent: "linear-gradient(135deg,#1B130E,#3A2518)",
    icon: Shirt,
  },
  {
    id: "tshirt",
    name: "Classic Logo T-Shirt",
    category: "apparel",
    desc: "100% cotton crew-neck. Screen-printed Salvation Center shield on the front. Wears well, washes well. Black, White, or Burgundy.",
    price: "$28",
    orderVia: "whatsapp",
    accent: "linear-gradient(135deg,#D62828,#9E1B1B)",
    icon: Shirt,
  },
  {
    id: "cap",
    name: "Embroidered Dad Cap",
    category: "apparel",
    desc: "Unstructured six-panel cap with a vintage CAC crest embroidered on the front. Adjustable strap. One size fits most.",
    price: "$22",
    orderVia: "whatsapp",
    accent: "linear-gradient(135deg,#2C1F14,#4A2C18)",
    icon: Shirt,
  },
  {
    id: "tote",
    name: "Canvas Tote Bag",
    category: "apparel",
    desc: "Durable natural canvas tote with the Salvation Center motto printed large. Perfect for Sundays, markets, or daily carry.",
    price: "$16",
    orderVia: "whatsapp",
    accent: "linear-gradient(135deg,#6B4226,#9E5C32)",
    icon: Shirt,
  },
  {
    id: "mug",
    name: "Morning Devotion Mug",
    category: "apparel",
    desc: '15 oz ceramic mug. Features Psalm 127:1 on one side and the church address on the other. Dishwasher safe.',
    price: "$14",
    orderVia: "email",
    accent: "linear-gradient(135deg,#E8A33D,#C87E20)",
    icon: Shirt,
  },
  // BIBLES
  {
    id: "kjv-reference",
    name: "KJV Giant Print Reference Bible",
    category: "bibles",
    desc: "Large-print King James Version with cross-references, concordance, and maps. Genuine leather cover. Recommended for pulpit and personal study.",
    price: "$55",
    badge: "Recommended",
    link: "https://www.amazon.com/s?k=KJV+giant+print+reference+Bible+leather",
    linkLabel: "View on Amazon",
    orderVia: "external",
    accent: "linear-gradient(135deg,#1B130E,#9E1B1B)",
    icon: BookOpen,
  },
  {
    id: "niv-study",
    name: "NIV Study Bible (Hardcover)",
    category: "bibles",
    desc: "The classic NIV Study Bible with 20,000+ notes, book introductions, and full-color maps. Used in our midweek Bible study series.",
    price: "$48",
    link: "https://www.amazon.com/s?k=NIV+Study+Bible+hardcover",
    linkLabel: "View on Amazon",
    orderVia: "external",
    accent: "linear-gradient(135deg,#D62828,#9E1B1B)",
    icon: BookOpen,
  },
  {
    id: "childrens-bible",
    name: "Children's Illustrated Bible",
    category: "bibles",
    desc: "Full-color illustrated Bible stories for ages 4–12. Over 200 stories from the Old and New Testament with read-aloud language.",
    price: "$24",
    link: "https://www.amazon.com/s?k=children+illustrated+Bible+stories",
    linkLabel: "View on Amazon",
    orderVia: "external",
    accent: "linear-gradient(135deg,#F15F22,#E8A33D)",
    icon: BookOpen,
  },
  {
    id: "devotional-book",
    name: "Our Daily Bread Devotional",
    category: "bibles",
    desc: "Full-year daily devotional. One page per day, Scripture reading, reflection, and prayer prompt. Compact and ideal for commuters.",
    price: "$18",
    link: "https://www.amazon.com/s?k=Our+Daily+Bread+devotional",
    linkLabel: "View on Amazon",
    orderVia: "external",
    accent: "linear-gradient(135deg,#9E1B1B,#6B1414)",
    icon: BookOpen,
  },
  // MUSIC
  {
    id: "wakati-album",
    name: "Wakati Itusile — Vol. 1",
    category: "music",
    desc: "The debut worship album from the Salvation Center choir. 12 original Yoruba praise and worship tracks. Available as a physical CD or digital download.",
    price: "$15 CD / $10 Digital",
    badge: "Church original",
    orderVia: "whatsapp",
    accent: "linear-gradient(135deg,#1B130E,#4A2208)",
    icon: Music,
  },
  {
    id: "praise-mix",
    name: "Sunday Praise Mix — Live Sessions",
    category: "music",
    desc: "A curated collection of live worship recordings from Sunday services. Raw, unedited, Spirit-led worship. Digital download only.",
    price: "$8",
    orderVia: "whatsapp",
    accent: "linear-gradient(135deg,#D62828,#6B1414)",
    icon: Music,
  },
  {
    id: "instrumental",
    name: "Instrumental Worship Backing Tracks",
    category: "music",
    desc: "High-quality instrumental versions of our most-sung hymns and worship songs. Ideal for prayer, meditation, and personal worship. 20 tracks.",
    price: "$12",
    orderVia: "whatsapp",
    accent: "linear-gradient(135deg,#E8A33D,#9E5C32)",
    icon: Music,
  },
  // CUSTOM PRINTS
  {
    id: "scripture-print",
    name: "Custom Scripture Art Print",
    category: "prints",
    desc: "Your chosen Bible verse, beautifully typeset and printed on premium matte cardstock. Sizes: 5×7, 8×10, 11×14. Choose your own verse.",
    price: "From $18",
    badge: "Fully custom",
    orderVia: "email",
    accent: "linear-gradient(135deg,#1B130E,#9E1B1B)",
    icon: Printer,
  },
  {
    id: "anniversary-print",
    name: "2026 Good Women Anniversary Poster",
    category: "prints",
    desc: "Official commemorative print of the 2026 Good Women Anniversary. Full-color, archival ink on heavy cardstock. Limited edition. 8×10 or 11×17.",
    price: "From $20",
    badge: "Limited",
    orderVia: "email",
    accent: "linear-gradient(135deg,#9E1B1B,#D62828)",
    icon: Printer,
  },
  {
    id: "church-photo-print",
    name: "Framed Congregation Photo",
    category: "prints",
    desc: "A professionally printed and framed photo from a Salvation Center service or special event. Custom sizes and frame options. Perfect gift.",
    price: "From $45",
    orderVia: "email",
    accent: "linear-gradient(135deg,#4A2208,#8B4513)",
    icon: Printer,
  },
  {
    id: "bulletin-design",
    name: "Custom Event Flyer / Bulletin",
    category: "prints",
    desc: "We design and print custom flyers, bulletins, or programs for your ministry event. Professional layout, church branding, fast turnaround.",
    price: "Quote on request",
    orderVia: "email",
    accent: "linear-gradient(135deg,#E8A33D,#D62828)",
    icon: Printer,
  },
];

const CATS: { key: Category; label: string }[] = [
  { key: "all",     label: "All"           },
  { key: "apparel", label: "Apparel"       },
  { key: "bibles",  label: "Books & Bibles"},
  { key: "music",   label: "Music"         },
  { key: "prints",  label: "Custom Prints" },
];

function ProductCard({ p }: { p: Product }) {
  const Icon = p.icon;
  const orderHref =
    p.orderVia === "external" && p.link
      ? p.link
      : p.orderVia === "whatsapp"
      ? waLink(p.name)
      : mailLink(p.name);
  const orderLabel =
    p.orderVia === "external"
      ? (p.linkLabel ?? "View")
      : p.orderVia === "whatsapp"
      ? "Order via WhatsApp"
      : "Order via Email";
  const OrderIcon = p.orderVia === "external" ? ExternalLink : p.orderVia === "whatsapp" ? Phone : Mail;

  return (
    <article style={{
      height: "100%", background: "var(--paper)",
      border: "1px solid var(--line)", borderRadius: 22,
      display: "flex", flexDirection: "column", overflow: "hidden",
      boxShadow: "0 14px 36px rgba(27,19,14,.08)",
      transition: "box-shadow .3s, transform .3s",
    }}
    className="card-lift"
    >
      {/* Color band */}
      <div style={{ height: 140, background: p.accent, position: "relative", flexShrink: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 75% 25%,rgba(255,255,255,.15),transparent 55%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
          <Icon size={48} color="rgba(255,255,255,.22)" strokeWidth={1.5} aria-hidden />
        </div>
        {p.badge && (
          <div style={{
            position: "absolute", top: 14, left: 14,
            display: "flex", alignItems: "center", gap: 5,
            background: "rgba(255,255,255,.18)", backdropFilter: "blur(6px)",
            border: "1px solid rgba(255,255,255,.28)", borderRadius: 999,
            padding: "4px 12px", fontSize: 11, fontWeight: 800,
            letterSpacing: "1.5px", textTransform: "uppercase", color: "#fff",
          }}>
            <Star size={10} aria-hidden /> {p.badge}
          </div>
        )}
        <div style={{
          position: "absolute", bottom: 14, right: 14,
          fontFamily: "var(--font-display)", fontWeight: 800,
          fontSize: 22, color: "#fff", letterSpacing: "-.3px",
        }}>{p.price}</div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px 24px 26px", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3 style={{
          fontFamily: "var(--font-display)", fontWeight: 800,
          fontSize: 19, letterSpacing: "-.4px", color: "var(--ink)",
          margin: "0 0 10px", lineHeight: 1.18,
        }}>{p.name}</h3>
        <p style={{
          fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.72,
          margin: "0 0 22px", flex: 1,
        }}>{p.desc}</p>
        <a
          href={orderHref}
          target={p.orderVia === "external" || p.orderVia === "whatsapp" ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="press btn-sheen"
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
            background: "var(--ink)", color: "#fff",
            fontWeight: 700, fontSize: 14, padding: "12px 20px", borderRadius: 999,
            textDecoration: "none", boxShadow: "0 8px 20px rgba(27,19,14,.18)",
          }}
        >
          <OrderIcon size={15} strokeWidth={2.2} aria-hidden /> {orderLabel}
        </a>
      </div>
    </article>
  );
}

export function StoreShelf() {
  const [active, setActive] = useState<Category>("all");

  const visible = active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <>
      {/* Category tabs */}
      <div style={{
        display: "flex", flexWrap: "wrap", gap: 10,
        justifyContent: "center", marginBottom: 48,
      }}>
        {CATS.map((c) => (
          <button
            key={c.key}
            onClick={() => setActive(c.key)}
            className="press"
            style={{
              padding: "10px 22px", borderRadius: 999,
              fontWeight: 700, fontSize: 14,
              cursor: "pointer",
              background: active === c.key ? "var(--ink)" : "var(--paper)",
              color: active === c.key ? "#fff" : "var(--ink-soft)",
              boxShadow: active === c.key
                ? "0 8px 20px rgba(27,19,14,.22)"
                : "0 2px 8px rgba(27,19,14,.08)",
              border: "1px solid",
              borderColor: active === c.key ? "var(--ink)" : "var(--line)",
              transition: "all .2s",
            }}
            aria-pressed={active === c.key}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,280px), 1fr))",
        gap: 22,
      }}>
        {visible.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>

      {/* Order note */}
      <div style={{
        marginTop: 56, padding: "clamp(26px,4vw,36px)",
        background: "var(--paper)", border: "1px solid var(--line)",
        borderRadius: 22, boxShadow: "0 12px 30px rgba(27,19,14,.06)",
        display: "flex", flexWrap: "wrap", gap: 28, alignItems: "center",
      }}>
        <div style={{ flex: "1 1 280px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: "var(--red)", marginBottom: 12 }}>
            <Zap size={13} aria-hidden /> How ordering works
          </div>
          <p style={{ fontSize: 15, color: "var(--ink)", lineHeight: 1.72, margin: 0 }}>
            Tap <strong>Order via WhatsApp</strong> or <strong>Order via Email</strong> and we will respond within 24 hours with sizing, payment options, and delivery details. Bibles link directly to Amazon for instant purchase. All proceeds from merch and music support the Salvation Center&apos;s building project and ministries.
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, flexShrink: 0 }}>
          <a href={`https://wa.me/${PHONE.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer"
            className="press" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "#25D366", color: "#fff", fontWeight: 700, fontSize: 14, padding: "12px 22px", borderRadius: 999, textDecoration: "none" }}>
            <Phone size={16} strokeWidth={2} aria-hidden /> WhatsApp us
          </a>
          <a href={`mailto:${EMAIL}`}
            className="press" style={{ display: "inline-flex", alignItems: "center", gap: 9, background: "var(--ink)", color: "#fff", fontWeight: 700, fontSize: 14, padding: "12px 22px", borderRadius: 999, textDecoration: "none" }}>
            <Mail size={16} strokeWidth={2} aria-hidden /> Email us
          </a>
        </div>
      </div>
    </>
  );
}
