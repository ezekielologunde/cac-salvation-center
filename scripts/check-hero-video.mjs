// Checks the homepage hero video gate and the /online click-to-load player:
//
//   node scripts/check-hero-video.mjs
//
// Node 24 strips TypeScript types natively. Exits 1 if any check fails.
import { readFileSync } from "node:fs";

const read = (f) => readFileSync(new URL(`../${f}`, import.meta.url), "utf8");
const { canLoadHeroVideo, HERO_VIDEO_WIDTH_QUERY, COARSE_POINTER_QUERY } = await import("../lib/heroVideo.ts");

let failures = 0;
function check(name, ok) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}`);
  if (!ok) failures++;
}

const desktop = { wideViewport: true, coarsePointer: false, reducedMotion: false };
check("video loads on a wide desktop without a coarse pointer", canLoadHeroVideo(desktop) === true);
check("video loads on a fast connection", canLoadHeroVideo({ ...desktop, effectiveType: "4g", saveData: false }) === true);
check("no video under 768px", canLoadHeroVideo({ ...desktop, wideViewport: false }) === false);
check("no video on a coarse (touch-first) pointer, even when wide", canLoadHeroVideo({ ...desktop, coarsePointer: true }) === false);
check("no video with prefers-reduced-motion", canLoadHeroVideo({ ...desktop, reducedMotion: true }) === false);
check("no video with Save-Data", canLoadHeroVideo({ ...desktop, saveData: true }) === false);
for (const t of ["slow-2g", "2g", "3g"]) {
  check(`no video on ${t}`, canLoadHeroVideo({ ...desktop, effectiveType: t }) === false);
}
check("queries are 768px wide and coarse pointer",
  HERO_VIDEO_WIDTH_QUERY === "(min-width: 768px)" && COARSE_POINTER_QUERY === "(pointer: coarse)");

const hero = read("components/sections/Hero.tsx");
const home = read("app/page.tsx");
check("hero and homepage do not hotlink img.youtube.com", !/img\.youtube\.com/.test(hero) && !/img\.youtube\.com/.test(home));
check("hero poster is self-hosted and preloaded", /src="\/images\/[^"]+"[\s\S]{0,80}\bpreload\b/.test(hero));
check("hero gates the video through canLoadHeroVideo", /canLoadHeroVideo\(/.test(hero));
check("hero has a Pause/Play toggle with aria-pressed", /aria-pressed=\{videoPaused\}/.test(hero));

const online = read("app/online/page.tsx");
const facade = read("components/ui/YouTubeFacade.tsx");
check("/online renders no eager iframe", !/<iframe/.test(online) && /<YouTubeFacade/.test(online));
check("facade creates the iframe only after a tap", /if \(active\)[\s\S]*<iframe/.test(facade) && /onClick=\{\(\) => setActive\(true\)\}/.test(facade));
check("facade player uses youtube-nocookie.com", /youtube-nocookie\.com\/embed/.test(facade) && !/www\.youtube\.com\/embed/.test(facade));

if (failures) {
  console.error(`\n${failures} check(s) failed`);
  process.exit(1);
}
console.log("\nAll checks passed");
