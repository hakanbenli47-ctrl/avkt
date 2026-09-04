"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { contact } from "../../lib/contact";
import SocialIcon, { type SocialIconName } from "./SocialIcon";

const quickLinks: Array<{ label: string; href: string; icon: SocialIconName; external?: boolean }> = [
  { label: "Telefonla ara", href: contact.phoneHref, icon: "phone" },
  { label: "WhatsApp", href: contact.whatsappHref, icon: "whatsapp", external: true },
  { label: "Instagram", href: contact.instagramHref, icon: "instagram", external: true },
  { label: "LinkedIn", href: contact.linkedinHref, icon: "linkedin", external: true },
];

export default function FloatingContactDock() {
  const pathname = usePathname();
  const dock = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (dock.current?.open && !dock.current.contains(event.target as Node)) dock.current.removeAttribute("open");
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") dock.current?.removeAttribute("open");
    };
    document.addEventListener("pointerdown", closeOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <details className="floating-contact" ref={dock}>
      <summary aria-label="Hızlı iletişim menüsünü aç"><SocialIcon name="contact" /><span>İletişim</span></summary>
      <nav className="floating-contact-menu" aria-label="Hızlı iletişim">
        {quickLinks.map((item) => (
          <a key={item.label} href={item.href} target={item.external ? "_blank" : undefined} rel={item.external ? "noreferrer" : undefined} aria-label={item.label} onClick={() => dock.current?.removeAttribute("open")}>
            <span>{item.label}</span><i><SocialIcon name={item.icon} /></i>
          </a>
        ))}
      </nav>
    </details>
  );
}
