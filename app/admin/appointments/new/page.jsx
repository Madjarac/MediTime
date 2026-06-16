import { getAppointments, getActiveDoctors } from "@/lib/db";
import { buildTakenSlots } from "@/utils/helpers";
import AdminAddAppointmentForm from "@/components/admin/AdminAddAppointmentForm";
import AdminPageBar from "@/components/admin/AdminPageBar";

export const dynamic = "force-dynamic";

export default function AdminNewAppointmentPage() {
  const appointments = getAppointments();
  const doctors = getActiveDoctors();
  const takenSlots = buildTakenSlots(appointments);

  return (
    <>
      <AdminPageBar title="Novi pregled" />
      <AdminAddAppointmentForm takenSlots={takenSlots} doctors={doctors} />
    </>
  );
}
