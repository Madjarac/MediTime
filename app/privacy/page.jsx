import PrivacyHero from "@/components/privacy/PrivacyHero";
import PrivacyContent from "@/components/privacy/PrivacyContent";

export const metadata = {
  title: "Politika privatnosti",
  description:
    "Saznajte kako MediTime prikuplja, čuva i koristi vaše lične podatke u skladu sa GDPR regulativom.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PrivacyHero />
      <PrivacyContent />
    </>
  );
}
