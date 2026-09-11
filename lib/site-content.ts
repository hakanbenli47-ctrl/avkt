import { translations, type SiteLanguage } from "./translations";

export const siteLanguages: SiteLanguage[] = ["tr", "ru", "en", "ro"];
export type SiteContentValues = Record<SiteLanguage, string>;
export type SiteContentField = { contentKey: string; section: string; sectionDescription: string; label: string; source: string; defaults: SiteContentValues };

const sections = [
  { name: "Üst Menü ve Ortak Alanlar", description: "Üst menü, ortak bağlantılar, düğmeler ve site genelindeki kısa ifadeler.", pattern: /menü|anasayfa|hakkımızda|faaliyetlerimiz|sık sorulan|iletişim|inceleyin|tanıyın|okuyun|devam|geri|önceki|sonraki/i },
  { name: "Çerez ve Gizlilik", description: "Çerez bildirimi, gizlilik seçenekleri ve mesleki gizlilik metinleri.", pattern: /çerez|gizlilik|analitik|zorunlu çerez|reddet|kabul et|mesleki sır|kişisel veri/i },
  { name: "İletişim ve Alt Bölüm", description: "İletişim sayfası, ofis konumu, adres alanları ve sayfa altı metinleri.", pattern: /telefon|e-posta|adres|harita|ofis konumu|konumu|sosyal medya|whatsapp|telegram|hukuki bir konuda görüşmek|tüm hakları/i },
  { name: "Sık Sorulan Sorular", description: "Sık sorulan sorular sayfasındaki soru, cevap ve açıklamalar.", pattern: /sık sorulan|sorular|cevap|ücret|vekâletname|danışmanlık görüşmesi/i },
  { name: "Blog ve Hukuk Notları", description: "Blog listesi, yazı kartları, filtreler ve hukuk notları alanındaki ortak metinler.", pattern: /blog|hukuk not|yazılar|tüm yazılar|güncel mesele|yayında|taslak|okuma süresi/i },
  { name: "Avukat Hakkında", description: "Hakkımızda, biyografi, mesleki geçmiş ve belge alanları.", pattern: /ruslana|avukat hakkında|biyografi|moldova|diploma|ruhsat|barosu|mesleki belge|eğitim|yetkinlik|2017/i },
  { name: "Faaliyetler", description: "Faaliyet türleri, çalışma alanları ve hukuki hizmet açıklamaları.", pattern: /faaliyet|çalışma alan|gayrimenkul|şirket|ticaret|göç|vatandaşlık|aile|miras|dava|uyuşmazlık|tazminat|sözleşme|tapu|ikamet|arabuluculuk/i },
  { name: "Ana Sayfa", description: "Ana sayfadaki tanıtım, yaklaşım, tercih nedenleri ve süreç metinleri.", pattern: /.*/i },
] as const;

function contentKey(source: string) {
  let hash = 2166136261;
  for (let index = 0; index < source.length; index += 1) hash = Math.imul(hash ^ source.charCodeAt(index), 16777619);
  return `text_${(hash >>> 0).toString(36)}`;
}

function labelFor(source: string) { return source.length > 76 ? `${source.slice(0, 73).trim()}…` : source; }

const sourceKeys = Array.from(new Set([...Object.keys(translations.en), ...Object.keys(translations.ru), ...Object.keys(translations.ro)]));

export const siteContentCatalog: SiteContentField[] = sourceKeys.map((source) => {
  const section = sections.find((item) => item.pattern.test(source)) ?? sections[sections.length - 1];
  return {
    contentKey: contentKey(source), section: section.name, sectionDescription: section.description, label: labelFor(source), source,
    defaults: { tr: source, ru: translations.ru[source] ?? source, en: translations.en[source] ?? source, ro: translations.ro[source] ?? source },
  };
});

export const siteContentSections = sections.map(({ name, description }) => ({ name, description }));
export const siteContentByKey = new Map(siteContentCatalog.map((field) => [field.contentKey, field]));