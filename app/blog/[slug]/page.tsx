import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, Share2, Clock, Calendar, ExternalLink } from "lucide-react";
import { Nav } from "@/components/navigation/Nav";
import { FooterExperience } from "@/components/sections/FooterExperience";
import { Reveal } from "@/components/ui/Reveal";
import { POSTS, getPost } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: `${post.title} — CAC Salvation Center`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.dateIso,
    },
  };
}

function renderBody(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const boldRe = /\*\*(.+?)\*\*/g;
  const italicRe = /_(.+?)_/g;

  function parseInline(raw: string): ReactNode[] {
    const nodes: ReactNode[] = [];
    let cursor = 0;
    const combined = /\*\*(.+?)\*\*|_(.+?)_/g;
    let m: RegExpExecArray | null;
    while ((m = combined.exec(raw)) !== null) {
      if (m.index > cursor) nodes.push(raw.slice(cursor, m.index));
      if (m[1] !== undefined) nodes.push(<strong key={m.index}>{m[1]}</strong>);
      else if (m[2] !== undefined) nodes.push(<em key={m.index}>{m[2]}</em>);
      cursor = m.index + m[0].length;
    }
    if (cursor < raw.length) nodes.push(raw.slice(cursor));
    return nodes;
  }

  // suppress unused variable warnings from the individual regexes
  void boldRe;
  void italicRe;

  parts.push(...parseInline(text));
  return parts;
}

function BodyParagraph({
  text,
  first,
}: {
  text: string;
  first?: boolean;
}) {
  const nodes = renderBody(text);
  if (first) {
    const [head, ...tail] = nodes;
    const firstChar =
      typeof head === "string" && head.length > 0 ? head[0] : null;
    const rest =
      typeof head === "string" && head.length > 0 ? head.slice(1) : head;
    return (
      <p
        style={{
          fontSize: 17,
          lineHeight: 1.82,
          color: "var(--ink)",
          marginBottom: 28,
          marginTop: 0,
        }}
      >
        {firstChar && (
          <span
            style={{
              fontSize: 22,
              fontWeight: 800,
              fontFamily: "var(--font-display)",
              lineHeight: 1,
              marginRight: 1,
            }}
          >
            {firstChar}
          </span>
        )}
        {rest}
        {tail}
      </p>
    );
  }
  return (
    <p
      style={{
        fontSize: 17,
        lineHeight: 1.82,
        color: "var(--ink)",
        marginBottom: 28,
        marginTop: 0,
      }}
    >
      {nodes}
    </p>
  );
}

