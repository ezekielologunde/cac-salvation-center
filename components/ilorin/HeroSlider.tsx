"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

export interface HeroSlide {
  src: string;
  alt: string;
}

const AUTOPLAY_MS = 5000;

export function HeroSlider({ photos }: { photos: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  // The viewer's own choice, kept until they change it (hover and taps only pause for a moment).
  const [userPaused, setUserPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((i: number) => {
    setIndex(((i % photos.length) + photos.length) % photos.length);
  }, [photos.length]);

  useEffect(() => {
    if (paused || userPaused) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % photos.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, userPaused, photos.length]);

  function handleManual(i: number) {
    goTo(i);
    // Give the viewer a longer breather after they interact, rather than
    // immediately yanking to the next slide mid-look.
    setPaused(true);
    setTimeout(() => setPaused(false), AUTOPLAY_MS);
  }

  return (
    <div
      role="region"
      aria-label="Photos of C.A.C Salvation Centre, Ilorin"
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {photos.map((photo, i) => (
        <div
          key={photo.src}
          style={{
            position: "absolute",
            inset: 0,
            opacity: i === index ? 1 : 0,
            transition: "opacity 1.1s ease",
          }}
        >
          <Image
            src={photo.src}
            alt=""
            fill
            priority={i === 0}
            style={{
              objectFit: "cover",
              transform: i === index ? "scale(1.07)" : "scale(1)",
              transition: i === index ? `transform ${AUTOPLAY_MS * 1.4}ms ease-out` : "none",
            }}
            sizes="100vw"
          />
        </div>
      ))}

      {/* Prev / Next */}
      <button
        type="button"
        aria-label="Previous photo"
        onClick={() => handleManual(index - 1)}
        style={{
          position: "absolute", top: "50%", left: "clamp(10px,2vw,28px)", transform: "translateY(-50%)",
          width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(255,255,255,.3)",
          background: "rgba(6,49,31,.4)", color: "#fff", display: "grid", placeItems: "center",
          cursor: "pointer", backdropFilter: "blur(4px)",
        }}
      >
        <ChevronLeft size={20} strokeWidth={2.4} />
      </button>
      <button
        type="button"
        aria-label="Next photo"
        onClick={() => handleManual(index + 1)}
        style={{
          position: "absolute", top: "50%", right: "clamp(10px,2vw,28px)", transform: "translateY(-50%)",
          width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(255,255,255,.3)",
          background: "rgba(6,49,31,.4)", color: "#fff", display: "grid", placeItems: "center",
          cursor: "pointer", backdropFilter: "blur(4px)",
        }}
      >
        <ChevronRight size={20} strokeWidth={2.4} />
      </button>

      {/* Pause / play (WCAG 2.2.2: moving content that runs over 5 seconds needs a control) */}
      <button
        type="button"
        aria-label={userPaused ? "Play photo slideshow" : "Pause photo slideshow"}
        onClick={() => setUserPaused((p) => !p)}
        style={{
          position: "absolute", bottom: 10, right: "clamp(10px,2vw,28px)",
          width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(255,255,255,.3)",
          background: "rgba(6,49,31,.4)", color: "#fff", display: "grid", placeItems: "center",
          cursor: "pointer", backdropFilter: "blur(4px)",
        }}
      >
        {userPaused ? <Play size={18} fill="currentColor" aria-hidden /> : <Pause size={18} fill="currentColor" aria-hidden />}
      </button>

      {/* Dots */}
      <div
        style={{
          position: "absolute", bottom: 18, left: "50%", transform: "translateX(-50%)",
          display: "flex", gap: 9, padding: "8px 14px", borderRadius: 999,
          background: "rgba(6,49,31,.35)", backdropFilter: "blur(4px)",
        }}
      >
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            aria-label={`Show photo ${i + 1} of ${photos.length}`}
            aria-current={i === index}
            onClick={() => handleManual(i)}
            style={{
              width: i === index ? 20 : 8, height: 8, borderRadius: 999,
              border: "none", padding: 0, cursor: "pointer",
              background: i === index ? "#2BB673" : "rgba(255,255,255,.5)",
              transition: "width .3s ease, background .3s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
