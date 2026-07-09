import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { Star } from 'lucide-react';
import { googleReviews, REVIEW_AVERAGE, REVIEW_COUNT } from '@/lib/reviews';

// The three most substantial reviews, shown as homepage social proof.
const featured = googleReviews.slice(0, 3);

function Stars({ n }: { n: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2 }} aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={16} strokeWidth={1.5} fill={i < n ? '#E8A33D' : 'none'} color="#E8A33D" aria-hidden />
      ))}
    </span>
  );
}

export function Reviews() {
  return (
    <section style={{ background: 'var(--cream-2)', padding: 'clamp(70px,9vw,120px) clamp(20px,5vw,64px)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <Reveal style={{ marginBottom: 14 }}>
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--red)' }}>Loved by our family</span>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(32px,4.5vw,60px)', letterSpacing: '-1.2px', margin: '12px 0 0', lineHeight: 1 }}>What people say</h2>
        </Reveal>
        <Reveal delay={80} style={{ marginBottom: 40 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <Stars n={5} />
            <span style={{ fontWeight: 800, fontSize: 17, color: 'var(--ink)' }}>{REVIEW_AVERAGE.toFixed(1)}</span>
            <span style={{ fontSize: 15, color: 'var(--ink-soft)' }}>· {REVIEW_COUNT} five-star Google reviews</span>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,280px),1fr))', gap: 20 }}>
          {featured.map((r, i) => (
            <Reveal key={r.name} delay={i * 100} style={{ height: '100%', background: 'var(--paper)', borderRadius: 22, padding: 28, border: '1px solid var(--line)', boxShadow: '0 10px 26px rgba(27,19,14,.06)', display: 'flex', flexDirection: 'column' }}>
              <Stars n={r.rating} />
              <p style={{ fontSize: 15.5, color: 'var(--ink)', lineHeight: 1.7, margin: '14px 0 20px', flex: 1, fontStyle: 'italic' }}>&ldquo;{r.quote}&rdquo;</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span aria-hidden style={{ flexShrink: 0, width: 38, height: 38, borderRadius: '50%', display: 'grid', placeItems: 'center', background: 'linear-gradient(140deg,var(--flame),var(--red))', color: '#fff', fontWeight: 800, fontSize: 15 }}>{r.name.charAt(0)}</span>
                <span style={{ fontWeight: 700, fontSize: 14.5, color: 'var(--ink)' }}>{r.name}{r.isLocalGuide ? <span style={{ fontWeight: 500, color: 'var(--ink-soft)', fontSize: 12.5 }}> · Local Guide</span> : null}</span>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120} style={{ marginTop: 32 }}>
          <Link href="/testimonies" className="press" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontWeight: 700, fontSize: 15, color: 'var(--red)', textDecoration: 'none' }}>
            Read more testimonies &amp; reviews <span aria-hidden style={{ fontSize: 17 }}>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
