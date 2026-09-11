"use client";

import { useState } from "react";
import { useSiteLanguage } from "./LanguageProvider";

const googleMapsHref = "https://www.google.com/maps/place/%D0%90%D0%B4%D0%B2%D0%BE%D0%BA%D0%B0%D1%82+Avukat+Lawyer+Ruslana+Pasecinic/@36.8901531,30.6983124,17z/data=!4m8!3m7!1s0x14c38f05426f6c4d:0x2fc5d2d7c632aaff!8m2!3d36.8901531!4d30.6983124!9m1!1b1!16s%2Fg%2F11lrfz2hpn";

const googleReviews = [
  { author: "Elif Ely", text: "Dürüst, profesyonel, çok ilgili ve çözüm odaklı. Avukat arayan herkese gönül rahatlığıyla tavsiye ederim." },
  { author: "Евгения Костенко", text: "Хочу щиро подякувати Руслані за професійну допомогу та підтримку." },
  { author: "mark silakov", text: "Все прозрачно, конкретно и ясно!" },
  {
    author: "Erdal Karasoylu",
    text: `Avukat Ruslana Hanım, Avustralya ile Antalya arasındaki boşanma davamı büyük bir titizlikle takip ederek sürecin sorunsuz tamamlanmasını sağladı. Özverili çalışmaları için teşekkür ederim.`,
  },
  {
    author: "Helen07",
    text: `Uzun süredir tanıdığım, dürüstlüğüne ve mesleki yaklaşımına güvenebileceğiniz bir avukat. Pek çok konuda beni sabırla bilgilendirdi ve yol gösterdi. Kendisine teşekkür ediyor, başarılarının devamını diliyorum.`,
  },
  {
    author: "Elena Udoviko",
    text: `İyi ki kendisine başvurmuşum. Bilgili, profesyonel ve son derece ilgili bir avukat. Her şeyi açık, anlaşılır ve net bir şekilde anlatıyor, detaylara önem veriyor ve güven veriyor. Ayrıca iletişimi çok güzel ve son derece samimi bir insan. Profesyonelliği ve insani yaklaşımı için çok teşekkür ederim!`,
  },
  {
    author: "tuncer sönen",
    text: `Ruslana hanım hem hukuki bilgi ve birikimi, hem birden fazla dile ilişkin yetkinliği, hem mahkemeler nezdinde bilirkişiliği ve yeminli tercümanlık hizmetleri vermesi ve hem de dosyalardaki titizliği ve takipçiliği özellikleriyle Antalya'da öne çıkan avukatlardandır. Çözüm odaklı yaklaşımı, tecrübesi ve multidisipliner çalışması ile güvenebileceğiniz ve endişesiz çalışabileceğiniz başarılı bir avukattır.`,
  },
  {
    author: "Reo Kurumsal",
    text: `Reo Tesis Yönetimi olarak hukuki süreçlerimizde kendisinden destek aldığımız, alanında bilgili, çözüm odaklı ve güvenilir bir avukat. Süreçleri titizlikle takip etmesi, hızlı geri dönüşleri ve profesyonel yaklaşımı bizim için oldukça değerli. Özellikle site ve apartman yönetimleriyle ilgili hukuki konularda kendisini gönül rahatlığıyla tavsiye ediyoruz. İş birliğimizden son derece memnunuz.`,
  },
  {
    author: "Oktay ÇELİK",
    text: `İşini gerçekten bilen, güvenilir ve çözüm odaklı bir avukat. Süreç boyunca her konuda detaylı bilgilendirme yaptı ve sorularımıza hızlı bir şekilde dönüş sağladı. Profesyonelliği, ilgisi ve yaklaşımı sayesinde kendimizi güvende hissettik. Hukuki destek arayan herkese gönül rahatlığıyla tavsiye ederim.`,
  },
  { author: "Süleyman Kullar", text: `İşinde uzman, dürüst ve çalışkan. Güvenle çalışabilirsiniz.` },
  {
    author: "Muhammet Kaçmaz",
    text: `Bugüne kadar tanıdığım cesur, azimli, çalışkan, açık sözlü ve dürüst avukatlardan biridir. Olmaz denilen davalarımızı sonuçlandırıp bize sağladığı katkılar için ne kadar teşekkür etsek azdır. Antalya için büyük bir değer olduğunu düşünüyor, başarılarının devamını diliyorum.`,
  },
  {
    author: "Murat Yagiz",
    text: `Otomatik kapı sektöründe hizmet vermekte olan şirketimizin hukuki süreçlerinde Sayın Ruslana Hanım ile çalışma fırsatımız oldu. Kendisinin etkin ve hızlı çözümleriyle bizlere çok faydası oldu. Bu bağlamda çok teşekkür eder, başarılarının devamını dileriz.`,
  },
  {
    author: "Maria Varici",
    text: `Am cunoscut-o pe doamna Ruslana în urmă cu aproximativ 6 ani, prin intermediul Consulatului Onorific al Republicii Moldova. La acea vreme, dânsa s-a ocupat de procesul meu de divorț și m-a ajutat să finalizez divorțul. Am fost foarte mulțumită de colaborarea cu dânsa. De atunci, ori de câte ori am avut nevoie de ajutor sau un sfat în probleme juridice, m-a ajutat întotdeauna cu multă răbdare.

De asemenea, m-a ajutat în procesul de căsătorie cu un cetățean turc. S-a ocupat de toate documentele și procedurile oficiale, de toate „hârtiile și actele” necesare.

Anul trecut, din păcate, am fost dusă la un Centru de Reținere și Expulzare. Datorită tuturor eforturilor doamnei Ruslana, după aproximativ o lună și jumătate am reușit să mă întorc la copiii mei. A reușit să anuleze decizia de deportare, iar acum pot rămâne în Turcia fără probleme.

În plus, pașaportul copilului meu, care nu este cetățean turc, expirase. După multe dificultăți, am reușit să depunem cererea pentru un nou pașaport. Fiind un avocat care vorbește mai multe limbi, doamna Ruslana poate ajuta foarte bine persoane de diferite naționalități.

Vreau să îi mulțumesc din suflet pentru tot ajutorul oferit. O recomand cu toată încrederea tuturor celor care au nevoie de un avocat serios și de încredere.`,
  },
  {
    author: "NATA S",
    text: `Добрый день всем!

С Русланой я познакомилась ещё в пандемию, в списке адвокатов при консульстве. Тогда она помогла моей подруге — была защитником в суде и выиграла дело. Подругу оправдали.

В этом году помощь понадобилась уже мне. Мой молодой человек попал в беду, а его семья отказалась от услуг любых адвокатов. Но для меня это не стало преградой.

Всё, о чём я просила Руслану, она выполнила на высшем профессиональном уровне. Она вылетела в другой город, пришла на встречу в тюрьму, подготовила все необходимые документы. К сожалению, нашу помощь в итоге не приняли.

Но я безмерно благодарна Руслане за её профессионализм, человечность и женскую солидарность. Рекомендую её всем как очень сильного и порядочного адвоката.`,
  },
  {
    author: "Batyrzhan Smakov",
    text: `Руслана Викторовна - компетентный и грамотный специалист. Доверяем и благодарим за помощь! 👍👍👍 …`,
  },
  {
    author: "Алекс П",
    text: `Давно сотрудничаю с Русланой. Отличный человек и прекрасный адвокат. Вопросы решает быстро и качественно. Искренне рекомендую.`,
  },
  {
    author: "Орлова Мария",
    text: `Хочу выразить огромную благодарность Руслане за помощь с оформлением ВНЖ! ❤️ Обращаюсь к ней уже второй раз, и оба раза всё прошло успешно — ВНЖ одобрили. Руслана всегда на связи, подробно объясняет каждый этап, помогает с документами и отвечает на все возникающие вопросы. Очень приятно работать с человеком, которому действительно можно доверить такой важный вопрос. Спасибо за профессионализм и поддержку! 🙏🏼❤️`,
  },
  {
    author: "Jim Apker",
    text: `Ruslana has been my lawyer for 6 years and I have never been disappointed in her services. She is experienced, a hard worker, and always very professional. Ruslana has earned my trust again and again, and I would highly recommend her to anyone in need of legal services.`,
  },
] as const;

