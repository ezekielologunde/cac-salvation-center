"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function approveTestimony(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonies").update({ approved: true }).eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/testimonies");
  revalidatePath("/testimonies");
}

export async function deleteTestimony(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("testimonies").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/testimonies");
}
