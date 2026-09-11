import AdminPortal from "../AdminPortal";

export const dynamic = "force-dynamic";
export const metadata = { title: "Site İçerikleri", robots: { index: false, follow: false } };

export default function AdminSiteContentPage() { return <AdminPortal view="content" />; }