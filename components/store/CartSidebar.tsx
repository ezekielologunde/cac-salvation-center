"use client";

import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import { X, Minus, Plus, ShoppingBag, Trash2, CreditCard, Shield } from "lucide-react";

function fmt(cents: number) {
  return `$${(cents / 100).toFixed(2)}`;
}

export function CartSidebar() {
  const { items, open, closeCart, setQty, removeItem, totalCents, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Could not connect to checkout. Please try again.");
      setLoading(false);
    }
  }

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          role="presentation"
          onClick={closeCart}
          style={{
            position: "fixed", inset: 0, background: "rgba(27,19,14,.55)",
            zIndex: 998, backdropFilter: "blur(2px)",
          }}
        />
      )}

      {/* Drawer */}
      <aside
        aria-label="Shopping cart"
        aria-hidden={!open}
        style={{
          position: "fixed", top: 0, right: 0, bottom: 0,
          width: "min(420px, 100vw)",
          background: "var(--cream)", zIndex: 999,
          display: "flex", flexDirection: "column",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform .3s cubic-bezier(.4,0,.2,1)",
          boxShadow: "-8px 0 40px rgba(27,19,14,.18)",
        }}
      >
        {/* Header */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "22px 24px 18px",
          borderBottom: "1px solid var(--line)", flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ShoppingBag size={18} strokeWidth={2} color="var(--ink)" aria-hidden />
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 20, color: "var(--ink)" }}>
              Your cart
            </span>
            {items.length > 0 && (
              <span style={{
                background: "var(--red)", color: "#fff", borderRadius: 999,
                fontSize: 11, fontWeight: 800, padding: "2px 8px",
              }}>{items.reduce((s, i) => s + i.quantity, 0)}</span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 6, color: "var(--ink-soft)" }}
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
          {items.length === 0 ? (
            <div style={{ textAlign: "center", paddingTop: 80 }}>
              <ShoppingBag size={48} color="var(--line)" strokeWidth={1.5} aria-hidden />
              <p style={{ marginTop: 16, color: "var(--ink-soft)", fontSize: 15 }}>Your cart is empty.</p>
              <button
                onClick={closeCart}
                style={{ marginTop: 16, background: "none", border: "none", color: "var(--red)", fontWeight: 700, fontSize: 14, cursor: "pointer" }}
              >
                Continue shopping →
              </button>
            </div>
          ) : (
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 14 }}>
              {items.map((item) => {
                const key = item.variant ? `${item.id}::${item.variant}` : item.id;
                return (
                  <li key={key} style={{
                    background: "var(--paper)", border: "1px solid var(--line)",
                    borderRadius: 16, padding: "14px 16px",
                    display: "flex", gap: 14, alignItems: "flex-start",
                  }}>
                    {/* Color swatch */}
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: item.accent, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "var(--ink)", lineHeight: 1.3 }}>{item.name}</div>
                      {item.variant && (
                        <div style={{ fontSize: 12, color: "var(--ink-soft)", marginTop: 2 }}>{item.variant}</div>
                      )}
                      {item.isDigital && (
                        <div style={{ fontSize: 11, color: "var(--gold)", fontWeight: 700, marginTop: 2 }}>Digital download</div>
                      )}
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 10 }}>
                        {/* Quantity */}
                        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "var(--cream-2)", borderRadius: 999, padding: "4px 10px" }}>
                          <button
                            onClick={() => setQty(item.id, item.variant, item.quantity - 1)}
                            aria-label="Decrease quantity"
                            style={{ background: "none", border: "none", cursor: "pointer", padding: 2, color: "var(--ink)", display: "flex" }}
                          >
                            <Minus size={13} strokeWidth={2.5} />
                          </button>
                          <span style={{ fontSize: 14, fontWeight: 700, minWidth: 16, textAlign: "center" }}>{item.quantity}</span>
                          <button
                            onClick={() => setQty(item.id, item.variant, item.quantity + 1)}
                            aria-label="Increase quantity"
                            style={{ background: "none", border: "none", cursor: "pointer", padding: 2, color: "var(--ink)", display: "flex" }}
                          >
                            <Plus size={13} strokeWidth={2.5} />
                          </button>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                          <span style={{ fontWeight: 800, fontSize: 14, color: "var(--ink)" }}>
                            {fmt(item.priceCents * item.quantity)}
                          </span>
                          <button
                            onClick={() => removeItem(item.id, item.variant)}
                            aria-label={`Remove ${item.name}`}
                            style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "var(--ink-soft)" }}
                          >
                            <Trash2 size={14} strokeWidth={2} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{
            borderTop: "1px solid var(--line)", padding: "20px 24px 28px",
            flexShrink: 0, background: "var(--cream)",
          }}>
            {/* Order note for digital items */}
            {items.some((i) => i.isDigital) && (
              <div style={{ fontSize: 12, color: "var(--ink-soft)", marginBottom: 14, lineHeight: 1.6 }}>
                Digital downloads will be delivered via email within 24 hours of payment.
              </div>
            )}
            {/* Subtotal */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)" }}>Subtotal</span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "var(--ink)" }}>
                {fmt(totalCents)}
              </span>
            </div>
            {error && (
              <div style={{ background: "#FFF0F0", border: "1px solid #D62828", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#9E1B1B", marginBottom: 14 }}>
                {error}
              </div>
            )}
            <button
              onClick={handleCheckout}
              disabled={loading}
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
                background: loading ? "var(--ink-soft)" : "var(--red)",
                color: "#fff", fontWeight: 800, fontSize: 16,
                padding: "16px 24px", borderRadius: 999, border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                boxShadow: "0 10px 28px rgba(214,40,40,.32)",
                transition: "background .2s",
              }}
            >
              <CreditCard size={17} strokeWidth={2.2} aria-hidden />
              {loading ? "Redirecting…" : "Proceed to Checkout"}
            </button>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 12, fontSize: 12, color: "var(--ink-soft)" }}>
              <Shield size={12} strokeWidth={2} aria-hidden />
              Secure payment powered by Stripe
            </div>
            <button
              onClick={clearCart}
              style={{ display: "block", width: "100%", background: "none", border: "none", cursor: "pointer", marginTop: 10, fontSize: 12.5, color: "var(--ink-soft)", textAlign: "center" }}
            >
              Clear cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
