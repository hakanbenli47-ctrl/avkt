"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";
import { consentEventName, consentStorageKey } from "./CookieConsent";
import { useSiteLanguage } from "./LanguageProvider";

const visitorKey = "advocat-visitor-id-v1";
const sessionKey = "advocat-session-id-v1";
const sessionStartKey = "advocat-session-start-v1";
const entryPathKey = "advocat-entry-path-v1";
const pageViewsKey = "advocat-pageviews-v1";

function referrerHost() {
  if (!document.referrer) return "";
  try { return new URL(document.referrer).hostname; } catch { return ""; }
}

export default function VisitTracker() {
  const pathname = usePathname();
  const { language } = useSiteLanguage();
  const lastPath = useRef<string | null>(null);
  const analyticsUnavailable = useRef(false);

  const send = useCallback((action: "visit" | "heartbeat" | "end", path: string, keepalive = false) => {
    if (analyticsUnavailable.current || window.localStorage.getItem(consentStorageKey) !== "accepted" || path.startsWith("/admin")) return;
    const visitorId = window.localStorage.getItem(visitorKey) || crypto.randomUUID();
    const sessionId = window.sessionStorage.getItem(sessionKey) || crypto.randomUUID();
    const startedAt = Number(window.sessionStorage.getItem(sessionStartKey)) || Date.now();
    const entryPath = window.sessionStorage.getItem(entryPathKey) || path;
    if (!window.localStorage.getItem(visitorKey)) window.localStorage.setItem(visitorKey, visitorId);
    if (!window.sessionStorage.getItem(sessionKey)) window.sessionStorage.setItem(sessionKey, sessionId);
    if (!window.sessionStorage.getItem(sessionStartKey)) window.sessionStorage.setItem(sessionStartKey, String(startedAt));
    if (!window.sessionStorage.getItem(entryPathKey)) window.sessionStorage.setItem(entryPathKey, entryPath);
    let pageViews = Number(window.sessionStorage.getItem(pageViewsKey)) || 0;
    if (action === "visit") {
      pageViews += 1;
      window.sessionStorage.setItem(pageViewsKey, String(pageViews));
    }
    const payload = JSON.stringify({
      consent: "analytics",
      action,
      sessionId,
      visitorId,
      entryPath,
      path,
      pageViews: Math.max(pageViews, 1),
      durationSeconds: Math.round((Date.now() - startedAt) / 1000),
      language,
      referrerHost: referrerHost(),
    });
    if (action === "end" && navigator.sendBeacon) {
      navigator.sendBeacon("/api/visits", new Blob([payload], { type: "application/json" }));
      return;
    }
    void fetch("/api/visits", { method: "POST", headers: { "Content-Type": "application/json" }, body: payload, keepalive })
      .then((response) => {
        if (response.status === 503) analyticsUnavailable.current = true;
      })
      .catch(() => undefined);
  }, [language]);

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    const track = () => {
      if (lastPath.current !== pathname) {
        lastPath.current = pathname;
        send("visit", pathname);
      }
    };
    track();
    const consentChanged = (event: Event) => {
      if ((event as CustomEvent<string>).detail === "accepted") {
        analyticsUnavailable.current = false;
        lastPath.current = null;
        track();
      }
    };
    window.addEventListener(consentEventName, consentChanged);
    return () => window.removeEventListener(consentEventName, consentChanged);
  }, [pathname, send]);

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    const heartbeat = window.setInterval(() => send("heartbeat", pathname), 30000);
    const end = () => send("end", pathname, true);
    window.addEventListener("pagehide", end);
    return () => {
      window.clearInterval(heartbeat);
      window.removeEventListener("pagehide", end);
    };
  }, [pathname, send]);

  return null;
}
