import { Nav } from "@/components/navigation/Nav";
import { FooterExperience } from "@/components/sections/FooterExperience";
import { Reveal } from "@/components/ui/Reveal";
import { RevealText } from "@/components/ui/RevealText";
import { ShoppingBag, Shirt, BookOpen, Music2, Printer, Shield, Heart, Package, Mail, ExternalLink } from "lucide-react";
import { createServiceClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Store — CAC Salvation Center",
  description:
    "Salvation Center apparel, Bibles, original worship music, and custom prints. Every purchase supports the church's building project and ministries.",
  alternates: { canonical: "/store" },
};

const trust = [
  { icon: Heart,   label: "Proceeds support ministries", desc: "Every sale funds the building project and outreach." },
  { icon: Package, label: "Ships within 5 business days", desc: "Maryland local pickup available on request." },
  { icon: Shield,  label: "Secure checkout",             desc: "Multiple payment options accepted. Receipt sent instantly." },
];

const CATEGORY_ICONS: Record<string, typeof ShoppingBag> = {
  apparel: Shirt,
  bibles:  BookOpen,
  music:   Music2,
  prints:  Printer,
};

const CATEGORY_ACCENTS: Record<string, string> = {
  apparel: "linear-gradient(135deg,#1B130E,#3A2518)",
  bibles:  "linear-gradient(135deg,#9E1B1B,#D62828)",
  music:   "linear-gradient(135deg,#E8A33D,#C87E20)",
  prints:  "linear-gradient(135deg,#D62828,#9E1B1B)",
  other:   "linear-gradient(135deg,#2C1F14,#4A2C18)",
};

function mailLink(name: string) {
  const sub = encodeURIComponent(`Store Order: ${name}`);
  const body = encodeURIComponent(
    `Hello,\n\nI would like to order "${name}" from the Salvation Center Store.\n\nPlease send me details on sizing/options, pricing, and how to proceed.\n\nThank you.`
  );
  return `mailto:info@cacsalvationcenter.org?subject=${sub}&body=${body}`;
}

