import Link from "next/link";
import EventForm from "@/components/admin/EventForm";

export default function NewEventPage() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <Link href="/admin/events" style={{ color: "rgba(0,0,0,0.4)", fontSize: 13, textDecoration: "none" }}>
          ← Events
        </Link>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 26, color: "var(--ink)", margin: "8px 0 0" }}>New Event</h1>
      </div>
      <div style={{ background: "white", borderRadius: 12, padding: "32px 36px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
        <EventForm />
      </div>
    </div>
  );
}
