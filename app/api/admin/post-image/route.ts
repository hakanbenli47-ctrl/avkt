import { BLOG_IMAGE_BUCKET, blogImageObjectName, createSupabaseAdminClient, createSupabaseServerClient } from "../../../../lib/supabase";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const maxImageBytes = 5 * 1024 * 1024;

async function guard(request: Request) {
  const accessToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!accessToken) return { error: Response.json({ error: "Giriş gerekli" }, { status: 401 }) };
  const client = createSupabaseServerClient(accessToken);
  const { data, error } = await client.auth.getUser(accessToken);
  if (error || !data.user) return { error: Response.json({ error: "Oturum geçersiz" }, { status: 401 }) };
  const { data: admin } = await client.from("admin_users").select("user_id").eq("user_id", data.user.id).maybeSingle();
  if (!admin) return { error: Response.json({ error: "Bu hesap yönetici olarak tanımlı değil" }, { status: 403 }) };
  return { error: null };
}

async function getStorage() {
  const admin = createSupabaseAdminClient();
  const { data: bucket } = await admin.storage.getBucket(BLOG_IMAGE_BUCKET);
  if (!bucket) {
    const { error } = await admin.storage.createBucket(BLOG_IMAGE_BUCKET, {
      public: false,
      allowedMimeTypes: ["image/jpeg"],
      fileSizeLimit: maxImageBytes,
    });
    if (error && !error.message.toLocaleLowerCase("tr-TR").includes("already exists")) throw error;
  }
  return admin.storage.from(BLOG_IMAGE_BUCKET);
}

function validSlug(value: unknown): value is string {
  return typeof value === "string" && value.length <= 90 && slugPattern.test(value);
}

export async function POST(request: Request) {
  const access = await guard(request);
  if (access.error) return access.error;

  try {
    const formData = await request.formData();
    const slug = formData.get("slug");
    const file = formData.get("file");
    if (!validSlug(slug)) return Response.json({ error: "Geçersiz yazı bağlantısı" }, { status: 400 });
    if (!(file instanceof File)) return Response.json({ error: "Görsel seçilmedi" }, { status: 400 });
    if (file.type !== "image/jpeg") return Response.json({ error: "Görsel JPEG olarak hazırlanmalıdır" }, { status: 400 });
    if (!file.size || file.size > maxImageBytes) return Response.json({ error: "Görsel boyutu 5 MB sınırını aşıyor" }, { status: 400 });

    const bytes = new Uint8Array(await file.arrayBuffer());
    const isJpeg = bytes.length > 4 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[bytes.length - 2] === 0xff && bytes[bytes.length - 1] === 0xd9;
    if (!isJpeg) return Response.json({ error: "Dosya gerçek bir JPEG görseli değil" }, { status: 400 });

    const storage = await getStorage();
    const { error } = await storage.upload(blogImageObjectName(slug), bytes, {
      contentType: "image/jpeg",
      cacheControl: "86400",
      upsert: true,
    });
    if (error) throw error;
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Görsel yüklenemedi" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const access = await guard(request);
  if (access.error) return access.error;

  const slug = new URL(request.url).searchParams.get("slug");
  if (!validSlug(slug)) return Response.json({ error: "Geçersiz yazı bağlantısı" }, { status: 400 });

  try {
    const storage = await getStorage();
    const { error } = await storage.remove([blogImageObjectName(slug)]);
    if (error) throw error;
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Görsel kaldırılamadı" }, { status: 500 });
  }
}
