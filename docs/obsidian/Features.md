---
project: cac-salvation-center
type: features
status: active
last_updated: 2026-08-22
tags: [project/cac-salvation-center]
---

# Features

See [[Architecture]] for how these are implemented.

## Implemented

- **Public marketing site**: home, about, ministries, leadership, visit/what-to-expect, venue/hall-rental info, online/watch-live (Zoom-first), youth, giving.
- **Events**: a general events listing plus several dedicated one-off landing pages (24th anniversary, CACNA 2026, Good Women anniversary, Macedonia outreach, pilgrimage 2026), a single source of truth for event ordering, and a homepage announcement bar that rotates through upcoming events automatically.
- **Blog / devotionals**: list + detail pages, mixing static devotional posts with Supabase-backed admin-authored posts; cross-links to the wider "CAC family" of sites (CACNA, CAC Worldwide, CAC Convention).
- **Bible reading plan**: `app/bible-plan`, a week-by-week accordion (`components/bible-plan/WeekAccordion.tsx`) built up incrementally in git history (weeks added one by one, currently through Week 33).
- **Gallery**: photo gallery fed by Cloudinary, admin-manageable.
- **Online store**: browsable products (`lib/products.ts`), cart (`contexts/CartContext.tsx`, `components/store/*`), Stripe Checkout, order confirmation emails, admin order management.
- **Giving**: dedicated giving page (implementation of the actual payment/redirect mechanism should be verified in `app/giving/page.tsx` before relying on this note — not deeply audited here).
- **Forms with staff notification**: contact, prayer request, testimony, newsletter signup, "connect card" — each stores to Supabase, emails an acknowledgement to the submitter, and can be forwarded to a specific staff member/department (`components/admin/ForwardToStaff.tsx`).
- **Newsletter**: signup form + admin broadcast tool (`components/admin/NewsletterBroadcast.tsx`).
- **Admin panel** (`/admin`): password-protected, Supabase-auth-based, self-service password reset, manages admins/announcements/blog/connect cards/contact/events/gallery/newsletter/orders/prayer/store/testimonies.
- **Satellite/affiliated congregation pages**: `app/ilorin` (a sister assembly with its own daily word, service times, TikTok link) and `app/salvationcity`.
- **SEO / structured data**: sitemap, robots.txt, JSON-LD (Event, VideoObject, Organization/reviews), Search Console verification, an `llms.txt` route aimed at AI crawlers, and multiple targeted commits fixing Google Search Console rich-result warnings.
- **Search**: in-site search modal (`components/ui/SearchModal.tsx`, `lib/search-index.ts`) with weighted relevance and links out to Google site/web search for anything not found locally.
- **Analytics**: Vercel Analytics/Speed Insights + optional GA4/Google Ads/AdSense (env-gated).
- **Instagram feed embed** on the homepage.

## Partial / worth double-checking

- **Giving page payment flow** — page exists; exact mechanism (external link vs. in-app payment) not verified against code in this audit.
- **Rate limiting** is in-memory per server instance only — fine for current traffic, will silently under-protect if traffic/instance count grows (see [[Decisions]]).

## Planned, not implemented

- **Sermon-to-blog automation**: weekly cron pulls new YouTube sermon uploads from a curated playlist, transcribes them, and has Claude generate + auto-publish a devotional-style blog post (no human approval step). Fully spec'd and planned (see `docs/superpowers/`) but no corresponding code exists yet — no `app/api/cron/scan-sermons`, no `lib/transcript.ts`/`lib/sermonArticle.ts`, no new Supabase columns/migration file. See [[Tasks]].

## Deprecated / removed

- Choir page (removed, commit `5a09ecc`).
- "Who we are" / "What people say" homepage sections (removed, commit `69c88e6`).
- "Forgot password?" button on admin login (removed in favor of the self-service reset flow, commit `0c8ef4f`).
