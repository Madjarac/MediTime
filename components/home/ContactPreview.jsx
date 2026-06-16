import Link from "next/link";

const contactItems = [
  {
    icon: "📍",
    label: "Adresa",
    value: "Bulevar Kralja Aleksandra 42, Beograd",
    subvalue: "11000 Beograd, Srbija",
    href: null,
    color: "bg-blue-50 border-blue-100",
    iconColor: "bg-blue-100 text-blue-700",
  },
  {
    icon: "📞",
    label: "Telefon",
    value: "+381 11 000 000",
    subvalue: "+381 63 000 000",
    href: "tel:+38111000000",
    color: "bg-cyan-50 border-cyan-100",
    iconColor: "bg-cyan-100 text-cyan-700",
  },
  {
    icon: "✉️",
    label: "E-mail",
    value: "info@meditime.rs",
    subvalue: "podrska@meditime.rs",
    href: "mailto:info@meditime.rs",
    color: "bg-teal-50 border-teal-100",
    iconColor: "bg-teal-100 text-teal-700",
  },
  {
    icon: "🕐",
    label: "Radno vreme",
    value: "Pon – Pet: 08:00 – 20:00",
    subvalue: "Sub: 09:00 – 15:00",
    href: null,
    color: "bg-indigo-50 border-indigo-100",
    iconColor: "bg-indigo-100 text-indigo-700",
  },
];

export default function ContactPreview() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="flex flex-col gap-3 max-w-xl">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
              Kontakt
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 leading-tight">
              Gde nas možete naći?
            </h2>
            <p className="text-slate-500 text-lg">
              Dostupni smo za sva vaša pitanja. Kontaktirajte nas putem
              telefona, e-maila ili posetite nas lično.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-700 text-blue-700 font-semibold rounded-full hover:bg-blue-700 hover:text-white transition-all text-sm"
          >
            Pošaljite poruku
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {contactItems.map((item) => (
            <div
              key={item.label}
              className={`rounded-2xl border p-6 flex flex-col gap-4 hover:shadow-md transition-all ${item.color}`}
            >
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${item.iconColor}`}
              >
                {item.icon}
              </div>

              <div className="flex flex-col gap-1">
                <p className="text-xs uppercase tracking-widest font-semibold text-slate-400">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-slate-800 font-semibold text-sm hover:text-blue-700 transition-colors"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-slate-800 font-semibold text-sm">
                    {item.value}
                  </p>
                )}
                <p className="text-slate-400 text-xs">{item.subvalue}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mapa */}
        <div className="mt-8 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
          <iframe
            title="MediTime lokacija"
            src="https://maps.google.com/maps?q=Bulevar+Kralja+Aleksandra+42,+Beograd,+Srbija&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="380"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
