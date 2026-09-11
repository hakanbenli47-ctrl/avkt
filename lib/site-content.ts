import { translations, type SiteLanguage } from "./translations";

export const siteLanguages: SiteLanguage[] = ["tr", "ru", "en", "ro"];
export type SiteContentValues = Record<SiteLanguage, string>;
export type SiteContentField = {
  contentKey: string;
  section: string;
  sectionDescription: string;
  block: string;
  blockDescription: string;
  order: number;
  label: string;
  source: string;
  defaults: SiteContentValues;
};

type LayoutSection = {
  name: string;
  description: string;
  blocks: Array<{ name: string; description: string; sources: string[] }>;
};

function contentKey(source: string) {
  let hash = 2166136261;
  for (let index = 0; index < source.length; index += 1) hash = Math.imul(hash ^ source.charCodeAt(index), 16777619);
  return `text_${(hash >>> 0).toString(36)}`;
}

function labelFor(source: string) {
  return source.length > 92 ? `${source.slice(0, 89).trim()}…` : source;
}

const sourceKeys = Array.from(new Set([...Object.keys(translations.en), ...Object.keys(translations.ru), ...Object.keys(translations.ro)]));

function through(start: string, end: string) {
  const first = sourceKeys.indexOf(start);
  const last = sourceKeys.indexOf(end);
  if (first < 0 || last < first) return [];
  return sourceKeys.slice(first, last + 1);
}

function only(...sources: string[]) {
  return sources.filter((source) => sourceKeys.includes(source));
}

