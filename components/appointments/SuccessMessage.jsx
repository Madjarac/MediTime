import Link from "next/link";

export default function SuccessMessage() {
  return (
    <section className="pt-20 pb-16 bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-8">

        {/* Ikona */}
        <div className="relative">
          <div className="w-28 h-28 bg-blue-100 rounded-full flex items-center justify-center">
            <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-blue-600"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </div>
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
            <span className="text-white text-base">⏳</span>
          </div>
        </div>

        {/* Naslov */}
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
            Zahtev primljen
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 leading-tight">
            Vaš zahtev je uspešno poslat!
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed max-w-lg mx-auto">
            Vaš zahtev za pregled je primljen i čeka potvrdu od strane naše ekipe.
            Dobićete obaveštenje na e-mail adresu čim pregled bude potvrđen.
          </p>
        </div>

        {/* Info box */}
        <div className="w-full bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4 text-left">
          <span className="text-2xl shrink-0 mt-0.5">📬</span>
          <div>
            <p className="font-bold text-slate-800 mb-1">Šta se dešava dalje?</p>
            <ul className="flex flex-col gap-2 mt-2">
              {[
                "Naša ekipa pregleda vaš zahtev u toku radnog vremena (Pon–Pet, 08–20h).",
                "Na vašu e-mail adresu šaljemo potvrdu sa svim detaljima termina.",
                "Ukoliko izabrani termin nije slobodan, kontaktiramo vas za alternativu.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <span className="w-5 h-5 rounded-full bg-amber-200 text-amber-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Kontakt info */}
        <div className="w-full bg-white border border-slate-100 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div className="text-slate-500 text-center sm:text-left">
            <p>Pitanja? Pozovite nas direktno:</p>
            <a href="tel:+38111000000" className="font-bold text-slate-800 hover:text-blue-700 transition-colors text-base mt-0.5 block">
              +381 11 000 000
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/appointments"
              className="px-5 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-full hover:bg-slate-50 transition-colors text-sm"
            >
              Novi zahtev
            </Link>
            <Link
              href="/"
              className="px-5 py-2.5 bg-blue-700 text-white font-semibold rounded-full hover:bg-blue-800 transition-colors text-sm"
            >
              Početna →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
