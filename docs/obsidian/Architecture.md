---
project: cac-salvation-center
type: architecture
status: active
last_updated: 2026-08-22
tags: [project/cac-salvation-center]
---

# Architecture

See [[Project]] for stack overview.

## High-level shape

Single Next.js 16 App Router application, deployed to Vercel. No separate backend service — server-side logic lives in:

- **Route Handlers** (`app/api/*/route.ts`) — for things called from the client or by third parties (Stripe webhook, checkout session creation, contact form, gallery listing, Instagram feed proxy, Cloudinary signed-upload).
- **Server Actions** (`app/admin/(protected)/**/actions.ts`) — for the admin panel's CRUD operations (announcements, blog, events, gallery, store, orders, prayer, testimonies, newsletter, connect cards, admins).

## Public site (`app/`)

Route-per-page structure typical of App Router: `app/about`, `app/blog`, `app/events` (with several dedicated one-off event landing pages under `app/events/*`), `app/gallery`, `app/giving`, `app/ministries`, `app/prayer`, `app/store`, `app/visit`, `app/online`, `app/leadership`, `app/testimonies`, `app/calendar`, `app/bible-plan`, `app/devotional`, `app/salvation`, `app/venue`, plus a satellite congregation page `app/ilorin` and `app/salvationcity`. Also `app/sitemap.ts`, `app/robots.ts`, `app/manifest.ts`, and `app/llms.txt/route.ts` (an AI-crawler-facing text endpoint — notable, see [[Decisions]]).

Reusable homepage building blocks live in `components/sections/*` (Hero, Events, Gallery, PastorWelcome, PlanVisit, Watchword/VerseOfDay/DailyWord devotional widgets, StoreShelf, Testimonials, forms, etc.), generic UI primitives in `components/ui/*` (Reveal/Parallax/Magnetic animation wrappers, SearchModal, ScrollProgress), and nav/footer in `components/navigation` and within `components/sections/FooterExperience.tsx`.

## Admin panel (`app/admin`)

- `app/admin/login` — Supabase-auth login + password reset (`app/admin/reset`), public (unprotected) routes.
- `app/admin/(protected)/*` — route group gated by [[Security|admin auth]]; one subfolder per content type (admins, announcements, blog, connect, contact, events, gallery, newsletter, orders, prayer, store, testimonies), each typically with `page.tsx` (list), `[id]/page.tsx` (edit), `new/page.tsx` (create), and `actions.ts` (Server Actions doing the Supabase writes).
- `components/admin/*` — shared admin UI: `AdminShell`/`AdminSidebar` (layout/nav), `DashboardCards`, per-entity forms (`EventForm`, `PostForm`, `ProductForm`, `AnnouncementForm`, `GalleryImageForm`), `OrderActions`, `ForwardToStaff` (routes a contact/prayer submission to the right staff email), `NewsletterBroadcast`.

## Data layer

- `lib/supabase/client.ts` — browser Supabase client.
- `lib/supabase/server.ts` — server-side Supabase clients: a cookie-bound `createClient()` (respects the logged-in user/RLS) and a `createServiceClient()` (service-role key, bypasses RLS — used for admin reads/writes after `requireAdmin()` has already checked the caller is an authenticated admin).
- `lib/supabase/require-admin.ts` — the gate: confirms a Supabase session exists, then checks the user's id against an `admin_profiles` table via the service client; redirects to `/admin/login` (with `?error=unauthorized`) otherwise. See [[Security]].
- Content modules (`lib/blog.ts`, `lib/events.ts`, `lib/products.ts`, `lib/gallery-ids.json`, `lib/sermons.ts`, `lib/reviews.ts`, `lib/staff-directory.ts`, `lib/ilorinWords.ts`) mix **static, hand-authored data** (e.g. store products, Bible plan weeks in `lib/biblePlan.ts`, curated Google reviews in `lib/reviews.ts`) with **Supabase-backed dynamic data** (blog posts, events, announcements) — several pages fetch from Supabase at request/build time with try/catch fallbacks to keep prerendering/Preview deployments resilient when Supabase is unreachable (an explicit, named convention — see commit `76441e0` and [[Decisions]]).
- `lib/forms.ts`, `lib/feedback.ts` — shared form-submission helpers (contact, prayer, testimony, newsletter).
- `lib/rateLimit.ts` — simple in-memory per-IP rate limiter (resets on cold start; explicitly documented as good-enough for low traffic, with Upstash Redis named as the future upgrade if needed).
- `lib/search-index.ts` — powers `components/ui/SearchModal.tsx` site search.

## Integrations

- **Stripe** — `app/api/checkout/route.ts` creates a Checkout Session (validates cart items against `lib/products.ts`, rate-limited); `app/api/stripe/webhook/route.ts` handles `checkout.session.completed`, writes the order to Supabase, and sends confirmation emails via Resend to both customer and staff. See [[Payments]].
- **Resend** — transactional email (order confirmations, contact/prayer/connect-card/newsletter acknowledgements), all branded with the church logo (see commit `4ea8a4d`).
- **Cloudinary** — `app/api/cloudinary/sign/route.ts` issues signed upload params for the admin gallery/blog image uploads; `lib/cloudinary-loader.ts` is a custom Next.js `loader` so `next/image` serves Cloudinary-hosted assets without Vercel's own image-optimization quota (see commit `e36c685`).
- **Instagram** — `app/api/instagram/route.ts` proxies/embeds the church's Instagram feed for `components/sections/InstagramFeed.tsx`.

## Planned but not yet built

A full design spec and implementation plan exist for a **sermon-to-blog automation pipeline** (weekly cron job that transcribes new YouTube sermon uploads and publishes them as blog posts via Claude) at `docs/superpowers/specs/2026-08-02-sermon-to-blog-automation-design.md` and `docs/superpowers/plans/2026-08-02-sermon-to-blog-automation.md`. Not implemented yet — see [[Tasks]].
