import { env } from "cloudflare:workers";
import type { ChatGPTUser } from "../app/chatgpt-auth";

export function isAuthorizedAdmin(user: ChatGPTUser | null) {
  if (!user) return false;
  const configured = String((env as unknown as Record<string, unknown>).ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  return configured.includes(user.email.toLowerCase());
}
