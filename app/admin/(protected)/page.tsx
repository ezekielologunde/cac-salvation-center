import { createServiceClient } from "@/lib/supabase/server";
import DashboardCards from "@/components/admin/DashboardCards";

async function getStats() {
  const service = createServiceClient();
  const [posts, events, testimonies, prayers, contacts] = await Promise.all([
    service.from("blog_posts").select("id", { count: "exact", head: true }),
    service.from("events").select("id", { count: "exact", head: true }),
    service.from("testimonies").select("id", { count: "exact", head: true }).eq("approved", false),
    service.from("prayer_requests").select("id", { count: "exact", head: true }).eq("archived", false),
    service.from("contact_submissions").select("id", { count: "exact", head: true }).eq("archived", false),
  ]);
  return {
    posts:              posts.count ?? 0,
    events:             events.count ?? 0,
    pendingTestimonies: testimonies.count ?? 0,
    prayers:            prayers.count ?? 0,
    contacts:           contacts.count ?? 0,
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();
  const totalAttention = stats.pendingTestimonies + stats.prayers + stats.contacts;

  return (
    <div style={{ maxWidth: 900 }}>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 30, color: "var(--ink)", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
          Dashboard
        </h1>
        <p style={{ color: "rgba(0,0,0,0.45)", fontSize: 15, margin: 0 }}>
          {totalAttention > 0
            ? `${totalAttention} item${totalAttention !== 1 ? "s" : ""} need your attention today.`
            : "Everything is up to date."}
        </p>
      </div>
      <DashboardCards stats={stats} />
    </div>
  );
}
