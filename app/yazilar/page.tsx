import { articles } from "../../lib/content";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";
import BlogFeed from "./BlogFeed";

export const metadata = {
  title: "Hukuk Notları",
  description: "Türkiye'de yaşam, yatırım ve ticaret için güncel ve anlaşılır hukuki rehberler.",
};

export default function BlogPage() {
  return (
    <main className="inner-page">
      <SiteHeader />
      <section className="blog-intro">
        <p className="section-kicker">Bilgi, doğru kararın başlangıcıdır.</p>
        <h1>Hukuku daha<br /><em>anlaşılır kılmak.</em></h1>
        <p>Türkiye’de yaşam, yatırım ve ticaret için güncel, sade ve uygulanabilir hukuk notları.</p>
      </section>
      <BlogFeed initialPosts={articles} />
      <SiteFooter />
    </main>
  );
}
