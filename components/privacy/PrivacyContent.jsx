import Link from "next/link";

const sections = [
  {
    id: "1",
    title: "1. Rukovalac podataka",
    content: [
      "Rukovalac vašim ličnim podacima je MediTime d.o.o., sa sedištem u Beogradu, Srbija. Možete nas kontaktirati putem e-pošte na adresu privacy@meditime.rs ili poštom na adresu sedišta kompanije.",
      "Naš Službenik za zaštitu podataka (DPO) dostupan je na dpo@meditime.rs za sva pitanja vezana za obradu ličnih podataka.",
    ],
  },
  {
    id: "2",
    title: "2. Podaci koje prikupljamo",
    content: [
      "Prilikom zakazivanja pregleda prikupljamo: ime i prezime, adresu e-pošte, broj telefona, datum pregleda, ime izabranog lekara i napomenu za lekara (opciono).",
      "Automatski prikupljamo tehničke podatke kao što su IP adresa, tip pretraživača, operativni sistem i stranice koje ste posetili. Ovi podaci se koriste isključivo u analitičke svrhe.",
      "Ne prikupljamo osetljive medicinske podatke putem platforme. Detaljna medicinska dokumentacija razmenjuje se isključivo između pacijenta i lekara direktno.",
    ],
  },
  {
    id: "3",
    title: "3. Svrha i osnov obrade",
    content: [
      "Vaše podatke obrađujemo isključivo u svrhu: izvršenja usluge zakazivanja pregleda, slanja potvrda i podsetnika putem e-pošte i SMS-a, poboljšanja kvaliteta platforme i korisničke podrške.",
      "Pravni osnov za obradu podataka je vaša izričita saglasnost data u trenutku zakazivanja pregleda, kao i legitimni interes za pružanje usluge.",
      "Vaše podatke ne prodajemo, ne iznajmljujemo niti na drugi način otkrivamo trećim stranama u komercijalne svrhe bez vaše izričite saglasnosti.",
    ],
  },
  {
    id: "4",
    title: "4. Čuvanje i zaštita podataka",
    content: [
      "Vaši podaci se čuvaju na sigurnim serverima u okviru Evropske unije. Koristimo SSL enkripciju, dvofaktorsku autentifikaciju i redovne sigurnosne revizije kako bismo zaštitili vaše informacije.",
      "Podatke čuvamo onoliko dugo koliko je potrebno za pružanje usluge, ali ne duže od 3 godine od poslednje aktivnosti na nalogu, osim kada je duže čuvanje zakonom propisano.",
      "U slučaju povrede bezbednosti podataka, bićete obavešteni u roku od 72 sata u skladu sa GDPR regulativom.",
    ],
  },
  {
    id: "5",
    title: "5. Vaša prava",
    content: [
      "U skladu sa GDPR i Zakonom o zaštiti podataka o ličnosti, imate sledeća prava: pravo na pristup podacima, pravo na ispravku netačnih podataka, pravo na brisanje podataka (pravo na zaborav), pravo na ograničavanje obrade i pravo na prenosivost podataka.",
      "Imate pravo da u svakom trenutku povučete saglasnost za obradu podataka bez uticaja na zakonitost obrade pre povlačenja.",
      "Zahteve za ostvarivanje prava možete podneti putem e-pošte na privacy@meditime.rs. Odgovorićemo u roku od 30 dana.",
    ],
  },
  {
    id: "6",
    title: "6. Kolačići (Cookies)",
    content: [
      "Koristimo neophodne kolačiće za funkcionisanje platforme i analitičke kolačiće (Google Analytics 4) za razumevanje načina korišćenja platforme. Marketinške kolačiće koristimo samo uz vašu izričitu saglasnost.",
      "Možete upravljati kolačićima u podešavanjima vašeg pretraživača. Odbijanje određenih kolačića može uticati na funkcionalnost platforme.",
    ],
  },
  {
    id: "7",
    title: "7. Kontakt i pritužbe",
    content: [
      "Za sva pitanja vezana za privatnost podataka kontaktirajte nas na privacy@meditime.rs. Nastojimo da odgovorimo u roku od 72 sata.",
      "Imate pravo da uložite pritužbu Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti Republike Srbije ukoliko smatrate da su vaša prava povređena.",
    ],
  },
];

export default function PrivacyContent() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Info baner */}
        <div className="flex items-start gap-4 bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-12">
          <span className="text-2xl shrink-0 mt-0.5">🛡️</span>
          <div>
            <p className="font-semibold text-slate-800 mb-1">
              GDPR usklađenost
            </p>
            <p className="text-slate-500 text-sm leading-relaxed">
              MediTime platforma u potpunosti je usklađena sa Opštom uredbom o
              zaštiti podataka (GDPR) EU 2016/679 i Zakonom o zaštiti podataka o
              ličnosti Republike Srbije.
            </p>
          </div>
        </div>

        {/* Navigacija */}
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
        <div className="mt-16 p-8 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-semibold text-slate-800 mb-1">
              Imate pitanja o privatnosti?
            </p>
            <p className="text-slate-500 text-sm">
              Kontaktirajte našeg DPO na{" "}
              <a
                href="mailto:privacy@meditime.rs"
                className="text-blue-600 hover:underline"
              >
                privacy@meditime.rs
              </a>
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="px-5 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-full hover:bg-slate-100 transition-colors text-sm"
            >
              Kontaktirajte nas
            </Link>
            <Link
              href="/terms"
              className="px-5 py-2.5 bg-blue-700 text-white font-semibold rounded-full hover:bg-blue-800 transition-colors text-sm"
            >
              Uslovi korišćenja →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
