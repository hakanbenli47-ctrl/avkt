import { createSupabaseAdminClient } from "../../../lib/supabase";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type VisitPayload = {
  consent?: string;
  action?: "visit" | "heartbeat" | "end";
  sessionId?: string;
  visitorId?: string;
  entryPath?: string;
  path?: string;
  pageViews?: number;
  durationSeconds?: number;
  language?: string;
  referrerHost?: string;
};

const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const allowedLanguages = new Set(["tr", "ru", "en", "ro"]);

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") return "";
  return Array.from(value, (character) => {
    const code = character.charCodeAt(0);
    return code >= 32 && code !== 127 ? character : "";
  }).join("").trim().slice(0, maxLength);
}

function cleanPath(value: unknown) {
  const path = cleanText(value, 300);
  return path.startsWith("/") && !path.startsWith("//") ? path : "/";
}

function deviceFromUserAgent(userAgent: string) {
  if (/ipad|tablet/i.test(userAgent)) return "tablet";
  if (/mobile|android|iphone|ipod/i.test(userAgent)) return "mobile";
  return "desktop";
}

function browserFromUserAgent(userAgent: string) {
  if (/edg\//i.test(userAgent)) return "Edge";
  if (/opr\//i.test(userAgent)) return "Opera";
  if (/firefox\//i.test(userAgent)) return "Firefox";
  if (/chrome\//i.test(userAgent)) return "Chrome";
  if (/safari\//i.test(userAgent)) return "Safari";
  return "Diğer";
}

function headerCity(request: Request) {
  const value = cleanText(request.headers.get("x-vercel-ip-city"), 80);
  if (!value) return null;
  try { return decodeURIComponent(value); } catch { return value; }
}

export async function POST(request: Request) {
  let payload: VisitPayload;
  try {
    payload = await request.json() as VisitPayload;
  } catch {
    return Response.json({ error: "Geçersiz istek" }, { status: 400 });
  }

  if (payload.consent !== "analytics") return Response.json({ ignored: true });
  if (!payload.sessionId || !payload.visitorId || !uuidPattern.test(payload.sessionId) || !uuidPattern.test(payload.visitorId)) {
    return Response.json({ error: "Geçersiz oturum" }, { status: 400 });
  }

  const now = new Date().toISOString();
  const action = payload.action === "end" || payload.action === "heartbeat" ? payload.action : "visit";
  const pageViews = Math.min(Math.max(Math.trunc(Number(payload.pageViews) || 1), 1), 10000);
  const durationSeconds = Math.min(Math.max(Math.trunc(Number(payload.durationSeconds) || 0), 0), 86400);
  const language = allowedLanguages.has(payload.language ?? "") ? payload.language : "tr";
  const userAgent = request.headers.get("user-agent") ?? "";

  try {
    const db = createSupabaseAdminClient();
    const { error: insertError } = await db.from("site_visits").upsert({
      session_id: payload.sessionId,
      visitor_id: payload.visitorId,
      entry_path: cleanPath(payload.entryPath),
      last_path: cleanPath(payload.path),
      started_at: now,
      last_seen_at: now,
      page_views: pageViews,
      duration_seconds: durationSeconds,
      language,
      device_type: deviceFromUserAgent(userAgent),
      browser: browserFromUserAgent(userAgent),
      referrer_host: cleanText(payload.referrerHost, 160) || null,
      country_code: cleanText(request.headers.get("x-vercel-ip-country"), 2).toUpperCase() || null,
      city: headerCity(request),
      consent_version: "2026-09",
    }, { onConflict: "session_id", ignoreDuplicates: true });
    if (insertError) throw insertError;

    const update = {
      last_path: cleanPath(payload.path),
      last_seen_at: now,
      ended_at: action === "end" ? now : null,
      page_views: pageViews,
      duration_seconds: durationSeconds,
      language,
    };
    const { error: updateError } = await db.from("site_visits").update(update).eq("session_id", payload.sessionId).eq("visitor_id", payload.visitorId);
    if (updateError) throw updateError;
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    const missingSecret = error instanceof Error && error.message.includes("SUPABASE_SECRET_KEY");
    if (!missingSecret) console.error("[visits] Ziyaret kaydı oluşturulamadı", error);
    return Response.json({
      error: missingSecret ? "Ziyaret analitiği için sunucu anahtarı eksik" : "Ziyaret analitiği veritabanına bağlanamadı",
      code: missingSecret ? "analytics_secret_missing" : "analytics_database_unavailable",
    }, { status: 503 });
  }
}
