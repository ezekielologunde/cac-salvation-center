import Link from 'next/link';
import type { CSSProperties } from 'react';
import { Reveal } from '@/components/ui/Reveal';

const pinSvg = (color: string) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={color}>
    <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
  </svg>
);

const mapsUrl = (q: string) => `https://maps.google.com/?q=${encodeURIComponent(q)}`;

type Church = { city: string; name: string; address: string; href: string; external: boolean; cta: string };

const usChurches: Church[] = [
  { city: 'Philadelphia, PA', name: 'C.A.C Kingdom Embassy', address: '1107 Bleigh Ave, Philadelphia, PA 19111', href: 'https://cackingdomembassy.org', external: true, cta: 'Visit site' },
  { city: 'Catonsville, MD', name: 'C.A.C Palace Of Peace', address: '1451 N Rolling Rd, Catonsville, MD 21228', href: 'https://cacpalaceofpeace.org', external: true, cta: 'Visit site' },
  { city: 'Rosedale, MD', name: 'C.A.C Salvation City', address: '8330 Pulaski Highway, Unit P, Rosedale, MD 21237', href: '/salvationcity', external: false, cta: 'Learn more' },
];

const ngChurches: Church[] = [
  { city: 'Ilorin, Kwara', name: 'C.A.C Salvation Center — Ilorin', address: 'Fate-Tanke Road & Abdullahi Mohammed St, 240102', href: '/ilorin', external: false, cta: 'Learn more' },
  { city: 'Ilorin, Kwara', name: 'C.A.C Holyghost Chapel', address: 'Behind Emmanuel Baptist College, Ilorin, 240102', href: mapsUrl('C.A.C Holyghost Chapel, Behind Emmanuel Baptist College, Ilorin, Nigeria'), external: true, cta: 'Directions' },
  { city: 'Osogbo', name: 'C.A.C Salvation City Osogbo', address: 'Arogun mosa Omobasorun St, Oke-Baale, 230284', href: mapsUrl('C.A.C Salvation City, Arogun mosa Omobasorun St, Oke-Baale, Osogbo, Nigeria'), external: true, cta: 'Directions' },
  { city: 'Ilorin, Kwara', name: 'C.A.C Kingdom Embassy Ilorin', address: 'Reke, Ilorin, Kwara, Nigeria', href: mapsUrl('C.A.C Kingdom Embassy, Reke, Ilorin, Kwara, Nigeria'), external: true, cta: 'Directions' },
];

function ChurchCard({ c, accent }: { c: Church; accent: string }) {
  const style: CSSProperties = {
    display: 'flex', flexDirection: 'column', height: '100%',
    background: 'var(--paper)', borderRadius: 18, padding: '20px 20px 18px',
    boxShadow: '0 8px 22px rgba(27,19,14,.05)', border: '1px solid var(--line)',
    textDecoration: 'none', color: 'inherit',
  };
  const inner = (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: accent, fontSize: 12, fontWeight: 800, marginBottom: 9 }}>
        {pinSvg(accent)} {c.city}
      </div>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 17, letterSpacing: '-.3px', lineHeight: 1.15, marginBottom: 6 }}>{c.name}</div>
      <div style={{ fontSize: 13, color: 'var(--ink-soft)', lineHeight: 1.5, marginBottom: 14, flex: 1 }}>{c.address}</div>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12.5, fontWeight: 700, color: accent }}>{c.cta} <span aria-hidden style={{ fontSize: 15 }}>→</span></div>
    </>
  );
  return c.external
    ? <a href={c.href} target="_blank" rel="noopener noreferrer" className="card-lift" style={style}>{inner}</a>
    : <Link href={c.href} className="card-lift" style={style}>{inner}</Link>;
}

