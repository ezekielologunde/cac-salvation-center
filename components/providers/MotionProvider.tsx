"use client";

import { LazyMotion, MotionConfig } from "framer-motion";

const loadFeatures = () => import("./motionFeatures").then((mod) => mod.default);

/**
 * One place for animation settings.
 * - reducedMotion="user": every animation drops its movement (keeps fades) when the visitor's
 *   device asks for less motion, including components that never checked on their own.
 * - LazyMotion: components use the small `m` element and the engine downloads after the page loads.
 *   Not `strict`: the admin sidebar's shared-layout pill still uses the full `motion` element.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures}>{children}</LazyMotion>
    </MotionConfig>
  );
}
