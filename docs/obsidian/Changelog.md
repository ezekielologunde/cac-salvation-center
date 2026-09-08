---
project: cac-salvation-center
type: changelog
status: active
last_updated: 2026-09-07
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

## Search Console indexing fixes (2026-09-07)
- Sitemap: `/salvationcity` and `/ilorin` were listed under `www` while their pages declare the `city.` / `ilorin.` subdomains as canonical, which Search Console reported as "Alternate page with proper canonical tag". `ROUTES` in `lib/site.ts` now carries an optional `url` override and the sitemap lists the canonical subdomain URLs; the two pages and the sitemap share the new `CITY_URL` / `ILORIN_URL` constants. See [[Decisions]].
- Sitemap: added the missing `/events/cacna-50th-anniversary` page (the page existed, the `ROUTES` entry did not).
- Redirects: `/choir` (page removed 2026-07-09 in `5a09ecc`, still indexed by Google) now 308s to `/ministries` instead of returning 404.
- Canonical hygiene: the root layout no longer sets `alternates.canonical: "/"`. Next.js metadata inheritance applied it to every page without its own canonical (`/store/success`, `/admin/login`, the 404 page), marking them as duplicates of the homepage. The homepage now sets it in `app/page.tsx`.
- Investigated and intentionally left alone: "Page with redirect" entries are the expected http→https, apex→www, trailing-slash and legacy-WordPress-slug 308s; "Blocked due to access forbidden (403)" is the Vercel Firewall deny rule on WordPress paths (`X-Vercel-Mitigated: deny`); "Blocked by robots.txt" is `/admin` or `/store/success` by design. Follow-ups in [[Tasks]].
- `CACNA_URL` in `lib/site.ts` now points at `https://cacna.cacsalvationcenter.org` (live on the CACNA Vercel project since early September) instead of `cacnorthamerica.vercel.app`, so every CACNA link on this site sends Google to the subdomain that should be indexed.

## Search Console follow-up round: subdomain redirects, lastmod, dead Convention links (2026-09-07)
- `next.config.ts`: `city.`, `ilorin.`, and `blog.cacsalvationcenter.org` each rewrite only their own root ("/") to a dedicated page; every other path was an unredirected, uncanonicalized duplicate of the same path on `www` (e.g. `city.cacsalvationcenter.org/about` served `/about` with no rewrite of its own, relying entirely on that page's canonical tag). Added a permanent redirect for every non-root, non-`/api`, non-`/_next` path on those three hosts to the same path on `www`.
- `app/sitemap.ts`: added `clampToNow()` so `lastModified` for an event page is never later than the sitemap's own build time. `EVENT_LAST_MODIFIED` holds the event's *date*, not an edit timestamp, so an upcoming event (e.g. the CACNA 50th, 2026-10-10) was advertising a future lastmod — which Google treats as untrustworthy and may use to distrust the rest of the sitemap.
- `CAC_CONVENTION_URL` in `lib/site.ts` pointed at `cacna-convention.vercel.app`, which now 404s. Repointed to `${CACNA_URL}/en/calendar` — CACNA has no single evergreen "/convention" URL, only per-year event pages that go stale annually, and the calendar always shows whichever convention is current or next.
- Found while verifying the above: a **second, unrelated dead link** — `https://cacnaconvention.org` (a completely different domain from `cacna-convention.vercel.app`, evidently a one-off vendor page for 2026 registration) returns "403 Access forbidden!" even to a normal browser, not just bots. It was hardcoded (not via `CAC_CONVENTION_URL`) in three places, one of them unconditionally visible regardless of whether the convention had already happened:
  - `app/blog/page.tsx`: an unconditional "Registration open — Register for CACNA 2026" banner, live on `/blog` since the convention itself was announced, still saying "Registration open" and linking to the dead domain a month and a half after the convention ended. Rewritten as an evergreen "CACNA National Convention" card linking to `CAC_CONVENTION_URL`.
  - `app/events/cacna-2026/page.tsx`: `CACNA_REG` fed both a JSON-LD `Offer.url` (unconditional) and two CTA buttons (already correctly gated behind `!isPast`, so not currently visible, but latent). Repointed `CACNA_REG` to `CAC_CONVENTION_URL` so the JSON-LD offer isn't citing a dead URL, without needing to touch the existing conditionals.
  - Same file: a plain-text "follow ... or cacnaconvention.org for updates" sentence in the (unconditionally-rendered) schedule section, stale now that the schedule can't change anymore. Removed.
  - The parallel dead link in the CACNA repo itself (`lib/conventions.ts`'s 2026 entry, feeding the identically-named `/events/cacna-2026` page on that site) is fixed in [ezekielologunde/cacnorthamerica#33](https://github.com/ezekielologunde/cacnorthamerica/pull/33).
- Still open, needs a Search Console action rather than a code change: the real `sitemap.xml` was never submitted there — only a dead `wp-sitemap.xml` from 2023 is registered. See [[Tasks]].
