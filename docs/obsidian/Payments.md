---
project: cac-salvation-center
type: payments
status: active
last_updated: 2026-08-22
tags: [project/cac-salvation-center]
---

# Payments

See [[Architecture]] and [[Security]].

## Provider

Stripe, via the `stripe` npm SDK. Used for the online store (`app/store`) checkout only — this is the site's only in-app payment flow verified in code (the `/giving` page's mechanism was not independently confirmed in this audit; check `app/giving/page.tsx` directly if documenting donations).

## Flow

1. Client builds a cart (`contexts/CartContext.tsx`, `components/store/*`) from `lib/products.ts` (static product catalog — id, category, price, order method: `stripe` | `external` | `email`). Not every product goes through Stripe — `orderMethod` lets a product instead link out externally or route to an email order.
2. `POST /api/checkout` (`app/api/checkout/route.ts`):
   - Rate-limited per IP (`lib/rateLimit.ts`, 20 req/min).
   - Validates `STRIPE_SECRET_KEY` is present and correctly formatted (`sk_`/`rk_` prefix) before doing anything, returning a 503 with a clear message otherwise.
   - Validates cart items against the known product catalog server-side (not just trusting client-submitted prices — reduces price-tampering risk).
   - Creates a Stripe Checkout Session and returns its URL for redirect.
3. `POST /api/stripe/webhook` (`app/api/stripe/webhook/route.ts`) handles `checkout.session.completed`:
   - Writes the completed order to Supabase via the service-role client.
   - Sends a customer confirmation email and a staff notification email via Resend, both branded with the church logo.
4. `app/store/success/page.tsx` — post-checkout landing page.
5. Admin can view/manage orders under `app/admin/(protected)/orders`.

## Notes

- Webhook signature verification should be confirmed present (standard Stripe requirement) — see [[Security]].
- No subscription/recurring billing — one-time Checkout Sessions only, consistent with a small church merchandise store.
