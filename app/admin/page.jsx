import { getAppointments } from "@/lib/db";
import AdminDashboardHeader from "@/components/admin/AdminDashboardHeader";
import AdminStatsCards from "@/components/admin/AdminStatsCards";
import RecentAppointments from "@/components/admin/RecentAppointments";
import QuickActions from "@/components/admin/QuickActions";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const appointments = getAppointments();

  return (
    <>
      <AdminDashboardHeader appointments={appointments} />
      <AdminStatsCards />
      <RecentAppointments />
      <QuickActions />
    </>
  );
}
