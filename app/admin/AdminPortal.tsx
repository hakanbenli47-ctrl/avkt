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
    let unsubscribe = () => undefined;
    fetch("/api/supabase-config")
      .then(async (response) => {
        const config = await response.json();
        if (!response.ok) throw new Error(config.error);
        const supabase = createClient(config.url, config.publishableKey);
        setClient(supabase);
        const { data } = await supabase.auth.getSession();
        setSession(data.session);
        const listener = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession));
        unsubscribe = () => listener.data.subscription.unsubscribe();
        setMessage("");
      })
      .catch((error) => setMessage(error.message || "Supabase bağlantısı kurulamadı."))
      .finally(() => setLoading(false));
    return () => unsubscribe();
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
