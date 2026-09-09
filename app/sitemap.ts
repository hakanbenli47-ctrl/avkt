import type { MetadataRoute } from "next";
import { createSupabaseServerClient } from "../lib/supabase";

const siteUrl = "https://www.advocateinturkiye.com";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const generatedAt = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: generatedAt, changeFrequency: "weekly", priority: 1, images: [siteUrl + "/og.png", siteUrl + "/ruslana-pasecinic-portre.jpg"] },
    { url: siteUrl + "/hakkimizda", lastModified: generatedAt, changeFrequency: "monthly", priority: 0.9, images: [siteUrl + "/ruslana-pasecinic-portre.jpg"] },
    { url: siteUrl + "/faaliyetlerimiz", lastModified: generatedAt, changeFrequency: "monthly", priority: 0.9, images: [siteUrl + "/law-library.jpg"] },
    { url: siteUrl + "/yazilar", lastModified: generatedAt, changeFrequency: "weekly", priority: 0.8 },
    { url: siteUrl + "/sik-sorulan-sorular", lastModified: generatedAt, changeFrequency: "monthly", priority: 0.7 },
    { url: siteUrl + "/iletisim", lastModified: generatedAt, changeFrequency: "monthly", priority: 0.8, images: [siteUrl + "/antalya-architecture.jpg"] },
    { url: siteUrl + "/cerez-ve-gizlilik", lastModified: generatedAt, changeFrequency: "yearly", priority: 0.3 },
  ];

  try {
    const { data, error } = await createSupabaseServerClient()
      .from("posts")
      .select("slug, updated_at, published_at")
      .eq("status", "published")
      .order("published_at", { ascending: false });

    if (error) throw error;

    const articleRoutes: MetadataRoute.Sitemap = (data ?? []).map((post) => ({
      url: siteUrl + "/yazilar/" + encodeURIComponent(post.slug),
      lastModified: post.updated_at ?? post.published_at ?? generatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

    return [...staticRoutes, ...articleRoutes];
  } catch {
    return staticRoutes;
  }
}