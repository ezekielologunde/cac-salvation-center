import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

const events = [
  {
    month: 'Jun', day: '28',
    title: '2026 Good Women Anniversary',
    desc: '“Who Are You: Mother or Murderer?” · 11:00 AM ET.',
    dateBg: 'linear-gradient(150deg,#D62828,#9E1B1B)',
  },
  {
    month: 'Sep', day: '03',
    title: 'Choir Anniversary',
    desc: 'A Sunday of praise and thanksgiving.',
    dateBg: 'linear-gradient(150deg,#F15F22,#D62828)',
  },
  {
    month: 'Oct', day: '01',
    title: 'Baltimore DCC Anniversary',
    desc: 'Celebrating our District Coordinating Council.',
    dateBg: 'var(--ink)',
  },
];

export function Events() {
  return (
    <section style={{ padding: 'clamp(70px,9vw,120px) clamp(20px,5vw,64px)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <Reveal style={{ marginBottom: 46 }}>
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--red)' }}>Mark your calendar</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(36px,5vw,68px)', letterSpacing: '-1.5px', margin: '12px 0 0', lineHeight: 1 }}>Upcoming events</h2>
        </Reveal>

        <div className="r2" style={{ gap: 22 }}>
          {events.map((ev, i) => (
            <Reveal key={ev.title} delay={i * 120} style={{ display: 'flex', gap: 24, alignItems: 'center', background: 'var(--paper)', borderRadius: 24, padding: 28, boxShadow: '0 10px 26px rgba(27,19,14,.06)' }}>
              <div style={{
                flexShrink: 0, width: 92, height: 92, borderRadius: 18,
                background: ev.dateBg,
                color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', lineHeight: 1,
              }}>
                <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>{ev.month}</span>
                <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 38 }}>{ev.day}</span>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 24, letterSpacing: '-.5px' }}>{ev.title}</div>
                <div style={{ fontSize: 14, color: 'var(--ink-soft)', marginTop: 6 }}>{ev.desc}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120} style={{ marginTop: 32 }}>
          <Link href="/events" className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 15, color: 'var(--red)', textDecoration: 'none' }}>
            View all events &amp; add to calendar <span aria-hidden style={{ fontSize: 17 }}>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
