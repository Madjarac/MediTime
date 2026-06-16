import Link from "next/link";

export default function CTASection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-blue-800 via-blue-700 to-cyan-600 rounded-3xl overflow-hidden">

          {/* Dekoracija */}
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl" />
          </div>

          <div className="relative px-8 sm:px-14 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Leva strana */}
            <div className="flex flex-col gap-6 text-white">
              <div className="flex flex-col gap-3">
                <span className="text-sm font-semibold text-cyan-300 uppercase tracking-widest">
                  Počnite danas
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                  Pripremite se za zdraviji život
                </h2>
                <p className="text-blue-100 text-lg leading-relaxed">
                  Ne odlažite brigu o svom zdravlju. Zakažite pregled kod jednog
                  od naših stručnih lekara već danas.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/appointments"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-800 font-bold rounded-full shadow-lg hover:bg-blue-50 transition-all hover:-translate-y-0.5 text-base"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                  </svg>
                  Zakažite pregled
                </Link>
                <Link
                  href="/doctors"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/40 text-white font-semibold rounded-full hover:bg-white/10 hover:border-white/60 transition-all text-base"
                >
                  Pregledajte lekare
                </Link>
              </div>

              <div className="flex flex-wrap gap-6 mt-2">
                {[
                  { icon: "✅", text: "Besplatna registracija" },
                  { icon: "🔒", text: "Zaštita podataka" },
                  { icon: "⚡", text: "Brza potvrda" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2">
                    <span>{item.icon}</span>
                    <span className="text-sm text-blue-100">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Desna strana — mini statistika */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "10k+", label: "Pregleda mesečno", icon: "📅" },
                { number: "20+", label: "Lekara specijalista", icon: "👨‍⚕️" },
                { number: "98%", label: "Zadovoljnih pacijenata", icon: "❤️" },
                { number: "4.8★", label: "Prosečna ocena", icon: "⭐" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5 flex flex-col gap-2"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">
                    {item.number}
                  </span>
                  <span className="text-xs text-blue-200 leading-snug">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
