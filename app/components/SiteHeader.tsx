"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const pathname = usePathname();
  const mobileMenu = useRef<HTMLDetailsElement>(null);
  const activityMenu = useRef<HTMLDetailsElement>(null);
  const closeMobileMenu = () => mobileMenu.current?.removeAttribute("open");
  const closeActivityMenu = () => activityMenu.current?.removeAttribute("open");
  const isAbout = pathname === "/hakkimizda" || pathname === "/avukat-ruslana-pasecinic";
  const isActivities = pathname === "/faaliyetlerimiz" || pathname === "/calisma-alanlari";
  const isBlog = pathname === "/yazilar" || pathname.startsWith("/yazilar/");

  return (
    <header className={`main-header ${overlay ? "is-overlay" : ""}`}>
      <Link className="brand" href="/" aria-label="Advocat in Türkiye ana sayfa">
        <span className="brand-mark" aria-hidden="true">
          <svg className="brand-symbol" viewBox="0 0 64 64" focusable="false">
            <rect className="brand-symbol-frame" x="4.5" y="4.5" width="55" height="55" rx="2" />
            <path className="brand-symbol-scales" d="M17 21.5h30M32 14v33M20.5 21.5l-6 13h12l-6-13Zm23 0-6 13h12l-6-13ZM23 49h18" />
            <text className="brand-symbol-monogram" x="32" y="44" textAnchor="middle">RP</text>
          </svg>
        </span>
        <span><strong>ADVOCAT</strong><small>IN TÜRKİYE</small></span>
      </Link>
      <nav className="desktop-nav" aria-label="Ana menü">
        <Link href="/" className={pathname === "/" ? "active" : ""} aria-current={pathname === "/" ? "page" : undefined}>Anasayfa</Link>
        <Link href="/hakkimizda" className={isAbout ? "active" : ""} aria-current={isAbout ? "page" : undefined}>Hakkımızda</Link>
        <details className={`activity-menu ${isActivities ? "active" : ""}`} ref={activityMenu}>
          <summary aria-label="Faaliyetlerimiz menüsünü aç">Faaliyetlerimiz <span aria-hidden="true">⌄</span></summary>
          <div className="activity-panel">
            <div className="activity-panel-intro"><small>Faaliyetlerimiz</small><strong>Hukuki ihtiyacı, doğru hizmet biçimi ve doğru hukuk alanıyla eşleştiriyoruz.</strong></div>
            <Link href="/faaliyetlerimiz#faaliyet-turleri" onClick={closeActivityMenu}><span>01</span><div><b>Faaliyet Türleri</b><small>Nasıl destek veriyoruz?</small></div><i aria-hidden="true">↗</i></Link>
            <Link href="/faaliyetlerimiz#faaliyet-alanlari" onClick={closeActivityMenu}><span>02</span><div><b>Faaliyet Alanları</b><small>Hangi hukuk alanlarında çalışıyoruz?</small></div><i aria-hidden="true">↗</i></Link>
          </div>
        </details>
        <Link href="/yazilar" className={isBlog ? "active" : ""} aria-current={isBlog ? "page" : undefined}>Blog</Link>
      </nav>
      <div className="header-side"><LanguageSwitcher /></div>
      <details className="mobile-menu" ref={mobileMenu}>
        <summary aria-label="Menüyü aç">Menü</summary>
        <nav>
          <Link href="/" onClick={closeMobileMenu}>Anasayfa</Link>
          <Link href="/hakkimizda" onClick={closeMobileMenu}>Hakkımızda</Link>
          <details className="mobile-activity-menu">
            <summary>Faaliyetlerimiz <span aria-hidden="true">+</span></summary>
            <div><Link href="/faaliyetlerimiz#faaliyet-turleri" onClick={closeMobileMenu}>Faaliyet Türleri</Link><Link href="/faaliyetlerimiz#faaliyet-alanlari" onClick={closeMobileMenu}>Faaliyet Alanları</Link></div>
          </details>
          <Link href="/yazilar" onClick={closeMobileMenu}>Blog</Link>
          <LanguageSwitcher mobile onSelect={closeMobileMenu} />
        </nav>
      </details>
    </header>
  );
}
