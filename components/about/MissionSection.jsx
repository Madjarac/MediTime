export default function MissionSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Leva strana — tekst */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
                Naša misija
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
                Dostupna zdravstvena zaštita za sve
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed">
                Osnovani 2020. godine u Beogradu, MediTime je nastao kao odgovor
                na svakodnevne frustracije pacijenata — dugačke liste čekanja,
                nepouzdane informacije o terminima i komplikovan proces zakazivanja.
              </p>
              <p className="text-slate-500 text-lg leading-relaxed">
                Naša misija je jednostavna: da svaki pacijent u Srbiji može da
                zakomunicira sa pravim lekarom u pravo vreme, bez nepotrebnih
                prepreka.
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              {[
                { icon: "🎯", text: "Transparentnost u svemu što radimo" },
                { icon: "🤝", text: "Partnerstvo sa lekarima i pacijentima" },
                { icon: "📈", text: "Kontinualno unapređenje platforme" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-lg shrink-0">
                    {item.icon}
                  </div>
                  <span className="text-slate-700 font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Desna strana — timeline */}
          <div className="flex flex-col gap-0">
            <div className="flex flex-col gap-6">
              {[
                {
                  year: "2020",
                  title: "Osnivanje",
                  desc: "MediTime pokrenut u Beogradu sa timom od 5 ljudi i 10 partnerskih lekara.",
                  active: false,
                },
                {
                  year: "2021",
                  title: "Ekspanzija",
                  desc: "Proširivanje mreže na 100+ lekara i pokrivanje svih većih gradova u Srbiji.",
                  active: false,
                },
                {
                  year: "2023",
                  title: "10.000 pacijenata",
                  desc: "Dostignut milestone od 10.000 mesečnih korisnika i lansiranje mobilne aplikacije.",
                  active: false,
                },
                {
                  year: "2025",
                  title: "Danas",
                  desc: "20+ stručnih lekara, 10+ specijalnosti, 4.8★ prosečna ocena pacijenata.",
                  active: true,
                },
              ].map((item, index, arr) => (
                <div key={item.year} className="flex gap-5">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold shrink-0 border-2 ${
                        item.active
                          ? "bg-blue-700 text-white border-blue-700"
                          : "bg-white text-blue-700 border-blue-200"
                      }`}
                    >
                      {item.year}
                    </div>
                    {index < arr.length - 1 && (
                      <div className="w-px flex-1 bg-blue-100 my-1 min-h-[1.5rem]" />
                    )}
                  </div>
                  <div className="pb-8 flex flex-col gap-1">
                    <h3
                      className={`font-bold text-lg ${
                        item.active ? "text-blue-700" : "text-slate-800"
                      }`}
                    >
                      {item.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
