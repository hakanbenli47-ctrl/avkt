import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { contact } from "../lib/contact";
import { LanguageProvider } from "./components/LanguageProvider";
import CookieConsent from "./components/CookieConsent";
import FloatingContactDock from "./components/FloatingContactDock";
import VisitTracker from "./components/VisitTracker";
import "./globals.css";
import "./theme-refinements.css";
import "./contact-brand-colors.css";

const siteUrl = "https://www.advocateinturkiye.com";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "Advocat in Türkiye",
  title: {
    default: "Lawyer in Türkiye | Адвокат в Турции | Ruslana Pasecinic",
    template: "%s | Ruslana Pasecinic",
  },
  description: "Legal services for foreign clients in Türkiye in English, Russian, Romanian and Turkish. Юридическая помощь иностранцам в Турции на русском языке.",
  keywords: [
    "lawyer in Türkiye",
    "lawyer in Antalya",
    "English speaking lawyer Turkey",
    "Russian speaking lawyer Turkey",
    "адвокат в Турции",
    "русскоязычный адвокат в Анталии",
    "юридическая помощь в Турции",
    "Ruslana Pasecinic",
  ],
  authors: [{ name: "Av. Ruslana Pasecinic", url: siteUrl + "/hakkimizda" }],
  creator: "Av. Ruslana Pasecinic",
  publisher: "Advocat in Türkiye",
  category: "Legal services",
  formatDetection: { email: false, address: false, telephone: false },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml", sizes: "any" }],
    shortcut: "/favicon.svg",
    apple: [{ url: "/favicon.svg", type: "image/svg+xml", sizes: "any" }],
  },
  verification: {
    google: "IsYPhWNXDpmK79lqx3AjMXylXlg52vFrQgjPVsziQeo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    locale: "en_US",
    alternateLocale: ["ru_RU", "tr_TR", "ro_RO"],
    siteName: "Advocat in Türkiye",
    title: "Lawyer in Türkiye | Адвокат в Турции | Ruslana Pasecinic",
    description: "Multilingual legal services for foreign clients in Türkiye. Юридическая помощь иностранцам в Турции.",
    images: [{
      url: "/og.png",
      width: 1744,
      height: 909,
      alt: "Ruslana Pasecinic — Lawyer in Türkiye · Адвокат в Турции",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lawyer in Türkiye | Адвокат в Турции",
    description: "Multilingual legal services in Türkiye · Юридическая помощь в Турции",
    images: ["/og.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LegalService",
      "@id": siteUrl + "/#legal-service",
      name: "Advocat in Türkiye — Av. Ruslana Pasecinic",
      alternateName: ["Lawyer in Türkiye", "Адвокат в Турции"],
      url: siteUrl,
      image: [siteUrl + "/ruslana-pasecinic-portre.jpg", siteUrl + "/og.png"],
      logo: siteUrl + "/favicon.svg",
      telephone: contact.phoneDisplay,
      email: contact.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Altındağ Mahallesi, Tonguç Caddesi No: 26, Mehmet Zeki Balcı İş Merkezi, Kat: 5, Daire: 17",
        addressLocality: "Muratpaşa",
        addressRegion: "Antalya",
        addressCountry: "TR",
      },
      areaServed: { "@type": "Country", name: "Türkiye" },
      availableLanguage: ["Turkish", "Russian", "English", "Romanian"],
      sameAs: [contact.instagramHref, contact.linkedinHref, contact.facebookHref],
    },
    {
      "@type": "Person",
      "@id": siteUrl + "/#ruslana-pasecinic",
      name: "Ruslana Pasecinic",
      jobTitle: "Attorney at Law · Адвокат",
      url: siteUrl + "/hakkimizda",
      image: siteUrl + "/ruslana-pasecinic-portre.jpg",
      worksFor: { "@id": siteUrl + "/#legal-service" },
      sameAs: [contact.instagramHref, contact.linkedinHref, contact.facebookHref],
    },
    {
      "@type": "WebSite",
      "@id": siteUrl + "/#website",
      url: siteUrl,
      name: "Advocat in Türkiye",
      alternateName: "Lawyer in Türkiye · Адвокат в Турции",
      inLanguage: ["en", "ru", "tr", "ro"],
      publisher: { "@id": siteUrl + "/#legal-service" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${manrope.variable} ${cormorant.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
        />
        <LanguageProvider>{children}<FloatingContactDock /><CookieConsent /><VisitTracker /></LanguageProvider>
      </body>
    </html>
  );
}