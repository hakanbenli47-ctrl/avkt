"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./SiteContentDashboard.module.css";

type Language = "tr" | "ru" | "en" | "ro";
type Mode = "edit" | "browse";
type StoredRow = { content_key: string; section: string; label: string; source_text: string; tr: string; ru: string; en: string; ro: string; updated_at: string };
type Selection = { contentKey?: string; sourceText: string; shownText: string; context: string };

const languages: Array<{ code: Language; name: string; short: string }> = [
  { code: "tr", name: "Türkçe", short: "TR" },
  { code: "ru", name: "Русский", short: "RU" },
  { code: "en", name: "English", short: "EN" },
  { code: "ro", name: "Română", short: "RO" },
];

const pages = [
  { name: "Ana Sayfa", path: "/" },
  { name: "Hakkımızda", path: "/hakkimizda" },
  { name: "Faaliyetlerimiz", path: "/faaliyetlerimiz" },
  { name: "Çalışma Alanları", path: "/calisma-alanlari" },
  { name: "Sık Sorulan Sorular", path: "/sik-sorulan-sorular" },
  { name: "Blog", path: "/yazilar" },
  { name: "İletişim", path: "/iletisim" },
  { name: "Çerez ve Gizlilik", path: "/cerez-ve-gizlilik" },
];

