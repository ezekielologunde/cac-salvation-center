---
project: cac-salvation-center
type: security
status: active
last_updated: 2026-08-22
tags: [project/cac-salvation-center]
---

# Security

See [[Architecture]] for the data layer this builds on.

## Admin authentication

- Supabase Auth (email/password) gates `/admin`. `lib/supabase/require-admin.ts` is the single choke point: it requires a valid Supabase session **and** a matching row in an `admin_profiles` table (checked via the service-role client, bypassing RLS for that lookup) before allowing access — i.e. having a Supabase account alone is not enough, the account must also be provisioned as an admin.
- Unauthenticated → redirect to `/admin/login`. Authenticated but not provisioned → redirect to `/admin/login?error=unauthorized`.
- Self-service password reset flow exists (commit `9101e29`); the old "Forgot password?" button was intentionally removed afterward (commit `0c8ef4f`) — reset is reached a different way now (verify current entry point in `app/admin/reset` if this matters for support).
- `admins` section of the admin panel (`app/admin/(protected)/admins`) manages who has admin access.

## Service-role key usage

`lib/supabase/server.ts` exposes `createServiceClient()` (service-role key, bypasses RLS). It's used for:
- The `admin_profiles` check inside `requireAdmin()`.
- Admin CRUD actions, after `requireAdmin()` has already run.
- The Stripe checkout route and webhook (server-only, never exposed to the client).

This is a reasonable pattern **as long as** every route/action that calls `createServiceClient()` is either behind `requireAdmin()` or is itself a server-only, unauthenticated-by-design endpoint (webhook, checkout). Worth a periodic grep for `createServiceClient` call sites to confirm none leak into a client-reachable path without a preceding auth check.

## RLS

Actual Postgres Row Level Security policies are not visible in this repo (no `supabase/migrations/` checked in), so they can't be audited from code — see the note in [[Project]]. The `2d85a10` commit ("Fix newsletter signup: click-blocking overlay + RLS-blocked upsert") confirms RLS is in active use on at least the newsletter table and has previously blocked a legitimate write; this is a hint that policies are per-table and worth checking directly in the Supabase project when doing schema work.

## Stripe webhook

`app/api/stripe/webhook/route.ts` should verify the Stripe signature header before trusting event payloads — standard practice for any Stripe webhook handler. Confirm this is present (`stripe.webhooks.constructEvent`) when touching this file; not exhaustively re-verified line-by-line in this audit pass.

## Rate limiting

In-memory only (`lib/rateLimit.ts`), applied to at least the checkout route. Resets on cold start and doesn't share state across serverless instances — acceptable for current traffic, a real gap if the site scales or comes under targeted abuse. See [[Decisions]] and [[Tasks]].

## Secrets

No `.env.example` is checked into the repo, so required env vars are only discoverable from source (`STRIPE_SECRET_KEY`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GOOGLE_ADS_ID`, `NEXT_PUBLIC_ADSENSE_ID`, Resend/Cloudinary/Supabase keys, and — per the sermon-to-blog plan — future `YOUTUBE_API_KEY`, `SERMON_PLAYLIST_ID`, `ANTHROPIC_API_KEY`, `CRON_SECRET`). Consider adding a `.env.example` for onboarding (see [[Tasks]]).
