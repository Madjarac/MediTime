import { doctors } from "@/lib/doctors";

const getAllSpecialties = () => {
  const counts = {};
  doctors.forEach((d) => {
    counts[d.specialty] = (counts[d.specialty] || 0) + 1;
  });
  return counts;
};

const specialtyIcons = {
  Kardiolog: "❤️",
  Neurolog: "🧠",
  Dermatolog: "🦷",
  Ortoped: "🦴",
  Internista: "🔬",
  Psihijatar: "🧬",
  Oftalmolog: "👁️",
  Ginekolog: "🩺",
  Urolog: "💧",
  Endokrinolog: "⚗️",
  Pulmolog: "🫁",
  Reumatolog: "🦵",
  Gastroenterolog: "🫃",
  Pedijatar: "👶",
  Hirurg: "🔪",
};

export default function SpecialtiesFilter() {
  const counts = getAllSpecialties();
  const total = doctors.length;

  const specialties = [
    { label: "Sve specijalnosti", icon: "🏥", count: total },
    ...Object.entries(counts).map(([label, count]) => ({
      label,
      icon: specialtyIcons[label] || "🩺",
      count,
    })),
  ];

  return (
    <section className="bg-white border-b border-slate-100 py-6 sticky top-[73px] z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Pretraga */}
          <div className="relative flex-1">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input
              type="text"
              placeholder="Pretražite po imenu lekara..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
            />
          </div>

          {/* Filter specijalnosti */}
          <div className="relative min-w-52">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
            <select className="w-full pl-10 pr-8 py-3 rounded-xl border border-slate-200 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm appearance-none cursor-pointer">
              {specialties.map((spec) => (
                <option key={spec.label} value={spec.label}>
                  {spec.label} ({spec.count})
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>

          {/* Sortiranje */}
          <select className="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm min-w-48">
            <option>Sortiraj: Preporuka</option>
            <option>Sortiraj: Ocena ↓</option>
            <option>Sortiraj: Iskustvo ↓</option>
            <option>Sortiraj: Ime A–Z</option>
          </select>
        </div>
      </div>
    </section>
  );
}
