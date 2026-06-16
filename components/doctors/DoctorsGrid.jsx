import Link from "next/link";
import { doctors } from "@/lib/doctors";

export default function DoctorsGrid() {
  return (
    <section className="py-12 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <p className="text-slate-500 text-sm">
            Prikazano{" "}
            <span className="font-semibold text-slate-800">{doctors.length}</span>{" "}
            lekara
          </p>
          <p className="text-slate-400 text-sm hidden sm:block">
            🟢 — dostupni danas
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col overflow-hidden"
            >
              {/* Gornji deo */}
              <div
                className={`bg-gradient-to-br ${doctor.gradient} p-6 flex items-start justify-between`}
              >
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

              {/* Donji deo */}
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

                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-400 text-sm">★</span>
                      <span className="font-bold text-slate-800 text-sm">
                        {doctor.rating}
                      </span>
                      <span className="text-slate-400 text-xs">
                        ({doctor.reviews} ocena)
                      </span>
                    </div>
                    <p
                      className={`text-xs font-medium ${
                        doctor.available ? "text-green-600" : "text-slate-400"
                      }`}
                    >
                      {doctor.available ? "● " : "○ "}
                      Sledeći termin: {doctor.nextSlot}
                    </p>
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
      </div>
    </section>
  );
}
