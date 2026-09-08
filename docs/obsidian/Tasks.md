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

- After the sitemap/redirect changes deploy, use **Validate fix** in Search Console on "Alternate page with proper canonical tag" and "Not found (404)", and resubmit `sitemap.xml`.
- The subdomains serve the whole site as duplicates: `city.cacsalvationcenter.org/about`, `ilorin.cacsalvationcenter.org/events` and `blog.cacsalvationcenter.org/blog/...` all return 200 with a canonical pointing at `www`. Canonical tags cover it for now. If these ever appear as "Duplicate" in Search Console, add a `next.config.ts` redirect for non-root paths on those hosts to `www` (excluding `/_next`, `/images`, `/api`, `robots.txt`, `sitemap.xml`, so the micro-site pages keep loading their own assets).
- "Blocked due to access forbidden (403)" comes from the Vercel Firewall deny rule on legacy WordPress paths (`/wp-login.php`, `/wp-content/...`, `/xmlrpc.php` return 403 with `X-Vercel-Mitigated: deny`). Harmless. To make it drop out of the report, add `/wp-login.php` to the robots.txt disallow list or change the rule's action.
- "Crawled - currently not indexed" (2 URLs) is Google's quality judgement, not an error. Check which URLs the report lists; the `blog_posts` table is empty, so it is not dynamic blog content.
- Event landing pages use the event date as sitemap `lastModified`, which is a future timestamp for upcoming events (e.g. the CACNA 50th on 2026-10-10). Google ignores implausible `lastmod` values and may distrust the rest; consider clamping to the build time.

## CACNA subdomain not in Search Console (found 2026-09-07)

- Search Console only has a verified URL-prefix property for `https://www.cacsalvationcenter.org/`, which excludes every subdomain (`cacna.`, `city.`, `ilorin.`, `blog.`). The Domain property `cacsalvationcenter.org` exists but is unverified. Verify it by adding the TXT record Search Console shows for it at Bluehost (the domain's DNS host, `ns1/ns2.bluehost.com`), then click Verify. A Domain property covers all subdomains and both http/https.
- `cacna.cacsalvationcenter.org` is the CACNA site (separate repo `ezekielologunde/cacnorthamerica`, local checkout `Projects/Church/CACNA`, Vercel project `cacnorthamerica`). Its canonical, hreflang and sitemap all still point at `https://cacnorthamerica.vercel.app` because `NEXT_PUBLIC_SITE_URL` (Vercel env and `.env.local`) and the default in its `lib/site.ts` are the vercel.app host. Until that is `https://cacna.cacsalvationcenter.org`, Google will index the vercel.app host and treat the subdomain as a duplicate. That repo's own `lib/site.ts` comment lists the three places to update: the code default, `NEXT_PUBLIC_SITE_URL` in Vercel, and Supabase's auth redirect allow-list. Then redeploy and add a host-based redirect from `cacnorthamerica.vercel.app` to the subdomain.
