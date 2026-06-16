import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

export function PlanVisit() {
  return (
    <section style={{ background: 'var(--ink)', color: 'var(--cream)', padding: 'clamp(70px,9vw,120px) clamp(20px,5vw,64px)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
        <Reveal>
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--gold)' }}>Come visit</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(36px,5vw,64px)', letterSpacing: '-1.5px', margin: '12px 0 22px', lineHeight: 1 }}>
            There&apos;s a seat with your name on it.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, opacity: .8, maxWidth: 440 }}>
            Salvation Center — Baltimore DCC. Join us in person this Sunday; come as you are.
          </p>
          <div style={{ marginTop: 30, display: 'flex', flexDirection: 'column', gap: 14, fontSize: 15.5 }}>
            {[
              { icon: '📍', text: '10710 Marriottsville Rd, Randallstown, MD 21133' },
              { icon: '📞', text: '+1 443-272-6794 · +1 410-701-8315' },
              { icon: '✉️', text: 'info@cacsalvationcenter.org' },
            ].map(item => (
              <div key={item.icon} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ width: 40, height: 40, borderRadius: 11, background: 'rgba(255,255,255,.1)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
          <Link href="/visit" style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            marginTop: 34, background: 'var(--red)', color: '#fff',
            fontWeight: 700, fontSize: 16, padding: '16px 28px', borderRadius: 999,
            textDecoration: 'none', boxShadow: '0 14px 30px rgba(214,40,40,.4)',
          }}>
            Plan your visit →
          </Link>
        </Reveal>

        <Reveal delay={120}>
          <div style={{
            width: '100%', height: 440, borderRadius: 26,
            background: 'linear-gradient(150deg,#2a1810,#1a0f08)',
            boxShadow: '0 26px 54px rgba(0,0,0,.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: 'rgba(255,247,239,.2)', fontSize: 14, fontWeight: 600 }}>Church building photo</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
