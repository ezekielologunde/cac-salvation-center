"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function archiveContact(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").update({ archived: true }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/contact");
}

export async function unarchiveContact(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("contact_submissions").update({ archived: false }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/contact");
}