function textNodeAtPoint(document: Document, event: MouseEvent) {
  const browserDocument = document as Document & { caretRangeFromPoint?: (x: number, y: number) => Range | null; caretPositionFromPoint?: (x: number, y: number) => { offsetNode: Node } | null };
  const rangeNode = browserDocument.caretRangeFromPoint?.(event.clientX, event.clientY)?.startContainer;
  const positionNode = browserDocument.caretPositionFromPoint?.(event.clientX, event.clientY)?.offsetNode;
  for (const node of [rangeNode, positionNode]) if (node?.nodeType === Node.TEXT_NODE && node.nodeValue?.trim()) return node as Text;
  const target = event.target instanceof Element ? event.target : null;
  if (!target) return null;
  const walker = document.createTreeWalker(target, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();
  while (node) {
    if (node.nodeValue?.trim()) return node as Text;
    node = walker.nextNode();
  }
  return null;
}

function contextFor(element: Element) {
  const tag = element.tagName.toLocaleLowerCase("tr-TR");
  const section = element.closest("section, header, footer, nav, article");
  const className = section?.className && typeof section.className === "string" ? section.className.split(" ")[0] : "sayfa";
  return `${className} · ${tag}`;
}

export default function SiteContentDashboard({ email, accessToken, onSignOut }: { email: string; accessToken: string; onSignOut: () => void }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const highlightedRef = useRef<Element | null>(null);
  const [rows, setRows] = useState<StoredRow[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("tr");
  const [selectedPage, setSelectedPage] = useState(pages[0]);
  const [currentPath, setCurrentPath] = useState("/");
  const [mode, setMode] = useState<Mode>("edit");
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const [selection, setSelection] = useState<Selection | null>(null);
  const [draft, setDraft] = useState("");
  const [savedValue, setSavedValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [frameLoading, setFrameLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const loadRows = useCallback(async () => {
    setLoading(true);
    try {
      await fetch("/api/admin/site-content", { headers: { Authorization: `Bearer ${accessToken}` }, cache: "no-store" });
      const response = await fetch("/api/admin/visual-content", { headers: { Authorization: `Bearer ${accessToken}` }, cache: "no-store" });
      const data = await response.json() as { rows?: StoredRow[]; error?: string };
      if (!response.ok) throw new Error(data.error || "İçerik kayıtları yüklenemedi.");
      setRows(data.rows ?? []);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "İçerik kayıtları yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => { void loadRows(); }, [loadRows]);

  const clearHighlight = useCallback(() => {
    highlightedRef.current?.removeAttribute("data-visual-editor-selected");
    highlightedRef.current = null;
  }, []);

  const selectText = useCallback((textNode: Text) => {
    const shownText = textNode.nodeValue?.trim() ?? "";
    if (!shownText) return;
    const element = textNode.parentElement;
    if (!element || element.closest("script, style, textarea, input, select, option, iframe")) return;
    clearHighlight();
    element.setAttribute("data-visual-editor-selected", "true");
    highlightedRef.current = element;
    const stored = rows.find((row) => row.source_text === shownText || languages.some((language) => row[language.code] === shownText));
    const value = stored?.[selectedLanguage]?.trim() || shownText;
    setSelection({ contentKey: stored?.content_key, sourceText: stored?.source_text || shownText, shownText, context: contextFor(element) });
    setDraft(value);
    setSavedValue(value);
    setMessage("");
  }, [clearHighlight, rows, selectedLanguage]);

  const handleFrameLoad = useCallback(() => {
    const frame = iframeRef.current;
    const document = frame?.contentDocument;
    if (!frame || !document) return;
    setFrameLoading(false);
    try { setCurrentPath(frame.contentWindow?.location.pathname || selectedPage.path); } catch { setCurrentPath(selectedPage.path); }
    document.querySelector(".cookie-consent")?.remove();
    const style = document.createElement("style");
    style.dataset.visualEditorStyle = "true";
    style.textContent = '[data-visual-editor-selected="true"]{outline:3px solid #d4ae57!important;outline-offset:4px!important;background:rgba(255,238,184,.16)!important}';
    document.head.appendChild(style);
    document.addEventListener("click", (event) => {
      if (mode === "browse") return;
      const mouseEvent = event as MouseEvent;
      const node = textNodeAtPoint(document, mouseEvent);
      if (!node) return;
      event.preventDefault();
      event.stopPropagation();
      selectText(node);
    }, true);
  }, [mode, selectText, selectedPage.path]);

  function reloadFrame() {
    clearHighlight();
    setSelection(null);
    setDraft("");
    setFrameLoading(true);
    iframeRef.current?.contentWindow?.location.reload();
  }

  function changeLanguage(language: Language) {
    window.localStorage.setItem("advocat-language", language);
    setSelectedLanguage(language);
    window.setTimeout(reloadFrame, 0);
  }

  function changePage(page: typeof pages[number]) {
    clearHighlight();
    setSelection(null);
    setDraft("");
    setSelectedPage(page);
    setCurrentPath(page.path);
    setFrameLoading(true);
  }

  async function save() {
    if (!selection || !draft.trim() || draft.trim() === savedValue.trim()) return;
    setSaving(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/visual-content", { method: "PUT", headers: { "Content-Type": "application/json", Authorization: `Bearer ${accessToken}` }, body: JSON.stringify({ contentKey: selection.contentKey, sourceText: selection.sourceText, language: selectedLanguage, value: draft, page: currentPath, label: `${selection.context}: ${selection.sourceText.slice(0, 80)}` }) });
      const data = await response.json() as { row?: StoredRow; error?: string };
      if (!response.ok || !data.row) throw new Error(data.error || "Metin kaydedilemedi.");
      setRows((current) => [data.row!, ...current.filter((row) => row.content_key !== data.row!.content_key)]);
      setSavedValue(draft.trim());
      setSelection((current) => current ? { ...current, contentKey: data.row!.content_key, sourceText: data.row!.source_text } : current);
      setMessage(`${languages.find((item) => item.code === selectedLanguage)?.name} metni kaydedildi.`);
      window.setTimeout(reloadFrame, 150);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Metin kaydedilemedi.");
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
        <header className="admin-heading"><div><span>GÖRSEL İÇERİK DÜZENLEYİCİ</span><h1>Metni siteden seçerek düzenleyin</h1><p>Sayfayı ve dili seçin; önizlemede değiştirmek istediğiniz yazıya tıklayın.</p></div><button className="admin-signout" type="button" onClick={onSignOut}>Güvenli çıkış</button></header>
        {message ? <div className={styles.message} role="status">{message}</div> : null}

        <section className={styles.controlPanel}>
          <div className={styles.controlGroup}><span>DİL</span><div className={styles.languageButtons}>{languages.map((language) => <button type="button" key={language.code} className={selectedLanguage === language.code ? styles.activeControl : ""} onClick={() => changeLanguage(language.code)} aria-pressed={selectedLanguage === language.code}><b>{language.short}</b>{language.name}</button>)}</div></div>
          <div className={styles.controlGroup}><span>SAYFA</span><div className={styles.pageButtons}>{pages.map((page) => <button type="button" key={page.path} className={selectedPage.path === page.path ? styles.activeControl : ""} onClick={() => changePage(page)} aria-pressed={selectedPage.path === page.path}>{page.name}</button>)}</div></div>
        </section>

        <section className={styles.modeBar} aria-label="Önizleme araçları">
          <div><button type="button" className={mode === "edit" ? styles.activeMode : ""} onClick={() => setMode("edit")}>Metin seç</button><button type="button" className={mode === "browse" ? styles.activeMode : ""} onClick={() => setMode("browse")}>Sitede gezin</button></div>
          <p>{mode === "edit" ? "Bir yazıya tıklayın; bağlantılar seçim sırasında açılmaz." : "Bağlantıları kullanarak başka sayfalara veya blog yazılarına gidebilirsiniz."}</p>
          <div><button type="button" className={device === "desktop" ? styles.activeDevice : ""} onClick={() => setDevice("desktop")}>Masaüstü</button><button type="button" className={device === "mobile" ? styles.activeDevice : ""} onClick={() => setDevice("mobile")}>Mobil</button></div>
        </section>

        <div className={`${styles.workspace} ${device === "mobile" ? styles.mobileWorkspace : ""}`}>
          <section className={styles.previewPanel} aria-label="Canlı site önizlemesi">
            <header><div><span>CANLI ÖNİZLEME</span><strong>{currentPath}</strong></div><button type="button" onClick={reloadFrame}>Yenile</button></header>
            <div className={styles.frameShell}>{frameLoading ? <div className={styles.frameLoading}>Sayfa hazırlanıyor…</div> : null}<iframe ref={iframeRef} src={selectedPage.path} title="Düzenlenebilir site önizlemesi" onLoad={handleFrameLoad} /></div>
          </section>

          <aside className={styles.editorPanel}>
            <header><span>SEÇİLİ METİN</span><h2>{selection ? "Düzenlemeye hazır" : "Önizlemeden bir metin seçin"}</h2></header>
            {selection ? <div className={styles.editorBody}><div className={styles.selectionInfo}><span>KONUM</span><strong>{selection.context}</strong><small>{currentPath}</small></div><label><span>{languages.find((item) => item.code === selectedLanguage)?.name} metni</span><textarea dir="auto" value={draft} onChange={(event) => setDraft(event.target.value)} rows={draft.length > 280 ? 12 : draft.length > 120 ? 8 : 5} /></label><div className={styles.original}><span>SEÇTİĞİNİZ METİN</span><p>{selection.shownText}</p></div><button className={styles.saveButton} type="button" onClick={() => void save()} disabled={saving || !draft.trim() || draft.trim() === savedValue.trim()}>{saving ? "Kaydediliyor…" : "Bu dilde kaydet"}</button><small className={styles.saveNote}>Diğer diller ve sitenin tasarımı değiştirilmez.</small></div> : <div className={styles.editorEmpty}><span>01</span><p><b>Metin seç</b> modu açıkken önizlemede bir başlığa, paragrafa veya buton yazısına tıklayın.</p></div>}
            {loading ? <div className={styles.catalogStatus}>Veritabanındaki içerikler eşleştiriliyor…</div> : <div className={styles.catalogStatus}>{rows.length} veritabanı kaydı hazır</div>}
          </aside>
        </div>
      </main>
    </div>
  );
}