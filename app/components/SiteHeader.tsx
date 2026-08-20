import Link from "next/link";

export default function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  return (
    <header className={`main-header ${overlay ? "is-overlay" : ""}`}>
      <Link className="brand" href="/" aria-label="Advocat in Türkiye ana sayfa">
        <span className="brand-mark">RP</span>
        <span><strong>ADVOCAT</strong><small>IN TÜRKİYE</small></span>
      </Link>
      <nav className="desktop-nav" aria-label="Ana menü">
        <Link href="/calisma-alanlari">Çalışma Alanları</Link>
        <Link href="/avukat-ruslana-pasecinic">Avukat</Link>
        <Link href="/yazilar">Hukuk Notları</Link>
        <Link href="/iletisim">İletişim</Link>
      </nav>
      <div className="header-side"><span>TR</span><i /><span>RU</span><i /><span>EN</span><i /><span>RO</span></div>
      <details className="mobile-menu">
        <summary aria-label="Menüyü aç">Menü</summary>
        <nav><Link href="/calisma-alanlari">Çalışma Alanları</Link><Link href="/avukat-ruslana-pasecinic">Avukat</Link><Link href="/yazilar">Hukuk Notları</Link><Link href="/iletisim">İletişim</Link></nav>
      </details>
    </header>
  );
}
