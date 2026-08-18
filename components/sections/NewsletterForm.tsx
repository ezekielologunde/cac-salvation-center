"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, ArrowRight, Check, Loader2 } from "lucide-react";
import { subscribeAction } from "@/app/newsletter/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-label="Subscribe"
      style={{
        flexShrink: 0,
        width: 40,
        height: 40,
        margin: 4,
        borderRadius: "50%",
        background: pending ? "rgba(214,40,40,.5)" : "linear-gradient(135deg,#F15F22,#D62828)",
        color: "#fff",
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: pending ? "not-allowed" : "pointer",
        boxShadow: pending ? "none" : "0 6px 16px rgba(214,40,40,.4)",
        transition: "box-shadow .2s, transform .15s",
      }}
      onMouseEnter={(e) => { if (!pending) e.currentTarget.style.transform = "scale(1.06)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
    >
      {pending ? (
        <motion.span
          animate={{ rotate: 360 }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex" }}
        >
          <Loader2 size={17} strokeWidth={2.5} aria-hidden />
        </motion.span>
      ) : (
        <ArrowRight size={17} strokeWidth={2.5} aria-hidden />
      )}
    </button>
  );
}

export function NewsletterForm() {
  const [state, action] = useActionState(subscribeAction, null);

  return (
    <div>
      <AnimatePresence mode="wait">
        {state?.ok ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 18px",
              background: "rgba(22,163,74,.14)",
              border: "1px solid rgba(22,163,74,.3)",
              borderRadius: 999,
              fontSize: 14.5,
              fontWeight: 600,
              color: "#86efac",
            }}
          >
            <span style={{
              flexShrink: 0, width: 22, height: 22, borderRadius: "50%",
              background: "rgba(22,163,74,.25)", display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Check size={13} strokeWidth={3} aria-hidden />
            </span>
            {state.message}
          </motion.div>
        ) : (
          <motion.form
            key="form"
            action={action}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={{ display: "flex", flexDirection: "column", gap: 10 }}
          >
            {/* Honeypot — hidden from real visitors, bots tend to fill every field */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              style={{ position: "absolute", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
            />

            <div
              className="newsletter-pill"
              style={{
                display: "flex",
                alignItems: "center",
                background: "rgba(255,247,239,.06)",
                border: "1px solid rgba(255,247,239,.16)",
                borderRadius: 999,
                transition: "border-color .2s, background .2s, box-shadow .2s",
              }}
            >
              <Mail size={16} strokeWidth={2} style={{ flexShrink: 0, marginLeft: 18, color: "rgba(255,247,239,.4)" }} aria-hidden />
              <input
                name="email"
                type="email"
                required
                maxLength={254}
                placeholder="Your email address"
                style={{
                  flex: 1,
                  minWidth: 0,
                  height: 48,
                  padding: "0 10px 0 10px",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontSize: 14.5,
                  color: "#fff",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => {
                  const pill = e.currentTarget.closest(".newsletter-pill") as HTMLElement | null;
                  if (pill) { pill.style.borderColor = "rgba(232,163,61,.5)"; pill.style.boxShadow = "0 0 0 3px rgba(232,163,61,.12)"; }
                }}
                onBlur={(e) => {
                  const pill = e.currentTarget.closest(".newsletter-pill") as HTMLElement | null;
                  if (pill) { pill.style.borderColor = "rgba(255,247,239,.16)"; pill.style.boxShadow = "none"; }
                }}
              />
              <SubmitButton />
            </div>

            <AnimatePresence>
              {state && !state.ok && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ fontSize: 13, color: "#fca5a5", margin: 0, paddingLeft: 4 }}
                >
                  {state.message}
                </motion.p>
              )}
            </AnimatePresence>

            <p style={{ fontSize: 11.5, color: "rgba(255,247,239,.32)", margin: "2px 0 0 4px" }}>
              No spam, ever. Unsubscribe anytime.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
