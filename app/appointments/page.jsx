export const metadata = {
  title: "Zakaži pregled",
  description:
    "Izaberite lekara, datum i slobodan termin i zakažite pregled online za samo nekoliko klikova. Brzo, besplatno i bez čekanja.",
  alternates: { canonical: "/appointments" },
};

import { getAppointments, getActiveDoctors } from "@/lib/db";
import { buildTakenSlots } from "@/utils/helpers";
import AppointmentsHero from "@/components/appointments/AppointmentsHero";
import BookingIntro from "@/components/appointments/BookingIntro";
import BookingForm from "@/components/appointments/BookingForm";
import BookingInfo from "@/components/appointments/BookingInfo";

export const dynamic = "force-dynamic";

export default function AppointmentsPage() {
  const appointments = getAppointments();
  const allDoctors = getActiveDoctors();
  const takenSlots = buildTakenSlots(appointments);

  return (
    <>
      <AppointmentsHero />
      <BookingIntro />
      <BookingForm allDoctors={allDoctors} takenSlots={takenSlots} />
      <BookingInfo />
    </>
  );
}
