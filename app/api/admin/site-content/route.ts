import { createSupabaseServerClient } from "../../../../lib/supabase";
import { siteContentByKey, siteContentCatalog, siteContentSections, siteLanguages, type SiteContentValues } from "../../../../lib/site-content";

export const dynamic = "force-dynamic";

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

function fieldsWithValues(rows: Array<Record<string, string>> = []) {
  const saved = new Map(rows.map((row) => [row.content_key, row]));
  return siteContentCatalog.map((field) => {
    const row = saved.get(field.contentKey);
    return { ...field, values: row ? { tr: row.tr, ru: row.ru, en: row.en, ro: row.ro } : field.defaults, updatedAt: row?.updated_at ?? null };
  });
}

export async function GET(request: Request) {
  const access = await guard(request);
  if (access.error) return access.error;
  const { data, error } = await access.client!.from("site_content").select("*").order("section").order("label");
  if (error) {
    const setupRequired = error.code === "42P01" || error.code === "42501" || error.code === "PGRST205";
    return Response.json({ fields: fieldsWithValues(), sections: siteContentSections, setupRequired, error: setupRequired ? "Site içerikleri tablosu henüz kurulmadı. Supabase SQL Editor’de supabase/site-content.sql dosyasını çalıştırın." : "Site içerikleri yüklenemedi." }, { headers: { "Cache-Control": "no-store" } });
  }
  return Response.json({ fields: fieldsWithValues(data ?? []), sections: siteContentSections, setupRequired: false }, { headers: { "Cache-Control": "no-store" } });
}

export async function PUT(request: Request) {
  const access = await guard(request);
  if (access.error || !access.user) return access.error!;
  const payload = await request.json() as { updates?: Array<{ contentKey?: string; values?: Partial<SiteContentValues> }> };
  if (!Array.isArray(payload.updates) || !payload.updates.length || payload.updates.length > 600) return Response.json({ error: "Kaydedilecek geçerli bir değişiklik bulunamadı." }, { status: 400 });
  const now = new Date().toISOString();
  const rows = [];
  for (const update of payload.updates) {
    const field = update.contentKey ? siteContentByKey.get(update.contentKey) : null;
    if (!field || !update.values) return Response.json({ error: "Geçersiz içerik alanı gönderildi." }, { status: 400 });
    const values = Object.fromEntries(siteLanguages.map((language) => [language, String(update.values?.[language] ?? "").trim()])) as SiteContentValues;
    if (siteLanguages.some((language) => !values[language])) return Response.json({ error: `“${field.label}” alanında dört dil de doldurulmalıdır.` }, { status: 400 });
    rows.push({ content_key: field.contentKey, section: field.section, label: field.label, source_text: field.source, tr: values.tr, ru: values.ru, en: values.en, ro: values.ro, updated_at: now, updated_by: access.user.id });
  }
  const { error } = await access.client!.from("site_content").upsert(rows, { onConflict: "content_key" });
  if (error) {
    const setupRequired = error.code === "42P01" || error.code === "42501" || error.code === "PGRST205";
    return Response.json({ error: setupRequired ? "Site içerikleri tablosu kurulmamış. Önce verilen SQL dosyasını çalıştırın." : "İçerikler kaydedilemedi." }, { status: setupRequired ? 503 : 400 });
  }
  return Response.json({ ok: true, updated: rows.length });
}