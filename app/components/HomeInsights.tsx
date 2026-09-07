"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSiteLanguage } from "./LanguageProvider";

type LivePost = {
  slug: string;
  title: string;
  category: string;
  language: string;
  publishedAt: string | null;
};

const labels = {
  tr: { kicker: "Son hukuk notları", title: "Güncel hukuki konular", accent: "açık ve anlaşılır anlatımla.", all: "Tüm yazılar", fresh: "Yeni", min: "dk" },
  ru: { kicker: "Последние публикации", title: "Актуальные правовые вопросы", accent: "ясным и понятным языком.", all: "Все статьи", fresh: "Новое", min: "мин" },
  en: { kicker: "Latest legal notes", title: "Current legal matters", accent: "explained clearly.", all: "All articles", fresh: "New", min: "min" },
  ro: { kicker: "Ultimele articole juridice", title: "Subiecte juridice actuale", accent: "explicate clar și accesibil.", all: "Toate articolele", fresh: "Nou", min: "min" },
} as const;

const locales = { tr: "tr-TR", ru: "ru-RU", en: "en-GB", ro: "ro-RO" } as const;

export default function HomeInsights() {
  const { language } = useSiteLanguage();
  const [posts, setPosts] = useState<LivePost[] | null>(null);

  useEffect(() => {
    fetch("/api/posts")
      .then(async (response) => await response.json() as { posts?: LivePost[] })
      .then((data) => setPosts(data.posts ?? []))
      .catch(() => setPosts([]));
  }, []);

  const selectedPosts = posts?.filter((post) => post.language === language).slice(0, 3) ?? [];
  if (!selectedPosts.length) return null;
  const t = labels[language];

  return (
    <section className="pro-split pro-insights-split" data-no-translate>
      <div className="pro-split-image"><Image src="/justice.jpg" alt="" fill sizes="(max-width: 900px) 100vw, 43vw" /></div>
      <div className="pro-split-copy">
        <p className="pro-kicker">{t.kicker}</p>
        <h2>{t.title}<br /><em>{t.accent}</em></h2>
        <div className="pro-news-list">
        {selectedPosts.map((article, index) => {
          const date = article.publishedAt
            ? new Intl.DateTimeFormat(locales[language], { day: "numeric", month: "long", year: "numeric" }).format(new Date(article.publishedAt))
            : t.fresh;
          return <Link href={`/yazilar/${article.slug}`} key={article.slug}><span>0{index + 1}</span><div><p>{article.category}</p><h3>{article.title}</h3><small>{date} · 5 {t.min}</small></div><b>→</b></Link>;
        })}
        </div>
        <Link className="pro-inline-link" href="/yazilar">{t.all} <span>→</span></Link>
      </div>
    </section>
  );
}
