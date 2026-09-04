import { createClient } from "@supabase/supabase-js";

export function getSupabaseConfig() {
  const url = String(process.env.SUPABASE_URL ?? "").trim();
  const publishableKey = String(process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY ?? "").trim();
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

export function createSupabaseAdminClient() {
  const { url } = getSupabaseConfig();
  const secretKey = String(process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY ?? "").trim();
  if (!secretKey) throw new Error("SUPABASE_SECRET_KEY henüz tanımlanmadı.");
  return createClient(url, secretKey, {
    auth: { persistSession: false, autoRefreshToken: false },
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
