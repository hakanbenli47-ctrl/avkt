export type SocialIconName = "instagram" | "linkedin" | "facebook" | "whatsapp" | "phone" | "contact";

export default function SocialIcon({ name }: { name: SocialIconName }) {
  if (name === "instagram") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4.25" /><circle className="icon-fill" cx="17.6" cy="6.6" r="1.15" /></svg>;
  }

  if (name === "linkedin") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2.5" /><path d="M8 10v7M8 7.4v.1M11.5 17v-4.1c0-1.65 1-2.9 2.65-2.9 1.75 0 2.85 1.15 2.85 3.35V17M11.5 10.3V17" /></svg>;
  }

  if (name === "facebook") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M13.2 20.5v-7h2.45l.35-2.75h-2.8V9c0-.8.3-1.35 1.4-1.35H16V5.2c-.45-.06-1.2-.2-2.15-.2-2.2 0-3.65 1.35-3.65 3.8v1.95H8v2.75h2.2v7" /></svg>;
  }

  if (name === "whatsapp") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.4 11.7a8.35 8.35 0 0 1-12.3 7.35L4 20.15l1.1-4A8.35 8.35 0 1 1 20.4 11.7Z" /><path d="M8.35 7.75c.22-.5.45-.52.75-.53h.55c.18 0 .38.05.48.32l.72 1.75c.08.22.05.4-.08.58l-.55.68c-.14.16-.12.32-.03.48.56.95 1.35 1.73 2.32 2.28.17.1.32.08.45-.08l.72-.85c.15-.18.35-.22.55-.14l1.78.84c.22.1.35.26.32.48-.08.72-.4 1.35-.95 1.82-.48.42-1.1.62-1.75.47-1.5-.35-3.08-1.25-4.35-2.48-1.05-1.02-1.85-2.27-2.22-3.45-.25-.78-.08-1.55.35-2.2Z" /></svg>;
  }

  if (name === "phone") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.25 3.8 9.4 7.65 7.95 9.4a13.2 13.2 0 0 0 6.7 6.65l1.7-1.45 3.85 2.15-.45 2.65c-.1.62-.62 1.08-1.25 1.1C10.65 20.7 3.3 13.35 3.5 5.5c.02-.63.48-1.15 1.1-1.25l2.65-.45Z" /></svg>;
  }

  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5h16v11H9l-4.5 3v-3H4v-11Z" /><path d="M8 9.2h8M8 12.7h5.3" /></svg>;
}

