const reasons = [
  {
    icon: "⚡",
    title: "Zakazivanje za 2 minuta",
    description:
      "Intuitivni proces u samo par klikova. Bez dugih formulara, bez čekanja na potvrdu telefonom.",
    highlight: false,
  },
  {
    icon: "👨‍⚕️",
    title: "Verifikovani lekari",
    description:
      "Svi lekari su provereni, licencirani i aktivno praktikuju medicinu. Nema nepouzdanih profila.",
    highlight: false,
  },
  {
    icon: "🔒",
    title: "Zaštita podataka",
    description:
      "Vaši lični i medicinski podaci su kriptovani i zaštićeni u skladu sa GDPR regulativom.",
    highlight: false,
  },
  {
    icon: "🔔",
    title: "Automatski podsetnici",
    description:
      "Dobijate e-mail podsetnik dan pre pregleda kako ne biste zaboravili zakazani termin.",
    highlight: false,
  },
  {
    icon: "📋",
    title: "Istorija pregleda",
    description:
      "Svi vaši pregledi na jednom mestu. Pratite istoriju poseta i rezultate po lekarima.",
    highlight: false,
  },
  {
    icon: "💬",
    title: "Korisnička podrška",
    description:
      "Dostupni smo pon–pet od 08–20h. Odgovaramo u roku od jednog radnog sata.",
    highlight: false,
  },
];

const testimonials = [
  {
    text: "Zakazao sam pregled za mamu za manje od 2 minuta. Neverovatno jednostavno!",
    name: "Marko P.",
    role: "Pacijent",
    rating: 5,
  },
  {
    text: "Konačno platforma koja zaista funkcioniše. Tačna informacija o slobodnim terminima.",
    name: "Jelena S.",
    role: "Pacijentkinja",
    rating: 5,
  },
  {
    text: "Koristim MediTime mesecima. Brzo, pouzdano, preporučujem svima.",
    name: "Stefan R.",
    role: "Pacijent",
    rating: 5,
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Naslov */}
        <div className="text-center flex flex-col gap-3 mb-16 max-w-2xl mx-auto">
          <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
            Zašto MediTime
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
            Razlog zbog kojeg nas biraju hiljade
          </h2>
          <p className="text-slate-500 text-lg">
            Izgradili smo platformu vodeći računa o svakom detalju korisničkog iskustva.
          </p>
        </div>

        {/* Grid razloga */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {reasons.map((reason) => (
            <div
              key={reason.title}
              className="flex gap-5 p-6 rounded-2xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/30 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center text-xl shrink-0 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                {reason.icon}
              </div>
              <div className="flex flex-col gap-1.5">
                <h3 className="font-bold text-slate-800">{reason.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Utisci pacijenata */}
        <div className="bg-gradient-to-br from-blue-700 to-cyan-600 rounded-3xl p-10 sm:p-14">
          <div className="text-center mb-10">
            <p className="text-white/70 text-sm uppercase tracking-widest font-semibold mb-2">
              Šta kažu pacijenti
            </p>
            <h3 className="text-2xl sm:text-3xl font-bold text-white">
              Više od 10.000 zadovoljnih korisnika
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 flex flex-col gap-4"
              >
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i} className="text-yellow-300 text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-white/90 text-sm leading-relaxed italic">
                  "{t.text}"
                </p>
                <div className="mt-auto">
                  <p className="font-semibold text-white text-sm">{t.name}</p>
                  <p className="text-white/50 text-xs">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
