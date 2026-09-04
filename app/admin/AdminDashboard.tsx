"use client";

import { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from "react";

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
  hasImage?: boolean;
};

type FormState = Omit<Post, "id" | "updatedAt" | "hasImage">;

const emptyForm: FormState = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  category: "Gayrimenkul Hukuku",
  language: "tr",
  status: "draft",
};

const languageNames: Record<string, string> = {
  tr: "Türkçe",
  ru: "Русский",
  en: "English",
  ro: "Română",
};

const blogImageWidth = 1600;
const blogImageHeight = 900;

async function normalizeBlogImage(file: File) {
  const sourceUrl = URL.createObjectURL(file);
  try {
    const image = new window.Image();
    image.decoding = "async";
    image.src = sourceUrl;
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Görsel tarayıcı tarafından okunamadı."));
    });

    if (!image.naturalWidth || !image.naturalHeight) throw new Error("Görsel boyutları okunamadı.");

    const canvas = document.createElement("canvas");
    canvas.width = blogImageWidth;
    canvas.height = blogImageHeight;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Görsel dönüştürülemedi.");

    const scale = Math.max(blogImageWidth / image.naturalWidth, blogImageHeight / image.naturalHeight);
    const drawWidth = image.naturalWidth * scale;
    const drawHeight = image.naturalHeight * scale;
    const offsetX = (blogImageWidth - drawWidth) / 2;
    const offsetY = (blogImageHeight - drawHeight) / 2;

    context.fillStyle = "#f4efe5";
    context.fillRect(0, 0, blogImageWidth, blogImageHeight);
    context.drawImage(image, offsetX, offsetY, drawWidth, drawHeight);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((result) => result ? resolve(result) : reject(new Error("JPEG oluşturulamadı.")), "image/jpeg", 0.88);
    });
    return new File([blob], "blog-cover.jpg", { type: "image/jpeg", lastModified: Date.now() });
  } finally {
    URL.revokeObjectURL(sourceUrl);
  }
}

