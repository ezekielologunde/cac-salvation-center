// Decides whether the homepage hero may load its YouTube background video.
// The player costs over 1 MB of third-party JS and media, so it only loads
// where it is cheap and wanted: a wide screen without a touch-first pointer, with no reduced
// motion, no data saver and no slow connection. Everyone else keeps the
// self-hosted poster.

/** Viewport a screen must match for the video to load. */
export const HERO_VIDEO_WIDTH_QUERY = "(min-width: 768px)";
/** Phones and tablets: a primary pointer that is a finger. */
export const COARSE_POINTER_QUERY = "(pointer: coarse)";

/** Network Information API effective types treated as too slow for video. */
const SLOW_CONNECTIONS = new Set(["slow-2g", "2g", "3g"]);

export type HeroVideoEnv = {
  /** Whether HERO_VIDEO_WIDTH_QUERY matches. */
  wideViewport: boolean;
  /** Whether COARSE_POINTER_QUERY matches. */
  coarsePointer: boolean;
  /** Whether the user asked for reduced motion. */
  reducedMotion: boolean;
  /** navigator.connection.saveData, when the browser exposes it. */
  saveData?: boolean;
  /** navigator.connection.effectiveType, when the browser exposes it. */
  effectiveType?: string;
};

export function canLoadHeroVideo(env: HeroVideoEnv): boolean {
  if (!env.wideViewport || env.coarsePointer || env.reducedMotion) return false;
  if (env.saveData) return false;
  if (env.effectiveType && SLOW_CONNECTIONS.has(env.effectiveType)) return false;
  return true;
}