function RelatedCard({ post }: { post: BlogPost }) {
  return (
    <article
      className="card-lift"
      style={{
        background: "var(--paper)",
        borderRadius: 20,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 8px 24px rgba(27,19,14,.07)",
      }}
    >
      <div
        style={{
          height: 8,
          background: post.accent,
          flexShrink: 0,
        }}
      />
      <div style={{ padding: "24px 26px 26px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "inline-block",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "#fff",
            background: post.categoryColor,
            borderRadius: 999,
            padding: "3px 10px",
            marginBottom: 14,
            alignSelf: "flex-start",
          }}
        >
          {post.category}
        </div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: 19,
            letterSpacing: "-.4px",
            color: "var(--ink)",
            margin: "0 0 10px",
            lineHeight: 1.18,
          }}
        >
          {post.title}
        </h3>
        <p
          style={{
            fontSize: 14.5,
            color: "var(--ink-soft)",
            lineHeight: 1.7,
            margin: "0 0 20px",
            flex: 1,
          }}
        >
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.slug}`}
          style={{
            fontSize: 13.5,
            fontWeight: 700,
            color: "var(--red)",
            textDecoration: "none",
            alignSelf: "flex-start",
          }}
        >
          Read →
        </Link>
      </div>
    </article>
  );
}

function SidebarPostCard({ post }: { post: BlogPost }) {
  return (
    <div
      style={{
        borderLeft: `3px solid`,
        borderImage: `${post.accent} 1`,
        paddingLeft: 14,
        marginBottom: 22,
      }}
    >
      <Link
        href={`/blog/${post.slug}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <p
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "var(--ink)",
            margin: "0 0 4px",
            lineHeight: 1.3,
          }}
        >
          {post.title}
        </p>
        <span
          style={{
            fontSize: 11.5,
            color: "var(--ink-soft)",
            display: "block",
            marginBottom: 6,
          }}
        >
          {post.date}
        </span>
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "var(--red)",
          }}
        >
          Read →
        </span>
      </Link>
    </div>
  );
}

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);
  const sidebarPosts = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  const shareUrl = `${SITE_URL}/blog/${post.slug}`;
  const shareText = encodeURIComponent(`${post.title} — ${shareUrl}`);
  const whatsappUrl = `https://wa.me/?text=${shareText}`;

  return (
    <main>
      <Nav heroDark />

      {/* Hero */}
      <section
        style={{
          background: "var(--ink)",
          padding: "140px clamp(20px,5vw,64px) 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -120,
            right: -80,
            width: 540,
            height: 420,
            background:
              "radial-gradient(circle,rgba(232,163,61,.2),transparent 65%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            maxWidth: 820,
            margin: "0 auto",
            position: "relative",
            zIndex: 2,
          }}
        >
          <Reveal>
            <Link
              href="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                fontSize: 13,
                fontWeight: 700,
                color: "rgba(255,247,239,.62)",
                textDecoration: "none",
                marginBottom: 28,
                letterSpacing: ".3px",
              }}
            >
              <ArrowLeft size={14} strokeWidth={2.5} aria-hidden /> Blog
            </Link>
          </Reveal>

          <Reveal delay={60}>
            <div
              style={{
                display: "inline-block",
                fontSize: 10.5,
                fontWeight: 800,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "#fff",
                background: post.categoryColor,
                borderRadius: 999,
                padding: "4px 13px",
                marginBottom: 22,
              }}
            >
              {post.category}
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(34px,5.5vw,70px)",
                letterSpacing: "-1.8px",
                color: "#fff",
                margin: "0 0 22px",
                lineHeight: 1.02,
              }}
            >
              {post.title}
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p
              style={{
                fontSize: "clamp(16px,1.7vw,19px)",
                color: "rgba(255,247,239,.7)",
                lineHeight: 1.7,
                margin: "0 0 28px",
                maxWidth: 660,
              }}
            >
              {post.excerpt}
            </p>
          </Reveal>

          <Reveal delay={220}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 20,
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: "rgba(255,247,239,.55)",
                  letterSpacing: ".3px",
                }}
              >
                <Calendar size={13} strokeWidth={2.5} aria-hidden />
                {post.date}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12.5,
                  fontWeight: 700,
                  color: "rgba(255,247,239,.55)",
                  letterSpacing: ".3px",
                }}
              >
                <Clock size={13} strokeWidth={2.5} aria-hidden />
                {post.readTime}
              </span>
              {post.href && (
                <Link
                  href={post.href}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    fontSize: 13.5,
                    fontWeight: 700,
                    color: "var(--gold)",
                    textDecoration: "none",
                  }}
                >
                  See event details <ExternalLink size={13} strokeWidth={2.5} aria-hidden />
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Body */}
      <section
        style={{
          background: "var(--cream-2)",
          padding: "clamp(50px,6vw,80px) clamp(20px,5vw,64px) clamp(60px,8vw,100px)",
        }}
      >
        <div
          className="blog-post-grid"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          {/* Prose */}
          <Reveal>
            <article style={{ maxWidth: 700 }}>
              {post.body.map((para, i) => (
                <BodyParagraph key={i} text={para} first={i === 0} />
              ))}
            </article>
          </Reveal>

          {/* Sidebar */}
          <Reveal delay={120}>
            <aside>
              {/* Share */}
              <div
                style={{
                  background: "var(--paper)",
                  borderRadius: 18,
                  padding: "24px 26px",
                  marginBottom: 28,
                  boxShadow: "0 4px 16px rgba(27,19,14,.06)",
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "var(--ink-soft)",
                    margin: "0 0 14px",
                  }}
                >
                  <Share2
                    size={11}
                    strokeWidth={2.5}
                    aria-hidden
                    style={{ marginRight: 6, verticalAlign: "middle" }}
                  />
                  Share this article
                </p>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#25D366",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 13.5,
                    padding: "10px 18px",
                    borderRadius: 999,
                    textDecoration: "none",
                    width: "100%",
                    justifyContent: "center",
                    boxSizing: "border-box",
                  }}
                >
                  Share on WhatsApp
                </a>
              </div>

              {/* More from the family */}
              <div
                style={{
                  background: "var(--paper)",
                  borderRadius: 18,
                  padding: "24px 26px",
                  boxShadow: "0 4px 16px rgba(27,19,14,.06)",
                }}
              >
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "var(--ink-soft)",
                    margin: "0 0 20px",
                  }}
                >
                  More from the family
                </p>
                {sidebarPosts.map((p) => (
                  <SidebarPostCard key={p.slug} post={p} />
                ))}
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* Related articles */}
      <section
        style={{
          background: "var(--cream)",
          padding: "clamp(50px,6vw,80px) clamp(20px,5vw,64px) clamp(60px,8vw,100px)",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <Reveal style={{ marginBottom: 36 }}>
            <span
              style={{
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "var(--red)",
              }}
            >
              Read next
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(26px,4vw,42px)",
                letterSpacing: "-1px",
                color: "var(--ink)",
                margin: "10px 0 0",
                lineHeight: 1.05,
              }}
            >
              More from the family.
            </h2>
          </Reveal>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(min(100%,300px),1fr))",
              gap: 22,
            }}
          >
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <RelatedCard post={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FooterExperience />
    </main>
  );
}
