import Image from "next/image";
import Link from "next/link";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import BiographyContent from "./BiographyContent";

export const metadata = {
  title: "Hakkımızda | Av. Ruslana Pasecinic",
  description: "Antalya Barosu avukatı Ruslana Pasecinic'in mesleki biyografisi ve çok dilli hukuk hizmetleri.",
};

const principles = [
  { no: "01", title: "Doğrudan iletişim", text: "Dosyanın her aşamasında avukatla doğrudan ve kendi dilinizde iletişim.", href: "/iletisim", cta: "İletişime geçin" },
  { no: "02", title: "Özenli inceleme", text: "Hazır şablonlar yerine olayın kendisine ve belgelere dayanan değerlendirme.", href: "/faaliyetlerimiz#faaliyet-turleri", cta: "İnceleyin" },
  { no: "03", title: "Çok yönlü bakış", text: "Türkiye hukuku ile sınır ötesi sonuçları birlikte ele alan dosya yönetimi.", href: "/faaliyetlerimiz#faaliyet-alanlari", cta: "İnceleyin" },
];
const credentials = [
  { no: "01", title: "Moldova Hukuk Diploması", src: "/credentials/moldova-hukuk-diplomasi.jpg", orientation: "portrait" },
  { no: "02", title: "Diploma Denklik Belgesi", src: "/credentials/diploma-denklik-belgesi.jpg", orientation: "portrait" },
  { no: "03", title: "Avukatlık Ruhsatnamesi", src: "/credentials/avukatlik-ruhsatnamesi.jpg", orientation: "landscape" },
  { no: "04", title: "Adli Yardım Uygulama Esasları Eğitimi", src: "/credentials/adli-yardim-egitimi-2018.jpg", orientation: "landscape" },
  { no: "05", title: "Çocuk Adalet Sistemi Eğitimi", src: "/credentials/cocuk-adalet-sistemi-2017.jpg", orientation: "landscape" },
  { no: "06", title: "Tahkimde Taraf Vekilliği Eğitimi", src: "/credentials/tahkim-taraf-vekilligi-2020.jpg", orientation: "landscape" },
  { no: "07", title: "Ceza Muhakemesi Kanunu Eğitimi", src: "/credentials/cmk-egitimi-2017.jpg", orientation: "landscape" },
  { no: "08", title: "Bilirkişilik Temel Eğitimi", src: "/credentials/bilirkisilik-temel-egitimi-2018.jpg", orientation: "landscape" },
  { no: "09", title: "Arabuluculuk Eğitimi", src: "/credentials/arabuluculuk-egitimi-2019.jpg", orientation: "landscape" },
  { no: "10", title: "Temel Arabuluculuk Eğitimi", src: "/credentials/temel-arabuluculuk-egitimi-2019.jpg", orientation: "landscape" },
  { no: "11", title: "Ceza Muhakemesinde Uzlaştırmacı Eğitimi", src: "/credentials/uzlastirmaci-egitimi-2019.jpg", orientation: "landscape" },
  { no: "12", title: "Uluslararası Mülteci Hukuku Çalıştayı", src: "/credentials/uluslararasi-multeci-hukuku-2018.jpg", orientation: "landscape" },
];
export default function AboutPage() {
  return (
    <main>
      <SiteHeader />
      <section className="about-hero">
        <div className="about-hero-image"><Image src="/ruslana-pasecinic-portre.jpg" alt="Avukat Ruslana Pasecinic" fill priority sizes="(max-width: 980px) 100vw, 50vw" /></div>
        <div className="about-hero-copy"><p>Hakkımızda</p><h1>Hukuki güven,<br /><em>anlaşılır iletişimle başlar.</em></h1><div><strong>Av. Ruslana Pasecinic</strong><span>Antalya Barosu · 2017</span></div></div>
      </section>
      <section className="about-narrative"><BiographyContent /></section>
      <section className="about-record"><div><span>2017</span><p>Antalya Barosu’na katılım</p></div><div><span>04</span><p>Çalışma dili</p></div><div><span>TR</span><p>Türkiye bağlantılı dosyalar</p></div></section>
      <section className="about-credentials" aria-labelledby="credentials-title">
        <header>
          <span>Mesleki Belgeler</span>
          <h2 id="credentials-title">Eğitim, yetkinlik ve mesleki kayıtlar.</h2>
          <p>Mesleki gelişimi ve uzmanlık çalışmalarını belgeleyen seçili kayıtlar.</p>
        </header>
        <div className="credentials-grid">
          {credentials.map((credential) => (
            <a className={`credential-card is-${credential.orientation}`} href={credential.src} target="_blank" rel="noreferrer" key={credential.src} aria-label={`${credential.title} belgesini büyük görüntüle`}>
              <span className="credential-image"><Image src={credential.src} alt={credential.title} fill sizes="(max-width: 620px) 100vw, (max-width: 980px) 50vw, 33vw" /></span>
              <span className="credential-caption"><small>{credential.no}</small><strong>{credential.title}</strong><i aria-hidden="true">↗</i></span>
            </a>
          ))}
        </div>
      </section>
      <section className="about-principles">{principles.map((principle) => <article key={principle.no}><Link href={principle.href}><span>{principle.no}</span><h2>{principle.title}</h2><p>{principle.text}</p><strong>{principle.cta}<i aria-hidden="true">↗</i></strong></Link></article>)}</section>
      <SiteFooter />
    </main>
  );
}