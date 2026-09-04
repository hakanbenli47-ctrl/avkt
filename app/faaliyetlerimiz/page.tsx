import Image from "next/image";
import Link from "next/link";
import { practiceAreas } from "../../lib/content";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "Faaliyetlerimiz | Advocat in Türkiye",
  description: "Danışmanlık, dava, sözleşme ve Türkiye bağlantılı işlemler için çok dilli hukuk hizmetleri.",
};

const serviceTypes = [
  { no: "01", title: "Hukuki danışmanlık", text: "Karar veya işlem öncesinde hukuki durumun, seçeneklerin ve risklerin anlaşılır biçimde değerlendirilmesi.", items: ["Önleyici hukuki değerlendirme", "Yazılı ve sözlü hukuki görüş", "Risk ve süreç planlaması"] },
  { no: "02", title: "Dava ve uyuşmazlık yönetimi", text: "Uyuşmazlığın niteliğine göre müzakere, arabuluculuk, dava ve icra yollarının birlikte ele alınması.", items: ["Dava öncesi strateji", "Mahkeme ve icra takibi", "Müzakere ve alternatif çözüm"] },
  { no: "03", title: "Sözleşme ve işlem desteği", text: "Hak ve yükümlülükleri açıklaştıran sözleşmelerin hazırlanması, incelenmesi ve işlem sürecinin takibi.", items: ["Sözleşme hazırlama ve inceleme", "Belge ve kayıt kontrolü", "Başvuru ve işlem takibi"] },
  { no: "04", title: "Yabancılar için Türkiye işlemleri", text: "Türkiye’de yaşayan, yatırım yapan veya malvarlığı bulunan yabancılar için çok dilli ve koordineli hukuki destek.", items: ["Taşınmaz ve yatırım işlemleri", "İkamet ve vatandaşlık süreçleri", "Sınır ötesi aile ve miras dosyaları"] },
];

const areaItems = [
  ["Tapu ve hukuki durum incelemesi", "Satış ve yatırım sözleşmeleri", "Yatırım yoluyla vatandaşlık"],
  ["Şirket kuruluşu ve ortaklık yapısı", "Ticari sözleşmeler", "Uyuşmazlık ve alacak takibi"],
  ["İkamet ve çalışma izinleri", "Vatandaşlık başvuruları", "İdari başvuru ve itirazlar"],
  ["Uluslararası boşanma ve velayet", "Mirasçılık ve intikal işlemleri", "Yabancı kararların tanınması"],
  ["Hukuk ve ticaret davaları", "İcra ve alacak takibi", "Müzakere ve arabuluculuk"],
  ["Trafik kazaları", "Sigorta ve tazminat talepleri", "Zarar hesabı ve takip"],
];

export default function ActivitiesPage() {
  return (
    <main>
      <SiteHeader overlay />
      <section className="activities-hero"><Image src="/law-library.jpg" alt="Hukuk kütüphanesi" fill priority sizes="100vw" /><div className="activities-hero-shade" /><div className="activities-hero-copy"><p>Faaliyetlerimiz</p><h1>Hukuki ihtiyaca göre<br /><em>doğru çalışma biçimi.</em></h1><span>Her dosya, hizmet türü ile ilgili hukuk alanının birlikte değerlendirilmesini gerektirir.</span></div></section>
      <nav className="activities-anchor-nav" aria-label="Faaliyetler sayfa bölümleri"><Link href="#faaliyet-turleri"><span>01</span> Faaliyet Türleri</Link><Link href="#faaliyet-alanlari"><span>02</span> Faaliyet Alanları</Link></nav>
      <section className="activities-intro"><span>Yaklaşım</span><h2>Dosyanın yalnızca hukuki başlığını değil, amacını ve sınır ötesi etkilerini de dikkate alan bir çalışma.</h2><p>Danışmanlık, dava veya işlem desteğinin kapsamı; belgeler, hedefler, yetkili kurumlar ve olası riskler incelendikten sonra belirlenir. Böylece her aşama açık, ölçülü ve izlenebilir bir plan içinde yürütülür.</p></section>
      <section className="service-types" id="faaliyet-turleri"><header><span>01</span><div><p>Faaliyet Türleri</p><h2>Nasıl destek veriyoruz?</h2></div></header><div className="service-type-grid">{serviceTypes.map((service) => <article key={service.no}><span>{service.no}</span><h3>{service.title}</h3><p>{service.text}</p><ul>{service.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></section>
      <section className="activity-areas" id="faaliyet-alanlari"><header><span>02</span><div><p>Faaliyet Alanları</p><h2>Birbirine temas eden hukuk alanları.</h2></div></header><div className="activity-area-list">{practiceAreas.map((area, index) => <article key={area.no}><span>{area.no}</span><div><h3>{area.title}</h3><p>{area.text}</p></div><ul>{areaItems[index].map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></section>
      <section className="activities-note"><p>Her dosyanın koşulları farklıdır. Bu sayfadaki açıklamalar genel bilgilendirme niteliğindedir; hukuki değerlendirme, somut olay ve belgeler incelendikten sonra yapılır.</p><Link href="/iletisim">İletişim bilgileri <span>↗</span></Link></section>
      <SiteFooter />
    </main>
  );
}