export function GlobalChurches() {
  return (
    <section style={{ background: 'var(--cream-2)', padding: 'clamp(70px,9vw,120px) clamp(20px,5vw,64px)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <Reveal style={{ textAlign: 'center', marginBottom: 40 }}>
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--red)' }}>One family, many homes</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(34px,5vw,66px)', letterSpacing: '-1.5px', margin: '12px 0 0', lineHeight: 1 }}>
            Worship with us around the world
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ink-soft)', maxWidth: 560, margin: '16px auto 0' }}>
            Find a seat at one of our district churches in the U.S. or our extension churches in Nigeria — tap any for its site or directions.
          </p>
        </Reveal>

        {/* SVG arc map */}
        <Reveal style={{
          position: 'relative', background: 'var(--ink)', borderRadius: 28, overflow: 'hidden',
          height: 'clamp(220px,26vw,320px)', boxShadow: '0 26px 60px rgba(27,19,14,.2)',
          backgroundImage: 'radial-gradient(rgba(255,247,239,.10) 1.4px,transparent 1.4px)',
          backgroundSize: '26px 26px',
          marginBottom: 44,
        }}>
          <svg viewBox="0 0 1000 360" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            <path d="M250 175 C 420 60, 620 60, 740 150" fill="none" stroke="#E8A33D" strokeWidth="2.4" strokeDasharray="9 11" style={{ animation: 'map-dash 9s linear infinite', opacity: .85 }} />
          </svg>

          {/* USA cluster */}
          <div style={{ position: 'absolute', left: '25%', top: '48%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: 18, height: 18, margin: '0 auto' }}>
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--red)' }} />
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--red)', animation: 'ping-dot 2.4s ease-out infinite' }} />
            </div>
            <div style={{ marginTop: 14, background: 'rgba(255,247,239,.08)', border: '1px solid rgba(255,247,239,.16)', backdropFilter: 'blur(6px)', color: 'var(--cream)', borderRadius: 14, padding: '12px 18px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20 }}>United States</div>
              <div style={{ fontSize: 12.5, color: 'var(--gold)', fontWeight: 700, letterSpacing: '.5px' }}>3 DISTRICT CHURCHES</div>
            </div>
          </div>

          {/* Nigeria cluster */}
          <div style={{ position: 'absolute', left: '74%', top: '42%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: 18, height: 18, margin: '0 auto' }}>
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--gold)' }} />
              <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--gold)', animation: 'ping-dot 2.4s ease-out .9s infinite' }} />
            </div>
            <div style={{ marginTop: 14, background: 'rgba(255,247,239,.08)', border: '1px solid rgba(255,247,239,.16)', backdropFilter: 'blur(6px)', color: 'var(--cream)', borderRadius: 14, padding: '12px 18px' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20 }}>Nigeria</div>
              <div style={{ fontSize: 12.5, color: 'var(--gold)', fontWeight: 700, letterSpacing: '.5px' }}>4 EXTENSION CHURCHES</div>
            </div>
          </div>

          <div style={{ position: 'absolute', left: 24, bottom: 20, color: 'rgba(255,247,239,.55)', fontSize: 12.5, fontWeight: 600, letterSpacing: '.5px' }}>7 churches · 2 nations · 1 family</div>
        </Reveal>

        {/* US section */}
        <Reveal style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '0 0 18px' }}>
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: 'var(--red)', display: 'inline-block' }} />
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(20px,2.4vw,28px)', letterSpacing: '-.6px', margin: 0 }}>District Churches · United States</h3>
        </Reveal>
        <div className="r3" style={{ gap: 16, marginBottom: 38 }}>
          {usChurches.map((c, i) => (
            <Reveal key={c.name} delay={i * 90}><ChurchCard c={c} accent="var(--red)" /></Reveal>
          ))}
        </div>

        {/* Nigeria section */}
        <Reveal style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '0 0 18px' }}>
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(20px,2.4vw,28px)', letterSpacing: '-.6px', margin: 0 }}>Extension Churches · Nigeria</h3>
        </Reveal>
        <div className="r4" style={{ gap: 16 }}>
          {ngChurches.map((c, i) => (
            <Reveal key={c.name} delay={i * 70}><ChurchCard c={c} accent="#B7791F" /></Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