const content = {
  tr: {
    kicker: "Müvekkil yorumları",
    title: "Hizmet alanların deneyimleri.",
    rating: "5 yıldız",
    open: "Google Haritalar’da görüntüle",
    previous: "Önceki yorumu göster",
    next: "Sonraki yorumu göster",
  },
  ru: {
    kicker: "Опыт доверителей",
    title: "Доверие становится заметным благодаря опыту клиентов.",
    rating: "5 звёзд",
    open: "Посмотреть в Google Картах",
    previous: "Показать предыдущий отзыв",
    next: "Показать следующий отзыв",
  },
  en: {
    kicker: "Client experiences",
    title: "Trust becomes visible through shared experience.",
    rating: "5 stars",
    open: "View on Google Maps",
    previous: "Show previous review",
    next: "Show next review",
  },
  ro: {
    kicker: "Experiențele clienților",
    title: "Încrederea devine vizibilă prin experiențele împărtășite.",
    rating: "5 stele",
    open: "Vedeți pe Google Maps",
    previous: "Afișați recenzia precedentă",
    next: "Afișați recenzia următoare",
  },
} as const;

export default function TestimonialsCarousel() {
  const { language } = useSiteLanguage();
  const copy = content[language];
  const [active, setActive] = useState(0);
  const total = googleReviews.length;
  const previous = (active - 1 + total) % total;
  const next = (active + 1) % total;
  const visible = [previous, active, next];

  const move = (direction: -1 | 1) => setActive((current) => (current + direction + total) % total);

  return (
    <section className="testimonials-section" aria-labelledby="testimonials-title" data-no-translate>
      <header>
        <div>
          <span>{copy.kicker}</span>
          <h2 id="testimonials-title">{copy.title}</h2>
        </div>
      </header>
      <div className="testimonials-stage" aria-live="polite">
        {visible.map((reviewIndex, position) => {
          const review = googleReviews[reviewIndex];
          const isActive = position === 1;
          return (
            <article className={`testimonial-card ${isActive ? "is-active" : "is-side"}`} aria-hidden={!isActive} key={`${reviewIndex}-${review.author}`}>
              <div className="testimonial-stars" aria-label={copy.rating}>★★★★★</div>
              <blockquote tabIndex={isActive ? 0 : -1}>{review.text}</blockquote>
              <footer><strong>{review.author}</strong><a href={googleMapsHref} target="_blank" rel="noreferrer" tabIndex={isActive ? 0 : -1}>{copy.open}<span aria-hidden="true">↗</span></a></footer>
            </article>
          );
        })}
      </div>
      <div className="testimonials-controls">
        <button type="button" onClick={() => move(-1)} aria-label={copy.previous}><span aria-hidden="true">←</span></button>
        <span>{String(active + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        <button type="button" onClick={() => move(1)} aria-label={copy.next}><span aria-hidden="true">→</span></button>
      </div>
    </section>
  );
}
