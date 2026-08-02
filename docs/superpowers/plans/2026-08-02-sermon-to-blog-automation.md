# Sermon-to-Blog Automation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A weekly cron job scans a curated YouTube sermon playlist, transcribes any new video, and publishes it as a blog article (with embedded video, preacher byline, and scripture pull-quotes) via Claude — with zero human review step.

**Architecture:** One new API route (`app/api/cron/scan-sermons/route.ts`) orchestrates a pipeline of small, independently testable modules: `lib/sermons.ts` (extended for playlist enumeration + diff filtering), `lib/transcript.ts` (new — fetch/parse YouTube captions), `lib/sermonArticle.ts` (new — Claude call), and a Supabase `blog_posts` table extended with three new columns. Each video is processed independently inside a try/catch; one failure never blocks the batch.

**Tech Stack:** Next.js 16 (App Router, Turbopack), Supabase (Postgres + `@supabase/supabase-js`), Anthropic Claude (`@anthropic-ai/sdk`, new dependency), Vitest (new dev dependency, for the pipeline's pure logic functions), Vercel Cron.

## Global Constraints

- Project: `cac-salvation-center`, Supabase project ref `kaevsmyzjlmjjlwdtfbw` (MCP server `85ddcc37-6610-4b66-99b5-889a831bf63d`).
- This repo has no automated tests today — only `tsc --noEmit` and manual/browser verification. This plan introduces Vitest, but **only** for pure, deterministic logic (transcript XML parsing, caption-track selection, unprocessed-video filtering). Anything touching a live network call (YouTube, Anthropic, Supabase) is verified manually per-task, matching the rest of this codebase.
- Follow the existing resilience convention: any Supabase read used at Next.js **build/prerender** time must be wrapped in try/catch with a safe fallback (see `app/sitemap.ts`, `app/blog/page.tsx`). The cron route itself runs at request time only, not at build time, so this doesn't apply there — but any change to `app/blog/page.tsx` / `app/blog/[slug]/page.tsx` must preserve their existing try/catch wrapping.
- New env vars needed (add locally to `.env.local` and in Vercel project settings for Production **and** Preview — see the earlier Preview-deployment-resilience fix in this repo's history for why both matter): `YOUTUBE_API_KEY`, `SERMON_PLAYLIST_ID`, `ANTHROPIC_API_KEY`, `CRON_SECRET`.
- Model ID for Claude calls: `claude-sonnet-5`.
- Style: this codebase uses inline `style={{...}}` objects (no CSS modules/Tailwind classes for page content), matching whatever file you're editing.

---

### Task 1: Supabase migration — sermon fields on `blog_posts`

**Files:**
- Create: `supabase/migrations/20260802000000_add_sermon_fields_to_blog_posts.sql`
- Modify: `types/database.types.ts` (regenerated, not hand-edited)

**Interfaces:**
- Produces: three new nullable columns on `blog_posts` — `source_video_id text` (partial-unique when not null), `preacher text`, `pull_quotes jsonb`. Also a new unique index on `slug` (closes a latent gap — nothing currently enforces slug uniqueness, which this feature now depends on for safe skip-on-collision behavior).

- [ ] **Step 1: Write the migration file**

Create `supabase/migrations/20260802000000_add_sermon_fields_to_blog_posts.sql`:

```sql
alter table blog_posts
  add column if not exists source_video_id text,
  add column if not exists preacher text,
  add column if not exists pull_quotes jsonb;

create unique index if not exists blog_posts_source_video_id_key
  on blog_posts (source_video_id)
  where source_video_id is not null;

create unique index if not exists blog_posts_slug_unique
  on blog_posts (slug);
```

- [ ] **Step 2: Apply the migration to the live project**

Use the Supabase MCP tool `mcp__85ddcc37-6610-4b66-99b5-889a831bf63d__apply_migration` with:
- `project_id`: `kaevsmyzjlmjjlwdtfbw`
- `name`: `add_sermon_fields_to_blog_posts`
- `query`: the exact SQL from Step 1

Expected: tool returns success, no error about existing data conflicting with the new unique index (if it errors because two existing rows share a slug, stop and resolve that data issue before proceeding — do not skip the index).

- [ ] **Step 3: Regenerate TypeScript types**

Use the Supabase MCP tool `mcp__85ddcc37-6610-4b66-99b5-889a831bf63d__generate_typescript_types` with `project_id: kaevsmyzjlmjjlwdtfbw`, and overwrite `types/database.types.ts` with the result.

- [ ] **Step 4: Verify the new columns are present**

Read `types/database.types.ts` and confirm the `blog_posts` `Row`/`Insert`/`Update` types now include `source_video_id`, `preacher`, and `pull_quotes` (all nullable/optional).

- [ ] **Step 5: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors (this change is additive-only; nothing consumes these fields yet).

- [ ] **Step 6: Commit**

```bash
git add supabase/migrations/20260802000000_add_sermon_fields_to_blog_posts.sql types/database.types.ts
git commit -m "Add sermon-tracking columns to blog_posts

source_video_id (idempotency + embed rendering), preacher, and
pull_quotes, plus a slug unique index the sermon pipeline depends on
for safe skip-on-collision behavior."
```

---

### Task 2: Transcript fetching (`lib/transcript.ts`) + Vitest setup

**Files:**
- Create: `lib/transcript.ts`
- Create: `lib/transcript.test.ts`
- Create: `vitest.config.ts`
- Modify: `package.json` (add `vitest` devDependency + `test` script)
- Modify: `lib/sermons.ts:16` (export the existing `decodeXml` helper for reuse)

**Interfaces:**
- Consumes: `decodeXml(s: string): string` from `lib/sermons.ts` (existing function, just needs `export` added).
- Produces:
  - `extractCaptionTrackUrl(html: string): string | null`
  - `parseTimedTextXml(xml: string): string`
  - `fetchTranscript(videoId: string): Promise<string | null>`

- [ ] **Step 1: Export `decodeXml` from `lib/sermons.ts`**

In `lib/sermons.ts`, change line 16 from:
```ts
function decodeXml(s: string): string {
```
to:
```ts
export function decodeXml(s: string): string {
```

- [ ] **Step 2: Install Vitest**

Run: `npm install -D vitest`

Add to `package.json` `"scripts"`:
```json
"test": "vitest run"
```

- [ ] **Step 3: Add Vitest config**

Create `vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
  },
});
```

- [ ] **Step 4: Write the failing tests**

Create `lib/transcript.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { extractCaptionTrackUrl, parseTimedTextXml } from "./transcript";

describe("parseTimedTextXml", () => {
  it("flattens timed text entries into a single plain-text string", () => {
    const xml = `<?xml version="1.0" encoding="utf-8" ?><transcript><text start="0.5" dur="2.3">In the beginning</text><text start="2.8" dur="3.1">God created the heavens &amp; the earth</text></transcript>`;
    expect(parseTimedTextXml(xml)).toBe("In the beginning God created the heavens & the earth");
  });

  it("returns an empty string for a transcript with no text entries", () => {
    const xml = `<?xml version="1.0" encoding="utf-8" ?><transcript></transcript>`;
    expect(parseTimedTextXml(xml)).toBe("");
  });
});

describe("extractCaptionTrackUrl", () => {
  it("extracts the base URL of the only available track", () => {
    const html = `var ytInitialPlayerResponse = {"captions":{"playerCaptionsTracklistRenderer":{"captionTracks":[{"baseUrl":"https://www.youtube.com/api/timedtext?v=abc123\\u0026lang=en","name":{"simpleText":"English (auto-generated)"},"languageCode":"en","kind":"asr"}]}}};`;
    expect(extractCaptionTrackUrl(html)).toBe("https://www.youtube.com/api/timedtext?v=abc123&lang=en");
  });

  it("prefers a manually-uploaded English track over an auto-generated one", () => {
    const html = `"captionTracks":[{"baseUrl":"https://www.youtube.com/api/timedtext?v=abc\\u0026kind=asr","languageCode":"en","kind":"asr"},{"baseUrl":"https://www.youtube.com/api/timedtext?v=abc\\u0026manual=1","languageCode":"en"}]`;
    expect(extractCaptionTrackUrl(html)).toBe("https://www.youtube.com/api/timedtext?v=abc&manual=1");
  });

  it("returns null when no captionTracks field is present", () => {
    expect(extractCaptionTrackUrl("<html><body>no captions here</body></html>")).toBeNull();
  });
});
```

- [ ] **Step 5: Run tests to verify they fail**

Run: `npx vitest run lib/transcript.test.ts`
Expected: FAIL — `lib/transcript.ts` does not exist yet.

- [ ] **Step 6: Write the implementation**

Create `lib/transcript.ts`:
```ts
import { decodeXml } from "./sermons";

interface CaptionTrack {
  baseUrl: string;
  languageCode?: string;
  kind?: string;
}

/** Extracts the best available English caption track's base URL from a
 *  YouTube watch-page's embedded `ytInitialPlayerResponse` JSON. Prefers a
 *  manually-uploaded track over an auto-generated ("asr") one. Uses a
 *  regex rather than a full HTML/JS parser, matching the RSS-parsing
 *  approach already used in lib/sermons.ts. */
export function extractCaptionTrackUrl(html: string): string | null {
  const match = html.match(/"captionTracks":(\[[^\]]*\])/);
  if (!match) return null;
  try {
    const tracks: CaptionTrack[] = JSON.parse(match[1]);
    if (!tracks.length) return null;
    const english = tracks.filter((t) => t.languageCode?.startsWith("en"));
    const pool = english.length ? english : tracks;
    const manual = pool.find((t) => t.kind !== "asr");
    return (manual ?? pool[0]).baseUrl;
  } catch {
    return null;
  }
}

/** Flattens a YouTube timedtext XML transcript into a single plain-text
 *  string (whitespace-normalized, HTML entities decoded). */
export function parseTimedTextXml(xml: string): string {
  const matches = [...xml.matchAll(/<text[^>]*>([\s\S]*?)<\/text>/g)];
  return matches
    .map((m) => decodeXml(m[1]))
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Fetches a video's transcript via YouTube's public timedtext mechanism —
 *  the same one the YouTube player itself uses client-side. No API key or
 *  OAuth required, but it's not a documented/stable API: any failure here
 *  (network, missing captions, page-structure change) resolves to `null`
 *  rather than throwing, so callers can skip the video and move on. */
export async function fetchTranscript(videoId: string): Promise<string | null> {
  try {
    const pageRes = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: { "Accept-Language": "en-US,en;q=0.9" },
    });
    if (!pageRes.ok) return null;
    const html = await pageRes.text();

    const trackUrl = extractCaptionTrackUrl(html);
    if (!trackUrl) return null;

    const trackRes = await fetch(trackUrl);
    if (!trackRes.ok) return null;
    const xml = await trackRes.text();

    const text = parseTimedTextXml(xml);
    return text.length > 0 ? text : null;
  } catch {
    return null;
  }
}
```

- [ ] **Step 7: Run tests to verify they pass**

Run: `npx vitest run lib/transcript.test.ts`
Expected: PASS (5 tests)

- [ ] **Step 8: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 9: Commit**

```bash
git add lib/transcript.ts lib/transcript.test.ts lib/sermons.ts vitest.config.ts package.json package-lock.json
git commit -m "Add transcript fetching (lib/transcript.ts) with Vitest coverage

Fetches a YouTube video's caption track via the same public timedtext
mechanism the player itself uses (no OAuth/API key needed). The pure
parsing/extraction logic is unit-tested; the network orchestration
(fetchTranscript) is verified manually once the full pipeline exists.

Introduces Vitest as this repo's first test runner, scoped to pure
logic only -- matching the codebase's existing manual/browser
verification convention for anything touching live network calls."
```

---

### Task 3: Playlist enumeration + unprocessed-video filtering (`lib/sermons.ts`)

**Files:**
- Modify: `lib/sermons.ts` (add `getPlaylistVideos`, `filterUnprocessed`)
- Create: `lib/sermons.test.ts`

**Interfaces:**
- Consumes: `Sermon` interface (existing, from `lib/sermons.ts`): `{ id: string; title: string; published: string }`
- Produces:
  - `getPlaylistVideos(playlistId: string, maxResults?: number): Promise<Sermon[]>`
  - `filterUnprocessed(videos: Sermon[], processedIds: Set<string>): Sermon[]`

- [ ] **Step 1: Write the failing test**

Create `lib/sermons.test.ts`:
```ts
import { describe, it, expect } from "vitest";
import { filterUnprocessed, type Sermon } from "./sermons";

describe("filterUnprocessed", () => {
  it("removes videos whose id is already in the processed set", () => {
    const videos: Sermon[] = [
      { id: "a", title: "A", published: "" },
      { id: "b", title: "B", published: "" },
    ];
    expect(filterUnprocessed(videos, new Set(["a"]))).toEqual([
      { id: "b", title: "B", published: "" },
    ]);
  });

  it("returns all videos when the processed set is empty", () => {
    const videos: Sermon[] = [{ id: "a", title: "A", published: "" }];
    expect(filterUnprocessed(videos, new Set())).toEqual(videos);
  });

  it("returns an empty array when every video is already processed", () => {
    const videos: Sermon[] = [{ id: "a", title: "A", published: "" }];
    expect(filterUnprocessed(videos, new Set(["a"]))).toEqual([]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx vitest run lib/sermons.test.ts`
Expected: FAIL — `filterUnprocessed` is not exported from `./sermons`.

- [ ] **Step 3: Add the implementation to `lib/sermons.ts`**

Add near the bottom of `lib/sermons.ts` (after `getSermons`, before `formatSermonDate`):
```ts
/** Enumerates every video in a playlist (e.g. a curated "Sunday Sermons"
 *  playlist), oldest first — so a backfill run processes chronologically.
 *  Requires YOUTUBE_API_KEY; returns an empty array without one, same
 *  fail-soft convention as getLiveStream/fromApi above. */
export async function getPlaylistVideos(playlistId: string, maxResults = 20): Promise<Sermon[]> {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) return [];
  try {
    const url =
      `https://www.googleapis.com/youtube/v3/playlistItems` +
      `?part=snippet&playlistId=${encodeURIComponent(playlistId)}` +
      `&maxResults=${maxResults}&key=${encodeURIComponent(key)}`;
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json() as {
      items?: { snippet: { resourceId: { videoId: string }; title: string; publishedAt: string } }[];
    };
    const items = data.items ?? [];
    return items
      .map((item) => ({
        id: item.snippet.resourceId.videoId,
        title: item.snippet.title,
        published: item.snippet.publishedAt ?? "",
      }))
      .sort((a, b) => a.published.localeCompare(b.published));
  } catch {
    return [];
  }
}

