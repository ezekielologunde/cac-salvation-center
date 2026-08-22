---
project: cac-salvation-center
type: tasks
status: active
last_updated: 2026-08-22
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
