import { createServiceClient } from "@/lib/supabase/server";
import { archiveConnectCard, unarchiveConnectCard } from "./actions";
import ActionButton from "@/components/admin/ActionButton";
import ForwardToStaff from "@/components/admin/ForwardToStaff";

type ConnectRow = {
  id: string;
  first_name: string;
  last_name: string | null;
  email: string;
  phone: string | null;
  visit_type: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
  country: string | null;
  groups: string | null;
  created_at: string;
};

function fullName(item: ConnectRow) {
  return [item.first_name, item.last_name].filter(Boolean).join(" ");
}

function fullAddress(item: ConnectRow) {
  return [item.address, item.city, item.state, item.zip, item.country].filter(Boolean).join(", ");
}

function connectBody(item: ConnectRow, date: string) {
  const lines = [
    `Name: ${fullName(item)}`,
    `Email: ${item.email}`,
    item.phone ? `Phone: ${item.phone}` : null,
    item.visit_type ? `Visit type: ${item.visit_type}` : null,
    fullAddress(item) ? `Address: ${fullAddress(item)}` : null,
    item.groups ? `Interested in: ${item.groups}` : null,
    `Submitted: ${date}`,
  ].filter(Boolean);
  return `Forwarding a Connect Card submission from cacsalvationcenter.org.\n\n${lines.join("\n")}`;
}

function ConnectCard({ item, archived }: { item: ConnectRow; archived: boolean }) {
  const date = new Date(item.created_at).toLocaleDateString("en-GB", {
    day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit",
  });
  const name = fullName(item);
  const address = fullAddress(item);

  return (
    <div style={{
      background: "white",
      borderRadius: 10,
      padding: "20px 24px",
      boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
      opacity: archived ? 0.7 : 1,
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 12 }}>
        <div style={{ minWidth: 0 }}>
          <p style={{ fontWeight: 700, fontSize: 15, color: "var(--ink)", margin: "0 0 2px" }}>
            {name}
            {item.visit_type && (
              <span style={{
                fontWeight: 600, fontSize: 11, marginLeft: 10, color: "var(--red)",
                background: "rgba(214,40,40,.08)", borderRadius: 999, padding: "2px 9px",
              }}>
                {item.visit_type}
              </span>
            )}
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
            <a href={`mailto:${item.email}`} style={{ fontSize: 13, color: "var(--red)", textDecoration: "none", fontWeight: 500 }}>
              {item.email}
            </a>
            {item.phone && (
              <a href={`tel:${item.phone}`} style={{ fontSize: 13, color: "var(--ink-soft)", textDecoration: "none" }}>
                {item.phone}
              </a>
            )}
            <span style={{ fontSize: 12, color: "var(--ink-soft)" }}>{date}</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <a
            href={`mailto:${item.email}?subject=${encodeURIComponent("Great to connect with you — CAC Salvation Center")}`}
            style={{
              background: "var(--red)", color: "white", border: "none", borderRadius: 6,
              padding: "5px 12px", fontSize: 12, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap",
            }}
          >
            Reply
          </a>
          <ForwardToStaff
            subject={`Fwd: Connect Card — ${name}`}
            body={connectBody(item, date)}
          />
          <form action={archived ? unarchiveConnectCard.bind(null, item.id) : archiveConnectCard.bind(null, item.id)}>
            <ActionButton style={{
              background: "transparent", color: "var(--ink-soft)", border: "1px solid rgba(27,19,14,0.15)",
              borderRadius: 6, padding: "5px 12px", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap",
            }}>
              {archived ? "Unarchive" : "Archive"}
            </ActionButton>
          </form>
        </div>
      </div>
      {(address || item.groups) && (
        <div style={{ fontSize: 13.5, color: "rgba(0,0,0,0.7)", lineHeight: 1.8 }}>
          {address && <p style={{ margin: 0 }}>{address}</p>}
          {item.groups && <p style={{ margin: 0 }}><strong>Interested in:</strong> {item.groups}</p>}
        </div>
      )}
    </div>
  );
}

export default async function ConnectPage() {
  const supabase = createServiceClient();

  const [activeResult, archivedResult] = await Promise.all([
    supabase
      .from("connect_cards")
      .select("id, first_name, last_name, email, phone, visit_type, address, city, state, zip, country, groups, created_at")
      .eq("archived", false)
      .order("created_at", { ascending: true }),
    supabase
      .from("connect_cards")
      .select("id, first_name, last_name, email, phone, visit_type, address, city, state, zip, country, groups, created_at")
      .eq("archived", true)
      .order("created_at", { ascending: false })
      .limit(30),
  ]);

  const active = (activeResult.data ?? []) as ConnectRow[];
  const archived = (archivedResult.data ?? []) as ConnectRow[];

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: "var(--ink)", margin: "0 0 6px", display: "flex", alignItems: "center", gap: 12 }}>
          Connect Cards
          {active.length > 0 && (
            <span style={{ background: "var(--red)", color: "white", borderRadius: 20, fontSize: 13, fontWeight: 700, padding: "3px 11px" }}>
              {active.length}
            </span>
          )}
        </h1>
        <p style={{ fontSize: 14, color: "var(--ink-soft)", margin: 0 }}>
          Visitors and new members who filled out "Let us know you're here" on the Visit page.
        </p>
      </div>

      {active.length === 0 ? (
        <div style={{ background: "white", borderRadius: 12, padding: "48px 32px", textAlign: "center", color: "var(--ink-soft)", boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}>
          <p style={{ fontSize: 16, margin: 0 }}>No new connect cards.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 48 }}>
          {active.map((item) => <ConnectCard key={item.id} item={item} archived={false} />)}
        </div>
      )}

      {archived.length > 0 && (
        <section>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "var(--ink-soft)", margin: "0 0 14px" }}>
            Archived <span style={{ fontWeight: 400, fontSize: 13 }}>(most recent 30)</span>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {archived.map((item) => <ConnectCard key={item.id} item={item} archived={true} />)}
          </div>
        </section>
      )}
    </div>
  );
}
