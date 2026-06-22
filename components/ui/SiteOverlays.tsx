'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';

const LIVE_URL = 'https://www.youtube.com/channel/UCoogH4HuVXSn4okSpRlsDQA/live';

function isSundayService() {
  const et = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const h = et.getHours();
  return et.getDay() === 0 && h >= 9 && h < 13;
}

export function SiteOverlays() {
  const [bar, setBar] = useState(false);
  const [toast, setToast] = useState(false);
  const [modal, setModal] = useState(false);
  const [slide, setSlide] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    // 1. CACNA announcement bar — persists until dismissed
    if (!localStorage.getItem('ann-cacna2026')) {
      setBar(true);
      document.documentElement.style.setProperty('--bar-h', '44px');
    }

    // 2. Live toast — Sundays 9 AM–1 PM ET, once per session
    if (isSundayService() && !sessionStorage.getItem('live-toast-seen')) {
      setToast(true);
      timers.push(setTimeout(() => setToast(false), 12000));
    }

    // 3. Welcome modal — first-ever visit, 2 s delay
    if (!localStorage.getItem('cac-visited')) {
      localStorage.setItem('cac-visited', '1');
      timers.push(setTimeout(() => setModal(true), 2000));
    }

    // 4. Prayer slide-in — once per session, 45 s delay
    if (!sessionStorage.getItem('prayer-prompt-seen')) {
      timers.push(setTimeout(() => {
        sessionStorage.setItem('prayer-prompt-seen', '1');
        setSlide(true);
      }, 45000));
    }

    return () => timers.forEach(clearTimeout);
  }, []);

  function dismissBar() {
    setBar(false);
    localStorage.setItem('ann-cacna2026', '1');
    document.documentElement.style.setProperty('--bar-h', '0px');
  }

  function dismissToast() {
    setToast(false);
    sessionStorage.setItem('live-toast-seen', '1');
  }

  return (
    <>
      {/* ── 1. Announcement bar ─────────────────────────────────── */}
      {bar && (
        <div
          role="banner"
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
            background: '#1B130E', height: 44,
            display: 'flex', alignItems: 'center',
            padding: '0 clamp(16px,4vw,48px)', gap: 12,
          }}
        >
          <div aria-hidden style={{ width: 7, height: 7, borderRadius: '50%', background: '#E8A33D', flexShrink: 0 }} />
          <span style={{ color: 'rgba(255,247,239,.9)', fontSize: 13, fontWeight: 600, flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            CACNA 2026 · July 13–18 · Blue Ridge Summit, PA
          </span>
          <Link
            href="/events/cacna-2026"
            style={{ color: '#E8A33D', fontSize: 13, fontWeight: 800, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            Learn more →
          </Link>
          <button
            onClick={dismissBar}
            aria-label="Dismiss announcement"
            style={{ background: 'none', border: 'none', color: 'rgba(255,247,239,.4)', cursor: 'pointer', fontSize: 20, lineHeight: 1, padding: '0 0 0 8px', flexShrink: 0 }}
          >
            ×
          </button>
        </div>
      )}

      {/* ── 2. Live Sunday toast ─────────────────────────────────── */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed', bottom: 24, right: 24, zIndex: 900,
            background: '#1C3A2A', borderRadius: 14,
            padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
            boxShadow: '0 8px 32px rgba(0,0,0,.35)',
            maxWidth: 320, width: 'calc(100vw - 48px)',
          }}
        >
          <div aria-hidden style={{ width: 9, height: 9, borderRadius: '50%', background: '#4ade80', flexShrink: 0, boxShadow: '0 0 0 3px rgba(74,222,128,.25)' }} />
          <span style={{ color: '#fff', fontSize: 14, fontWeight: 600, flex: 1, lineHeight: 1.4 }}>
            Sunday service is live now.
          </span>
          <a
            href={LIVE_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: 'rgba(255,255,255,.18)', color: '#fff', fontSize: 12, fontWeight: 800, padding: '6px 12px', borderRadius: 20, textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            Watch →
          </a>
          <button
            onClick={dismissToast}
            aria-label="Close"
            style={{ background: 'none', border: 'none', color: 'rgba(255,247,239,.4)', cursor: 'pointer', fontSize: 18, lineHeight: 1, padding: 0, flexShrink: 0 }}
          >
            ×
          </button>
        </div>
      )}

      {/* ── 3. First-visit welcome modal ─────────────────────────── */}
      {modal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Welcome to CAC Salvation Center"
          style={{ position: 'fixed', inset: 0, zIndex: 950, background: 'rgba(27,19,14,.62)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
          onClick={(e) => { if (e.target === e.currentTarget) setModal(false); }}
        >
          <div style={{ background: '#fff', borderRadius: 24, maxWidth: 440, width: '100%', overflow: 'hidden', boxShadow: '0 32px 80px rgba(0,0,0,.4)' }}>
            <div style={{ background: 'linear-gradient(135deg,#1B130E,#3A2410)', padding: '32px 32px 28px', position: 'relative' }}>
              <button
                onClick={() => setModal(false)}
                aria-label="Close welcome message"
                style={{ position: 'absolute', top: 14, right: 14, background: 'rgba(255,247,239,.15)', border: 'none', borderRadius: '50%', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'rgba(255,247,239,.7)', fontSize: 18 }}
              >
                ×
              </button>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#E8A33D', marginBottom: 10 }}>First time here?</div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 28, color: '#fff', lineHeight: 1.15 }}>
                You&apos;re welcome here.
              </div>
            </div>
            <div style={{ padding: '24px 32px 28px' }}>
              <p style={{ fontSize: 15, color: '#5f5e5a', lineHeight: 1.7, marginBottom: 20 }}>
                Join us every Sunday at <strong style={{ color: '#1B130E' }}>10:30 AM</strong> at 10710 Marriottsville Rd, Randallstown, MD. No dress code, no pressure — just a real community of faith.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Link
                  href="/visit"
                  onClick={() => setModal(false)}
                  style={{ display: 'block', textAlign: 'center', background: '#D62828', color: '#fff', fontWeight: 800, fontSize: 15, padding: '14px 24px', borderRadius: 999, textDecoration: 'none' }}
                >
                  Plan my first visit →
                </Link>
                <button
                  onClick={() => setModal(false)}
                  style={{ background: 'none', border: 'none', color: '#888780', fontSize: 13, cursor: 'pointer', padding: 4 }}
                >
                  Maybe next time
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 4. Prayer request slide-in ───────────────────────────── */}
      {slide && (
        <div
          role="complementary"
          aria-label="Prayer request"
          style={{
            position: 'fixed', bottom: toast ? 96 : 24, right: 24, zIndex: 850,
            background: '#fff', borderRadius: 18, maxWidth: 280,
            border: '1px solid rgba(27,19,14,.1)',
            boxShadow: '0 16px 48px rgba(0,0,0,.18)',
            padding: '20px 20px 18px',
          }}
        >
          <button
            onClick={() => setSlide(false)}
            aria-label="Close prayer prompt"
            style={{ position: 'absolute', top: 12, right: 12, background: 'none', border: 'none', cursor: 'pointer', color: '#888780', fontSize: 16, lineHeight: 1 }}
          >
            ×
          </button>
          <div style={{ width: 38, height: 38, background: '#FCEBEB', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
            <Heart size={18} strokeWidth={2} color="#D62828" aria-hidden />
          </div>
          <div style={{ fontWeight: 800, fontSize: 15, color: '#1B130E', marginBottom: 6 }}>Need prayer?</div>
          <p style={{ fontSize: 13, color: '#5f5e5a', lineHeight: 1.6, marginBottom: 14 }}>
            Share your request and our pastors will pray with you this week.
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            <Link
              href="/prayer"
              onClick={() => setSlide(false)}
              style={{ flex: 1, textAlign: 'center', background: '#D62828', color: '#fff', fontWeight: 700, fontSize: 13, padding: '9px 14px', borderRadius: 20, textDecoration: 'none' }}
            >
              Send request
            </Link>
            <button
              onClick={() => setSlide(false)}
              style={{ background: '#f4f3f1', color: '#1B130E', fontWeight: 600, fontSize: 13, border: 'none', padding: '9px 14px', borderRadius: 20, cursor: 'pointer' }}
            >
              Not now
            </button>
          </div>
        </div>
      )}
    </>
  );
}
