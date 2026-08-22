---
project: cac-salvation-center
type: decisions
status: active
last_updated: 2026-08-22
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
The site deliberately cross-links to the wider Christ Apostolic Church network (CACNA, CAC Worldwide, CAC Convention) via centralized URL constants in `lib/site.ts` rather than hardcoding links per-page (commit `e4c5a70`), and points at each affiliate's real current deployment URL rather than an aspirational subdomain, with a code comment explaining why (their custom domains aren't live yet).

## No automated test suite (yet)
The sermon-to-blog plan explicitly notes: "This repo has no automated tests today — only `tsc --noEmit` and manual/browser verification," and only introduces Vitest scoped to that one feature's pure logic. Current state of the repo as a whole should be assumed untested beyond type-checking and manual QA.
