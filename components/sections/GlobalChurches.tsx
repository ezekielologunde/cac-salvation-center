import { Reveal } from '@/components/ui/Reveal';

const pinSvg = (color: string) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={color}>
    <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
  </svg>
);

const usChurches = [
  { city: 'Philadelphia, PA', name: 'C.A.C Kingdom Embassy', address: '1107 Bleigh Ave, Philadelphia, PA 19111' },
  { city: 'Catonsville, MD', name: 'C.A.C Palace Of Peace', address: '1451 N Rolling Rd, Catonsville, MD 21228' },
  { city: 'Rosedale, MD', name: 'C.A.C Salvation City', address: '8330 Pulaski Highway, Unit P, Rosedale, MD 21237' },
];

const ngChurches = [
  { city: 'Ilorin, Kwara', name: 'C.A.C Salvation Center — Ilorin', address: 'Fate-Tanke Road & Abdullahi Mohammed St, 240102' },
  { city: 'Ilorin, Kwara', name: 'C.A.C Holyghost Chapel', address: 'Behind Emmanuel Baptist College, Ilorin, 240102' },
  { city: 'Osogbo', name: 'C.A.C Salvation City Osogbo', address: 'Arogun mosa Omobasorun St, Oke-Baale, 230284' },
  { city: 'Ilorin, Kwara', name: 'C.A.C Kingdom Embassy Ilorin', address: 'Reke, Ilorin, Kwara, Nigeria' },
];

export function GlobalChurches() {
  return (
    <section style={{ background: 'var(--cream-2)', padding: 'clamp(70px,9vw,120px) clamp(20px,5vw,64px)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <Reveal style={{ textAlign: 'center', marginBottom: 44 }}>
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--red)' }}>One family, many homes</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(34px,5vw,66px)', letterSpacing: '-1.5px', margin: '12px 0 0', lineHeight: 1 }}>
            Worship with us around the world
          </h2>
          <p style={{ fontSize: 16, color: 'var(--ink-soft)', maxWidth: 560, margin: '16px auto 0' }}>
            Find a seat at one of our district churches in the U.S. or our extension churches in Nigeria.
          </p>
        </Reveal>

        {/* SVG arc map */}
        <Reveal style={{
          position: 'relative', background: 'var(--ink)', borderRadius: 28, overflow: 'hidden',
          height: 'clamp(260px,32vw,380px)', boxShadow: '0 26px 60px rgba(27,19,14,.2)',
          backgroundImage: 'radial-gradient(rgba(255,247,239,.10) 1.4px,transparent 1.4px)',
          backgroundSize: '26px 26px',
          marginBottom: 48,
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
        <Reveal style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '0 0 20px' }}>
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: 'var(--red)', display: 'inline-block' }} />
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(22px,2.6vw,30px)', letterSpacing: '-.6px', margin: 0 }}>District Churches · United States</h3>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginBottom: 40 }}>
          {usChurches.map((c, i) => (
            <Reveal key={c.name} delay={i * 100} style={{ background: 'var(--paper)', borderRadius: 22, padding: 28, boxShadow: '0 10px 26px rgba(27,19,14,.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--red)', fontSize: 13, fontWeight: 800, marginBottom: 12 }}>
                {pinSvg('var(--red)')} {c.city}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 21, letterSpacing: '-.4px', marginBottom: 8 }}>{c.name}</div>
              <div style={{ fontSize: 14, color: 'var(--ink-soft)', lineHeight: 1.55 }}>{c.address}</div>
            </Reveal>
          ))}
        </div>

        {/* Nigeria section */}
        <Reveal style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '0 0 20px' }}>
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: 'var(--gold)', display: 'inline-block' }} />
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(22px,2.6vw,30px)', letterSpacing: '-.6px', margin: 0 }}>Extension Churches · Nigeria</h3>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
          {ngChurches.map((c, i) => (
            <Reveal key={c.name} delay={i * 80} style={{ background: 'var(--paper)', borderRadius: 22, padding: 26, boxShadow: '0 10px 26px rgba(27,19,14,.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#B7791F', fontSize: 12.5, fontWeight: 800, marginBottom: 11 }}>
                {pinSvg('#B7791F')} {c.city}
              </div>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 19, letterSpacing: '-.3px', lineHeight: 1.1, marginBottom: 8 }}>{c.name}</div>
              <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', lineHeight: 1.5 }}>{c.address}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
