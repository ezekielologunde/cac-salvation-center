---
project: cac-salvation-center
type: design-spec
status: approved
last_updated: 2026-09-16
---

# Ilorin micro-site redesign — design spec

## Context

`app/ilorin/*` (the C.A.C Salvation Centre, Ilorin district-headquarters micro-site) grew incrementally over several sessions: a broken-image fix, a Sunday Messages blog with Spotify links, real event photography, a banner/nav overlap fix, and an interactive hero photo slider. Each change was correct in isolation, but the page as a whole now has:

- A dated/plain visual style relative to the quality of content now on it.
- Section order that doesn't tell a coherent story.
- Too much length with no clear focus.
- The same social/platform links duplicated in three places (Pastoral Leadership card, a dedicated Connect section, and the footer).

This spec covers a full redesign of the homepage (`app/ilorin/page.tsx`) and the Messages blog (`app/ilorin/blog/page.tsx`, `app/ilorin/blog/[slug]/page.tsx`), sharing chrome via `components/ilorin/IlorinChrome.tsx`.

## Goals (from user input)

- Fix all four named problems: visual style, section order/flow, length/focus, cohesion.
- Keep the existing green brand identity — elevate its execution, not replace it.
- Primary page goal is **identity and credibility**: a first-time visitor should come away understanding who this church is (heritage, leadership, the Baltimore connection) — not be funneled straight to messages/podcast or a "follow us" ask.
- Consolidate the tripled social/platform links into one place.
- Add Apple Podcasts links to sermon posts, mirroring the existing Spotify integration.
- Scope: homepage + Messages blog pages (not the rest of the main site).

## Non-goals

- No new color direction or rebrand — green stays, execution improves.
- No filtering/sorting UI added to the Messages blog listing (27 messages still works fine as a flat grid; not something requested).
- No backend/database changes — this is a static site with content in TypeScript data files.

## Homepage section order

Reordered around a "who we are" narrative arc, consolidating from 12 sections (three of them duplicating social links) to 9:

1. **Header** — reworked nav (see below).
2. **Hero** — existing interactive photo slider, with the "mandate" quote folded in as a subtitle/pull-quote instead of its own separate section immediately after.
3. **Heritage** — the 1997 / District HQ / 2002 story. This leads, since it's the core "who we are" content.
4. **Pastoral Leadership** — pastor photo + bio. Platform/social buttons removed (they move to Connect).
5. **Teaching** — merges "Today's Word" and "Latest Messages" into one section: the daily word first, then 3 recent message cards, one "View all messages" link.
6. **Life at the Centre** — the photo gallery, given more visual weight since it now does real narrative work.
7. **Join Us** — merges "Service times" and "Visit us" (address, map, building photo) into one section; today these repeat the address text in two places.
8. **Connect** — the single, only-appears-once grid of platform links (YouTube, Spotify, Apple Podcasts, Audiomack, Facebook, Instagram, TikTok, Email).
9. **Footer** — slimmed to logo, one line, copyright. No repeated address, no repeated links.

Each of sections 3–8 gets an `id` attribute matching the new nav anchors.

## Navigation rework

**Homepage** (`IlorinHeader`, "home" variant): logo/wordmark on the left; in-page anchor links — Heritage · Leadership · Teaching · Visit · Connect — plus the existing "Visit" pill CTA button. On narrow viewports the anchor links collapse into a menu button next to Visit (no mobile nav treatment exists today; this is a real gap being closed, not just cosmetic).

**Blog pages** (`IlorinHeader`, "blog" variant): logo/wordmark, "All Messages," "Home" (back to the main page), and the same "Visit" pill. No dead anchor links, since blog pages have no matching in-page sections.

