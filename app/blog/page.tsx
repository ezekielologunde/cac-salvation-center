import { Nav } from "@/components/navigation/Nav";
import { FooterExperience } from "@/components/sections/FooterExperience";
import { Reveal } from "@/components/ui/Reveal";
import { Newspaper, ArrowRight, Calendar, BookOpen, Users, Mic2 } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "Blog & News — CAC Salvation Center",
  description:
    "News, teaching, and stories from the Salvation Center family — devotionals, ministry updates, and reflections on Scripture.",
  alternates: { canonical: "/blog" },
};

interface Post {
  id: string;
  cat: string;
  icon: ReactNode;
  title: string;
  excerpt: string;
  date: string;
  accent: string;
  href: string | null;
  body: ReactNode[];
}

const P = ({ children }: { children: ReactNode }) => (
  <p style={{ margin: "0 0 14px", fontSize: 14.5, color: "var(--ink)", lineHeight: 1.82 }}>{children}</p>
);

const posts: Post[] = [
  {
    id: "good-women-2026",
    cat: "Event Spotlight",
    icon: <Mic2 size={14} strokeWidth={2.5} aria-hidden />,
    title: "2026 Good Women Anniversary — \"Who Are You?\"",
    excerpt: "On Sunday, June 28 the Baltimore DCC Good Women gather under a theme drawn from 1 Kings 3:16–27. Here is everything you need to know before you come.",
    date: "June 22, 2026",
    accent: "linear-gradient(135deg,#9E1B1B,#D62828)",
    href: "/events/good-women-anniversary",
    body: [
      <P key="1">The Baltimore District Coordinating Council Good Women have chosen a theme that cuts straight to the heart: <em>Who Are You — Mother or Murderer?</em> Drawn from Solomon&apos;s judgment in 1 Kings 3:16–27, the question is not about biology. It is about the posture of the soul.</P>,
      <P key="2">A mother gives. She intercedes, protects, and endures loss rather than see the child destroyed. The woman in that throne room was willing to lose custody rather than lose the child&apos;s life. Solomon saw it instantly — that readiness to suffer for another is the mark of genuine love.</P>,
      <P key="3">The Good Women of our district will spend one morning sitting with that question: in my home, in my church, in my community — am I giving life or taking it? The service begins at <strong>11:00 AM on Sunday, June 28, 2026</strong>. Pastor Dr. H.O. Ilufoye, Pastor S.O. Oladele (CAC President), and Pastor Dr. T.O.A. Agbeja will minister the Word. Evangelists Bisi Benson and Buky Awosanya come as guest ministers. All are welcome.</P>,
    ],
  },
  {
    id: "god-builds-the-house",
    cat: "Devotional",
    icon: <BookOpen size={14} strokeWidth={2.5} aria-hidden />,
    title: "The God who builds the house.",
    excerpt: "On Psalm 127, the Building Project, and why every nail driven and every dollar given must begin in the Lord's hands.",
    date: "June 15, 2026",
    accent: "linear-gradient(135deg,#F15F22,#D62828)",
    href: null,
    body: [
      <P key="1"><em>&ldquo;Unless the Lord builds the house, the builders labor in vain.&rdquo;</em> — Psalm 127:1</P>,
      <P key="2">There is a temptation, in any building project, to treat prayer as the opening ceremony and the real work as everything that comes after. We ask God to bless the effort, then we step in and manage it ourselves. Psalm 127 will not allow this.</P>,
      <P key="3">The psalm belongs to Solomon — a man who literally built the most famous house of God the ancient world had seen, and who also wrote, later in life, that all his labor was <em>vanity</em>. He knew both sides of the warning.</P>,
      <P key="4">The Salvation Center&apos;s building initiative is not just a construction project. Every phase — the architectural plans, the fundraising, the permits, the congregation&apos;s sacrificial giving — is an act of worship or it is noise. What distinguishes them is whether the Lord is at the center or at the margins.</P>,
      <P key="5">This is not mystical passivity. Solomon also built. He organized labor, sourced cedar from Lebanon, oversaw artisans. The Psalm does not say &ldquo;unless the Lord builds, do nothing.&rdquo; It says that your labor, however skilled, however persistent, produces nothing that lasts unless it is aligned with what God is already doing.</P>,
      <P key="6">In your home, are you building something or merely occupying space? In your marriage, are you constructing a covenant or maintaining a contract? Psalm 127 begins with the house but it ends with children — the next generation is the fruit of a home the Lord has built. <strong>Pray first. Give from trust, not obligation. And labor hard, knowing that the One who commanded you to build also guarantees the completion.</strong></P>,
    ],
  },
  {
    id: "cacna-2026",
    cat: "Ministry Update",
    icon: <Users size={14} strokeWidth={2.5} aria-hidden />,
    title: "CACNA 2026 — what to expect.",
    excerpt: "Six days of worship and the Word at CAC Village, Blue Ridge Summit PA — July 13–18. Here is how to prepare, what to pack, and why you should not miss it.",
    date: "June 10, 2026",
    accent: "linear-gradient(135deg,#E8A33D,#F15F22)",
    href: null,
    body: [
      <P key="1">The Christ Apostolic Church North America National Convention returns to CAC Village in Blue Ridge Summit, Pennsylvania from <strong>July 13 to 18, 2026</strong>. This is the gathering where the scattered family of CAC across North America becomes, for one week, a single congregation.</P>,
      <P key="2"><strong>What to expect.</strong> The convention runs morning and evening sessions, six days. Expect deep worship, extended prayer, and messages from pastors and evangelists across the CAC global fellowship. The village setting means you are not commuting to an arena — you are resident in a camp, taking meals together, going on prayer walks, staying in late-night worship that no one wants to end.</P>,
      <P key="3"><strong>Who should come.</strong> Everyone. The convention is not a pastors&apos; retreat. Youth services run in parallel to the main sessions. Children&apos;s programming is provided. Singles, couples, the elderly — the village is full of people at every stage of life pressing into God together.</P>,
      <P key="4"><strong>How to prepare.</strong> Registration is open at the CACNA convention website. Secure your accommodation early — village beds are allocated first-come. If you are driving, Blue Ridge Summit is approximately two hours from Randallstown. Carpooling from Salvation Center will be coordinated — speak to any elder or contact the church office.</P>,
      <P key="5">Pack for outdoor Pennsylvania in July: warm mornings, hot afternoons, cool evenings. Bring a Bible with writing margins. Bring a journal. Leave your calendar empty for six days and come with open hands.</P>,
    ],
  },
  {
    id: "ambassadors",
    cat: "Reflection",
    icon: <Mic2 size={14} strokeWidth={2.5} aria-hidden />,
    title: "What it means to be ambassadors.",
    excerpt: "2 Corinthians 5:17–20 and the daily call on every believer at the Salvation Center. We are not tourists in this world — we are representatives.",
    date: "May 25, 2026",
    accent: "linear-gradient(135deg,#9E1B1B,#D62828)",
    href: null,
    body: [
      <P key="1"><em>&ldquo;We are therefore Christ&apos;s ambassadors, as though God were making his appeal through us.&rdquo;</em> — 2 Corinthians 5:20</P>,
      <P key="2">An ambassador does not speak in their own name. They carry the authority of the one who sent them, the message of the one who sent them, and the reputation of the one who sent them. Their personal opinions are, in the formal moment, irrelevant.</P>,
      <P key="3">Paul&apos;s picture of the Christian life is astonishingly bold. God, he says, is making his appeal <em>through us</em>. The same God who spoke light into being, who parted the sea, who raised his Son — is now, in this age, choosing to make his appeal through people like us. Through the member who shows up to Tuesday night prayer even when tired. Through the one who forgives when they had every right to retaliate. Through the family that gives to the building fund not because they are wealthy but because they believe.</P>,
      <P key="4">The title comes with weight. Ambassadors can embarrass their country. They can misrepresent. They can go off-message. Paul knew this — the same letter is full of passages about his own weakness, his thorn, his afflictions. But the weakness of the vessel is not the end of the story. &ldquo;The power,&rdquo; he writes in chapter four, &ldquo;belongs to God.&rdquo;</P>,
      <P key="5">At the Salvation Center we carry this identity into Randallstown, into Baltimore, into Ilorin, into Rosedale. Everywhere a member of this house goes, an ambassador is present. The question worth sitting with is not whether you hold the title — you do, by virtue of your new creation in Christ — but <strong>whether you are conscious of it when you wake up in the morning.</strong></P>,
    ],
  },
];

