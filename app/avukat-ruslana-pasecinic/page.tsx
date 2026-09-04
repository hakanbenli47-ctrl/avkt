import Image from "next/image";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata = { title: "Av. Ruslana Pasecinic", description: "Antalya Barosu avukatı Ruslana Pasecinic hakkında." };

export default function LawyerPage() {
  return (
    <main><SiteHeader />
      <section className="lawyer-hero"><div className="lawyer-photo"><Image src="/ruslana-pasecinic-portre.jpg" alt="Avukat Ruslana Pasecinic" fill priority sizes="(max-width: 980px) 100vw, 48vw" /></div><div className="lawyer-title"><p>Avukat · Antalya Barosu</p><h1>Ruslana<br />Pasecinic</h1><span>Türkçe · Русский · English · Română</span></div></section>
      <section className="lawyer-story"><aside><span>Türkiye’de hukuk,<br />kendi dilinizde.</span></aside><article><p className="dropcap">Hukuki bir mesele, kişinin bilmediği bir ülkede ve yabancı bir dilde yürüdüğünde olduğundan daha karmaşık görünebilir. Av. Ruslana Pasecinic’in çalışma yaklaşımı, bu karmaşıklığı anlaşılır bir sürece dönüştürmek üzerine kuruludur.</p><p>Türkiye’de yaşayan, çalışan, yatırım yapan veya burada malvarlığı bulunan yabancı müvekkillerle doğrudan iletişim kurar; dosyanın hukuki yönünü, olası riskleri ve izlenecek adımları açık biçimde aktarır.</p><p>Gayrimenkul, ticaret, göç, aile, miras ve uyuşmazlık dosyalarında; farklı hukuk alanlarının birbiriyle kesiştiği noktaları birlikte değerlendirir. Amaç yalnızca işlemi tamamlamak değil, müvekkilin kararını hukuken sağlam bir zemine oturtmaktır.</p><blockquote>“Müvekkilin süreci anlaması, doğru hukuki stratejinin ayrılmaz bir parçasıdır.”</blockquote></article></section>
      <section className="lawyer-values"><div><span>01</span><h2>Doğrudan iletişim</h2><p>Dosyanın her aşamasında avukatla doğrudan ve kendi dilinizde iletişim.</p></div><div><span>02</span><h2>Özenli inceleme</h2><p>Hazır şablonlar yerine olayın kendisine ve belgelere dayanan değerlendirme.</p></div><div><span>03</span><h2>Çok yönlü bakış</h2><p>Türkiye hukuku ile sınır ötesi sonuçları birlikte ele alan dosya yönetimi.</p></div></section>
      <SiteFooter /></main>
  );
}
