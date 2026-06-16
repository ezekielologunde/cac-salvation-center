'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

interface NavProps {
  dark?: boolean;
}

export function Nav({ dark = false }: NavProps) {
  const navRef = useRef<HTMLElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const onScroll = () => {
      const scrolled = window.scrollY > 36;
      nav.style.background = scrolled
        ? dark ? 'rgba(12,14,19,.85)' : 'rgba(255,247,239,.92)'
        : 'transparent';
      nav.style.boxShadow = scrolled
        ? dark ? '0 6px 24px rgba(0,0,0,.4)' : '0 6px 24px rgba(27,19,14,.08)'
        : 'none';
      nav.style.backdropFilter = scrolled ? 'blur(12px)' : 'none';
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dark]);

  const textColor = dark ? 'var(--cream)' : 'var(--ink)';
  const activeColor = dark ? 'var(--gold)' : 'var(--red)';

  const links = [
    { href: '/about', label: 'Who We Are' },
    { href: '/online', label: 'Online' },
    { href: '/giving', label: 'Giving' },
    { href: '/visit', label: 'Visit' },
  ];

  return (
    <nav
      ref={navRef}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '18px clamp(20px,5vw,64px)',
        transition: 'background .4s, box-shadow .4s',
      }}
    >
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 13, textDecoration: 'none', color: textColor }}>
        <span style={{
          width: 46, height: 46, borderRadius: 14,
          background: 'linear-gradient(150deg,#F15F22,#D62828 55%,#9E1B1B)',
          display: 'grid', placeItems: 'center',
          boxShadow: '0 8px 20px rgba(214,40,40,.4)', flexShrink: 0,
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M9.5 2.2h5v5.3h5.3v5h-5.3v9.3h-5v-9.3H4.2v-5h5.3z" fill="#fff" />
          </svg>
        </span>
        <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{ fontSize: 10, letterSpacing: '2.5px', textTransform: 'uppercase', color: activeColor, fontWeight: 700 }}>
            Christ Apostolic Church
          </span>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 21, letterSpacing: '-.3px', marginTop: 3 }}>
            Salvation Center
          </span>
        </span>
      </Link>

      <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
        {links.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              style={{
                fontSize: 14.5,
                fontWeight: active ? 700 : 600,
                color: active ? activeColor : textColor,
                textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          );
        })}
        <Link
          href="/online"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: dark ? 'var(--red)' : 'var(--ink)',
            color: 'var(--cream)',
            fontWeight: 700, fontSize: 14,
            padding: '11px 20px', borderRadius: 999,
            textDecoration: 'none',
          }}
        >
          <span style={{
            width: 8, height: 8, borderRadius: '50%', background: '#ff5252',
            animation: 'pulse-red 1.8s infinite',
            display: 'inline-block',
          }} />
          Watch Live
        </Link>
      </div>
    </nav>
  );
}
