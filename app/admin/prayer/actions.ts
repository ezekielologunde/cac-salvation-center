"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function archivePrayer(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("prayer_requests").update({ archived: true }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/prayer");
}

export async function unarchivePrayer(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("prayer_requests").update({ archived: false }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/prayer");
}