/** Drops any video whose id is already in `processedIds` — the pipeline's
 *  idempotency check, driven by blog_posts.source_video_id. */
export function filterUnprocessed(videos: Sermon[], processedIds: Set<string>): Sermon[] {
  return videos.filter((v) => !processedIds.has(v.id));
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx vitest run lib/sermons.test.ts`
Expected: PASS (3 tests)

- [ ] **Step 5: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 6: Commit**

```bash
git add lib/sermons.ts lib/sermons.test.ts
git commit -m "Add playlist enumeration and unprocessed-video filtering

getPlaylistVideos extends the existing YouTube API request pattern to
a specific playlist (oldest-first, for chronological backfill).
filterUnprocessed is the pipeline's idempotency check against
blog_posts.source_video_id."
```

---

### Task 4: AI article generation (`lib/sermonArticle.ts`)

**Files:**
- Create: `lib/sermonArticle.ts`
- Modify: `package.json` (add `@anthropic-ai/sdk` dependency)

**Interfaces:**
- Consumes: nothing from earlier tasks (takes a plain transcript string).
- Produces:
  - `interface SermonArticle { title: string; excerpt: string; body: string[]; preacher: string | null; pullQuotes: { ref: string; text: string }[] }`
  - `generateSermonArticle(params: { videoTitle: string; transcript: string }): Promise<SermonArticle | null>`

No automated test for this task — it's a live external API call with no pure logic to isolate. Verified manually in Task 6's end-to-end check.

- [ ] **Step 1: Install the Anthropic SDK**

Run: `npm install @anthropic-ai/sdk`

- [ ] **Step 2: Write the implementation**

Create `lib/sermonArticle.ts`:
```ts
import Anthropic from "@anthropic-ai/sdk";

export interface SermonArticle {
  title: string;
  excerpt: string;
  body: string[];
  preacher: string | null;
  pullQuotes: { ref: string; text: string }[];
}

// Real excerpts from existing devotional posts (lib/blog.ts), used to
// anchor the AI's tone -- warm, biblical, first-person-plural ("we"),
// not academic or generic.
const TONE_EXAMPLES = `
"As children of God, we are to be well connected with Him through prayer and thanksgiving. Prayer is our great line of communication with God; when we pray regularly, we will not faint or lose heart, but will remain thankful to our Heavenly Father."

"the eternal God is your refuge. On the God who is our home, shelter, and rest, in whom our hearts find their deepest delight and fear no evil."
`.trim();

const SYSTEM_PROMPT = `You are a ministry writer for Christ Apostolic Church (CAC) Salvation Center, turning sermon transcripts into blog articles for the church website.

Match this tone (warm, biblical, first-person-plural, not academic):
${TONE_EXAMPLES}

Rules:
- Stay strictly faithful to what was actually said in the transcript. Never invent details, scripture references, names, or claims that aren't present in the source.
- Only name a preacher if the transcript makes it reasonably clear who is speaking (e.g. they introduce themselves, or are introduced). If it's not clear, return null for preacher -- do not guess.
- Select 2-4 scripture references that are genuinely quoted or substantively discussed in the message for pullQuotes. Do not fabricate references that aren't in the transcript.
- Write a title that reflects the actual content of the message, not just a restatement of the video title.`;

const ARTICLE_TOOL = {
  name: "return_article",
  description: "Return the generated blog article.",
  input_schema: {
    type: "object" as const,
    properties: {
      title: { type: "string", description: "A warm, specific article title reflecting the message's actual content." },
      excerpt: { type: "string", description: "A 1-2 sentence summary, under 200 characters." },
      body: {
        type: "array",
        items: { type: "string" },
        description: "The article body as an array of paragraphs (plain text, no markdown headers).",
      },
      preacher: {
        type: ["string", "null"],
        description: "The preacher's name if reasonably clear from the transcript, otherwise null.",
      },
      pullQuotes: {
        type: "array",
        items: {
          type: "object",
          properties: {
            ref: { type: "string", description: "Scripture reference, e.g. 'Psalm 23:1'." },
            text: { type: "string", description: "The verse text or key phrase actually discussed." },
          },
          required: ["ref", "text"],
        },
        description: "2-4 scripture references genuinely discussed in the message.",
      },
    },
    required: ["title", "excerpt", "body", "preacher", "pullQuotes"],
  },
};

export async function generateSermonArticle(params: {
  videoTitle: string;
  transcript: string;
}): Promise<SermonArticle | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: "claude-sonnet-5",
      max_tokens: 4096,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: "user",
          content: `Video title: ${params.videoTitle}\n\nTranscript:\n${params.transcript}\n\nTurn this into a blog article using the return_article tool.`,
        },
      ],
      tools: [ARTICLE_TOOL],
      tool_choice: { type: "tool", name: "return_article" },
    });

    const toolUse = response.content.find(
      (block): block is Anthropic.ToolUseBlock => block.type === "tool_use"
    );
    if (!toolUse) return null;

    return toolUse.input as SermonArticle;
  } catch (err) {
    console.error("[sermonArticle] generation failed:", err);
    return null;
  }
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add lib/sermonArticle.ts package.json package-lock.json
git commit -m "Add Claude-based sermon article generation (lib/sermonArticle.ts)

