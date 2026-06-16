const steps = [
  {
    number: "01",
    icon: "👨‍⚕️",
    title: "Izaberite lekara",
    description: "Odaberite specijalnost i lekara koji vam odgovara.",
  },
  {
    number: "02",
    icon: "📅",
    title: "Odaberite termin",
    description: "Izaberite datum i slobodan termin koji vam najviše odgovara.",
  },
  {
    number: "03",
    icon: "📝",
    title: "Unesite podatke",
    description: "Popunite kontakt informacije i opcionalnu napomenu za lekara.",
  },
  {
    number: "04",
    icon: "✅",
    title: "Potvrda odmah",
    description: "Pregled je zakazan — potvrda stiže na vaš e-mail za manje od minute.",
  },
];

export default function BookingIntro() {
  return (
    <section className="py-14 bg-slate-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-xl font-bold text-slate-800">
            Kako funkcioniše zakazivanje?
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={step.number} className="relative flex flex-col items-center text-center gap-3">
              {/* Konektor */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-7 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-px bg-blue-100" />
              )}
              <div className="w-14 h-14 rounded-2xl bg-blue-700 text-white flex items-center justify-center text-2xl shadow-md shadow-blue-200 relative z-10">
                {step.icon}
              </div>
              <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                Korak {step.number}
              </span>
              <h3 className="font-bold text-slate-800">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
