"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 22, mass: 0.5 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  const dotX = useSpring(rawX, { stiffness: 600, damping: 30 });
  const dotY = useSpring(rawY, { stiffness: 600, damping: 30 });

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onEnter = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      const isInteractive = el.closest("a, button, [role='button'], input, select, textarea, [data-cursor='hover']");
      setHovering(!!isInteractive);
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onEnter, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    // Hide default cursor on body
    document.body.style.cursor = "none";

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onEnter);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.body.style.cursor = "";
    };
  }, [rawX, rawY, visible]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        ref={cursorRef}
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicking ? 0.75 : hovering ? 1.6 : 1,
          borderColor: hovering ? "rgba(212,169,67,0.8)" : "rgba(255,255,255,0.4)",
        }}
        transition={{ scale: { type: "spring", stiffness: 300, damping: 25 }, opacity: { duration: 0.15 } }}
        className="fixed top-0 left-0 z-[9999] w-8 h-8 rounded-full border pointer-events-none"
        aria-hidden
      />
      {/* Inner dot */}
      <motion.div
        ref={dotRef}
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicking ? 2 : hovering ? 0 : 1,
          backgroundColor: hovering ? "#D4A943" : "#ffffff",
        }}
        transition={{ scale: { type: "spring", stiffness: 600, damping: 30 }, opacity: { duration: 0.15 } }}
        className="fixed top-0 left-0 z-[9999] w-1.5 h-1.5 rounded-full pointer-events-none"
        aria-hidden
      />
    </>
  );
}
