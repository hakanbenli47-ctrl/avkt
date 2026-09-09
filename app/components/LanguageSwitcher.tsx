"use client";

import { type SiteLanguage } from "../../lib/translations";
import { useSiteLanguage } from "./LanguageProvider";

const languages: Array<{ code: SiteLanguage; label: string }> = [
  { code: "ru", label: "RU" }, { code: "en", label: "EN" }, { code: "ro", label: "RO" }, { code: "tr", label: "TR" },
];

export default function LanguageSwitcher({ mobile = false, onSelect }: { mobile?: boolean; onSelect?: () => void }) {
  const { language, setLanguage } = useSiteLanguage();
  const displayedLanguages = mobile ? [languages[3], ...languages.slice(0, 3)] : languages;

  const selectLanguage = (nextLanguage: SiteLanguage) => {
    setLanguage(nextLanguage);
    onSelect?.();
  };

  return (
    <div className={`language-switcher ${mobile ? "is-mobile" : ""}`} role="group" aria-label="Dil seçimi" data-no-translate>
      {displayedLanguages.map((item) => <button type="button" key={item.code} className={language === item.code ? "active" : ""} aria-pressed={language === item.code} onClick={() => selectLanguage(item.code)}>{item.label}</button>)}
    </div>
  );
}
