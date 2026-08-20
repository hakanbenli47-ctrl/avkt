import AdminPortal from "./AdminPortal";

export const dynamic = "force-dynamic";
export const metadata = { title: "Yazı Yönetimi", robots: { index: false, follow: false } };

export default function AdminPage() {
  return <AdminPortal />;
}
