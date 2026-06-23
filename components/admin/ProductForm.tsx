"use client";

import { useState, useTransition } from "react";
import { createProduct, updateProduct, deleteProduct } from "@/app/admin/(protected)/store/actions";

type Product = {
  id: string;
  name: string;
  category: string;
  description: string | null;
  price_display: string;
  price_cents: number;
  badge: string | null;
  image_url: string | null;
  image_alt: string | null;
  order_method: string;
  stripe_price_id: string | null;
  external_link: string | null;
  external_label: string | null;
  published: boolean;
  sort_order: number;
};

const inp: React.CSSProperties = {
  width: "100%",
  padding: "10px 14px",
  border: "1.5px solid rgba(0,0,0,0.12)",
  borderRadius: 8,
  fontSize: 15,
  fontFamily: "inherit",
  background: "white",
  boxSizing: "border-box",
  outline: "none",
};

const label: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: "var(--ink)",
  marginBottom: 6,
};

const muted: React.CSSProperties = { fontWeight: 400, opacity: 0.5 };

export default function ProductForm({ product }: { product?: Product }) {
  const isEdit = !!product;
  const [name, setName] = useState(product?.name ?? "");
  const [category, setCategory] = useState(product?.category ?? "apparel");
  const [description, setDescription] = useState(product?.description ?? "");
  const [priceDisplay, setPriceDisplay] = useState(product?.price_display ?? "");
  const [priceCents, setPriceCents] = useState(product?.price_cents ?? 0);
  const [badge, setBadge] = useState(product?.badge ?? "");
  const [imageUrl, setImageUrl] = useState(product?.image_url ?? "");
  const [imageAlt, setImageAlt] = useState(product?.image_alt ?? "");
  const [orderMethod, setOrderMethod] = useState(product?.order_method ?? "email");
  const [stripePriceId, setStripePriceId] = useState(product?.stripe_price_id ?? "");
  const [externalLink, setExternalLink] = useState(product?.external_link ?? "");
  const [externalLabel, setExternalLabel] = useState(product?.external_label ?? "");
  const [published, setPublished] = useState(product?.published ?? false);
  const [sortOrder, setSortOrder] = useState(product?.sort_order ?? 0);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setSaved(false);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      try {
        if (isEdit) {
          await updateProduct(product.id, formData);
          setSaved(true);
        } else {
          await createProduct(formData);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save");
      }
    });
  }

  function handleDelete() {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    startTransition(async () => {
      try {
        await deleteProduct(product!.id);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to delete");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 720 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

        <div>
          <label style={label}>Name *</label>
          <input
            name="name"
            value={name}
            onChange={(e) => { setName(e.target.value); setSaved(false); }}
            required
            style={inp}
          />
        </div>

        <div>
          <label style={label}>Category *</label>
          <select
            name="category"
            value={category}
            onChange={(e) => { setCategory(e.target.value); setSaved(false); }}
            required
            style={inp}
          >
            <option value="apparel">Apparel</option>
            <option value="bibles">Bibles</option>
            <option value="music">Music</option>
            <option value="prints">Prints</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label style={label}>Description <span style={muted}>— optional</span></label>
          <textarea
            name="description"
            value={description}
            onChange={(e) => { setDescription(e.target.value); setSaved(false); }}
            rows={3}
            style={{ ...inp, resize: "vertical" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          <div>
            <label style={label}>Price Display *</label>
            <input
              name="price_display"
              value={priceDisplay}
              onChange={(e) => { setPriceDisplay(e.target.value); setSaved(false); }}
              required
              placeholder="e.g. $29.99"
              style={inp}
            />
          </div>
          <div>
            <label style={label}>Price (cents) <span style={muted}>— optional</span></label>
            <input
              type="number"
              name="price_cents"
              value={priceCents}
              min={0}
              onChange={(e) => { setPriceCents(parseInt(e.target.value, 10) || 0); setSaved(false); }}
              style={inp}
            />
          </div>
        </div>

        <div>
          <label style={label}>Badge <span style={muted}>— optional, e.g. "New", "Bestseller"</span></label>
          <input
            name="badge"
            value={badge}
            onChange={(e) => { setBadge(e.target.value); setSaved(false); }}
            style={inp}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
          <div>
            <label style={label}>Image URL <span style={muted}>— optional</span></label>
            <input
              type="url"
              name="image_url"
              value={imageUrl}
              onChange={(e) => { setImageUrl(e.target.value); setSaved(false); }}
              placeholder="https://…"
              style={inp}
            />
          </div>
          <div>
            <label style={label}>Image Alt Text <span style={muted}>— optional</span></label>
            <input
              name="image_alt"
              value={imageAlt}
              onChange={(e) => { setImageAlt(e.target.value); setSaved(false); }}
              style={inp}
            />
          </div>
        </div>

        <div>
          <label style={label}>Order Method *</label>
          <select
            name="order_method"
            value={orderMethod}
            onChange={(e) => { setOrderMethod(e.target.value); setSaved(false); }}
            required
            style={inp}
          >
            <option value="email">Email</option>
            <option value="stripe">Stripe</option>
            <option value="external">External</option>
          </select>
        </div>

        {orderMethod === "stripe" && (
          <div>
            <label style={label}>Stripe Price ID <span style={muted}>— optional</span></label>
            <input
              name="stripe_price_id"
              value={stripePriceId}
              onChange={(e) => { setStripePriceId(e.target.value); setSaved(false); }}
              placeholder="price_…"
              style={inp}
            />
          </div>
        )}

        {orderMethod === "external" && (
          <>
            <div>
              <label style={label}>External Link <span style={muted}>— optional</span></label>
              <input
                type="url"
                name="external_link"
                value={externalLink}
                onChange={(e) => { setExternalLink(e.target.value); setSaved(false); }}
                placeholder="https://…"
                style={inp}
              />
            </div>
            <div>
              <label style={label}>External Label <span style={muted}>— optional, e.g. "Order via Etsy"</span></label>
              <input
                name="external_label"
                value={externalLabel}
                onChange={(e) => { setExternalLabel(e.target.value); setSaved(false); }}
                style={inp}
              />
            </div>
          </>
        )}

        {/* hidden fields for conditional inputs not shown */}
        {orderMethod !== "stripe" && <input type="hidden" name="stripe_price_id" value="" />}
        {orderMethod !== "external" && (
          <>
            <input type="hidden" name="external_link" value="" />
            <input type="hidden" name="external_label" value="" />
          </>
        )}

        <div>
          <label style={label}>Sort Order</label>
          <input
            type="number"
            name="sort_order"
            value={sortOrder}
            onChange={(e) => { setSortOrder(parseInt(e.target.value, 10) || 0); setSaved(false); }}
            style={{ ...inp, width: 120 }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <input type="hidden" name="published" value={published ? "true" : "false"} />
          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: "var(--ink)" }}>
            <input
              type="checkbox"
              checked={published}
              onChange={(e) => { setPublished(e.target.checked); setSaved(false); }}
              style={{ width: 16, height: 16, cursor: "pointer" }}
            />
            Publish (visible on site)
          </label>
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", paddingTop: 8 }}>
          <button
            type="submit"
            disabled={isPending}
            style={{
              background: isPending ? "#999" : "var(--red)",
              color: "white",
              border: "none",
              borderRadius: 8,
              padding: "10px 24px",
              fontSize: 14,
              fontWeight: 600,
              cursor: isPending ? "not-allowed" : "pointer",
              fontFamily: "inherit",
            }}
          >
            {isPending ? "Saving…" : isEdit ? "Save Changes" : "Create Product"}
          </button>

          {isEdit && (
            <button
              type="button"
              onClick={handleDelete}
              disabled={isPending}
              style={{
                background: "transparent",
                color: "#dc2626",
                border: "1.5px solid #dc2626",
                borderRadius: 8,
                padding: "9px 20px",
                fontSize: 14,
                fontWeight: 600,
                cursor: isPending ? "not-allowed" : "pointer",
                fontFamily: "inherit",
              }}
            >
              Delete
            </button>
          )}

          {error && <p style={{ color: "#dc2626", fontSize: 14, margin: 0 }}>{error}</p>}
          {saved && <p style={{ color: "#16a34a", fontSize: 14, margin: 0 }}>Saved!</p>}
        </div>

      </div>
    </form>
  );
}
