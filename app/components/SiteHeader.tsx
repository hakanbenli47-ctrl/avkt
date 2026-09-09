"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const pathname = usePathname();
  const mobileMenu = useRef<HTMLDetailsElement>(null);
  const mobileActivityMenu = useRef<HTMLDetailsElement>(null);
  const activityMenu = useRef<HTMLDetailsElement>(null);
  const closeMobileMenu = () => {
    mobileActivityMenu.current?.removeAttribute("open");
    mobileMenu.current?.removeAttribute("open");
  };
  const closeActivityMenu = () => activityMenu.current?.removeAttribute("open");
  const isAbout = pathname === "/hakkimizda" || pathname === "/avukat-ruslana-pasecinic";
  const isActivities = pathname === "/faaliyetlerimiz" || pathname === "/calisma-alanlari";
  const isBlog = pathname === "/yazilar" || pathname.startsWith("/yazilar/");
  const isFaq = pathname === "/sik-sorulan-sorular";
  const isContact = pathname === "/iletisim";

  return (
    <header className={`main-header ${overlay ? "is-overlay" : ""}`}>
      <Link className="brand" href="/" aria-label="Avukat Ruslana Pasecinic ana sayfa">
        <span className="brand-mark" aria-hidden="true"><span className="brand-monogram">RP</span></span>
        <span><strong>Ruslana Pasecinic</strong><small>AVUKAT · ANTALYA</small></span>
      </Link>
      <nav className="desktop-nav" aria-label="Ana menü">
        <Link href="/" className={pathname === "/" ? "active" : ""} aria-current={pathname === "/" ? "page" : undefined}>Anasayfa</Link>
        <Link href="/hakkimizda" className={isAbout ? "active" : ""} aria-current={isAbout ? "page" : undefined}>Hakkımızda</Link>
        <details className={`activity-menu ${isActivities ? "active" : ""}`} ref={activityMenu} onMouseLeave={closeActivityMenu} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) closeActivityMenu(); }}>
          <summary aria-label="Faaliyetlerimiz menüsü"><Link href="/faaliyetlerimiz" onClick={closeActivityMenu}>Faaliyetlerimiz</Link><span aria-hidden="true">⌄</span></summary>
          <div className="activity-panel simple-activity-panel">
            <Link href="/faaliyetlerimiz#faaliyet-turleri" onClick={closeActivityMenu}>Faaliyet Türleri</Link>
            <Link href="/faaliyetlerimiz#faaliyet-alanlari" onClick={closeActivityMenu}>Faaliyet Alanları</Link>
          </div>
        </details>
        <Link href="/yazilar" className={isBlog ? "active" : ""} aria-current={isBlog ? "page" : undefined}>Blog</Link>
        <Link href="/sik-sorulan-sorular" className={isFaq ? "active" : ""} aria-current={isFaq ? "page" : undefined}>Sık Sorulan Sorular</Link>
        <Link href="/iletisim" className={isContact ? "active" : ""} aria-current={isContact ? "page" : undefined}>İletişim</Link>
      </nav>
      <div className="header-side"><LanguageSwitcher /></div>
      <details className="mobile-menu" ref={mobileMenu}>
        <summary aria-label="Menüyü aç">Menü</summary>
        <nav>
          <Link href="/" onClick={closeMobileMenu}>Anasayfa</Link>
          <Link href="/hakkimizda" onClick={closeMobileMenu}>Hakkımızda</Link>
          <details className="mobile-activity-menu" ref={mobileActivityMenu}>
            <summary><Link href="/faaliyetlerimiz" onClick={closeMobileMenu}>Faaliyetlerimiz</Link><span aria-hidden="true">+</span></summary>
            <div><Link href="/faaliyetlerimiz#faaliyet-turleri" onClick={closeMobileMenu}>Faaliyet Türleri</Link><Link href="/faaliyetlerimiz#faaliyet-alanlari" onClick={closeMobileMenu}>Faaliyet Alanları</Link></div>
          </details>
          <Link href="/yazilar" onClick={closeMobileMenu}>Blog</Link>
          <Link href="/sik-sorulan-sorular" onClick={closeMobileMenu}>Sık Sorulan Sorular</Link>
          <Link href="/iletisim" onClick={closeMobileMenu}>İletişim</Link>
          <LanguageSwitcher mobile onSelect={closeMobileMenu} />
        </nav>
      </details>
    </header>
  );
}