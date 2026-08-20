import { chatGPTSignInPath, getChatGPTUser } from "../chatgpt-auth";
import AdminDashboard from "./AdminDashboard";

export const dynamic = "force-dynamic";
export const metadata = { title: "Yazı Yönetimi", robots: { index: false, follow: false } };

export default async function AdminPage() {
  const user = await getChatGPTUser();
  if (!user) {
    return (
      <main className="admin-login">
        <div className="admin-login-card"><span>RP</span><p>ADVOCAT IN TÜRKİYE</p><h1>İçerik stüdyosu</h1><small>Yazılarınızı güvenli biçimde hazırlayın, taslak kaydedin ve yayınlayın.</small><a href={chatGPTSignInPath("/admin")}>ChatGPT ile güvenli giriş yap ↗</a></div>
      </main>
    );
  }
  return <AdminDashboard email={user.email} />;
}
