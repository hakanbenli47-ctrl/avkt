import Image from "next/image";
import Link from "next/link";
import { articles } from "../lib/content";
import HeroSlider from "./components/HeroSlider";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";

export default function Home() {
  return (
    <main>
      <SiteHeader overlay />
      <HeroSlider />

      <section className="home-statement">
        <p>Advocat in Türkiye</p>
        <h2>Yabancı olduğunuz bir ülkede,<br />hukuki süreç <em>yabancı kalmasın.</em></h2>
        <div><span>Av. Ruslana Pasecinic; Türkiye’de yaşayan, yatırım yapan ve iş kuran yabancıların hukuki meselelerini dört dilde, doğrudan ve özenle takip eder.</span><Link href="/avukat-ruslana-pasecinic">Avukat hakkında <b>↗</b></Link></div>
      </section>

      <section className="home-portals">
        <Link href="/calisma-alanlari" className="portal-card"><Image src="/law-library.jpg" alt="Hukuk kütüphanesi" fill /><div /><span>01</span><h2>Çalışma<br />Alanları</h2><p>Gayrimenkulden ticarete, göçten mirasa uzanan çok yönlü hukuk hizmetleri.</p><b>İnceleyin ↗</b></Link>
        <Link href="/avukat-ruslana-pasecinic" className="portal-card"><Image src="/ruslana-pasecinic.jpg" alt="Avukat Ruslana Pasecinic" fill /><div /><span>02</span><h2>Avukat</h2><p>Doğrudan iletişim, çok dilli çalışma ve dosyaya özel hukuki yaklaşım.</p><b>Tanıyın ↗</b></Link>
        <Link href="/yazilar" className="portal-card"><Image src="/antalya-architecture.jpg" alt="Antalya tarihi mimarisi" fill /><div /><span>03</span><h2>Hukuk<br />Notları</h2><p>Türkiye’de yaşam, yatırım ve iş için anlaşılır güncel hukuk yazıları.</p><b>Okuyun ↗</b></Link>
      </section>

      <section className="home-insights">
        <header><div><p>Son hukuk notları</p><h2>Güncel meseleler,<br /><em>açık anlatımla.</em></h2></div><Link href="/yazilar">Tüm yazılar ↗</Link></header>
        <div>{articles.slice(0, 3).map((article, index) => <Link href={`/yazilar/${article.slug}`} key={article.slug}><span>0{index + 1}</span><p>{article.category}</p><h3>{article.title}</h3><small>{article.date} · {article.readTime}</small></Link>)}</div>
      </section>
      <SiteFooter />
    </main>
  );
}
