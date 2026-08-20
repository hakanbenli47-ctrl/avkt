"use client";

import Link from "next/link";
import { useRef } from "react";
import LanguageSwitcher from "./LanguageSwitcher";

export default function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const mobileMenu = useRef<HTMLDetailsElement>(null);
  const closeMobileMenu = () => mobileMenu.current?.removeAttribute("open");

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
      <div className="header-side"><LanguageSwitcher /></div>
      <details className="mobile-menu" ref={mobileMenu}>
        <summary aria-label="Menüyü aç">Menü</summary>
        <nav><Link href="/calisma-alanlari" onClick={closeMobileMenu}>Çalışma Alanları</Link><Link href="/avukat-ruslana-pasecinic" onClick={closeMobileMenu}>Avukat</Link><Link href="/yazilar" onClick={closeMobileMenu}>Hukuk Notları</Link><Link href="/iletisim" onClick={closeMobileMenu}>İletişim</Link><LanguageSwitcher mobile /></nav>
      </details>
    </header>
  );
}
