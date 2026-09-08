import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

export const metadata = {
  title: "Sık Sorulan Sorular",
  description: "Türkiye'deki hukuki danışmanlık ve temsil süreçleri hakkında sık sorulan sorular.",
};

const questions = [
  { question: "İlk görüşme için hangi bilgi ve belgeler gerekir?", answer: "Gerekli belge listesi hukuki konuya göre değişir. İlk görüşme öncesinde mevcut sözleşme, resmi yazışma, karar, kimlik veya işlem belgesinin paylaşılması, ön değerlendirmeyi kolaylaştırır." },
  { question: "Hangi dillerde hukuki hizmet sunulmaktadır?", answer: "Türkçe, Rusça, İngilizce ve Romence iletişim kurulabilir." },
  { question: "Türkiye dışında bulunan kişiler danışmanlık alabilir mi?", answer: "Evet. Dosyanın niteliğine göre ilk değerlendirme ve süreç takibi çevrim içi iletişimle yürütülebilir. Vekâletname veya fiziki işlem gerektiren aşamalar ayrıca açıklanır." },
  { question: "Bir hukuki sürecin ne kadar süreceği önceden bilinebilir mi?", answer: "Her dosyanın süresi; uyuşmazlığın niteliğine, görevli kurumlara, belge durumuna ve karşı tarafın işlemlerine göre değişir. İlk inceleme sonrasında tahmini süreç ve aşamalar paylaşılır." },
  { question: "Avukatlık ücreti nasıl belirlenir?", answer: "Ücret; işin kapsamı, hukuki sürecin türü, dosyanın gerektirdiği çalışma ve masraflar değerlendirilerek belirlenir. Kapsam ve ücretlendirme, işe başlanmadan önce açıklanır." },
  { question: "Paylaşılan bilgi ve belgeler gizli tutulur mu?", answer: "Evet. Müvekkil tarafından paylaşılan bilgi, belge ve kişisel veriler mesleki gizlilik ve sır saklama yükümlülüğü çerçevesinde korunur." },
];

export default function FrequentlyAskedQuestionsPage() {
  return (
    <main>
      <SiteHeader />
      <section className="faq-page" aria-labelledby="faq-title">
        <div className="faq-shell">
          <header className="faq-heading">
            <span aria-hidden="true">01 — 06</span>
            <h1 id="faq-title">Sık Sorulan Sorular</h1>
            <i aria-hidden="true" />
          </header>
          <div className="faq-list">
            {questions.map((item, index) => (
              <details key={item.question}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{item.question}</strong>
                  <i aria-hidden="true">+</i>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}