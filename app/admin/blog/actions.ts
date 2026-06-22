"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function slugify(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").slice(0, 80);
}

export async function createPost(formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const slug = (formData.get("slug") as string) || slugify(title);
  const excerpt = (formData.get("excerpt") as string) || null;
  const body = formData.get("body") as string;
  const published = formData.get("published") === "true";

  const { data, error } = await supabase
    .from("blog_posts")
    .insert({ title, slug, excerpt, body, published, published_at: published ? new Date().toISOString() : null })
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect(`/admin/blog/${data.id}`);
}

export async function updatePost(id: string, formData: FormData) {
  const supabase = await createClient();
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;
  const excerpt = (formData.get("excerpt") as string) || null;
  const body = formData.get("body") as string;
  const published = formData.get("published") === "true";

  const { data: existing } = await supabase.from("blog_posts").select("published, published_at").eq("id", id).single();
  const published_at = published
    ? (existing?.published ? existing.published_at : new Date().toISOString())
    : null;

  const { error } = await supabase
    .from("blog_posts")
    .update({ title, slug, excerpt, body, published, published_at })
    .eq("id", id);

  if (error) throw new Error(error.message);
  revalidatePath("/admin/blog");
  revalidatePath(`/admin/blog/${id}`);
  revalidatePath("/blog");
}

export async function deletePost(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  redirect("/admin/blog");
}
