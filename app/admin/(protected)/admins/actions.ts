"use server";

import { revalidatePath } from "next/cache";
import { createClient, createServiceClient } from "@/lib/supabase/server";
import { SITE_URL } from "@/lib/site";

export type InviteState = { error: string; success: boolean; email: string };

export async function inviteAdmin(_: InviteState, formData: FormData): Promise<InviteState> {
  const email = (formData.get("email") as string).trim().toLowerCase();
  if (!email) return { error: "Email is required.", success: false, email: "" };

  const service = createServiceClient();

  const { data: existing } = await service
    .from("admin_profiles")
    .select("id")
    .eq("email", email)
    .maybeSingle();

  if (existing) return { error: "This email is already an admin.", success: false, email };

  const { data, error } = await service.auth.admin.inviteUserByEmail(email, {
    redirectTo: `${SITE_URL}/admin`,
  });

  if (error) return { error: error.message, success: false, email };

  const { error: insertError } = await service
    .from("admin_profiles")
    .insert({ id: data.user.id, email: data.user.email ?? email });

  if (insertError) return { error: insertError.message, success: false, email };

  revalidatePath("/admin/admins");
  return { error: "", success: true, email };
}

export async function removeAdmin(id: string) {
  // Prevent removing yourself
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (user?.id === id) return;

  const service = createServiceClient();
  await service.from("admin_profiles").delete().eq("id", id);
  revalidatePath("/admin/admins");
}
