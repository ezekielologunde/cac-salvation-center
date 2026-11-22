"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/**
 * Click-to-load YouTube player. Until the visitor taps play, the page shows
 * only a poster served through next/image (fetched by our server, so the
 * browser makes no request to YouTube) and a play button. The privacy-mode
 * player is created on tap, then takes focus.
 *
 * Fills its positioned parent (e.g. a 16:9 padding-bottom box).
 */
export function YouTubeFacade({ id, title, live = false }: { id: string; title: string; live?: boolean }) {
  const [active, setActive] = useState(false);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (active) frameRef.current?.focus();
  }, [active]);

  const fill = { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" } as const;

  if (active) {
    return (
      <iframe
        ref={frameRef}
        src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={fill}
      />
    );
  }

  const cta = live ? "Watch live" : "Play video";
  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`${cta}: ${title}`}
      className="press"
      style={{ ...fill, padding: 0, cursor: "pointer", background: "#000", display: "block" }}
    >
      <Image
        src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
        alt=""
        fill
        sizes="(max-width: 940px) 100vw, 900px"
        style={{ objectFit: "cover" }}
      />
      <span aria-hidden style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.3)" }} />
      <span
        aria-hidden
        style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          display: "inline-flex", alignItems: "center", gap: 12,
          minHeight: 64, padding: "0 28px 0 22px", borderRadius: 999,
          background: live ? "var(--red)" : "rgba(255,255,255,.95)",
          color: live ? "#fff" : "var(--ink)",
          fontFamily: "var(--font-body)", fontSize: 17, fontWeight: 800,
          boxShadow: "0 10px 30px rgba(0,0,0,.45)", whiteSpace: "nowrap",
        }}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill={live ? "#fff" : "var(--red)"}><path d="M8 5v14l11-7z" /></svg>
        {cta}
      </span>
    </button>
  );
}