First LLM integration in this codebase. Uses tool-use for structured
output: title, excerpt, body paragraphs, preacher (or null if unclear
from the transcript), and 2-4 scripture pull-quotes. System prompt is
anchored to real excerpts from existing devotional posts for tone
matching, and explicitly forbids fabricating details not in the
transcript."
```

---

### Task 5: Extend `BlogPost` and blog rendering for sermon posts

**Files:**
- Modify: `lib/blog.ts:1-16` (extend `BlogPost` interface)
- Modify: `app/blog/page.tsx:1-34` (extend `DbBlogRow` + `dbPostToBlogPost`, select query)
- Modify: `app/blog/[slug]/page.tsx` (extend `dbRowToPost`, select queries, add video embed / byline / pull-quotes rendering)

**Interfaces:**
- Consumes: nothing from earlier tasks directly — this is the rendering side, decoupled from the pipeline. The pipeline (Task 6) writes rows; this task makes those rows render correctly once they exist.
- Produces: `BlogPost` now optionally carries `videoId?: string`, `preacher?: string`, `pullQuotes?: { ref: string; text: string }[]`.

- [ ] **Step 1: Extend the `BlogPost` interface**

In `lib/blog.ts`, change:
```ts
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateIso: string;
  category: PostCategory;
  categoryColor: string;
  accent: string;
  readTime: string;
  featured?: boolean;
  href?: string;
  body: string[];
}
```
to:
```ts
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  dateIso: string;
  category: PostCategory;
  categoryColor: string;
  accent: string;
  readTime: string;
  featured?: boolean;
  href?: string;
  body: string[];
  /** Set when this post was generated from a YouTube sermon video —
   *  drives the video-embed rendering on the post page. */
  videoId?: string;
  /** Preacher byline, when the sermon pipeline could identify one. */
  preacher?: string;
  /** Scripture references pulled out as styled quote cards. */
  pullQuotes?: { ref: string; text: string }[];
}
```

- [ ] **Step 2: Extend `app/blog/page.tsx`'s DB row mapping**

In `app/blog/page.tsx`, change the `DbBlogRow` type (currently lines 14-17):
```ts
type DbBlogRow = {
  id: string; title: string; slug: string; excerpt: string | null;
  body: string; published_at: string | null; created_at: string;
};
```
to:
```ts
type DbBlogRow = {
  id: string; title: string; slug: string; excerpt: string | null;
  body: string; published_at: string | null; created_at: string;
  source_video_id: string | null; preacher: string | null;
  pull_quotes: { ref: string; text: string }[] | null;
};
```

Change `dbPostToBlogPost` (currently lines 19-34) to include the new fields:
```ts
function dbPostToBlogPost(p: DbBlogRow): BlogPost {
  const date = new Date(p.published_at ?? p.created_at);
  const words = p.body.split(/\s+/).length;
  return {
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt ?? p.body.slice(0, 160) + "…",
    date: date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    dateIso: p.published_at ?? p.created_at,
    category: "Ministry Update",
    categoryColor: "#D62828",
    accent: "#D62828",
    readTime: `${Math.max(1, Math.round(words / 200))} min read`,
    body: p.body.split(/\n\n+/),
    videoId: p.source_video_id ?? undefined,
    preacher: p.preacher ?? undefined,
    pullQuotes: p.pull_quotes ?? undefined,
  };
}
```

Find the `.select(...)` call in `app/blog/page.tsx`'s `BlogPage` function (selects `"id, title, slug, excerpt, body, published_at, created_at"`) and change it to also select the new columns:
```ts
.select("id, title, slug, excerpt, body, published_at, created_at, source_video_id, preacher, pull_quotes")
```

- [ ] **Step 3: Extend `app/blog/[slug]/page.tsx`'s DB row mapping**

Change `dbRowToPost`'s parameter type (currently lines 21-24) from:
```ts
function dbRowToPost(row: {
  title: string; slug: string; excerpt: string | null; body: string;
  published_at: string | null; created_at: string;
}): BlogPost {
```
to:
```ts
function dbRowToPost(row: {
  title: string; slug: string; excerpt: string | null; body: string;
  published_at: string | null; created_at: string;
  source_video_id: string | null; preacher: string | null;
  pull_quotes: { ref: string; text: string }[] | null;
}): BlogPost {
```

In the same function's `return` block, add the three new fields (matching the pattern from Step 2):
```ts
    body: row.body.split(/\n\n+/),
    videoId: row.source_video_id ?? undefined,
    preacher: row.preacher ?? undefined,
    pullQuotes: row.pull_quotes ?? undefined,
  };
```

Update both `.select(...)` calls in this file (in `resolvePost` — currently `"title, slug, excerpt, body, published_at, created_at"` — and in the related-posts fetch inside `BlogSlugPage`) to also include `source_video_id, preacher, pull_quotes`.

- [ ] **Step 4: Add video embed + byline rendering**

In `app/blog/[slug]/page.tsx`, inside the hero `<section>`, immediately after the closing `</Reveal>` of the excerpt paragraph (the block ending at what is currently line 462, right before the `<Reveal delay={220}>` date/read-time row) and **before** that date/read-time `<Reveal delay={220}>` block, add:
```tsx
          {post.videoId && (
            <Reveal delay={200}>
              <div style={{ position: "relative", width: "100%", maxWidth: 720, paddingBottom: "40.5%", borderRadius: 18, overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,.4)", marginBottom: 28 }}>
                <iframe
                  src={`https://www.youtube.com/embed/${post.videoId}`}
                  title={post.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                />
              </div>
            </Reveal>
          )}
```

In the same date/read-time `<div>` (currently the flex row containing the `<Calendar>` and `<Clock>` spans, lines ~464-518), add a preacher span right after the `<Clock>` span and before the `{post.href && (...)}` block:
```tsx
              {post.preacher && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    fontSize: 12.5,
                    fontWeight: 700,
                    color: "rgba(255,247,239,.55)",
                    letterSpacing: ".3px",
                  }}
                >
                  Message by {post.preacher}
                </span>
              )}