function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <article style={{ height: "100%", background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 24, display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 12px 30px rgba(27,19,14,.07)" }}>
      {/* Color band */}
      <div style={{ height: featured ? 200 : 150, background: post.accent, position: "relative", flexShrink: 0 }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 70% 30%,rgba(255,255,255,.18),transparent 60%)" }} />
        <div style={{ position: "absolute", left: 22, bottom: 18, display: "flex", alignItems: "center", gap: 7, color: "#fff", fontSize: 11, fontWeight: 800, letterSpacing: "2px", textTransform: "uppercase" }}>
          {post.icon} {post.cat}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "clamp(22px,3vw,30px)", display: "flex", flexDirection: "column", flex: 1 }}>
        <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: featured ? "clamp(22px,2.8vw,30px)" : 22, letterSpacing: "-.5px", color: "var(--ink)", margin: "0 0 12px", lineHeight: 1.12 }}>{post.title}</h3>
        <p style={{ fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.72, margin: "0 0 20px" }}>{post.excerpt}</p>

        {/* Article body */}
        <div style={{ borderTop: "1px solid var(--line)", paddingTop: 20, marginTop: 4, flex: 1 }}>
          {post.body}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, fontWeight: 700, color: "var(--red)", letterSpacing: ".5px", textTransform: "uppercase" }}>
            <Calendar size={13} strokeWidth={2.5} aria-hidden /> {post.date}
          </div>
          {post.href && (
            <Link href={post.href} className="press" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13.5, fontWeight: 700, color: "var(--red)", textDecoration: "none" }}>
              Full details <ArrowRight size={14} strokeWidth={2.5} aria-hidden />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const [featured, ...rest] = posts;

  return (
    <main>
      <Nav heroDark />

      {/* Hero */}
      <section style={{ background: "var(--ink)", padding: "150px clamp(20px,5vw,64px) 96px", position: "relative", overflow: "hidden" }}>
        <div aria-hidden style={{ position: "absolute", top: -100, right: -80, width: 580, height: 460, background: "radial-gradient(circle,rgba(232,163,61,.22),transparent 65%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 880, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
          <Reveal>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--gold)", marginBottom: 18 }}>
              <Newspaper size={14} strokeWidth={2.5} aria-hidden /> Blog &amp; News
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(46px,7vw,98px)", letterSpacing: "-2.2px", color: "#fff", margin: "0 0 22px", lineHeight: 0.93 }}>
              The voice of<br />
              <span style={{ background: "linear-gradient(100deg,#F15F22,#D62828,#E8A33D)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent" }}>the family.</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p style={{ fontSize: "clamp(16px,1.8vw,20px)", color: "rgba(255,247,239,.72)", lineHeight: 1.7, maxWidth: 580, margin: "0 auto" }}>
              Devotionals, ministry updates, and reflections from the Salvation Center — written for the body, by the body.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Featured post */}
      <section style={{ background: "var(--cream)", padding: "clamp(50px,6vw,90px) clamp(20px,5vw,64px)" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 24 }}>
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)" }}>Latest</span>
          </Reveal>
          <Reveal>
            <PostCard post={featured} featured />
          </Reveal>
        </div>
      </section>

      {/* CACNA 2026 CTA */}
      <section style={{ background: "var(--cream)", padding: "0 clamp(20px,5vw,64px) clamp(40px,5vw,60px)" }}>
        <Reveal>
          <div style={{ maxWidth: 900, margin: "0 auto", background: "linear-gradient(135deg,#9E1B1B,#D62828)", borderRadius: 28, padding: "clamp(28px,4vw,42px)", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 24, boxShadow: "0 24px 60px rgba(214,40,40,.28)", position: "relative", overflow: "hidden" }}>
            <div aria-hidden style={{ position: "absolute", top: -80, right: -60, width: 320, height: 280, background: "radial-gradient(circle,rgba(232,163,61,.3),transparent 65%)", pointerEvents: "none" }} />
            <div style={{ flex: "1 1 320px", position: "relative", zIndex: 2 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,247,239,.85)", marginBottom: 10 }}>Registration open</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(22px,3vw,36px)", letterSpacing: "-.6px", color: "#fff", margin: "0 0 8px", lineHeight: 1.05 }}>Register for CACNA 2026</h2>
              <p style={{ fontSize: 15, color: "rgba(255,247,239,.82)", margin: 0, lineHeight: 1.6 }}>July 13–18 at CAC Village, Blue Ridge Summit, PA. Secure your spot online today.</p>
            </div>
            <a href="https://cacnaconvention.org/2026-cacna-national-convention-registration-credit-debit-card/" target="_blank" rel="noopener noreferrer" className="btn-sheen press" style={{ position: "relative", zIndex: 2, flexShrink: 0, display: "inline-flex", alignItems: "center", gap: 9, background: "#fff", color: "var(--red-deep)", fontWeight: 800, fontSize: 16, padding: "16px 30px", borderRadius: 999, textDecoration: "none" }}>
              Register Now →
            </a>
          </div>
        </Reveal>
      </section>

      {/* More articles */}
      <section style={{ background: "var(--cream-2)", padding: "clamp(40px,5vw,72px) clamp(20px,5vw,64px) clamp(70px,9vw,110px)" }}>
        <div style={{ maxWidth: 1180, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 36 }}>
            <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--red)" }}>More from the family</span>
            <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "clamp(28px,4vw,46px)", letterSpacing: "-1px", color: "var(--ink)", margin: "12px 0 0", lineHeight: 1 }}>
              Teaching &amp; reflection.
            </h2>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,320px), 1fr))", gap: 22 }}>
            {rest.map((p, i) => (
              <Reveal key={p.id} delay={i * 90}>
                <PostCard post={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FooterExperience />
    </main>
  );
}
