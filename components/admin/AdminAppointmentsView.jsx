import { getActiveDoctors } from "@/lib/db";
import AdminPageBar from "@/components/admin/AdminPageBar";
import PendingAppointments from "@/components/admin/PendingAppointments";
import AppointmentsCalendar from "@/components/admin/AppointmentsCalendar";

export default function AdminAppointmentsView({ appointments }) {
  const doctors = getActiveDoctors();

  return (
    <>
      <AdminPageBar title="Pregledi" />
      <div className="px-8 py-8 flex flex-col gap-8">
      <PendingAppointments appointments={appointments} />
      <AppointmentsCalendar appointments={appointments} doctors={doctors} />
      </div>
    </>
  );
}
