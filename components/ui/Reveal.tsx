'use client';
import { useEffect, useRef, type ReactNode, type CSSProperties } from 'react';

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}

export function Reveal({ children, delay = 0, className, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = (instant = false) => {
      el.style.transition = instant
        ? 'none'
        : `opacity .9s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform .9s cubic-bezier(.2,.7,.2,1) ${delay}ms`;
      el.style.opacity = '1';
      el.style.transform = 'none';
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { show(); io.unobserve(el); }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    const timer = setTimeout(() => show(true), 1400);

    return () => { io.disconnect(); clearTimeout(timer); };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, opacity: 0, transform: 'translateY(34px)' }}
    >
      {children}
    </div>
  );
}
