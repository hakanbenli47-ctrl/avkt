import Image from "next/image";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata = { title: "İletişim", description: "Av. Ruslana Pasecinic hukuk bürosu iletişim bilgileri, Antalya." };

export default function ContactPage() {
  return (
    <main><SiteHeader />
      <section className="contact-page"><div className="contact-copy"><p>İletişim</p><h1>Antalya’da,<br /><em>Türkiye’nin her yerinde.</em></h1><div className="contact-lines"><div><span>Telefon</span><a href="tel:+905368210654">+90 536 821 06 54</a></div><div><span>E-posta</span><a href="mailto:ruslanapas@mail.ru">ruslanapas@mail.ru</a></div><div><span>Adres</span><address>Remel Plaza, Etiler<br />Evliya Çelebi Cd. 23/103<br />Muratpaşa · Antalya</address></div><div><span>Diller</span><p>Türkçe · Русский<br />English · Română</p></div></div></div><div className="contact-image"><Image src="/antalya-architecture.jpg" alt="Antalya tarihi mimarisi" fill priority /></div></section>
      <SiteFooter /></main>
  );
}
