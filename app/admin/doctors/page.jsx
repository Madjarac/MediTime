import { getAppointments, getActiveDoctors } from "@/lib/db";
import AdminDoctorsList from "@/components/admin/AdminDoctorsList";

export const dynamic = "force-dynamic";

export default function AdminDoctorsPage() {
  const appointments = getAppointments();
  const allDoctors = getActiveDoctors();

  return <AdminDoctorsList allDoctors={allDoctors} appointments={appointments} />;
}
