import Link from "next/link";

export default function DoctorsPreview({ featuredDoctors = [] }) {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="flex flex-col gap-3 max-w-xl">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
              Tim lekara
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
              Upoznajte naše stručnjake
            </h2>
            <p className="text-slate-500 text-lg">
              Iskusni specijalisti posvećeni vašem zdravlju. Ocenjeni od
              strane hiljada zadovoljnih pacijenata.
            </p>
          </div>
          <Link
            href="/doctors"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-700 text-blue-700 font-semibold rounded-full hover:bg-blue-700 hover:text-white transition-all text-sm"
          >
            Svi lekari
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredDoctors.map((doctor) => (
            <div
              key={doctor.id}
              className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col overflow-hidden"
            >
              <div className={`bg-gradient-to-br ${doctor.gradient} p-6 flex flex-col items-center gap-3`}>
                <div className="w-20 h-20 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-2xl font-bold text-white">
                  {doctor.initials}
                </div>
                <div className="text-center">
                  <h3 className="font-bold text-white text-lg leading-tight">
                    {doctor.name}
                  </h3>
                  <p className="text-white/80 text-sm">{doctor.specialty}</p>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    doctor.available
                      ? "bg-green-400/20 text-green-100 border border-green-300/30"
                      : "bg-white/10 text-white/50 border border-white/10"
                  }`}
                >
                  {doctor.available ? "● Slobodan danas" : "● Zauzet danas"}
                </span>
              </div>

              <div className="flex flex-col gap-4 p-5 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-400 text-sm">★</span>
                    <span className="text-sm font-bold text-slate-800">
                      {doctor.rating}
                    </span>
                    <span className="text-xs text-slate-400">
                      ({doctor.reviews})
                    </span>
                  </div>
                  <span className="text-xs text-slate-400">
                    {doctor.experience}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {doctor.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 bg-slate-100 text-slate-500 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href="/appointments"
                  className="mt-auto block text-center py-2.5 bg-blue-700 text-white text-sm font-semibold rounded-xl hover:bg-blue-800 transition-colors"
                >
                  Zakaži pregled
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
