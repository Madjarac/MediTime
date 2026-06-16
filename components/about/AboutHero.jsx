export default function AboutHero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-800 via-blue-700 to-cyan-600 text-white overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="flex flex-col gap-6">
            <span className="inline-flex items-center gap-2 self-start px-4 py-1.5 bg-white/15 border border-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
              <span className="w-2 h-2 bg-cyan-300 rounded-full" />
              O nama
            </span>
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight">
              Ko stoji iza{" "}
              <span className="text-cyan-300">MediTime</span>?
            </h1>
            <p className="text-blue-100 text-lg sm:text-xl leading-relaxed max-w-lg">
              Nismo samo platforma — mi smo tim koji veruje da svaki čovek
              zaslužuje brz i jednostavan pristup kvalitetnoj zdravstvenoj
              zaštiti.
            </p>
            <div className="flex flex-wrap gap-8 mt-4 pt-6 border-t border-white/15">
              {[
                { value: "2020.", label: "Godina osnivanja" },
                { value: "20+", label: "Lekara u mreži" },
                { value: "10k+", label: "Pacijenata mesečno" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1">
                  <span className="text-3xl font-extrabold text-white">
                    {stat.value}
                  </span>
                  <span className="text-sm text-blue-200">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-4">
            {[
              { icon: "🏥", title: "Verifikovane ordinacije", desc: "Sve partnerske ordinacije prolaze strogi proces verifikacije" },
              { icon: "👨‍⚕️", title: "Licencirani lekari", desc: "Samo sertifikovani specijalisti sa aktivnom licencom" },
              { icon: "🔒", title: "Sigurnost podataka", desc: "GDPR usklađenost i enkripcija svih medicinskih podataka" },
              { icon: "⚡", title: "Trenutna potvrda", desc: "Svaki pregled biva potvrđen za manje od 60 sekundi" },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-5 flex flex-col gap-3"
              >
                <span className="text-3xl">{card.icon}</span>
                <h3 className="font-bold text-white text-sm">{card.title}</h3>
                <p className="text-blue-200 text-xs leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
