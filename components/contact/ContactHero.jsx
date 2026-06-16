export default function ContactHero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-800 via-blue-700 to-cyan-600 text-white overflow-hidden">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 flex flex-col items-center text-center gap-6">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/15 border border-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
          <span className="w-2 h-2 bg-cyan-300 rounded-full" />
          Kontakt
        </span>
        <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold leading-[1.1] tracking-tight max-w-3xl">
          Kako možemo da vam{" "}
          <span className="text-cyan-300">pomognemo?</span>
        </h1>
        <p className="text-blue-100 text-lg sm:text-xl max-w-xl leading-relaxed">
          Tim MediTime je tu za vas svakim radnim danom. Pišite, nazovite
          ili posetite nas — odgovorićemo u najkraćem mogućem roku.
        </p>

        <div className="flex flex-wrap justify-center gap-8 mt-6 pt-8 border-t border-white/15 w-full max-w-2xl">
          {[
            { icon: "📞", label: "Telefon", value: "+381 11 000 000" },
            { icon: "✉️", label: "E-mail", value: "info@meditime.rs" },
            { icon: "🕐", label: "Radno vreme", value: "Pon–Pet 08–20h" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl">{item.icon}</span>
              <span className="text-xs text-blue-300 uppercase tracking-wider font-medium">
                {item.label}
              </span>
              <span className="text-white font-semibold text-sm">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
