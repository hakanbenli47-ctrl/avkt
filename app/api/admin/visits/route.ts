import { createSupabaseServerClient } from "../../../../lib/supabase";

export const dynamic = "force-dynamic";

async function guard(request: Request) {
  const accessToken = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!accessToken) return { error: Response.json({ error: "Giriş gerekli" }, { status: 401 }), client: null };
  const client = createSupabaseServerClient(accessToken);
  const { data, error } = await client.auth.getUser(accessToken);
  if (error || !data.user) return { error: Response.json({ error: "Oturum geçersiz" }, { status: 401 }), client: null };
  const { data: admin } = await client.from("admin_users").select("user_id").eq("user_id", data.user.id).maybeSingle();
  if (!admin) return { error: Response.json({ error: "Bu hesap yönetici olarak tanımlı değil" }, { status: 403 }), client: null };
  return { error: null, client };
}

export async function GET(request: Request) {
  const access = await guard(request);
  if (access.error) return access.error;
  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await access.client!.from("site_visits").select("*").gte("started_at", since).order("started_at", { ascending: false }).limit(500);
  if (error) {
    console.error("[admin/visits] Ziyaretler yüklenemedi", error);
    const setupRequired = error.code === "42P01" || error.code === "42501" || error.code === "PGRST205";
    return Response.json({ error: setupRequired ? "Ziyaret tablosu henüz kurulmadı. Verilen SQL kodunu Supabase SQL Editor’de çalıştırın." : "Ziyaret verileri yüklenemedi." }, { status: setupRequired ? 503 : 500 });
  }
  return Response.json({
    visits: (data ?? []).map((row) => ({
      sessionId: row.session_id,
      visitorId: row.visitor_id,
      entryPath: row.entry_path,
      lastPath: row.last_path,
      startedAt: row.started_at,
      lastSeenAt: row.last_seen_at,
      endedAt: row.ended_at,
      pageViews: row.page_views,
      durationSeconds: row.duration_seconds,
      language: row.language,
      deviceType: row.device_type,
      browser: row.browser,
      referrerHost: row.referrer_host,
      countryCode: row.country_code,
      city: row.city,
      isActive: !row.ended_at && Date.now() - new Date(row.last_seen_at).getTime() < 5 * 60 * 1000,
    })),
  }, { headers: { "Cache-Control": "no-store" } });
}
