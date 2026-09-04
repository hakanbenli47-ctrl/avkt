"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSiteLanguage } from "./LanguageProvider";

export const consentStorageKey = "advocat-cookie-consent-v1";
export const consentEventName = "advocat:cookie-consent";
export const openConsentEventName = "advocat:open-cookie-settings";

type ConsentChoice = "accepted" | "rejected";

const copy = {
  tr: {
    eyebrow: "GİZLİLİK VE VERİ KORUMA",
    title: "Çerez Politikası",
    text: "İnternet sitemizin güvenli ve etkin biçimde çalışmasını sağlamak, tercihlerinizi hatırlamak ve ziyaretçilerin siteyi nasıl kullandığını anonim istatistikler üzerinden anlayarak hizmetlerimizi geliştirmek amacıyla çerezlerden yararlanıyoruz. Zorunlu çerezler sitenin çalışması için gereklidir; analitik çerezler ise yalnızca açık rızanızla kullanılır. Tercihinizi dilediğiniz zaman Çerez ve Gizlilik Politikası sayfasından değiştirebilirsiniz.",
    reject: "Reddet",
    accept: "Kabul Et",
    policy: "Çerez ve Gizlilik Politikası",
  },
  en: {
    eyebrow: "PRIVACY AND DATA PROTECTION",
    title: "Cookie Policy",
    text: "We use cookies to ensure that our website operates securely and effectively, remember your preferences, and improve our services by understanding how visitors use the site through anonymous statistics. Essential cookies are required for the website to function; analytics cookies are used only with your explicit consent. You may change your choice at any time on the Cookie and Privacy Policy page.",
    reject: "Reject",
    accept: "Accept",
    policy: "Cookie and Privacy Policy",
  },
  ru: {
    eyebrow: "КОНФИДЕНЦИАЛЬНОСТЬ И ЗАЩИТА ДАННЫХ",
    title: "Политика использования файлов cookie",
    text: "Мы используем файлы cookie для безопасной и эффективной работы сайта, сохранения ваших предпочтений и улучшения наших услуг на основе анонимной статистики использования сайта. Обязательные файлы cookie необходимы для работы сайта, а аналитические используются только с вашего явного согласия. Вы можете изменить свой выбор в любое время на странице Политики cookie и конфиденциальности.",
    reject: "Отклонить",
    accept: "Принять",
    policy: "Политика cookie и конфиденциальности",
  },
  ro: {
    eyebrow: "CONFIDENȚIALITATE ȘI PROTECȚIA DATELOR",
    title: "Politica privind cookie-urile",
    text: "Utilizăm module cookie pentru funcționarea sigură și eficientă a site-ului, pentru memorarea preferințelor și pentru îmbunătățirea serviciilor noastre pe baza unor statistici anonime privind utilizarea site-ului. Cookie-urile esențiale sunt necesare funcționării site-ului, iar cele analitice sunt utilizate numai cu acordul dumneavoastră explicit. Vă puteți modifica oricând opțiunea din pagina Politica de cookie și confidențialitate.",
    reject: "Respinge",
    accept: "Acceptă",
    policy: "Politica de cookie și confidențialitate",
  },
};

export default function CookieConsent() {
  const pathname = usePathname();
  const { language } = useSiteLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    const timer = window.setTimeout(() => setVisible(!window.localStorage.getItem(consentStorageKey)), 0);
    const open = () => setVisible(true);
    window.addEventListener(openConsentEventName, open);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(openConsentEventName, open);
    };
  }, [pathname]);

  function choose(choice: ConsentChoice) {
    window.localStorage.setItem(consentStorageKey, choice);
    if (choice === "rejected") {
      window.localStorage.removeItem("advocat-visitor-id-v1");
      window.sessionStorage.removeItem("advocat-session-id-v1");
      window.sessionStorage.removeItem("advocat-session-start-v1");
      window.sessionStorage.removeItem("advocat-entry-path-v1");
      window.sessionStorage.removeItem("advocat-pageviews-v1");
    }
    window.dispatchEvent(new CustomEvent(consentEventName, { detail: choice }));
    setVisible(false);
  }

  if (!visible || pathname.startsWith("/admin")) return null;
  const content = copy[language];
  return (
    <aside className="cookie-consent" role="dialog" aria-label={content.title} aria-live="polite">
      <div className="cookie-consent-copy"><span>{content.eyebrow}</span><h2>{content.title}</h2><p>{content.text}</p><Link href="/cerez-ve-gizlilik">{content.policy} ↗</Link></div>
      <div className="cookie-consent-actions"><button type="button" className="cookie-reject" onClick={() => choose("rejected")}>{content.reject}</button><button type="button" className="cookie-accept" onClick={() => choose("accepted")}>{content.accept}</button></div>
    </aside>
  );
}
