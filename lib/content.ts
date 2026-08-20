export type Article = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  content: string[];
};

export const articles: Article[] = [
  {
    slug: "turkiyede-yabancilar-icin-tasinmaz-alimi",
    title: "Türkiye’de yabancılar için taşınmaz alımında 7 kritik kontrol",
    excerpt:
      "Tapu kaydından vatandaşlık uygunluğuna, satın alma kararından önce mutlaka incelenmesi gereken hukuki başlıklar.",
    category: "Gayrimenkul Hukuku",
    date: "12 Ağustos 2026",
    readTime: "6 dk",
    content: [
      "Türkiye’de taşınmaz satın almak, doğru hukuki kontrollerle güvenli bir yatırım sürecine dönüşür. Ancak ilan bilgileri ile resmi kayıtlar arasında fark bulunabileceği için karar yalnızca satış beyanlarına dayanarak verilmemelidir.",
      "İlk adım, tapu kaydındaki malik, takyidat, ipotek, haciz ve şerh bilgilerinin incelenmesidir. Ardından taşınmazın imar durumu, kullanım amacı, iskânı ve fiili durumu resmi kayıtlarla karşılaştırılmalıdır.",
      "Satın alma vatandaşlık veya ikamet hedefiyle yapılıyorsa değerleme, ödeme yöntemi ve devir zamanlaması birlikte planlanmalıdır. Her dosyanın koşulları farklıdır; bu nedenle sözleşme imzalanmadan önce bağımsız hukuki inceleme yapılması önem taşır.",
    ],
  },
  {
    slug: "turkiyede-sirket-kurmak-yabanci-yatirimci-rehberi",
    title: "Yabancı yatırımcı için Türkiye’de şirket kurmanın yol haritası",
    excerpt:
      "Şirket türü, ortaklık yapısı, izinler ve sözleşmeler: yatırım kararını sağlam bir zemine taşıyan temel adımlar.",
    category: "Şirketler Hukuku",
    date: "4 Ağustos 2026",
    readTime: "8 dk",
    content: [
      "Türkiye’de şirket kurarken yalnızca kuruluş işlemlerini değil, faaliyet modelini ve gelecekteki riskleri de birlikte değerlendirmek gerekir. Doğru şirket türü; ortakların sorumluluğunu, vergi planını ve karar alma yapısını doğrudan etkiler.",
      "Ana sözleşmenin standart metinle kurulması her iş modeli için yeterli olmayabilir. İmza yetkileri, pay devri, yönetim organı ve ortaklıktan çıkış senaryoları başlangıçta açık biçimde düzenlenmelidir.",
      "Yabancı ortakların çalışma ve ikamet durumu ile faaliyete özgü izinler de kuruluş takviminin parçasıdır. Sağlam bir başlangıç, sonradan çıkabilecek ortaklık uyuşmazlıklarının önemli bölümünü önler.",
    ],
  },
  {
    slug: "yabancilar-icin-miras-ve-veraset-islemleri",
    title: "Yabancılar için miras ve veraset işlemleri nasıl yürütülür?",
    excerpt:
      "Sınır ötesi miras dosyalarında yetkili makam, belge hazırlığı ve Türkiye’deki malvarlığına erişim süreci.",
    category: "Miras Hukuku",
    date: "27 Temmuz 2026",
    readTime: "5 dk",
    content: [
      "Birden fazla ülkeyle bağlantılı miras dosyalarında uygulanacak hukuk, yetkili makam ve belgelerin geçerliliği ayrı ayrı değerlendirilir. Türkiye’de bulunan taşınmazlar bakımından özel kurallar söz konusu olabilir.",
      "Yabancı ülkede düzenlenen nüfus, ölüm ve miras belgelerinin apostil, tercüme ve noter süreçleri tamamlanmalıdır. Belgelerin eksik hazırlanması, veraset ilamı ve intikal işlemlerinin uzamasına yol açabilir.",
      "Mirasçılar Türkiye’ye gelmeden de uygun vekâletname ile birçok işlemi yürütebilir. Dosyanın başında çıkarılacak belge listesi ve işlem takvimi, hem süreyi hem de maliyeti öngörülebilir hâle getirir.",
    ],
  },
];

export const practiceAreas = [
  { no: "01", title: "Gayrimenkul & Yatırım", text: "Satın alma, tapu incelemesi, vatandaşlık yatırımı ve uyuşmazlık yönetimi." },
  { no: "02", title: "Şirketler & Ticaret", text: "Şirket kuruluşu, sözleşmeler, ortaklık yapıları ve sınır ötesi ticari süreçler." },
  { no: "03", title: "Göç & Vatandaşlık", text: "İkamet, çalışma izni, vatandaşlık başvurusu ve idari süreçlerin takibi." },
  { no: "04", title: "Aile & Miras", text: "Uluslararası aile dosyaları, velayet, boşanma, miras ve veraset işlemleri." },
  { no: "05", title: "Dava & Uyuşmazlık", text: "Mahkeme ve icra süreçlerinde stratejik temsil, müzakere ve çözüm." },
  { no: "06", title: "Kaza & Tazminat", text: "Trafik kazaları, sigorta dosyaları ve maddi-manevi tazminat talepleri." },
];
