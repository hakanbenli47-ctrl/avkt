import { getSupabaseConfig } from "../../../lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json(getSupabaseConfig());
  } catch (error) {
    return Response.json({ error: error instanceof Error ? error.message : "Supabase bağlantısı kurulamadı." }, { status: 503 });
  }
}