export default function AdminDashboard({ email, accessToken, onSignOut }: { email: string; accessToken: string; onSignOut: () => void }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [imageProcessing, setImageProcessing] = useState(false);
  const [existingImage, setExistingImage] = useState(false);
  const [removeImage, setRemoveImage] = useState(false);

  const publishedCount = useMemo(() => posts.filter((post) => post.status === "published").length, [posts]);
  const contentLength = form.content.trim().length;
  const displayedImage = imagePreview || (existingImage && form.slug ? `/api/blog-image/${encodeURIComponent(form.slug)}` : "");

  useEffect(() => () => {
    if (imagePreview) URL.revokeObjectURL(imagePreview);
  }, [imagePreview]);

  const load = useCallback(async (quiet = false) => {
    if (!quiet) setLoadingPosts(true);
    try {
      const response = await fetch("/api/admin/posts", { headers: { Authorization: `Bearer ${accessToken}` } });
      const data = await response.json() as { posts?: Post[]; error?: string };
      if (!response.ok) throw new Error(data.error || "Yazılar yüklenemedi.");
      setPosts(data.posts ?? []);
      if (!quiet) setMessage("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Yazılar yüklenemedi.");
    } finally {
      if (!quiet) setLoadingPosts(false);
    }
  }, [accessToken]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  function resetEditor() {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview("");
    setImageProcessing(false);
    setExistingImage(false);
    setRemoveImage(false);
    setMessage("");
  }

  async function selectImage(event: ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const selected = input.files?.[0];
    input.value = "";
    if (!selected) return;

    setImageProcessing(true);
    setMessage("");
    try {
      const normalized = await normalizeBlogImage(selected);
      setImageFile(normalized);
      setImagePreview(URL.createObjectURL(normalized));
      setRemoveImage(false);
      setMessage("Görsel 1600 × 900 px ölçüsünde JPEG olarak hazırlandı.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Görsel hazırlanamadı.");
    } finally {
      setImageProcessing(false);
    }
  }

  function clearImage() {
    if (imageFile) {
      setImageFile(null);
      setImagePreview("");
      setMessage(existingImage ? "Yeni görsel seçimi kaldırıldı; mevcut görsel korunacak." : "Görsel seçimi kaldırıldı.");
      return;
    }
    if (existingImage) {
      setExistingImage(false);
      setRemoveImage(true);
      setMessage("Mevcut görsel, yazıyı kaydettiğinizde kaldırılacak.");
    }
  }

  async function save(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/posts", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` },
        body: JSON.stringify({ ...form, id: editingId }),
      });
      const data = await response.json() as { error?: string; post?: { slug?: string } };
      if (!response.ok) throw new Error(data.error || "Yazı kaydedilemedi.");

      const savedSlug = data.post?.slug || form.slug;
      let imageWarning = "";
      if (savedSlug) {
        try {
          if (removeImage) {
            const deleteResponse = await fetch(`/api/admin/post-image?slug=${encodeURIComponent(savedSlug)}`, {
              method: "DELETE",
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            if (!deleteResponse.ok) throw new Error("Mevcut görsel kaldırılamadı.");
          }
          if (imageFile) {
            const imageData = new FormData();
            imageData.append("slug", savedSlug);
            imageData.append("file", imageFile, `${savedSlug}.jpg`);
            const imageResponse = await fetch("/api/admin/post-image", {
              method: "POST",
              headers: { Authorization: `Bearer ${accessToken}` },
              body: imageData,
            });
            const imageResult = await imageResponse.json() as { error?: string };
            if (!imageResponse.ok) throw new Error(imageResult.error || "Görsel yüklenemedi.");
          }
        } catch (error) {
          imageWarning = ` Yazı kaydedildi ancak ${error instanceof Error ? error.message.toLocaleLowerCase("tr-TR") : "görsel işlemi tamamlanamadı."}`;
        }
      }

      const successMessage = editingId ? "Değişiklikler kaydedildi." : form.status === "published" ? "Yazı yayınlandı." : "Taslak kaydedildi.";
      resetEditor();
      await load(true);
      setMessage(`${successMessage}${imageWarning}`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Yazı kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  }

  function edit(post: Post) {
    setEditingId(post.id);
    setForm({ title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content, category: post.category, language: post.language, status: post.status });
    setImageFile(null);
    setImagePreview("");
    setExistingImage(Boolean(post.hasImage));
    setRemoveImage(false);
    setMessage(`“${post.title}” düzenleniyor.`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function remove(post: Post) {
    if (!window.confirm(`“${post.title}” başlıklı yazı kalıcı olarak silinsin mi?`)) return;
    setDeletingId(post.id);
    setMessage("");
    try {
      const response = await fetch(`/api/admin/posts?id=${post.id}`, { method: "DELETE", headers: { Authorization: `Bearer ${accessToken}` } });
      const data = await response.json() as { error?: string };
      if (!response.ok) throw new Error(data.error || "Yazı silinemedi.");
      if (post.hasImage) {
        await fetch(`/api/admin/post-image?slug=${encodeURIComponent(post.slug)}`, { method: "DELETE", headers: { Authorization: `Bearer ${accessToken}` } }).catch(() => undefined);
      }
      if (editingId === post.id) resetEditor();
      await load(true);
      setMessage("Yazı silindi.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Yazı silinemedi.");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="admin-shell" data-no-translate>
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand"><div className="admin-logo">RP</div><div><strong>İçerik Paneli</strong><small>Advocat in Türkiye</small></div></div>
        <nav aria-label="Yönetim menüsü">
          <a className="active" href="#post-editor"><span>01</span> Yeni yazı</a>
          <a href="#post-list"><span>02</span> Yazılarım</a>
          <a href="/admin/ziyaretler"><span>03</span> Ziyaretler</a>
          <a href="/" target="_blank" rel="noreferrer"><span>↗</span> Siteyi gör</a>
        </nav>
        <div className="admin-account"><small>Giriş yapan hesap</small><strong title={email}>{email}</strong></div>
      </aside>

      <main className="admin-main">
        <header className="admin-heading">
          <div><span>İÇERİK STÜDYOSU</span><h1>{editingId ? "Yazıyı düzenle" : "Yeni yazı oluştur"}</h1><p>Başlığı ve metni yazın; isterseniz kapak görseli ekleyin, taslak olarak saklayın veya hazır olduğunda yayınlayın.</p></div>
          <button className="admin-signout" type="button" onClick={onSignOut}>Güvenli çıkış</button>
        </header>

        <section className="admin-editor-card" id="post-editor" aria-labelledby="editor-title">
          <div className="admin-card-heading"><div><span>{editingId ? "DÜZENLEME MODU" : "YENİ İÇERİK"}</span><h2 id="editor-title">{editingId ? "Seçili yazı" : "Hukuk notunun ayrıntıları"}</h2></div>{editingId && <button type="button" onClick={resetEditor}>Düzenlemeyi iptal et</button>}</div>
          <form className="editor-form" onSubmit={save}>
            <fieldset>
              <legend><b>1</b><span>Temel bilgiler<small>Yazının sitede nasıl görüneceğini belirleyin.</small></span></legend>
              <label className="admin-title-field">Başlık<input required value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} placeholder="Örn. Türkiye’de yabancıların konut satın alma süreci" /></label>
              <div className="form-grid">
                <label>Kategori<input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} placeholder="Örn. Gayrimenkul Hukuku" /></label>
                <label>Yazının dili<select value={form.language} onChange={(event) => setForm({ ...form, language: event.target.value })}><option value="tr">Türkçe</option><option value="ru">Русский</option><option value="en">English</option><option value="ro">Română</option></select></label>
                <label>Yayın durumu<select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}><option value="draft">Taslak — yalnızca siz görürsünüz</option><option value="published">Yayında — sitede görünür</option></select></label>
              </div>
              <label>Kısa özet <small>Boş bırakırsanız yazının ilk cümlelerinden otomatik oluşturulur.</small><textarea rows={3} value={form.excerpt} onChange={(event) => setForm({ ...form, excerpt: event.target.value })} placeholder="Okuyucunun yazıda ne bulacağını 1–2 cümlede anlatın." /></label>
            </fieldset>

            <fieldset>
              <legend><b>2</b><span>Kapak görseli<small>İsteğe bağlıdır. Boyut ve format otomatik düzenlenir.</small></span></legend>
              <div className="admin-image-editor">
                <div className={`admin-image-preview ${displayedImage ? "has-image" : ""}`} style={displayedImage ? { backgroundImage: `url(${JSON.stringify(displayedImage).slice(1, -1)})` } : undefined} aria-label={displayedImage ? "Seçili blog kapak görseli" : "Henüz kapak görseli seçilmedi"}>
                  {!displayedImage && <span>16:9<br /><small>1600 × 900</small></span>}
                </div>
                <div className="admin-image-controls">
                  <div><b>Blog kapak görseli</b><p>Seçtiğiniz görsel merkezden 16:9 oranında kırpılır, 1600 × 900 piksele getirilir ve kaynak formatı ne olursa olsun JPEG olarak yüklenir.</p></div>
                  <label className="admin-file-picker">{imageProcessing ? "Hazırlanıyor…" : displayedImage ? "Görseli değiştir" : "Görsel seç"}<input type="file" accept="image/*" disabled={imageProcessing || saving} onChange={(event) => void selectImage(event)} /></label>
                  {(imageFile || existingImage) && <button className="admin-image-remove" type="button" disabled={imageProcessing || saving} onClick={clearImage}>{imageFile && existingImage ? "Yeni seçimi kaldır" : imageFile ? "Seçimi kaldır" : "Mevcut görseli kaldır"}</button>}
                  {removeImage && <button className="admin-image-undo" type="button" onClick={() => { setRemoveImage(false); setExistingImage(true); setMessage("Görsel kaldırma işlemi geri alındı."); }}>Kaldırmayı geri al</button>}
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend><b>3</b><span>Yazı metni<small>Paragrafları boş bir satırla ayırabilirsiniz.</small></span></legend>
              <label className="admin-content-field">İçerik<textarea required className="content-editor" rows={16} value={form.content} onChange={(event) => setForm({ ...form, content: event.target.value })} placeholder="Yazınızı buraya yazın…" /><small className="editor-counter">{contentLength.toLocaleString("tr-TR")} karakter</small></label>
            </fieldset>

            <div className="form-actions">
              <p aria-live="polite">{message || (form.status === "published" ? "Kaydettiğinizde yazı sitede görünür." : "Henüz yalnızca taslak olarak saklanacak.")}</p>
              <div>{editingId && <button className="secondary-action" type="button" onClick={resetEditor}>Vazgeç</button>}<button className="primary-action" type="submit" disabled={saving || imageProcessing}>{saving ? "Kaydediliyor…" : imageProcessing ? "Görsel hazırlanıyor…" : form.status === "published" ? "Kaydet ve yayınla" : "Taslağı kaydet"}</button></div>
            </div>
          </form>
        </section>

        <section className="admin-posts" id="post-list" aria-labelledby="post-list-title">
          <div className="admin-section-title"><div><span>ARŞİV</span><h2 id="post-list-title">Yazılarım</h2></div><p>{loadingPosts ? "Yükleniyor…" : <><b>{publishedCount}</b> yayında · <b>{posts.length - publishedCount}</b> taslak</>}</p></div>
          {loadingPosts && <div className="admin-empty admin-loading-state" role="status"><b>Yazılar hazırlanıyor…</b><span>Yayın ve taslaklar güvenli biçimde getiriliyor.</span></div>}
          {!loadingPosts && posts.length === 0 && !message && <div className="admin-empty"><b>Henüz yazı yok.</b><span>İlk hukuk notunuzu yukarıdaki formdan oluşturabilirsiniz.</span></div>}
          <div className="admin-post-list">
            {posts.map((post) => (
              <article className="admin-post-row" key={post.id}>
                <span className={`status-dot ${post.status}`} aria-hidden="true" />
                <div className="admin-post-copy"><b>{post.title}</b><small>{post.category} · {languageNames[post.language] ?? post.language} · {post.status === "published" ? "Yayında" : "Taslak"}{post.hasImage ? " · Görselli" : ""}</small></div>
                <div className="admin-post-actions"><button type="button" onClick={() => edit(post)}>Düzenle</button><button className="delete" type="button" disabled={deletingId === post.id} onClick={() => void remove(post)}>{deletingId === post.id ? "Siliniyor…" : "Sil"}</button></div>
              </article>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
