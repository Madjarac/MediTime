const steps = [
  {
    number: "01",
    icon: "🔍",
    title: "Pronađite lekara",
    description:
      "Pretražite našu bazu stručnih lekara po specijalnosti, imenu ili oceni pacijenata.",
  },
  {
    number: "02",
    icon: "📅",
    title: "Izaberite termin",
    description:
      "Odaberite datum i vreme koje vam odgovara iz dostupnih slobodnih termina.",
  },
  {
    number: "03",
    icon: "✅",
    title: "Potvrdite pregled",
    description:
      "Unesite vaše podatke i potvrdite zakazivanje. Potvrda stiže odmah na e-mail.",
  },
];

export default function IntroSection({ previewSlots = [] }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Leva strana — tekst */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
                Kako funkcioniše
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
                Pregled u 3 jednostavna koraka
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed">
                MediTime je osmišljen da zakazivanje lekarskog pregleda bude što
                jednostavnije. Bez telefona, bez čekanja — samo nekoliko klikova.
              </p>
            </div>

            <div className="flex flex-col gap-8 mt-4">
              {steps.map((step, index) => (
                <div key={step.number} className="flex gap-5 items-start">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-12 h-12 rounded-2xl bg-blue-700 text-white flex items-center justify-center text-xl shadow-md shadow-blue-200">
                      {step.icon}
                    </div>
                    {index < steps.length - 1 && (
                      <div className="w-px flex-1 bg-blue-100 mt-3 min-h-[2rem]" />
                    )}
                  </div>
                  <div className="flex flex-col gap-1 pb-6">
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                      Korak {step.number}
                    </span>
                    <h3 className="font-semibold text-slate-800 text-lg">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desna strana — vizuelni prikaz */}
          <div className="flex flex-col gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8 border border-blue-100">
              <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-5">
                Slobodni termini — Danas
              </p>
              <div className="flex flex-col gap-3">
                {previewSlots.map((slot) => (
                  <div
                    key={slot.time}
                    className={`flex items-center gap-4 p-4 rounded-2xl border transition-all ${
                      slot.free
                        ? "bg-white border-slate-100 hover:border-blue-200 hover:shadow-sm cursor-pointer"
                        : "bg-slate-50 border-slate-100 opacity-50"
                    }`}
                  >
                    <div className="w-14 text-center">
                      <span className="text-sm font-bold text-blue-700">
                        {slot.time}
                      </span>
                    </div>
                    <div className="w-px h-8 bg-slate-200" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">
                        {slot.doctor}
                      </p>
                      <p className="text-xs text-slate-400">{slot.spec}</p>
                    </div>
                    <span
                      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                        slot.free
                          ? "bg-green-100 text-green-700"
                          : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      {slot.free ? "Slobodno" : "Zauzeto"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-700 text-white rounded-2xl p-5 flex flex-col gap-2">
                <span className="text-3xl font-extrabold">98%</span>
                <span className="text-blue-200 text-sm">
                  pacijenata preporučuje MediTime
                </span>
              </div>
              <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-5 flex flex-col gap-2">
                <span className="text-3xl font-extrabold text-slate-800">
                  &lt;2min
                </span>
                <span className="text-slate-400 text-sm">
                  prosečno vreme zakazivanja
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