```

- [ ] **Step 5: Add pull-quotes section**

In `app/blog/[slug]/page.tsx`, immediately after the closing `</section>` of the "Body" section (right before the "Related articles" `<section>` comment), add a new section:
```tsx
      {/* Scripture from this message */}
      {post.pullQuotes && post.pullQuotes.length > 0 && (
        <section
          style={{
            background: "var(--cream)",
            padding: "0 clamp(20px,5vw,64px) clamp(60px,8vw,100px)",
          }}
        >
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <Reveal style={{ marginBottom: 24 }}>
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "var(--red)",
                }}
              >
                Scripture from this message
              </span>
            </Reveal>
            <div style={{ display: "grid", gap: 16 }}>
              {post.pullQuotes.map((q, i) => (
                <Reveal key={q.ref} delay={i * 80}>
                  <blockquote
                    style={{
                      background: "var(--paper)",
                      borderLeft: "4px solid var(--red)",
                      borderRadius: "0 16px 16px 0",
                      padding: "20px 24px",
                      margin: 0,
                      boxShadow: "0 8px 24px rgba(27,19,14,.06)",
                    }}
                  >
                    <p style={{ fontSize: 16, fontStyle: "italic", color: "var(--ink)", lineHeight: 1.7, margin: "0 0 8px" }}>
                      “{q.text}”
                    </p>
                    <cite style={{ fontSize: 12.5, fontWeight: 800, letterSpacing: "1px", textTransform: "uppercase", color: "var(--red)", fontStyle: "normal" }}>
                      {q.ref}
                    </cite>
                  </blockquote>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

```

- [ ] **Step 6: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 7: Manual verification against a fake sermon row**

Insert a temporary test row via the Supabase MCP tool `mcp__85ddcc37-6610-4b66-99b5-889a831bf63d__execute_sql` (`project_id: kaevsmyzjlmjjlwdtfbw`):
```sql
insert into blog_posts (title, slug, excerpt, body, published, published_at, source_video_id, preacher, pull_quotes)
values (
  'Test Sermon Rendering',
  'test-sermon-rendering-temp',
  'A temporary post to verify sermon rendering.',
  E'This is a test paragraph.\n\nThis is a second paragraph.',
  true,
  now(),
  'xIZBd9UYIDw',
  'Pastor Dr. H.O. Ilufoye',
  '[{"ref": "Psalm 23:1", "text": "The LORD is my shepherd; I shall not want."}]'::jsonb
);
```

Start the dev server (`npm run dev` or the project's preview tooling), navigate to `/blog/test-sermon-rendering-temp`, and confirm:
- The YouTube video embeds and is playable.
- "Message by Pastor Dr. H.O. Ilufoye" appears in the date/read-time row.
- A "Scripture from this message" section renders the Psalm 23:1 quote card.

Then delete the test row via `execute_sql`:
```sql
delete from blog_posts where slug = 'test-sermon-rendering-temp';
```

- [ ] **Step 8: Commit**

```bash
git add lib/blog.ts app/blog/page.tsx "app/blog/[slug]/page.tsx"
git commit -m "Render sermon-derived posts: video embed, byline, pull-quotes

BlogPost gains optional videoId/preacher/pullQuotes fields, threaded
through both the DB row mappers and the post detail page. All
additive -- existing static and manually-written posts are unaffected
since these fields are simply absent for them."
```

---

### Task 6: Cron route, `vercel.json`, and end-to-end verification

**Files:**
- Create: `app/api/cron/scan-sermons/route.ts`
- Create: `vercel.json`

**Interfaces:**
- Consumes:
  - `getPlaylistVideos(playlistId: string, maxResults?: number): Promise<Sermon[]>` and `filterUnprocessed(videos: Sermon[], processedIds: Set<string>): Sermon[]` from `lib/sermons.ts` (Task 3)
  - `fetchTranscript(videoId: string): Promise<string | null>` from `lib/transcript.ts` (Task 2)
  - `generateSermonArticle(params: { videoTitle: string; transcript: string }): Promise<SermonArticle | null>` from `lib/sermonArticle.ts` (Task 4)
  - `createServiceClient()` from `lib/supabase/server.ts` (existing)
- Produces: the complete, runnable pipeline. Nothing downstream depends on this task.

- [ ] **Step 1: Write the cron route**

Create `app/api/cron/scan-sermons/route.ts`:
```ts
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getPlaylistVideos, filterUnprocessed } from "@/lib/sermons";
import { fetchTranscript } from "@/lib/transcript";
import { generateSermonArticle } from "@/lib/sermonArticle";
import { createServiceClient } from "@/lib/supabase/server";

// Keeps each run inside Vercel's Hobby-plan function time limit. Raise
// this (and maxDuration below, up to your plan's ceiling) if the account
// is on a paid tier with a higher limit.
const MAX_VIDEOS_PER_RUN = 3;

export const maxDuration = 60;

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 80);
}

