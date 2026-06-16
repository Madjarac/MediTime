import Link from "next/link";
import { getActiveDoctors } from "@/lib/db";

export default function Hero() {
  const doctors = getActiveDoctors();
  const featuredDoctors = doctors.slice(0, 4);

  const uniqueSpecialties = [...new Set(doctors.map((d) => d.specialty))].length;
  const avgRating = doctors.length
    ? (doctors.reduce((sum, d) => sum + parseFloat(d.rating) || 0, 0) / doctors.length).toFixed(1)
    : "N/A";

  const stats = [
    { value: `${doctors.length}`, label: "Lekara specijalista" },
    { value: "10k+", label: "Zadovoljnih pacijenata" },
    { value: `${uniqueSpecialties}`, label: "Medicinskih specijalnosti" },
    { value: `${avgRating}★`, label: "Prosečna ocena" },
  ];
  return (
    <section className="relative bg-gradient-to-br from-blue-800 via-blue-700 to-cyan-600 text-white overflow-hidden">
      {/* Dekorativni krugovi u pozadini */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-blue-400/10 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Leva kolona — tekst */}
          <div className="flex flex-col gap-7">
            <span className="inline-flex items-center gap-2 self-start px-4 py-1.5 bg-white/15 border border-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
              <span className="w-2 h-2 bg-cyan-300 rounded-full animate-pulse" />
              Online zakazivanje pregleda
            </span>

            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight">
              Vaše zdravlje,{" "}
              <span className="text-cyan-300">naša briga</span>
            </h1>

            <p className="text-blue-100 text-lg sm:text-xl leading-relaxed max-w-lg">
              Zakažite pregled kod stručnih lekara za samo nekoliko sekundi.
              Bez čekanja u redu — jednostavno, brzo i pouzdano.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/appointments"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-800 font-bold rounded-full shadow-xl hover:bg-blue-50 transition-all hover:-translate-y-0.5 text-base"
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
                Naši lekari
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>

            {/* Trust badge */}
            <div className="flex items-center gap-3 mt-2">
              <div className="flex -space-x-2">
                {featuredDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-blue-700 flex items-center justify-center text-xs font-bold text-white"
                  >
                    {doc.initials}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">
                  {doctors.length} lekara specijalista
                </p>
                <p className="text-xs text-blue-200">
                  čeka da vam pomogne
                </p>
              </div>
            </div>
          </div>

          {/* Desna kolona — kartica */}
          <div className="hidden lg:flex justify-end">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 w-full max-w-sm shadow-2xl flex flex-col gap-5">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-12 h-12 bg-cyan-400/20 rounded-2xl flex items-center justify-center text-2xl">
                  🏥
                </div>
                <div>
                  <p className="font-bold text-white">Brzo zakazivanje</p>
                  <p className="text-blue-200 text-sm">za manje od 2 minuta</p>
                </div>
              </div>

              {[
                { step: "1", text: "Izaberite lekara i specijalnost" },
                { step: "2", text: "Odaberite datum i vreme" },
                { step: "3", text: "Unesite vaše podatke" },
                { step: "4", text: "Potvrda na e-mail!" },
              ].map((item) => (
                <div key={item.step} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-cyan-400/20 border border-cyan-300/30 flex items-center justify-center text-sm font-bold text-cyan-200 shrink-0">
                    {item.step}
                  </div>
                  <p className="text-blue-100 text-sm">{item.text}</p>
                </div>
              ))}

              <Link
                href="/appointments"
                className="mt-2 w-full py-3 bg-cyan-400 text-blue-900 font-bold rounded-2xl text-center hover:bg-cyan-300 transition-colors text-sm"
              >
                Zakaži odmah →
              </Link>
            </div>
          </div>
        </div>

        {/* Statistike */}
        <div className="mt-16 pt-10 border-t border-white/15 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1 text-center md:text-left">
              <span className="text-3xl sm:text-4xl font-extrabold text-white">
                {stat.value}
              </span>
              <span className="text-sm text-blue-200">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
