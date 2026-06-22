"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createEvent(formData: FormData) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("events")
    .insert({
      title: formData.get("title") as string,
      description: (formData.get("description") as string) || null,
      event_date: formData.get("event_date") as string,
      end_date: (formData.get("end_date") as string) || null,
      location: (formData.get("location") as string) || null,
      event_url: (formData.get("event_url") as string) || null,
      published: formData.get("published") === "true",
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  revalidatePath("/admin/events");
  revalidatePath("/events");
  redirect(`/admin/events/${data.id}`);
}

export async function updateEvent(id: string, formData: FormData) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("events")
    .update({
      title: formData.get("title") as string,
      description: (formData.get("description") as string) || null,
      event_date: formData.get("event_date") as string,
      end_date: (formData.get("end_date") as string) || null,
      location: (formData.get("location") as string) || null,
      event_url: (formData.get("event_url") as string) || null,
      published: formData.get("published") === "true",
    })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/events");
  revalidatePath(`/admin/events/${id}`);
  revalidatePath("/events");
}

export async function deleteEvent(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("events").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/events");
  revalidatePath("/events");
  redirect("/admin/events");
}
