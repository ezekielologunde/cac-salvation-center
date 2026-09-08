---
project: cac-salvation-center
type: decisions
status: active
last_updated: 2026-09-07
tags: [project/cac-salvation-center]
---

# Decisions

Notable choices inferred from code and commit history. See [[Architecture]] and [[Changelog]].

## Inline styles over Tailwind classes for page content
Despite Tailwind CSS 4 being installed, most page/section content (`app/**`, `components/sections/*`) is written with inline `style={{...}}` objects rather than Tailwind utility classes. This is explicit enough to be called out as a convention in the sermon-to-blog implementation plan ("this codebase uses inline style objects... matching whatever file you're editing"). Any new page work should match the surrounding file's existing pattern rather than introducing Tailwind classes into an inline-style file or vice versa.

## Build-time Supabase resilience
Pages that read from Supabase during build/prerender (e.g. `app/sitemap.ts`, `app/blog/page.tsx`) wrap those calls in try/catch with safe fallbacks. This was a deliberate fix (commit `76441e0`, "Fix Preview deployment failures: make build-time Supabase calls resilient") after Preview deployments broke when Supabase wasn't reachable at build time. Any future change to build/prerender-time Supabase reads must preserve this wrapping.

## Service-role client confined behind `requireAdmin()`
Rather than relying on RLS alone for the admin panel, `requireAdmin()` (see [[Security]]) does an explicit auth + admin-profile check before any code path uses the service-role Supabase client. This centralizes the admin gate in one function instead of repeating checks per route.

## Cloudinary for images instead of Vercel Image Optimization for user content
Gallery and Instagram-sourced images are served via Cloudinary with a custom `next/image` loader (`lib/cloudinary-loader.ts`), explicitly to cut Vercel's Image Optimization usage/cost (commit `e36c685`, "Cut Vercel Image Optimization usage: offload gallery/IG to source CDNs").

## In-memory rate limiting accepted as "good enough for now"
`lib/rateLimit.ts` is deliberately simple (in-memory Map, resets on cold start) with an explicit code comment naming Upstash Redis as the upgrade path if the site outgrows it. A conscious choice to avoid adding infrastructure before it's needed.

## `llms.txt` route
`app/llms.txt/route.ts` exists specifically to give AI crawlers/LLMs a structured summary of the site — an intentional SEO/AI-visibility decision, paired with a broader SEO push visible across many commits (structured data, Search Console fixes, keyword targeting).

## Sermon-to-blog: fully automated, no human review gate
The planned pipeline (see [[Architecture]], [[Tasks]]) is explicitly designed to publish generated articles with zero human approval step — a deliberate product decision recorded in the design spec's Goals section, accepting the trade-off in exchange for not needing anyone to manually review weekly.

## CAC family cross-linking
The site deliberately cross-links to the wider Christ Apostolic Church network (CACNA, CAC Worldwide, CAC Convention) via centralized URL constants in `lib/site.ts` rather than hardcoding links per-page (commit `e4c5a70`), and points at each affiliate's real current URL rather than an aspirational one. CACNA moved to `https://cacna.cacsalvationcenter.org` on 2026-09-07 once that subdomain was wired to the CACNA Vercel project; the Convention site still points at its Vercel deployment because its custom domain is not live.

## No automated test suite (yet)
The sermon-to-blog plan explicitly notes: "This repo has no automated tests today — only `tsc --noEmit` and manual/browser verification," and only introduces Vitest scoped to that one feature's pure logic. Current state of the repo as a whole should be assumed untested beyond type-checking and manual QA.

## Micro-site subdomains are canonical (Ilorin, Salvation City)
`ilorin.cacsalvationcenter.org` and `city.cacsalvationcenter.org` are rewritten, not redirected, to `/ilorin` and `/salvationcity` so the address bar keeps the subdomain (commits `f17176c`, `840416c`), and each page declares the subdomain as its canonical URL. Consequence: the `www` paths are non-canonical alternates, so the sitemap must list the subdomain URLs instead (the `url` override on `ROUTES` entries, using `ILORIN_URL` / `CITY_URL` from `lib/site.ts`). Cross-host sitemap entries are valid because every subdomain serves the same `robots.txt`, which points at the `www` sitemap (the sitemaps.org cross-submission rule). `blog.cacsalvationcenter.org` is the opposite: it canonicalizes to `www/blog`. The subdomains also serve every other route as a duplicate (e.g. `city.cacsalvationcenter.org/about`), relying on canonical tags alone; see [[Tasks]].

## No canonical in the root layout
`app/layout.tsx` deliberately does not set `alternates.canonical`. Next.js metadata inheritance applies a root-layout canonical to every page that does not override it, which silently declared `/store/success`, `/admin/login` and the 404 page to be duplicates of the homepage (found while working through the Search Console report, 2026-09-07). Every indexable page sets its own canonical; the homepage sets `/` in `app/page.tsx`.
