import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { MapPin, CalendarDays } from 'lucide-react';

export function Anniversary25() {
  return (
    <section
      id="anniversary-25"
      aria-labelledby="anniversary-25-heading"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 70% 60% at 25% 60%, rgba(232,163,61,.28) 0%, rgba(232,163,61,0) 70%), linear-gradient(180deg, #0B1020 0%, var(--ink) 100%)',
        color: 'var(--cream)',
        padding: 'clamp(70px,9vw,120px) clamp(20px,5vw,64px)',
      }}
    >
      <div className="r2c" style={{ maxWidth: 1240, margin: '0 auto', gap: 56, alignItems: 'center' }}>
        <Reveal>
          <div style={{ maxWidth: 520, margin: '0 auto', borderRadius: 26, overflow: 'hidden', boxShadow: '0 30px 70px rgba(0,0,0,.5), 0 0 60px rgba(232,163,61,.25)' }}>
            <Image
              src="/images/25th-anniversary-poster.webp"
              alt="Poster: Celebrating 25 years of God's faithfulness, Christ Apostolic Church Salvation Center anniversary celebration, July 2027, 10710 Marriottsville Rd, Randallstown, MD 21133. Date and details to be announced."
              width={1122}
              height={1402}
              sizes="(max-width: 900px) 90vw, 520px"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        </Reveal>

        <Reveal delay={120}>
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)' }}>
            Save the date · July 2027
          </span>
          <h2
            id="anniversary-25-heading"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(36px,5vw,64px)', letterSpacing: '-1.5px', lineHeight: 1, margin: '12px 0 22px' }}
          >
            25 years of God&apos;s faithfulness.
          </h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.7, opacity: 0.8, maxWidth: 480, margin: 0 }}>
            Twenty-five years of worship, prayer and faithful service at CAC Salvation Center. Join us as we give God thanks for all He has done and look ahead to what He will do next.
          </p>
          <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 14, fontSize: 15.5 }}>
            {[
              { icon: CalendarDays, text: 'July 2027 · exact date and details to be announced' },
              { icon: MapPin, text: '10710 Marriottsville Rd, Randallstown, MD 21133' },
            ].map(item => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{ width: 40, height: 40, borderRadius: 11, background: 'rgba(255,255,255,.1)', display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                  <item.icon size={18} strokeWidth={1.75} color="var(--gold)" aria-hidden />
                </span>
                {item.text}
              </div>
            ))}
          </div>
          <Link
            href="/events"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 34,
              background: 'var(--gold)', color: 'var(--ink)', fontWeight: 800, fontSize: 16,
              padding: '16px 28px', borderRadius: 999, textDecoration: 'none',
              boxShadow: '0 14px 30px rgba(232,163,61,.3)',
            }}
          >
            See upcoming events →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
