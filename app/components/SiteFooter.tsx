import Link from "next/link";
import { contact } from "../../lib/contact";
import CookieSettingsButton from "./CookieSettingsButton";
import SocialIcon from "./SocialIcon";

export default function SiteFooter() {
  return (
    <footer className="main-footer">
      <div className="footer-cta">
        <div><span>Hukuki bir konuda görüşmek için</span><h2>Süreci birlikte<br /><em>değerlendirelim.</em></h2></div>
        <Link href="/iletisim">İletişime geçin <b aria-hidden="true">↗</b></Link>
      </div>
      <div className="footer-main">
        <div className="footer-brand-column">
          <div className="footer-brand"><span className="brand-mark">RP</span><div><b>Av. Ruslana Pasecinic</b><small>Antalya Barosu</small></div></div>
          <p>Türkiye bağlantılı özel ve ticari meselelerde çok dilli hukuk hizmeti.</p>
        </div>
        <nav className="footer-nav" aria-label="Alt menü"><strong>Sayfalar</strong><Link href="/">Anasayfa</Link><Link href="/hakkimizda">Hakkımızda</Link><Link href="/faaliyetlerimiz">Faaliyetlerimiz</Link><Link href="/yazilar">Blog</Link><Link href="/iletisim">İletişim</Link></nav>
        <div className="footer-contact"><strong>İletişim bilgileri</strong><a href={contact.phoneHref}>{contact.phoneDisplay}</a><a href={`mailto:${contact.email}`}>{contact.email}</a><address>Altındağ Mah. · Tonguç Cad. No: 26<br />Mehmet Zeki Balcı İş Merkezi · K: 5 D: 17<br />Muratpaşa · Antalya · Türkiye</address><Link href="/iletisim">Konumu ve iletişimi görüntüle <span aria-hidden="true">↗</span></Link></div>
        <div className="footer-social"><strong>Sosyal medya</strong><div><a href={contact.instagramHref} target="_blank" rel="noreferrer" aria-label="Instagram profilini aç"><SocialIcon name="instagram" /><span>Instagram</span></a><a href={contact.linkedinHref} target="_blank" rel="noreferrer" aria-label="LinkedIn profilini aç"><SocialIcon name="linkedin" /><span>LinkedIn</span></a><a href={contact.facebookHref} target="_blank" rel="noreferrer" aria-label="Facebook profilini aç"><SocialIcon name="facebook" /><span>Facebook</span></a></div></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Advocat in Türkiye · <span>Tüm hakları saklıdır.</span></span><span>İçerikler genel bilgilendirme amaçlıdır.</span><Link href="/cerez-ve-gizlilik">Çerez ve Gizlilik</Link><CookieSettingsButton /></div>
    </footer>
  );
}
