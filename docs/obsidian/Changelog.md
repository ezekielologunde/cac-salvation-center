---
project: cac-salvation-center
type: changelog
status: active
last_updated: 2026-08-22
tags: [project/cac-salvation-center]
---

# Changelog

Condensed from `git log` (reconstructed from full history after unshallowing the clone). See [[Project]] for current state.

## Foundational build-out
- Core public site pages, navigation, and information architecture established (home, about, ministries, events, visit, giving, store).
- Admin panel scaffolded with Supabase auth: announcements, blog, events, gallery, orders, prayer, testimonies, newsletter, contact, connect cards, store products, admin user management.
- Online store with Stripe Checkout, order confirmation emails via Resend, admin order management.
- Bible reading plan feature, added incrementally week by week (now through Week 33) — an ongoing, recurring content-update pattern rather than a one-time feature.

## Content & IA restructuring
- `40acf1f` Nav: restructure information architecture.
- `0c641ed` Nav: make Events menu featured events self-updating.
- `c5b0e18` Nav: fold events under the Events menu, no per-event links.
- `bdad9ee` Nav + footer: consolidate and tidy.
- `5a09ecc` Removed the choir page; `69c88e6` removed "Who we are" / "What people say" homepage sections — deliberate content simplification.
- `db1ffc4` Blog: 44 devotionals + Herald/Devotionals sort; choir page; children's corner; sisters list (large content commit).

## CAC family / affiliate integration
- `677c14a` 24th church anniversary event page; `6dfb19a` hybrid venue (in-person + Zoom).
- `7ea98d6` CACNA 2026 convention flyer details folded in.
- `ffd182b`, `e4c5a70`, `2389718`, `95d3f8c` — linking up the wider CAC family (CACNA, CAC Worldwide) with centralized, verified URLs and cross-links from the blog.
- `0bf2fbb` Ilorin satellite congregation page added (daily word, service times, TikTok, JSON-LD).

## Infrastructure & resilience
- `e36c685` Cut Vercel Image Optimization usage: offload gallery/Instagram images to source CDNs (Cloudinary).
- `76441e0` Fix Preview deployment failures: make build-time Supabase calls resilient (try/catch fallback pattern established).
- `7e8912d` Ignore local tooling artifacts (`.claude/`, `supabase/.temp/`).
- `9fc5528` Security: bump Next.js 16.2.7 → 16.2.12, pin `sharp` ≥0.35.3.

## Admin/auth hardening
- `9101e29` Admin: add self-service password reset flow.
- `0c8ef4f` Admin login: remove the "Forgot password?" button (superseded by the reset flow).

## SEO push
- Multiple dedicated commits: `0bd6fdf` (schema/keywords/reviews/breadcrumbs), `4936158` (keyworded H1), `23d113d` (rotating announcement bar), `3a02add` (blog structured data, event `lastModified`, noindex `/admin`), `045d64c` and `3e5e8fd` (Search Console rich-result error fixes), `5534408` (venue page retargeted for "hall rental" intent), `007b6df` (Search Console verification), `8f70b9f`/`a77e60d` (robots.txt cleanup of legacy WordPress paths).

## Forms & communications
- `50ef249` Improved search: weighted relevance, Google search fallback links.
- `86b942f` Department forward-to-staff picker on Contact & Prayer admin cards.
- `2d85a10` Fix newsletter signup: click-blocking overlay + RLS-blocked upsert.
- `a2d87da` Newsletter: harden against bad data, redesign the form.
- `ebd2fca` Fix Connect Card form: not submitting, now stored and visible in admin.
- `0627db4` Connect Card: send the submitter a confirmation email too.
- `4ea8a4d` Emails: add church logo to all headers, acknowledge every form that collects email.

## Recent (most recent commits at time of this audit)
- `0fac003` / `db99fb2` Sermon-to-blog automation: design spec and implementation plan added (not yet built — see [[Tasks]]).
- `5534408`, `045d64c`, `3e5e8fd` SEO fixes (Search Console warnings, venue page targeting).
- `b1c441e`, `7e56109`, `829b45d` Bible plan weeks 31–32 added, redesigned as mobile-first accordion.
- `6677735` Bible plan: Week 33 added (most recent commit as of this audit).
