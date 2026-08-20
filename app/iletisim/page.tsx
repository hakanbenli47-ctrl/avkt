import Image from "next/image";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata = { title: "İletişim", description: "Av. Ruslana Pasecinic hukuk bürosu iletişim bilgileri, Antalya." };

export default function ContactPage() {
  return (
    <main><SiteHeader />
      <section className="contact-page"><div className="contact-copy"><p>İletişim</p><h1>Antalya’da,<br /><em>Türkiye’nin her yerinde.</em></h1><div className="contact-lines"><div><span>Telefon</span><a href="tel:+905368210654">+90 536 821 06 54</a></div><div><span>E-posta</span><a href="mailto:ruslanapas@mail.ru">ruslanapas@mail.ru</a></div><div><span>Adres</span><address>Remel Plaza, Etiler<br />Evliya Çelebi Cd. 23/103<br />Muratpaşa · Antalya</address></div><div><span>Diller</span><p>Türkçe · Русский<br />English · Română</p></div></div></div><div className="contact-image"><Image src="/antalya-architecture.jpg" alt="Antalya tarihi mimarisi" fill priority sizes="(max-width: 980px) 100vw, 45vw" /></div></section>
      <section className="office-map-section" aria-labelledby="office-map-title">
        <div className="office-map-copy">
          <p>Ofis konumu</p>
          <h2 id="office-map-title">Remel Plaza,<br /><em>Muratpaşa · Antalya</em></h2>
          <address>Remel Plaza, Etiler Mahallesi<br />Evliya Çelebi Caddesi 23/103<br />07010 Muratpaşa · Antalya</address>
          <a href="https://www.google.com/maps/search/?api=1&query=Remel+Plaza+Etiler+Evliya+%C3%87elebi+Cd.+23%2F103+Muratpa%C5%9Fa+Antalya" target="_blank" rel="noreferrer">Google Haritalar’da aç <span>↗</span></a>
        </div>
        <div className="office-map-frame">
          <iframe
            title="Av. Ruslana Pasecinic hukuk bürosu konumu"
            src="https://www.google.com/maps?q=Remel+Plaza+Etiler+Evliya+%C3%87elebi+Cd.+23%2F103+Muratpa%C5%9Fa+Antalya&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
      <SiteFooter /></main>
  );
}
