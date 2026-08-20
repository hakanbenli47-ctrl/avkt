"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  { image: "/justice.jpg", alt: "Adalet heykeli", kicker: "Antalya · Türkiye", title: <>Hukukun yabancı<br />dilde kalmadığı bir yer.</>, text: "Türkiye’de yaşayan, yatırım yapan ve iş kuran yabancılar için çok dilli hukuk hizmeti." },
  { image: "/law-library.jpg", alt: "Hukuk kitaplarıyla kütüphane", kicker: "Bilgi · Tecrübe · Dikkat", title: <>Her dosya, kendi<br />koşullarıyla değerlendirilir.</>, text: "Hazır cevaplar yerine dosyanın gerçeğine, hedeflerine ve risklerine odaklanan kişisel çalışma." },
  { image: "/antalya-architecture.jpg", alt: "Antalya’da tarihi mimari", kicker: "TR · RU · EN · RO", title: <>Türkiye’de hukuki süreçler,<br />kendi dilinizde.</>, text: "Yerel hukuk bilgisini uluslararası bakışla birleştiren, doğrudan ve anlaşılır iletişim." },
];

export default function HeroSlider() {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6500);
    return () => window.clearInterval(timer);
  }, []);
  return (
    <section className="slider-hero" aria-label="Advocat in Türkiye tanıtımı">
      {slides.map((slide, index) => (
        <div className={`hero-slide ${index === active ? "active" : ""}`} aria-hidden={index !== active} key={slide.image}>
          <Image src={slide.image} alt={slide.alt} fill priority={index === 0} sizes="100vw" />
          <div className="slide-wash" />
          <div className="slide-copy"><p>{slide.kicker}</p><h1>{slide.title}</h1><span>{slide.text}</span></div>
        </div>
      ))}
      <div className="hero-links"><Link href="/avukat-ruslana-pasecinic">Büroyu tanıyın <span>↗</span></Link><Link href="/calisma-alanlari">Çalışma alanları <span>↗</span></Link></div>
      <aside className="hero-profile-card" aria-label="Avukat Ruslana Pasecinic">
        <span>RP</span><div><small>Attorney at Law</small><strong>Ruslana Pasecinic</strong><b>Antalya · Türkiye</b></div>
      </aside>
      <div className="hero-edge-label">TR · RU · EN · RO</div>
      <div className="slider-controls" aria-label="Slayt seçimi">
        {slides.map((_, index) => <button key={index} aria-label={`${index + 1}. görsel`} className={index === active ? "active" : ""} onClick={() => setActive(index)}><span /></button>)}
      </div>
      <span className="slider-count">0{active + 1} / 0{slides.length}</span>
    </section>
  );
}
