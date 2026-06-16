export const metadata = {
  title: "Pregled uspešno zakazan",
  description: "Vaš zahtev za pregled je primljen. Očekujte potvrdu na email adresu.",
  robots: { index: false, follow: false },
};

import SuccessMessage from "@/components/appointments/SuccessMessage";
import NextSteps from "@/components/appointments/NextSteps";

export default function AppointmentSuccessPage() {
  return (
    <>
      <SuccessMessage />
      <NextSteps />
    </>
  );
}
