"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations, type SiteLanguage } from "../../lib/translations";

type LanguageContextValue = { language: SiteLanguage; setLanguage: (language: SiteLanguage) => void };
const LanguageContext = createContext<LanguageContextValue | null>(null);
const originalText = new WeakMap<Text, string>();
const originalAttributes = new WeakMap<Element, Record<string, string>>();
const supported: SiteLanguage[] = ["tr", "ru", "en", "ro"];
const monthNames: Record<Exclude<SiteLanguage, "tr">, Record<string, string>> = {
  en: { Ocak: "January", Şubat: "February", Mart: "March", Nisan: "April", Mayıs: "May", Haziran: "June", Temmuz: "July", Ağustos: "August", Eylül: "September", Ekim: "October", Kasım: "November", Aralık: "December" },
  ru: { Ocak: "января", Şubat: "февраля", Mart: "марта", Nisan: "апреля", Mayıs: "мая", Haziran: "июня", Temmuz: "июля", Ağustos: "августа", Eylül: "сентября", Ekim: "октября", Kasım: "ноября", Aralık: "декабря" },
  ro: { Ocak: "ianuarie", Şubat: "februarie", Mart: "martie", Nisan: "aprilie", Mayıs: "mai", Haziran: "iunie", Temmuz: "iulie", Ağustos: "august", Eylül: "septembrie", Ekim: "octombrie", Kasım: "noiembrie", Aralık: "decembrie" },
};

function translatedValue(value: string, language: SiteLanguage) {
  if (language === "tr") return value;
  const direct = translations[language][value];
  if (direct) return direct;
  let result = value.replace(/(\d+) dk\b/g, "$1 min");
  for (const [source, target] of Object.entries(monthNames[language])) result = result.replace(source, target);
  return result;
}

function translateText(node: Text, language: SiteLanguage) {
  const initial = originalText.get(node) ?? node.nodeValue ?? "";
  if (!originalText.has(node)) originalText.set(node, initial);
  const value = initial.trim();
  if (!value) return;
  const translated = translatedValue(value, language);
  const leading = initial.match(/^\s*/)?.[0] ?? "";
  const trailing = initial.match(/\s*$/)?.[0] ?? "";
  const next = `${leading}${translated}${trailing}`;
  if (node.nodeValue !== next) node.nodeValue = next;
}

function translateAttributes(element: Element, language: SiteLanguage) {
  const attributes = ["aria-label", "placeholder", "title", "alt"];
  const saved = originalAttributes.get(element) ?? {};
  for (const name of attributes) {
    const current = element.getAttribute(name);
    if (current && !saved[name]) saved[name] = current;
    const source = saved[name];
    if (!source) continue;
    const next = translatedValue(source, language);
    if (current !== next) element.setAttribute(name, next);
  }
  if (Object.keys(saved).length) originalAttributes.set(element, saved);
}

function translateTree(root: Node, language: SiteLanguage) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.nodeType === Node.TEXT_NODE ? node.parentElement : node as Element;
      return parent?.closest("script, style, textarea, [data-no-translate]") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
    },
  });
  let node: Node | null = root;
  while (node) {
    if (node.nodeType === Node.TEXT_NODE) translateText(node as Text, language);
    else if (node.nodeType === Node.ELEMENT_NODE) translateAttributes(node as Element, language);
    node = walker.nextNode();
  }
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, updateLanguage] = useState<SiteLanguage>("tr");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.localStorage.getItem("advocat-language") as SiteLanguage | null;
      if (saved && supported.includes(saved)) updateLanguage(saved);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("advocat-language", language);
    translateTree(document.body, language);
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === "characterData") translateText(mutation.target as Text, language);
        mutation.addedNodes.forEach((node) => translateTree(node, language));
      }
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage: updateLanguage }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useSiteLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useSiteLanguage must be used within LanguageProvider");
  return context;
}
