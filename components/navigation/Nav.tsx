'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

interface NavProps {
  dark?: boolean;
}

export function Nav({ dark = false }: NavProps) {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const update = () => {
      const scrolled = window.scrollY > 36;
      nav.style.background = open
        ? dark ? 'rgba(12,14,19,.97)' : 'rgba(255,247,239,.97)'
        : scrolled
        ? dark ? 'rgba(12,14,19,.85)' : 'rgba(255,247,239,.92)'
        : 'transparent';
      nav.style.boxShadow = scrolled && !open
        ? dark ? '0 6px 24px rgba(0,0,0,.4)' : '0 6px 24px rgba(27,19,14,.08)'
        : 'none';
      nav.style.backdropFilter = scrolled || open ? 'blur(12px)' : 'none';
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [dark, open]);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const ink = dark ? 'var(--cream)' : 'var(--ink)';
  const accent = dark ? 'var(--gold)' : 'var(--red)';

  const links = [
    { href: '/about', label: 'Who We Are' },
    { href: '/online', label: 'Online' },
    { href: '/giving', label: 'Giving' },
    { href: '/visit', label: 'Visit' },
  ];

  return (
    <>
      <nav
        ref={navRef}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '18px clamp(20px,5vw,64px)',
          transition: 'background .4s, box-shadow .4s',
        }}
      >
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 13, textDecoration: 'none', color: ink, flexShrink: 0 }}>
          <Image src="/images/logo.png" alt="CAC Salvation Center" width={46} height={46} style={{ borderRadius: 14, objectFit: 'cover', flexShrink: 0 }} />
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span style={{ fontSize: 10, letterSpacing: '2.5px', textTransform: 'uppercase', color: accent, fontWeight: 700 }}>Christ Apostolic Church</span>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 21, letterSpacing: '-.3px', marginTop: 3 }}>Salvation Center</span>
          </span>
        </Link>

        {/* Desktop links — hidden on mobile via CSS class */}
        <div className="nav-desktop" style={{ alignItems: 'center', gap: 30 }}>
          {links.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link key={href} href={href} style={{ fontSize: 14.5, fontWeight: active ? 700 : 600, color: active ? accent : ink, textDecoration: 'none' }}>
                {label}
              </Link>
            );
          })}
          <Link href="/online" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: dark ? 'var(--red)' : 'var(--ink)', color: 'var(--cream)', fontWeight: 700, fontSize: 14, padding: '11px 20px', borderRadius: 999, textDecoration: 'none', whiteSpace: 'nowrap' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff5252', animation: 'pulse-red 1.8s infinite', display: 'inline-block' }} />
            Watch Live
          </Link>
        </div>

        {/* Hamburger — hidden on desktop via CSS class */}
        <button
          className="nav-hbg"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 8, color: ink, gap: 5, alignItems: 'center' }}
        >
          <span style={{ display: 'block', width: 24, height: 2, background: 'currentColor', borderRadius: 2, transition: 'transform .25s', transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }} />
          <span style={{ display: 'block', width: 24, height: 2, background: 'currentColor', borderRadius: 2, transition: 'opacity .25s', opacity: open ? 0 : 1 }} />
          <span style={{ display: 'block', width: 24, height: 2, background: 'currentColor', borderRadius: 2, transition: 'transform .25s', transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
        </button>
      </nav>

      {/* Mobile overlay */}
      {open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 99,
          background: dark ? 'rgba(12,14,19,.97)' : 'rgba(255,247,239,.97)',
          backdropFilter: 'blur(14px)',
          display: 'flex', flexDirection: 'column',
          padding: '110px 32px 48px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            {links.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href} href={href}
                  onClick={() => setOpen(false)}
                  style={{
                    fontFamily: 'var(--font-display)', fontWeight: 800,
                    fontSize: 'clamp(32px,8vw,48px)',
                    color: active ? accent : ink,
                    textDecoration: 'none', letterSpacing: '-1px',
                    padding: '16px 0',
                    borderBottom: `1px solid ${dark ? 'rgba(255,247,239,.1)' : 'var(--line)'}`,
                  }}
                >
                  {label}
                </Link>
              );
            })}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 32 }}>
            <Link href="/online" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, background: 'var(--red)', color: '#fff', fontWeight: 700, fontSize: 17, padding: '18px 24px', borderRadius: 999, textDecoration: 'none', boxShadow: '0 14px 30px rgba(214,40,40,.4)' }}>
              <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#fff', animation: 'pulse-red 1.8s infinite', display: 'inline-block' }} />
              Watch Live
            </Link>
            <Link href="/visit" onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 17, padding: '18px 24px', borderRadius: 999, textDecoration: 'none', border: `1.5px solid ${dark ? 'rgba(255,247,239,.3)' : 'var(--ink)'}`, color: ink }}>
              Plan a Visit
            </Link>
            <p style={{ fontSize: 12.5, color: dark ? 'rgba(255,247,239,.4)' : 'var(--ink-soft)', textAlign: 'center', margin: '8px 0 0' }}>
              Sundays 10:30 AM · 10710 Marriottsville Rd, Randallstown MD
            </p>
          </div>
        </div>
      )}
    </>
  );
}
