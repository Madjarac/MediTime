const doctors = [
  "Dr. Ana Petrović — Kardiolog",
  "Dr. Marko Nikolić — Neurolog",
  "Dr. Jelena Jović — Dermatolog",
  "Dr. Stefan Vuković — Ortoped",
  "Dr. Milica Đorđević — Internista",
  "Dr. Ivan Lazić — Psihijatar",
];

const timeSlots = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "12:00", "13:00", "14:00", "15:00",
  "16:00", "17:00", "18:00",
];

export default function AppointmentForm() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-100 rounded-3xl shadow-sm p-8 sm:p-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-8">
            Podaci za zakazivanje
          </h2>

          <form className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Ime
                </label>
                <input
                  type="text"
                  placeholder="Vaše ime"
                  className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Prezime
                </label>
                <input
                  type="text"
                  placeholder="Vaše prezime"
                  className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">
                  E-mail adresa
                </label>
                <input
                  type="email"
                  placeholder="vas@email.com"
                  className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Broj telefona
                </label>
                <input
                  type="tel"
                  placeholder="+381 6x xxx xxxx"
                  className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">
                Izaberite lekara
              </label>
              <select className="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white">
                <option value="">— Izaberite lekara —</option>
                {doctors.map((doc) => (
                  <option key={doc}>{doc}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Datum pregleda
                </label>
                <input
                  type="date"
                  className="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">
                  Vreme
                </label>
                <select className="px-4 py-3 rounded-xl border border-slate-200 text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white">
                  <option value="">— Izaberite termin —</option>
                  {timeSlots.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">
                Napomena (opciono)
              </label>
              <textarea
                rows={4}
                placeholder="Opišite razlog posete ili simptome..."
                className="px-4 py-3 rounded-xl border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-blue-700 text-white font-bold rounded-full hover:bg-blue-800 transition-colors shadow-md text-base"
            >
              Zakaži pregled
            </button>

            <p className="text-center text-xs text-slate-400">
              Klikom na dugme prihvatate naše{" "}
              <a href="#" className="underline hover:text-blue-600">
                uslove korišćenja
              </a>{" "}
              i{" "}
              <a href="#" className="underline hover:text-blue-600">
                politiku privatnosti
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
