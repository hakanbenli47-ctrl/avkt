"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./SiteContentDashboard.module.css";

type Language = "tr" | "ru" | "en" | "ro";
type Values = Record<Language, string>;
type Field = { contentKey: string; section: string; sectionDescription: string; block: string; blockDescription: string; order: number; label: string; source: string; defaults: Values; values: Values; updatedAt: string | null };
type Section = { name: string; description: string };
type ContentBlock = { name: string; description: string; fields: Field[] };

const languages: Array<{ code: Language; name: string; short: string }> = [
  { code: "tr", name: "Türkçe", short: "TR" },
  { code: "ru", name: "Русский", short: "RU" },
  { code: "en", name: "English", short: "EN" },
  { code: "ro", name: "Română", short: "RO" },
];

export default function SiteContentDashboard({ email, accessToken, onSignOut }: { email: string; accessToken: string; onSignOut: () => void }) {
  const [fields, setFields] = useState<Field[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [values, setValues] = useState<Record<string, Values>>({});
  const [selectedSection, setSelectedSection] = useState("Ana Sayfa");
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
      setFields(loadedFields);
      setSections(data.sections ?? []);
      setValues(Object.fromEntries(loadedFields.map((field) => [field.contentKey, field.values])));
      setSetupRequired(Boolean(data.setupRequired));
      setMessage(data.error ?? "");
      setDirtyKeys(new Set());
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Site içerikleri yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void load(); }, 0);
    return () => window.clearTimeout(timer);
  }, [load]);

  const activeLanguage = languages.find((language) => language.code === selectedLanguage) ?? languages[0];
  const activeSection = sections.find((section) => section.name === selectedSection);

  const visibleFields = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("tr-TR");
    return fields.filter((field) => {
      if (field.section !== selectedSection) return false;
      if (!normalized) return true;
      const current = values[field.contentKey] ?? field.defaults;
      return [field.block, field.label, field.source, current[selectedLanguage]].join(" ").toLocaleLowerCase("tr-TR").includes(normalized);
    });
  }, [fields, query, selectedLanguage, selectedSection, values]);

  const contentBlocks = useMemo(() => {
    const grouped = new Map<string, ContentBlock>();
    for (const field of visibleFields) {
      const existing = grouped.get(field.block);
      if (existing) existing.fields.push(field);
      else grouped.set(field.block, { name: field.block, description: field.blockDescription, fields: [field] });
    }
    return Array.from(grouped.values());
  }, [visibleFields]);

  function updateValue(contentKey: string, language: Language, value: string) {
    setValues((current) => ({ ...current, [contentKey]: { ...current[contentKey], [language]: value } }));
    setDirtyKeys((current) => new Set(current).add(contentKey));
    setMessage("");
  }

  function restore(field: Field) {
    setValues((current) => ({ ...current, [field.contentKey]: { ...field.defaults } }));
    setDirtyKeys((current) => new Set(current).add(field.contentKey));
    setMessage(`“${field.label}” ilk metne döndürüldü. Kalıcı olması için değişiklikleri kaydedin.`);
  }

  async function save() {
    if (!dirtyKeys.size || setupRequired) return;
    setSaving(true);
    setMessage("");
    try {
      const updates = Array.from(dirtyKeys).map((contentKey) => ({ contentKey, values: values[contentKey] }));
      const response = await fetch("/api/admin/site-content", { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` }, body: JSON.stringify({ updates }) });
      const data = await response.json() as { error?: string; updated?: number };
      if (!response.ok) throw new Error(data.error || "İçerikler kaydedilemedi.");
      setDirtyKeys(new Set());
      setMessage(`${data.updated ?? updates.length} içerik alanı kaydedildi. Değişiklikler canlı sitede sayfa yenilendiğinde görünür.`);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "İçerikler kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="admin-shell" data-no-translate>
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand"><div className="admin-logo">RP</div><div><strong>Yönetim Paneli</strong><small>Advocat in Türkiye</small></div></div>
        <nav aria-label="Yönetim menüsü"><a href="/admin"><span>01</span> İçerik stüdyosu</a><a className="active" href="/admin/site-icerikleri"><span>02</span> Site içerikleri</a><a href="/admin/ziyaretler"><span>03</span> Ziyaretler</a><a href="/" target="_blank" rel="noreferrer"><span>↗</span> Siteyi gör</a></nav>
        <div className="admin-account"><small>Giriş yapan hesap</small><strong title={email}>{email}</strong></div>
      </aside>

      <main className={`admin-main ${styles.main}`}>
        <header className="admin-heading"><div><span>SİTE YÖNETİMİ</span><h1>Sayfa düzenine göre içerikler</h1><p>Önce sayfayı, sonra dili seçin. Metinler sitede göründükleri bölüm ve ekran sırasına göre listelenir.</p></div><button className="admin-signout" type="button" onClick={onSignOut}>Güvenli çıkış</button></header>
        {setupRequired ? <section className={styles.setupNotice} role="alert"><strong>Bir kerelik veritabanı kurulumu gerekiyor.</strong><p>GitHub’daki <code>supabase/site-content.sql</code> dosyasını Supabase SQL Editor’de çalıştırın. Ardından bu sayfayı yenileyin.</p></section> : null}
        {message ? <div className={styles.message} role="status">{message}</div> : null}

        <nav className={styles.languageTabs} aria-label="Düzenlenecek dil">
          <div><span>DÜZENLENECEK DİL</span><strong>{activeLanguage.name}</strong></div>
          <div className={styles.languageButtons}>
            {languages.map((language) => <button type="button" key={language.code} className={selectedLanguage === language.code ? styles.activeLanguage : ""} aria-pressed={selectedLanguage === language.code} onClick={() => setSelectedLanguage(language.code)}><b>{language.short}</b><span>{language.name}</span></button>)}
          </div>
        </nav>

        <section className={styles.pagePicker} aria-label="Düzenlenecek site sayfası">
          <header><div><span>SİTE SAYFALARI</span><strong>{selectedSection}</strong></div><p>{activeSection?.description}</p></header>
          <div className={styles.pageButtons}>{sections.map((section, index) => <button type="button" key={section.name} className={selectedSection === section.name ? styles.activePage : ""} aria-pressed={selectedSection === section.name} onClick={() => { setSelectedSection(section.name); setQuery(""); }}><span>{String(index + 1).padStart(2, "0")}</span><strong>{section.name}</strong></button>)}</div>
        </section>

        <section className={styles.toolbar} aria-label="İçerik arama"><label><span>{selectedSection} SAYFASINDA ARA</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`${activeLanguage.name} metinlerinde ara…`} /></label><div><span>GÖSTERİLEN METİN</span><strong>{visibleFields.length}</strong></div></section>

        {loading ? <div className={styles.empty}><strong>İçerikler hazırlanıyor…</strong><span>Sayfa ve bölüm sırası yükleniyor.</span></div> : null}
        {!loading && !visibleFields.length ? <div className={styles.empty}><strong>Eşleşen içerik bulunamadı.</strong><span>Arama kelimesini değiştirin veya başka bir sayfa seçin.</span></div> : null}

        <div className={styles.blockList}>
          {contentBlocks.map((block, blockIndex) => (
            <details className={styles.contentBlock} open={Boolean(query) || blockIndex === 0} key={block.name}>
              <summary><div><span>{String(blockIndex + 1).padStart(2, "0")}</span><div><h2>{block.name}</h2><p>{block.description}</p></div></div><b>{block.fields.length} metin</b></summary>
              <div className={styles.contentRows}>
                {block.fields.map((field, fieldIndex) => {
                  const current = values[field.contentKey] ?? field.defaults;
                  const changed = dirtyKeys.has(field.contentKey);
                  return (
                    <article className={`${styles.contentRow} ${changed ? styles.changed : ""}`} key={`${field.contentKey}:${fieldIndex}`}>
                      <header><div><span>SAYFADAKİ SIRA {String(fieldIndex + 1).padStart(2, "0")}</span><h3>{field.label}</h3>{selectedLanguage !== "tr" ? <p><b>Türkçe kaynak:</b> {field.source}</p> : null}</div><div>{changed ? <b>Kaydedilmedi</b> : null}<button type="button" onClick={() => restore(field)}>İlk metne dön</button></div></header>
                      <label className={styles.editor}><span><b>{activeLanguage.short}</b>{activeLanguage.name} metni</span><textarea dir="auto" rows={current[selectedLanguage].length > 260 ? 7 : current[selectedLanguage].length > 120 ? 5 : 3} value={current[selectedLanguage]} onChange={(event) => updateValue(field.contentKey, selectedLanguage, event.target.value)} disabled={saving || setupRequired} /></label>
                    </article>
                  );
                })}
              </div>
            </details>
          ))}
        </div>

        <div className={styles.saveBar}><div><strong>{dirtyKeys.size ? `${dirtyKeys.size} kaydedilmemiş alan` : "Tüm değişiklikler kayıtlı"}</strong><span>Sayfa veya dil değiştirdiğinizde yazdıklarınız korunur.</span></div><button type="button" onClick={() => void save()} disabled={!dirtyKeys.size || saving || setupRequired}>{saving ? "Kaydediliyor…" : "Değişiklikleri kaydet"}</button></div>
      </main>
    </div>
  );
}