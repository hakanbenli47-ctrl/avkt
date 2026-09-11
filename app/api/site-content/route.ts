import { createSupabaseServerClient } from "../../../lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data, error } = await createSupabaseServerClient().from("site_content").select("source_text,tr,ru,en,ro");
    if (error) return Response.json({ overrides: {} }, { headers: { "Cache-Control": "no-store" } });
    const overrides = Object.fromEntries((data ?? []).map((row) => [row.source_text, { tr: row.tr, ru: row.ru, en: row.en, ro: row.ro }]));
    return Response.json({ overrides }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return Response.json({ overrides: {} }, { headers: { "Cache-Control": "no-store" } });
  }
}