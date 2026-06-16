import Link from "next/link";

export default function BookingInfo() {
  return (
    <section className="pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <div className="bg-green-50 border border-green-100 rounded-2xl p-6 flex flex-col gap-3">
            <span className="text-2xl">✅</span>
            <h3 className="font-bold text-slate-800 text-sm">Besplatno zakazivanje</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Korišćenje MediTime platforme je potpuno besplatno za sve pacijente.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex flex-col gap-3">
            <span className="text-2xl">🔔</span>
            <h3 className="font-bold text-slate-800 text-sm">Potvrda i podsetnik</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Potvrda stiže odmah na e-mail. Podsetnik dobijate dan pre pregleda.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col gap-3">
            <span className="text-2xl">❌</span>
            <h3 className="font-bold text-slate-800 text-sm">Otkazivanje</h3>
            <p className="text-slate-500 text-xs leading-relaxed">
              Pregled možete otkazati najkasnije 24h pre termina bez ikakvih troškova.
            </p>
          </div>
        </div>

        <div className="mt-6 bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div className="flex items-start gap-3">
            <span className="text-xl mt-0.5">💬</span>
            <div>
              <p className="font-semibold text-slate-800 text-sm">
                Trebate pomoć sa zakazivanjem?
              </p>
              <p className="text-slate-400 text-xs mt-0.5">
                Naš tim je dostupan pon–pet od 08–20h
              </p>
            </div>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="tel:+38111000000"
              className="px-4 py-2 bg-blue-700 text-white text-sm font-semibold rounded-full hover:bg-blue-800 transition-colors"
            >
              Pozovite nas
            </a>
            <Link
              href="/contact"
              className="px-4 py-2 border border-slate-200 text-slate-600 text-sm font-semibold rounded-full hover:bg-slate-100 transition-colors"
            >
              Pišite nam
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
