import Link from "next/link";
import AnnouncementForm from "@/components/admin/AnnouncementForm";

export default function NewAnnouncementPage() {
  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <Link href="/admin/announcements" style={{ color: "rgba(0,0,0,0.4)", fontSize: 13, textDecoration: "none" }}>
          ← Announcements
        </Link>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 26, color: "var(--ink)", margin: "8px 0 0" }}>New Announcement</h1>
      </div>
      <div style={{ background: "white", borderRadius: 12, padding: "32px 36px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
        <AnnouncementForm />
      </div>
    </div>
  );
}
