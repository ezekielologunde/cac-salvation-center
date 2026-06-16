import { Reveal } from '@/components/ui/Reveal';

export function Sermons() {
  return (
    <section style={{ background: 'var(--cream)', padding: 'clamp(70px,9vw,120px) clamp(20px,5vw,64px)' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto' }}>
        <Reveal style={{ textAlign: 'center', marginBottom: 46 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 9, background: 'var(--red)', color: '#fff', fontWeight: 800, fontSize: 13, letterSpacing: '1px', padding: '8px 16px', borderRadius: 999 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff', animation: 'pulse-red 1.8s infinite', display: 'inline-block' }} />
            LIVE THIS SUNDAY
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(36px,5vw,68px)', letterSpacing: '-1.5px', margin: '18px 0 0', lineHeight: .95 }}>
            Worship with us,<br /><span style={{ color: 'var(--red)' }}>from anywhere.</span>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--ink-soft)', maxWidth: 520, margin: '18px auto 0', lineHeight: 1.6 }}>
            Join the Salvation Center live every Sunday — or catch up any time on your favourite platform.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ position: 'relative', borderRadius: 28, overflow: 'hidden', background: 'var(--ink)', boxShadow: '0 40px 80px rgba(27,19,14,.26)' }}>
            <div style={{ width: '100%', height: 'clamp(280px,46vw,520px)', position: 'relative' }}>
              <iframe
                src="https://www.youtube.com/embed/gBGifbZSDBo"
                title="Christ Apostolic Church — Vision and Mission"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              />
            </div>

            <div style={{ padding: '20px 28px', display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', borderTop: '1px solid rgba(255,247,239,.06)', background: 'var(--ink)' }}>
              <span style={{ fontSize: 12, color: 'rgba(255,247,239,.4)', fontWeight: 600, marginRight: 4 }}>Watch on:</span>
              {[
                { name: 'YouTube', href: 'https://www.youtube.com/channel/UCoogH4HuVXSn4okSpRlsDQA' },
                { name: 'Facebook', href: 'https://www.facebook.com/CacSalvationCenterBaltimore' },
                { name: 'Instagram', href: 'https://www.instagram.com/salvationcenterbaltimoreusa/' },
              ].map(p => (
                <a key={p.name} href={p.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,247,239,.7)', textDecoration: 'none', padding: '6px 14px', borderRadius: 999, border: '1px solid rgba(255,247,239,.12)' }}>
                  {p.name}
                </a>
              ))}
              <a href="/online" style={{ marginLeft: 'auto', fontSize: 13, fontWeight: 700, color: 'var(--gold)', textDecoration: 'none' }}>
                More messages →
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
