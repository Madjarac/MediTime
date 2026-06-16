export const metadata = {
  title: "MediTime — Zakazivanje lekarskih pregleda",
  description:
    "Zakažite pregled kod izabranog lekara za nekoliko sekundi. Dostupni termini, provjereni stručnjaci i potpuno besplatna usluga.",
  alternates: { canonical: "/" },
};

import { getAppointments, getActiveDoctors } from "@/lib/db";
import Hero from "@/components/home/Hero";
import IntroSection from "@/components/home/IntroSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import DoctorsPreview from "@/components/home/DoctorsPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CTASection from "@/components/home/CTASection";
import ContactPreview from "@/components/home/ContactPreview";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const appointments = getAppointments();
  const activeDoctors = getActiveDoctors();
  const featuredDoctors = activeDoctors.slice(0, 4);
  const today = new Date().toISOString().split("T")[0];

  const previewSlots = featuredDoctors.map((doc) => {
    const timeMatch = doc.nextSlot?.match(/\d{2}:\d{2}/);
    const time = timeMatch ? timeMatch[0] : "09:00";
    const isTaken = appointments.some(
      (a) =>
        a.doctorId === doc.id &&
        a.date === today &&
        a.time === time &&
        a.status !== "rejected" &&
        a.status !== "cancelled"
    );
    return { time, doctor: doc.name, spec: doc.specialty, free: !isTaken };
  });

  return (
    <>
      <Hero />
      <IntroSection previewSlots={previewSlots} />
      <ServicesOverview />
      <DoctorsPreview featuredDoctors={featuredDoctors} />
      <WhyChooseUs />
      <CTASection />
      <ContactPreview />
    </>
  );
}
