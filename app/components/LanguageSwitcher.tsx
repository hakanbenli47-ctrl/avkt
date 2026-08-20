"use client";

import { type SiteLanguage } from "../../lib/translations";
import { useSiteLanguage } from "./LanguageProvider";

const languages: Array<{ code: SiteLanguage; label: string }> = [
  { code: "tr", label: "TR" }, { code: "ru", label: "RU" }, { code: "en", label: "EN" }, { code: "ro", label: "RO" },
];

export default function LanguageSwitcher({ mobile = false }: { mobile?: boolean }) {
  const { language, setLanguage } = useSiteLanguage();
  return (
    <div className={`language-switcher ${mobile ? "is-mobile" : ""}`} role="group" aria-label="Dil seçimi" data-no-translate>
      {languages.map((item) => <button type="button" key={item.code} className={language === item.code ? "active" : ""} aria-pressed={language === item.code} onClick={() => setLanguage(item.code)}>{item.label}</button>)}
    </div>
  );
}
