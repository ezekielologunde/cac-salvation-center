"use client";

import { type ReactNode, type CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Direction = "up" | "down" | "left" | "right" | "scale";

interface RevealProps {
  children: ReactNode;
  /** Delay in milliseconds (kept for backward compatibility across the site). */
  delay?: number;
  from?: Direction;
  className?: string;
  style?: CSSProperties;
  /** Animate immediately on mount (for above-the-fold hero content) instead of waiting for scroll into view. */
  immediate?: boolean;
}

const offset: Record<Direction, { x?: number; y?: number; scale?: number }> = {
  up: { y: 36 },
  down: { y: -36 },
  left: { x: 40 },
  right: { x: -40 },
  scale: { scale: 0.94 },
};

export function Reveal({ children, delay = 0, from = "up", className, style, immediate = false }: RevealProps) {
  const reduce = useReducedMotion();
  const o = offset[from];

  const hidden = reduce
    ? { opacity: 0 }
    : { opacity: 0, x: o.x ?? 0, y: o.y ?? 0, scale: o.scale ?? 1 };
  const shown = { opacity: 1, x: 0, y: 0, scale: 1 };

  return (
    <motion.div
      className={className}
      style={style}
      initial={hidden}
      {...(immediate
        ? { animate: shown }
        : { whileInView: shown, viewport: { once: true, margin: "0px 0px -8% 0px" } })}
      transition={{
        duration: reduce ? 0.3 : immediate ? 0.45 : 0.85,
        delay: (immediate ? Math.min(delay, 200) : delay) / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
