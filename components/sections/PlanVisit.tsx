"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, ChevronDown } from "lucide-react";
import { FadeUp } from "@/components/ui/RevealText";
import { CHURCH_DATA } from "@/lib/utils";

const steps = [
  { num: "01", title: "Pick a service", body: "Sunday at 10:30 AM is our main gathering — perfect for a first visit. Or join us online for any mid-week service from anywhere." },
  { num: "02", title: "Arrive & be welcomed", body: "Our welcome team will greet you at the door. Parking is available. Bring nothing but yourself — we'll handle the rest." },
  { num: "03", title: "Experience worship", body: "Expect spirit-led worship, biblical teaching from Pastor Ilufoye, and a warm, authentic community atmosphere." },
  { num: "04", title: "Connect after service", body: "Stay after for coffee and conversation. Fill out a connect card and we'll reach out — no pressure, just genuine welcome." },
];

const faqs = [
  { q: "What should I wear?", a: "Come as you are. Some dress formally, others casually — all are equally welcome." },
  { q: "How long is the service?", a: "Sunday services typically run about 2 hours (10:30 AM – 12:30 PM ET)." },
  { q: "Do you have childcare?", a: "Yes, we have a dedicated Kids Ministry for children during Sunday service." },
  { q: "Can I join online?", a: "Absolutely. All Sunday services are streamed live. Wednesday Bible Study and Friday Wakati Itusile are online-only." },
  { q: "Is the Yoruba service for non-Yoruba speakers?", a: "Wakati Itusile is primarily in Yoruba, celebrating our diaspora community. All are warmly welcome." },
];

function FaqItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-white/[0.06] last:border-0"
    >
      <button
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors pr-6">
          {faq.q}
        </span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={16} className="text-white/35 flex-shrink-0" aria-hidden />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-white/45 leading-relaxed pb-5">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function PlanVisit() {
  return (
    <section id="visit" className="bg-[#030303] section-pad" aria-labelledby="visit-heading">
      <div className="max-w-5xl mx-auto px-6">
        <FadeUp className="text-center mb-20">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-gold mb-4">Plan Your Visit</p>
          <h2
            id="visit-heading"
            className="text-[clamp(2rem,5vw,3.5rem)] font-black text-white leading-[1.1]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            We&apos;re ready for you.
          </h2>
          <p className="mt-4 text-white/40 max-w-lg mx-auto text-base leading-relaxed">
            Your first visit sets the tone. Here&apos;s everything you need to know.
          </p>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Steps */}
          <FadeUp>
            <h3 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-8">Your First Sunday</h3>
            <ol className="space-y-8" aria-label="Steps for your first visit">
              {steps.map((s) => (
                <li key={s.num} className="flex gap-5">
                  <span
                    className="text-2xl font-black text-gradient-gold flex-shrink-0 leading-none mt-0.5"
                    style={{ fontFamily: "var(--font-playfair)" }}
                    aria-hidden
                  >
                    {s.num}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">{s.title}</h4>
                    <p className="text-sm text-white/45 leading-relaxed">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </FadeUp>

          {/* Contact + FAQ */}
          <FadeUp delay={0.15}>
            {/* Contact info */}
            <h3 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-8">Find Us</h3>
            <ul className="space-y-5 mb-10" role="list">
              <li className="flex items-start gap-4">
                <div className="w-9 h-9 glass rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={15} className="text-gold" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-0.5">Address</p>
                  <p className="text-sm text-white/70">{CHURCH_DATA.address}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-9 h-9 glass rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={15} className="text-gold" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-0.5">Phone</p>
                  {CHURCH_DATA.phone.map((p) => (
                    <a key={p} href={`tel:${p.replace(/\D/g, "")}`} className="block text-sm text-white/70 hover:text-gold transition-colors">
                      {p}
                    </a>
                  ))}
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-9 h-9 glass rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail size={15} className="text-gold" aria-hidden />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-0.5">Email</p>
                  <a href={`mailto:${CHURCH_DATA.email}`} className="text-sm text-white/70 hover:text-gold transition-colors">
                    {CHURCH_DATA.email}
                  </a>
                </div>
              </li>
            </ul>

            {/* FAQ */}
            <h3 className="text-xs font-bold tracking-widest uppercase text-white/40 mb-2">FAQ</h3>
            <div role="list">
              {faqs.map((f, i) => (
                <FaqItem key={f.q} faq={f} index={i} />
              ))}
            </div>
          </FadeUp>
        </div>

        {/* Newcomer form */}
        <FadeUp delay={0.2}>
          <div className="glass-gold rounded-3xl p-8 md:p-10">
            <h3
              className="text-2xl font-black text-white mb-1"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Stay Connected
            </h3>
            <p className="text-sm text-white/45 mb-7">Fill this out and we&apos;ll reach out before your first visit.</p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="grid sm:grid-cols-2 gap-4"
              aria-label="Newcomer connection form"
            >
              {["First Name", "Last Name"].map((label) => (
                <div key={label}>
                  <label className="block text-xs font-semibold text-white/40 mb-1.5" htmlFor={label.toLowerCase().replace(" ", "-")}>
                    {label}
                  </label>
                  <input
                    id={label.toLowerCase().replace(" ", "-")}
                    type="text"
                    placeholder={label === "First Name" ? "Jane" : "Smith"}
                    className="w-full bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
              ))}
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-white/40 mb-1.5" htmlFor="email-input">Email</label>
                <input
                  id="email-input"
                  type="email"
                  placeholder="jane@example.com"
                  className="w-full bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold/50 transition-colors"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-white/40 mb-1.5" htmlFor="message-input">Message (optional)</label>
                <textarea
                  id="message-input"
                  rows={3}
                  placeholder="Tell us a bit about yourself…"
                  className="w-full bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                />
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gold text-black font-bold text-sm hover:bg-gold-light transition-colors duration-200"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