**Visual**: slightly taller bar, more breathing room around the logo/wordmark (it's the one constant brand element across every page), soft shadow/gradient at the bottom edge instead of a flat 1px border.

**Footer** (shared, both homepage and blog): logo, one line, copyright only. No address, no platform links — those live in Connect (homepage) and are not duplicated on blog pages, which don't currently repeat them either.

## Visual treatment by section

- **Heritage**: replace the three disconnected marker cards with a connected timeline — a green line running through 1997 → District HQ → 2002, each year a dot on the line, each story a card hanging off it (vertical on mobile, horizontal on desktop).
- **Pastoral Leadership**: same photo + bio, more breathing room now that the button row is gone.
- **Teaching**: Today's Word gets a full-width green panel with a subtle radial-gradient glow (reusing the existing blog-hero pattern) and a gold accent quote mark, so it reads as a distinct spiritual-content beat; the 3 message cards below use the existing card style, now showing Apple Podcasts badges alongside Spotify where available.
- **Life at the Centre**: upgrade the flat 6-up equal-size grid to a mosaic (2 larger + 4 smaller) using the same 6 photos — no new assets needed.
- **Join Us**: one section — schedule table and address side-by-side on desktop (stacked on mobile), map and building photo below.
- **Connect**: reuse the existing platform-card grid pattern, appearing exactly once.
- **Overall texture**: reuse the existing soft radial-gradient blob (already used on the blog hero) in the Heritage and Teaching sections, so the cream/green color-block alternation gets some depth without new visual language.

## Messages blog pages

The blog pages already share the green identity, the `Reveal` animation pattern, and the card styles used on the homepage — this is not a structural overhaul. Changes:

- Pick up the reworked header ("blog" variant) and slimmed footer.
- Listing cards and the detail page's Spotify button gain an Apple Podcasts counterpart where available.
- The detail page's "More messages" mini-cards gain the same small headphone badge shown on the main listing.

No changes to the listing's grid layout or to filtering/sorting.

## Apple Podcasts integration

- Add `applePodcastUrl?: string` to the `IlorinSermon` interface in `lib/ilorinSermons.ts`, alongside the existing `podcastUrl` (Spotify).
- Populate it by finding Pastor R.T. Owoseni's Apple Podcasts show and matching episodes against the same 27 sermons already cross-referenced against Spotify, using the same method (verbatim/near-verbatim MINISTER/TOPIC/TEXT/NOTES text or exact scripture-reference overlap — titles alone aren't reliable since some topics repeat across different occasions).
- On the sermon detail page, show an Apple Podcasts button next to the Spotify button when available (Apple's dark styling, same layout pattern), rather than replacing the Spotify button — offer both rather than picking one.
- Listing cards and homepage Teaching cards show a badge/icon for whichever platform(s) are available.

## Technical summary

**Edited files:**
- `app/ilorin/page.tsx` — full restructuring per the section order above; merges Today's Word + Messages into "Teaching," merges Service Times + Visit into "Join Us"; removes duplicate Connect content from Leadership and Footer; adds section `id`s for nav anchors.
- `components/ilorin/IlorinChrome.tsx` — `IlorinHeader` takes a variant ("home" | "blog") controlling which links render, plus the visual/mobile-menu changes; `IlorinFooter` slimmed.
- `lib/ilorinSermons.ts` — add `applePodcastUrl?` field; populate via research matching.
- `app/ilorin/blog/page.tsx` — card badge treatment updated for Apple Podcasts.
- `app/ilorin/blog/[slug]/page.tsx` — Apple Podcasts button added next to Spotify; "More messages" badge added.

**New components:** a Heritage timeline block (own component if it benefits from isolation; otherwise inline in `page.tsx` — decide during implementation based on resulting file size/clarity).

**No database or schema changes.** No new external dependencies expected — timeline and mosaic layouts are achievable with existing CSS/flex/grid patterns already used throughout the codebase.

## Testing / verification approach

No automated test suite exists for this static content site; verification has consistently been build + manual browser check throughout this project's history, and that's the right bar here too:

1. `npm run build` (or dev server) to catch type/build errors.
2. Browser verification at desktop and mobile widths: nav anchors scroll to the correct sections, mobile menu opens/closes correctly, the Heritage timeline and Join Us merge render correctly, Connect appears exactly once across the whole homepage, blog pages show the correct podcast badges, and no regressions to the existing hero slider, Daily Word rotation, or Spotify links.

## Error handling

No new error-handling surfaces. Existing patterns (`notFound()` for invalid sermon slugs, optional `podcastUrl`/`applePodcastUrl` fields rendered conditionally) are sufficient and already established in the codebase.
