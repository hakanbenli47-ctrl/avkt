import Image from "next/image";
import Link from "next/link";
import HomeInsights from "./components/HomeInsights";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import { practiceAreas } from "../lib/content";

const processSteps = [
  { no: "01", title: "İlk değerlendirme", text: "Hukuki mesele, mevcut belgeler ve ulaşılmak istenen sonuç birlikte değerlendirilir." },
  { no: "02", title: "Yol haritası", text: "Uygulanabilecek hukuki yollar, olası riskler ve izlenecek adımlar açık biçimde aktarılır." },
  { no: "03", title: "Sürecin takibi", text: "Başvuru, sözleşme, müzakere veya dava süreci doğrudan avukat tarafından takip edilir." },
];

export default function Home() {
  return (
    <main className="professional-home">
      <SiteHeader />

      <section className="pro-hero">
        <Image src="/justice.jpg" alt="Adalet heykeli ve hukuk kitapları" fill priority sizes="100vw" />
        <div className="pro-hero-shade" />
        <div className="pro-hero-copy">
          <p>Antalya · Türkiye</p>
          <h1>Türkiye’de yabancılar için<br /><em>çok dilli hukuk hizmetleri</em></h1>
          <span>Gayrimenkul, göç, vatandaşlık, ticaret, aile ve uyuşmazlık süreçlerinde Türkçe, Rusça, İngilizce ve Romence hukuki destek.</span>
          <div><Link href="/faaliyetlerimiz">Faaliyet alanları</Link><Link href="/iletisim">İletişim</Link></div>
        </div>
        <div className="pro-hero-signature"><small>Avukat</small><strong>Ruslana Pasecinic</strong><span>Antalya Barosu</span></div>
      </section>

      <section className="pro-credentials" aria-label="Mesleki bilgiler">
        <div><strong>2018</strong><span>Antalya Barosu’na kayıt</span></div>
        <div><strong>04</strong><span>Çalışma dili</span></div>
        <div><strong>06</strong><span>Temel faaliyet alanı</span></div>
        <div><strong>TR</strong><span>Türkiye bağlantılı süreçler</span></div>
      </section>

      <section className="pro-about" aria-labelledby="pro-about-title">
        <div className="pro-about-photo"><Image src="/ruslana-pasecinic-portre.jpg" alt="Avukat Ruslana Pasecinic" fill sizes="(max-width: 900px) 100vw, 43vw" /></div>
        <div className="pro-about-copy">
          <p className="pro-kicker">Avukat hakkında</p>
          <h2 id="pro-about-title">Hukuki süreçte<br /><em>doğrudan iletişim.</em></h2>
          <h3>Av. Ruslana Pasecinic</h3>
          <p>Türkiye’de yaşayan, yatırım yapan ve iş kuran yabancıların hukuki meselelerini; müvekkilin dili, hedefleri ve dosyanın somut koşulları çerçevesinde takip eder.</p>
          <p>Çalışmanın temelinde hukuki durumun anlaşılır biçimde açıklanması, risklerin önceden değerlendirilmesi ve sürecin her aşamasında doğrudan iletişim yer alır.</p>
          <ul><li>Türkçe</li><li>Русский</li><li>English</li><li>Română</li></ul>
          <Link href="/hakkimizda">Mesleki profili inceleyin <span>→</span></Link>
        </div>
      </section>

      <section className="pro-practice" aria-labelledby="pro-practice-title">
        <header><p className="pro-kicker">Faaliyet alanları</p><h2 id="pro-practice-title">Türkiye’deki hukuki ihtiyaçlarınız için<br /><em>kapsamlı çalışma alanları</em></h2><span>Özel kişiler ve şirketler için danışmanlık, işlem takibi ve uyuşmazlık yönetimi.</span></header>
        <div className="pro-practice-grid">
          {practiceAreas.map((area) => <Link href="/faaliyetlerimiz" key={area.no}><span>{area.no}</span><div><h3>{area.title}</h3><p>{area.text}</p></div><b>→</b></Link>)}
        </div>
        <Link className="pro-all-services" href="/faaliyetlerimiz">Tüm faaliyet alanlarını inceleyin <span>→</span></Link>
      </section>

      <section className="pro-approach" aria-labelledby="pro-approach-title">
        <div className="pro-approach-heading"><p className="pro-kicker">Çalışma biçimi</p><h2 id="pro-approach-title">Her dosyada açık,<br /><em>ölçülü ve dikkatli süreç.</em></h2></div>
        <div className="pro-process">{processSteps.map((step) => <article key={step.no}><span>{step.no}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
      </section>

      <section className="pro-values">
        <div><span>01</span><h3>Doğrudan iletişim</h3><p>Dosyanızı takip eden avukatla doğrudan görüşür, gelişmeleri kendi dilinizde öğrenirsiniz.</p></div>
        <div><span>02</span><h3>Gizlilik</h3><p>Paylaşılan bilgiler ve dosya kapsamı mesleki gizlilik ilkesiyle ele alınır.</p></div>
        <div><span>03</span><h3>Uluslararası bakış</h3><p>Türkiye hukukuna ilişkin süreçler, yabancı müvekkillerin sınır ötesi bağlantılarıyla birlikte değerlendirilir.</p></div>
      </section>

      <HomeInsights />

      <section className="pro-contact-band">
        <div><p>Hukuki durumunuzu görüşmek için</p><h2>İletişime geçin.</h2></div>
        <Link href="/iletisim">İletişim bilgileri <span>→</span></Link>
      </section>
      <SiteFooter />
    </main>
  );
}
