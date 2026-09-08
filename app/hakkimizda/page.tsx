import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "Hakkımızda | Av. Ruslana Pasecinic",
  description: "Antalya Barosu avukatı Ruslana Pasecinic'in çalışma yaklaşımı ve çok dilli hukuk hizmetleri.",
};

const principles = [
  { no: "01", title: "Doğrudan iletişim", text: "Dosyanın her aşamasında avukatla doğrudan ve kendi dilinizde iletişim.", href: "/iletisim", cta: "İletişime geçin" },
  { no: "02", title: "Özenli inceleme", text: "Hazır şablonlar yerine olayın kendisine ve belgelere dayanan değerlendirme.", href: "/faaliyetlerimiz#faaliyet-turleri", cta: "İnceleyin" },
  { no: "03", title: "Çok yönlü bakış", text: "Türkiye hukuku ile sınır ötesi sonuçları birlikte ele alan dosya yönetimi.", href: "/faaliyetlerimiz#faaliyet-alanlari", cta: "İnceleyin" },
];

export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <section className="about-hero">
        <div className="about-hero-image"><Image src="/ruslana-pasecinic-portre.jpg" alt="Avukat Ruslana Pasecinic" fill priority sizes="(max-width: 980px) 100vw, 48vw" /></div>
        <div className="about-hero-copy"><p>Hakkımızda</p><h1>Hukuki güven,<br /><em>anlaşılır iletişimle başlar.</em></h1><div><strong>Av. Ruslana Pasecinic</strong><span>Antalya Barosu · 2018</span></div></div>
      </section>
      <section className="about-narrative">
        <aside><span>Avukat hakkında</span></aside>
        <article className="about-story-panel">
          <div className="about-story-heading"><small>Aşağı kaydırın <b aria-hidden="true">↓</b></small></div>
          <div className="about-story-scroll" tabIndex={0}>
            <p className="dropcap">Türkiye’de yaşayan, çalışan, yatırım yapan, iş kuran veya turistik amaçlarla bulunan yabancıların Türkiye’de karşılaşabilecekleri hukuki süreçleri; müvekkilin dili, ihtiyaçları, hedefleri ve dosyanın somut koşulları doğrultusunda takip eder.</p>
            <p>Hukuki danışmanlık ve temsil hizmetlerinde temel amaç; hukuki durumun müvekkile açık ve anlaşılır şekilde aktarılması, olası risklerin önceden değerlendirilmesi ve sürecin her aşamasının dikkatle takip edilmesidir.</p>
            <p>Yabancı müvekkillerle çalışırken, yalnızca hukuki sürecin değil, Türkiye’deki idari ve bürokratik uygulamaların da dikkate alınması önem taşır. Her dosya kendi koşulları içerisinde değerlendirilerek, müvekkile izlenebilecek yol, olası riskler ve süreç hakkında açık ve anlaşılır bilgi sunulur.</p>
            <p>Müvekkil tarafından avukata aktarılan bilgi, belge ve kişisel veriler gizlilik ve mesleki sır saklama yükümlülüğü çerçevesinde korunur. Müvekkilin hukuki sürecine ilişkin paylaştığı bilgiler, kanunun öngördüğü istisnalar dışında üçüncü kişilerle paylaşılmaz ve gizliliğin korunmasına azami özen gösterilir.</p>
            <p>Süreç boyunca doğrudan, düzenli ve güvene dayalı iletişim esas alınarak, müvekkilin Türkiye’deki hukuki işlemlerinin güvenli, anlaşılır ve sistematik bir şekilde yürütülmesine destek olunur.</p>
          </div>
        </article>
      </section>
      <section className="about-record"><div><span>2018</span><p>Antalya Barosu’na katılım</p></div><div><span>04</span><p>Çalışma dili</p></div><div><span>TR</span><p>Türkiye bağlantılı dosyalar</p></div></section>
      <section className="about-principles">{principles.map((principle) => <article key={principle.no}><Link href={principle.href}><span>{principle.no}</span><h2>{principle.title}</h2><p>{principle.text}</p><strong>{principle.cta}<i aria-hidden="true">↗</i></strong></Link></article>)}</section>
      <SiteFooter />
    </main>
  );
}