import { createSupabaseServerClient, toPublicPost } from "../../../lib/supabase";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const slug = new URL(request.url).searchParams.get("slug");
    const db = createSupabaseServerClient();
    if (slug) {
      const { data: post } = await db.from("posts").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
      if (!post) return Response.json({ error: "Yazı bulunamadı" }, { status: 404 });
      return Response.json({ post: toPublicPost(post) });
    }
    const { data } = await db.from("posts").select("*").eq("status", "published").order("published_at", { ascending: false });
    return Response.json({ posts: (data ?? []).map(toPublicPost) });
  } catch {
    return Response.json({ posts: [] });
  }
}
