import AdminPortal from "../AdminPortal";

export const dynamic = "force-dynamic";
export const metadata = { title: "Giriş–Çıkış Verileri", robots: { index: false, follow: false } };

export default function AdminVisitsPage() {
  return <AdminPortal view="visits" />;
}
