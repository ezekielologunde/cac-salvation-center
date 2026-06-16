"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FadeUp } from "@/components/ui/RevealText";
import { CHURCH_DATA } from "@/lib/utils";

function SocialIcon({ platform }: { platform: string }) {
  const icons: Record<string, React.ReactNode> = {
    facebook: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
    instagram: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    youtube: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#030303" />
      </svg>
    ),
    tiktok: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.77a4.85 4.85 0 0 1-1-.08z" />
      </svg>
    ),
  };
  return icons[platform] ?? null;
}

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Events", href: "#events" },
  { label: "Sermons", href: "#sermons" },
  { label: "Plan a Visit", href: "#visit" },
];

export function FooterExperience() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(""); }
  }

  return (
    <footer className="relative bg-[#030303] overflow-hidden" role="contentinfo">
      {/* Immersive background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-gold/[0.05] blur-[120px]" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Closing CTA */}
        <div className="py-24 text-center">
          <FadeUp>
            <motion.div
              animate={{ opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-gold text-gold text-xs font-semibold tracking-widest uppercase mb-10"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden />
              Sunday 10:30 AM · In-Person &amp; Online
            </motion.div>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2
              className="text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[1.0] tracking-tight mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              <span className="text-white">Your story</span>
              <br />
              <span className="text-gradient-gold glow-text-gold">starts here.</span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="text-white/40 text-base max-w-md mx-auto mb-10 leading-relaxed">
              Whatever you&apos;re carrying, whatever you&apos;re searching for — there&apos;s a seat with your name on it.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#visit"
                className="px-7 py-3.5 rounded-xl bg-gold text-black text-sm font-bold hover:bg-gold-light transition-colors duration-200"
              >
                Plan Your Visit
              </a>
              <a
                href={`mailto:${CHURCH_DATA.email}`}
                className="px-7 py-3.5 rounded-xl glass text-white/70 hover:text-white text-sm font-semibold transition-colors duration-200"
              >
                Get in Touch
              </a>
            </div>
          </FadeUp>
        </div>

        {/* Newsletter */}
        <FadeUp delay={0.1}>
          <div className="glass rounded-2xl p-6 mb-16 flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div>
              <p className="text-sm font-bold text-white mb-0.5">Stay in the loop</p>
              <p className="text-xs text-white/40">Get weekly updates, sermon notes, and event announcements.</p>
            </div>
            {submitted ? (
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-sm font-semibold text-gold"
              >
                Thank you! You&apos;re on the list ✦
              </motion.p>
            ) : (
              <form onSubmit={handleSubmit} className="flex gap-2 w-full sm:w-auto" aria-label="Newsletter signup">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <input
                  id="newsletter-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 sm:w-52 bg-white/[0.06] border border-white/[0.1] rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/25 focus:outline-none focus:border-gold/50 transition-colors"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gold text-black text-sm font-bold hover:bg-gold-light transition-colors whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </FadeUp>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] py-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gold flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M8 1L5.5 5H1.5L4.5 8l-1 5L8 11l4.5 2-1-5 3-3H11L8 1Z" fill="#030303" />
              </svg>
            </div>
            <span className="text-sm font-semibold text-white/60">CAC Salvation Center</span>
          </div>

          {/* Nav links */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2" role="list">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <a href={l.href} className="text-xs text-white/35 hover:text-white/70 transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social */}
          <nav aria-label="Social media">
            <ul className="flex items-center gap-2" role="list">
              {(Object.entries(CHURCH_DATA.social) as [string, string][]).map(([platform, href]) => (
                <li key={platform}>
                  <a
                    href={href}
                    aria-label={`Follow us on ${platform}`}
                    className="w-8 h-8 glass rounded-lg flex items-center justify-center text-white/35 hover:text-white/70 hover:border-white/15 transition-all duration-200"
                  >
                    <SocialIcon platform={platform} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="text-center text-[11px] text-white/20 pb-8">
          &copy; {new Date().getFullYear()} Christ Apostolic Church Salvation Center · Randallstown, MD 21133
        </p>
      </div>
    </footer>
  );
}
