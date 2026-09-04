"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type LivePost = {
  slug: string;
  title: string;
  category: string;
  publishedAt: string | null;
};

export default function HomeInsights() {
  const [posts, setPosts] = useState<LivePost[] | null>(null);

  useEffect(() => {
    fetch("/api/posts")
      .then(async (response) => await response.json() as { posts?: LivePost[] })
      .then((data) => setPosts((data.posts ?? []).slice(0, 3)))
      .catch(() => setPosts([]));
  }, []);

  if (!posts?.length) return null;

  return (
    <section className="home-insights">
      <header><div><p>Son hukuk notları</p><h2>Güncel meseleler,<br /><em>açık anlatımla.</em></h2></div><Link href="/yazilar">Tüm yazılar ↗</Link></header>
      <div>
        {posts.map((article, index) => {
          const date = article.publishedAt
            ? new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(article.publishedAt))
            : "Yeni";
          return <Link href={`/yazilar/${article.slug}`} key={article.slug}><span>0{index + 1}</span><p>{article.category}</p><h3>{article.title}</h3><small>{date} · 5 dk</small></Link>;
        })}
      </div>
    </section>
  );
}
