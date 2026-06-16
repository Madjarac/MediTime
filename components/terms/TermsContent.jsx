import Link from "next/link";

const sections = [
  {
    id: "1",
    title: "1. Opšte odredbe",
    content: [
      "MediTime je online platforma za zakazivanje lekarskih pregleda koja omogućava pacijentima da dođu u kontakt sa zdravstvenim stručnjacima. Operator platforme je MediTime d.o.o., sa sedištem u Beogradu, Srbija.",
      "Korišćenjem ove platforme potvrđujete da ste stariji od 18 godina ili da koristite platformu uz saglasnost roditelja/staratelja. Ukoliko se ne slažete sa ovim uslovima, molimo vas da prestanete sa korišćenjem platforme.",
      "MediTime zadržava pravo izmene ovih uslova u bilo kom trenutku. O značajnim promenama bićete obavešteni putem e-pošte ili obaveštenja na platformi.",
    ],
  },
  {
    id: "2",
    title: "2. Korišćenje platforme",
    content: [
      "Platforma je namenjena isključivo za zakazivanje lekarskih pregleda i ne pruža medicinsku dijagnozu, lečenje niti hitnu medicinsku pomoć. U slučaju hitnog medicinskog stanja, pozovite 194.",
      "Zabranjeno je korišćenje platforme u svrhe koje su nezakonite, uvredljive ili štetne za druge korisnike. Svaki pokušaj zloupotrebe sistema biće prijavljen nadležnim organima.",
      "Morate uneti tačne i potpune podatke o sebi prilikom zakazivanja pregleda. MediTime ne snosi odgovornost za posledice nastale zbog unosa netačnih informacija.",
    ],
  },
  {
    id: "3",
    title: "3. Zakazivanje i otkazivanje pregleda",
    content: [
      "Zakazan pregled je potvrđen tek nakon što primite e-mail potvrdu od MediTime platforme. Preporučujemo da potvrdu čuvate do termina pregleda.",
      "Otkazivanje pregleda mora se izvršiti najmanje 24 sata unapred kako bi termin bio dostupan drugim pacijentima. Nepojavljivanje bez prethodnog otkazivanja može rezultirati privremenim ograničenjem pristupa platformi.",
      "MediTime nije odgovoran za eventualne izmene ili otkazivanja od strane lekara. U takvim slučajevima, pacijent će biti blagovremeno obavešten i ponuđen alternativni termin.",
    ],
  },
  {
    id: "4",
    title: "4. Odgovornost i ograničenja",
    content: [
      "MediTime je posredna platforma i nije medicinska ustanova. Medicinska odgovornost leži isključivo na stručnjacima koji pružaju usluge putem platforme.",
      "Platform ne garantuje dostupnost određenog lekara ni termina u određenom vremenskom roku. Prikazane informacije o terminima su okvirne i podložne promeni.",
      "MediTime nije odgovoran za eventualnu štetu nastalu usled privremene nedostupnosti platforme, tehničkih problema ili više sile.",
    ],
  },
  {
    id: "5",
    title: "5. Intelektualna svojina",
    content: [
      "Sav sadržaj na platformi MediTime, uključujući tekst, grafike, logotipe i softver, zaštićen je autorskim pravima i vlasništvo je kompanije MediTime d.o.o.",
      "Zabranjeno je kopiranje, distribuiranje ili reprodukovanje bilo kog dela platforme bez prethodnog pismenog odobrenja. Kršenje ovih odredbi može rezultirati pravnim postupkom.",
    ],
  },
  {
    id: "6",
    title: "6. Primenjivo pravo",
    content: [
      "Ovi uslovi korišćenja regulisani su zakonima Republike Srbije. Za sve sporeve koji eventualno nastanu, nadležan je sud u Beogradu.",
      "Ukoliko imate pitanja u vezi sa ovim uslovima, možete nas kontaktirati putem e-pošte na adresu pravni@meditime.rs ili pozivom na +381 11 000 000.",
    ],
  },
];

export default function TermsContent() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigacija po sekcijama */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 mb-12">
          <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-4">
            Sadržaj dokumenta
          </p>
          <ul className="flex flex-col gap-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#section-${s.id}`}
                  className="text-blue-600 hover:text-blue-800 text-sm hover:underline transition-colors"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Sekcije */}
        <div className="flex flex-col gap-12">
          {sections.map((s) => (
            <div key={s.id} id={`section-${s.id}`} className="scroll-mt-32">
              <h2 className="text-xl font-bold text-slate-800 mb-5 pb-3 border-b border-slate-100">
                {s.title}
              </h2>
              <div className="flex flex-col gap-4">
                {s.content.map((para, i) => (
                  <p key={i} className="text-slate-600 leading-relaxed text-[15px]">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer sekcije */}
        <div className="mt-16 p-8 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-semibold text-slate-800 mb-1">
              Imate pitanja vezana za uslove?
            </p>
            <p className="text-slate-500 text-sm">
              Naš pravni tim je tu da vam pomogne.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="px-5 py-2.5 border border-blue-200 text-blue-700 font-semibold rounded-full hover:bg-blue-100 transition-colors text-sm"
            >
              Kontaktirajte nas
            </Link>
            <Link
              href="/privacy"
              className="px-5 py-2.5 bg-blue-700 text-white font-semibold rounded-full hover:bg-blue-800 transition-colors text-sm"
            >
              Politika privatnosti →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
