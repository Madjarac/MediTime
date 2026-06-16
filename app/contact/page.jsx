export const metadata = {
  title: "Kontakt",
  description:
    "Kontaktirajte MediTime tim. Nalazimo se na Bulevaru Kralja Aleksandra 42, Beograd. Radno vreme i sve informacije na jednom mestu.",
  alternates: { canonical: "/contact" },
};

import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import MapSection from "@/components/contact/MapSection";

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
      <MapSection />
    </>
  );
}
