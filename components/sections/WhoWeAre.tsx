import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { Globe2, Languages, HeartHandshake } from 'lucide-react';

const marks = [
  { Icon: Languages, title: 'Yoruba & English worship', desc: 'Wakati Itusile in our mother tongue every Friday, alongside our bilingual Sunday services.' },
  { Icon: Globe2, title: 'Rooted in Nigeria', desc: 'An extension of C.A.C. Ilorin — part of the worldwide Christ Apostolic Church, an Aladura movement born in prayer.' },
  { Icon: HeartHandshake, title: 'A family, not a crowd', desc: 'A home away from home for the Nigerian diaspora and every neighbour across Randallstown & Baltimore.' },
];

export function WhoWeAre() {
  return (
    <section style={{ background: 'var(--cream)', padding: 'clamp(70px,9vw,120px) clamp(20px,5vw,64px)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <Reveal>
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--red)' }}>Who we are</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px,4.8vw,62px)', letterSpacing: '-1.4px', margin: '14px 0 0', lineHeight: 1.02, textWrap: 'balance' }}>
            A Nigerian Christ Apostolic Church family in Baltimore.
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p style={{ fontSize: 'clamp(16px,1.9vw,19px)', color: 'var(--ink-soft)', lineHeight: 1.8, margin: '24px auto 0', maxWidth: 660, textWrap: 'pretty' }}>
            Christ Apostolic Church (CAC) is one of Nigeria&apos;s oldest Pentecostal movements — an Aladura church
            born in prayer and the power of the Holy Spirit. CAC Salvation Center is that same family, planted in
            Randallstown, Maryland from our parent assembly in Ilorin, Nigeria in 2002 — Yoruba and English worship,
            Nigerian warmth, and the undiluted Gospel. <strong style={{ color: 'var(--ink)' }}>One fold, one Shepherd.</strong>
          </p>
        </Reveal>
      </div>

      <div style={{ maxWidth: 1080, margin: '48px auto 0', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 20 }}>
        {marks.map((m, i) => (
          <Reveal key={m.title} delay={i * 100} style={{ height: '100%', background: 'var(--paper)', borderRadius: 22, padding: '30px 26px', border: '1px solid var(--line)', boxShadow: '0 10px 26px rgba(27,19,14,.06)' }}>
            <div style={{ display: 'grid', placeItems: 'center', width: 48, height: 48, borderRadius: 14, background: 'linear-gradient(135deg,var(--flame),var(--red))', marginBottom: 16, boxShadow: '0 8px 20px rgba(214,40,40,.28)' }}>
              <m.Icon size={22} strokeWidth={2} color="#fff" aria-hidden />
            </div>
            <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 20, letterSpacing: '-.3px', color: 'var(--ink)', margin: '0 0 8px' }}>{m.title}</h3>
            <p style={{ fontSize: 14.5, color: 'var(--ink-soft)', lineHeight: 1.65, margin: 0 }}>{m.desc}</p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={140} style={{ maxWidth: 1080, margin: '32px auto 0', display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link href="/about" className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--ink)', color: 'var(--cream)', fontWeight: 700, fontSize: 15, padding: '14px 28px', borderRadius: 999, textDecoration: 'none' }}>
          Our story <span aria-hidden style={{ fontSize: 16 }}>→</span>
        </Link>
        <Link href="/ilorin" className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--paper)', color: 'var(--ink)', fontWeight: 700, fontSize: 15, padding: '14px 28px', borderRadius: 999, textDecoration: 'none', border: '1px solid var(--line)' }}>
          Our Nigeria HQ <span aria-hidden style={{ fontSize: 16 }}>→</span>
        </Link>
      </Reveal>
    </section>
  );
}
