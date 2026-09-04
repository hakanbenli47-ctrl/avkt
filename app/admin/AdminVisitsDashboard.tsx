"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Visit = {
  sessionId: string;
  visitorId: string;
  entryPath: string;
  lastPath: string;
  startedAt: string;
  lastSeenAt: string;
  endedAt: string | null;
  pageViews: number;
  durationSeconds: number;
  language: string;
  deviceType: string;
  browser: string;
  referrerHost: string | null;
  countryCode: string | null;
  city: string | null;
  isActive: boolean;
};

const languageNames: Record<string, string> = { tr: "Türkçe", ru: "Русский", en: "English", ro: "Română" };

function formatDuration(seconds: number) {
  if (seconds < 60) return `${seconds} sn`;
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return rest ? `${minutes} dk ${rest} sn` : `${minutes} dk`;
}

function formatDate(value: string | null) {
  if (!value) return "—";
  return new Intl.DateTimeFormat("tr-TR", { dateStyle: "short", timeStyle: "short" }).format(new Date(value));
}

export default function AdminVisitsDashboard({ email, accessToken, onSignOut }: { email: string; accessToken: string; onSignOut: () => void }) {
  const [visits, setVisits] = useState<Visit[]>([]);
  const [message, setMessage] = useState("Ziyaret verileri yükleniyor…");
  const [loading, setLoading] = useState(false);

  const stats = useMemo(() => {
    const today = new Date().toLocaleDateString("tr-TR");
    return {
      total: visits.length,
      unique: new Set(visits.map((visit) => visit.visitorId)).size,
      today: visits.filter((visit) => new Date(visit.startedAt).toLocaleDateString("tr-TR") === today).length,
      pages: visits.reduce((total, visit) => total + visit.pageViews, 0),
    };
  }, [visits]);

  const loadVisits = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/visits", { headers: { Authorization: `Bearer ${accessToken}` } });
      const data = await response.json() as { visits?: Visit[]; error?: string };
      if (!response.ok) throw new Error(data.error || "Ziyaret verileri yüklenemedi.");
      setVisits(data.visits ?? []);
      setMessage("");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Ziyaret verileri yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    const timer = window.setTimeout(() => { void loadVisits(); }, 0);
    return () => window.clearTimeout(timer);
  }, [loadVisits]);

  return (
    <div className="admin-shell admin-visit-shell" data-no-translate>
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand"><div className="admin-logo">RP</div><div><strong>Yönetim Paneli</strong><small>Advocat in Türkiye</small></div></div>
        <nav aria-label="Yönetim menüsü">
          <a href="/admin"><span>01</span> İçerik stüdyosu</a>
          <a className="active" href="/admin/ziyaretler"><span>02</span> Giriş–çıkış verileri</a>
          <a href="/" target="_blank" rel="noreferrer"><span>↗</span> Siteyi gör</a>
        </nav>
        <div className="admin-account"><small>Giriş yapan hesap</small><strong title={email}>{email}</strong></div>
      </aside>

      <main className="admin-main admin-visit-main">
        <header className="admin-heading">
          <div><span>ZİYARET ANALİTİĞİ</span><h1>Giriş–çıkış verileri</h1><p>Yalnızca analitik izni veren ziyaretçilerin anonim oturumları. Ham IP adresi, ad ve e-posta kaydedilmez.</p></div>
          <button className="admin-signout" type="button" onClick={onSignOut}>Güvenli çıkış</button>
        </header>

        <section className="admin-visits" aria-labelledby="visit-stats-title">
          <div className="admin-section-title admin-visit-heading"><div><span>SON 30 GÜN</span><h2 id="visit-stats-title">Ziyaret özeti</h2><p>Rakamlar en son 500 izinli oturum üzerinden hazırlanır.</p></div><button type="button" onClick={() => void loadVisits()} disabled={loading}>{loading ? "Yenileniyor…" : "Verileri yenile"}</button></div>
          <div className="admin-stat-grid">
            <article><span>OTURUM</span><strong>{stats.total}</strong><small>Son 30 gün</small></article>
            <article><span>TEKİL ZİYARETÇİ</span><strong>{stats.unique}</strong><small>Anonim tarayıcı kimliği</small></article>
            <article><span>BUGÜN</span><strong>{stats.today}</strong><small>Başlayan oturum</small></article>
            <article><span>SAYFA GÖRÜNTÜLEME</span><strong>{stats.pages}</strong><small>İzinli oturumlarda</small></article>
          </div>
          {message && <div className="admin-visit-message" role="status">{message}</div>}
          {!message && visits.length === 0 && <div className="admin-empty"><b>Henüz ziyaret kaydı yok.</b><span>İlk kayıt, bir ziyaretçi analitik izni verdikten sonra burada görünecek.</span></div>}
          {visits.length > 0 && <div className="admin-visit-table" role="table" aria-label="Anonim ziyaret oturumları">
            <div className="admin-visit-row admin-visit-table-head" role="row"><span>Ziyaretçi</span><span>Giriş / çıkış</span><span>Sayfalar</span><span>Kaynak / konum</span><span>Teknik</span></div>
            {visits.map((visit) => <div className="admin-visit-row" role="row" key={visit.sessionId}>
              <div><b>#{visit.visitorId.slice(0, 8)}</b><small className={visit.isActive ? "visit-active" : ""}>{visit.isActive ? "Şu anda aktif" : visit.endedAt ? "Çıkış kaydedildi" : "Son hareket kaydedildi"}</small></div>
              <div><b>{formatDate(visit.startedAt)}</b><small>Çıkış: {formatDate(visit.endedAt || visit.lastSeenAt)} · {formatDuration(visit.durationSeconds)}</small></div>
              <div><b>{visit.entryPath}</b><small>Son: {visit.lastPath} · {visit.pageViews} sayfa</small></div>
              <div><b>{visit.referrerHost || "Doğrudan giriş"}</b><small>{[visit.city, visit.countryCode].filter(Boolean).join(", ") || "Konum bilgisi yok"}</small></div>
              <div><b>{visit.deviceType === "mobile" ? "Mobil" : visit.deviceType === "tablet" ? "Tablet" : "Masaüstü"}</b><small>{visit.browser} · {languageNames[visit.language] ?? visit.language}</small></div>
            </div>)}
          </div>}
        </section>
      </main>
    </div>
  );
}
