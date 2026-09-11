"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./SiteContentDashboard.module.css";

type Language = "tr" | "ru" | "en" | "ro";
type Values = Record<Language, string>;
type Field = { contentKey: string; section: string; sectionDescription: string; label: string; source: string; defaults: Values; values: Values; updatedAt: string | null };
type Section = { name: string; description: string };
const languages: Array<{ code: Language; name: string; short: string }> = [
  { code: "tr", name: "Türkçe", short: "TR" }, { code: "ru", name: "Русский", short: "RU" }, { code: "en", name: "English", short: "EN" }, { code: "ro", name: "Română", short: "RO" },
];

export default function SiteContentDashboard({ email, accessToken, onSignOut }: { email: string; accessToken: string; onSignOut: () => void }) {
  const [fields, setFields] = useState<Field[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [values, setValues] = useState<Record<string, Values>>({});
  const [selectedSection, setSelectedSection] = useState("Tümü");
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("tr");
  const [query, setQuery] = useState("");
  const [dirtyKeys, setDirtyKeys] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [setupRequired, setSetupRequired] = useState(false);
  const [message, setMessage] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/site-content", { headers: { Authorization: `Bearer ${accessToken}` }, cache: "no-store" });
      const data = await response.json() as { fields?: Field[]; sections?: Section[]; setupRequired?: boolean; error?: string };
      if (!response.ok) throw new Error(data.error || "Site içerikleri yüklenemedi.");
      const loadedFields = data.fields ?? [];
      setFields(loadedFields); setSections(data.sections ?? []); setValues(Object.fromEntries(loadedFields.map((field) => [field.contentKey, field.values])));
      setSetupRequired(Boolean(data.setupRequired)); setMessage(data.error ?? ""); setDirtyKeys(new Set());
    } catch (error) { setMessage(error instanceof Error ? error.message : "Site içerikleri yüklenemedi."); }
    finally { setLoading(false); }
  }, [accessToken]);

  useEffect(() => { const timer = window.setTimeout(() => { void load(); }, 0); return () => window.clearTimeout(timer); }, [load]);

  const activeLanguage = languages.find((language) => language.code === selectedLanguage) ?? languages[0];

  const visibleFields = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("tr-TR");
    return fields.filter((field) => {
      const sectionMatches = selectedSection === "Tümü" || field.section === selectedSection;
      const current = values[field.contentKey] ?? field.defaults;
      const textMatches = !normalized || [field.label, field.source, current[selectedLanguage]].join(" ").toLocaleLowerCase("tr-TR").includes(normalized);
      return sectionMatches && textMatches;
    });
  }, [fields, query, selectedLanguage, selectedSection, values]);

  const groupedFields = useMemo(() => sections.map((section) => ({ ...section, fields: visibleFields.filter((field) => field.section === section.name) })).filter((section) => section.fields.length), [sections, visibleFields]);

  function updateValue(contentKey: string, language: Language, value: string) {
    setValues((current) => ({ ...current, [contentKey]: { ...current[contentKey], [language]: value } }));
    setDirtyKeys((current) => new Set(current).add(contentKey)); setMessage("");
  }

  function restore(field: Field) {
    setValues((current) => ({ ...current, [field.contentKey]: { ...field.defaults } }));
    setDirtyKeys((current) => new Set(current).add(field.contentKey));
    setMessage(`“${field.label}” kodda bulunan ilk metinlere döndürüldü. Kalıcı olması için değişiklikleri kaydedin.`);
  }

  async function save() {
    if (!dirtyKeys.size || setupRequired) return;
    setSaving(true); setMessage("");
    try {
      const updates = Array.from(dirtyKeys).map((contentKey) => ({ contentKey, values: values[contentKey] }));
      const response = await fetch("/api/admin/site-content", { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` }, body: JSON.stringify({ updates }) });
      const data = await response.json() as { error?: string; updated?: number };
      if (!response.ok) throw new Error(data.error || "İçerikler kaydedilemedi.");
      setDirtyKeys(new Set()); setMessage(`${data.updated ?? updates.length} içerik alanı kaydedildi. Değişiklikler canlı sitede sayfa yenilendiğinde görünür.`);
    } catch (error) { setMessage(error instanceof Error ? error.message : "İçerikler kaydedilemedi."); }
    finally { setSaving(false); }
  }

  return (
    <div className="admin-shell" data-no-translate>
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand"><div className="admin-logo">RP</div><div><strong>Yönetim Paneli</strong><small>Advocat in Türkiye</small></div></div>
        <nav aria-label="Yönetim menüsü"><a href="/admin"><span>01</span> İçerik stüdyosu</a><a className="active" href="/admin/site-icerikleri"><span>02</span> Site içerikleri</a><a href="/admin/ziyaretler"><span>03</span> Ziyaretler</a><a href="/" target="_blank" rel="noreferrer"><span>↗</span> Siteyi gör</a></nav>
        <div className="admin-account"><small>Giriş yapan hesap</small><strong title={email}>{email}</strong></div>
      </aside>
      <main className={`admin-main ${styles.main}`}>
        <header className="admin-heading"><div><span>SİTE YÖNETİMİ</span><h1>Site içeriklerini düzenle</h1><p>Üstten dili seçin; sayfa ve bölüm başlıklarına göre metinleri düzenleyip kaydedin.</p></div><button className="admin-signout" type="button" onClick={onSignOut}>Güvenli çıkış</button></header>
        {setupRequired && <section className={styles.setupNotice} role="alert"><strong>Bir kerelik veritabanı kurulumu gerekiyor.</strong><p>GitHub’daki <code>supabase/site-content.sql</code> dosyasını Supabase SQL Editor’de çalıştırın. Ardından bu sayfayı yenileyin.</p></section>}
        {message && <div className={styles.message} role="status">{message}</div>}
        <nav className={styles.languageTabs} aria-label="Düzenlenecek dil">
          <div><span>DÜZENLENECEK DİL</span><strong>{activeLanguage.name}</strong></div>
          <div className={styles.languageButtons}>
            {languages.map((language) => <button type="button" key={language.code} className={selectedLanguage === language.code ? styles.activeLanguage : ""} aria-pressed={selectedLanguage === language.code} onClick={() => setSelectedLanguage(language.code)}><b>{language.short}</b><span>{language.name}</span></button>)}
          </div>
        </nav>
        <section className={styles.toolbar} aria-label="İçerik filtreleri"><label><span>Metin ara</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Başlık, cümle veya çeviri ara…" /></label><label><span>Sayfa / bölüm</span><select value={selectedSection} onChange={(event) => setSelectedSection(event.target.value)}><option>Tümü</option>{sections.map((section) => <option key={section.name}>{section.name}</option>)}</select></label><div><span>Gösterilen alan</span><strong>{visibleFields.length}</strong></div></section>
        {loading && <div className={styles.empty}><strong>İçerikler hazırlanıyor…</strong><span>Tüm dil alanları yükleniyor.</span></div>}
        {!loading && !visibleFields.length && <div className={styles.empty}><strong>Eşleşen içerik bulunamadı.</strong><span>Arama kelimesini veya bölüm filtresini değiştirin.</span></div>}
        <div className={styles.sectionList}>{groupedFields.map((section, sectionIndex) => <details className={styles.section} open={selectedSection !== "Tümü" || sectionIndex === 0} key={section.name}><summary><div><span>{String(sectionIndex + 1).padStart(2, "0")}</span><div><h2>{section.name}</h2><p>{section.description}</p></div></div><b>{section.fields.length} alan</b></summary><div className={styles.fields}>{section.fields.map((field) => { const current = values[field.contentKey] ?? field.defaults; const changed = dirtyKeys.has(field.contentKey); return <article className={`${styles.field} ${changed ? styles.changed : ""}`} key={field.contentKey}><header><div><span>{field.section}</span><h3>{field.label}</h3><p>Bu metnin {activeLanguage.name} dilinde sitede gösterilecek karşılığı.</p></div><div>{changed && <b>Kaydedilmedi</b>}<button type="button" onClick={() => restore(field)}>İlk metne dön</button></div></header><div className={styles.languageGrid}><label><span><b>{activeLanguage.short}</b>{activeLanguage.name}</span><textarea dir="auto" rows={current[selectedLanguage].length > 240 ? 6 : current[selectedLanguage].length > 100 ? 4 : 2} value={current[selectedLanguage]} onChange={(event) => updateValue(field.contentKey, selectedLanguage, event.target.value)} disabled={saving || setupRequired} /></label></div></article>; })}</div></details>)}</div>
        <div className={styles.saveBar}><div><strong>{dirtyKeys.size ? `${dirtyKeys.size} kaydedilmemiş alan` : "Tüm değişiklikler kayıtlı"}</strong><span>Seçili dilde yaptığınız değişiklikler kaydedilir; diğer diller korunur.</span></div><button type="button" onClick={() => void save()} disabled={!dirtyKeys.size || saving || setupRequired}>{saving ? "Kaydediliyor…" : "Değişiklikleri kaydet"}</button></div>
      </main>
    </div>
  );
}