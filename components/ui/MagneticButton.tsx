"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "ghost" | "outline";
  strength?: number;
  tag?: "a" | "button";
}

export function MagneticButton({
  children,
  className,
  onClick,
  href,
  variant = "primary",
  strength = 0.35,
  tag = "button",
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({ x: (e.clientX - cx) * strength, y: (e.clientY - cy) * strength });
  }

  function handleMouseLeave() {
    setPos({ x: 0, y: 0 });
  }

  const baseClass = cn(
    "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl",
    "text-sm font-semibold tracking-wide cursor-pointer select-none",
    "transition-colors duration-200 overflow-hidden",
    variant === "primary" && "bg-gold text-black hover:bg-gold-light",
    variant === "ghost" && "glass text-white/80 hover:text-white hover:border-white/15",
    variant === "outline" && "border border-white/15 text-white/80 hover:border-gold/40 hover:text-white",
    className
  );

  const motionProps = {
    ref: ref as React.RefObject<HTMLButtonElement>,
    animate: { x: pos.x, y: pos.y },
    transition: { type: "spring" as const, stiffness: 300, damping: 25, mass: 0.5 },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    className: baseClass,
    onClick,
  };

  if (tag === "a" && href) {
    return (
      <motion.a
        href={href}
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring" as const, stiffness: 300, damping: 25, mass: 0.5 }}
        onMouseMove={handleMouseMove as never}
        onMouseLeave={handleMouseLeave}
        className={baseClass}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button {...motionProps}>
      {children}
    </motion.button>
  );
}
