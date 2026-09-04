import Image from "next/image";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "Hakkımızda | Av. Ruslana Pasecinic",
  description: "Antalya Barosu avukatı Ruslana Pasecinic'in çalışma yaklaşımı ve çok dilli hukuk hizmetleri.",
};

const principles = [
  { no: "01", title: "Doğrudan iletişim", text: "Dosyanın her aşamasında avukatla doğrudan ve kendi dilinizde iletişim." },
  { no: "02", title: "Özenli inceleme", text: "Hazır şablonlar yerine olayın kendisine ve belgelere dayanan değerlendirme." },
  { no: "03", title: "Çok yönlü bakış", text: "Türkiye hukuku ile sınır ötesi sonuçları birlikte ele alan dosya yönetimi." },
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
        <aside><span>Türkiye’de hukuk,<br />kendi dilinizde.</span><small>Türkçe · Русский · English · Română</small></aside>
        <article>
          <p className="dropcap">Hukuki bir mesele, kişinin bilmediği bir ülkede ve yabancı bir dilde yürüdüğünde olduğundan daha karmaşık görünebilir. Av. Ruslana Pasecinic’in çalışma yaklaşımı, bu karmaşıklığı anlaşılır bir sürece dönüştürmek üzerine kuruludur.</p>
          <p>Türkiye’de yaşayan, çalışan, yatırım yapan veya burada malvarlığı bulunan yabancı müvekkillerle doğrudan iletişim kurar; dosyanın hukuki yönünü, olası riskleri ve izlenecek adımları açık biçimde aktarır.</p>
          <p>Gayrimenkul, ticaret, göç, aile, miras ve uyuşmazlık dosyalarında; farklı hukuk alanlarının birbiriyle kesiştiği noktaları birlikte değerlendirir. Amaç yalnızca işlemi tamamlamak değil, müvekkilin kararını hukuken sağlam bir zemine oturtmaktır.</p>
          <blockquote>“Müvekkilin süreci anlaması, doğru hukuki stratejinin ayrılmaz bir parçasıdır.”</blockquote>
        </article>
      </section>
      <section className="about-record"><div><span>2018</span><p>Antalya Barosu’na katılım</p></div><div><span>04</span><p>Çalışma dili</p></div><div><span>TR</span><p>Türkiye bağlantılı dosyalar</p></div></section>
      <section className="about-principles">{principles.map((principle) => <article key={principle.no}><span>{principle.no}</span><h2>{principle.title}</h2><p>{principle.text}</p></article>)}</section>
      <SiteFooter />
    </main>
  );
}
