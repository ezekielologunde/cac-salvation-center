'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Check } from 'lucide-react';
import { Reveal } from '@/components/ui/Reveal';
import { FacebookIcon, InstagramIcon, YoutubeIcon, TikTokIcon } from '@/components/ui/SocialIcons';
import { submitLead, isValidEmail } from '@/lib/forms';
import { haptic } from '@/lib/haptics';

const socials = [
  { icon: <FacebookIcon />, title: 'Facebook', href: 'https://www.facebook.com/CacSalvationCenterBaltimore' },
  { icon: <InstagramIcon />, title: 'Instagram', href: 'https://www.instagram.com/salvationcenterbaltimore/' },
  { icon: <YoutubeIcon />, title: 'YouTube', href: 'https://www.youtube.com/channel/UCoogH4HuVXSn4okSpRlsDQA' },
  { icon: <TikTokIcon />, title: 'TikTok', href: 'https://www.tiktok.com/@salvationcenterus' },
];

export function FooterExperience() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await submitLead({ email }, 'Newsletter signup');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <footer style={{ background: 'var(--cream)', padding: 'clamp(60px,8vw,100px) clamp(20px,5vw,64px) 40px' }}>
      <Reveal style={{
        maxWidth: 1240, margin: '0 auto 64px',
        background: 'var(--cream-2)', borderRadius: 28,
        padding: 'clamp(38px,5vw,60px)',
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: 30,
      }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(28px,3.5vw,42px)', letterSpacing: '-1px', margin: 0, lineHeight: 1.05 }}>Salvation Newsletter</h3>
          <p style={{ fontSize: 15, color: 'var(--ink-soft)', margin: '10px 0 0' }}>Monthly encouragement, straight to your inbox.</p>
        </div>
        {submitted ? (
          <div role="status" style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 700, color: '#16A34A', fontSize: 15 }}><Check size={18} strokeWidth={2.5} aria-hidden /> Subscribed</div>
        ) : (
          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <label htmlFor="newsletter-email" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Email address</label>
              <input
                id="newsletter-email" type="email" inputMode="email" autoComplete="email"
                placeholder="your email" value={email}
                onChange={e => { setEmail(e.target.value); if (error) setError(''); }}
                aria-invalid={!!error} aria-describedby={error ? 'newsletter-error' : undefined}
                style={{ border: `1.5px solid ${error ? '#D62828' : 'var(--line)'}`, background: 'var(--paper)', borderRadius: 999, padding: '15px 22px', fontSize: 15, fontFamily: 'var(--font-body)', minWidth: 240, outline: 'none' }} />
              <button type="submit" disabled={loading} style={{ background: 'var(--ink)', color: 'var(--cream)', fontWeight: 700, fontSize: 15, fontFamily: 'var(--font-body)', border: 'none', padding: '15px 28px', borderRadius: 999, cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.6 : 1 }}>
                {loading ? 'Signing up…' : 'Sign Up'}
              </button>
            </div>
            {error && <span id="newsletter-error" role="alert" style={{ fontSize: 13, fontWeight: 600, color: '#D62828', paddingLeft: 8 }}>{error}</span>}
          </form>
        )}
      </Reveal>

      <div className="r-ft" style={{ maxWidth: 1240, margin: '0 auto', gap: 40, paddingBottom: 40, borderBottom: '1px solid var(--line)' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
            <Image src="/images/logo.png" alt="CAC Salvation Center" width={46} height={46} style={{ borderRadius: 14, objectFit: 'cover', flexShrink: 0 }} />
            <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <span style={{ fontSize: 10, letterSpacing: '2.5px', textTransform: 'uppercase', color: 'var(--red)', fontWeight: 700 }}>Christ Apostolic Church</span>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 21, marginTop: 3 }}>Salvation Center</span>
            </span>
          </div>
          <p style={{ fontSize: 14.5, color: 'var(--ink-soft)', margin: '18px 0 0', maxWidth: 320, lineHeight: 1.6 }}>Real food for the soul, from a real local family of believers. Welcome home.</p>
          <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
            {socials.map(s => (
              <a key={s.title} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.title}
                onClick={() => haptic('selection')} className="press"
                style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--paper)', border: '1px solid var(--line)', display: 'grid', placeItems: 'center', textDecoration: 'none', color: 'var(--ink)' }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 800, fontSize: 14, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--ink)', marginBottom: 16 }}>Explore</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '11px 22px', fontSize: 14.5 }}>
            {([['/', 'Home'], ['/about', 'Who We Are'], ['/leadership', 'Leadership'], ['/ministries', 'Ministries'], ['/online', 'Online'], ['/devotional', 'Devotional'], ['/bible-plan', 'Bible Plan'], ['/giving', 'Giving'], ['/building', 'Building'], ['/prayer', 'Prayer'], ['/salvation', 'Salvation'], ['/events', 'Events'], ['/calendar', 'Calendar'], ['/testimonies', 'Testimonies'], ['/gallery', 'Gallery'], ['/blog', 'Blog'], ['/store', 'Store'], ['/visit', 'Visit'], ['/contact', 'Contact']] as const).map(([href, label]) => (
              <Link key={href} href={href} style={{ color: 'var(--ink-soft)', textDecoration: 'none' }}>{label}</Link>
            ))}
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 800, fontSize: 14, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--ink)', marginBottom: 16 }}>Services</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, fontSize: 14.5, color: 'var(--ink-soft)' }}>
            <span>Sunday · 9:25 &amp; 10:30 AM ET</span>
            <span>Wednesday · 7:00 PM ET</span>
            <span>Friday · 7:00 PM ET (Yoruba)</span>
            <span>Prayer Line · 5:00 AM daily</span>
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 800, fontSize: 14, textTransform: 'uppercase', letterSpacing: '1.5px', color: 'var(--ink)', marginBottom: 16 }}>Sister Churches</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11, fontSize: 14.5 }}>
            <a href="https://cackingdomembassy.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink-soft)', textDecoration: 'none' }}>CAC Kingdom Embassy</a>
            <a href="https://cacpalaceofpeace.org" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ink-soft)', textDecoration: 'none' }}>CAC Palace of Peace</a>
            <Link href="/ilorin" style={{ color: 'var(--ink-soft)', textDecoration: 'none' }}>CAC Salvation Centre, Ilorin</Link>
            <Link href="/salvationcity" style={{ color: 'var(--ink-soft)', textDecoration: 'none' }}>Salvation City</Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1240, margin: '24px auto 0', fontSize: 13, color: 'var(--ink-soft)' }}>
        © 2026 Christ Apostolic Church Salvation Center · Baltimore DCC
      </div>
    </footer>
  );
}
