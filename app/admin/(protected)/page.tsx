import { createClient } from "@/lib/supabase/server";

async function getStats() {
  const supabase = await createClient();
  const [posts, events, testimonies, prayers, contacts] = await Promise.all([
    supabase.from("blog_posts").select("id", { count: "exact", head: true }),
    supabase.from("events").select("id", { count: "exact", head: true }),
    supabase.from("testimonies").select("id", { count: "exact", head: true }).eq("approved", false),
    supabase.from("prayer_requests").select("id", { count: "exact", head: true }).eq("archived", false),
    supabase.from("contact_submissions").select("id", { count: "exact", head: true }).eq("archived", false),
  ]);
  return {
    posts: posts.count ?? 0,
    events: events.count ?? 0,
    pendingTestimonies: testimonies.count ?? 0,
    prayers: prayers.count ?? 0,
    contacts: contacts.count ?? 0,
  };
}

const STAT_CARDS = [
  { key: "posts", label: "Blog Posts", color: "#2563eb", href: "/admin/blog" },
  { key: "events", label: "Events", color: "#16a34a", href: "/admin/events" },
  { key: "pendingTestimonies", label: "Testimonies Pending", color: "#d97706", href: "/admin/testimonies" },
  { key: "prayers", label: "Prayer Requests", color: "#dc2626", href: "/admin/prayer" },
  { key: "contacts", label: "Contact Messages", color: "#7c3aed", href: "/admin/contact" },
];

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div>
      <h1 style={{ fontFamily: "Georgia, serif", fontSize: 28, color: "var(--ink)", margin: "0 0 8px" }}>
        Dashboard
      </h1>
      <p style={{ color: "rgba(0,0,0,0.5)", fontSize: 15, margin: "0 0 36px" }}>
        Welcome back. Here&apos;s a snapshot of your site content.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
        {STAT_CARDS.map(({ key, label, color, href }) => (
          <a
            key={key}
            href={href}
            style={{
              background: "white",
              borderRadius: 12,
              padding: "24px 20px",
              textDecoration: "none",
              display: "block",
              borderTop: `4px solid ${color}`,
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              transition: "box-shadow 0.15s",
            }}
          >
            <p style={{ fontSize: 36, fontWeight: 700, color: "var(--ink)", margin: "0 0 4px", fontFamily: "Georgia, serif" }}>
              {stats[key as keyof typeof stats]}
            </p>
            <p style={{ fontSize: 13, color: "rgba(0,0,0,0.5)", margin: 0 }}>{label}</p>
          </a>
        ))}
      </div>

      <div style={{ marginTop: 48 }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: 20, color: "var(--ink)", margin: "0 0 16px" }}>
          Quick Actions
        </h2>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {[
            { href: "/admin/blog/new", label: "New Blog Post" },
            { href: "/admin/events/new", label: "New Event" },
            { href: "/admin/testimonies", label: "Review Testimonies" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              style={{
                background: "var(--red)",
                color: "white",
                padding: "10px 20px",
                borderRadius: 8,
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
