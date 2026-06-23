import { createServiceClient } from "@/lib/supabase/server";
import { archiveContact, unarchiveContact } from "./actions";

type ContactRow = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  created_at: string;
};

function ContactCard({ item, archived }: { item: ContactRow; archived: boolean }) {
  const date = new Date(item.created_at).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });

  return (
    <div style={{
      background: "white",
      borderRadius: 10,
      padding: "20px 24px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
      borderLeft: `4px solid ${archived ? "#d1d5db" : "#7c3aed"}`,
      opacity: archived ? 0.7 : 1,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 12 }}>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)", margin: "0 0 2px" }}>
            {item.name}
            {item.subject && (
              <span style={{ fontWeight: 400, color: "rgba(0,0,0,0.5)", marginLeft: 8, fontSize: 14 }}>
                — {item.subject}
              </span>
            )}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <a
              href={`mailto:${item.email}?subject=Re: ${encodeURIComponent(item.subject ?? "Your message to CAC Salvation Center")}`}
              style={{ fontSize: 13, color: "#7c3aed", textDecoration: "none", fontWeight: 500 }}
            >
              {item.email}
            </a>
            <span style={{ fontSize: 12, color: "rgba(0,0,0,0.35)" }}>{date}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <a
            href={`mailto:${item.email}?subject=Re: ${encodeURIComponent(item.subject ?? "Your message to CAC Salvation Center")}`}
            style={{
              background: "#7c3aed",
              color: "white",
              border: "none",
              borderRadius: 6,
              padding: "5px 12px",
              fontSize: 12,
              fontWeight: 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            Reply
          </a>
          <form action={archived ? unarchiveContact.bind(null, item.id) : archiveContact.bind(null, item.id)}>
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
      </div>
      <p style={{ fontSize: 14, color: "rgba(0,0,0,0.7)", margin: 0, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
        {item.message}
      </p>
    </div>
  );
}

export default async function ContactPage() {
  const supabase = createServiceClient();

  const [activeResult, archivedResult] = await Promise.all([
    supabase
      .from("contact_submissions")
      .select("id, name, email, subject, message, created_at")
      .eq("archived", false)
      .order("created_at", { ascending: true }),
    supabase
      .from("contact_submissions")
      .select("id, name, email, subject, message, created_at")
      .eq("archived", true)
      .order("created_at", { ascending: false })
      .limit(30),
  ]);

  const active = (activeResult.data ?? []) as ContactRow[];
  const archived = (archivedResult.data ?? []) as ContactRow[];

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 26, color: "var(--ink)", margin: "0 0 6px", display: "flex", alignItems: "center", gap: 12 }}>
          Contact Inbox
          {active.length > 0 && (
            <span style={{ background: "#7c3aed", color: "white", borderRadius: 20, fontSize: 13, fontWeight: 700, padding: "3px 11px" }}>
              {active.length}
            </span>
          )}
        </h1>
        <p style={{ fontSize: 14, color: "rgba(0,0,0,0.45)", margin: 0 }}>
          Click Reply or the email address to respond in your mail client.
        </p>
      </div>

      {active.length === 0 ? (
        <div style={{ background: "white", borderRadius: 12, padding: "48px 32px", textAlign: "center", color: "rgba(0,0,0,0.35)", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
          <p style={{ fontSize: 16, margin: 0 }}>No unread messages.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}>
          {active.map((item) => <ContactCard key={item.id} item={item} archived={false} />)}
        </div>
      )}

      {archived.length > 0 && (
        <section>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 18, color: "var(--ink)", margin: "0 0 16px", opacity: 0.6 }}>
            Archived <span style={{ fontWeight: 400, fontSize: 13 }}>(most recent 30)</span>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {archived.map((item) => <ContactCard key={item.id} item={item} archived={true} />)}
          </div>
        </section>
      )}
    </div>
  );
}
