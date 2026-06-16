import Link from "next/link";

const steps = [
  {
    icon: "📧",
    title: "Proverite e-mail",
    description:
      "Potvrda sa svim detaljima pregleda je poslata na vašu e-mail adresu. Ako ne vidite e-mail, proverite spam folder.",
    color: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100 text-blue-700",
  },
  {
    icon: "📄",
    title: "Pripremite dokumenta",
    description:
      "Ponesite ličnu kartu, zdravstvenu knjižicu i eventualne prethodne nalaze vezane za razlog posete.",
    color: "bg-cyan-50 border-cyan-100",
    iconBg: "bg-cyan-100 text-cyan-700",
  },
  {
    icon: "🕐",
    title: "Dođite na vreme",
    description:
      "Preporučujemo dolazak 10 minuta pre zakazanog termina radi prijave na recepciji.",
    color: "bg-teal-50 border-teal-100",
    iconBg: "bg-teal-100 text-teal-700",
  },
  {
    icon: "❌",
    title: "Ako ne možete doći",
    description:
      "Pregled možete otkazati najkasnije 24h unapred putem e-maila ili telefona bez ikakvih troškova.",
    color: "bg-red-50 border-red-100",
    iconBg: "bg-red-100 text-red-600",
  },
];

export default function NextSteps() {
  return (
    <section className="pb-20 bg-slate-50">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center flex flex-col gap-2 mb-10">
          <h2 className="text-2xl font-bold text-slate-800">Šta dalje?</h2>
          <p className="text-slate-500 text-sm">
            Nekoliko važnih stvari pre vašeg pregleda
          </p>
        </div>

        <div className="flex flex-col gap-4 mb-10">
          {steps.map((step) => (
            <div
              key={step.title}
              className={`flex gap-5 items-start p-5 rounded-2xl border ${step.color}`}
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${step.iconBg}`}
              >
                {step.icon}
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-slate-800">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Dugmad */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/"
            className="flex-1 py-3.5 text-center border-2 border-slate-200 text-slate-700 font-semibold rounded-full hover:bg-slate-100 transition-colors text-sm"
          >
            ← Početna stranica
          </Link>
          <Link
            href="/appointments"
            className="flex-1 py-3.5 text-center bg-blue-700 text-white font-semibold rounded-full hover:bg-blue-800 transition-colors shadow text-sm"
          >
            Zakaži novi pregled
          </Link>
        </div>

        {/* Kontakt linija */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm">
            Imate pitanje?{" "}
            <a
              href="tel:+38111000000"
              className="text-blue-600 font-medium hover:underline"
            >
              Pozovite +381 11 000 000
            </a>{" "}
            ili{" "}
            <Link href="/contact" className="text-blue-600 font-medium hover:underline">
              pišite nam
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
