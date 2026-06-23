"use server";

import { createServiceClient } from "@/lib/supabase/server";

export type SubscribeState = { ok: boolean; message: string } | null;

export async function subscribeAction(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const email = (formData.get("email") as string | null)?.trim().toLowerCase() ?? "";
  const name = (formData.get("name") as string | null)?.trim() || null;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  const supabase = createServiceClient();
  const { error } = await supabase
    .from("newsletter_subscribers")
    .upsert({ email, name, active: true, source: "website" }, { onConflict: "email" });

  if (error) {
    console.error("Newsletter subscribe error:", error.message);
    return { ok: false, message: "Something went wrong. Please try again." };
  }

  return { ok: true, message: "You're in! Welcome to the family." };
}
