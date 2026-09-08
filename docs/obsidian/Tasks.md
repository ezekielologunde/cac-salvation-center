---
project: cac-salvation-center
type: tasks
status: active
last_updated: 2026-09-07
tags: [project/cac-salvation-center]
---

# Tasks

Outstanding work and gaps found while auditing the codebase (2026-08-22). No `TODO`/`FIXME` comments exist in the source — this list is inferred from specs, structure, and omissions. See [[Features]], [[Architecture]], [[Decisions]].

## Spec'd but not built

- **Sermon-to-blog automation pipeline** — full design spec and task-by-task implementation plan exist at `docs/superpowers/specs/2026-08-02-sermon-to-blog-automation-design.md` and `docs/superpowers/plans/2026-08-02-sermon-to-blog-automation.md`, but none of the described code exists yet: no `app/api/cron/scan-sermons/route.ts`, no `lib/transcript.ts`, no `lib/sermonArticle.ts`, no Supabase migration adding `source_video_id`/`preacher`/`pull_quotes` to `blog_posts`, no Vitest setup, no `@anthropic-ai/sdk` dependency, no `YOUTUBE_API_KEY`/`SERMON_PLAYLIST_ID`/`ANTHROPIC_API_KEY`/`CRON_SECRET` env vars. This is the single largest piece of unimplemented, ready-to-build work in the repo.

## Documentation / onboarding gaps

- No `.env.example` checked in — required env vars (Stripe, Supabase, Resend, Cloudinary, Google Analytics/Ads/AdSense, and future sermon-pipeline vars) are only discoverable by reading source. Adding one would meaningfully help onboarding.
- No `supabase/migrations/` directory in the repo — the live schema exists only in the hosted Supabase project (ref `kaevsmyzjlmjjlwdtfbw`, per the sermon-to-blog plan) and isn't version-controlled locally. Worth pulling/committing existing migrations if they aren't tracked elsewhere.

## Verify / double-check (not confirmed bugs, just unverified in this audit)

- Confirm `app/api/stripe/webhook/route.ts` validates the Stripe signature header.
- Confirm the exact payment/redirect mechanism on `app/giving/page.tsx`.
- Confirm current entry point for admin password reset now that the login-page "Forgot password?" button has been removed (commit `0c8ef4f`).

## Known scaling limitation (accepted, not urgent)

- `lib/rateLimit.ts` is in-memory per instance; will under-protect under multi-instance/high-traffic conditions. Documented upgrade path: Upstash Redis. No action needed unless traffic grows.

## Search Console follow-ups (2026-09-07)

Pulled the actual URL lists from every "why pages aren't indexed" row via Search Console's drilldown view (not just the category counts):

- **Sitemap was never submitted** — the only registered sitemap was the old WordPress `/wp-sitemap.xml` (submitted 2023-10-12, status "Couldn't fetch"). Google only ever discovered this site's own `sitemap.xml` through the `Sitemap:` line in `robots.txt`, not because it was submitted directly. Submit `https://www.cacsalvationcenter.org/sitemap.xml` in Search Console and delete the dead `/wp-sitemap.xml` entry — likely the single biggest lever here, since it's the difference between Google discovering pages passively and being told about all of them at once.
- After the sitemap/redirect changes deploy, use **Validate fix** in Search Console on "Alternate page with proper canonical tag" (`/salvationcity`, `/ilorin`) and "Not found (404)" (`/choir`).
- ~~The subdomains serve the whole site as duplicates...~~ — **fixed 2026-09-07**: `next.config.ts` now redirects every non-root path on `city.`/`ilorin.`/`blog.cacsalvationcenter.org` to the same path on `www` (root is untouched, since that's the intentional rewrite to each micro-site's own page).
- "Blocked due to access forbidden (403)" is `https://www.cacsalvationcenter.org/wp-*.php` (literal, from Search Console's example) — the Vercel Firewall deny rule on legacy WordPress paths (`X-Vercel-Mitigated: deny`). Harmless; drop it from the report by adding `/wp-*.php` to the robots.txt disallow list, or leave it, since it's not actually costing anything.
- "Blocked by robots.txt" is one leftover WordPress plugin asset path (`/wp-content/plugins/essential-addons-for-elementor-lite/...`). Harmless, matches the existing `/wp-content/` disallow rule by design.
- "Crawled - currently not indexed" (2 URLs): a literal `https://www.cacsalvationcenter.org/*` (a stray wildcard entry, likely a leftover from an old sitemap or manual URL submission — nothing to fix in code) and the blog post `/blog/jesus-christ-our-all-in-all`. That post is 258 body words, above the 56-post median of 231, so it isn't unusually thin; this is Google's own quality judgement, not a broken link or missing metadata.
- ~~Event landing pages use the event date as sitemap lastModified...~~ — **fixed 2026-09-07**: `app/sitemap.ts` now clamps every `lastModified` to build time via `clampToNow()`, so an upcoming event's date (e.g. the CACNA 50th, 2026-10-10) never appears in the sitemap as a future edit timestamp.

## CACNA subdomain not in Search Console (found 2026-09-07)

- Search Console only has a verified URL-prefix property for `https://www.cacsalvationcenter.org/`, which excludes every subdomain (`cacna.`, `city.`, `ilorin.`, `blog.`). The Domain property `cacsalvationcenter.org` exists but is unverified. Verify it by adding the TXT record Search Console shows for it at Bluehost (the domain's DNS host, `ns1/ns2.bluehost.com`), then click Verify. A Domain property covers all subdomains and both http/https.
- `cacna.cacsalvationcenter.org` is the CACNA site (separate repo `ezekielologunde/cacnorthamerica`, local checkout `Projects/Church/CACNA`, Vercel project `cacnorthamerica`). Its canonical, hreflang and sitemap all still point at `https://cacnorthamerica.vercel.app` because `NEXT_PUBLIC_SITE_URL` (Vercel env and `.env.local`) and the default in its `lib/site.ts` are the vercel.app host. Until that is `https://cacna.cacsalvationcenter.org`, Google will index the vercel.app host and treat the subdomain as a duplicate. That repo's own `lib/site.ts` comment lists the three places to update: the code default, `NEXT_PUBLIC_SITE_URL` in Vercel, and Supabase's auth redirect allow-list. Then redeploy and add a host-based redirect from `cacnorthamerica.vercel.app` to the subdomain.
