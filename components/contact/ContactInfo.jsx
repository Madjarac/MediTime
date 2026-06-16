const infoCards = [
  {
    icon: "📍",
    title: "Adresa",
    lines: ["Bulevar Kralja Aleksandra 42", "11000 Beograd, Srbija"],
    note: "Prizemlje, kancelarija 4",
    color: "bg-blue-50 border-blue-100",
    iconBg: "bg-blue-100 text-blue-700",
    href: null,
  },
  {
    icon: "📞",
    title: "Telefon",
    lines: ["+381 11 000 000", "+381 63 000 000"],
    note: "Dostupni pon–pet 08–20h",
    color: "bg-cyan-50 border-cyan-100",
    iconBg: "bg-cyan-100 text-cyan-700",
    href: "tel:+38111000000",
  },
  {
    icon: "✉️",
    title: "E-mail",
    lines: ["info@meditime.rs", "podrska@meditime.rs"],
    note: "Odgovaramo u roku od 2h",
    color: "bg-teal-50 border-teal-100",
    iconBg: "bg-teal-100 text-teal-700",
    href: "mailto:info@meditime.rs",
  },
  {
    icon: "🕐",
    title: "Radno vreme",
    lines: ["Pon – Pet: 08:00 – 20:00", "Subota: 09:00 – 15:00"],
    note: "Nedeljom ne radimo",
    color: "bg-indigo-50 border-indigo-100",
    iconBg: "bg-indigo-100 text-indigo-700",
    href: null,
  },
];

export default function ContactInfo() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center flex flex-col gap-3 mb-12 max-w-xl mx-auto">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
            Informacije
          </span>
          <h2 className="text-3xl font-bold text-slate-800">
            Sve što vam je potrebno
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {infoCards.map((card) => (
            <div
              key={card.title}
              className={`rounded-2xl border p-6 flex flex-col gap-4 hover:shadow-md transition-all ${card.color}`}
            >
              <div
                className={`w-13 h-13 w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${card.iconBg}`}
              >
                {card.icon}
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-xs uppercase tracking-widest font-semibold text-slate-400">
                  {card.title}
                </p>
                {card.lines.map((line) =>
                  card.href ? (
                    <a
                      key={line}
                      href={card.href}
                      className="text-slate-800 font-semibold text-sm hover:text-blue-700 transition-colors"
                    >
                      {line}
                    </a>
                  ) : (
                    <p key={line} className="text-slate-800 font-semibold text-sm">
                      {line}
                    </p>
                  )
                )}
                <p className="text-slate-400 text-xs mt-1">{card.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
