"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

const getAllSpecialties = (doctors) => {
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

export default function DoctorsSection({ doctors }) {
  const counts = getAllSpecialties(doctors);

  const specialties = [
    { label: "Sve specijalnosti", count: doctors.length },
    ...Object.entries(counts).map(([label, count]) => ({ label, count })),
  ];
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("Sve specijalnosti");
  const [sort, setSort] = useState("preporuka");

  const filtered = useMemo(() => {
    let result = [...doctors];

    if (specialty !== "Sve specijalnosti") {
      result = result.filter((d) => d.specialty === specialty);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.specialty.toLowerCase().includes(q) ||
          d.tags.some((t) => t.toLowerCase().includes(q)) ||
          d.bio.toLowerCase().includes(q)
      );
    }

    if (sort === "ocena") {
      result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    } else if (sort === "iskustvo") {
      result.sort(
        (a, b) => parseInt(b.experience) - parseInt(a.experience)
      );
    } else if (sort === "ime") {
      result.sort((a, b) => a.name.localeCompare(b.name, "sr"));
    }

    return result;
  }, [search, specialty, sort]);

  return (
    <>
      {/* Filter traka */}
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Pretražite po imenu, specijalnosti..."
                className="w-full pl-11 pr-10 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-500 flex items-center justify-center transition-colors"
                >
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
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
              <select
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full pl-10 pr-8 py-3 rounded-xl border border-slate-200 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm appearance-none cursor-pointer"
              >
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
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm min-w-48"
            >
              <option value="preporuka">Sortiraj: Preporuka</option>
              <option value="ocena">Sortiraj: Ocena ↓</option>
              <option value="iskustvo">Sortiraj: Iskustvo ↓</option>
              <option value="ime">Sortiraj: Ime A–Z</option>
            </select>
          </div>
        </div>
      </section>

      {/* Grid lekara */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <p className="text-slate-500 text-sm">
              {filtered.length === 0 ? (
                "Nema rezultata"
              ) : (
                <>
                  Prikazano{" "}
                  <span className="font-semibold text-slate-800">
                    {filtered.length}
                  </span>{" "}
                  {filtered.length === doctors.length
                    ? "lekara"
                    : `od ${doctors.length} lekara`}
                </>
              )}
            </p>
          </div>

          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
              <span className="text-5xl">🔍</span>
              <div>
                <p className="text-slate-700 font-semibold text-lg">
                  Nema rezultata za "{search}"
                </p>
                <p className="text-slate-400 text-sm mt-1">
                  Pokušajte sa drugačijim pojmom ili resetujte filtere.
                </p>
              </div>
              <button
                onClick={() => { setSearch(""); setSpecialty("Sve specijalnosti"); }}
                className="px-5 py-2.5 bg-blue-700 text-white text-sm font-semibold rounded-full hover:bg-blue-800 transition-colors"
              >
                Resetuj filtere
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col overflow-hidden"
                >
                  <div className={`bg-gradient-to-br ${doctor.gradient} p-6 flex items-start`}>
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-xl font-extrabold text-white shrink-0">
                        {doctor.initials}
                      </div>
                      <div>
                        <h3 className="font-bold text-white text-lg leading-tight">
                          {doctor.name}
                        </h3>
                        <p className="text-white/80 text-sm">{doctor.specialty}</p>
                        <p className="text-white/60 text-xs mt-0.5">
                          {doctor.experience} iskustva
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col gap-4 flex-1">
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {doctor.bio}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {doctor.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-100 mt-auto">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400 text-sm">★</span>
                        <span className="font-bold text-slate-800 text-sm">
                          {doctor.rating}
                        </span>
                        <span className="text-slate-400 text-xs">
                          ({doctor.reviews})
                        </span>
                      </div>
                      <Link
                        href="/appointments"
                        className="px-4 py-2 bg-blue-700 text-white text-sm font-semibold rounded-xl hover:bg-blue-800 transition-colors"
                      >
                        Zakaži
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
