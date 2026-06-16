export default function MapSection() {
  return (
    <section className="pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 mb-8">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
            Lokacija
          </span>
          <h2 className="text-3xl font-bold text-slate-800">Kako do nas</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mapa */}
          <div className="lg:col-span-2 rounded-2xl overflow-hidden border border-slate-100 shadow-sm min-h-80">
            <iframe
              title="MediTime lokacija"
              src="https://maps.google.com/maps?q=Bulevar+Kralja+Aleksandra+42,+Beograd,+Srbija&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block", minHeight: "320px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Uputstvo */}
          <div className="flex flex-col gap-4">
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col gap-5">
              <h3 className="font-bold text-slate-800 text-lg">
                Kako do nas?
              </h3>

              <div className="flex flex-col gap-4">
                {[
                  {
                    icon: "🚌",
                    title: "Autobusom",
                    desc: "Linije 23, 26, 31 i 83 — stanica Kalenić pijaca (2 min hoda).",
                  },
                  {
                    icon: "🚇",
                    title: "Metroom",
                    desc: "Planirano proširenje M2 linije — za sada najbliža stanica Vukov Споменик.",
                  },
                  {
                    icon: "🚗",
                    title: "Automobilom",
                    desc: "Parking ispred zgrade, kapacitet 20 mesta. Besplatan za pacijente.",
                  },
                  {
                    icon: "🚶",
                    title: "Pešice",
                    desc: "10 minuta od Trga Nikole Pašića, u smeru Voždovca.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <span className="text-2xl shrink-0">{item.icon}</span>
                    <div>
                      <p className="font-semibold text-slate-700 text-sm">
                        {item.title}
                      </p>
                      <p className="text-slate-400 text-xs leading-relaxed mt-0.5">
                        {item.desc}
                      </p>
                    </div>
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
