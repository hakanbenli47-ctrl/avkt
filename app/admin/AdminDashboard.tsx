"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  language: string;
  status: string;
  updatedAt: string;
};

const emptyForm = { title: "", slug: "", excerpt: "", content: "", category: "Gayrimenkul Hukuku", language: "tr", status: "draft" };

export default function AdminDashboard({ email, accessToken, onSignOut }: { email: string; accessToken: string; onSignOut: () => void }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("Yazılar yükleniyor…");
  const [saving, setSaving] = useState(false);

  const load = useCallback(() => {
    fetch("/api/admin/posts", { headers: { Authorization: `Bearer ${accessToken}` } })
      .then(async (response) => {
        const data = await response.json() as { posts?: Post[]; error?: string };
        if (!response.ok) throw new Error(data.error || "Yazılar yüklenemedi");
        return data;
      })
      .then((data) => { setPosts(data.posts ?? []); setMessage(""); })
      .catch((error) => setMessage(error.message));
  }, [accessToken]);

  useEffect(load, [load]);

  async function save(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    const response = await fetch("/api/admin/posts", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ ...form, id: editingId }),
    });
    const data = await response.json() as { error?: string };
    if (!response.ok) setMessage(data.error || "Yazı kaydedilemedi");
    else {
      setMessage(editingId ? "Değişiklikler kaydedildi." : "Yeni yazı kaydedildi.");
      setForm(emptyForm); setEditingId(null); load();
    }
    setSaving(false);
  }

  function edit(post: Post) {
    setEditingId(post.id);
    setForm({ title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content, category: post.category, language: post.language, status: post.status });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function remove(id: number) {
    if (!window.confirm("Bu yazıyı kalıcı olarak silmek istediğinize emin misiniz?")) return;
    await fetch(`/api/admin/posts?id=${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${accessToken}` } });
    load();
  }

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-logo">RP</div>
        <nav><a className="active" href="#editor">Yazılar</a><a href="/" target="_blank">Siteyi gör ↗</a></nav>
        <small>{email}</small>
      </aside>
      <main className="admin-main" id="editor">
        <header><div><span>İÇERİK STÜDYOSU</span><h1>{editingId ? "Yazıyı düzenle" : "Yeni bir hukuk notu yaz"}</h1></div><button className="admin-signout" type="button" onClick={onSignOut}>Çıkış</button></header>
        <form className="editor-form" onSubmit={save}>
          <label>Başlık<input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Okuyucunun sorusunu net biçimde yanıtlayan başlık" /></label>
          <div className="form-grid">
            <label>Kategori<input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></label>
            <label>Dil<select value={form.language} onChange={(e) => setForm({ ...form, language: e.target.value })}><option value="tr">Türkçe</option><option value="ru">Русский</option><option value="en">English</option><option value="ro">Română</option></select></label>
            <label>Durum<select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option value="draft">Taslak</option><option value="published">Yayında</option></select></label>
          </div>
          <label>Kısa özet<textarea rows={3} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Liste ve sosyal paylaşımlarda görünecek 1–2 cümle" /></label>
          <label>Yazı<textarea required className="content-editor" rows={16} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Paragrafları boş satırla ayırın…" /></label>
          <div className="form-actions"><span>{message}</span><button type="submit" disabled={saving}>{saving ? "Kaydediliyor…" : form.status === "published" ? "Kaydet ve yayınla" : "Taslağı kaydet"}</button></div>
        </form>
        <section className="admin-posts">
          <div className="admin-section-title"><h2>Yazılarım</h2><span>{posts.length} içerik</span></div>
          {posts.map((post) => (
            <div className="admin-post-row" key={post.id}>
              <span className={`status-dot ${post.status}`} />
              <div><b>{post.title}</b><small>{post.category} · {post.status === "published" ? "Yayında" : "Taslak"}</small></div>
              <button onClick={() => edit(post)}>Düzenle</button><button className="delete" onClick={() => remove(post.id)}>Sil</button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
