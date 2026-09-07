import Image from "next/image";
import Link from "next/link";
import HeroSlider from "./components/HeroSlider";
import HomeInsights from "./components/HomeInsights";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import { practiceAreas } from "../lib/content";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <HeroSlider />
      <section className="brand-ribbon" aria-label="Çalışma yaklaşımı"><span>Hukuki öngörü</span><i>✦</i><span>Çok dilli iletişim</span><i>✦</i><span>Uluslararası bakış</span><i>✦</i><span>Yerel tecrübe</span></section>
      <section className="law-intro" aria-labelledby="law-intro-title">
        <div className="law-intro-copy">
          <span className="editorial-kicker">Advocat in Türkiye · Antalya</span>
          <h2 id="law-intro-title">Türkiye’deki hukuki süreçlerinizde<br /><em>açık ve doğrudan yaklaşım.</em></h2>
          <p>Türkiye’de yaşayan, yatırım yapan veya ticari faaliyette bulunan yabancı gerçek ve tüzel kişilere; sürecin her aşamasında anlaşılır, dikkatli ve çok dilli hukuki destek sunulur.</p>
          <div className="law-intro-actions"><Link href="/faaliyetlerimiz">Faaliyet alanlarını inceleyin <b>↗</b></Link><Link href="/iletisim">İletişime geçin <b>↗</b></Link></div>
        </div>
        <div className="law-intro-visual"><Image src="/law-library.jpg" alt="Hukuk kitapları ve çalışma masası" fill sizes="(max-width: 980px) 100vw, 46vw" /><div className="law-intro-seal"><strong>TR · RU<br />EN · RO</strong><span>Dört dilde<br />hukuki iletişim</span></div></div>
      </section>
      <section className="home-practice" aria-labelledby="home-practice-title">
        <header><span>01</span><div><p>Faaliyet alanları</p><h2 id="home-practice-title">Hukuki ihtiyacınıza<br /><em>bütüncül bakış.</em></h2></div><p>Her dosya kendi koşulları, belgeleri ve hedefleri içinde ele alınır. Çalışmalar; önleyici danışmanlıktan dava ve uyuşmazlık süreçlerine kadar uzanır.</p></header>
        <div className="home-practice-grid">{practiceAreas.map((area) => <Link href="/faaliyetlerimiz" key={area.no}><span>{area.no}</span><h3>{area.title}</h3><p>{area.text}</p><b>Detaylı bilgi ↗</b></Link>)}</div>
      </section>
      <section className="home-lawyer" aria-labelledby="home-lawyer-title">
        <div className="home-lawyer-copy">
          <span className="editorial-kicker">Avukatlık yaklaşımı</span><h2 id="home-lawyer-title">Av. Ruslana<br /><em>Pasecinic</em></h2>
          <blockquote>“Hukuki güven, müvekkilin süreci kendi dilinde ve bütün açıklığıyla anlayabilmesiyle başlar.”</blockquote>
          <p>Antalya Barosu’na kayıtlı Av. Ruslana Pasecinic; Türkiye bağlantılı özel hukuk ve ticaret hukuku süreçlerinde, yabancı müvekkillerin ihtiyaçlarına odaklanan çok dilli bir çalışma yürütür.</p>
          <dl><div><dt>2018</dt><dd>Antalya Barosu</dd></div><div><dt>04</dt><dd>Çalışma dili</dd></div><div><dt>TR</dt><dd>Türkiye bağlantılı dosyalar</dd></div></dl>
          <Link href="/hakkimizda">Mesleki profili inceleyin <b>↗</b></Link>
        </div>
        <div className="home-lawyer-photo"><Image src="/ruslana-pasecinic-portre.jpg" alt="Avukat Ruslana Pasecinic" fill sizes="(max-width: 980px) 100vw, 46vw" /></div>
      </section>
      <section className="home-reasons" aria-labelledby="home-reasons-title">
        <header><span>02</span><div><p>Çalışma ilkeleri</p><h2 id="home-reasons-title">Hukuki desteğin temeli,<br /><em>güven ve açıklıktır.</em></h2></div><p>Her dosyada doğrudan iletişim, anlaşılır bilgi ve somut olayın koşullarına göre şekillenen dikkatli bir çalışma esastır.</p></header>
        <div className="reason-grid"><article><span>01</span><h3>Doğrudan iletişim</h3><p>Süreci, olası riskleri ve izlenecek adımları dosyanızı takip eden avukatla doğrudan görüşürsünüz.</p></article><article><span>02</span><h3>Dört dilde çalışma</h3><p>Türkçe, Rusça, İngilizce ve Romence iletişim sayesinde hukuki süreç sizin için anlaşılır kalır.</p></article><article><span>03</span><h3>Dosyaya özel yaklaşım</h3><p>Belgeleriniz, hedefleriniz ve dosyanın kendine özgü riskleri birlikte değerlendirilir.</p></article><article><span>04</span><h3>Yerel bilgi, sınır ötesi bakış</h3><p>Türkiye hukukuna ilişkin süreçler, yabancı müvekkillerin uluslararası bağlantıları da dikkate alınarak ele alınır.</p></article></div>
      </section>
      <HomeInsights />
      <SiteFooter />
    </main>
  );
}