const layout: LayoutSection[] = [
  {
    name: "Ana Sayfa",
    description: "Ana sayfada ziyaretçinin gördüğü içerikler, yukarıdan aşağıya ekran sırasıyla.",
    blocks: [
      { name: "Ana görsel ve tanıtım", description: "Açılış alanındaki unvan, baro ve kısa tanıtım metinleri.", sources: only("Avukat", "Antalya Barosu", "Av. Ruslana Pasecinic", "Antalya Barosu · 2017", "Çalışma dili", "Türkiye bağlantılı dosyalar") },
      { name: "Avukat hakkında", description: "Ana sayfadaki avukat tanıtımı ve açılıp kapanan tam metin.", sources: [...only("Avukat hakkında"), ...through("Türkiye’de yaşayan, çalışan, yatırım yapan, iş kuran veya turistik amaçlarla bulunan yabancıların Türkiye’de karşılaşabilecekleri hukuki süreçleri; müvekkilin dili, ihtiyaçları, hedefleri ve dosyanın somut koşulları doğrultusunda takip eder.", "Süreç boyunca doğrudan, düzenli ve güvene dayalı iletişim esas alınarak, müvekkilin Türkiye’deki hukuki işlemlerinin güvenli, anlaşılır ve sistematik bir şekilde yürütülmesine destek olunur.")] },
      { name: "Faaliyet alanları özeti", description: "Ana sayfadaki altı faaliyet kartının başlık ve açıklamaları.", sources: [...through("Gayrimenkul & Yatırım", "Kaza & Tazminat"), ...through("Satın alma, tapu incelemesi, vatandaşlık yatırımı ve uyuşmazlık yönetimi.", "Trafik kazaları, sigorta dosyaları ve maddi-manevi tazminat talepleri.")] },
      { name: "Neden tercih ediliyoruz?", description: "Tercih nedenleri, güven, iletişim ve gizlilik mesajları.", sources: through("Neden tercih ediliyoruz?", "Paylaştığınız bilgiler mesleki sır kapsamında korunur.") },
      { name: "Hukuk notları ve iletişim", description: "Ana sayfanın hukuk notları ve iletişim çağrısı.", sources: [...only("Son hukuk notları", "Güncel meseleler,", "açık anlatımla.", "Tüm yazılar"), ...only("Hukuki bir konuda görüşmek için", "İletişime geçin", "İletişim bilgileri")] },
    ],
  },
  {
    name: "Hakkımızda",
    description: "Hakkımızda sayfasındaki giriş, yaklaşım, biyografi ve belgeler; sayfa sırasıyla.",
    blocks: [
      { name: "Sayfa üst alanı", description: "Görsel üzerindeki başlık, unvan ve özet bilgiler.", sources: [...only("Hakkımızda", "Av. Ruslana Pasecinic", "Antalya Barosu", "Hukuki güven,", "anlaşılır iletişimle başlar."), ...through("Antalya Barosu · 2017", "Türkiye bağlantılı dosyalar")] },
      { name: "Çalışma yaklaşımı", description: "Doğrudan iletişim, inceleme ve çok yönlü bakış kartları.", sources: through("Doğrudan iletişim", "Türkiye hukuku ile sınır ötesi sonuçları birlikte ele alan dosya yönetimi.") },
      { name: "Biyografi", description: "Avukatın mesleki tanıtımının kısa biyografi metinleri.", sources: through("Biyografi", "Çalışma yaklaşımında doğrudan iletişim, dikkatli dosya incelemesi, risklerin önceden değerlendirilmesi ve mesleki gizlilik temel ilkeleri oluşturur.") },
      { name: "Mesleki belgeler", description: "Belge galerisi başlıkları ve görsel adları.", sources: through("Mesleki Belgeler", "Avukatlık Ruhsatnamesi") },
    ],
  },
  {
    name: "Faaliyetlerimiz",
    description: "Faaliyetler sayfasının girişinden son bilgilendirme notuna kadar gerçek ekran sırası.",
    blocks: [
      { name: "Sayfa girişi", description: "Faaliyetler sayfasının ana başlığı ve yaklaşım açıklaması.", sources: [...through("Hukuki ihtiyaca göre", "Her dosya, hizmet türü ile ilgili hukuk alanının birlikte değerlendirilmesini gerektirir."), ...only("Yaklaşım", "Dosyanın yalnızca hukuki başlığını değil, amacını ve sınır ötesi etkilerini de dikkate alan bir çalışma.", "Danışmanlık, dava veya işlem desteğinin kapsamı; belgeler, hedefler, yetkili kurumlar ve olası riskler incelendikten sonra belirlenir. Böylece her aşama açık, ölçülü ve izlenebilir bir plan içinde yürütülür.")] },
      { name: "Faaliyet türleri", description: "Sol sütundaki hizmet türleri, açıklamaları ve maddeleri.", sources: [...only("Faaliyet Türleri", "Nasıl destek veriyoruz?"), ...through("Hukuki danışmanlık", "Sınır ötesi aile ve miras dosyaları")] },
      { name: "Faaliyet alanları", description: "Sağ sütundaki hukuk alanları ve her alanın alt maddeleri.", sources: [...only("Faaliyet Alanları", "Birbirine temas eden hukuk alanları."), ...through("Tapu ve hukuki durum incelemesi", "Zarar hesabı ve takip")] },
      { name: "Sayfa sonu notu", description: "Genel bilgilendirme ve iletişim bağlantısı.", sources: only("Her dosyanın koşulları farklıdır. Bu sayfadaki açıklamalar genel bilgilendirme niteliğindedir; hukuki değerlendirme, somut olay ve belgeler incelendikten sonra yapılır.", "İletişim bilgileri") },
    ],
  },
  {
    name: "Çalışma Alanları",
    description: "Çalışma alanları sayfasındaki giriş ve hizmet kartları.",
    blocks: [
      { name: "Sayfa girişi", description: "Uzmanlık başlığı ve çalışma yaklaşımı.", sources: through("Uzmanlıklar", "Her hukuki süreç tek bir başlıktan ibaret değildir. Taşınmaz alımı ikamet ve vatandaşlıkla; şirket kuruluşu sözleşmeler ve çalışma izinleriyle; aile ve miras dosyaları ise birden fazla ülkenin hukukuyla kesişebilir. Çalışma, bu bağlantılar birlikte değerlendirilerek yürütülür.") },
      { name: "Hukuk alanı kartları", description: "Altı çalışma alanının başlık, açıklama ve alt maddeleri.", sources: [...through("Gayrimenkul & Yatırım", "Trafik kazaları, sigorta dosyaları ve maddi-manevi tazminat talepleri."), ...through("Tapu ve hukuki durum incelemesi", "Zarar hesabı ve takip")] },
    ],
  },
  {
    name: "Sık Sorulan Sorular",
    description: "Sorular ve cevaplar, sitede gösterildikleri sırayla eşleştirilmiştir.",
    blocks: [
      { name: "Sorular ve cevaplar", description: "Her sorunun hemen altında kendi cevabı bulunur.", sources: [...only("Sık Sorulan Sorular"), ...through("İlk görüşme için hangi bilgi ve belgeler gerekir?", "Evet. Müvekkil tarafından paylaşılan bilgi, belge ve kişisel veriler mesleki gizlilik ve sır saklama yükümlülüğü çerçevesinde korunur.")] },
    ],
  },
  {
    name: "Blog",
    description: "Blog liste sayfası ve örnek hukuk yazılarının içerikleri.",
    blocks: [
      { name: "Blog üst alanı", description: "Blog başlığı, açıklaması ve filtre isimleri.", sources: through("Bilgi, doğru kararın başlangıcıdır.", "Taslak") },
      { name: "Taşınmaz alımı yazısı", description: "Yazının başlığı, özeti ve paragrafları.", sources: through("Türkiye’de yabancılar için taşınmaz alımında 7 kritik kontrol", "Satın alma vatandaşlık veya ikamet hedefiyle yapılıyorsa değerleme, ödeme yöntemi ve devir zamanlaması birlikte planlanmalıdır. Her dosyanın koşulları farklıdır; bu nedenle sözleşme imzalanmadan önce bağımsız hukuki inceleme yapılması önem taşır.") },
      { name: "Şirket kurma yazısı", description: "Yazının başlığı, özeti ve paragrafları.", sources: through("Yabancı yatırımcı için Türkiye’de şirket kurmanın yol haritası", "Yabancı ortakların çalışma ve ikamet durumu ile faaliyete özgü izinler de kuruluş takviminin parçasıdır. Sağlam bir başlangıç, sonradan çıkabilecek ortaklık uyuşmazlıklarının önemli bölümünü önler.") },
      { name: "Miras işlemleri yazısı", description: "Yazının başlığı, özeti ve paragrafları.", sources: through("Yabancılar için miras ve veraset işlemleri nasıl yürütülür?", "Bu konu, diğer hukuk alanlarıyla birlikte değerlendirilmesi gereken sonuçlar doğurabilir.") },
    ],
  },
  {
    name: "İletişim",
    description: "İletişim sayfasındaki bilgiler ve harita alanı; yukarıdan aşağıya.",
    blocks: [
      { name: "İletişim bilgileri", description: "Başlık, telefon, e-posta, adres ve diller.", sources: [...through("Antalya’da,", "Diller"), ...only("Altındağ Mahallesi, Tonguç Caddesi No: 26", "Mehmet Zeki Balcı İş Merkezi, Kat: 5, Daire: 17")] },
      { name: "Harita ve ofis konumu", description: "Haritanın yanındaki ofis ve adres metinleri.", sources: [...only("Ofis konumu", "Mehmet Zeki Balcı İş Merkezi", "Kat: 5 · Daire: 17 · Muratpaşa · Antalya · Türkiye", "Google Haritalar’da aç")] },
    ],
  },
  {
    name: "Ortak Alanlar",
    description: "Tüm sayfalarda kullanılan üst menü, alt bölüm ve hızlı iletişim metinleri.",
    blocks: [
      { name: "Üst menü", description: "Masaüstü ve mobil navigasyonda görülen bağlantılar.", sources: [...through("Ana menü", "İletişim"), ...through("Anasayfa", "Hangi hukuk alanlarında çalışıyoruz?")] },
      { name: "Sayfa altı", description: "Tüm sayfaların en altında görülen iletişim, adres ve bağlantılar.", sources: [...through("Alt menü", "Tüm hakları saklıdır."), ...only("İçerikler genel bilgilendirme amaçlıdır.", "Altındağ Mah. · Tonguç Cad. No: 26", "Mehmet Zeki Balcı İş Merkezi · K: 5 D: 17", "Gizlilik", "Paylaştığınız bilgiler mesleki sır kapsamında korunur.")] },
      { name: "Yüzen iletişim butonu", description: "Telefon ve sosyal medya için açılan hızlı iletişim menüsü.", sources: through("Hızlı iletişim", "Facebook profilini aç") },
    ],
  },
  {
    name: "Çerez ve Gizlilik",
    description: "Çerez bildirimi, tercih bağlantısı ve gizlilik metinleri.",
    blocks: [
      { name: "Çerez bildirimi", description: "Çerez panelinin başlıkları ve tercih bağlantısı.", sources: through("Çerez ve Gizlilik", "Çerez tercihleri") },
      { name: "Mesleki gizlilik", description: "Site altındaki kısa gizlilik ifadesi.", sources: only("Gizlilik", "Paylaştığınız bilgiler mesleki sır kapsamında korunur.") },
    ],
  },
];

function makeField(section: LayoutSection, block: LayoutSection["blocks"][number], source: string, order: number): SiteContentField {
  return {
    contentKey: contentKey(source),
    section: section.name,
    sectionDescription: section.description,
    block: block.name,
    blockDescription: block.description,
    order,
    label: labelFor(source),
    source,
    defaults: { tr: source, ru: translations.ru[source] ?? source, en: translations.en[source] ?? source, ro: translations.ro[source] ?? source },
  };
}

export const siteContentCatalog: SiteContentField[] = layout.flatMap((section) =>
  section.blocks.flatMap((block) => block.sources.map((source, order) => makeField(section, block, source, order))),
);

export const siteContentSections = layout.map(({ name, description }) => ({ name, description }));
export const siteContentByKey = new Map<string, SiteContentField>();
for (const field of siteContentCatalog) if (!siteContentByKey.has(field.contentKey)) siteContentByKey.set(field.contentKey, field);