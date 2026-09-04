"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import BlogPostImage from "../components/BlogPostImage";

type LivePost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string | null;
  hasImage?: boolean;
};

export default function BlogFeed() {
  const [livePosts, setLivePosts] = useState<LivePost[] | null>(null);
  const [filter, setFilter] = useState("Tümü");

  useEffect(() => {
    fetch("/api/posts")
      .then(async (response) => await response.json() as { posts?: LivePost[] })
      .then((data) => setLivePosts(data.posts ?? []))
      .catch(() => setLivePosts([]));
  }, []);

  const categories = useMemo(
    () => ["Tümü", ...Array.from(new Set((livePosts ?? []).map((post) => post.category)))],
    [livePosts],
  );

  if (livePosts === null) return null;

  if (livePosts.length === 0) {
    return <div className="blog-empty">Henüz yayınlanmış hukuk notu bulunmuyor.</div>;
  }

  const all = livePosts.map((post) => ({
    ...post,
    date: post.publishedAt
      ? new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "long", year: "numeric" }).format(new Date(post.publishedAt))
      : "Yeni",
    readTime: "5 dk",
    hasImage: Boolean(post.hasImage),
  }));
  const filtered = filter === "Tümü" ? all : all.filter((post) => post.category === filter);

  return (
    <>
      <div className="blog-filters" aria-label="Yazı kategorileri">
        {categories.map((category) => (
          <button key={category} className={filter === category ? "active" : ""} onClick={() => setFilter(category)}>
            {category}
          </button>
        ))}
      </div>
      <div className="blog-list">
        {filtered.map((post, index) => (
          <Link className={`blog-row ${post.hasImage ? "has-image" : ""}`} href={`/yazilar/${post.slug}`} key={post.slug}>
            <span className="blog-row-no">{String(index + 1).padStart(2, "0")}</span>
            {post.hasImage && <BlogPostImage slug={post.slug} title={post.title} />}
            <div className="blog-row-copy">
              <p>{post.category} · {post.date}</p>
              <h2>{post.title}</h2>
              <span>{post.excerpt}</span>
            </div>
            <b>{post.readTime} <i>↗</i></b>
          </Link>
        ))}
      </div>
    </>
  );
}
