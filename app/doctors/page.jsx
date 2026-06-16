export const metadata = {
  title: "Naši lekari",
  description:
    "Upoznajte tim stručnih lekara MediTime platforme. Pronađite specijaliste za kardiologiju, neurologiju, pedijatriju i mnoge druge oblasti.",
  alternates: { canonical: "/doctors" },
};

import { getActiveDoctors } from "@/lib/db";
import DoctorsHero from "@/components/doctors/DoctorsHero";
import DoctorsSection from "@/components/doctors/DoctorsSection";

export const dynamic = "force-dynamic";

export default function DoctorsPage() {
  const doctors = getActiveDoctors();

  return (
    <>
      <DoctorsHero />
      <DoctorsSection doctors={doctors} />
    </>
  );
}
