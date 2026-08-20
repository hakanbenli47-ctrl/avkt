import { desc, eq } from "drizzle-orm";
import { getDb } from "../../../../db";
import { posts } from "../../../../db/schema";
import { getChatGPTUser } from "../../../chatgpt-auth";
import { isAuthorizedAdmin } from "../../../../lib/admin-auth";

export const dynamic = "force-dynamic";

function slugify(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 90);
}

async function guard() {
  const user = await getChatGPTUser();
  if (!user) return { error: Response.json({ error: "Giriş gerekli" }, { status: 401 }), user: null };
  if (!isAuthorizedAdmin(user)) return { error: Response.json({ error: "Bu hesap yönetici olarak tanımlı değil" }, { status: 403 }), user };
  return { error: null, user };
}

export async function GET() {
  const access = await guard();
  if (access.error) return access.error;
  try {
    const rows = await getDb().select().from(posts).orderBy(desc(posts.updatedAt), desc(posts.id));
    return Response.json({ posts: rows, user: access.user });
  } catch {
    return Response.json({ posts: [], user: access.user });
  }
}

export async function POST(request: Request) {
  const access = await guard();
  if (access.error || !access.user) return access.error!;
  const payload = (await request.json()) as Record<string, string>;
  const title = payload.title?.trim();
  const content = payload.content?.trim();
  if (!title || !content) return Response.json({ error: "Başlık ve içerik zorunludur" }, { status: 400 });
  const status = payload.status === "published" ? "published" : "draft";
  const now = new Date().toISOString();
  const [post] = await getDb().insert(posts).values({
    title,
    slug: slugify(payload.slug || title),
    excerpt: payload.excerpt?.trim() || content.slice(0, 180),
    content,
    category: payload.category?.trim() || "Hukuk Notları",
    language: payload.language || "tr",
    status,
    authorEmail: access.user.email,
    updatedAt: now,
    publishedAt: status === "published" ? now : null,
  }).returning();
  return Response.json({ post }, { status: 201 });
}

export async function PUT(request: Request) {
  const access = await guard();
  if (access.error) return access.error;
  const payload = (await request.json()) as Record<string, string> & { id?: number };
  if (!payload.id) return Response.json({ error: "Yazı kimliği eksik" }, { status: 400 });
  const status = payload.status === "published" ? "published" : "draft";
  const now = new Date().toISOString();
  const [post] = await getDb().update(posts).set({
    title: payload.title.trim(),
    slug: slugify(payload.slug || payload.title),
    excerpt: payload.excerpt?.trim() || "",
    content: payload.content.trim(),
    category: payload.category?.trim() || "Hukuk Notları",
    language: payload.language || "tr",
    status,
    updatedAt: now,
    publishedAt: status === "published" ? now : null,
  }).where(eq(posts.id, Number(payload.id))).returning();
  return Response.json({ post });
}

export async function DELETE(request: Request) {
  const access = await guard();
  if (access.error) return access.error;
  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!id) return Response.json({ error: "Yazı kimliği eksik" }, { status: 400 });
  await getDb().delete(posts).where(eq(posts.id, id));
  return Response.json({ ok: true });
}