export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const playlistId = process.env.SERMON_PLAYLIST_ID;
  if (!playlistId) {
    return NextResponse.json({ error: "SERMON_PLAYLIST_ID not configured" }, { status: 500 });
  }

  const supabase = createServiceClient();

  const [{ data: existing }, videos] = await Promise.all([
    supabase.from("blog_posts").select("source_video_id").not("source_video_id", "is", null),
    getPlaylistVideos(playlistId),
  ]);

  const processedIds = new Set((existing ?? []).map((r) => r.source_video_id as string));
  const unprocessed = filterUnprocessed(videos, processedIds).slice(0, MAX_VIDEOS_PER_RUN);

  const results: { videoId: string; title: string; status: string }[] = [];
  let publishedCount = 0;

  for (const video of unprocessed) {
    try {
      const transcript = await fetchTranscript(video.id);
      if (!transcript) {
        results.push({ videoId: video.id, title: video.title, status: "skipped: no transcript available" });
        continue;
      }

      const article = await generateSermonArticle({ videoTitle: video.title, transcript });
      if (!article) {
        results.push({ videoId: video.id, title: video.title, status: "skipped: article generation failed" });
        continue;
      }

      const { error } = await supabase.from("blog_posts").insert({
        title: article.title,
        slug: slugify(article.title),
        excerpt: article.excerpt,
        body: article.body.join("\n\n"),
        published: true,
        published_at: new Date().toISOString(),
        source_video_id: video.id,
        preacher: article.preacher,
        pull_quotes: article.pullQuotes,
      });

      if (error) {
        results.push({ videoId: video.id, title: video.title, status: `skipped: insert failed (${error.message})` });
        continue;
      }

      publishedCount++;
      results.push({ videoId: video.id, title: video.title, status: "published" });
    } catch (err) {
      results.push({
        videoId: video.id,
        title: video.title,
        status: `skipped: ${err instanceof Error ? err.message : "unknown error"}`,
      });
    }
  }

  if (publishedCount > 0) {
    revalidatePath("/blog");
  }

  return NextResponse.json({ scanned: unprocessed.length, published: publishedCount, results });
}
```

- [ ] **Step 2: Add the Vercel Cron config**

Create `vercel.json`:
```json
{
  "crons": [
    { "path": "/api/cron/scan-sermons", "schedule": "0 12 * * 1" }
  ]
}
```

- [ ] **Step 3: Type-check**

Run: `npx tsc --noEmit`
Expected: no errors

- [ ] **Step 4: Set required env vars locally**

Add to `.env.local` (create the file's entries if missing; do not commit this file — it's already gitignored):
```
YOUTUBE_API_KEY=<your key from Google Cloud Console, YouTube Data API v3 enabled>
SERMON_PLAYLIST_ID=<the playlist ID from the sermon playlist's URL, e.g. PLxxxxxxxxxxxxxxxx>
ANTHROPIC_API_KEY=<your Anthropic API key>
CRON_SECRET=<any random string, e.g. output of `openssl rand -hex 32`>
```

- [ ] **Step 5: Manual end-to-end verification — real video**

Start the dev server. In a second terminal, trigger the route against a real video already in the configured playlist:
```bash
curl -s -H "Authorization: Bearer $CRON_SECRET" http://localhost:3000/api/cron/scan-sermons | jq
```
Expected: JSON response with `"published": 1` (or more, up to `MAX_VIDEOS_PER_RUN`) and a `results` array showing `"status": "published"` for at least one video.

Check Supabase (`execute_sql`, `select title, slug, source_video_id, preacher, pull_quotes from blog_posts where source_video_id is not null;`) to confirm the row landed with real (not null) `body`/`excerpt`, and visit the resulting `/blog/<slug>` page to confirm it renders with the video embed, byline (if the AI found one), and pull-quotes.

- [ ] **Step 6: Manual verification — idempotency**

Run the exact same curl command again:
```bash
curl -s -H "Authorization: Bearer $CRON_SECRET" http://localhost:3000/api/cron/scan-sermons | jq
```
Expected: the previously-processed video does NOT appear again in `results` — either the response shows `"scanned": 0` (if that was the only unprocessed video) or it processes the *next* unprocessed video in the playlist, but never re-publishes the same `source_video_id`. Confirm via Supabase that no duplicate row exists for that `source_video_id`.

- [ ] **Step 7: Manual verification — auth rejection**

```bash
curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/api/cron/scan-sermons
```
Expected: `401`

- [ ] **Step 8: Manual verification — missing transcript is skipped safely**

Temporarily pick a video ID known to have captions disabled (or briefly point at an invalid video ID), and confirm the route's response shows `"status": "skipped: no transcript available"` for it, with `scanned` still reflecting any other videos processed in the same run, and no partial/broken row inserted for the failed one.

- [ ] **Step 9: Manual verification — admin edit preserves sermon metadata**

Using the real published post from Step 5, open `/admin/blog/<its id>` (find the id via `select id from blog_posts where source_video_id is not null limit 1;`), make a trivial edit to the body text, and save. Then re-check via `execute_sql`:
```sql
select source_video_id, preacher, pull_quotes from blog_posts where id = '<the id>';
```
Expected: all three columns are unchanged from before the edit — `updatePost` (in `app/admin/(protected)/blog/actions.ts`) only ever writes `title, slug, excerpt, body, published, published_at`, so it can't have touched them, but this confirms it in practice rather than by inspection alone.

- [ ] **Step 10: Commit**

```bash
git add "app/api/cron/scan-sermons/route.ts" vercel.json
git commit -m "Add weekly sermon-scan cron job

Ties together playlist enumeration, transcript fetching, and Claude
article generation into one route, triggered weekly by Vercel Cron.
Each video is processed independently -- one failure (no captions, AI
error, insert error) is logged and skipped without blocking the rest
of the batch or requiring manual retry (it's simply picked up again
on the next scheduled run)."
```

- [ ] **Step 11: Set the same env vars in Vercel**

In the Vercel dashboard for this project, add `YOUTUBE_API_KEY`, `SERMON_PLAYLIST_ID`, `ANTHROPIC_API_KEY`, and `CRON_SECRET` under **Settings → Environment Variables**, scoped to **Production** (and Preview too, if you want the cron-adjacent code paths — like any manual curl test against a preview deployment — to work there as well; the route itself is only ever invoked by Vercel Cron in Production).

---

## Post-plan note

Once merged and the env vars are set in Vercel, the first scheduled run will begin backfilling the playlist at `MAX_VIDEOS_PER_RUN` (3) videos per week. For a large existing playlist, this will take several weeks to fully catch up — expected, per the approved design spec.
