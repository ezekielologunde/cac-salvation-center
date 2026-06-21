"use client";
import { useState } from "react";
import { Nav } from "@/components/navigation/Nav";
import { FooterExperience } from "@/components/sections/FooterExperience";
import { Reveal } from "@/components/ui/Reveal";
import { IconBadge } from "@/components/ui/IconBadge";
import { MapPin, Clock, Phone, PartyPopper } from "lucide-react";
import { submitLead, isValidEmail } from "@/lib/forms";

const faqs = [
  { q: "What should I wear?", a: "Come as you are. Some members dress formally, others casually — all are equally welcome." },
  { q: "How long is the service?", a: "Sunday services typically run about 2 hours (10:30 AM – 12:30 PM ET)." },
  { q: "Do you have childcare?", a: "Yes — we have a dedicated Kids Ministry for children during Sunday service." },
  { q: "Can I join online?", a: "Absolutely. All Sunday services are streamed live. Wednesday and Friday services are online-only." },
  { q: "Is Wakati Itusile for non-Yoruba speakers?", a: "It's primarily in Yoruba, celebrating our diaspora community — but all are warmly welcome." },
];

export default function VisitPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ first: "", last: "", email: "", phone: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (!form.first.trim()) next.first = "Please enter your first name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!isValidEmail(form.email)) next.email = "Please enter a valid email address.";

    setErrors(next);
    if (Object.keys(next).length) {
      const firstInvalid = ["first", "last", "email", "phone"].find(k => next[k]);
      if (firstInvalid) document.getElementById(firstInvalid)?.focus();
      return;
    }

    setSubmitError("");
    setLoading(true);
    try {
      await submitLead(form, "Visit reservation");
      setSubmitted(true);
    } catch {
      setSubmitError("Something went wrong. Please try again, or call us at (443) 272-6794.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <Nav />

      {/* Hero */}
      <section style={{ background: "var(--cream)", padding: "140px clamp(20px,5vw,64px) 60px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: -80, right: -60, width: 360, height: 360, borderRadius: "50%", background: "radial-gradient(circle,#F15F22,#D62828 70%)", opacity: .1, filter: "blur(6px)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 780, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <Reveal>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)" }}>Plan Your Visit</span>
          </Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(46px,6.5vw,90px)", letterSpacing: "-2px", color: "var(--ink)", margin: "16px 0", lineHeight: .92 }}>
              We&apos;re ready<br />
              <span style={{ background: "linear-gradient(100deg,#F15F22,#D62828)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>for you.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p style={{ fontSize: "clamp(16px,1.8vw,19px)", color: "var(--ink-soft)", lineHeight: 1.65, maxWidth: 560, margin: "0 auto" }}>
              Your first visit sets the tone. Here&apos;s everything you need to know before you come.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Info cards */}
      <section style={{ background: "var(--cream-2)", padding: "80px clamp(20px,5vw,64px)" }}>
        <div className="r3" style={{ maxWidth: 1100, margin: "0 auto", gap: 18 }}>
          {[
            { icon: MapPin, title: "Address", value: "10710 Marriottsville Rd\nRandallstown, MD 21133", link: "https://maps.google.com/?q=10710+Marriottsville+Rd+Randallstown+MD+21133" },
            { icon: Clock, title: "Sunday Service", value: "Sunday School 9:25 AM\nService 10:30 AM ET", link: null },
            { icon: Phone, title: "Phone", value: "+1 443-272-6794\n+1 410-701-8315", link: "tel:+14432726794" },
          ].map((card, i) => (
            <Reveal key={card.title} delay={i * 80}>
              <div style={{ background: "var(--paper)", borderRadius: 20, padding: "28px 24px", border: "1px solid var(--line)", boxShadow: "0 8px 22px rgba(27,19,14,.05)" }}>
                <IconBadge icon={card.icon} style={{ marginBottom: 16 }} />
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "var(--red)", marginBottom: 8 }}>{card.title}</div>
                {card.link ? (
                  <a href={card.link} style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", textDecoration: "none", lineHeight: 1.6, display: "block", whiteSpace: "pre-line" }}>{card.value}</a>
                ) : (
                  <p style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", margin: 0, lineHeight: 1.6, whiteSpace: "pre-line" }}>{card.value}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Map placeholder + First Sunday steps */}
      <section style={{ background: "var(--cream)", padding: "80px clamp(20px,5vw,64px)" }}>
        <div className="r2" style={{ maxWidth: 1100, margin: "0 auto", gap: 60 }}>
          <Reveal>
            {/* Map placeholder */}
            <div style={{ height: 320, borderRadius: 20, background: "linear-gradient(135deg,var(--cream-2),#e8c9a8)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, border: "1px solid var(--line)", marginBottom: 20 }}>
              <MapPin size={18} strokeWidth={1.75} color="var(--red)" aria-hidden />
              <span style={{ color: "var(--ink-soft)", fontSize: 14 }}>10710 Marriottsville Rd, Randallstown MD</span>
            </div>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer" style={{ fontSize: 14, fontWeight: 700, color: "var(--red)", textDecoration: "none" }}>Get Directions →</a>
          </Reveal>
          <Reveal delay={140}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 32, color: "var(--ink)", margin: "0 0 28px" }}>Your First Sunday</h2>
            <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 22 }}>
              {[
                { num: "01", title: "Pick a service", body: "Sunday at 10:30 AM is our main gathering — perfect for a first visit." },
                { num: "02", title: "Arrive & be welcomed", body: "Our welcome team greets you at the door. Parking is available. Bring nothing but yourself." },
                { num: "03", title: "Experience worship", body: "Spirit-led worship, biblical teaching, and a warm, authentic community." },
                { num: "04", title: "Connect after service", body: "Stay for coffee and conversation. Fill out a connect card — no pressure." },
              ].map(s => (
                <li key={s.num} style={{ display: "flex", gap: 18, alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 24, color: "var(--red)", flexShrink: 0, minWidth: 40, lineHeight: 1, marginTop: 2 }}>{s.num}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: "var(--ink)", marginBottom: 4 }}>{s.title}</div>
                    <p style={{ fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.65, margin: 0 }}>{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "var(--cream-2)", padding: "80px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px,4vw,52px)", letterSpacing: "-1px", color: "var(--ink)", margin: 0 }}>FAQ</h2>
          </Reveal>
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 50}>
              <div style={{ borderBottom: "1px solid var(--line)" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
                >
                  <span style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)", paddingRight: 24 }}>{faq.q}</span>
                  <span style={{ color: "var(--red)", fontSize: 20, flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform .2s" }}>+</span>
                </button>
                {openFaq === i && (
                  <p style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.7, padding: "0 0 20px", margin: 0 }}>{faq.a}</p>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Newcomer form */}
      <section style={{ background: "var(--ink)", padding: "80px clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 620, margin: "0 auto" }}>
          <Reveal style={{ textAlign: "center", marginBottom: 44 }}>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(30px,4vw,52px)", letterSpacing: "-1px", color: "var(--cream)", margin: "0 0 14px" }}>Let us know you&apos;re coming</h2>
            <p style={{ fontSize: 16, color: "rgba(255,247,239,.6)", margin: 0 }}>We&apos;ll reach out before your first visit so you feel right at home.</p>
          </Reveal>
          <Reveal delay={80}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "48px", background: "rgba(255,247,239,.06)", borderRadius: 20, border: "1px solid rgba(255,247,239,.12)" }}>
                <PartyPopper size={44} strokeWidth={1.75} color="var(--gold)" aria-hidden style={{ margin: "0 auto 16px" }} />
                <p style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "#fff", margin: "0 0 8px" }}>You&apos;re on the list!</p>
                <p style={{ fontSize: 15, color: "rgba(255,247,239,.6)", margin: 0 }}>See you Sunday.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="r2" style={{ gap: 16 }}>
                {([
                  { id: "first", label: "First Name", placeholder: "Jane", type: "text", span: 1, required: true, autoComplete: "given-name", inputMode: "text" as const },
                  { id: "last", label: "Last Name", placeholder: "Smith", type: "text", span: 1, required: false, autoComplete: "family-name", inputMode: "text" as const },
                  { id: "email", label: "Email", placeholder: "jane@example.com", type: "email", span: 2, required: true, autoComplete: "email", inputMode: "email" as const },
                  { id: "phone", label: "Phone (optional)", placeholder: "(443) 000-0000", type: "tel", span: 2, required: false, autoComplete: "tel", inputMode: "tel" as const },
                ]).map(field => {
                  const err = errors[field.id];
                  return (
                    <div key={field.id} style={{ gridColumn: `span ${field.span}` }}>
                      <label htmlFor={field.id} style={{ display: "block", fontSize: 12, fontWeight: 700, color: "rgba(255,247,239,.45)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: 8 }}>
                        {field.label}{field.required && <span aria-hidden style={{ color: "var(--red)", marginLeft: 4 }}>*</span>}
                      </label>
                      <input
                        id={field.id} type={field.type} placeholder={field.placeholder}
                        inputMode={field.inputMode} autoComplete={field.autoComplete}
                        aria-required={field.required} aria-invalid={!!err}
                        aria-describedby={err ? `${field.id}-error` : undefined}
                        value={(form as Record<string, string>)[field.id]}
                        onChange={e => {
                          setForm(p => ({ ...p, [field.id]: e.target.value }));
                          if (err) setErrors(p => { const n = { ...p }; delete n[field.id]; return n; });
                        }}
                        style={{ width: "100%", background: "rgba(255,247,239,.07)", border: `1px solid ${err ? "#ff6b6b" : "rgba(255,247,239,.14)"}`, borderRadius: 14, padding: "14px 18px", fontSize: 15, color: "var(--cream)", fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
                      />
                      {err && <span id={`${field.id}-error`} role="alert" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#ff8a8a", marginTop: 6 }}>{err}</span>}
                    </div>
                  );
                })}
                <div style={{ gridColumn: "span 2" }}>
                  {submitError && <p role="alert" style={{ fontSize: 14, fontWeight: 600, color: "#ff8a8a", margin: "0 0 12px" }}>{submitError}</p>}
                  <button type="submit" disabled={loading} style={{ width: "100%", padding: "18px", borderRadius: 999, background: "var(--red)", color: "#fff", fontWeight: 800, fontSize: 16, border: "none", cursor: loading ? "wait" : "pointer", opacity: loading ? 0.6 : 1, boxShadow: "0 14px 30px rgba(214,40,40,.4)" }}>
                    {loading ? "Reserving…" : "Reserve My Spot →"}
                  </button>
                  <p style={{ fontSize: 12.5, color: "rgba(255,247,239,.4)", textAlign: "center", margin: "14px 0 0" }}>We&apos;ll only use your details to welcome you. No spam, ever.</p>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>

      <FooterExperience />
    </main>
  );
}
