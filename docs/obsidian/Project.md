---
project: cac-salvation-center
type: project-overview
status: active
last_updated: 2026-08-22
tags: [project/cac-salvation-center]
---

# CAC Salvation Center

## What it is

The public website and lightweight content-management backend for **Christ Apostolic Church Salvation Center**, a church in Randallstown, MD (part of the wider Christ Apostolic Church / CACNA family). It is a marketing/ministry site (home, about, ministries, events, blog, giving, store, visit info) plus a small custom admin panel for staff to manage content — not a generic CMS product.

Live domain: `https://www.cacsalvationcenter.org`.

## Stack

- **Framework:** Next.js 16.2 (App Router, React 19, TypeScript), deployed on Vercel.
- **Styling:** Tailwind CSS 4, plus hand-written inline `style={{...}}` objects for most page content (this is the dominant convention in `app/` and `components/sections`, not Tailwind classes).
- **Animation/UX:** Framer Motion, Lenis (smooth scroll).
- **Data/auth:** Supabase (Postgres + `@supabase/ssr` for server-rendered auth) — used for admin auth and as the datastore for dynamic content (announcements, blog, events, gallery, orders, prayer requests, testimonies, newsletter, contact, store products/orders).
- **Payments:** Stripe (`stripe` SDK) — checkout for the online store.
- **Email:** Resend — order confirmations, contact/prayer/newsletter acknowledgements, connect-card confirmations.
- **Images:** Cloudinary (signed uploads via `/api/cloudinary/sign`) for gallery/admin-uploaded images; a custom `lib/cloudinary-loader.ts` Next.js image loader.
- **Analytics:** Vercel Analytics + Speed Insights, Google Tag Manager/Ads/AdSense (env-var gated, see `components/analytics/GoogleTags.tsx`).
- **Other integrations:** Instagram feed embed (`/api/instagram`), Bible reading plan feature, sermon devotional content.

## Purpose

Give the church a professional public web presence (service times, visiting info, events, sermons/blog, online giving, small merchandise store) while letting non-technical staff manage day-to-day content (announcements, events, blog posts, gallery, prayer requests, testimonies, connect cards, newsletter, store) through a password-protected `/admin` area, without needing a third-party CMS.

## Scope notes / omissions

- **No `Database.md`** as a full schema doc: the actual Supabase schema (tables, RLS policies) is not present in this repository — there's no `supabase/migrations/` directory checked in. What's known about the data model is inferred from `lib/supabase/*`, admin `actions.ts` files, and the sermon-to-blog design spec's own migration snippet (see [[Decisions]] and [[Tasks]]). Treat schema details as inferred, not authoritative.
- **No `Backend.md`**: there's no separate backend service — "backend" here is Next.js Route Handlers under `app/api/*` and Server Actions under `app/admin/**/actions.ts`, both covered in [[Architecture]].
- **`Payments.md` included** — Stripe checkout is a real, implemented feature (see [[Payments]]).
- **`Security.md` included** — admin auth and RLS-adjacent patterns are visible in code and worth documenting.

## See also

- [[Architecture]]
- [[Features]]
- [[Decisions]]
- [[Security]]
- [[Payments]]
- [[Tasks]]
- [[Changelog]]
