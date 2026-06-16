export const metadata = {
  title: "O nama",
  description:
    "Saznajte više o MediTime platformi — našoj misiji, viziji i vrednostima koje nas vode ka modernizaciji zdravstvene zaštite.",
  alternates: { canonical: "/about" },
};

import AboutHero from "@/components/about/AboutHero";
import MissionSection from "@/components/about/MissionSection";
import VisionSection from "@/components/about/VisionSection";
import ValuesSection from "@/components/about/ValuesSection";

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionSection />
      <VisionSection />
      <ValuesSection />
    </>
  );
}

