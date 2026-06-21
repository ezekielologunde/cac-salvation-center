import Image from 'next/image';
import { Reveal } from '@/components/ui/Reveal';
import { getSermons, formatSermonDate } from '@/lib/sermons';

export async function Sermons() {
  const pastStreams = await getSermons(3);
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

        {/* Past streams thumbnails */}
        <Reveal delay={180} style={{ marginTop: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 22, letterSpacing: '-.5px', color: 'var(--ink)' }}>
              Watch Past Streams
            </div>
            <a href="https://www.youtube.com/channel/UCoogH4HuVXSn4okSpRlsDQA" target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 700, color: 'var(--red)', textDecoration: 'none' }}>
              View all on YouTube →
            </a>
          </div>
          <div className="r3" style={{ gap: 18 }}>
            {pastStreams.map((v) => (
              <a
                key={v.id}
                href={`https://www.youtube.com/watch?v=${v.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover-lift"
                style={{ display: 'block', textDecoration: 'none', borderRadius: 16, overflow: 'hidden', background: 'var(--ink)', boxShadow: '0 10px 28px rgba(27,19,14,.14)' }}
              >
                <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
                  <Image
                    src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`}
                    alt={v.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  {/* Play overlay */}
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.25)' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'rgba(255,255,255,.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(0,0,0,.3)' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="var(--red)" aria-hidden><path d="M8 5v14l11-7z" /></svg>
                    </div>
                  </div>
                </div>
                <div style={{ padding: '14px 16px 16px' }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--cream)', lineHeight: 1.4 }}>{v.title}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,247,239,.5)', marginTop: 4 }}>{formatSermonDate(v.published)}</div>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
