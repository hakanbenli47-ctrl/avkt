import Image from "next/image";
import { contact } from "../../lib/contact";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata = { title: "İletişim", description: "Av. Ruslana Pasecinic hukuk bürosu iletişim bilgileri, Antalya." };

export default function ContactPage() {
  return (
    <main><SiteHeader />
      <section className="contact-page"><div className="contact-copy"><p>İletişim</p><h1>Antalya’da,<br /><em>Türkiye’nin her yerinde.</em></h1><div className="contact-lines"><div><span>Telefon</span><a href={contact.phoneHref}>{contact.phoneDisplay}</a></div><div><span>E-posta</span><a href={`mailto:${contact.email}`}>{contact.email}</a></div><div><span>Adres</span><address>Altındağ Mahallesi, Tonguç Caddesi No: 26<br />Mehmet Zeki Balcı İş Merkezi, Kat: 5, Daire: 17<br />Muratpaşa · Antalya · Türkiye</address></div><div><span>Diller</span><p>Türkçe · Русский<br />English · Română</p></div></div></div><div className="contact-image"><Image src="/antalya-architecture.jpg" alt="Antalya tarihi mimarisi" fill priority sizes="(max-width: 980px) 100vw, 45vw" /></div></section>
      <section className="office-map-section" aria-labelledby="office-map-title">
        <div className="office-map-copy">
          <p>Ofis konumu</p>
          <h2 id="office-map-title">Altındağ,<br /><em>Muratpaşa · Antalya</em></h2>
          <address>Altındağ Mahallesi, Tonguç Caddesi No: 26<br />Mehmet Zeki Balcı İş Merkezi<br />Kat: 5 · Daire: 17 · Muratpaşa · Antalya · Türkiye</address>
          <a href="https://www.google.com/maps/search/?api=1&amp;query=Alt%C4%B1nda%C4%9F+Mahallesi+Tongu%C3%A7+Caddesi+No+26+Mehmet+Zeki+Balc%C4%B1+%C4%B0%C5%9F+Merkezi+Kat+5+Daire+17+Muratpa%C5%9Fa+Antalya+T%C3%BCrkiye" target="_blank" rel="noreferrer">Google Haritalar’da aç <span>↗</span></a>
        </div>
        <div className="office-map-frame">
          <iframe
            title="Av. Ruslana Pasecinic hukuk bürosu konumu"
            src="https://www.google.com/maps?q=Alt%C4%B1nda%C4%9F+Mahallesi+Tongu%C3%A7+Caddesi+No+26+Mehmet+Zeki+Balc%C4%B1+%C4%B0%C5%9F+Merkezi+Muratpa%C5%9Fa+Antalya+T%C3%BCrkiye&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
      <SiteFooter /></main>
  );
}
