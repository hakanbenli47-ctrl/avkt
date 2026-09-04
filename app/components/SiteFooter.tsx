import Link from "next/link";
import CookieSettingsButton from "./CookieSettingsButton";

export default function SiteFooter() {
  return (
    <footer className="main-footer">
      <div className="footer-brand"><span className="brand-mark">RP</span><div><b>Av. Ruslana Pasecinic</b><small>Antalya Barosu</small></div></div>
      <div className="footer-nav"><Link href="/">Anasayfa</Link><Link href="/hakkimizda">Hakkımızda</Link><Link href="/faaliyetlerimiz">Faaliyetlerimiz</Link><Link href="/yazilar">Blog</Link></div>
      <div className="footer-address"><span>Remel Plaza, Etiler</span><span>Muratpaşa · Antalya</span><a href="mailto:ruslanapas@mail.ru">ruslanapas@mail.ru</a></div>
      <div className="footer-bottom"><span>© 2026 Advocat in Türkiye</span><span>İçerikler genel bilgilendirme amaçlıdır.</span><Link href="/cerez-ve-gizlilik">Çerez ve Gizlilik</Link><CookieSettingsButton /><a href="https://www.instagram.com/advokat.turkiye/">Instagram ↗</a></div>
    </footer>
  );
}