export default async function StorePage() {
  const service = createServiceClient();
  const { data: products } = await service
    .from("products")
    .select("*")
    .eq("published", true)
    .order("sort_order")
    .order("created_at", { ascending: false });

  return (
    <main>
      <Nav heroDark />

      {/* Hero */}
      <section style={{
        background: "var(--ink)",
        padding: "150px clamp(20px,5vw,64px) clamp(70px,9vw,110px)",
        position: "relative", overflow: "hidden",
      }}>
        <div aria-hidden style={{ position: "absolute", top: -140, right: -100, width: 640, height: 520, background: "radial-gradient(circle,rgba(232,163,61,.2),transparent 65%)", pointerEvents: "none", animation: "gradient-drift 18s ease-in-out infinite" }} />
        <div aria-hidden style={{ position: "absolute", bottom: -60, left: -80, width: 400, height: 340, background: "radial-gradient(circle,rgba(214,40,40,.14),transparent 65%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 20 }}>
              <ShoppingBag size={14} strokeWidth={2.5} aria-hidden /> Salvation Center Store
            </div>
          </Reveal>

          <h1 style={{
            fontFamily: "var(--font-display)", fontWeight: 800,
            fontSize: "clamp(48px,7.5vw,104px)", letterSpacing: "-0.035em",
            color: "#fff", margin: "0 0 28px", lineHeight: 0.9, textWrap: "balance",
          }}>
            <RevealText immediate>Carry the</RevealText>{" "}
            <RevealText immediate delay={0.12}
              style={{ background: "linear-gradient(100deg,#F15F22,#D62828,#E8A33D)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              message.
            </RevealText>
          </h1>

          <Reveal delay={200}>
            <p style={{ fontSize: "clamp(16px,2vw,20px)", color: "rgba(255,247,239,.72)", lineHeight: 1.7, maxWidth: 560, margin: "0 0 40px" }}>
              Apparel, Bibles, worship music, and custom prints — resources for the family, inside the church and beyond it. Every purchase supports the ministries of CAC Salvation Center.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Products */}
      <section style={{ background: "var(--cream)", padding: "clamp(56px,7vw,90px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 40 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap" }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,48px)", letterSpacing: "-1px", color: "var(--ink)", margin: 0 }}>Shop.</h2>
              {products && products.length > 0 && (
                <span style={{ fontSize: 13, fontWeight: 700, color: "var(--red)", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                  {products.length} item{products.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>
          </Reveal>

          {!products?.length ? (
            <Reveal>
              <div style={{
                textAlign: "center", padding: "80px 32px",
                background: "var(--paper)", borderRadius: 20,
                border: "1px solid var(--line)",
              }}>
                <ShoppingBag size={40} color="rgba(27,19,14,.18)" strokeWidth={1.5} aria-hidden />
                <p style={{ fontSize: 18, fontWeight: 700, color: "var(--ink)", margin: "20px 0 8px" }}>Coming soon</p>
                <p style={{ fontSize: 14, color: "var(--ink-soft)", margin: 0 }}>
                  Products will be listed here. Check back soon, or{" "}
                  <a href="mailto:info@cacsalvationcenter.org" style={{ color: "var(--red)", fontWeight: 600 }}>
                    contact us
                  </a>{" "}
                  to order directly.
                </p>
              </div>
            </Reveal>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%,280px), 1fr))", gap: 24 }}>
              {products.map((product, i) => {
                const Icon = CATEGORY_ICONS[product.category] ?? ShoppingBag;
                const accent = CATEGORY_ACCENTS[product.category] ?? CATEGORY_ACCENTS.other;
                return (
                  <Reveal key={product.id} delay={i * 60}>
                    <article style={{
                      background: "var(--paper)",
                      border: "1px solid var(--line)",
                      borderRadius: 22,
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: "0 8px 28px rgba(27,19,14,.07)",
                      height: "100%",
                    }}>
                      {/* Image band */}
                      <div style={{ height: 160, background: product.image_url ? "var(--cream-2)" : accent, position: "relative", flexShrink: 0, overflow: "hidden" }}>
                        {product.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={product.image_url}
                            alt={product.image_alt ?? product.name}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        ) : (
                          <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center" }}>
                            <Icon size={48} color="rgba(255,255,255,.25)" strokeWidth={1.5} aria-hidden />
                          </div>
                        )}
                        {product.badge && (
                          <div style={{
                            position: "absolute", top: 14, left: 14,
                            background: "rgba(255,255,255,.18)", backdropFilter: "blur(6px)",
                            border: "1px solid rgba(255,255,255,.28)", borderRadius: 999,
                            padding: "4px 12px", fontSize: 11, fontWeight: 800,
                            letterSpacing: "1.5px", textTransform: "uppercase", color: "#fff",
                          }}>
                            {product.badge}
                          </div>
                        )}
                        <div style={{
                          position: "absolute", bottom: 14, right: 14,
                          fontFamily: "var(--font-display)", fontWeight: 800,
                          fontSize: 22, color: "#fff",
                          textShadow: "0 1px 6px rgba(0,0,0,.5)",
                        }}>
                          {product.price_display}
                        </div>
                      </div>

                      {/* Body */}
                      <div style={{ padding: "20px 22px 24px", display: "flex", flexDirection: "column", flex: 1 }}>
                        {product.category && (
                          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "1.8px", textTransform: "uppercase", color: "var(--red)", marginBottom: 6 }}>{product.category}</span>
                        )}
                        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 18, color: "var(--ink)", margin: "0 0 8px", lineHeight: 1.2, letterSpacing: "-.3px" }}>
                          {product.name}
                        </h3>
                        {product.description && (
                          <p style={{ fontSize: 13.5, color: "var(--ink-soft)", lineHeight: 1.7, margin: "0 0 18px", flex: 1 }}>{product.description}</p>
                        )}
                        <div style={{ marginTop: "auto" }}>
                          {product.order_method === "external" && product.external_link && (
                            <a
                              href={product.external_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                                background: "var(--ink)", color: "#fff", fontWeight: 700, fontSize: 14,
                                padding: "12px 20px", borderRadius: 999, textDecoration: "none",
                                boxShadow: "0 8px 20px rgba(27,19,14,.18)",
                              }}
                            >
                              <ExternalLink size={14} strokeWidth={2.2} aria-hidden />
                              {product.external_label || "Order"}
                            </a>
                          )}
                          {product.order_method === "email" && (
                            <a
                              href={mailLink(product.name)}
                              style={{
                                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                                background: "var(--ink)", color: "#fff", fontWeight: 700, fontSize: 14,
                                padding: "12px 20px", borderRadius: 999, textDecoration: "none",
                                boxShadow: "0 8px 20px rgba(27,19,14,.18)",
                              }}
                            >
                              <Mail size={14} strokeWidth={2.2} aria-hidden />
                              Request order
                            </a>
                          )}
                          {product.order_method === "stripe" && (
                            <a
                              href={mailLink(product.name)}
                              style={{
                                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                                background: "var(--red)", color: "#fff", fontWeight: 700, fontSize: 14,
                                padding: "12px 20px", borderRadius: 999, textDecoration: "none",
                                boxShadow: "0 8px 20px rgba(214,40,40,.28)",
                              }}
                            >
                              <Mail size={14} strokeWidth={2.2} aria-hidden />
                              Buy Now
                            </a>
                          )}
                        </div>
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* How ordering works */}
      <section style={{ background: "var(--cream-2)", borderTop: "1px solid var(--line)", padding: "clamp(48px,6vw,72px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 840, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase", color: "var(--red)", marginBottom: 10 }}>How ordering works</div>
            <p style={{ fontSize: 15, color: "var(--ink)", lineHeight: 1.78, margin: "0 0 10px" }}>
              <strong>Apparel &amp; Music</strong> — click "Buy Now" or "Request order" and we'll reply within 24 hours with payment details. Cards, Apple Pay, and Google Pay accepted.
            </p>
            <p style={{ fontSize: 15, color: "var(--ink)", lineHeight: 1.78, margin: 0 }}>
              <strong>Bibles</strong> link directly to Amazon. <strong>Custom prints</strong> are ordered via email — we confirm details and quote the final price. All proceeds support CAC Salvation Center ministries.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Trust bar */}
      <section style={{ background: "var(--ink)", padding: "clamp(50px,6vw,80px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 36 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(24px,3.5vw,38px)", letterSpacing: "-.8px", color: "var(--cream)", margin: 0 }}>Simple, personal, purposeful.</h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))", gap: 18 }}>
            {trust.map((t, i) => (
              <Reveal key={t.label} delay={i * 80}>
                <div style={{ background: "rgba(255,247,239,.05)", border: "1px solid rgba(255,247,239,.1)", borderRadius: 18, padding: "24px 22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <t.icon size={18} strokeWidth={2} color="var(--gold)" aria-hidden />
                    <span style={{ fontWeight: 700, fontSize: 15, color: "var(--cream)" }}>{t.label}</span>
                  </div>
                  <p style={{ fontSize: 14, color: "rgba(255,247,239,.58)", lineHeight: 1.65, margin: 0 }}>{t.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FooterExperience />
    </main>
  );
}
