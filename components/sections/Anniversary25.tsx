import Image from 'next/image';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { MapPin } from 'lucide-react';

export function Anniversary25() {
  return (
    <section
      aria-labelledby="anniversary-25-heading"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'radial-gradient(ellipse 70% 60% at 50% 100%, rgba(232,163,61,.28) 0%, rgba(232,163,61,0) 70%), linear-gradient(180deg, #0B1020 0%, var(--ink) 100%)',
        color: 'var(--cream)',
        padding: 'clamp(70px,9vw,120px) clamp(20px,5vw,64px)',
        textAlign: 'center',
      }}
    >
      <Reveal>
        <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Image
            src="/images/logo.png"
            alt="Christ Apostolic Church logo"
            width={120}
            height={94}
            style={{ height: 'auto', marginBottom: 28 }}
          />
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--gold)' }}>
            Save the date · July 2027
          </span>
          <div
            aria-hidden
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(120px,22vw,260px)',
              lineHeight: 0.95,
              letterSpacing: '-6px',
              margin: '10px 0 4px',
              background: 'linear-gradient(180deg, #FFE2A6 0%, var(--gold) 45%, #B9731A 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              filter: 'drop-shadow(0 0 40px rgba(232,163,61,.35))',
            }}
          >
            25
          </div>
          <h2
            id="anniversary-25-heading"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(30px,4.5vw,52px)', letterSpacing: '-1px', lineHeight: 1.05, margin: '0 0 16px' }}
          >
            Celebrating 25 years of CSC Salvation Center
          </h2>
          <p style={{ fontSize: 16.5, lineHeight: 1.7, opacity: 0.8, maxWidth: 560, margin: 0 }}>
            Twenty-five years of worship, prayer and faithful service. Join us as we give God thanks for all He has done and look ahead to what He will do next.
          </p>
          <div style={{ marginTop: 26, display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, opacity: 0.9 }}>
            <MapPin size={18} strokeWidth={1.75} color="var(--gold)" aria-hidden />
            10710 Marriottsville Rd, Randallstown, MD 21133
          </div>
          <p style={{ marginTop: 10, fontSize: 13.5, letterSpacing: '.5px', opacity: 0.6 }}>Exact date and details to be announced.</p>
          <Link
            href="/events"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10, marginTop: 30,
              background: 'var(--gold)', color: 'var(--ink)', fontWeight: 800, fontSize: 16,
              padding: '16px 28px', borderRadius: 999, textDecoration: 'none',
              boxShadow: '0 14px 30px rgba(232,163,61,.3)',
            }}
          >
            See upcoming events →
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
