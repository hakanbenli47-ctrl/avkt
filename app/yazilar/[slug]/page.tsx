import { notFound } from "next/navigation";
import BlogPostImage from "../../components/BlogPostImage";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

async function getArticle(slug: string) {
  try {
    const { createSupabaseServerClient, hasBlogImage } = await import("../../../lib/supabase");
    const { data: post } = await createSupabaseServerClient().from("posts").select("*").eq("slug", slug).eq("status", "published").maybeSingle();
    if (!post) return null;
    return {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      date: new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(post.published_at || post.created_at)),
      readTime: `${Math.max(2, Math.round(post.content.split(/\s+/).length / 180))} dk`,
      content: post.content.split(/\n\s*\n/).filter(Boolean),
      hasImage: await hasBlogImage(slug),
    };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  const images = article.hasImage ? [{ url: `/api/blog-image/${encodeURIComponent(article.slug)}`, width: 1600, height: 900, alt: `${article.title} kapak görseli` }] : [];
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, images },
    twitter: { title: article.title, description: article.excerpt, images },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  return (
    <main className="article-page">
      <SiteHeader overlay />
      <article>
        <div className="article-meta">{article.category} <i /> {article.date} <i /> {article.readTime}</div>
        <h1>{article.title}</h1>
        <p className="article-deck">{article.excerpt}</p>
        {article.hasImage && <BlogPostImage slug={article.slug} title={article.title} variant="hero" />}
        <div className="article-rule"><span>RP</span></div>
        <div className="article-content">
          {article.content.map((paragraph: string, index: number) => <p key={index}>{paragraph}</p>)}
        </div>
        <aside className="article-cta">
          <span>Bu konu, diğer hukuk alanlarıyla birlikte değerlendirilmesi gereken sonuçlar doğurabilir.</span>
          <a href="/calisma-alanlari">Çalışma alanları ↗</a>
        </aside>
      </article>
      <SiteFooter />
    </main>
  );
}
