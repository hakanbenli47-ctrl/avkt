import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { headers } from "next/headers";
import { LanguageProvider } from "./components/LanguageProvider";
import CookieConsent from "./components/CookieConsent";
import FloatingContactDock from "./components/FloatingContactDock";
import VisitTracker from "./components/VisitTracker";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "advocatinturkiye.tr";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const base = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", base).toString();
  return {
    metadataBase: base,
    title: { default: "Av. Ruslana Pasecinic | Türkiye'de Hukuki Güven", template: "%s | Av. Ruslana Pasecinic" },
    description: "Türkiye'de yaşayan, yatırım yapan ve iş kuran yabancılar için Türkçe, Rusça, İngilizce ve Romence hukuk danışmanlığı.",
    alternates: { canonical: "/" },
    openGraph: {
      type: "website", locale: "tr_TR", siteName: "Advocat in Türkiye",
      title: "Av. Ruslana Pasecinic | Türkiye'de Hukuki Güven",
      description: "Türkiye'de yabancılar için çok dilli, stratejik hukuk danışmanlığı.",
      images: [{ url: socialImage, width: 1536, height: 909, alt: "Av. Ruslana Pasecinic — Advocat in Türkiye" }],
    },
    twitter: {
      card: "summary_large_image", title: "Advocat in Türkiye",
      description: "Türkiye'de yabancılar için çok dilli hukuk danışmanlığı.", images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className={`${manrope.variable} ${cormorant.variable}`}>
        <LanguageProvider>{children}<FloatingContactDock /><CookieConsent /><VisitTracker /></LanguageProvider>
      </body>
    </html>
  );
}
