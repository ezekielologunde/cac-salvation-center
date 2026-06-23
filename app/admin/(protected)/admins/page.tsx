import { createClient, createServiceClient } from "@/lib/supabase/server";
import AdminsClient from "./AdminsClient";

export default async function AdminsPage() {
  const [supabase, service] = await Promise.all([
    createClient(),
    Promise.resolve(createServiceClient()),
  ]);

  const [{ data: { user } }, { data: admins }] = await Promise.all([
    supabase.auth.getUser(),
    service.from("admin_profiles").select("id, email, created_at").order("created_at"),
  ]);

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 30, color: "var(--ink)", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
          Manage Admins
        </h1>
        <p style={{ color: "rgba(0,0,0,0.45)", fontSize: 15, margin: 0 }}>
          Invite new admins or remove existing ones. Invitations are sent by email.
        </p>
      </div>
      <AdminsClient admins={admins ?? []} currentUserId={user?.id ?? ""} />
    </div>
  );
}
