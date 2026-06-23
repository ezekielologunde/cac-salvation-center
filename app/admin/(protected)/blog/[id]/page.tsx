import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import PostForm from "@/components/admin/PostForm";

type PostRow = { id: string; title: string; slug: string; excerpt: string | null; body: string; published: boolean };

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const result = await supabase
    .from("blog_posts")
    .select("id, title, slug, excerpt, body, published")
    .eq("id", id)
    .single();

  const post = result.data as PostRow | null;
  if (!post) notFound();

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <Link href="/admin/blog" style={{ color: "rgba(0,0,0,0.4)", fontSize: 13, textDecoration: "none" }}>
          ← Blog Posts
        </Link>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: 26, color: "var(--ink)", margin: "8px 0 0" }}>
          Edit Post
        </h1>
      </div>
      <div style={{ background: "white", borderRadius: 12, padding: "32px 36px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
        <PostForm post={{ id: post.id, title: post.title, slug: post.slug, excerpt: post.excerpt, body: post.body, published: post.published }} />
      </div>
    </div>
  );
}
