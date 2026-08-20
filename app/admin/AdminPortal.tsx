"use client";

import { createClient, type Session, type SupabaseClient } from "@supabase/supabase-js";
import { FormEvent, useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";

export default function AdminPortal() {
  const [client, setClient] = useState<SupabaseClient | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("Yönetim paneli hazırlanıyor…");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    let unsubscribe: () => void = () => {};
    fetch("/api/supabase-config")
      .then(async (response) => {
        const config = await response.json() as { url?: string; publishableKey?: string; error?: string };
        if (!response.ok) throw new Error(config.error);
        if (!config.url || !config.publishableKey) throw new Error("Supabase bağlantı bilgileri eksik.");
        const supabase = createClient(config.url, config.publishableKey);
        if (!active) return;
        setClient(supabase);
        const listener = supabase.auth.onAuthStateChange((_event, nextSession) => {
          if (active) setSession(nextSession);
        });
        unsubscribe = () => listener.data.subscription.unsubscribe();
        setMessage("");
        setLoading(false);

        void supabase.auth.getSession().then(({ data }) => {
          if (active) setSession(data.session);
        });
      })
      .catch((error) => {
        if (active) setMessage(error.message || "Supabase bağlantısı kurulamadı.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
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
    const { error } = await client.auth.signInWithPassword({ email: email.trim(), password });
    setMessage(error ? "E-posta veya şifre hatalı." : "");
    setLoading(false);
  }

  if (session && client) {
    return <AdminDashboard email={session.user.email ?? email} accessToken={session.access_token} onSignOut={() => client.auth.signOut()} />;
  }

  return (
    <main className="admin-login">
      <div className="admin-login-card">
        <span>RP</span><p>ADVOCAT IN TÜRKİYE</p><h1>İçerik stüdyosu</h1>
        <small>Hukuk notlarınızı güvenli biçimde hazırlayın, taslak kaydedin ve yayınlayın.</small>
        <form className="admin-login-form" onSubmit={signIn}>
          <label>E-posta<input type="email" autoComplete="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></label>
          <label>Şifre<input type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} /></label>
          <button type="submit" disabled={loading || !client}>{loading ? "Hazırlanıyor…" : "Panele giriş yap"}</button>
        </form>
        {message && <b className="admin-login-message">{message}</b>}
      </div>
    </main>
  );
}
