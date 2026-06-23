import Link from 'next/link';
import { createServiceClient } from '@/lib/supabase/server';

function getNextSunday(): Date {
  const now = new Date();
  const day = now.getDay();
  const daysUntil = day === 0 ? 7 : 7 - day;
  const next = new Date(now);
  next.setDate(now.getDate() + daysUntil);
  return next;
}

export async function ThisSunday() {
  const sunday = getNextSunday();
  const sundayStr = sunday.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });

  const windowStart = new Date(sunday);
  windowStart.setDate(sunday.getDate() - 1);
  const windowEnd = new Date(sunday);
  windowEnd.setDate(sunday.getDate() + 1);

  const supabase = createServiceClient();
  const { data: events } = await supabase
    .from('events')
    .select('title, event_date, description, event_url')
    .eq('published', true)
    .gte('event_date', windowStart.toISOString().split('T')[0])
    .lte('event_date', windowEnd.toISOString().split('T')[0])
    .order('event_date')
    .limit(1);

  const special = events?.[0] ?? null;

  return (
    <section style={{ background: 'var(--ink)', borderTop: '1px solid rgba(255,247,239,.06)' }}>
      <div style={{
        maxWidth: 1240,
        margin: '0 auto',
        padding: '26px clamp(20px,5vw,64px)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '16px 36px',
        justifyContent: 'space-between',
      }}>

        {/* Label + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ width: 3, height: 40, background: 'var(--red)', borderRadius: 2, flexShrink: 0 }} />
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '2.2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 4 }}>
              This Sunday · {sundayStr}
            </div>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 21, color: '#fff', letterSpacing: '-.3px', lineHeight: 1.1 }}>
              {special ? special.title : 'Sunday Worship Service'}
            </div>
          </div>
        </div>

        {/* Service times */}
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          {['9:25 AM', '10:30 AM'].map((t, i) => (
            <div key={t} style={{ display: 'flex', alignItems: 'baseline', gap: 5 }}>
              {i > 0 && <span style={{ fontSize: 12, color: 'rgba(255,247,239,.2)', marginRight: 8 }}>·</span>}
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 19, color: '#fff' }}>{t}</span>
              <span style={{ fontSize: 10.5, color: 'rgba(255,247,239,.38)', textTransform: 'uppercase', letterSpacing: '1px' }}>ET</span>
            </div>
          ))}
          <span style={{ fontSize: 12.5, color: 'rgba(255,247,239,.35)', marginLeft: 4 }}>Onsite &amp; online</span>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <Link
            href="/online"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'var(--red)', color: '#fff',
              fontWeight: 700, fontSize: 13.5, padding: '10px 20px',
              borderRadius: 999, textDecoration: 'none',
              boxShadow: '0 6px 18px rgba(214,40,40,.35)',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M8 5v14l11-7z" /></svg>
            Watch Online
          </Link>
          <Link
            href="/visit"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'rgba(255,247,239,.07)', color: 'rgba(255,247,239,.85)',
              fontWeight: 700, fontSize: 13.5, padding: '10px 20px',
              borderRadius: 999, textDecoration: 'none',
              border: '1px solid rgba(255,247,239,.14)',
            }}
          >
            Plan Your Visit →
          </Link>
        </div>
      </div>
    </section>
  );
}
