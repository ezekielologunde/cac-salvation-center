import { redirect } from "next/navigation";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/admin/login");

  const service = createServiceClient();
  const { data: profile } = await service
    .from("admin_profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/admin/login?error=unauthorized");

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f4f4f0" }}>
      <AdminSidebar email={user.email ?? ""} />
      <main style={{ flex: 1, padding: "40px 48px", overflowY: "auto", minWidth: 0 }}>
        {children}
      </main>
    </div>
  );
}
