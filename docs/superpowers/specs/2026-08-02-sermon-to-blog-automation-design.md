# Sermon-to-Blog Automation — Design Spec

## Context

Sermons only exist as YouTube videos today — nothing from them makes it into written, indexable, shareable form on the site. The church wants a system that watches for new sermon uploads and automatically turns them into blog articles, so sermon content becomes part of the blog (and its SEO/AI-crawler surface) without anyone having to manually transcribe or write it up.

## Goals

- Weekly scan of a curated YouTube playlist for new sermon videos.
- Turn each new video into a devotional-style blog article using Claude, matching the voice of the site's existing posts.
- Publish fully automatically — no human approval gate.
- Backfill every video already in the playlist at launch, spread across the first several runs rather than all at once.
- One video failing (no captions, API hiccup, bad AI output) never blocks the others or corrupts the batch.

## Non-goals

- Not a general content queue/CMS — this is one purpose-built pipeline.
- Not attempting to process videos with no caption track — skip and log.
- Not doing anything with non-English transcripts.
- Not changing the static `POSTS` array in `lib/blog.ts` — generated articles are Supabase-backed DB posts only.
- Not building admin UI to edit preacher/pull-quotes — that's a raw DB edit if ever needed.

## Architecture

### Pipeline (single cron route)

`app/api/cron/scan-sermons/route.ts`, triggered weekly by Vercel Cron, authenticated via the `Authorization: Bearer <CRON_SECRET>` header Vercel automatically sends on cron-triggered requests.

Steps per run:

1. **Enumerate** — call the YouTube Data API's `playlistItems.list` for the configured sermon playlist (`SERMON_PLAYLIST_ID`). Extends `lib/sermons.ts`, which already has the API-key request pattern and an RSS fallback precedent for channel videos.
2. **Filter** — query `blog_posts.source_video_id` for already-processed videos; drop them from the list.
3. **Batch** — take up to `MAX_VIDEOS_PER_RUN` (default 5) of the remaining videos, oldest-first. This exists to keep each run inside the serverless function's execution time limit, not to throttle API usage (the schedule is already weekly). A large backfill will simply span multiple weekly runs until it catches up — expected and fine.
4. **Per video:**
   - Fetch the transcript (see below). No caption track found → log and skip this video.
   - Call Claude with a structured tool-use request for `{ title, excerpt, body: string[], preacher: string | null, pullQuotes: { ref, text }[] }`.
   - Slugify the generated title (reuse the existing slugify logic from the admin blog `createPost` action).
   - Insert into `blog_posts`: `{ title, slug, excerpt, body, published: true, published_at: now, source_video_id, preacher, pull_quotes }`.
   - Any failure at any of the above steps for this video → log and move to the next video; never abort the whole run.
5. `revalidatePath("/blog")` once at the end of the run.

### Data model (Supabase migration)

New nullable columns on `blog_posts`:

| column | type | purpose |
|---|---|---|
| `source_video_id` | `text`, unique when set | YouTube video ID — idempotency key, and drives the video-embed rendering |
| `preacher` | `text` | Byline, when the AI can identify one |
| `pull_quotes` | `jsonb` | Array of `{ ref: string, text: string }` |

This repo has no tracked `supabase/migrations/` yet — this feature starts that convention. Applied both as a committed migration file and directly to the live project.

### Transcript fetching

Uses the same unofficial-but-standard mechanism every "YouTube transcript" tool relies on: fetch the video's watch page, extract the `captionTracks` list embedded in `ytInitialPlayerResponse`, prefer a manually-uploaded English track over an auto-generated one if both exist, fetch that track's timedtext URL, and flatten the returned XML into plain paragraphs (strip timestamps, group lines into sentences). No OAuth or API quota needed. This isn't a documented, stable API — if YouTube changes its page structure, transcript fetching fails gracefully (skip + log), it does not crash the run.

### AI article generation

New dependency: `@anthropic-ai/sdk`. New env var: `ANTHROPIC_API_KEY`. Model: a current Claude Sonnet model. One tool-use call per video. System prompt establishes: write as a ministry writer for CAC Salvation Center; match the warm, devotional tone of the site's existing posts (a couple of real `POSTS` entries are included in the prompt as tone reference); stay faithful to what was actually said — no fabricated details; only name a preacher if the transcript makes it reasonably clear; select 2–4 scripture references that are genuinely quoted or discussed as pull-quotes.

### Blog rendering

`BlogPost` (in `lib/blog.ts`) and the DB-row mapping functions (`dbPostToBlogPost` in `app/blog/page.tsx` and `app/blog/[slug]/page.tsx`) gain three new optional fields: `videoId?`, `preacher?`, `pullQuotes?`. All additive — existing static and manually-written posts are unaffected.

On `app/blog/[slug]/page.tsx`, when present:
- A YouTube iframe embeds directly beneath the hero title (same embed pattern as `app/online/page.tsx`).
- A "Message by Pastor ___" byline renders near the date/read-time row.
- A "Scripture from this message" section renders after the body — one styled card per pull-quote.

**Admin safety:** `updatePost` in `app/admin/(protected)/blog/actions.ts` must only write the columns its form actually manages (title/slug/excerpt/body/published). It must never null out `source_video_id`/`preacher`/`pull_quotes` — a human tweaking an auto-generated post's wording shouldn't strip its video/attribution metadata.

### Cron infrastructure

New `vercel.json`:
```json
{
  "crons": [
    { "path": "/api/cron/scan-sermons", "schedule": "0 12 * * 1" }
  ]
}
```
Mondays, midday UTC — after the Sunday service has aired and captions have had time to generate.

### New environment variables

- `YOUTUBE_API_KEY` — already referenced in `lib/sermons.ts`, needs to actually be set in Vercel.
- `SERMON_PLAYLIST_ID` — the curated sermon playlist to scan.
- `ANTHROPIC_API_KEY` — new.
- `CRON_SECRET` — new, also unlocks Vercel's automatic cron-request authentication.

## Error handling

| failure | behavior |
|---|---|
| No caption track on a video | skip that video, log, continue batch |
| Transcript fetch fails (network/parse) | skip, log, continue |
| Claude call fails or returns malformed output | skip, log, continue |
| Supabase insert fails (e.g. slug collision) | skip, log, continue |
| Anything else unexpected in per-video processing | caught, logged, continue to next video |

A video that fails is simply never marked processed, so it's retried automatically on the next weekly run without any special retry logic.

## Testing / verification

- Manually trigger the route locally against a known test video: `curl -H "Authorization: Bearer $CRON_SECRET" localhost:3000/api/cron/scan-sermons`, confirm the post appears in Supabase and renders correctly.
- Run twice in a row — confirm no duplicate post is created for the same video.
- Test against a video with captions disabled — confirm it's skipped without affecting other videos in the batch.
- Visually verify the video embed, preacher byline, and pull-quote cards on the resulting `/blog/[slug]` page.
- Confirm editing an auto-generated post via `/admin/blog/[id]` doesn't clear its `source_video_id`/`preacher`/`pull_quotes`.

## Out of scope / future considerations

- Human review/approval gate before publishing (explicitly declined for v1 — fully automatic).
- Non-English transcripts / translation.
- Admin UI for editing preacher attribution or pull-quotes directly.
- Explicit retry/backoff logic beyond "try again next week automatically."
