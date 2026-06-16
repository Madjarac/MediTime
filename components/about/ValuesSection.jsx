import Link from "next/link";

const values = [
  {
    icon: "❤️",
    title: "Pacijent na prvom mestu",
    description:
      "Svaka odluka koju donosimo počinje pitanjem: da li ovo olakšava život pacijentu? Korisničko iskustvo nije detalj — to je suština svega.",
    color: "bg-red-50 border-red-100",
    iconBg: "bg-red-100 text-red-600",
  },
  {
    icon: "🔬",
    title: "Medicinska izvrsnost",
    description:
      "Sarađujemo isključivo sa sertifikovanim i licenciranim lekarima koji aktivno praktikuju medicinku u akreditovanim ustanovama.",
    color: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100 text-blue-700",
  },
  {
    icon: "🔒",
    title: "Poverljivost i bezbednost",
    description:
      "Vaši medicinski podaci su sveti. Koristimo enkripciju na nivou banke i strogo poštujemo GDPR i domaće zakone o zaštiti podataka.",
    color: "bg-green-50 border-green-100",
    iconBg: "bg-green-100 text-green-700",
  },
  {
    icon: "🤝",
    title: "Partnerstvo i poverenje",
    description:
      "Gradimo dugoročne odnose sa lekarima, pacijentima i zdravstvenim ustanovama zasnovane na transparentnosti i obostranom poštovanju.",
    color: "bg-purple-50 border-purple-100",
    iconBg: "bg-purple-100 text-purple-700",
  },
  {
    icon: "⚡",
    title: "Inovacija bez prestanka",
    description:
      "Medicina se razvija brzo — i mi se razvijamo zajedno sa njom. Kontinualno unapređujemo platformu na osnovu povratnih informacija korisnika.",
    color: "bg-yellow-50 border-yellow-100",
    iconBg: "bg-yellow-100 text-yellow-700",
  },
  {
    icon: "🌍",
    title: "Dostupnost za sve",
    description:
      "Platforma je dostupna svima, bez obzira na tehničku pismenost. Dizajniramo za starije, mlade, i sve između.",
    color: "bg-teal-50 border-teal-100",
    iconBg: "bg-teal-100 text-teal-700",
  },
];

export default function ValuesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center flex flex-col gap-3 mb-14 max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
            Naše vrednosti
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
            Principi koji nas vode
          </h2>
          <p className="text-slate-500 text-lg">
            Svaki red koda, svaki razgovor sa lekarom i svaka odluka o
            proizvodu donosi se u skladu sa ovim vrednostima.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {values.map((value) => (
            <div
              key={value.title}
              className={`rounded-2xl border p-7 flex flex-col gap-4 hover:shadow-md transition-all hover:-translate-y-0.5 ${value.color}`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${value.iconBg}`}
              >
                {value.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="font-bold text-slate-800 text-lg">
                  {value.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA na dnu */}
        <div className="text-center bg-blue-50 border border-blue-100 rounded-2xl p-10 flex flex-col items-center gap-5">
          <h3 className="text-2xl font-bold text-slate-800">
            Pridružite nam se na ovom putu
          </h3>
          <p className="text-slate-500 max-w-md">
            Bilo da ste pacijent koji traži kvalitetnu zaštitu ili lekar koji
            želi da proširi svoju praksu — tu smo za vas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/appointments"
              className="px-7 py-3 bg-blue-700 text-white font-semibold rounded-full hover:bg-blue-800 transition-colors shadow"
            >
              Zakažite pregled
            </Link>
            <Link
              href="/contact"
              className="px-7 py-3 border-2 border-blue-700 text-blue-700 font-semibold rounded-full hover:bg-blue-700 hover:text-white transition-all"
            >
              Kontaktirajte nas
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
