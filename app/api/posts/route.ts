import { desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { posts } from "../../../db/schema";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const slug = new URL(request.url).searchParams.get("slug");
    const db = getDb();
    if (slug) {
      const [post] = await db.select().from(posts).where(eq(posts.slug, slug)).limit(1);
      if (!post || post.status !== "published") {
        return Response.json({ error: "Yazı bulunamadı" }, { status: 404 });
      }
      return Response.json({ post });
    }
    const rows = await db
      .select()
      .from(posts)
      .where(eq(posts.status, "published"))
      .orderBy(desc(posts.publishedAt), desc(posts.id));
    return Response.json({ posts: rows });
  } catch {
    return Response.json({ posts: [] });
  }
}
