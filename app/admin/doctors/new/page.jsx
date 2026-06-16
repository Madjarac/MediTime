import AdminAddDoctorForm from "@/components/admin/AdminAddDoctorForm";
import AdminPageBar from "@/components/admin/AdminPageBar";

export default function AdminNewDoctorPage() {
  return (
    <>
      <AdminPageBar title="Novi lekar" />
      <AdminAddDoctorForm />
    </>
  );
}
