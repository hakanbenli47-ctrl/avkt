import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "Hakkımızda | Av. Ruslana Pasecinic",
  description: "Antalya Barosu avukatı Ruslana Pasecinic'in mesleki biyografisi ve çok dilli hukuk hizmetleri.",
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
        <div className="about-hero-image"><Image src="/ruslana-pasecinic-portre.jpg" alt="Avukat Ruslana Pasecinic" fill priority sizes="(max-width: 980px) 100vw, 50vw" /></div>
        <div className="about-hero-copy"><p>Hakkımızda</p><h1>Hukuki güven,<br /><em>anlaşılır iletişimle başlar.</em></h1><div><strong>Av. Ruslana Pasecinic</strong><span>Antalya Barosu · 2018</span></div></div>
      </section>
      <section className="about-narrative">
        <article className="about-story-static">
          <h2>Biyografi</h2>
          <div className="about-story-copy">
            <p className="dropcap">Av. Ruslana Pasecinic, Antalya Barosu’na kayıtlı olarak Türkiye bağlantılı özel ve ticari hukuk meselelerinde hukuki danışmanlık ve temsil hizmeti sunmaktadır.</p>
            <p>Mesleki çalışmaları; Türkiye’de yaşayan, çalışan, yatırım yapan, iş kuran veya geçici olarak bulunan yabancıların karşılaştığı hukuki süreçlere odaklanır. Gayrimenkul, göç ve vatandaşlık, şirketler ve ticaret, aile ve miras ile dava ve uyuşmazlık alanlarında dosyanın somut koşullarına göre çalışır.</p>
            <p>Türkçe, Rusça, İngilizce ve Romence iletişim kurabilmesi, yabancı müvekkillerin hukuki süreci kendi dillerinde ve açık biçimde takip edebilmesine imkân sağlar.</p>
            <p>Çalışma yaklaşımında doğrudan iletişim, dikkatli dosya incelemesi, risklerin önceden değerlendirilmesi ve mesleki gizlilik temel ilkeleri oluşturur.</p>
          </div>
        </article>
      </section>
      <section className="about-record"><div><span>2018</span><p>Antalya Barosu’na katılım</p></div><div><span>04</span><p>Çalışma dili</p></div><div><span>TR</span><p>Türkiye bağlantılı dosyalar</p></div></section>
      <section className="about-principles">{principles.map((principle) => <article key={principle.no}><Link href={principle.href}><span>{principle.no}</span><h2>{principle.title}</h2><p>{principle.text}</p><strong>{principle.cta}<i aria-hidden="true">↗</i></strong></Link></article>)}</section>
      <SiteFooter />
    </main>
  );
}