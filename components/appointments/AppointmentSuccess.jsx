import Link from "next/link";

export default function AppointmentSuccess() {
  return (
    <section className="py-32 bg-slate-50 flex items-center justify-center min-h-[60vh]">
      <div className="max-w-lg mx-auto px-4 text-center flex flex-col items-center gap-7">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-5xl">
          ✅
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-extrabold text-slate-800">
            Pregled je zakazan!
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            Uspešno ste zakazali pregled. Poslali smo vam potvrdu na e-mail
            adresu. Proverite inbox (ili spam) za detalje termina.
          </p>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-6 w-full text-left flex flex-col gap-3 shadow-sm">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            Šta dalje?
          </p>
          {[
            "Proverite e-mail za potvrdu termina",
            "Dovedite ličnu kartu i zdravstvenu knjižicu",
            "Dođite 10 minuta pre zakazanog vremena",
          ].map((step, i) => (
            <div key={step} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </span>
              <p className="text-slate-600 text-sm">{step}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <Link
            href="/"
            className="flex-1 py-3 text-center border-2 border-slate-200 text-slate-700 font-semibold rounded-full hover:bg-slate-100 transition-colors"
          >
            Početna stranica
          </Link>
          <Link
            href="/appointments"
            className="flex-1 py-3 text-center bg-blue-700 text-white font-semibold rounded-full hover:bg-blue-800 transition-colors"
          >
            Novi pregled
          </Link>
        </div>
      </div>
    </section>
  );
}
