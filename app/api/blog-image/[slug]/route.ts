import { BLOG_IMAGE_BUCKET, blogImageObjectName, createSupabaseAdminClient } from "../../../../lib/supabase";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params;
  if (!slugPattern.test(slug) || slug.length > 90) return new Response(null, { status: 404 });

  try {
    const storage = createSupabaseAdminClient().storage.from(BLOG_IMAGE_BUCKET);
    const { data, error } = await storage.download(blogImageObjectName(slug));
    if (error || !data) return new Response(null, { status: 404 });

    return new Response(await data.arrayBuffer(), {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response(null, { status: 404 });
  }
}
