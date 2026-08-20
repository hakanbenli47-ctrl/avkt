import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="main-footer">
      <div className="footer-brand"><span className="brand-mark">RP</span><div><b>Av. Ruslana Pasecinic</b><small>Antalya Barosu</small></div></div>
      <div className="footer-nav"><Link href="/calisma-alanlari">Çalışma Alanları</Link><Link href="/avukat-ruslana-pasecinic">Avukat</Link><Link href="/yazilar">Hukuk Notları</Link><Link href="/iletisim">İletişim</Link></div>
      <div className="footer-address"><span>Remel Plaza, Etiler</span><span>Muratpaşa · Antalya</span><a href="mailto:ruslanapas@mail.ru">ruslanapas@mail.ru</a></div>
      <div className="footer-bottom"><span>© 2026 Advocat in Türkiye</span><span>İçerikler genel bilgilendirme amaçlıdır.</span><a href="https://www.instagram.com/advokat.turkiye/">Instagram ↗</a></div>
    </footer>
  );
}
