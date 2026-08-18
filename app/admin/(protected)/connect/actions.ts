"use server";

import { requireAdmin } from "@/lib/supabase/require-admin";
import { revalidatePath } from "next/cache";

export async function archiveConnectCard(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("connect_cards").update({ archived: true }).eq("id", id);
  if (error) {
    console.error("[connect] archiveConnectCard failed:", error.message);
    throw new Error("Could not archive submission. Please try again.");
  }
  revalidatePath("/admin/connect");
}

export async function unarchiveConnectCard(id: string) {
  const { supabase } = await requireAdmin();
  const { error } = await supabase.from("connect_cards").update({ archived: false }).eq("id", id);
  if (error) {
    console.error("[connect] unarchiveConnectCard failed:", error.message);
    throw new Error("Could not unarchive submission. Please try again.");
  }
  revalidatePath("/admin/connect");
}
