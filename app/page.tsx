import Image from "next/image";
import Link from "next/link";
import HeroSlider from "./components/HeroSlider";
import HomeInsights from "./components/HomeInsights";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <HeroSlider />

      <section className="brand-ribbon" aria-label="Çalışma yaklaşımı">
        <span>Hukuki öngörü</span><i>✦</i><span>Çok dilli iletişim</span><i>✦</i><span>Uluslararası bakış</span><i>✦</i><span>Yerel tecrübe</span>
      </section>

      <section className="home-statement">
        <div className="statement-code"><span>01</span><small>Yaklaşım</small></div>
        <p>Advocat in Türkiye · Antalya</p>
        <h2>Yabancı olduğunuz bir ülkede,<br />hukuki süreç <em>yabancı kalmasın.</em></h2>
        <div><span>Av. Ruslana Pasecinic; Türkiye’de yaşayan, yatırım yapan ve iş kuran yabancıların hukuki meselelerini dört dilde, doğrudan ve özenle takip eder.</span><Link href="/hakkimizda">Hakkımızda <b>↗</b></Link></div>
      </section>

      <section className="home-portals">
        <Link href="/faaliyetlerimiz" className="portal-card"><Image src="/law-library.jpg" alt="Hukuk kütüphanesi" fill loading="eager" sizes="(max-width: 980px) 100vw, 40vw" /><div /><span>01</span><h2>Faaliyetlerimiz</h2><p>Gayrimenkulden ticarete, göçten mirasa uzanan çok yönlü hukuk hizmetleri.</p><b>İnceleyin ↗</b></Link>
        <Link href="/hakkimizda" className="portal-card"><Image src="/ruslana-pasecinic-portre.jpg" alt="Avukat Ruslana Pasecinic" fill sizes="(max-width: 980px) 100vw, 34vw" /><div /><span>02</span><h2>Hakkımızda</h2><p>Doğrudan iletişim, çok dilli çalışma ve dosyaya özel hukuki yaklaşım.</p><b>Tanıyın ↗</b></Link>
        <Link href="/yazilar" className="portal-card"><Image src="/antalya-architecture.jpg" alt="Antalya tarihi mimarisi" fill sizes="(max-width: 980px) 100vw, 30vw" /><div /><span>03</span><h2>Blog</h2><p>Türkiye’de yaşam, yatırım ve iş için anlaşılır güncel hukuk yazıları.</p><b>Okuyun ↗</b></Link>
      </section>

      <section className="home-reasons" aria-labelledby="home-reasons-title">
        <header>
          <span>02</span>
          <div><p>Neden tercih ediliyoruz?</p><h2 id="home-reasons-title">Hukuki desteğin temeli,<br /><em>güven ve açıklıktır.</em></h2></div>
          <p>Her dosyada doğrudan iletişim, anlaşılır bilgi ve somut olayın koşullarına göre şekillenen dikkatli bir çalışma esastır.</p>
        </header>
        <div className="reason-grid">
          <article><span>01</span><h3>Doğrudan iletişim</h3><p>Süreci, olası riskleri ve izlenecek adımları dosyanızı takip eden avukatla doğrudan görüşürsünüz.</p></article>
          <article><span>02</span><h3>Dört dilde çalışma</h3><p>Türkçe, Rusça, İngilizce ve Romence iletişim sayesinde hukuki süreç sizin için anlaşılır kalır.</p></article>
          <article><span>03</span><h3>Dosyaya özel yaklaşım</h3><p>Hazır kalıplar yerine belgeleriniz, hedefleriniz ve dosyanın kendine özgü riskleri birlikte değerlendirilir.</p></article>
          <article><span>04</span><h3>Yerel bilgi, sınır ötesi bakış</h3><p>Türkiye hukukuna ilişkin süreçler, yabancı müvekkillerin uluslararası bağlantıları da dikkate alınarak ele alınır.</p></article>
        </div>
      </section>

      <HomeInsights />
      <SiteFooter />
    </main>
  );
}
