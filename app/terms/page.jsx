import TermsHero from "@/components/terms/TermsHero";
import TermsContent from "@/components/terms/TermsContent";

export const metadata = {
  title: "Uslovi korišćenja",
  description:
    "Pravila i uslovi korišćenja MediTime platforme za zakazivanje lekarskih pregleda.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <TermsHero />
      <TermsContent />
    </>
  );
}
