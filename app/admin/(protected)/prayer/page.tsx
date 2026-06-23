import { createServiceClient } from "@/lib/supabase/server";
import { archivePrayer, unarchivePrayer } from "./actions";

type PrayerRow = {
  id: string;
  name: string | null;
  email: string | null;
  request: string;
  urgent: boolean;
  created_at: string;
};

function PrayerCard({ item, archived }: { item: PrayerRow; archived: boolean }) {
  const date = new Date(item.created_at).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });

  return (
    <div style={{
      background: "white",
      borderRadius: 10,
      padding: "20px 24px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
      borderLeft: `4px solid ${item.urgent ? "#dc2626" : archived ? "#d1d5db" : "#2563eb"}`,
      opacity: archived ? 0.7 : 1,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 12 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
            <span style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)" }}>
              {item.name ?? "Anonymous"}
            </span>
            {item.urgent && (
              <span style={{ background: "#dc2626", color: "white", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 20, letterSpacing: "0.05em" }}>
                URGENT
              </span>
            )}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 4, flexWrap: "wrap" }}>
            {item.email && (
              <a href={`mailto:${item.email}`} style={{ fontSize: 13, color: "#2563eb", textDecoration: "none" }}>
                {item.email}
              </a>
            )}
            <span style={{ fontSize: 12, color: "rgba(0,0,0,0.35)" }}>{date}</span>
          </div>
        </div>
        <form action={archived ? unarchivePrayer.bind(null, item.id) : archivePrayer.bind(null, item.id)}>
          <button type="submit" style={{
            background: "transparent",
            color: archived ? "#2563eb" : "rgba(0,0,0,0.35)",
            border: `1px solid ${archived ? "#2563eb" : "rgba(0,0,0,0.15)"}`,
            borderRadius: 6,
            padding: "5px 12px",
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            whiteSpace: "nowrap",
          }}>
            {archived ? "Unarchive" : "Archive"}
          </button>
        </form>
      </div>
      <p style={{ fontSize: 14, color: "rgba(0,0,0,0.7)", margin: 0, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
        {item.request}
      </p>
    </div>
  );
}

export default async function PrayerPage() {
  const supabase = createServiceClient();

  const [activeResult, archivedResult] = await Promise.all([
    supabase
      .from("prayer_requests")
      .select("id, name, email, request, urgent, created_at")
      .eq("archived", false)
      .order("urgent", { ascending: false })
      .order("created_at", { ascending: true }),
    supabase
      .from("prayer_requests")
      .select("id, name, email, request, urgent, created_at")
      .eq("archived", true)
      .order("created_at", { ascending: false })
      .limit(30),
  ]);

  const active = (activeResult.data ?? []) as PrayerRow[];
  const archived = (archivedResult.data ?? []) as PrayerRow[];
  const urgentCount = active.filter((r) => r.urgent).length;

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 26, color: "var(--ink)", margin: "0 0 6px", display: "flex", alignItems: "center", gap: 12 }}>
          Prayer Requests
          {active.length > 0 && (
            <span style={{ background: "#2563eb", color: "white", borderRadius: 20, fontSize: 13, fontWeight: 700, padding: "3px 11px" }}>
              {active.length}
            </span>
          )}
        </h1>
        {urgentCount > 0 && (
          <p style={{ fontSize: 14, color: "#dc2626", fontWeight: 600, margin: 0 }}>
            {urgentCount} urgent {urgentCount === 1 ? "request" : "requests"} need attention
          </p>
        )}
      </div>

      {active.length === 0 ? (
        <div style={{ background: "white", borderRadius: 12, padding: "48px 32px", textAlign: "center", color: "rgba(0,0,0,0.35)", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
          <p style={{ fontSize: 16, margin: 0 }}>No active prayer requests.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}>
          {active.map((item) => <PrayerCard key={item.id} item={item} archived={false} />)}
        </div>
      )}

      {archived.length > 0 && (
        <section>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 18, color: "var(--ink)", margin: "0 0 16px", opacity: 0.6 }}>
            Archived <span style={{ fontWeight: 400, fontSize: 13 }}>(most recent 30)</span>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {archived.map((item) => <PrayerCard key={item.id} item={item} archived={true} />)}
          </div>
        </section>
      )}
    </div>
  );
}
