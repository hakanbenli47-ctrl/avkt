import Image from "next/image";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import { practiceAreas } from "../../lib/content";

export const metadata = { title: "Çalışma Alanları", description: "Yabancılar, yatırımcılar ve aileler için Türkiye'de çok dilli hukuk hizmetleri." };

export default function PracticeAreasPage() {
  return (
    <main><SiteHeader overlay />
      <section className="subpage-hero"><Image src="/law-library.jpg" alt="Hukuk kütüphanesi" fill priority sizes="100vw" /><div /><p>Uzmanlıklar</p><h1>Hukuki ihtiyaçlar,<br /><em>bütüncül bir bakışla.</em></h1></section>
      <section className="page-intro"><span>01</span><h2>Türkiye ile bağlantılı özel ve ticari meselelerde, dosyanın tamamını gören bir çalışma.</h2><p>Her hukuki süreç tek bir başlıktan ibaret değildir. Taşınmaz alımı ikamet ve vatandaşlıkla; şirket kuruluşu sözleşmeler ve çalışma izinleriyle; aile ve miras dosyaları ise birden fazla ülkenin hukukuyla kesişebilir. Çalışma, bu bağlantılar birlikte değerlendirilerek yürütülür.</p></section>
      <section className="practice-detail-list">
        {practiceAreas.map((area, index) => <article key={area.no}><span>{area.no}</span><div><h2>{area.title}</h2><p>{area.text}</p></div><ul>{index === 0 && <><li>Tapu ve hukuki durum incelemesi</li><li>Satış ve yatırım sözleşmeleri</li><li>Yatırım yoluyla vatandaşlık</li></>}{index === 1 && <><li>Şirket kuruluşu ve ortaklık yapısı</li><li>Ticari sözleşmeler</li><li>Uyuşmazlık ve alacak takibi</li></>}{index === 2 && <><li>İkamet ve çalışma izinleri</li><li>Vatandaşlık başvuruları</li><li>İdari başvuru ve itirazlar</li></>}{index === 3 && <><li>Uluslararası boşanma ve velayet</li><li>Mirasçılık ve intikal işlemleri</li><li>Yabancı kararların tanınması</li></>}{index === 4 && <><li>Hukuk ve ticaret davaları</li><li>İcra ve alacak takibi</li><li>Müzakere ve arabuluculuk</li></>}{index === 5 && <><li>Trafik kazaları</li><li>Sigorta ve tazminat talepleri</li><li>Zarar hesabı ve takip</li></>}</ul></article>)}
      </section><SiteFooter /></main>
  );
}
