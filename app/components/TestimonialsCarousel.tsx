"use client";

import { useState } from "react";
import { useSiteLanguage } from "./LanguageProvider";

const googleMapsHref = "https://www.google.com/maps/place/%D0%90%D0%B4%D0%B2%D0%BE%D0%BA%D0%B0%D1%82+Avukat+Lawyer+Ruslana+Pasecinic/@36.8901531,30.6983124,17z/data=!4m8!3m7!1s0x14c38f05426f6c4d:0x2fc5d2d7c632aaff!8m2!3d36.8901531!4d30.6983124!9m1!1b1!16s%2Fg%2F11lrfz2hpn";

const content = {
  tr: {
    kicker: "Müvekkil deneyimleri",
    title: "Güven, paylaşılan deneyimlerle görünür olur.",
    rating: "5 yıldız",
    open: "Google Haritalar’da görüntüle",
    previous: "Önceki yorumu göster",
    next: "Sonraki yorumu göster",
    reviews: [
      { author: "Elif Ely", text: "Dürüst Profesyonel çok ilgili, çözüm odaklı avukat arayan herkese..." },
      { author: "Евгения Костенко", text: "Хочу щиро подякувати Руслані за професійну допомогу та підтримку." },
      { author: "mark silakov", text: "Все прозрачно, конкретно и ясно!" },
    ],
  },
  ru: {
    kicker: "Опыт доверителей",
    title: "Доверие становится заметным благодаря опыту клиентов.",
    rating: "5 звёзд",
    open: "Посмотреть в Google Картах",
    previous: "Показать предыдущий отзыв",
    next: "Показать следующий отзыв",
    reviews: [
      { author: "Elif Ely", text: "Dürüst Profesyonel çok ilgili, çözüm odaklı avukat arayan herkese..." },
      { author: "Евгения Костенко", text: "Хочу щиро подякувати Руслані за професійну допомогу та підтримку." },
      { author: "mark silakov", text: "Все прозрачно, конкретно и ясно!" },
    ],
  },
  en: {
    kicker: "Client experiences",
    title: "Trust becomes visible through shared experience.",
    rating: "5 stars",
    open: "View on Google Maps",
    previous: "Show previous review",
    next: "Show next review",
    reviews: [
      { author: "Elif Ely", text: "Dürüst Profesyonel çok ilgili, çözüm odaklı avukat arayan herkese..." },
      { author: "Евгения Костенко", text: "Хочу щиро подякувати Руслані за професійну допомогу та підтримку." },
      { author: "mark silakov", text: "Все прозрачно, конкретно и ясно!" },
    ],
  },
  ro: {
    kicker: "Experiențele clienților",
    title: "Încrederea devine vizibilă prin experiențele împărtășite.",
    rating: "5 stele",
    open: "Vedeți pe Google Maps",
    previous: "Afișați recenzia precedentă",
    next: "Afișați recenzia următoare",
    reviews: [
      { author: "Elif Ely", text: "Dürüst Profesyonel çok ilgili, çözüm odaklı avukat arayan herkese..." },
      { author: "Евгения Костенко", text: "Хочу щиро подякувати Руслані за професійну допомогу та підтримку." },
      { author: "mark silakov", text: "Все прозрачно, конкретно и ясно!" },
    ],
  },
} as const;

export default function TestimonialsCarousel() {
  const { language } = useSiteLanguage();
  const copy = content[language];
  const [active, setActive] = useState(0);
  const total = copy.reviews.length;
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
          const review = copy.reviews[reviewIndex];
          const isActive = position === 1;
          return (
            <article className={`testimonial-card ${isActive ? "is-active" : "is-side"}`} aria-hidden={!isActive} key={`${language}-${review.author}`}>
              <div className="testimonial-stars" aria-label={copy.rating}>★★★★★</div>
              <blockquote>{review.text}</blockquote>
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
