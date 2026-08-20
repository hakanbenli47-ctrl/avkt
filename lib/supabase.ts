import { createClient } from "@supabase/supabase-js";
import { env } from "cloudflare:workers";

export function getSupabaseConfig() {
  const runtime = env as unknown as Record<string, unknown>;
  const url = String(runtime.SUPABASE_URL ?? "").trim();
  const publishableKey = String(runtime.SUPABASE_PUBLISHABLE_KEY ?? runtime.SUPABASE_ANON_KEY ?? "").trim();
  if (!url || !publishableKey) throw new Error("Supabase bağlantı bilgileri henüz tanımlanmadı.");
  return { url, publishableKey };
}

export function createSupabaseServerClient(accessToken?: string) {
  const { url, publishableKey } = getSupabaseConfig();
  return createClient(url, publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : undefined,
  });
}

export function toPublicPost(row: Record<string, unknown>) {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content: row.content,
    category: row.category,
    language: row.language,
    status: row.status,
    authorEmail: row.author_email,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    publishedAt: row.published_at,
  };
}
