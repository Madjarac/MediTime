const topics = [
  "Zakazivanje pregleda",
  "Tehnička podrška",
  "Informacije o lekarima",
  "Partnerstvo sa ordinacijom",
  "Pritužba ili pohvala",
  "Ostalo",
];

export default function ContactForm() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Forma — 3 kolone */}
          <div className="lg:col-span-3">
            <div className="flex flex-col gap-3 mb-8">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
                Pišite nam
              </span>
              <h2 className="text-3xl font-bold text-slate-800">
                Pošaljite nam poruku
              </h2>
              <p className="text-slate-500">
                Popunite formu i mi ćemo vam odgovoriti u roku od jednog
                radnog dana.
              </p>
            </div>

            <form className="flex flex-col gap-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700">
                    Ime
                  </label>
                  <input
                    type="text"
                    placeholder="Vaše ime"
                    className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700">
                    Prezime
                  </label>
                  <input
                    type="text"
                    placeholder="Vaše prezime"
                    className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700">
                    E-mail adresa
                  </label>
                  <input
                    type="email"
                    placeholder="vas@email.com"
                    className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700">
                    Telefon{" "}
                    <span className="text-slate-400 font-normal">(opciono)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+381 6x xxx xxxx"
                    className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Tema poruke
                </label>
                <select className="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-sm">
                  <option value="">— Izaberite temu —</option>
                  {topics.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Poruka
                </label>
                <textarea
                  rows={6}
                  placeholder="Opišite vaš zahtev što detaljnije..."
                  className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none text-sm"
                />
              </div>

              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="gdpr"
                  className="mt-1 w-4 h-4 rounded accent-blue-700"
                />
                <label htmlFor="gdpr" className="text-slate-500 text-sm">
                  Prihvatam{" "}
                  <a href="#" className="text-blue-600 hover:underline">
                    politiku privatnosti
                  </a>{" "}
                  i saglasan/na sam sa obradom ličnih podataka u svrhu odgovora
                  na moj upit.
                </label>
              </div>

              <button
                type="submit"
                className="self-start px-8 py-3.5 bg-blue-700 text-white font-bold rounded-full hover:bg-blue-800 transition-colors shadow-md"
              >
                Pošalji poruku
              </button>
            </form>
          </div>

          {/* Desna strana — 2 kolone */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-blue-700 rounded-2xl p-7 text-white flex flex-col gap-4">
              <span className="text-2xl">💬</span>
              <h3 className="font-bold text-xl">Brza podrška</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                Za hitna pitanja vezana za zakazivanje pregleda, nazovite nas
                direktno na broj{" "}
                <a
                  href="tel:+38111000000"
                  className="font-bold text-white underline"
                >
                  +381 11 000 000
                </a>
                .
              </p>
              <p className="text-blue-200 text-xs">
                Dostupni pon–pet 08:00–20:00
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-7 flex flex-col gap-4">
              <h3 className="font-bold text-slate-800 text-lg">
                Česta pitanja
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  {
                    q: "Kako da otkažem pregled?",
                    a: "Pregled možete otkazati najkasnije 24h pre termina putem e-maila ili telefona.",
                  },
                  {
                    q: "Da li je zakazivanje besplatno?",
                    a: "Da, korišćenje MediTime platforme je potpuno besplatno za pacijente.",
                  },
                  {
                    q: "Koliko brzo dobijam potvrdu?",
                    a: "Potvrda stiže na e-mail odmah nakon zakazivanja — obično za manje od minute.",
                  },
                ].map((faq) => (
                  <div
                    key={faq.q}
                    className="border-b border-slate-100 pb-4 last:border-0 last:pb-0"
                  >
                    <p className="font-semibold text-slate-700 text-sm mb-1">
                      {faq.q}
                    </p>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
