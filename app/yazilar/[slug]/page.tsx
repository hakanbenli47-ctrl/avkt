import { notFound } from "next/navigation";
import { articles } from "../../../lib/content";
import SiteFooter from "../../components/SiteFooter";
import SiteHeader from "../../components/SiteHeader";

type PageProps = { params: Promise<{ slug: string }> };

async function getArticle(slug: string) {
  const local = articles.find((article) => article.slug === slug);
  if (local) return local;
  try {
    const { getDb } = await import("../../../db");
    const { posts } = await import("../../../db/schema");
    const { eq } = await import("drizzle-orm");
    const [post] = await getDb().select().from(posts).where(eq(posts.slug, slug)).limit(1);
    if (!post || post.status !== "published") return null;
    return {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      category: post.category,
      date: new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(post.publishedAt || post.createdAt)),
      readTime: `${Math.max(2, Math.round(post.content.split(/\s+/).length / 180))} dk`,
      content: post.content.split(/\n\s*\n/).filter(Boolean),
    };
  } catch {
    return null;
  }
}

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt, images: [] },
    twitter: { title: article.title, description: article.excerpt, images: [] },
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
        <div className="article-rule"><span>RP</span></div>
        <div className="article-content">
          {article.content.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
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
