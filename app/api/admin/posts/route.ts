import { createSupabaseServerClient, toPublicPost } from "../../../../lib/supabase";

export const dynamic = "force-dynamic";

function slugify(value: string) {
  return value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ı/g, "i").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 90);
}

async function guard(request: Request) {
  const accessToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!accessToken) return { error: Response.json({ error: "Giriş gerekli" }, { status: 401 }), client: null, user: null };
  const client = createSupabaseServerClient(accessToken);
  const { data, error } = await client.auth.getUser(accessToken);
  if (error || !data.user) return { error: Response.json({ error: "Oturum geçersiz" }, { status: 401 }), client: null, user: null };
  const { data: admin } = await client.from("admin_users").select("user_id").eq("user_id", data.user.id).maybeSingle();
  if (!admin) return { error: Response.json({ error: "Bu hesap yönetici olarak tanımlı değil" }, { status: 403 }), client: null, user: data.user };
  return { error: null, client, user: data.user };
}

export async function GET(request: Request) {
  const access = await guard(request);
  if (access.error) return access.error;
  const { data, error } = await access.client!.from("posts").select("*").order("updated_at", { ascending: false });
  if (error) return Response.json({ error: "Yazılar yüklenemedi" }, { status: 500 });
  return Response.json({ posts: (data ?? []).map(toPublicPost), user: access.user });
}

export async function POST(request: Request) {
  const access = await guard(request);
  if (access.error || !access.user) return access.error!;
  const payload = (await request.json()) as Record<string, string>;
  const title = payload.title?.trim();
  const content = payload.content?.trim();
  if (!title || !content) return Response.json({ error: "Başlık ve içerik zorunludur" }, { status: 400 });
  const status = payload.status === "published" ? "published" : "draft";
  const now = new Date().toISOString();
  const { data: post, error } = await access.client!.from("posts").insert({
    title, slug: slugify(payload.slug || title), excerpt: payload.excerpt?.trim() || content.slice(0, 180), content,
    category: payload.category?.trim() || "Hukuk Notları", language: payload.language || "tr", status,
    author_id: access.user.id, author_email: access.user.email ?? "", updated_at: now,
    published_at: status === "published" ? now : null,
  }).select("*").single();
  if (error) return Response.json({ error: error.code === "23505" ? "Bu başlığa ait bağlantı zaten kullanılıyor" : "Yazı kaydedilemedi" }, { status: 400 });
  return Response.json({ post: toPublicPost(post) }, { status: 201 });
}

export async function PUT(request: Request) {
  const access = await guard(request);
  if (access.error) return access.error;
  const payload = (await request.json()) as Record<string, string> & { id?: number };
  if (!payload.id) return Response.json({ error: "Yazı kimliği eksik" }, { status: 400 });
  if (!payload.title?.trim() || !payload.content?.trim()) return Response.json({ error: "Başlık ve içerik zorunludur" }, { status: 400 });
  const status = payload.status === "published" ? "published" : "draft";
  const now = new Date().toISOString();
  const { data: post, error } = await access.client!.from("posts").update({
    title: payload.title.trim(), slug: slugify(payload.slug || payload.title), excerpt: payload.excerpt?.trim() || "",
    content: payload.content.trim(), category: payload.category?.trim() || "Hukuk Notları", language: payload.language || "tr",
    status, updated_at: now, published_at: status === "published" ? now : null,
  }).eq("id", Number(payload.id)).select("*").single();
  if (error) return Response.json({ error: "Değişiklikler kaydedilemedi" }, { status: 400 });
  return Response.json({ post: toPublicPost(post) });
}

export async function DELETE(request: Request) {
  const access = await guard(request);
  if (access.error) return access.error;
  const id = Number(new URL(request.url).searchParams.get("id"));
  if (!id) return Response.json({ error: "Yazı kimliği eksik" }, { status: 400 });
  const { error } = await access.client!.from("posts").delete().eq("id", id);
  if (error) return Response.json({ error: "Yazı silinemedi" }, { status: 400 });
  return Response.json({ ok: true });
}
