"use client";

import { useState } from "react";
import { useSiteLanguage } from "../components/LanguageProvider";

type Language = "tr" | "ru" | "en" | "ro";
type BiographySection = { title: string; paragraphs?: string[]; items?: string[]; after?: string[] };
type BiographyCopy = { title: string; intro: string[]; sections: BiographySection[]; more: string; less: string };

const biography: Record<Language, BiographyCopy> = {
  tr: {
    title: "Biyografi",
    more: "Devamını okuyun",
    less: "Metni daraltın",
    intro: [
      "Av. Ruslana Paşecinic, Türkiye’de uzun yıllara dayanan mesleki deneyime sahip bir avukat olup, 2017 yılından bu yana Antalya’da avukatlık faaliyetlerini sürdürmektedir. Özellikle yabancı gerçek ve tüzel kişilere ve uluslararası ticari faaliyetlere yönelik kapsamlı hukuki danışmanlık ve hukuki temsil hizmetleri sunmaktadır. Müvekkillerinin hukuki ve ticari süreçlerinin her aşamasında, menfaatlerinin korunmasına yönelik stratejik ve bütüncül bir yaklaşım benimsemektedir.",
      "1997 yılından bu yana Türkiye’de yaşayan Ruslana Paşecinic, Türkiye’nin hukuki, ticari ve idari yapısını yakından tanımakta; hukuki bilgi ve mesleki deneyimini, Türkiye’deki uygulamaların ve iş dünyasının pratik işleyişine ilişkin deneyimiyle birleştirmektedir.",
      "Hukuk eğitimini Moldova Cumhuriyeti’nin Kişinev şehrindeki ULIM Üniversitesi Hukuk Fakültesi’nde tamamlamış, diploması 2016 yılında Antalya’da Akdeniz Üniversitesi tarafından denklik/nosytrifikasyon sürecinden geçirilmiştir.",
      "Mesleki kariyeri kapsamında Antalya Barosu’nda avukatlık stajını tamamlamış, ayrıca bir hukuk profesörünün yönetimindeki özel bir hukuk bürosunda çalışmıştır. Bu süreç, hukuki çalışmalarında akademik bilgi ile uygulamaya dayalı mesleki deneyimin birlikte değerlendirilmesine dayanan bir yaklaşım geliştirmesine katkı sağlamıştır.",
    ],
    sections: [
      {
        title: "ULUSLARARASI TİCARET VE İŞ HUKUKU",
        paragraphs: [
          "2021 yılında uluslararası ticaret alanında faaliyet gösteren kendi ticari şirketini kurarak ithalat, ihracat ve transit ticaret alanlarında doğrudan ticari deneyim kazanmıştır. Bu deneyim, yalnızca hukuki açıdan değil, işletmelerin günlük operasyonları, lojistik süreçleri, finansal yükümlülükleri ve vergi riskleri bakımından da ticari faaliyetlerin bütününü değerlendirme imkânı sağlamaktadır.",
          "Özellikle vergi ve gümrük mevzuatı alanlarına önem verilmekte; Türkiye’de sürekli değişen mevzuat ve idari uygulamalar yakından takip edilerek, uluslararası ticari faaliyetlerin hukuka uygun şekilde yapılandırılması ve olası hukuki ve mali risklerin önceden değerlendirilmesi amaçlanmaktadır.",
          "Ticari müvekkillere yönelik hizmetler kapsamında;",
        ],
        items: ["şirket kuruluşu ve şirketlerin hukuki yapılandırılması,", "sözleşmelerin hazırlanması ve incelenmesi,", "uluslararası ticari sözleşmeler,", "yatırım projeleri,", "sınır ötesi ticari işlemler,", "kurumsal yapı ve şirket menfaatlerinin korunması,", "ticari uyuşmazlıkların çözümü"],
        after: ["Uluslararası ticaret hukuku ve dış ticaret uygulamaları kapsamında; sınır ötesi işlemler, ticari düzenlemeler, uluslararası mal ve hizmet tedariki, ticari uyuşmazlıkların çözümü ve dış ticaret işlemlerinin hukuki açıdan yapılandırılması konularında çalışmaktadır."],
      },
      {
        title: "İTHALAT VE İHRACAT",
        paragraphs: ["İthalat ve ihracat alanındaki uygulamaya dayalı deneyim kapsamında;"],
        items: ["gümrük işlemleri,", "ithalat ve ihracat süreçlerinin hukuki ve vergisel yapılandırılması,", "lojistik süreçlerin hukuki koordinasyonu,", "gerekli izin ve ruhsatların alınması,", "uluslararası tedarik ve satış işlemleri,", "karmaşık dış ticaret operasyonlarının hukuki takibi"],
        after: ["Ayrıca lisans, izin ve ruhsat işlemleri; patent ve marka tescili; fikrî ve sınai mülkiyet haklarının korunması ve işletmelerin ticari kimliğinin hukuki açıdan yapılandırılması konularında da hizmet verilmektedir."],
      },
      {
        title: "TÜRKİYE’DE GAYRİMENKUL İŞLEMLERİ",
        paragraphs: ["Türkiye’de gayrimenkul alım ve satım işlemleri de önemli çalışma alanlarından biridir.", "Bu kapsamda;"],
        items: ["gayrimenkul satış sözleşmelerinin hazırlanması ve incelenmesi,", "tapu ve taşınmaz kayıtlarının hukuki açıdan incelenmesi,", "alım-satım işlemlerinin tüm aşamalarında hukuki danışmanlık,", "yabancı yatırımcıların Türkiye’de gerçekleştirdiği gayrimenkul yatırımlarının hukuki takibi,", "vekâletname aracılığıyla müvekkil adına gayrimenkul işlemlerinin yürütülmesi"],
        after: ["Özellikle Türkiye’de bulunması mümkün olmayan yabancı yatırımcılar açısından işlemlerin vekâletname ile müvekkil adına yürütülmesi, sürecin daha pratik ve kontrollü şekilde tamamlanmasına imkân sağlamaktadır."],
      },
      {
        title: "YABANCILAR HUKUKU VE YABANCI MÜVEKKİLLER",
        paragraphs: ["Ruslana Paşecinic, Türkiye’de yaşayan, yatırım yapan, iş kuran veya turistik amaçlarla bulunan yabancıların karşılaşabileceği hukuki, idari ve cezai süreçler konusunda da kapsamlı hukuki danışmanlık ve temsil hizmetleri sunmaktadır.", "Çalışma alanları arasında;"],
        items: ["ikamet izni işlemleri,", "Türk vatandaşlığı başvuruları,", "yabancılar hukuku,", "sınır dışı etme kararları,", "deportasyon süreçleri,", "yabancıların Türkiye’de karşılaştığı idari işlemler,", "medeni hukuk ve aile hukuku uyuşmazlıkları,", "ceza davaları,", "idari ve hukuki uyuşmazlıklar"],
        after: ["Bu kapsamda emniyet birimleri, savcılıklar, soruşturma makamları, mahkemeler ve geri gönderme merkezleri nezdinde müvekkillerin hukuki temsil ve savunması gerçekleştirilmektedir.", "Özellikle sınır dışı etme kararlarının iptali ve yabancıların Türkiye’deki hukuki statülerinin korunmasına yönelik süreçlerde deneyime sahiptir."],
      },
      {
        title: "MÜVEKKİL PORTFÖYÜ VE ULUSLARARASI ÇALIŞMA",
        paragraphs: ["Mesleki faaliyetleri kapsamında farklı ülkelerden gelen bireysel ve kurumsal müvekkillere hizmet sunulmaktadır. Müvekkiller arasında Rusya, Ukrayna, Belarus, Moldova, Kazakistan, Türkmenistan, Hollanda, Almanya, Birleşik Krallık, Romanya, Amerika Birleşik Devletleri, Kanada, Ürdün, Kenya, İran ve Afganistan vatandaşları bulunmaktadır.", "Uluslararası nitelikteki dosyalarda, sürecin niteliğine göre noterlikler, yeminli tercümanlar ve tercüme büroları, gayrimenkul değerleme uzmanları, emlak şirketleri, uluslararası para transferi ve finansal işlem kuruluşları gibi farklı profesyonellerle koordineli şekilde çalışılmaktadır.", "Türkiye’deki uzun yıllara dayanan mesleki ve ticari deneyimi sayesinde vergi daireleri, ticaret odaları, ithalat-ihracat alanında faaliyet gösteren mesleki kuruluşlar ve serbest bölgelerle yürütülen idari ve ticari süreçlerin hukuki açıdan takibinde de deneyime sahiptir."],
      },
      {
        title: "GİZLİLİK VE MESLEKİ GİZLİLİK",
        paragraphs: ["Müvekkiller tarafından paylaşılan bilgi, belge, kişisel veriler ve ticari bilgiler, avukatlık mesleğinin gerektirdiği gizlilik ve sır saklama yükümlülükleri çerçevesinde korunmaktadır.", "Müvekkilin özel ve ticari bilgilerinin korunması, hukuki hizmetin temel unsurlarından biri olarak kabul edilmektedir."],
      },
      {
        title: "DİL VE ULUSLARARASI İLETİŞİM",
        paragraphs: ["Ruslana Paşecinic, Rusça ve Türkçe dillerinde yeminli tercüman olarak da hizmet vermektedir. Bu özellik, özellikle resmi belgelerin hazırlanması, incelenmesi ve uluslararası nitelikteki hukuki işlemlerde iletişim ve belge süreçlerinin daha doğru yürütülmesine katkı sağlamaktadır.", "Ayrıca Rusça, Türkçe, Romence ve İngilizce dillerini bilmektedir."],
      },
      {
        title: "ONLINE HUKUKİ DANIŞMANLIK",
        paragraphs: ["Farklı ülkelerde bulunan müvekkillere yönelik online hukuki danışmanlık hizmeti de sunulmaktadır. Böylece müvekkillerin Türkiye’ye gelmelerine gerek kalmadan, hukuki durumları hakkında ön değerlendirme ve danışmanlık almaları ve gerekli durumlarda hukuki süreçlerinin vekâletname aracılığıyla takip edilmesi mümkün olabilmektedir."],
      },
      {
        title: "MESLEKİ GELİŞİM",
        paragraphs: ["Mevzuat ve yargı uygulamalarındaki değişiklikler düzenli olarak takip edilmekte; mesleki bilgi ve deneyimin güncel tutulması amacıyla çeşitli mesleki eğitim ve gelişim programlarına katılım sağlanmaktadır."],
      },
    ],
  },
  en: {
    title: "Biography",
    more: "Read the full biography",
    less: "Show less",
    intro: [
      "Attorney Ruslana Pasecinic is a lawyer with many years of professional experience in Türkiye and has practised law in Antalya since 2017. She provides comprehensive legal advice and representation, particularly to foreign individuals and legal entities and in matters involving international commercial activity. At every stage of her clients’ legal and commercial matters, she adopts a strategic and integrated approach aimed at protecting their interests.",
      "Having lived in Türkiye since 1997, Ruslana Pasecinic has a close understanding of the country’s legal, commercial and administrative framework. She combines her legal knowledge and professional experience with practical insight into the operation of Turkish institutions and business life.",
      "She completed her legal education at the Faculty of Law of ULIM University in Chișinău, Republic of Moldova. Her diploma underwent the recognition/nostrification process at Akdeniz University in Antalya in 2016.",
      "As part of her professional career, she completed her legal traineeship with the Antalya Bar Association and also worked at a private law office headed by a professor of law. This experience contributed to the development of an approach that brings academic legal knowledge together with practice-based professional experience.",
    ],
    sections: [
      {
        title: "International Trade and Business Law",
        paragraphs: ["In 2021, she founded her own company operating in international trade and gained direct commercial experience in import, export and transit trade. This experience enables her to assess commercial activity not only from a legal perspective, but also in terms of day-to-day operations, logistics, financial obligations and tax risks.", "Particular attention is paid to tax and customs legislation. Frequently changing legislation and administrative practice in Türkiye are closely monitored so that international commercial activities can be structured in compliance with the law and potential legal and financial risks can be assessed in advance.", "Services for commercial clients include:"],
        items: ["Company formation and legal structuring", "Drafting and review of contracts", "International commercial contracts", "Investment projects", "Cross-border commercial transactions", "Protection of corporate structures and company interests", "Resolution of commercial disputes"],
        after: ["Her work in international trade law and foreign trade practice includes cross-border transactions, commercial regulations, the international supply of goods and services, the resolution of commercial disputes and the legal structuring of foreign trade operations."],
      },
      {
        title: "Import and Export",
        paragraphs: ["Drawing on practical experience in import and export, advice and legal support are provided in relation to:"],
        items: ["Customs procedures", "Legal and tax structuring of import and export processes", "Legal coordination of logistics processes", "Obtaining the required permits and licences", "International supply and sales transactions", "Legal follow-up of complex foreign trade operations"],
        after: ["Services are also provided in connection with licences, permits and regulatory approvals; patent and trademark registration; the protection of intellectual and industrial property rights; and the legal structuring of a business’s commercial identity."],
      },
      {
        title: "Real Estate Transactions in Türkiye",
        paragraphs: ["The purchase and sale of real estate in Türkiye is another important area of practice.", "Services in this area include:"],
        items: ["Drafting and review of real estate sale agreements", "Legal examination of title deeds and property records", "Legal advice at every stage of a purchase or sale", "Legal follow-up of real estate investments made by foreign investors in Türkiye", "Conducting real estate transactions on behalf of clients under a power of attorney"],
        after: ["For foreign investors who are unable to be present in Türkiye, conducting transactions on their behalf under a power of attorney allows the process to be completed in a more practical and controlled manner."],
      },
      {
        title: "Immigration Law and Foreign Clients",
        paragraphs: ["Ruslana Pasecinic also provides comprehensive legal advice and representation in the legal, administrative and criminal-law processes that may affect foreigners who live, invest, establish businesses or stay in Türkiye for tourism purposes.", "Areas of work include:"],
        items: ["Residence permit procedures", "Applications for Turkish citizenship", "Immigration and foreigners law", "Removal decisions", "Deportation proceedings", "Administrative procedures encountered by foreigners in Türkiye", "Civil and family-law disputes", "Criminal proceedings", "Administrative and civil disputes"],
        after: ["In this context, clients are legally represented and defended before law-enforcement authorities, public prosecutors, investigative authorities, courts and removal centres.", "She has particular experience in proceedings seeking the annulment of removal decisions and the protection of foreigners’ legal status in Türkiye."],
      },
      {
        title: "Client Portfolio and International Practice",
        paragraphs: ["Her practice serves individual and corporate clients from a wide range of countries. Clients include citizens of Russia, Ukraine, Belarus, Moldova, Kazakhstan, Turkmenistan, the Netherlands, Germany, the United Kingdom, Romania, the United States, Canada, Jordan, Kenya, Iran and Afghanistan.", "In international matters, she works in coordination, as required by the case, with notaries, sworn translators and translation offices, real estate valuation experts, estate agencies, international money-transfer providers and other financial-service professionals.", "Her many years of professional and commercial experience in Türkiye also provide experience in the legal follow-up of administrative and commercial processes conducted with tax offices, chambers of commerce, professional organisations active in import and export, and free zones."],
      },
      {
        title: "Confidentiality and Professional Secrecy",
        paragraphs: ["Information, documents, personal data and commercial information shared by clients are protected in accordance with the duties of confidentiality and professional secrecy required by the legal profession.", "The protection of clients’ private and commercial information is regarded as a fundamental element of legal service."],
      },
      {
        title: "Languages and International Communication",
        paragraphs: ["Ruslana Pasecinic also serves as a sworn translator in Russian and Turkish. This qualification contributes to the accurate preparation and review of official documents and to more reliable communication and document processes in international legal matters.", "She speaks Russian, Turkish, Romanian and English."],
      },
      {
        title: "Online Legal Consultation",
        paragraphs: ["Online legal consultations are available to clients in different countries. Clients may therefore receive a preliminary assessment and advice without travelling to Türkiye and, where required, have their legal matters followed under a power of attorney."],
      },
      {
        title: "Professional Development",
        paragraphs: ["Changes in legislation and judicial practice are monitored regularly, and she participates in professional training and development programmes to keep her legal knowledge and professional experience current."],
      },
    ],
  },
  ru: {
    title: "Биография",
    more: "Читать полностью",
    less: "Свернуть",
    intro: [
      "Адвокат Руслана Пасечиник обладает многолетним профессиональным опытом работы в Турции и с 2017 года осуществляет адвокатскую деятельность в Анталье. Она оказывает комплексные услуги по юридическому консультированию и представительству, прежде всего иностранным физическим и юридическим лицам, а также по вопросам международной коммерческой деятельности. На каждом этапе юридических и коммерческих процессов доверителей она применяет стратегический и комплексный подход, направленный на защиту их интересов.",
      "Проживая в Турции с 1997 года, Руслана Пасечиник хорошо знакома с правовой, коммерческой и административной системой страны. Она сочетает юридические знания и профессиональный опыт с практическим пониманием работы турецких учреждений и деловой среды.",
      "Юридическое образование получила на юридическом факультете Университета ULIM в Кишинёве, Республика Молдова. В 2016 году её диплом прошёл процедуру признания и нострификации в Университете Акдениз в Анталье.",
      "В рамках профессиональной подготовки она прошла адвокатскую стажировку в Палате адвокатов Антальи, а также работала в частном адвокатском бюро под руководством профессора права. Этот опыт способствовал формированию подхода, объединяющего академические правовые знания и практический профессиональный опыт.",
    ],
    sections: [
      {
        title: "Международная торговля и коммерческое право",
        paragraphs: ["В 2021 году она основала собственную коммерческую компанию, работающую в сфере международной торговли, и приобрела непосредственный деловой опыт в импорте, экспорте и транзитной торговле. Этот опыт позволяет оценивать коммерческую деятельность не только с правовой точки зрения, но и с учётом повседневных операций предприятий, логистики, финансовых обязательств и налоговых рисков.", "Особое внимание уделяется налоговому и таможенному законодательству. Постоянно меняющиеся нормы и административная практика Турции внимательно отслеживаются, чтобы международная коммерческая деятельность была выстроена в соответствии с законом, а возможные правовые и финансовые риски оценивались заранее.", "Услуги для коммерческих доверителей включают:"],
        items: ["Создание компаний и их правовое структурирование", "Подготовка и проверка договоров", "Международные коммерческие договоры", "Инвестиционные проекты", "Трансграничные коммерческие сделки", "Защита корпоративной структуры и интересов компании", "Разрешение коммерческих споров"],
        after: ["Практика в сфере международного торгового права и внешней торговли охватывает трансграничные сделки, коммерческое регулирование, международные поставки товаров и услуг, разрешение коммерческих споров и правовое структурирование внешнеторговых операций."],
      },
      {
        title: "Импорт и экспорт",
        paragraphs: ["На основе практического опыта в сфере импорта и экспорта предоставляются консультации и юридическая поддержка по следующим вопросам:"],
        items: ["Таможенные процедуры", "Правовое и налоговое структурирование импорта и экспорта", "Юридическая координация логистических процессов", "Получение необходимых разрешений и лицензий", "Международные поставки и сделки купли-продажи", "Юридическое сопровождение сложных внешнеторговых операций"],
        after: ["Также оказываются услуги по вопросам лицензий, разрешений и согласований; регистрации патентов и товарных знаков; защиты интеллектуальных и промышленных прав; а также правового оформления коммерческой идентичности предприятия."],
      },
      {
        title: "Сделки с недвижимостью в Турции",
        paragraphs: ["Покупка и продажа недвижимости в Турции является одним из важных направлений практики.", "В рамках этого направления предоставляются следующие услуги:"],
        items: ["Подготовка и проверка договоров купли-продажи недвижимости", "Юридическая проверка ТАПУ и реестров недвижимости", "Юридическое консультирование на всех этапах купли-продажи", "Юридическое сопровождение инвестиций иностранных инвесторов в недвижимость Турции", "Проведение сделок с недвижимостью от имени доверителя на основании доверенности"],
        after: ["Для иностранных инвесторов, которые не могут лично находиться в Турции, проведение сделок от их имени по доверенности позволяет завершить процесс более практично и контролируемо."],
      },
      {
        title: "Право иностранцев и иностранные доверители",
        paragraphs: ["Руслана Пасечиник также оказывает комплексные услуги по юридическому консультированию и представительству в правовых, административных и уголовных процессах, с которыми могут столкнуться иностранцы, проживающие, инвестирующие, ведущие бизнес или находящиеся в Турции с туристическими целями.", "К направлениям работы относятся:"],
        items: ["Оформление вида на жительство", "Заявления на получение гражданства Турции", "Право иностранцев", "Решения о выдворении", "Процедуры депортации", "Административные процедуры, с которыми иностранцы сталкиваются в Турции", "Споры в сфере гражданского и семейного права", "Уголовные дела", "Административные и гражданско-правовые споры"],
        after: ["В рамках этой практики осуществляется юридическое представительство и защита доверителей в органах полиции, прокуратуре, следственных органах, судах и центрах временного содержания иностранцев.", "Особый опыт накоплен в процедурах обжалования решений о выдворении и защиты правового статуса иностранцев в Турции."],
      },
      {
        title: "Доверители и международная практика",
        paragraphs: ["В рамках профессиональной деятельности услуги оказываются частным и корпоративным доверителям из разных стран. Среди них — граждане России, Украины, Беларуси, Молдовы, Казахстана, Туркменистана, Нидерландов, Германии, Великобритании, Румынии, Соединённых Штатов, Канады, Иордании, Кении, Ирана и Афганистана.", "По делам международного характера, в зависимости от особенностей процесса, работа ведётся во взаимодействии с нотариусами, присяжными переводчиками и бюро переводов, оценщиками недвижимости, риелторскими компаниями, организациями международных денежных переводов и другими специалистами финансовой сферы.", "Многолетний профессиональный и коммерческий опыт в Турции также обеспечивает опыт юридического сопровождения административных и коммерческих процедур в налоговых органах, торгово-промышленных палатах, профессиональных организациях в сфере импорта и экспорта и свободных экономических зонах."],
      },
      {
        title: "Конфиденциальность и адвокатская тайна",
        paragraphs: ["Сведения, документы, персональные данные и коммерческая информация, переданные доверителями, защищаются в соответствии с требованиями конфиденциальности и обязанностью хранить адвокатскую тайну.", "Защита частной и коммерческой информации доверителя рассматривается как один из основополагающих элементов юридической помощи."],
      },
      {
        title: "Языки и международное общение",
        paragraphs: ["Руслана Пасечиник также является присяжным переводчиком русского и турецкого языков. Эта квалификация способствует более точной подготовке и проверке официальных документов, а также надлежащему ведению коммуникации и документооборота в международных юридических процессах.", "Она владеет русским, турецким, румынским и английским языками."],
      },
      {
        title: "Онлайн-консультации",
        paragraphs: ["Клиентам, находящимся в разных странах, предоставляются онлайн-консультации. Это позволяет получить предварительную правовую оценку и консультацию без поездки в Турцию, а при необходимости — вести юридический процесс на основании доверенности."],
      },
      {
        title: "Профессиональное развитие",
        paragraphs: ["Изменения в законодательстве и судебной практике регулярно отслеживаются; для поддержания профессиональных знаний и опыта на актуальном уровне принимается участие в различных программах обучения и повышения квалификации."],
      },
    ],
  },
  ro: {
    title: "Biografie",
    more: "Citiți biografia completă",
    less: "Restrângeți textul",
    intro: [
      "Av. Ruslana Pasecinic are o experiență profesională de mulți ani în Turcia și își desfășoară activitatea de avocat în Antalya din 2017. Oferă servicii complete de consultanță și reprezentare juridică, în special persoanelor fizice și juridice străine, precum și în legătură cu activități comerciale internaționale. În fiecare etapă a proceselor juridice și comerciale ale clienților, adoptă o abordare strategică și integrată, orientată spre protejarea intereselor acestora.",
      "Locuiește în Turcia din 1997 și cunoaște îndeaproape structura juridică, comercială și administrativă a țării. Își completează cunoștințele juridice și experiența profesională cu o înțelegere practică a funcționării instituțiilor și a mediului de afaceri din Turcia.",
      "A absolvit Facultatea de Drept a Universității ULIM din Chișinău, Republica Moldova. Diploma sa a parcurs în anul 2016 procedura de echivalare și nostrificare la Universitatea Akdeniz din Antalya.",
      "În cadrul formării profesionale, a finalizat stagiul de avocat la Baroul Antalya și a lucrat într-un cabinet privat coordonat de un profesor de drept. Această experiență a contribuit la formarea unei abordări care îmbină cunoștințele juridice academice cu experiența profesională practică.",
    ],
    sections: [
      {
        title: "Comerț internațional și dreptul afacerilor",
        paragraphs: ["În 2021, a înființat propria societate comercială activă în comerțul internațional și a dobândit experiență directă în import, export și comerț de tranzit. Această experiență îi permite să analizeze activitatea comercială nu numai din perspectivă juridică, ci și prin prisma operațiunilor cotidiene, a logisticii, a obligațiilor financiare și a riscurilor fiscale.", "O atenție deosebită este acordată legislației fiscale și vamale. Modificările frecvente ale legislației și practicii administrative din Turcia sunt urmărite îndeaproape, pentru ca activitățile comerciale internaționale să fie structurate în conformitate cu legea, iar posibilele riscuri juridice și financiare să fie evaluate din timp.", "Serviciile destinate clienților comerciali includ:"],
        items: ["Înființarea și structurarea juridică a societăților", "Redactarea și verificarea contractelor", "Contracte comerciale internaționale", "Proiecte de investiții", "Tranzacții comerciale transfrontaliere", "Protejarea structurii corporative și a intereselor societății", "Soluționarea litigiilor comerciale"],
        after: ["Activitatea în domeniul dreptului comerțului internațional și al comerțului exterior include tranzacții transfrontaliere, reglementări comerciale, furnizarea internațională de bunuri și servicii, soluționarea litigiilor comerciale și structurarea juridică a operațiunilor de comerț exterior."],
      },
      {
        title: "Import și export",
        paragraphs: ["Pe baza experienței practice în domeniul importului și exportului, sunt oferite consultanță și asistență juridică privind:"],
        items: ["Proceduri vamale", "Structurarea juridică și fiscală a proceselor de import și export", "Coordonarea juridică a proceselor logistice", "Obținerea autorizațiilor și licențelor necesare", "Operațiuni internaționale de furnizare și vânzare", "Urmărirea juridică a operațiunilor complexe de comerț exterior"],
        after: ["Sunt oferite servicii și în materia licențelor, autorizațiilor și aprobărilor; înregistrării brevetelor și mărcilor; protecției drepturilor de proprietate intelectuală și industrială; precum și structurării juridice a identității comerciale a întreprinderii."],
      },
      {
        title: "Tranzacții imobiliare în Turcia",
        paragraphs: ["Cumpărarea și vânzarea de bunuri imobile în Turcia reprezintă un alt domeniu important de activitate.", "În acest domeniu sunt oferite servicii privind:"],
        items: ["Redactarea și verificarea contractelor de vânzare-cumpărare imobiliară", "Verificarea juridică a titlurilor de proprietate și a registrelor imobiliare", "Consultanță juridică în toate etapele operațiunii de cumpărare sau vânzare", "Urmărirea juridică a investițiilor imobiliare realizate de investitori străini în Turcia", "Efectuarea tranzacțiilor imobiliare în numele clientului în baza unei procuri"],
        after: ["Pentru investitorii străini care nu se pot afla personal în Turcia, efectuarea operațiunilor în numele lor prin procură permite finalizarea procesului într-un mod mai practic și mai controlat."],
      },
      {
        title: "Dreptul străinilor și clienți străini",
        paragraphs: ["Ruslana Pasecinic oferă, de asemenea, consultanță și reprezentare juridică completă în procedurile juridice, administrative și penale cu care se pot confrunta străinii care locuiesc, investesc, înființează afaceri sau se află în Turcia în scop turistic.", "Domeniile de activitate includ:"],
        items: ["Proceduri privind permisul de ședere", "Cereri pentru dobândirea cetățeniei turce", "Dreptul străinilor", "Decizii de îndepărtare de pe teritoriul Turciei", "Proceduri de deportare", "Proceduri administrative întâlnite de străini în Turcia", "Litigii de drept civil și de familie", "Cauze penale", "Litigii administrative și civile"],
        after: ["În acest context, clienții sunt reprezentați și apărați în fața organelor de poliție, parchetelor, autorităților de cercetare, instanțelor și centrelor de returnare.", "Are o experiență deosebită în procedurile privind anularea deciziilor de îndepărtare și protejarea statutului juridic al străinilor în Turcia."],
      },
      {
        title: "Portofoliul de clienți și activitatea internațională",
        paragraphs: ["În cadrul activității profesionale sunt deserviți clienți persoane fizice și juridice din numeroase țări. Printre aceștia se numără cetățeni ai Rusiei, Ucrainei, Belarusului, Moldovei, Kazahstanului, Turkmenistanului, Țărilor de Jos, Germaniei, Regatului Unit, României, Statelor Unite ale Americii, Canadei, Iordaniei, Kenyei, Iranului și Afganistanului.", "În cauzele cu caracter internațional, în funcție de natura procesului, activitatea se desfășoară în coordonare cu notari, traducători autorizați și birouri de traduceri, evaluatori imobiliari, agenții imobiliare, furnizori de transferuri internaționale de bani și alți profesioniști din domeniul financiar.", "Experiența profesională și comercială de mulți ani în Turcia oferă, de asemenea, experiență în urmărirea juridică a procedurilor administrative și comerciale desfășurate cu administrațiile fiscale, camerele de comerț, organizațiile profesionale din domeniul importului și exportului și zonele libere."],
      },
      {
        title: "Confidențialitate și secret profesional",
        paragraphs: ["Informațiile, documentele, datele cu caracter personal și informațiile comerciale transmise de clienți sunt protejate în conformitate cu obligațiile de confidențialitate și de păstrare a secretului profesional specifice profesiei de avocat.", "Protejarea informațiilor private și comerciale ale clientului este considerată un element fundamental al serviciului juridic."],
      },
      {
        title: "Limbi și comunicare internațională",
        paragraphs: ["Ruslana Pasecinic activează și în calitate de traducător autorizat pentru limbile rusă și turcă. Această calificare contribuie la pregătirea și verificarea corectă a documentelor oficiale și la gestionarea mai exactă a comunicării și documentației în procedurile juridice internaționale.", "Vorbește limbile rusă, turcă, română și engleză."],
      },
      {
        title: "Consultanță juridică online",
        paragraphs: ["Sunt oferite consultații juridice online clienților aflați în diferite țări. Astfel, aceștia pot primi o evaluare preliminară și consultanță fără a se deplasa în Turcia, iar atunci când este necesar, procedurile lor juridice pot fi urmărite în baza unei procuri."],
      },
      {
        title: "Dezvoltare profesională",
        paragraphs: ["Modificările legislative și ale practicii judiciare sunt urmărite în mod regulat, iar participarea la programe de formare și dezvoltare profesională contribuie la menținerea actualizată a cunoștințelor și experienței profesionale."],
      },
    ],
  },
};

export default function BiographyContent() {
  const { language } = useSiteLanguage();
  const [expanded, setExpanded] = useState(false);
  const copy = biography[language];

  return (
    <article className="about-story-static" data-no-translate>
      <h2>{copy.title}</h2>
      <div className="about-story-copy">
        <div className="about-biography-intro">
          {copy.intro.slice(0, expanded ? copy.intro.length : 2).map((paragraph, index) => <p className={index === 0 ? "dropcap" : undefined} key={paragraph}>{paragraph}</p>)}
        </div>
        {expanded && copy.sections.map((section, index) => (
          <section className="about-biography-section" key={section.title}>
            <span className="about-biography-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <h3>{section.title}</h3>
            {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.items && <ul>{section.items.map((item) => <li key={item}>{item}</li>)}</ul>}
            {section.after?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
        ))}
        <button className="about-biography-toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded((current) => !current)}>
          {expanded ? copy.less : copy.more}<span aria-hidden="true">{expanded ? "↑" : "↓"}</span>
        </button>
      </div>
    </article>
  );
}
