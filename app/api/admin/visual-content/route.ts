import { createSupabaseServerClient } from "../../../../lib/supabase";
import type { SiteLanguage } from "../../../../lib/translations";

export const dynamic = "force-dynamic";

const languages: SiteLanguage[] = ["tr", "ru", "en", "ro"];

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

function visualKey(source: string) {
  let hash = 2166136261;
  for (let index = 0; index < source.length; index += 1) hash = Math.imul(hash ^ source.charCodeAt(index), 16777619);
  return `visual_${(hash >>> 0).toString(36)}`;
}

export async function GET(request: Request) {
  const access = await guard(request);
  if (access.error) return access.error;
  const { data, error } = await access.client!.from("site_content").select("content_key,section,label,source_text,tr,ru,en,ro,updated_at").order("updated_at", { ascending: false });
  if (error) return Response.json({ error: "Kayıtlı site içerikleri yüklenemedi." }, { status: 400 });
  return Response.json({ rows: data ?? [] }, { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(request: Request) {
  const access = await guard(request);
  if (access.error || !access.user) return access.error!;
  const payload = await request.json() as { contentKey?: string; sourceText?: string; language?: SiteLanguage; value?: string; page?: string; label?: string };
  const sourceText = String(payload.sourceText ?? "").trim();
  const value = String(payload.value ?? "").trim();
  const language = payload.language;
  if (!sourceText || !value || !language || !languages.includes(language)) return Response.json({ error: "Metin ve dil bilgisi eksik." }, { status: 400 });
  if (sourceText.length > 20000 || value.length > 20000) return Response.json({ error: "Metin izin verilen uzunluğu aşıyor." }, { status: 400 });

  const { data: rows, error: readError } = await access.client!.from("site_content").select("content_key,source_text,tr,ru,en,ro");
  if (readError) return Response.json({ error: "İçerik kaydı okunamadı." }, { status: 400 });
  const existing = (rows ?? []).find((row) => row.content_key === payload.contentKey || row.source_text === sourceText || languages.some((item) => row[item] === sourceText));
  const now = new Date().toISOString();

  if (existing) {
    const { data, error } = await access.client!.from("site_content").update({ [language]: value, section: payload.page || "Görsel düzenleyici", label: payload.label || sourceText.slice(0, 100), updated_at: now, updated_by: access.user.id }).eq("content_key", existing.content_key).select("content_key,section,label,source_text,tr,ru,en,ro,updated_at").single();
    if (error) return Response.json({ error: "Seçilen metin kaydedilemedi." }, { status: 400 });
    return Response.json({ row: data });
  }

  const values = { tr: "", ru: "", en: "", ro: "", [language]: value };
  const { data, error } = await access.client!.from("site_content").insert({ content_key: visualKey(sourceText), section: payload.page || "Görsel düzenleyici", label: payload.label || sourceText.slice(0, 100), source_text: sourceText, ...values, updated_at: now, updated_by: access.user.id }).select("content_key,section,label,source_text,tr,ru,en,ro,updated_at").single();
  if (error) return Response.json({ error: error.code === "23505" ? "Bu metin başka bir içerik kaydıyla çakıştı. Sayfayı yenileyip tekrar seçin." : "Seçilen metin kaydedilemedi." }, { status: 400 });
  return Response.json({ row: data });
}