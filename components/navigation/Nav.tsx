"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Events", href: "#events" },
  { label: "Sermons", href: "#sermons" },
  { label: "Visit", href: "#visit" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "py-3 bg-[#030303]/80 backdrop-blur-xl border-b border-white/[0.06]"
            : "py-5"
        )}
        role="banner"
      >
        <nav
          className="max-w-6xl mx-auto px-6 flex items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <a href="/" aria-label="CAC Salvation Center home" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-gold flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M8 1L5.5 5H1.5L4.5 8l-1 5L8 11l4.5 2-1-5 3-3H11L8 1Z" fill="#030303" />
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-tight text-white/90 group-hover:text-white transition-colors">
              CAC Salvation Center
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1" role="list">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="px-4 py-2 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/[0.06] transition-all duration-200"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#visit"
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gold text-black text-sm font-semibold hover:bg-gold-light transition-colors duration-200"
            >
              Plan Your Visit
            </a>
            <button
              onClick={() => setOpen((p) => !p)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg glass text-white/70 hover:text-white transition-colors"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={close}
              aria-hidden
            />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-label="Navigation menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
              className="fixed right-0 top-0 h-full w-72 z-50 bg-[#0a0a0a] border-l border-white/[0.07] p-8 flex flex-col md:hidden"
            >
              <button onClick={close} className="self-end mb-8 text-white/50 hover:text-white" aria-label="Close menu">
                <X size={20} />
              </button>
              <ul className="flex flex-col gap-2" role="list">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <a
                      href={l.href}
                      onClick={close}
                      className="block py-3 px-4 text-lg font-medium text-white/70 hover:text-white rounded-xl hover:bg-white/[0.06] transition-all"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="mt-auto"
              >
                <a
                  href="#visit"
                  onClick={close}
                  className="block w-full py-3 text-center rounded-xl bg-gold text-black font-semibold text-sm"
                >
                  Plan Your Visit
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
