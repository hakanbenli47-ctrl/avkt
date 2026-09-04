"use client";

import CookieSettingsButton from "../components/CookieSettingsButton";
import { useSiteLanguage } from "../components/LanguageProvider";
import SiteFooter from "../components/SiteFooter";
import SiteHeader from "../components/SiteHeader";

const content = {
  tr: {
    eyebrow: "ŞEFFAFLIK VE TERCİH",
    title: "Çerez ve Gizlilik Politikası",
    intro: "Bu sayfa, internet sitesinde kullanılan tarayıcı depolama teknolojilerini ve izin vermeniz hâlinde tutulan anonim ziyaret kayıtlarını açıklar.",
    updated: "Son güncelleme: 4 Eylül 2026",
    sections: [
      ["1. Veri sorumlusu ve iletişim", "Bu internet sitesi Av. Ruslana Pasecinic tarafından işletilmektedir. Gizlilik ve kişisel verilerle ilgili taleplerinizi ruslanapas@mail.ru adresine iletebilirsiniz."],
      ["2. Zorunlu tercihler", "Sitenin seçtiğiniz dili ve çerez kararınızı hatırlaması için yerel tarayıcı depolaması kullanılır. Bu kayıtlar sitenin talep ettiğiniz şekilde çalışması için gereklidir ve reklam amacıyla kullanılmaz."],
      ["3. İzne bağlı anonim analitik", "Yalnızca “Analitiğe izin ver” seçeneğini seçmeniz hâlinde anonim ziyaretçi ve oturum kimliği, giriş ve son sayfa, ziyaret başlangıcı, son hareket ve çıkış zamanı, görüntülenen sayfa sayısı, site dili, cihaz türü, tarayıcı sınıfı, yönlendiren alan adı ve barındırma altyapısının sağladığı yaklaşık ülke/şehir bilgisi kaydedilir. Ham IP adresi, ad, e-posta veya reklam profili tutulmaz."],
      ["4. Amaç ve hukuki dayanak", "Anonim ziyaret istatistikleri sitenin hangi bölümlerinin kullanıldığını anlamak, teknik sorunları görmek ve kullanıcı deneyimini iyileştirmek amacıyla, verdiğiniz açık izne dayanılarak işlenir. İzin vermemeniz sitenin temel kullanımını etkilemez."],
      ["5. Saklama ve hizmet sağlayıcılar", "Ziyaret kayıtlarının en fazla 180 gün tutulması önerilir ve süre sonunda silinmelidir. Site Vercel üzerinde barındırılır; kayıtlar Supabase veritabanında saklanır. Verinin işlendiği bölge, bu hizmetlerde seçilen proje ayarlarına bağlıdır."],
      ["6. Tercihinizi değiştirme", "Sayfanın altındaki “Çerez tercihleri” düğmesini kullanarak analitik izninizi istediğiniz zaman kabul edebilir veya geri çekebilirsiniz. Geri çekme, sonraki ziyaret kayıtlarını durdurur."],
      ["7. Haklarınız", "Kişisel verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltme veya silme isteme ve mevzuatta tanınan diğer haklarınız için yukarıdaki iletişim adresine başvurabilirsiniz."],
    ],
    storageTitle: "Kullanılan tarayıcı kayıtları",
    essential: "Zorunlu",
    analytics: "Analitik — yalnızca izinle",
    preference: "Dil ve çerez tercihi",
    anonymous: "Anonim ziyaretçi ve oturum kimlikleri",
    action: "Çerez tercihlerini yeniden aç",
  },
  en: {
    eyebrow: "TRANSPARENCY AND CHOICE",
    title: "Cookie and Privacy Policy",
    intro: "This page explains the browser storage technologies used by the website and the anonymous visit records kept if you provide permission.",
    updated: "Last updated: 4 September 2026",
    sections: [
      ["1. Data controller and contact", "This website is operated by Atty. Ruslana Pasecinic. You may send privacy and personal data requests to ruslanapas@mail.ru."],
      ["2. Essential preferences", "Local browser storage is used to remember your selected language and cookie decision. These records are necessary for the website to operate as requested and are not used for advertising."],
      ["3. Consent-based anonymous analytics", "Only when you select “Allow analytics” do we record an anonymous visitor and session ID, entry and last page, visit start, last activity and exit time, page-view count, website language, device type, browser category, referring domain and approximate country/city information supplied by the hosting infrastructure. We do not retain raw IP addresses, names, email addresses or advertising profiles."],
      ["4. Purpose and legal basis", "Anonymous visit statistics are processed on the basis of your consent to understand which parts of the website are used, identify technical issues and improve the user experience. Refusing consent does not affect essential website use."],
      ["5. Retention and service providers", "Visit records should be retained for no longer than 180 days and deleted afterwards. The website is hosted on Vercel and records are stored in a Supabase database. The processing region depends on the project settings selected for those services."],
      ["6. Changing your choice", "You can accept or withdraw analytics permission at any time by using the “Cookie preferences” button in the footer. Withdrawal stops future visit recording."],
      ["7. Your rights", "You may contact the address above to ask whether your personal data is processed, request information, correction or deletion, and exercise other rights granted by applicable law."],
    ],
    storageTitle: "Browser records used",
    essential: "Essential",
    analytics: "Analytics — with consent only",
    preference: "Language and cookie choice",
    anonymous: "Anonymous visitor and session identifiers",
    action: "Reopen cookie preferences",
  },
  ru: {
    eyebrow: "ПРОЗРАЧНОСТЬ И ВЫБОР",
    title: "Политика cookie и конфиденциальности",
    intro: "На этой странице описаны технологии хранения данных в браузере и анонимные записи о посещениях, которые создаются только с вашего разрешения.",
    updated: "Последнее обновление: 4 сентября 2026 г.",
    sections: [
      ["1. Оператор данных и контакты", "Этот сайт управляется адвокатом Русланой Пасечиник. Запросы по вопросам конфиденциальности и персональных данных можно направлять на адрес ruslanapas@mail.ru."],
      ["2. Обязательные настройки", "Локальное хранилище браузера используется для запоминания выбранного языка и решения о cookie. Эти записи необходимы для работы сайта в соответствии с вашим выбором и не используются в рекламных целях."],
      ["3. Анонимная аналитика на основании согласия", "Только после выбора «Разрешить аналитику» сохраняются анонимные идентификаторы посетителя и сессии, первая и последняя страница, время начала, последней активности и выхода, количество просмотров, язык сайта, тип устройства, категория браузера, домен-источник и примерные страна/город, предоставленные инфраструктурой хостинга. Исходный IP-адрес, имя, электронная почта и рекламный профиль не сохраняются."],
      ["4. Цель и правовое основание", "Анонимная статистика посещений обрабатывается с вашего согласия, чтобы понимать использование разделов сайта, выявлять технические проблемы и улучшать взаимодействие с сайтом. Отказ не влияет на основные функции сайта."],
      ["5. Срок хранения и поставщики услуг", "Записи о посещениях рекомендуется хранить не более 180 дней, после чего их следует удалять. Сайт размещён на Vercel, а записи хранятся в базе Supabase. Регион обработки зависит от настроек проекта, выбранных в этих сервисах."],
      ["6. Изменение выбора", "Вы можете в любое время дать или отозвать разрешение на аналитику с помощью кнопки «Настройки cookie» в нижней части сайта. Отзыв останавливает последующую запись посещений."],
      ["7. Ваши права", "По указанному выше адресу вы можете узнать, обрабатываются ли ваши персональные данные, запросить информацию, исправление или удаление и воспользоваться другими правами, предусмотренными законодательством."],
    ],
    storageTitle: "Используемые записи браузера",
    essential: "Обязательные",
    analytics: "Аналитика — только с согласия",
    preference: "Выбор языка и cookie",
    anonymous: "Анонимные идентификаторы посетителя и сессии",
    action: "Открыть настройки cookie",
  },
  ro: {
    eyebrow: "TRANSPARENȚĂ ȘI ALEGERE",
    title: "Politica de cookie și confidențialitate",
    intro: "Această pagină explică tehnologiile de stocare în browser utilizate de site și înregistrările anonime ale vizitelor păstrate dacă vă exprimați acordul.",
    updated: "Ultima actualizare: 4 septembrie 2026",
    sections: [
      ["1. Operatorul de date și contact", "Acest site este administrat de Av. Ruslana Pasecinic. Solicitările privind confidențialitatea și datele cu caracter personal pot fi trimise la ruslanapas@mail.ru."],
      ["2. Preferințe esențiale", "Stocarea locală a browserului este utilizată pentru a reține limba aleasă și decizia privind cookie-urile. Aceste înregistrări sunt necesare pentru funcționarea site-ului conform opțiunilor dumneavoastră și nu sunt utilizate pentru publicitate."],
      ["3. Analiză anonimă bazată pe consimțământ", "Numai dacă selectați „Permite analiza” sunt înregistrate identificatoare anonime pentru vizitator și sesiune, prima și ultima pagină, momentul începerii, ultimei activități și ieșirii, numărul de pagini vizualizate, limba site-ului, tipul dispozitivului, categoria browserului, domeniul de referință și țara/orașul aproximativ furnizate de infrastructura de găzduire. Nu păstrăm adresa IP brută, numele, adresa de e-mail sau profiluri publicitare."],
      ["4. Scop și temei juridic", "Statisticile anonime ale vizitelor sunt prelucrate pe baza consimțământului dumneavoastră pentru a înțelege ce secțiuni sunt utilizate, a identifica probleme tehnice și a îmbunătăți experiența. Refuzul nu afectează utilizarea esențială a site-ului."],
      ["5. Păstrare și furnizori", "Se recomandă păstrarea înregistrărilor cel mult 180 de zile și ștergerea lor ulterior. Site-ul este găzduit pe Vercel, iar datele sunt stocate într-o bază Supabase. Regiunea de prelucrare depinde de setările proiectului alese în aceste servicii."],
      ["6. Modificarea opțiunii", "Puteți accepta sau retrage oricând permisiunea pentru analiză folosind butonul „Preferințe cookie” din subsol. Retragerea oprește înregistrările viitoare."],
      ["7. Drepturile dumneavoastră", "Puteți contacta adresa de mai sus pentru a afla dacă datele sunt prelucrate, pentru a solicita informații, rectificarea sau ștergerea și pentru a exercita celelalte drepturi acordate de lege."],
    ],
    storageTitle: "Înregistrări utilizate în browser",
    essential: "Esențiale",
    analytics: "Analiză — numai cu acord",
    preference: "Alegerea limbii și a cookie-urilor",
    anonymous: "Identificatoare anonime de vizitator și sesiune",
    action: "Redeschide preferințele cookie",
  },
};

export default function PolicyContent() {
  const { language } = useSiteLanguage();
  const page = content[language];
  return (
    <main>
      <SiteHeader />
      <section className="policy-hero"><span>{page.eyebrow}</span><h1>{page.title}</h1><p>{page.intro}</p><small>{page.updated}</small></section>
      <section className="policy-content">
        <aside><span>01—07</span><strong>{page.storageTitle}</strong></aside>
        <div className="policy-sections">
          <div className="policy-storage"><article><span>01</span><div><b>{page.essential}</b><p>{page.preference}</p></div></article><article><span>02</span><div><b>{page.analytics}</b><p>{page.anonymous}</p></div></article></div>
          {page.sections.map(([title, text]) => <article className="policy-section" key={title}><h2>{title}</h2><p>{text}</p></article>)}
          <div className="policy-choice"><p>{page.action}</p><CookieSettingsButton /></div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
