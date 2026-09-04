"use client";

import { openConsentEventName } from "./CookieConsent";

export default function CookieSettingsButton() {
  return <button type="button" className="footer-cookie-button" onClick={() => window.dispatchEvent(new Event(openConsentEventName))}>Çerez tercihleri</button>;
}
