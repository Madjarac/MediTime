import { getAppointments } from "@/lib/db";
import AdminAppointmentsView from "@/components/admin/AdminAppointmentsView";

export const dynamic = "force-dynamic";

export default function AdminAppointmentsPage() {
  const appointments = getAppointments();

  return <AdminAppointmentsView appointments={appointments} />;
}
