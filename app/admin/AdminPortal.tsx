"use client";

import { createClient, type Session, type SupabaseClient } from "@supabase/supabase-js";
import { FormEvent, useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import AdminVisitsDashboard from "./AdminVisitsDashboard";

let adminClient: SupabaseClient | null = null;
let adminClientConfig = "";
type AdminConfig = { url: string; publishableKey: string };
let adminConfigPromise: Promise<AdminConfig> | null = null;

function loadAdminConfig() {
  if (adminConfigPromise) return adminConfigPromise;
  adminConfigPromise = fetch("/api/supabase-config", { cache: "no-store" })
    .then(async (response) => {
      const config = await response.json() as { url?: string; publishableKey?: string; error?: string };
      if (!response.ok) throw new Error(config.error || "Supabase bağlantısı kurulamadı.");
      if (!config.url || !config.publishableKey) throw new Error("Supabase bağlantı bilgileri eksik.");
      return { url: config.url, publishableKey: config.publishableKey };
    })
    .catch((error) => {
      adminConfigPromise = null;
      throw error;
    });
  return adminConfigPromise;
}

function getAdminClient(url: string, publishableKey: string) {
  const config = `${url}\n${publishableKey}`;
  if (adminClient && adminClientConfig === config) return adminClient;

  adminClient = createClient(url, publishableKey, {
    auth: {
      storageKey: "advocat-admin-session-v1",
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
  adminClientConfig = config;
  return adminClient;
}

export default function AdminPortal({ view = "posts" }: { view?: "posts" | "visits" }) {
  const [client, setClient] = useState<SupabaseClient | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Güvenli bağlantı kuruluyor…");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let unsubscribe: () => void = () => {};
    const initialize = async () => {
      try {
        const config = await loadAdminConfig();
        const supabase = getAdminClient(config.url, config.publishableKey);
        if (!active) return;
        setClient(supabase);
        const listener = supabase.auth.onAuthStateChange((_event, nextSession) => {
          if (active) setSession(nextSession);
        });
        unsubscribe = () => listener.data.subscription.unsubscribe();
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (active) {
          setSession(data.session);
          setMessage("");
        }
      } catch (error) {
        if (active) setMessage(error instanceof Error ? error.message : "Supabase bağlantısı kurulamadı.");
      } finally {
        if (active) setLoading(false);
      }
    };
    void initialize();
    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  async function signIn(event: FormEvent) {
    event.preventDefault();
    if (!client) return;
    setLoading(true);
    setMessage("");
    const { data, error } = await client.auth.signInWithPassword({ email: email.trim(), password });
    if (error) setMessage("E-posta veya şifre hatalı.");
    else setSession(data.session);
    setLoading(false);
  }

  if (session && client) {
    const props = { email: session.user.email ?? email, accessToken: session.access_token, onSignOut: () => client.auth.signOut() };
    return view === "visits" ? <AdminVisitsDashboard {...props} /> : <AdminDashboard {...props} />;
  }

  return (
    <main className="admin-login" data-no-translate>
      <div className="admin-login-card">
        <span>RP</span><p>ADVOCAT IN TÜRKİYE</p><h1>{view === "visits" ? "Ziyaret analitiği" : "İçerik stüdyosu"}</h1>
        <small>{view === "visits" ? "İzinli ve anonim ziyaret oturumlarını güvenli yönetim ekranından inceleyin." : "Hukuk notlarınızı güvenli biçimde hazırlayın, taslak kaydedin ve yayınlayın."}</small>
        <form className="admin-login-form" onSubmit={signIn}>
          <label>E-posta<input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
          <label>Şifre<input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label>
          <button type="submit" disabled={loading || !client}>{loading ? (client ? "Giriş yapılıyor…" : "Bağlantı kuruluyor…") : "Panele giriş yap"}</button>
        </form>
        {message && <b className="admin-login-message">{message}</b>}
      </div>
    </main>
  );
}
